'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Hexagon, 
  LayoutDashboard, 
  UserCheck, 
  Handshake, 
  Users, 
  DollarSign, 
  ShieldAlert, 
  LogOut, 
  Menu, 
  X, 
  Bell, 
  ArrowLeft,
  ChevronRight
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const adminNav = [
    { href: '/admin', label: 'Admin Overview', icon: LayoutDashboard },
    { href: '/admin/applications', label: 'Partner Applications', icon: UserCheck },
    { href: '/admin/deals', label: 'Deal Approvals', icon: Handshake },
    { href: '/admin/partners', label: 'All Partners Roster', icon: Users },
    { href: '/admin/commissions', label: 'All Commissions & Payouts', icon: DollarSign },
  ];

  return (
    <div className="min-h-screen bg-background text-on-background flex flex-col md:flex-row font-sans">
      {/* Mobile Header Bar */}
      <div className="md:hidden bg-primary text-white p-4 flex justify-between items-center sticky top-0 z-40 shadow-md">
        <Link href="/admin" className="flex items-center gap-2 font-bold text-lg">
          <div className="w-8 h-8 rounded-lg bg-secondary-container flex items-center justify-center text-primary">
            <Hexagon className="w-5 h-5 fill-primary text-secondary-container" />
          </div>
          <span>Digitalsofts Staff</span>
        </Link>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 text-white">
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Admin Sidebar */}
      <aside className={`
        fixed md:sticky top-0 z-50 h-screen w-70 bg-primary text-white flex flex-col justify-between border-r border-primary-container transition-transform duration-300
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6 space-y-6">
          <Link href="/admin" className="hidden md:flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-secondary-container flex items-center justify-center text-primary shadow-md">
              <Hexagon className="w-6 h-6 fill-primary text-secondary-container" />
            </div>
            <div>
              <div className="font-bold text-lg leading-none">Digitalsofts</div>
              <div className="text-[11px] text-secondary-container font-bold uppercase tracking-wider mt-0.5">HR & Finance Portal</div>
            </div>
          </Link>

          {/* Role Indicator Badge */}
          <div className="bg-primary-container p-3 rounded-xl border border-on-primary-container/20 text-xs">
            <div className="flex justify-between items-center text-on-primary-container">
              <span>Authority Role:</span>
              <span className="font-bold text-white bg-secondary-container/20 text-secondary-container px-2 py-0.5 rounded border border-secondary-container/30">
                Single Approver (HR)
              </span>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="space-y-1 pt-2">
            {adminNav.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

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

        {/* Footer */}
        <div className="p-4 border-t border-primary-container space-y-3">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary-container/60 hover:bg-primary-container text-[11px] font-semibold text-on-primary-container transition-colors border border-primary-container"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Partner View</span>
          </Link>

          <div className="flex items-center gap-3 px-2 py-1.5">
            <div className="w-8 h-8 rounded-full bg-secondary-container text-primary font-bold text-xs flex items-center justify-center">
              HR
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="text-xs font-bold truncate text-white">HR Approver</div>
              <div className="text-[10px] text-on-primary-container truncate">hr@digitalsofts.com</div>
            </div>
            <Link href="/login" className="text-on-primary-container hover:text-red-400 p-1" title="Sign Out">
              <LogOut className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content View */}
      <div className="flex-1 flex flex-col min-w-0 bg-background">
        <header className="hidden md:flex justify-between items-center px-8 py-4 border-b border-outline-variant bg-surface sticky top-0 z-30">
          <div>
            <h1 className="text-xl font-bold text-primary">HR Admin Management Console</h1>
            <p className="text-xs text-on-surface-variant">Review partner applications, approve registered deals, and release payouts.</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              ● Server Status: Healthy
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8 max-w-container-max w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
