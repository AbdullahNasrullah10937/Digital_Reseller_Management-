import { NextResponse, type NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';

// Server-side Route Handler for PKCE OAuth callback
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/dashboard';
  const error = searchParams.get('error');

  // If there's an error query param or missing code, redirect to error route (no silent failure)
  if (error || !code) {
    const errorUrl = new URL('/login', origin);
    errorUrl.searchParams.set('error', error ?? 'oauth_failed');
    return NextResponse.redirect(errorUrl);
  }

  // Get stored PKCE code_verifier from cookies
  const cookieStore = cookies();
  const codeVerifier = cookieStore.get('ds_code_verifier')?.value;

  const supabase = await createClient();
  const { session, error: exchangeError } = await supabase.auth.exchangeCodeForSession(
    code,
    codeVerifier
  );

  if (exchangeError || !session) {
    const errorUrl = new URL('/login', origin);
    errorUrl.searchParams.set('error', 'oauth_failed');
    return NextResponse.redirect(errorUrl);
  }

  // Create redirect response to target destination
  const response = NextResponse.redirect(new URL(next, origin));

  // Set session cookie for SSR middleware
  response.cookies.set('ds_session_token', session.access_token, {
    path: '/',
    maxAge: 604800,
    sameSite: 'lax',
  });

  // Clear temporary code_verifier cookie
  response.cookies.delete('ds_code_verifier');

  return response;
}
