import { create } from 'zustand'
import { Resource, Demand } from '@/types'
import { apiGet } from '@/lib/api'

interface ResourceState {
  resources: Resource[]
  demands: Demand[]
  totalResources: number
  totalDemands: number
  loading: boolean
  error: string | null
  fetchResources: (params?: Record<string, string>) => Promise<void>
  fetchDemands: (params?: Record<string, string>) => Promise<void>
  setResources: (resources: Resource[]) => void
  setDemands: (demands: Demand[]) => void
}

export const useResourceStore = create<ResourceState>((set) => ({
  resources: [],
  demands: [],
  totalResources: 0,
  totalDemands: 0,
  loading: false,
  error: null,

  fetchResources: async (params?: Record<string, string>) => {
    set({ loading: true, error: null })
    try {
      const query = params ? '?' + new URLSearchParams(params).toString() : ''
      const data = await apiGet(`/api/resources${query}`)
      set({
        resources: Array.isArray(data) ? data : data.items || [],
        totalResources: data.total || (Array.isArray(data) ? data.length : 0),
        loading: false,
      })
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Failed to fetch resources', loading: false })
    }
  },

  fetchDemands: async (params?: Record<string, string>) => {
    set({ loading: true, error: null })
    try {
      const query = params ? '?' + new URLSearchParams(params).toString() : ''
      const data = await apiGet(`/api/demands${query}`)
      set({
        demands: Array.isArray(data) ? data : data.items || [],
        totalDemands: data.total || (Array.isArray(data) ? data.length : 0),
        loading: false,
      })
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Failed to fetch demands', loading: false })
    }
  },

  setResources: (resources: Resource[]) => set({ resources }),
  setDemands: (demands: Demand[]) => set({ demands }),
}))