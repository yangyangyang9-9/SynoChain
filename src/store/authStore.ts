import { create } from 'zustand'
import { User } from '@/types'
import { apiPost, apiGet } from '@/lib/api'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string) => Promise<void>
  logout: () => void
  fetchMe: () => Promise<void>
  loadFromStorage: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    const data = new URLSearchParams()
    data.append('username', email)
    data.append('password', password)

    const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
    const response = await fetch(`${baseURL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: data,
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Login failed' }))
      throw new Error(error.detail || 'Login failed')
    }

    const result = await response.json()
    const token = result.access_token
    localStorage.setItem('token', token)

    const userResponse = await fetch(`${baseURL}/api/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })

    if (!userResponse.ok) {
      throw new Error('Failed to fetch user')
    }

    const user = await userResponse.json()
    set({ user, token, isAuthenticated: true })
  },

  register: async (email: string, password: string) => {
    await apiPost('/api/auth/register', { email, password })
  },

  logout: () => {
    localStorage.removeItem('token')
    set({ user: null, token: null, isAuthenticated: false })
  },

  fetchMe: async () => {
    const token = localStorage.getItem('token')
    if (!token) return

    try {
      const user = await apiGet('/api/users/me', token)
      set({ user, token, isAuthenticated: true })
    } catch {
      localStorage.removeItem('token')
      set({ user: null, token: null, isAuthenticated: false })
    }
  },

  loadFromStorage: () => {
    const token = localStorage.getItem('token')
    if (token) {
      set({ token })
    }
  },
}))