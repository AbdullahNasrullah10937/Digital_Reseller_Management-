import { createBrowserClient } from '@supabase/ssr';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

let browserClient: ReturnType<typeof createBrowserClient> | null = null;

export function createClient() {
  // cookies must be present: @supabase/ssr 0.1.0 sets it to undefined otherwise
  const options = {
    cookies: {},
    auth: {
      flowType: 'pkce' as const,
      persistSession: typeof window !== 'undefined',
    },
  };

  if (typeof window === 'undefined') {
    return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY, options);
  }

  if (!browserClient) {
    browserClient = createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY, options);
  }

  return browserClient;
}

// Singleton browser client instance (SSR safe)
export const supabase = typeof window !== 'undefined'
  ? createClient()
  : (null as unknown as ReturnType<typeof createBrowserClient>);

export type SupabaseUser = {
  id: string;
  email: string;
  user_metadata: Record<string, unknown>;
};

export type SupabaseSession = {
  access_token: string;
  refresh_token: string;
  expires_at?: number;
  user: SupabaseUser;
};

// ── Session Helpers ──────────────────────────────────────────────────────────

export function getSession(): SupabaseSession | null {
  if (typeof window === 'undefined') return null;
  const projectRef = SUPABASE_URL.split('.')[0]?.split('//')[1] ?? '';
  const match = document.cookie.match(new RegExp(`(?:^|; )sb-${projectRef}-auth-token=([^;]*)`));
  if (match) {
    try {
      const parsed = JSON.parse(decodeURIComponent(match[1]));
      const rawSession = Array.isArray(parsed) ? parsed[0] : parsed;
      if (rawSession && rawSession.access_token) {
        return {
          access_token: rawSession.access_token,
          refresh_token: rawSession.refresh_token ?? '',
          expires_at: rawSession.expires_at,
          user: rawSession.user ?? { id: '', email: '', user_metadata: {} },
        };
      }
    } catch {
      // fallback
    }
  }
  return null;
}

export function getAccessToken(): string | null {
  return getSession()?.access_token ?? null;
}

// ── Auth Actions ─────────────────────────────────────────────────────────────

export async function signInWithPassword(email: string, password: string): Promise<{ session: SupabaseSession | null; error: string | null }> {
  const client = createClient();
  const { data, error } = await client.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.session) {
    return { session: null, error: error?.message ?? 'Sign in failed.' };
  }

  return {
    session: {
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
      expires_at: data.session.expires_at,
      user: {
        id: data.session.user.id,
        email: data.session.user.email ?? '',
        user_metadata: data.session.user.user_metadata,
      },
    },
    error: null,
  };
}

export async function signOut(): Promise<void> {
  const client = createClient();
  await client.auth.signOut();
}

export async function getUser(): Promise<SupabaseUser | null> {
  const client = createClient();
  const { data: { user } } = await client.auth.getUser();
  if (!user) return null;
  return {
    id: user.id,
    email: user.email ?? '',
    user_metadata: user.user_metadata,
  };
}

export async function signInWithGoogle(redirectTo: string = '/dashboard') {
  const client = createClient();
  const origin = window.location.origin;
  const callbackUrl = `${origin}/auth/callback?next=${encodeURIComponent(redirectTo)}`;

  await client.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: callbackUrl,
    },
  });
}

// ── Supabase REST Data API Helper ─────────────────────────────────────────────

export async function supabaseFrom<T>(table: string, query: string = ''): Promise<T[]> {
  const client = createClient();
  const { data: { session } } = await client.auth.getSession();
  const token = session?.access_token ?? getAccessToken();
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}${query ? `?${query}` : ''}`, {
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': token ? `Bearer ${token}` : `Bearer ${SUPABASE_ANON_KEY}`,
      'Accept': 'application/json',
    },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.message ?? `Supabase query on '${table}' failed.`);
  }

  return res.json();
}
