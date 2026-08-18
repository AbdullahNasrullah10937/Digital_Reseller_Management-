'use client';

import Link from 'next/link';
import { 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  Handshake, 
  PlusCircle, 
  ArrowUpRight, 
  ShieldCheck, 
  AlertCircle, 
  DollarSign, 
  ExternalLink 
} from 'lucide-react';

export default function PartnerDashboardPage() {
  const summaryCards = [
    { title: 'Total Revenue Generated', value: '$142,500', subtitle: 'Lifetime sales volume', icon: TrendingUp, color: 'text-primary' },
    { title: 'Pending Commission', value: '$28,500', subtitle: 'Awaiting customer payment', icon: Clock, color: 'text-amber-600' },
    { title: 'Paid Commission', value: '$64,200', subtitle: 'Transferred via Bank', icon: CheckCircle2, color: 'text-emerald-600' },
    { title: 'Active Deals', value: '4 Deals', subtitle: 'Protected in pipeline', icon: Handshake, color: 'text-secondary-container' },
  ];

  const recentDeals = [
    { id: 'DS-9102', customer: 'Packages Mall Limited', product: 'Retail Management Software', value: '$25,000', rate: '30%', estComm: '$7,500', status: 'Approved', expiry: '48 days left' },
    { id: 'DS-9088', customer: 'Faisal Textile Mills', product: 'Textile Industry ERP', value: '$35,000', rate: '30%', estComm: '$10,500', status: 'Pending Approval', expiry: 'Under Review' },
    { id: 'DS-8941', customer: 'Pearl Continental Hotel', product: 'Hotel Management Software', value: '$15,000', rate: '30%', estComm: '$4,500', status: 'Won', expiry: 'Deal Closed' },
    { id: 'DS-8730', customer: 'Gourmet Bakery Chain', product: 'Sweets & Bakery Manufacturing', value: '$20,000', rate: '30%', estComm: '$6,000', status: 'Approved', expiry: '12 days left' },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner & Quick Action */}
      <div className="bg-gradient-to-r from-primary via-primary-container to-tertiary-container rounded-2xl p-6 md:p-8 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-md border border-primary-container">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/20 border border-secondary-container/40 text-secondary-container text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" /> Certified Partner Portal
          </div>
          <h1 className="text-2xl md:text-3xl font-bold">Reseller Dashboard</h1>
          <p className="text-xs text-on-primary-container leading-relaxed">
            Your deals are protected under Digitalsofts Deal Protection Policy. Submit new deals early to lock in your 30% margin share.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <Link href="/deals/new" className="bg-secondary-container text-on-secondary font-bold text-xs px-5 py-3 rounded-xl hover:bg-secondary transition-all shadow-md text-center flex items-center justify-center gap-2 cursor-pointer">
            <PlusCircle className="w-4 h-4" /> Register New Deal
          </Link>
          <Link href="/commissions" className="bg-primary-container/80 text-white border border-on-primary-container/30 font-bold text-xs px-5 py-3 rounded-xl hover:bg-primary-container transition-all text-center flex items-center justify-center gap-2 cursor-pointer">
            <DollarSign className="w-4 h-4" /> Request Payout
          </Link>
        </div>
      </div>

      {/* Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={idx} className="bg-surface border border-outline-variant rounded-xl p-5 shadow-xs hover:border-primary-container transition-all">
              <div className="flex justify-between items-start mb-3">
                <span className="text-xs font-semibold text-on-surface-variant">{card.title}</span>
                <div className={`p-2 rounded-lg bg-surface-container-low ${card.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="text-2xl font-bold text-primary mb-1">{card.value}</div>
              <div className="text-[11px] text-on-surface-variant">{card.subtitle}</div>
            </div>
          );
        })}
      </div>

      {/* Threshold Progress Widget */}
      <div className="bg-surface-container-low border border-outline-variant rounded-xl p-5 space-y-3">
        <div className="flex justify-between items-center text-xs">
          <div className="font-bold text-primary flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-secondary-container" />
            <span>Minimum Payout Threshold Status</span>
          </div>
          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
            Threshold Reached (Eligible)
          </span>
        </div>

        <div className="w-full bg-outline-variant/40 rounded-full h-2.5 overflow-hidden">
          <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: '100%' }}></div>
        </div>

        <div className="flex justify-between text-[11px] text-on-surface-variant">
          <span>Unpaid Approved Commission: <strong>$14,200 USD</strong></span>
          <span>Threshold: PKR 5,000 / USD 50 Equivalent</span>
        </div>
      </div>

      {/* Recent Registered Deals */}
      <div className="bg-surface border border-outline-variant rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold text-primary">Recent Registered Deals</h2>
            <p className="text-xs text-on-surface-variant">Deals protected under your partner code (DS-10283)</p>
          </div>
          <Link href="/deals" className="text-xs font-bold text-secondary hover:underline flex items-center gap-1">
            View All Deals <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-container-low text-on-surface-variant uppercase font-semibold border-b border-outline-variant">
              <tr>
                <th className="p-3">Deal ID</th>
                <th className="p-3">Customer Name</th>
                <th className="p-3">Product</th>
                <th className="p-3">Est. Value</th>
                <th className="p-3">Tier Rate</th>
                <th className="p-3">Commission</th>
                <th className="p-3">Status</th>
                <th className="p-3">Protection Expiry</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/60">
              {recentDeals.map((deal) => (
                <tr key={deal.id} className="hover:bg-surface-container-low/60 transition-colors">
                  <td className="p-3 font-mono font-bold text-primary">{deal.id}</td>
                  <td className="p-3 font-semibold text-on-surface">{deal.customer}</td>
                  <td className="p-3 text-on-surface-variant">{deal.product}</td>
                  <td className="p-3 font-bold text-primary">{deal.value}</td>
                  <td className="p-3 text-on-surface-variant">{deal.rate}</td>
                  <td className="p-3 font-bold text-secondary-container">{deal.estComm}</td>
                  <td className="p-3">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      deal.status === 'Approved' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                      deal.status === 'Won' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                      'bg-amber-100 text-amber-800 border border-amber-200'
                    }`}>
                      {deal.status}
                    </span>
                  </td>
                  <td className="p-3 text-on-surface-variant font-medium">{deal.expiry}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
