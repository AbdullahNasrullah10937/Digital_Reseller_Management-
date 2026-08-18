import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/dashboard';
  const error = searchParams.get('error');

  // Redirect to error route if there is an error parameter or code is missing (no silent failure)
  if (error || !code) {
    const errorUrl = new URL('/login', origin);
    errorUrl.searchParams.set('error', error ?? 'oauth_failed');
    return NextResponse.redirect(errorUrl);
  }

  const supabase = await createClient();
  const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

  if (exchangeError) {
    const errorUrl = new URL('/login', origin);
    errorUrl.searchParams.set('error', 'oauth_failed');
    return NextResponse.redirect(errorUrl);
  }

  // Redirect to destination — @supabase/ssr setAll adapter manages Supabase session cookies automatically
  return NextResponse.redirect(new URL(next, origin));
}
