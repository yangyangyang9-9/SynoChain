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
    const result = await apiPost('/api/auth/login', { email, password })

    if (!result.access_token) {
      throw new Error('Login failed: no token received')
    }

    const token = result.access_token
    localStorage.setItem('token', token)

    const user = await apiGet('/api/auth/me', token)

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
      const user = await apiGet('/api/auth/me', token)
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