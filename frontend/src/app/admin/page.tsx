'use client';

import Link from 'next/link';
import { 
  UserCheck, 
  Handshake, 
  Users, 
  DollarSign, 
  ArrowUpRight, 
  ShieldAlert, 
  Clock, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';

export default function AdminDashboardPage() {
  const adminMetrics = [
    { title: 'Pending Partner Applications', value: '3 Pending', action: 'Review Queue', href: '/admin/applications', color: 'text-amber-600', border: 'border-amber-200' },
    { title: 'Pending Deal Approvals', value: '2 Pending', action: 'Approve Deals', href: '/admin/deals', color: 'text-blue-600', border: 'border-blue-200' },
    { title: 'Active Registered Partners', value: '48 Active', action: 'View Roster', href: '/admin/partners', color: 'text-primary', border: 'border-outline-variant' },
    { title: 'Unpaid Approved Commissions', value: '$14,200', action: 'Manage Payouts', href: '/admin/commissions', color: 'text-emerald-600', border: 'border-emerald-200' },
  ];

  const pendingApplications = [
    { id: 'APP-104', company: 'Apex Tech Solutions', applicant: 'Usman Tariq', country: 'Pakistan', tier: 'Reseller (30%)', date: '2 hours ago' },
    { id: 'APP-103', company: 'Gulf Software Systems', applicant: 'Tariq Al-Mansoor', country: 'Saudi Arabia', tier: 'Certified Reseller', date: '5 hours ago' },
  ];

  const pendingDeals = [
    { id: 'DS-9088', partner: 'TechSolutions Ltd', customer: 'Faisal Textile Mills', product: 'Textile Industry ERP', value: '$35,000', flag: false },
    { id: 'DS-9092', partner: 'CloudSystems Inc', customer: 'Packages Mall Limited', product: 'Retail Management Software', value: '$25,000', flag: true },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-primary text-white rounded-2xl p-6 md:p-8 space-y-3 border border-primary-container shadow-md">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/20 border border-secondary-container/40 text-secondary-container text-xs font-bold uppercase tracking-wider">
          <ShieldAlert className="w-4 h-4" /> Single Approver Authority (HR)
        </div>
        <h1 className="text-2xl md:text-3xl font-bold">HR Operational Overview</h1>
        <p className="text-xs text-on-primary-container max-w-2xl leading-relaxed">
          All partner applications and deal registrations route directly to HR's approval queue. Only HR and authorized Finance personnel can release payouts.
        </p>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {adminMetrics.map((m, idx) => (
          <div key={idx} className={`bg-surface border ${m.border} rounded-xl p-5 shadow-xs space-y-3 flex flex-col justify-between`}>
            <div>
              <div className="text-xs font-semibold text-on-surface-variant">{m.title}</div>
              <div className={`text-2xl font-bold ${m.color} mt-1`}>{m.value}</div>
            </div>
            <Link
              href={m.href}
              className="text-xs font-bold text-primary hover:text-secondary flex items-center justify-between pt-2 border-t border-outline-variant/60"
            >
              <span>{m.action}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ))}
      </div>

      {/* Action Queues Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Partner Applications Queue */}
        <div className="bg-surface border border-outline-variant rounded-xl p-6 space-y-4 shadow-xs">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-bold text-primary flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-amber-600" /> Pending Partner Applications
            </h2>
            <Link href="/admin/applications" className="text-xs font-bold text-secondary hover:underline">
              View Queue →
            </Link>
          </div>

          <div className="space-y-3">
            {pendingApplications.map((app) => (
              <div key={app.id} className="bg-surface-container-low border border-outline-variant p-4 rounded-xl flex justify-between items-center text-xs">
                <div>
                  <div className="font-bold text-primary">{app.company} ({app.applicant})</div>
                  <div className="text-[11px] text-on-surface-variant">{app.country} • Requested: {app.tier}</div>
                  <div className="text-[10px] text-secondary font-semibold mt-0.5">{app.date}</div>
                </div>
                <Link
                  href="/admin/applications"
                  className="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-primary-container transition-colors"
                >
                  Review
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Deal Approvals Queue */}
        <div className="bg-surface border border-outline-variant rounded-xl p-6 space-y-4 shadow-xs">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-bold text-primary flex items-center gap-2">
              <Handshake className="w-4 h-4 text-blue-600" /> Pending Deal Approvals
            </h2>
            <Link href="/admin/deals" className="text-xs font-bold text-secondary hover:underline">
              View Queue →
            </Link>
          </div>

          <div className="space-y-3">
            {pendingDeals.map((deal) => (
              <div key={deal.id} className="bg-surface-container-low border border-outline-variant p-4 rounded-xl flex justify-between items-center text-xs">
                <div>
                  <div className="font-bold text-primary flex items-center gap-2">
                    <span>{deal.customer}</span>
                    {deal.flag && (
                      <span className="text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300 px-2 py-0.5 rounded flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> Duplicate Flag
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-on-surface-variant">Product: {deal.product} • Value: {deal.value}</div>
                  <div className="text-[10px] text-secondary font-semibold mt-0.5">Submitted by: {deal.partner}</div>
                </div>
                <Link
                  href="/admin/deals"
                  className="bg-secondary-container text-on-secondary text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-secondary transition-colors"
                >
                  Approve Deal
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
