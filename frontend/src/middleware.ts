import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

const PARTNER_ROUTES = ['/dashboard', '/deals', '/products', '/commissions', '/profile'];
const ADMIN_ROUTES = ['/admin'];
const PUBLIC_ROUTES = ['/', '/login', '/apply', '/emails', '/auth/callback', '/admin/login'];

type CookieToSet = {
  name: string;
  value: string;
  options?: CookieOptions;
};

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: CookieToSet[]) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Calling getUser refreshes the access token if expired and updates session cookies
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  if (
    PUBLIC_ROUTES.some((r) => pathname === r || pathname.startsWith(r + '/')) ||
    pathname.startsWith('/api/')
  ) {
    return response;
  }

  const isAdminRoute = ADMIN_ROUTES.some((r) => pathname.startsWith(r));
  const isPartnerRoute = PARTNER_ROUTES.some((r) => pathname.startsWith(r));
  const isAdminLoginPage = pathname === '/admin/login';

  if (!user) {
    if (isPartnerRoute || (isAdminRoute && !isAdminLoginPage)) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = '/login';
      redirectUrl.searchParams.set('redirected_from', pathname);
      return NextResponse.redirect(redirectUrl);
    }
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
