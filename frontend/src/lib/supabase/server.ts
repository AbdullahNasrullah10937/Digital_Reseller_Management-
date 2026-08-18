/**
 * Server-side Supabase helper.
 * No @supabase/ssr needed — uses native fetch.
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function createClient() {
  // Returns a simple object with auth.exchangeCodeForSession for OAuth callback
  return {
    auth: {
      async exchangeCodeForSession(code: string) {
        const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=pkce`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_ANON_KEY,
          },
          body: JSON.stringify({ auth_code: code }),
        });
        if (!res.ok) {
          return { error: await res.json() };
        }
        return { error: null };
      },
    },
  };
}
