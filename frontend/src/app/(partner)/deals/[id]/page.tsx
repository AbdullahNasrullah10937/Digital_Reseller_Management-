'use client';

import Link from 'next/link';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  Building, 
  DollarSign, 
  Calendar, 
  FileText, 
  Award, 
  ChevronRight, 
  History 
} from 'lucide-react';

export default function DealDetailPage({ params }: { params: { id: string } }) {
  const dealId = params.id || 'DS-9102';

  const dealDetail = {
    id: dealId,
    customerName: 'Packages Mall Limited',
    customerEmail: 'procurement@packages.com',
    customerPhone: '+92 42 35712345',
    industry: 'POS/Retail',
    country: 'Pakistan',
    productName: 'Retail Management Software',
    category: 'POS/Retail',
    estimatedValue: 25000,
    currency: 'USD',
    tier: 'Reseller',
    commissionRate: 30,
    commissionAmount: 7500,
    status: 'APPROVED', // PENDING_APPROVAL, APPROVED, WON, LOST
    submittedDate: '2026-08-10',
    approvedDate: '2026-08-11',
    protectionExpiryDate: '2026-10-10',
    protectionDaysRemaining: 48,
    notes: 'Customer requires POS license deployment for 120 retail store counters across Pakistan.',
  };

  const timelineSteps = [
    { title: 'Deal Registration Submitted', date: '2026-08-10 14:32', status: 'completed', desc: 'Submitted by Partner (Muhammad Ali - TechSolutions Ltd)' },
    { title: 'HR Admin Review & Approval', date: '2026-08-11 09:15', status: 'completed', desc: 'Approved by HR Admin. 60-day deal protection activated.' },
    { title: 'Deal Protection Active', date: 'Active (48 days left)', status: 'current', desc: 'Deal protected against duplicate registrations until 2026-10-10.' },
    { title: 'Customer Billing & Payment Confirmation', date: 'Pending', status: 'upcoming', desc: 'Customer payment confirmation required to transition status to Won.' },
    { title: 'Commission Release', date: 'Pending', status: 'upcoming', desc: '$7,500 commission will be credited to pending ledger upon deal win.' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Link href="/deals" className="text-xs font-semibold text-on-surface-variant hover:text-primary flex items-center gap-1 mb-1">
            <ArrowLeft className="w-4 h-4" /> Back to My Deals
          </Link>
          <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
            Deal Detail: {dealDetail.id}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" /> Protected ({dealDetail.protectionDaysRemaining} days remaining)
          </span>
        </div>
      </div>

      {/* Main Info Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Deal Overview & Protection Timer */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-surface border border-outline-variant rounded-2xl p-6 shadow-xs space-y-6">
            <div className="flex justify-between items-start border-b border-outline-variant pb-4">
              <div>
                <span className="text-xs text-on-surface-variant font-medium">Customer Account</span>
                <h2 className="text-xl font-bold text-primary">{dealDetail.customerName}</h2>
                <div className="text-xs text-on-surface-variant">{dealDetail.customerEmail} • {dealDetail.country}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-on-surface-variant font-medium">Estimated Value</div>
                <div className="text-2xl font-bold text-primary">${dealDetail.estimatedValue.toLocaleString()} USD</div>
              </div>
            </div>

            {/* Commission Card */}
            <div className="bg-surface-container-low border border-outline-variant rounded-xl p-4 grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-[11px] text-on-surface-variant">Active Tier</div>
                <div className="text-sm font-bold text-primary">{dealDetail.tier}</div>
              </div>
              <div>
                <div className="text-[11px] text-on-surface-variant">Tier Margin Rate</div>
                <div className="text-sm font-bold text-primary">{dealDetail.commissionRate}%</div>
              </div>
              <div>
                <div className="text-[11px] text-on-surface-variant">Calculated Commission</div>
                <div className="text-base font-bold text-secondary-container">${dealDetail.commissionAmount.toLocaleString()}</div>
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-1">
              <div className="text-xs font-bold text-primary flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-secondary-container" /> Opportunity Notes
              </div>
              <p className="text-xs text-on-surface-variant bg-surface-container-low/50 p-3 rounded-lg border border-outline-variant/50">
                {dealDetail.notes}
              </p>
            </div>
          </div>

          {/* Protection Clock Banner */}
          <div className="bg-gradient-to-r from-primary to-primary-container text-white p-5 rounded-2xl border border-primary-container flex justify-between items-center">
            <div className="space-y-1">
              <div className="text-xs text-on-primary-container uppercase font-bold tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Guaranteed Deal Protection
              </div>
              <div className="text-lg font-bold">Expires on {dealDetail.protectionExpiryDate}</div>
              <div className="text-xs text-on-primary-container">No competing partner can register this customer during protection.</div>
            </div>
            <div className="text-center bg-white/10 px-4 py-2 rounded-xl backdrop-blur border border-white/20">
              <div className="text-2xl font-bold text-emerald-400">{dealDetail.protectionDaysRemaining}</div>
              <div className="text-[10px] uppercase font-bold text-white">Days Left</div>
            </div>
          </div>
        </div>

        {/* Right Column: Status Timeline Stepper */}
        <div className="bg-surface border border-outline-variant rounded-2xl p-6 shadow-xs space-y-4 h-fit">
          <h2 className="text-sm font-bold text-primary flex items-center gap-2 border-b border-outline-variant pb-3">
            <History className="w-4 h-4 text-secondary-container" /> Deal Lifecycle Timeline
          </h2>

          <div className="space-y-6 pt-2">
            {timelineSteps.map((step, idx) => (
              <div key={idx} className="flex gap-3 relative">
                {idx !== timelineSteps.length - 1 && (
                  <div className={`absolute left-2.5 top-6 bottom-0 w-0.5 ${step.status === 'completed' ? 'bg-emerald-500' : 'bg-outline-variant/60'}`} />
                )}
                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold z-10 ${
                  step.status === 'completed' ? 'bg-emerald-500 text-white' :
                  step.status === 'current' ? 'bg-secondary-container text-white ring-4 ring-secondary-container/20' :
                  'bg-outline-variant/40 text-on-surface-variant'
                }`}>
                  {step.status === 'completed' ? '✓' : idx + 1}
                </div>
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-primary">{step.title}</div>
                  <div className="text-[10px] text-secondary font-semibold">{step.date}</div>
                  <div className="text-[11px] text-on-surface-variant leading-tight">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
