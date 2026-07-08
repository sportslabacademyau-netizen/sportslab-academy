import { createClient } from '@supabase/supabase-js'

// Canonical Supabase project — hardcoded (not the env var) so production can
// never build against a wrong/misconfigured NEXT_PUBLIC_SUPABASE_URL. These are
// public client-side values (the anon/publishable key is meant to be exposed in
// the browser), so it is safe to commit them. Same pattern as SITE_URL in lib/site.ts.
//
// The known-bad value that broke login/signup in production was:
//   https://IG2uCYB88E065M1V.supabase.co  (that string is actually the anon
//   key suffix, mistakenly used as the project URL — it does not resolve).
const SUPABASE_URL = 'https://umlzgzhlmyzcewzzgakd.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_IG2uCYB88E065M1V-BThDw_spsGyCQt'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
