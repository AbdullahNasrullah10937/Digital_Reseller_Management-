'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  PlusCircle, 
  Search, 
  Filter, 
  Clock, 
  ShieldCheck, 
  ArrowUpRight, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle 
} from 'lucide-react';

export default function MyDealsPage() {
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const deals = [
    { id: 'DS-9102', customer: 'Packages Mall Limited', country: 'Pakistan', product: 'Retail Management Software', value: '$25,000', rate: '30%', comm: '$7,500', status: 'APPROVED', date: '2026-08-10', expiryDays: 48, duplicate: false },
    { id: 'DS-9088', customer: 'Faisal Textile Mills', country: 'Pakistan', product: 'Textile Industry ERP', value: '$35,000', rate: '30%', comm: '$10,500', status: 'PENDING_APPROVAL', date: '2026-08-14', expiryDays: null, duplicate: false },
    { id: 'DS-8941', customer: 'Pearl Continental Hotel', country: 'Pakistan', product: 'Hotel Management Software', value: '$15,000', rate: '30%', comm: '$4,500', status: 'WON', date: '2026-07-28', expiryDays: null, duplicate: false },
    { id: 'DS-8730', customer: 'Gourmet Bakery Chain', country: 'Pakistan', product: 'Sweets & Bakery Manufacturing', value: '$20,000', rate: '30%', comm: '$6,000', status: 'APPROVED', date: '2026-06-15', expiryDays: 12, duplicate: false },
    { id: 'DS-8512', customer: 'Al-Fateh Shopping Mall', country: 'Pakistan', product: 'Electronics Store Management', value: '$12,000', rate: '30%', comm: '$3,600', status: 'LOST', date: '2026-05-10', expiryDays: null, duplicate: false },
  ];

  const filteredDeals = deals.filter((deal) => {
    const matchesFilter = filter === 'ALL' || deal.status === filter;
    const matchesSearch = deal.customer.toLowerCase().includes(search.toLowerCase()) || 
                          deal.product.toLowerCase().includes(search.toLowerCase()) ||
                          deal.id.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header & CTA */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">Registered Deals</h1>
          <p className="text-xs text-on-surface-variant">Track your registered customer opportunities and deal protection expiry.</p>
        </div>
        <Link
          href="/deals/new"
          className="bg-secondary-container text-on-secondary font-bold text-xs px-5 py-2.5 rounded-xl hover:bg-secondary transition-all shadow-xs flex items-center gap-2 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" /> Register New Deal
        </Link>
      </div>

      {/* Filter Tabs & Search */}
      <div className="bg-surface border border-outline-variant rounded-xl p-4 space-y-4 shadow-xs">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          {/* Status Tabs */}
          <div className="flex flex-wrap gap-1.5 bg-surface-container-low p-1 rounded-xl border border-outline-variant/60">
            {[
              { id: 'ALL', label: 'All Deals' },
              { id: 'PENDING_APPROVAL', label: 'Pending Approval' },
              { id: 'APPROVED', label: 'Approved (Protected)' },
              { id: 'WON', label: 'Won' },
              { id: 'LOST', label: 'Lost' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  filter === tab.id
                    ? 'bg-primary text-white shadow-xs'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-outline absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search customer, product, ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs bg-surface border border-outline-variant rounded-lg pl-9 pr-3 py-2 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary-container"
            />
          </div>
        </div>

        {/* Deals Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-container-low text-on-surface-variant uppercase font-semibold border-b border-outline-variant">
              <tr>
                <th className="p-3">Deal ID</th>
                <th className="p-3">Customer & Country</th>
                <th className="p-3">Registered Product</th>
                <th className="p-3">Est. Value</th>
                <th className="p-3">Comm. Rate</th>
                <th className="p-3">Comm. Amount</th>
                <th className="p-3">Status</th>
                <th className="p-3">Protection Expiry</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/60">
              {filteredDeals.length === 0 ? (
                <tr>
                  <td colSpan={9} className="p-8 text-center text-on-surface-variant">
                    No deals match the selected criteria.
                  </td>
                </tr>
              ) : (
                filteredDeals.map((deal) => (
                  <tr key={deal.id} className="hover:bg-surface-container-low/60 transition-colors">
                    <td className="p-3 font-mono font-bold text-primary">{deal.id}</td>
                    <td className="p-3">
                      <div className="font-semibold text-on-surface">{deal.customer}</div>
                      <div className="text-[10px] text-on-surface-variant">{deal.country}</div>
                    </td>
                    <td className="p-3 text-on-surface-variant font-medium">{deal.product}</td>
                    <td className="p-3 font-bold text-primary">{deal.value}</td>
                    <td className="p-3 text-on-surface-variant">{deal.rate}</td>
                    <td className="p-3 font-bold text-secondary-container">{deal.comm}</td>
                    <td className="p-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold inline-flex items-center gap-1 ${
                        deal.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                        deal.status === 'WON' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                        deal.status === 'LOST' ? 'bg-red-100 text-red-800 border border-red-200' :
                        'bg-amber-100 text-amber-800 border border-amber-200'
                      }`}>
                        {deal.status === 'APPROVED' && <ShieldCheck className="w-3 h-3" />}
                        {deal.status === 'WON' && <CheckCircle2 className="w-3 h-3" />}
                        {deal.status === 'LOST' && <XCircle className="w-3 h-3" />}
                        {deal.status === 'PENDING_APPROVAL' && <Clock className="w-3 h-3" />}
                        {deal.status}
                      </span>
                    </td>
                    <td className="p-3">
                      {deal.expiryDays ? (
                        <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[11px]">
                          🛡️ {deal.expiryDays} days remaining
                        </span>
                      ) : (
                        <span className="text-on-surface-variant text-[11px]">
                          {deal.status === 'WON' ? 'Closed (Won)' : deal.status === 'LOST' ? 'Closed (Lost)' : 'Under HR Review'}
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-right">
                      <Link
                        href={`/deals/${deal.id}`}
                        className="text-xs font-bold text-primary hover:text-secondary inline-flex items-center gap-1 bg-surface-container-high px-2.5 py-1 rounded hover:bg-surface-variant transition-colors"
                      >
                        Timeline <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
