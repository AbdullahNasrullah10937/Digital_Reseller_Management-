import { NextResponse, type NextRequest } from 'next/server';

// Routes that require authentication (partner portal)
const PARTNER_ROUTES = ['/dashboard', '/deals', '/products', '/commissions', '/profile'];
// Routes that require admin role
const ADMIN_ROUTES = ['/admin'];
// Public routes — skip middleware
const PUBLIC_ROUTES = ['/', '/login', '/apply', '/emails', '/auth/callback', '/admin/login'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip public routes and static assets
  if (
    PUBLIC_ROUTES.some((r) => pathname === r || pathname.startsWith(r + '/')) ||
    pathname.startsWith('/api/')
  ) {
    return NextResponse.next();
  }

  // Check for Supabase session cookie
  // Supabase stores the session in a cookie named "sb-<project-ref>-auth-token"
  const projectRef = process.env.NEXT_PUBLIC_SUPABASE_URL?.split('.')[0]?.split('//')[1] ?? '';
  const sessionCookieName = `sb-${projectRef}-auth-token`;
  const sessionCookie = request.cookies.get(sessionCookieName)?.value ?? 
                        request.cookies.get('supabase-auth-token')?.value ?? 
                        // Also check legacy cookie name
                        request.cookies.get(`sb-${projectRef}-auth-token.0`)?.value;

  const isAuthenticated = !!sessionCookie;

  const isAdminRoute = ADMIN_ROUTES.some((r) => pathname.startsWith(r));
  const isPartnerRoute = PARTNER_ROUTES.some((r) => pathname.startsWith(r));
  const isAdminLoginPage = pathname === '/admin/login';

  if (!isAuthenticated) {
    if (isPartnerRoute || (isAdminRoute && !isAdminLoginPage)) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = '/login';
      redirectUrl.searchParams.set('redirected_from', pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
