import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabaseReady = Boolean(url && key && !url.includes('YOUR-PROJECT'));

export const supabase = supabaseReady
  ? createClient(url, key, { auth: { persistSession: true, autoRefreshToken: true } })
  : null;

if (!supabaseReady) {
  console.warn('[RYDASH] Supabase not configured — running in local/offline mode. See .env.example.');
}
