import json
from typing import Any, Dict, List, Optional, TypedDict

import openai
from langgraph.graph import StateGraph

from app.core.config import settings


class MatchState(TypedDict):
    resource: dict
    demand: dict
    resource_analysis: str
    demand_analysis: str
    score: float
    reason: str
    industry: str
    recommendation: str


class AIService:
    def __init__(self):
        self.dashscope_client = openai.OpenAI(
            api_key=settings.DASHSCOPE_API_KEY,
            base_url="https://dashscope.aliyuncs.com/compatible-mode/v1",
        )
        self.openrouter_client = openai.OpenAI(
            api_key=settings.OPENROUTER_API_KEY,
            base_url="https://openrouter.ai/api/v1",
        )
        self.zai_client = openai.OpenAI(
            api_key=settings.ZAI_API_KEY,
            base_url="https://api.z.ai/api/v1",
        )
        self.nvidia_client = openai.OpenAI(
            api_key=settings.NVIDIA_API_KEY,
            base_url="https://integrate.api.nvidia.com/v1",
        )

    def _call_llm(self, prompt: str, system_prompt: str = "", provider: str = "dashscope") -> str:
        provider_config = {
            "dashscope": {
                "client": self.dashscope_client,
                "model": "deepseek-chat",
            },
            "openrouter": {
                "client": self.openrouter_client,
                "model": "openai/gpt-4o-mini",
            },
            "zai": {
                "client": self.zai_client,
                "model": "glm-4-plus",
            },
            "nvidia": {
                "client": self.nvidia_client,
                "model": "meta/llama-3.3-70b-instruct",
            },
        }

        fallback_order = ["dashscope", "openrouter", "zai", "nvidia"]
        start_idx = fallback_order.index(provider) if provider in fallback_order else 0

        last_error = None
        for i in range(len(fallback_order)):
            current_provider = fallback_order[(start_idx + i) % len(fallback_order)]
            config = provider_config[current_provider]
            try:
                messages = []
                if system_prompt:
                    messages.append({"role": "system", "content": system_prompt})
                messages.append({"role": "user", "content": prompt})
                response = config["client"].chat.completions.create(
                    model=config["model"],
                    messages=messages,
                    temperature=0.3,
                    max_tokens=2000,
                )
                return response.choices[0].message.content.strip()
            except Exception as e:
                last_error = e
                continue

        raise Exception(f"All LLM providers failed. Last error: {last_error}")

    def analyze_text(self, text: str) -> dict:
        system_prompt = "You are a supply chain business analyst. Extract structured information from the given text. Respond ONLY with valid JSON, no other text."
        prompt = f"""Analyze the following business text and extract the following information as JSON:
{{
    "keywords": ["keyword1", "keyword2", ...],
    "industry": "primary industry name",
    "category": "supply chain category",
    "intent": "business intent (supply/demand/partnership/investment)",
    "summary": "brief summary of the text"
}}

Text to analyze:
{text}"""

        response = self._call_llm(prompt, system_prompt=system_prompt)
        try:
            cleaned = response.strip()
            if cleaned.startswith("```json"):
                cleaned = cleaned[7:]
            if cleaned.startswith("```"):
                cleaned = cleaned[3:]
            if cleaned.endswith("```"):
                cleaned = cleaned[:-3]
            return json.loads(cleaned.strip())
        except json.JSONDecodeError:
            return {
                "keywords": [],
                "industry": "unknown",
                "category": "general",
                "intent": "unknown",
                "summary": text[:200],
            }

    def _analyze_resource(self, state: MatchState) -> MatchState:
        system_prompt = "You are a supply chain resource analyst. Respond ONLY with valid JSON."
        prompt = f"""Analyze this supply chain resource:
Title: {state['resource']['title']}
Description: {state['resource']['description']}
Category: {state['resource']['category']}
Country: {state['resource']['country']}

Return JSON:
{{"analysis": "detailed analysis of this resource's capabilities, strengths, and target market"}}"""

        response = self._call_llm(prompt, system_prompt=system_prompt)
        try:
            cleaned = response.strip()
            if cleaned.startswith("```json"):
                cleaned = cleaned[7:]
            if cleaned.startswith("```"):
                cleaned = cleaned[3:]
            if cleaned.endswith("```"):
                cleaned = cleaned[:-3]
            data = json.loads(cleaned.strip())
            state["resource_analysis"] = data.get("analysis", response)
        except json.JSONDecodeError:
            state["resource_analysis"] = response
        return state

    def _analyze_demand(self, state: MatchState) -> MatchState:
        system_prompt = "You are a supply chain demand analyst. Respond ONLY with valid JSON."
        prompt = f"""Analyze this supply chain demand:
Title: {state['demand']['title']}
Description: {state['demand']['description']}
Category: {state['demand']['category']}
Country: {state['demand']['country']}

Return JSON:
{{"analysis": "detailed analysis of this demand's requirements, urgency, and procurement needs"}}"""

        response = self._call_llm(prompt, system_prompt=system_prompt)
        try:
            cleaned = response.strip()
            if cleaned.startswith("```json"):
                cleaned = cleaned[7:]
            if cleaned.startswith("```"):
                cleaned = cleaned[3:]
            if cleaned.endswith("```"):
                cleaned = cleaned[:-3]
            data = json.loads(cleaned.strip())
            state["demand_analysis"] = data.get("analysis", response)
        except json.JSONDecodeError:
            state["demand_analysis"] = response
        return state

    def _compute_match(self, state: MatchState) -> MatchState:
        system_prompt = "You are a supply chain matchmaking expert. Respond ONLY with valid JSON."
        prompt = f"""Based on the following analyses, compute a match between a resource and a demand.

Resource Analysis: {state['resource_analysis']}
Demand Analysis: {state['demand_analysis']}
Resource Category: {state['resource']['category']}
Demand Category: {state['demand']['category']}
Resource Country: {state['resource']['country']}
Demand Country: {state['demand']['country']}

Return JSON with match assessment:
{{
    "score": "a number between 0 and 100 indicating match quality",
    "reason": "detailed explanation of why this score was given",
    "industry": "the primary industry this match belongs to",
    "recommendation": "actionable recommendation for both parties"
}}"""

        response = self._call_llm(prompt, system_prompt=system_prompt)
        try:
            cleaned = response.strip()
            if cleaned.startswith("```json"):
                cleaned = cleaned[7:]
            if cleaned.startswith("```"):
                cleaned = cleaned[3:]
            if cleaned.endswith("```"):
                cleaned = cleaned[:-3]
            data = json.loads(cleaned.strip())
            state["score"] = float(data.get("score", 0))
            state["reason"] = data.get("reason", "No reason provided")
            state["industry"] = data.get("industry", "Unknown")
            state["recommendation"] = data.get("recommendation", "No recommendation available")
        except (json.JSONDecodeError, ValueError):
            state["score"] = 50.0
            state["reason"] = "Unable to compute accurate match at this time"
            state["industry"] = state["resource"]["category"]
            state["recommendation"] = "Further analysis recommended"
        return state

    def _build_match_graph(self) -> StateGraph:
        graph = StateGraph(MatchState)
        graph.add_node("analyze_resource", self._analyze_resource)
        graph.add_node("analyze_demand", self._analyze_demand)
        graph.add_node("compute_match", self._compute_match)
        graph.set_entry_point("analyze_resource")
        graph.add_edge("analyze_resource", "analyze_demand")
        graph.add_edge("analyze_demand", "compute_match")
        graph.set_finish_point("compute_match")
        return graph.compile()

    def match_resource_demand(self, resource: dict, demand: dict) -> dict:
        initial_state: MatchState = {
            "resource": resource,
            "demand": demand,
            "resource_analysis": "",
            "demand_analysis": "",
            "score": 0.0,
            "reason": "",
            "industry": "",
            "recommendation": "",
        }
        try:
            graph = self._build_match_graph()
            final_state = graph.invoke(initial_state)
            return {
                "score": final_state["score"],
                "reason": final_state["reason"],
                "industry": final_state["industry"],
                "recommendation": final_state["recommendation"],
            }
        except Exception:
            system_prompt = "You are a supply chain matchmaking expert. Respond ONLY with valid JSON."
            prompt = f"""Match this resource and demand:
Resource: {json.dumps(resource)}
Demand: {json.dumps(demand)}

Return JSON:
{{"score": 0-100, "reason": "explanation", "industry": "industry name", "recommendation": "actionable advice"}}"""

            response = self._call_llm(prompt, system_prompt=system_prompt)
            try:
                cleaned = response.strip()
                if cleaned.startswith("```json"):
                    cleaned = cleaned[7:]
                if cleaned.startswith("```"):
                    cleaned = cleaned[3:]
                if cleaned.endswith("```"):
                    cleaned = cleaned[:-3]
                data = json.loads(cleaned.strip())
                return {
                    "score": float(data.get("score", 0)),
                    "reason": data.get("reason", ""),
                    "industry": data.get("industry", ""),
                    "recommendation": data.get("recommendation", ""),
                }
            except (json.JSONDecodeError, ValueError):
                return {
                    "score": 50.0,
                    "reason": "AI analysis temporarily unavailable",
                    "industry": resource.get("category", "Unknown"),
                    "recommendation": "Please try again later",
                }

    def generate_professional_reply(self, context: dict) -> str:
        system_prompt = "You are a professional supply chain business communicator. Write concise, professional replies."
        prompt = f"""Generate a professional business reply for the following context:
Platform: {context.get('platform', 'LinkedIn')}
Post Content: {context.get('post_content', '')}
Our Business: {context.get('business', 'Supply chain solutions provider')}
Tone: {context.get('tone', 'professional')}

Write a professional reply that adds value to the conversation."""
        return self._call_llm(prompt, system_prompt=system_prompt)


ai_service = AIService()