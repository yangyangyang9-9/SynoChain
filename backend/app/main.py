from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import auth, demands, matching, resources, subscriptions
from app.core.config import settings
from app.core.database import get_supabase_admin

app = FastAPI(title="SynoChain AI API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(resources.router)
app.include_router(demands.router)
app.include_router(matching.router)
app.include_router(subscriptions.router)


@app.on_event("startup")
def startup():
    try:
        supabase = get_supabase_admin()
        supabase.table("users").select("id").limit(1).execute()
        print("Supabase connection verified successfully")
    except Exception as e:
        print(f"Warning: Supabase connection failed - {e}")


@app.get("/")
def root():
    return {"message": "SynoChain AI API", "version": "1.0.0"}


@app.get("/api/health")
def health_check():
    return {"status": "healthy", "version": "1.0.0"}