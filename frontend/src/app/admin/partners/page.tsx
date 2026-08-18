'use client';

import { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  ShieldCheck, 
  Mail, 
  Phone, 
  Building, 
  Award, 
  ExternalLink 
} from 'lucide-react';

export default function AllPartnersPage() {
  const [tierFilter, setTierFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const partners = [
    { id: 'P-101', code: 'DS-10283', company: 'TechSolutions Ltd', name: 'Muhammad Ali', email: 'ali@techsolutions.com', phone: '+92 300 1234567', country: 'Pakistan', city: 'Lahore', tier: 'RESELLER', rate: '30%', status: 'ACTIVE', totalRevenue: '$142,500', activeDeals: 4, unpaidComm: '$14,200' },
    { id: 'P-102', code: 'DS-10344', company: 'CloudSystems Inc', name: 'Zainab Ahmed', email: 'zainab@cloudsystems.pk', phone: '+92 300 9876543', country: 'Pakistan', city: 'Karachi', tier: 'REFERRAL_PARTNER', rate: '20%', status: 'ACTIVE', totalRevenue: '$65,000', activeDeals: 2, unpaidComm: '$4,200' },
    { id: 'P-103', code: 'DS-10499', company: 'Gulf Software Systems', name: 'Tariq Al-Mansoor', email: 'tariq@gulfsoftware.sa', phone: '+966 50 1234567', country: 'Saudi Arabia', city: 'Riyadh', tier: 'CERTIFIED_RESELLER', rate: '40%', status: 'ACTIVE', totalRevenue: '$380,000', activeDeals: 6, unpaidComm: '$28,500' },
    { id: 'P-104', code: 'DS-10512', company: 'Apex Tech Solutions', name: 'Usman Tariq', email: 'usman@apextech.pk', phone: '+92 321 4455667', country: 'Pakistan', city: 'Islamabad', tier: 'AFFILIATE', rate: '15%', status: 'PENDING_REVIEW', totalRevenue: '$0', activeDeals: 0, unpaidComm: '$0' },
  ];

  const filteredPartners = partners.filter((p) => {
    const matchesTier = tierFilter === 'ALL' || p.tier === tierFilter;
    const matchesSearch = p.company.toLowerCase().includes(search.toLowerCase()) ||
                          p.name.toLowerCase().includes(search.toLowerCase()) ||
                          p.code.toLowerCase().includes(search.toLowerCase());
    return matchesTier && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">All Partners Directory</h1>
          <p className="text-xs text-on-surface-variant">Master roster of all registered Digitalsofts B2B partners across all 4 tiers.</p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-surface border border-outline-variant rounded-xl p-4 space-y-4 shadow-xs">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="flex flex-wrap gap-1.5 bg-surface-container-low p-1 rounded-xl border border-outline-variant/60">
            {[
              { id: 'ALL', label: 'All Tiers' },
              { id: 'AFFILIATE', label: 'Affiliates' },
              { id: 'REFERRAL_PARTNER', label: 'Referral Partners' },
              { id: 'RESELLER', label: 'Resellers' },
              { id: 'CERTIFIED_RESELLER', label: 'Certified Resellers' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTierFilter(t.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  tierFilter === t.id
                    ? 'bg-primary text-white shadow-xs'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-outline absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search partner, company, code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs bg-surface border border-outline-variant rounded-lg pl-9 pr-3 py-2 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary-container"
            />
          </div>
        </div>

        {/* Partners Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-container-low text-on-surface-variant uppercase font-semibold border-b border-outline-variant">
              <tr>
                <th className="p-3">Partner Code</th>
                <th className="p-3">Company & Contact</th>
                <th className="p-3">Location</th>
                <th className="p-3">Tier & Rate</th>
                <th className="p-3">Active Deals</th>
                <th className="p-3">Lifetime Revenue</th>
                <th className="p-3">Unpaid Commission</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/60">
              {filteredPartners.map((p) => (
                <tr key={p.id} className="hover:bg-surface-container-low/60 transition-colors">
                  <td className="p-3 font-mono font-bold text-primary">{p.code}</td>
                  <td className="p-3">
                    <div className="font-bold text-on-surface">{p.company}</div>
                    <div className="text-[10px] text-on-surface-variant">{p.name} ({p.email})</div>
                  </td>
                  <td className="p-3 text-on-surface-variant">{p.city}, {p.country}</td>
                  <td className="p-3 font-bold text-secondary-container">{p.tier} ({p.rate})</td>
                  <td className="p-3 font-bold text-primary">{p.activeDeals} Deals</td>
                  <td className="p-3 font-bold text-primary">{p.totalRevenue}</td>
                  <td className="p-3 font-bold text-emerald-600">{p.unpaidComm}</td>
                  <td className="p-3">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      p.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                      'bg-amber-100 text-amber-800 border border-amber-200'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
