import { createClient } from '@supabase/supabase-js';

// ==========================================
// SUPABASE CLIENT — Thay URL và Key thật vào đây
// Lấy từ Supabase Dashboard > Settings > API
// ==========================================

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper: check if Supabase is configured
export const isSupabaseConfigured = (): boolean => {
  return (
    supabaseUrl !== 'https://your-project.supabase.co' &&
    supabaseAnonKey !== 'your-anon-key'
  );
};
