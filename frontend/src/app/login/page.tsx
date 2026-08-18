'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Hexagon, Mail, Lock, ShieldCheck, Globe, ArrowRight, UserCheck, Shield } from 'lucide-react';
import { signInWithPassword, signInWithGoogle } from '@/lib/supabase/client';

// Google SVG icon (no emoji)
function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectedFrom = searchParams.get('redirected_from') ?? '/dashboard';
  const oauthError = searchParams.get('error');

  const [role, setRole] = useState<'partner' | 'admin'>('partner');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(
    oauthError === 'oauth_failed' ? 'Google sign-in failed. Please try again.' : null
  );

  // ── Email + Password Sign In ─────────────────────────────────────────────
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { session, error: authError } = await signInWithPassword(email, password);

      if (authError || !session) {
        setError(authError ?? 'Sign in failed.');
        return;
      }

      // Redirect based on role in user_metadata
      const userRole = (session.user.user_metadata?.role as string | undefined) ?? 'PARTNER';
      if (userRole === 'ADMIN' || role === 'admin') {
        router.push('/admin');
      } else {
        router.push(redirectedFrom.startsWith('/admin') ? '/dashboard' : redirectedFrom);
      }
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  // ── Google OAuth Sign In ─────────────────────────────────────────────────
  const handleGoogleSignIn = () => {
    setGoogleLoading(true);
    const dest = role === 'admin' ? '/admin' : '/dashboard';
    signInWithGoogle(dest);
    // Page will redirect — no need to setGoogleLoading(false)
  };

  return (
    <main className="flex min-h-screen w-full flex-col md:flex-row">
      {/* Left Column: Branding */}
      <div className="relative hidden w-full flex-col justify-between bg-primary md:flex md:w-1/2 lg:w-[45%] xl:w-[40%] p-10 text-white">
        <div className="relative z-10 flex flex-col h-full justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary-container text-on-secondary">
              <Hexagon className="w-6 h-6 fill-secondary-container text-primary" />
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">Digitalsofts</span>
          </Link>

          <div className="my-auto max-w-md py-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container border border-primary-container text-secondary-container text-xs font-bold uppercase tracking-wider mb-6">
              <ShieldCheck className="w-4 h-4" /> Enterprise Access Portal
            </div>
            <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
              Empower your enterprise network.
            </h1>
            <p className="text-base text-on-primary-container leading-relaxed">
              Access real-time deal registrations, margin protection metrics, catalog pricing, and commission payouts in one centralized portal.
            </p>
          </div>

          <div className="flex items-center gap-6 border-t border-primary-container pt-6 text-xs text-on-primary-container">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-secondary-container" />
              <span>AES-256 Data Encryption</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-secondary-container" />
              <span>Global 24/7 Portal</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Login Form */}
      <div className="flex w-full flex-col justify-center bg-surface-container-lowest px-6 py-12 md:w-1/2 lg:w-[55%] xl:w-[60%] lg:px-[120px]">
        {/* Mobile Logo */}
        <div className="mb-8 flex md:hidden">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-secondary-container">
              <Hexagon className="w-5 h-5 fill-secondary-container text-primary" />
            </div>
            <span className="text-xl font-bold text-primary">Digitalsofts</span>
          </Link>
        </div>

        <div className="mx-auto w-full max-w-[420px]">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-primary mb-1">Sign in to Portal</h2>
            <p className="text-sm text-on-surface-variant">Welcome back. Select your portal role to continue.</p>
          </div>

          {/* Role Switcher */}
          <div className="flex bg-surface-container-low p-1 rounded-xl mb-6 border border-outline-variant">
            <button
              type="button"
              onClick={() => setRole('partner')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                role === 'partner'
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" /> Partner Login
            </button>
            <button
              type="button"
              onClick={() => setRole('admin')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                role === 'admin'
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              <Shield className="w-3.5 h-3.5" /> Digitalsofts Staff (HR/Finance)
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
              {error}
            </div>
          )}

          {/* Google Sign-In Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 border border-outline-variant bg-surface text-on-surface text-sm font-semibold py-2.5 rounded-lg hover:bg-surface-container-low transition-colors mb-4 disabled:opacity-50 cursor-pointer"
          >
            <GoogleIcon />
            {googleLoading ? 'Redirecting to Google...' : 'Continue with Google'}
          </button>

          {/* Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-outline-variant"></div>
            </div>
            <div className="relative flex justify-center text-[11px]">
              <span className="bg-surface-container-lowest px-3 text-on-surface-variant font-medium">or sign in with email</span>
            </div>
          </div>

          {/* Email + Password */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-primary mb-1.5" htmlFor="email">
                Work Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-outline">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={role === 'partner' ? 'partner@company.com' : 'hr@digitalsofts.com'}
                  className="w-full rounded-lg border border-outline-variant bg-surface py-2.5 pl-10 pr-3 text-sm text-on-surface placeholder:text-outline focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-primary" htmlFor="password">Password</label>
                <Link href="#" className="text-[11px] text-secondary font-semibold hover:underline">Forgot Password?</Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-outline">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-lg border border-outline-variant bg-surface py-2.5 pl-10 pr-3 text-sm text-on-surface placeholder:text-outline focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-secondary-container text-on-secondary font-bold text-sm py-3 rounded-lg hover:bg-secondary transition-all shadow-sm hover:shadow flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In as {role === 'admin' ? 'Digitalsofts Staff' : 'Partner'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-on-surface-variant">
            Don&apos;t have a partner account yet?{' '}
            <Link href="/apply" className="text-secondary font-bold hover:underline">
              Apply to Become a Partner
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-xs text-primary font-semibold">Loading portal sign in...</div>}>
      <LoginForm />
    </Suspense>
  );
}
