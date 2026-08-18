'use client';

import { useState, useEffect } from 'react';
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
  DollarSign 
} from 'lucide-react';
import { getAccessToken } from '@/lib/supabase/client';
import { fetchPartnerDashboard } from '@/lib/api';

type DashboardData = {
  total_revenue: number;
  pending_commission: number;
  paid_commission: number;
  active_deals: number;
  tier: string;
  commission_rate: number;
  referral_code: string;
  recent_deals: {
    id: string;
    customer_name: string;
    status: string;
    estimated_value: number;
    currency: string;
    created_at: string;
  }[];
};

export default function PartnerDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDashboard = async () => {
      const token = getAccessToken();
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetchPartnerDashboard(token);
        setData(res as DashboardData);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Failed to load dashboard.');
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const totalRev = data ? `$${data.total_revenue.toLocaleString()}` : '$0';
  const pendingComm = data ? `$${data.pending_commission.toLocaleString()}` : '$0';
  const paidComm = data ? `$${data.paid_commission.toLocaleString()}` : '$0';
  const activeDealsCount = data ? `${data.active_deals} Deals` : '0 Deals';
  const partnerTier = data?.tier ?? 'Reseller';
  const commissionRate = data ? `${data.commission_rate}%` : '30%';
  const refCode = data?.referral_code ?? 'DS-PORTAL';

  const summaryCards = [
    { title: 'Total Revenue Generated', value: totalRev, subtitle: 'Lifetime sales volume', icon: TrendingUp, color: 'text-primary' },
    { title: 'Pending Commission', value: pendingComm, subtitle: 'Awaiting customer payment', icon: Clock, color: 'text-amber-600' },
    { title: 'Paid Commission', value: paidComm, subtitle: 'Transferred via Bank', icon: CheckCircle2, color: 'text-emerald-600' },
    { title: 'Active Deals', value: activeDealsCount, subtitle: 'Protected in pipeline', icon: Handshake, color: 'text-secondary-container' },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner & Quick Action */}
      <div className="bg-gradient-to-r from-primary via-primary-container to-tertiary-container rounded-2xl p-6 md:p-8 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-md border border-primary-container">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/20 border border-secondary-container/40 text-secondary-container text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" /> {partnerTier} Tier ({commissionRate})
          </div>
          <h1 className="text-2xl md:text-3xl font-bold">Reseller Dashboard</h1>
          <p className="text-xs text-on-primary-container leading-relaxed">
            Your deals are protected under Digitalsofts Deal Protection Policy. Submit new deals early to lock in your {commissionRate} margin share.
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
              <div className="text-2xl font-bold text-primary mb-1">{loading ? '...' : card.value}</div>
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
            Threshold Minimum (PKR 5,000 / USD 50)
          </span>
        </div>

        <div className="w-full bg-outline-variant/40 rounded-full h-2.5 overflow-hidden">
          <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: '100%' }}></div>
        </div>

        <div className="flex justify-between text-[11px] text-on-surface-variant">
          <span>Unpaid Approved Commission: <strong>{pendingComm}</strong></span>
          <span>Threshold: PKR 5,000 / USD 50 Equivalent</span>
        </div>
      </div>

      {/* Recent Registered Deals */}
      <div className="bg-surface border border-outline-variant rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold text-primary">Recent Registered Deals</h2>
            <p className="text-xs text-on-surface-variant">Deals protected under your referral code ({refCode})</p>
          </div>
          <Link href="/deals" className="text-xs font-bold text-secondary hover:underline flex items-center gap-1">
            View All Deals <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {error && (
          <div className="p-4 rounded-lg bg-red-50 text-red-700 text-xs">{error}</div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-container-low text-on-surface-variant uppercase font-semibold border-b border-outline-variant">
              <tr>
                <th className="p-3">Customer Name</th>
                <th className="p-3">Est. Value</th>
                <th className="p-3">Status</th>
                <th className="p-3">Date Registered</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/60">
              {data?.recent_deals && data.recent_deals.length > 0 ? (
                data.recent_deals.map((deal) => (
                  <tr key={deal.id} className="hover:bg-surface-container-low/60 transition-colors">
                    <td className="p-3 font-semibold text-on-surface">{deal.customer_name}</td>
                    <td className="p-3 font-bold text-primary">${deal.estimated_value.toLocaleString()} {deal.currency}</td>
                    <td className="p-3">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        deal.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                        deal.status === 'WON' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                        'bg-amber-100 text-amber-800 border border-amber-200'
                      }`}>
                        {deal.status}
                      </span>
                    </td>
                    <td className="p-3 text-on-surface-variant font-medium">
                      {new Date(deal.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-on-surface-variant">
                    {loading ? 'Loading dashboard data...' : 'No deals registered yet.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
