'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  DollarSign, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Send, 
  Building, 
  ArrowUpRight, 
  ShieldCheck, 
  X 
} from 'lucide-react';

export default function CommissionsPayoutsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  const ledgerSummary = {
    pending: 28500,
    approved: 14200,
    paid: 64200,
    minThresholdUsd: 50,
    isEligible: true,
  };

  const commissions = [
    { id: 'COMM-104', dealId: 'DS-8941', customer: 'Pearl Continental Hotel', product: 'Hotel Management', dealVal: '$15,000', rate: '30%', commAmt: '$4,500', status: 'APPROVED', date: '2026-08-12' },
    { id: 'COMM-103', dealId: 'DS-8730', customer: 'Gourmet Bakery Chain', product: 'Sweets & Bakery', dealVal: '$20,000', rate: '30%', commAmt: '$6,000', status: 'APPROVED', date: '2026-07-30' },
    { id: 'COMM-102', dealId: 'DS-9102', customer: 'Packages Mall Limited', product: 'Retail Management', dealVal: '$25,000', rate: '30%', commAmt: '$7,500', status: 'PENDING', date: '2026-08-11' },
    { id: 'COMM-101', dealId: 'DS-8102', customer: 'Avari Hotel Group', product: 'Hotel Management', dealVal: '$45,000', rate: '30%', commAmt: '$13,500', status: 'PAID', date: '2026-06-20' },
  ];

  const payoutHistory = [
    { id: 'PAY-801', date: '2026-06-22', amount: '$13,500 USD', method: 'Bank Transfer', ref: 'TRX-PK-9812401', status: 'PAID' },
    { id: 'PAY-740', date: '2026-04-15', amount: '$50,700 USD', method: 'Bank Transfer', ref: 'TRX-PK-7712390', status: 'PAID' },
  ];

  const handleRequestPayout = (e: React.FormEvent) => {
    e.preventDefault();
    setRequestSubmitted(true);
    setTimeout(() => {
      setRequestSubmitted(false);
      setModalOpen(false);
    }, 1500);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner & Payout CTA */}
      <div className="bg-surface border border-outline-variant rounded-2xl p-6 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-2xl font-bold text-primary">Commissions & Payouts</h1>
          <p className="text-xs text-on-surface-variant">Track your earned reseller commissions and request manual bank transfers.</p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="bg-secondary-container text-on-secondary font-bold text-xs px-6 py-3 rounded-xl hover:bg-secondary transition-all shadow-sm flex items-center gap-2 cursor-pointer"
        >
          <DollarSign className="w-4 h-4" /> Request Payout ($14,200 Approved)
        </button>
      </div>

      {/* Threshold Widget */}
      <div className="bg-surface-container-low border border-outline-variant rounded-xl p-5 space-y-3">
        <div className="flex justify-between items-center text-xs">
          <div className="font-bold text-primary flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-secondary-container" />
            <span>Minimum Release Threshold (PKR 5,000 / USD 50)</span>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
            ✓ Threshold Reached ($14,200 Available)
          </span>
        </div>

        <div className="w-full bg-outline-variant/40 rounded-full h-3 overflow-hidden">
          <div className="bg-emerald-500 h-3 rounded-full" style={{ width: '100%' }}></div>
        </div>

        <div className="text-[11px] text-on-surface-variant">
          ℹ️ Unpaid approved commissions accumulate indefinitely across all deals and never expire.
        </div>
      </div>

      {/* Metric Ledger */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-surface border border-outline-variant rounded-xl p-5">
          <div className="text-xs text-on-surface-variant font-medium">Pending Commission</div>
          <div className="text-2xl font-bold text-amber-600 mt-1">${ledgerSummary.pending.toLocaleString()}</div>
          <div className="text-[11px] text-on-surface-variant mt-1">Awaiting customer payment confirmation</div>
        </div>

        <div className="bg-surface border-2 border-emerald-500/40 rounded-xl p-5 bg-emerald-50/20">
          <div className="text-xs text-emerald-800 font-bold">Approved (Ready for Payout)</div>
          <div className="text-2xl font-bold text-emerald-600 mt-1">${ledgerSummary.approved.toLocaleString()}</div>
          <div className="text-[11px] text-emerald-700 mt-1">Customer payment verified</div>
        </div>

        <div className="bg-surface border border-outline-variant rounded-xl p-5">
          <div className="text-xs text-on-surface-variant font-medium">Lifetime Paid Out</div>
          <div className="text-2xl font-bold text-primary mt-1">${ledgerSummary.paid.toLocaleString()}</div>
          <div className="text-[11px] text-on-surface-variant mt-1">Transferred to bank account</div>
        </div>
      </div>

      {/* Commission Ledger Table */}
      <div className="bg-surface border border-outline-variant rounded-xl p-6 shadow-xs space-y-4">
        <h2 className="text-lg font-bold text-primary">Commission Entries Ledger</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-container-low text-on-surface-variant uppercase font-semibold border-b border-outline-variant">
              <tr>
                <th className="p-3">Comm ID</th>
                <th className="p-3">Deal ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Deal Value</th>
                <th className="p-3">Tier Rate</th>
                <th className="p-3">Commission Amount</th>
                <th className="p-3">Status</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/60">
              {commissions.map((c) => (
                <tr key={c.id} className="hover:bg-surface-container-low/60 transition-colors">
                  <td className="p-3 font-mono font-bold text-primary">{c.id}</td>
                  <td className="p-3 font-mono text-on-surface-variant">{c.dealId}</td>
                  <td className="p-3 font-semibold text-on-surface">{c.customer}</td>
                  <td className="p-3 font-bold text-primary">{c.dealVal}</td>
                  <td className="p-3 text-on-surface-variant">{c.rate}</td>
                  <td className="p-3 font-bold text-secondary-container">{c.commAmt}</td>
                  <td className="p-3">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      c.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                      c.status === 'PAID' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                      'bg-amber-100 text-amber-800 border border-amber-200'
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="p-3 text-on-surface-variant">{c.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payout History */}
      <div className="bg-surface border border-outline-variant rounded-xl p-6 shadow-xs space-y-4">
        <h2 className="text-lg font-bold text-primary">Payout Release History</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-container-low text-on-surface-variant uppercase font-semibold border-b border-outline-variant">
              <tr>
                <th className="p-3">Payout ID</th>
                <th className="p-3">Date Processed</th>
                <th className="p-3">Amount Released</th>
                <th className="p-3">Method</th>
                <th className="p-3">Bank Transaction Ref</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/60">
              {payoutHistory.map((p) => (
                <tr key={p.id} className="hover:bg-surface-container-low/60 transition-colors">
                  <td className="p-3 font-mono font-bold text-primary">{p.id}</td>
                  <td className="p-3 text-on-surface-variant">{p.date}</td>
                  <td className="p-3 font-bold text-emerald-600">{p.amount}</td>
                  <td className="p-3 text-on-surface-variant">{p.method}</td>
                  <td className="p-3 font-mono font-semibold text-primary">{p.ref}</td>
                  <td className="p-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Request Payout Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface rounded-2xl max-w-lg w-full p-6 space-y-5 border border-outline-variant shadow-xl relative">
            <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 text-outline hover:text-primary">
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <h2 className="text-xl font-bold text-primary">Request Commission Payout</h2>
              <p className="text-xs text-on-surface-variant">Confirm bank transfer payout details.</p>
            </div>

            {requestSubmitted ? (
              <div className="text-center py-6 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <div className="text-base font-bold text-primary">Payout Request Submitted!</div>
                <div className="text-xs text-on-surface-variant">Digitalsofts Finance will process your bank transfer within 2–3 business days.</div>
              </div>
            ) : (
              <form onSubmit={handleRequestPayout} className="space-y-4 text-xs">
                <div className="bg-surface-container-low p-4 rounded-xl space-y-2 border border-outline-variant">
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Available Approved Commission:</span>
                    <span className="font-bold text-emerald-600 text-sm">$14,200 USD</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Payout Method:</span>
                    <span className="font-bold text-primary">Manual Bank Transfer</span>
                  </div>
                  <div className="flex justify-between border-t border-outline-variant/60 pt-2">
                    <span className="text-on-surface-variant">Target Bank Account:</span>
                    <span className="font-semibold text-primary">Meezan Bank (PK42 **** 9182)</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-primary block">Transfer Notes for Finance (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Please process in USD equivalent"
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-outline-variant bg-surface text-on-surface focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-secondary-container text-on-secondary font-bold text-sm py-3 rounded-xl hover:bg-secondary transition-all cursor-pointer"
                >
                  Confirm & Submit Payout Request
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
