'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { saveSession, SupabaseSession } from '@/lib/supabase/client';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

function AuthCallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next') ?? '/dashboard';
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const processCallback = async () => {
      const hash = window.location.hash;
      const search = window.location.search;

      // 1. Check for error in hash or search
      const hashParams = new URLSearchParams(hash.replace(/^#/, ''));
      const queryParams = new URLSearchParams(search);

      const err = hashParams.get('error') || queryParams.get('error');
      const errDesc = hashParams.get('error_description') || queryParams.get('error_description');

      if (err || errDesc) {
        if (errDesc?.includes('Provider') || errDesc?.includes('disabled') || err === 'unsupported_provider') {
          setErrorMsg(
            'Google Sign-In is not enabled yet in your Supabase project. Please enable Google in Supabase Dashboard → Authentication → Providers → Google.'
          );
        } else {
          setErrorMsg(errDesc ?? err ?? 'Google Sign-In failed.');
        }
        return;
      }

      // 2. Implicit Flow: Hash fragment contains access_token
      const accessToken = hashParams.get('access_token');
      const refreshToken = hashParams.get('refresh_token');
      const expiresIn = hashParams.get('expires_in');

      if (accessToken) {
        try {
          // Fetch user metadata from Supabase
          const userRes = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
            headers: {
              apikey: SUPABASE_ANON_KEY,
              Authorization: `Bearer ${accessToken}`,
            },
          });

          if (!userRes.ok) {
            setErrorMsg('Failed to fetch user credentials after Google sign in.');
            return;
          }

          const user = await userRes.json();
          const session: SupabaseSession = {
            access_token: accessToken,
            refresh_token: refreshToken ?? '',
            expires_at: Math.floor(Date.now() / 1000) + (expiresIn ? parseInt(expiresIn, 10) : 3600),
            user,
          };

          // Save session to localStorage AND ds_session_token cookie
          saveSession(session);

          // Redirect to target destination
          router.push(next);
          router.refresh();
          return;
        } catch (e: unknown) {
          setErrorMsg(e instanceof Error ? e.message : 'Error processing OAuth callback.');
          return;
        }
      }

      // 3. PKCE Flow: Query parameter contains code
      const code = queryParams.get('code');
      if (code) {
        try {
          const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=pkce`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              apikey: SUPABASE_ANON_KEY,
            },
            body: JSON.stringify({ auth_code: code }),
          });

          if (!res.ok) {
            const errData = await res.json().catch(() => ({}));
            setErrorMsg(errData?.error_description ?? 'Failed to exchange authorization code.');
            return;
          }

          const data = await res.json();
          const session: SupabaseSession = {
            access_token: data.access_token,
            refresh_token: data.refresh_token,
            expires_at: Math.floor(Date.now() / 1000) + (data.expires_in ?? 3600),
            user: data.user,
          };

          saveSession(session);
          router.push(next);
          router.refresh();
          return;
        } catch (e: unknown) {
          setErrorMsg(e instanceof Error ? e.message : 'PKCE exchange error.');
          return;
        }
      }

      // Fallback if no token/code present
      setErrorMsg('No authorization token received. Please try signing in again.');
    };

    processCallback();
  }, [next, router]);

  if (errorMsg) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-surface border border-outline-variant rounded-2xl p-8 max-w-md w-full shadow-lg space-y-4">
          <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto text-xl font-bold">
            !
          </div>
          <h1 className="text-lg font-bold text-primary">Authentication Notice</h1>
          <p className="text-xs text-on-surface-variant leading-relaxed">{errorMsg}</p>
          <div className="pt-2">
            <button
              onClick={() => router.push('/login')}
              className="w-full bg-primary text-white text-xs font-bold py-2.5 rounded-xl hover:bg-primary-container transition-colors cursor-pointer"
            >
              Back to Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
      <div className="space-y-3">
        <div className="w-8 h-8 border-3 border-secondary-container border-t-transparent rounded-full animate-spin mx-auto"></div>
        <div className="text-xs text-primary font-bold">Completing Google Authentication...</div>
      </div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-xs text-primary font-semibold">Processing login...</div>}>
      <AuthCallbackHandler />
    </Suspense>
  );
}
