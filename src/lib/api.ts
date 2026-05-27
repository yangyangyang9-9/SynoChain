import { Resource } from '@/types'

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

async function request(path: string, options: RequestInit = {}) {
  const url = `${baseURL}${path}`
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  }

  const response = await fetch(url, { ...options, headers })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Request failed' }))
    throw new Error(error.detail || `HTTP ${response.status}`)
  }

  return response.json()
}

export function apiGet(path: string, token?: string) {
  const headers: Record<string, string> = {}
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  return request(path, { headers })
}

export function apiPost(path: string, data: unknown, token?: string) {
  const headers: Record<string, string> = {}
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  return request(path, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  })
}

export function apiPut(path: string, data: unknown, token?: string) {
  const headers: Record<string, string> = {}
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  return request(path, {
    method: 'PUT',
    headers,
    body: JSON.stringify(data),
  })
}

export function apiDelete(path: string, token?: string) {
  const headers: Record<string, string> = {}
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  return request(path, {
    method: 'DELETE',
    headers,
  })
}