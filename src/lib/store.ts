import { create } from 'zustand'
import { createClient } from './supabase'
import { levels } from './levels'

interface User {
  id: string
  email: string
  username: string
  current_level: number
  lives: number
  coins: number
  skip_cards: number
  revive_cards: number
  speed_cards: number
  in_treatment: boolean
  treatment_end_time: string | null
  treatment_level: number | null
  created_at: string
}

interface GameState {
  user: User | null
  loading: boolean
  setUser: (user: User | null) => void
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, username: string) => Promise<void>
  logout: () => Promise<void>
  answerQuestion: (levelId: number, answer: number) => Promise<boolean>
  checkIn: () => Promise<void>
  useSkipCard: () => Promise<void>
  useReviveCard: () => Promise<void>
  useSpeedCard: () => Promise<void>
  helpFriend: (friendId: string) => Promise<void>
}

export const useGameStore = create<GameState>((set, get) => ({
  user: null,
  loading: true,

  setUser: (user) => set({ user }),

  login: async (email, password) => {
    const supabase = createClient()
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error
    if (data.user) {
      const { data: userData } = await supabase
        .from('users')
        .select('*')
        .eq('id', data.user.id)
        .single()
      set({ user: userData })
    }
  },

  register: async (email, password, username) => {
    const supabase = createClient()
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    if (error) throw error
    if (data.user) {
      await supabase.from('users').insert({
        id: data.user.id,
        email,
        username,
        current_level: 1,
        lives: 3,
        coins: 0,
        skip_cards: 0,
        revive_cards: 0,
        speed_cards: 0,
        in_treatment: false,
      })
      const { data: userData } = await supabase
        .from('users')
        .select('*')
        .eq('id', data.user.id)
        .single()
      set({ user: userData })
    }
  },

  logout: async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    set({ user: null })
  },

  answerQuestion: async (levelId, answer) => {
    const supabase = createClient()
    const { user } = get()
    if (!user) return false

    const level = levels.find(l => l.id === levelId)
    if (!level) return false

    const isCorrect = answer === level.correctAnswer

    if (isCorrect) {
      await supabase
        .from('users')
        .update({ current_level: levelId + 1, coins: user.coins + 10 })
        .eq('id', user.id)
      
      await supabase.from('level_history').insert({
        user_id: user.id,
        level_id: levelId,
        correct: true,
      })

      set({ user: { ...user, current_level: levelId + 1, coins: user.coins + 10 } })
    } else {
      const newLives = user.lives - 1
      
      if (newLives <= 0) {
        const treatmentEndTime = new Date()
        treatmentEndTime.setDate(treatmentEndTime.getDate() + level.treatmentDays)
        
        await supabase
          .from('users')
          .update({ 
            lives: 0, 
            in_treatment: true,
            treatment_end_time: treatmentEndTime.toISOString(),
            treatment_level: levelId,
          })
          .eq('id', user.id)
        
        set({ user: { 
          ...user, 
          lives: 0, 
          in_treatment: true,
          treatment_end_time: treatmentEndTime.toISOString(),
          treatment_level: levelId,
        }})
      } else {
        await supabase
          .from('users')
          .update({ lives: newLives })
          .eq('id', user.id)
        set({ user: { ...user, lives: newLives } })
      }

      await supabase.from('level_history').insert({
        user_id: user.id,
        level_id: levelId,
        correct: false,
      })
    }

    return isCorrect
  },

  checkIn: async () => {
    const supabase = createClient()
    const { user } = get()
    if (!user) return

    const today = new Date().toISOString().split('T')[0]
    const { data: checkins } = await supabase
      .from('checkins')
      .select('*')
      .eq('user_id', user.id)
      .gte('created_at', today)
      .limit(1)

    if (checkins && checkins.length > 0) {
      throw new Error('今日已签到')
    }

    await supabase.from('checkins').insert({
      user_id: user.id,
    })

    let coins = user.coins + 5
    let speedCards = user.speed_cards

    const { data: allCheckins } = await supabase
      .from('checkins')
      .select('created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(7)

    if (allCheckins && allCheckins.length === 7) {
      const dates = allCheckins.map(c => new Date(c.created_at).toISOString().split('T')[0])
      const uniqueDates = [...new Set(dates)]
      
      if (uniqueDates.length === 7) {
        speedCards += 1
        coins += 50
      }
    }

    if (user.in_treatment && user.treatment_end_time) {
      const endTime = new Date(user.treatment_end_time)
      endTime.setDate(endTime.getDate() - 1)
      
      await supabase
        .from('users')
        .update({ treatment_end_time: endTime.toISOString(), coins, speed_cards: speedCards })
        .eq('id', user.id)
      
      set({ user: { ...user, coins, speed_cards: speedCards, treatment_end_time: endTime.toISOString() } })
    } else {
      await supabase
        .from('users')
        .update({ coins, speed_cards: speedCards })
        .eq('id', user.id)
      
      set({ user: { ...user, coins, speed_cards: speedCards } })
    }
  },

  useSkipCard: async () => {
    const supabase = createClient()
    const { user } = get()
    if (!user || user.skip_cards <= 0) return

    await supabase
      .from('users')
      .update({ 
        current_level: user.current_level + 1,
        skip_cards: user.skip_cards - 1,
      })
      .eq('id', user.id)
    
    set({ user: { ...user, current_level: user.current_level + 1, skip_cards: user.skip_cards - 1 } })
  },

  useReviveCard: async () => {
    const supabase = createClient()
    const { user } = get()
    if (!user || user.revive_cards <= 0 || !user.in_treatment) return

    await supabase
      .from('users')
      .update({ 
        lives: 3,
        in_treatment: false,
        treatment_end_time: null,
        treatment_level: null,
        revive_cards: user.revive_cards - 1,
      })
      .eq('id', user.id)
    
    set({ user: { 
      ...user, 
      lives: 3, 
      in_treatment: false,
      treatment_end_time: null,
      treatment_level: null,
      revive_cards: user.revive_cards - 1,
    }})
  },

  useSpeedCard: async () => {
    const supabase = createClient()
    const { user } = get()
    if (!user || user.speed_cards <= 0 || !user.in_treatment || !user.treatment_end_time) return

    const endTime = new Date(user.treatment_end_time)
    endTime.setDate(endTime.getDate() - 3)

    await supabase
      .from('users')
      .update({ 
        treatment_end_time: endTime.toISOString(),
        speed_cards: user.speed_cards - 1,
      })
      .eq('id', user.id)
    
    set({ user: { 
      ...user, 
      treatment_end_time: endTime.toISOString(),
      speed_cards: user.speed_cards - 1,
    }})
  },

  helpFriend: async (friendId) => {
    const supabase = createClient()
    const { user } = get()
    if (!user) return

    const today = new Date().toISOString().split('T')[0]
    const { data: helps } = await supabase
      .from('friend_helps')
      .select('*')
      .eq('helper_id', user.id)
      .gte('created_at', today)
      .limit(1)

    if (helps && helps.length > 0) {
      throw new Error('今日已帮助过好友')
    }

    const { data: friend } = await supabase
      .from('users')
      .select('*')
      .eq('id', friendId)
      .single()

    if (!friend || !friend.in_treatment || !friend.treatment_end_time) {
      throw new Error('好友无需帮助')
    }

    const endTime = new Date(friend.treatment_end_time)
    endTime.setDate(endTime.getDate() - 1)

    await supabase
      .from('users')
      .update({ treatment_end_time: endTime.toISOString() })
      .eq('id', friendId)

    await supabase.from('friend_helps').insert({
      helper_id: user.id,
      helped_id: friendId,
    })
  },
}))
