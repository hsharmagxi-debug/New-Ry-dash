import { createClient } from '@supabase/supabase-js';

const env = (typeof import.meta !== 'undefined' && import.meta && import.meta.env) ? import.meta.env : {};
const url = env.VITE_SUPABASE_URL || '';
const key = env.VITE_SUPABASE_ANON_KEY || '';

export const supabaseReady = Boolean(url && key && !url.includes('YOUR-PROJECT'));

export const supabase = supabaseReady
  ? createClient(url, key, { auth: { persistSession: true, autoRefreshToken: true } })
  : null;

if (!supabaseReady) {
  console.warn('[RYDASH] Running in local guest mode.');
}
