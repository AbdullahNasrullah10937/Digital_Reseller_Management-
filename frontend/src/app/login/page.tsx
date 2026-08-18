'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Hexagon, Mail, Lock, ShieldCheck, Globe, ArrowRight, UserCheck, Shield } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<'partner' | 'admin'>('partner');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
    }, 1000);
  };

  return (
    <main className="flex min-h-screen w-full flex-col md:flex-row">
      {/* Left Column: Branding & Trust */}
      <div className="relative hidden w-full flex-col justify-between bg-primary md:flex md:w-1/2 lg:w-[45%] xl:w-[40%] p-10 text-white">
        <div className="relative z-10 flex flex-col h-full justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary-container text-on-secondary">
              <Hexagon className="w-6 h-6 fill-secondary-container text-primary" />
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">Digitalsofts</span>
          </Link>

          {/* Value Prop */}
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

          {/* Security badges */}
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

      {/* Right Column: Login Interface */}
      <div className="flex w-full flex-col justify-center bg-surface-container-lowest px-6 py-12 md:w-1/2 lg:w-[55%] xl:w-[60%] lg:px-[120px]">
        {/* Mobile Header Logo */}
        <div className="mb-8 flex md:hidden">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-secondary-container">
              <Hexagon className="w-5 h-5 fill-secondary-container text-primary" />
            </div>
            <span className="text-xl font-bold text-primary">Digitalsofts</span>
          </Link>
        </div>

        <div className="mx-auto w-full max-w-[420px]">
          {/* Header Title */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-primary mb-1">Sign in to Portal</h2>
            <p className="text-sm text-on-surface-variant">Welcome back. Select your portal role to continue.</p>
          </div>

          {/* Role Switcher Tabs */}
          <div className="flex bg-surface-container-low p-1 rounded-xl mb-6 border border-outline-variant">
            <button
              type="button"
              onClick={() => setRole('partner')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
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
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                role === 'admin'
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              <Shield className="w-3.5 h-3.5" /> Digitalsofts Staff (HR/Finance)
            </button>
          </div>

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
                <label className="text-xs font-semibold text-primary" htmlFor="password">
                  Password
                </label>
                <Link href="#" className="text-[11px] text-secondary font-semibold hover:underline">
                  Forgot Password?
                </Link>
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

            <div className="flex items-center justify-between text-xs py-1">
              <label className="flex items-center gap-2 cursor-pointer text-on-surface-variant">
                <input type="checkbox" defaultChecked className="rounded border-outline-variant text-secondary-container focus:ring-secondary-container" />
                <span>Remember this device</span>
              </label>
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

          {/* Quick Demo Credentials Box */}
          <div className="mt-8 border border-outline-variant bg-surface-container-low rounded-xl p-3.5 text-xs">
            <div className="font-bold text-primary mb-1">⚡ Quick Testing Access:</div>
            <div className="text-on-surface-variant space-y-1 text-[11px]">
              <div>• <strong>Partner Demo:</strong> Enter any email & click Sign In (opens Partner Dashboard)</div>
              <div>• <strong>Staff Demo:</strong> Switch to Staff tab & click Sign In (opens Admin Dashboard)</div>
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-on-surface-variant">
            Don't have a partner account yet?{' '}
            <Link href="/apply" className="text-secondary font-bold hover:underline">
              Apply to Become a Partner
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
