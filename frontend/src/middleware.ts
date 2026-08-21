import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

const PARTNER_ROUTES = ['/dashboard', '/deals', '/products', '/commissions', '/profile'];
const ADMIN_ROUTES = ['/admin'];
const PUBLIC_ROUTES = ['/', '/login', '/apply', '/emails', '/auth/callback', '/admin/login', '/privacy', '/terms', '/support'];

function isPublicPath(pathname: string) {
  return (
    PUBLIC_ROUTES.some((r) => pathname === r || pathname.startsWith(r + '/')) ||
    pathname.startsWith('/api/')
  );
}

function nextPassThrough(request: NextRequest) {
  return NextResponse.next({
    request: { headers: request.headers },
  });
}

function redirectToLogin(request: NextRequest) {
  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = '/login';
  redirectUrl.searchParams.set('redirected_from', request.nextUrl.pathname);
  return NextResponse.redirect(redirectUrl);
}

export async function updateSession(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Privacy / Terms / Support / landing never need auth.
  // Creating a Supabase client here crashes the page when URL/key env vars are missing.
  if (isPublicPath(pathname)) {
    return nextPassThrough(request);
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';
  const isAdminRoute = ADMIN_ROUTES.some((r) => pathname.startsWith(r));
  const isPartnerRoute = PARTNER_ROUTES.some((r) => pathname.startsWith(r));

  if (!supabaseUrl || !supabaseKey) {
    if (isPartnerRoute || isAdminRoute) {
      return redirectToLogin(request);
    }
    return nextPassThrough(request);
  }

  let response = nextPassThrough(request);

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        request.cookies.set({ name, value });
        response = nextPassThrough(request);
        response.cookies.set({ name, value, ...options });
      },
      remove(name: string, options: CookieOptions) {
        request.cookies.set({ name, value: '' });
        response = nextPassThrough(request);
        response.cookies.set({ name, value: '', ...options });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && (isPartnerRoute || isAdminRoute)) {
    return redirectToLogin(request);
  }

  return response;
}

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
