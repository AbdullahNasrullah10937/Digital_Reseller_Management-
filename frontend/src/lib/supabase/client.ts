/**
 * Lightweight Supabase Auth client using only the native fetch API.
 * No npm packages required — communicates directly with Supabase REST endpoints.
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export type SupabaseUser = {
  id: string;
  email: string;
  user_metadata: Record<string, unknown>;
};

export type SupabaseSession = {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  user: SupabaseUser;
};

// ── Session Storage (localStorage for browser) ────────────────────────────────

const SESSION_KEY = 'ds_partner_session';

export function saveSession(session: SupabaseSession) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    // Also set a document cookie so middleware can read session state server-side
    document.cookie = `ds_session_token=${session.access_token}; path=/; max-age=604800; SameSite=Lax`;
  }
}

export function getSession(): SupabaseSession | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    const session = JSON.parse(raw) as SupabaseSession;
    // Check if expired (with 60s buffer)
    if (session.expires_at && Date.now() / 1000 > session.expires_at - 60) {
      clearSession();
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

export function clearSession() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(SESSION_KEY);
    document.cookie = 'ds_session_token=; path=/; max-age=0; SameSite=Lax';
  }
}

export function getAccessToken(): string | null {
  return getSession()?.access_token ?? null;
}

// ── Auth API Calls ────────────────────────────────────────────────────────────

export async function signInWithPassword(email: string, password: string): Promise<{ session: SupabaseSession | null; error: string | null }> {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_ANON_KEY,
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    return { session: null, error: data.error_description ?? data.msg ?? 'Sign in failed.' };
  }

  const session: SupabaseSession = {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires_at: Math.floor(Date.now() / 1000) + (data.expires_in ?? 3600),
    user: data.user,
  };

  saveSession(session);
  return { session, error: null };
}

export async function signOut(): Promise<void> {
  const token = getAccessToken();
  if (token) {
    await fetch(`${SUPABASE_URL}/auth/v1/logout`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${token}`,
      },
    }).catch(() => {}); // ignore error — clear local session regardless
  }
  clearSession();
}

export async function getUser(): Promise<SupabaseUser | null> {
  const session = getSession();
  if (!session) return null;

  // Optionally re-validate with Supabase
  try {
    const res = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${session.access_token}`,
      },
    });
    if (!res.ok) {
      clearSession();
      return null;
    }
    return await res.json();
  } catch {
    return session.user; // Fallback to cached user if network fails
  }
}

// ── Google OAuth ───────────────────────────────────────────────────────────────

export function signInWithGoogle(redirectTo: string = '/dashboard') {
  const callbackUrl = encodeURIComponent(
    `${window.location.origin}/auth/callback?next=${redirectTo}`
  );
  const oauthUrl = `${SUPABASE_URL}/auth/v1/authorize?provider=google&redirect_to=${callbackUrl}`;
  window.location.href = oauthUrl;
}

// ── Supabase Data API (REST) ──────────────────────────────────────────────────

export async function supabaseFrom<T>(table: string, query: string = ''): Promise<T[]> {
  const token = getAccessToken();
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
