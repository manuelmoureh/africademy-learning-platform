import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured) {
  console.warn('Supabase env vars missing — set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local. Auth/progress features are disabled until then.');
}

// createClient throws synchronously on an invalid URL, which would crash the whole app
// before React even mounts — fall back to a placeholder so the app still boots and just
// fails individual requests (handled by callers) when Supabase isn't configured yet.
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key'
);
