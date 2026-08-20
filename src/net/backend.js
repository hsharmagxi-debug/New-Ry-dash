import { supabase, supabaseReady } from './supabaseClient.js';

const LOCAL_KEY = 'rydash_local_scores';
const LOCAL_USER_KEY = 'rydash_guest_id';

export function getGuestId() {
  let id = localStorage.getItem(LOCAL_USER_KEY);
  if (!id) {
    id = typeof crypto !== 'undefined' && crypto.randomUUID
      ? 'guest_' + crypto.randomUUID().slice(0, 8)
      : 'guest_' + Math.random().toString(36).slice(2, 10);
    localStorage.setItem(LOCAL_USER_KEY, id);
  }
  return id;
}

export async function getSession() {
  if (!supabaseReady) return null;
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export async function getCurrentUser() {
  const session = await getSession();
  return session?.user || null;
}

export async function signUp(email, password) {
  if (!supabaseReady) throw new Error('Supabase not configured.');
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
  return data;
}

export async function signIn(email, password) {
  if (!supabaseReady) throw new Error('Supabase not configured.');
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function signOut() {
  if (!supabaseReady) return;
  await supabase.auth.signOut();
}

// OAuth sign-in — currently just 'google' (Gmail). Needs to be enabled with real client
// credentials in the Supabase dashboard first (see README's "Enable Google sign-in" section) —
// until then this throws a clear error instead of silently failing.
export async function signInWithOAuth(provider) {
  if (!supabaseReady) throw new Error('Supabase not configured.');
  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: { redirectTo: window.location.origin },
  });
  if (error) throw error;
  // On success the browser navigates away to the provider's consent screen and back —
  // there's no further local state to update here.
}

export async function submitScore({ name, timeMs, car, livery }) {
  if (supabaseReady) {
    const { error } = await supabase.from('scores').insert({
      driver_name: name,
      time_ms: timeMs,
      car,
      livery,
    });
    if (error) console.warn('Supabase score insert failed, falling back locally:', error.message);
    else return;
  }
  const scores = JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]');
  scores.push({ driver_name: name, time_ms: timeMs, car, livery, created_at: new Date().toISOString() });
  scores.sort((a, b) => a.time_ms - b.time_ms);
  localStorage.setItem(LOCAL_KEY, JSON.stringify(scores.slice(0, 50)));
}

export async function fetchLeaderboard(limit = 20) {
  if (supabaseReady) {
    const { data, error } = await supabase
      .from('scores')
      .select('driver_name,time_ms,car,livery,created_at')
      .order('time_ms', { ascending: true })
      .limit(limit);
    if (!error && data) return data;
  }
  const scores = JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]');
  return scores.slice(0, limit);
}

// Real recent race submissions (not fabricated activity) — most recent first. Used by the
// Home screen's activity feed. Returns [] on an empty/unconfigured backend rather than
// inventing placeholder players.
export async function fetchRecentActivity(limit = 5) {
  if (supabaseReady) {
    const { data, error } = await supabase
      .from('scores')
      .select('driver_name,time_ms,car,created_at')
      .order('created_at', { ascending: false })
      .limit(limit);
    if (!error && data) return data;
  }
  const scores = JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]');
  return [...scores].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, limit);
}

export async function fetchProfile(userId) {
  if (!supabaseReady || !userId) return null;
  const { data, error } = await supabase
    .from('profiles')
    .select('display_name,favorite_car,favorite_livery')
    .eq('id', userId)
    .maybeSingle();
  if (error) {
    console.warn('Failed to fetch profile:', error.message);
    return null;
  }
  return data;
}

export async function upsertProfile(userId, profile) {
  if (!supabaseReady || !userId) return;
  const { error } = await supabase
    .from('profiles')
    .upsert({
      id: userId,
      ...profile,
      updated_at: new Date().toISOString(),
    });
  if (error) console.warn('Failed to update profile:', error.message);
}
