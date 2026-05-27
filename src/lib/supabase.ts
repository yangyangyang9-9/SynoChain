import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ovbmwvtvcxkjywjpiaxv.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92Ym13dnR2Y3hranl3anBpYXh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3ODQ2NzgsImV4cCI6MjA5NTM2MDY3OH0.1qZwYls5iCKFA2v_IjgSb8hRz3rLj9z8wty3u71DzkQ'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)