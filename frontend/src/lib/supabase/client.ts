/**
 * Lightweight Supabase Auth client using only the native fetch API.
 * Configured with explicit PKCE flow for OAuth authentication.
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

// ── Session Storage ───────────────────────────────────────────────────────────

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
    document.cookie = 'ds_code_verifier=; path=/; max-age=0; SameSite=Lax';
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
    }).catch(() => {});
  }
  clearSession();
}

export async function getUser(): Promise<SupabaseUser | null> {
  const session = getSession();
  if (!session) return null;

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
    return session.user;
  }
}

// ── Google OAuth (Strict PKCE Flow) ──────────────────────────────────────────

function generateBase64UrlRandom(length: number = 32): string {
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);
  return btoa(String.fromCharCode.apply(null, Array.from(array)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

async function sha256Base64Url(str: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode.apply(null, Array.from(new Uint8Array(digest))))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export async function signInWithGoogle(redirectTo: string = '/dashboard') {
  // Generate PKCE code verifier and S256 code challenge
  const verifier = generateBase64UrlRandom(32);
  const challenge = await sha256Base64Url(verifier);

  // Store code verifier in a cookie so server Route Handler can read it during exchange
  document.cookie = `ds_code_verifier=${verifier}; path=/; max-age=3600; SameSite=Lax`;

  const callbackUrl = encodeURIComponent(
    `${window.location.origin}/auth/callback?next=${redirectTo}`
  );
  
  // Explicit PKCE flow (flowType: 'pkce')
  const oauthUrl = `${SUPABASE_URL}/auth/v1/authorize?provider=google&redirect_to=${callbackUrl}&code_challenge=${challenge}&code_challenge_method=S256`;
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
