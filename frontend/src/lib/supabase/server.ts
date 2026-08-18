/**
 * Server-side Supabase helper.
 * Supports PKCE code exchange with code_verifier via Supabase Auth REST.
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function createClient() {
  return {
    auth: {
      async exchangeCodeForSession(code: string, codeVerifier?: string) {
        const bodyPayload: Record<string, string> = { auth_code: code };
        if (codeVerifier) {
          bodyPayload.code_verifier = codeVerifier;
        }

        const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=pkce`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_ANON_KEY,
          },
          body: JSON.stringify(bodyPayload),
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          return { session: null, error: errData };
        }

        const data = await res.json();
        return {
          session: {
            access_token: data.access_token,
            refresh_token: data.refresh_token,
            expires_at: Math.floor(Date.now() / 1000) + (data.expires_in ?? 3600),
            user: data.user,
          },
          error: null,
        };
      },
    },
  };
}
