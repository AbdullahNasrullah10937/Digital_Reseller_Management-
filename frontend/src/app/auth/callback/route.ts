import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// This route is the OAuth redirect target for Google Sign-In.
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/dashboard';

  if (code) {
    const supabase = await createClient();
    const { session, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && session) {
      const response = NextResponse.redirect(`${origin}${next}`);
      // Set session cookie so middleware & client can pick it up
      response.cookies.set('ds_session_token', session.access_token, {
        path: '/',
        maxAge: 604800,
        sameSite: 'lax',
      });
      return response;
    }
  }

  return NextResponse.redirect(`${origin}/login?error=oauth_failed`);
}
