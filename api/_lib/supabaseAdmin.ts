import { createClient } from '@supabase/supabase-js';

// Server-only client using the service role key, which bypasses Row Level Security.
// Only ever import this from inside api/ - never bundle it into client-side code.
// Distinct from src/lib/supabase.ts (the anon-key client used in the browser), which
// respects RLS and can't write to tables like purchases that have no client insert policy.
let cachedClient: any = null;

export function getSupabaseAdmin() {
  if (cachedClient) return cachedClient;

  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in the server environment');
  }

  cachedClient = createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  return cachedClient;
}
