'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Hexagon, 
  LayoutDashboard, 
  Handshake, 
  PlusCircle, 
  ShoppingBag, 
  DollarSign, 
  User, 
  LogOut, 
  Menu, 
  X, 
  Bell, 
  ShieldAlert,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { getSession, signOut as supabaseSignOut } from '@/lib/supabase/client';

export default function PartnerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('Partner');
  const [userInitials, setUserInitials] = useState('P');
  const [tier, setTier] = useState('Reseller');
  const [commissionRate, setCommissionRate] = useState('30%');

  useEffect(() => {
    const session = getSession();
    if (session?.user) {
      const user = session.user;
      const meta = user.user_metadata ?? {};
      const email = user.email ?? '';
      const name = (meta.full_name as string | undefined) ?? (meta.name as string | undefined) ?? email.split('@')[0] ?? 'Partner';
      setUserEmail(email);
      setUserName(name);
      setUserInitials(name.split(' ').map((w: string) => w[0]).join('').toUpperCase().slice(0, 2));
      if (meta.tier) setTier(meta.tier as string);
      if (meta.commission_rate) setCommissionRate(`${meta.commission_rate}%`);
    }
  }, []);

  const handleSignOut = async () => {
    await supabaseSignOut();
    router.push('/login');
    router.refresh();
  };

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/deals', label: 'My Deals', icon: Handshake },
    { href: '/deals/new', label: 'Register New Deal', icon: PlusCircle },
    { href: '/products', label: 'Products & Pricing', icon: ShoppingBag },
    { href: '/commissions', label: 'Commissions & Payouts', icon: DollarSign },
    { href: '/profile', label: 'Profile & Settings', icon: User },
  ];

  return (
    <div className="min-h-screen bg-background text-on-background flex flex-col md:flex-row font-sans">
      {/* Mobile Header Bar */}
      <div className="md:hidden bg-primary text-white p-4 flex justify-between items-center sticky top-0 z-40 shadow-md">
        <Link href="/dashboard" className="flex items-center gap-2 font-bold text-lg">
          <div className="w-8 h-8 rounded-lg bg-secondary-container flex items-center justify-center text-primary">
            <Hexagon className="w-5 h-5 fill-primary text-secondary-container" />
          </div>
          <span>Digitalsofts</span>
        </Link>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 text-white">
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar (Desktop 280px & Mobile Drawer) */}
      <aside className={`
        fixed md:sticky top-0 z-50 h-screen w-70 bg-brand-dark-navy text-white flex flex-col justify-between border-r border-primary-container transition-transform duration-300
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6 space-y-6">
          {/* Logo Header */}
          <Link href="/dashboard" className="hidden md:flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-secondary-container flex items-center justify-center text-primary shadow-md">
              <Hexagon className="w-6 h-6 fill-primary text-secondary-container" />
            </div>
            <div>
              <div className="font-bold text-lg leading-none">Digitalsofts</div>
              <div className="text-[11px] text-on-primary-container font-mono">Partner Portal</div>
            </div>
          </Link>

          {/* Current Partner Tier Badge */}
          <div className="bg-primary-container/80 border border-primary-container p-3.5 rounded-xl">
            <div className="flex justify-between items-center text-xs text-on-primary-container mb-1">
              <span>Partner Tier:</span>
              <span className="font-bold text-secondary-container">{tier}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-white font-medium">Commission Rate:</span>
              <span className="font-bold text-emerald-400">{commissionRate}</span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1 pt-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname?.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`
                    flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold transition-colors duration-200 cursor-pointer
                    ${isActive 
                      ? 'bg-secondary-container text-on-secondary shadow-sm' 
                      : 'text-on-primary-container hover:bg-primary-container hover:text-white'}
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span className="flex-1">{item.label}</span>
                  {isActive && <ChevronRight className="w-3.5 h-3.5" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-primary-container space-y-3">
          <Link
            href="/admin"
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary-container/60 hover:bg-primary-container text-[11px] font-semibold text-secondary-container transition-colors border border-primary-container"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Switch to Admin Portal</span>
            <ExternalLink className="w-3 h-3 ml-auto" />
          </Link>

          <div className="flex items-center gap-3 px-2 py-1.5">
            <div className="w-8 h-8 rounded-full bg-secondary-container text-primary font-bold text-xs flex items-center justify-center">
              {userInitials}
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="text-xs font-bold truncate text-white">{userName}</div>
              <div className="text-[10px] text-on-primary-container truncate">{userEmail}</div>
            </div>
            <button onClick={handleSignOut} className="text-on-primary-container hover:text-red-400 p-1 cursor-pointer" title="Sign Out">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main View Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-background">
        {/* Top Desktop Bar */}
        <header className="hidden md:flex justify-between items-center px-8 py-4 border-b border-outline-variant bg-surface sticky top-0 z-30">
          <div>
            <h1 className="text-xl font-bold text-primary">Partner Portal</h1>
            <p className="text-xs text-on-surface-variant">Welcome back, {userName}</p>
          </div>

          <div className="flex items-center gap-4">
            {/* Quick Deal Action */}
            <Link href="/deals/new" className="bg-secondary-container text-on-secondary text-xs font-bold px-4 py-2 rounded-lg hover:bg-secondary transition-colors flex items-center gap-1.5 shadow-xs">
              <PlusCircle className="w-4 h-4" /> Register Deal
            </Link>

            {/* Notification Bell */}
            <button className="relative p-2 rounded-lg border border-outline-variant hover:bg-surface-container-high text-on-surface-variant">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-secondary-container"></span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-8 max-w-container-max w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
