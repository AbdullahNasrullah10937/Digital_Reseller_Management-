'use client';

import { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  ShieldCheck, 
  X 
} from 'lucide-react';
import { getAccessToken } from '@/lib/supabase/client';
import { fetchAdminDeals, approveDeal, rejectDeal, markDealWon, markDealLost } from '@/lib/api';

type AdminDealItem = {
  id: string;
  customer_name: string;
  customer_email: string;
  industry: string;
  country: string;
  product_name: string;
  estimated_value: number;
  currency: string;
  status: string;
  is_flagged_duplicate: boolean;
  protection_expiry_date: string | null;
  created_at: string;
};

export default function DealApprovalsPage() {
  const [deals, setDeals] = useState<AdminDealItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDeal, setSelectedDeal] = useState<AdminDealItem | null>(null);
  const [protectionDays, setProtectionDays] = useState(60);
  const [actionNotice, setActionNotice] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const loadDeals = async () => {
    const token = getAccessToken();
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const res = await fetchAdminDeals(token);
      setDeals(res as AdminDealItem[]);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load deals.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDeals();
  }, []);

  const handleApproveDeal = async () => {
    if (!selectedDeal) return;
    setSubmitting(true);
    const token = getAccessToken();
    if (!token) return;

    try {
      await approveDeal(token, selectedDeal.id, protectionDays);
      setActionNotice(`Deal for ${selectedDeal.customer_name} Approved! Protection set for ${protectionDays} days.`);
      setTimeout(() => {
        setSelectedDeal(null);
        setActionNotice(null);
        loadDeals();
      }, 1500);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Deal approval failed.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleMarkWon = async (dealId: string) => {
    const token = getAccessToken();
    if (!token) return;
    try {
      const res = await markDealWon(token, dealId);
      setActionNotice(`Deal Marked as WON! Commission of $${(res as any).commission_amount} created in ledger.`);
      setTimeout(() => {
        setActionNotice(null);
        loadDeals();
      }, 2000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to mark deal as Won.');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-primary">Deal Approvals & Expiry Queue</h1>
        <p className="text-xs text-on-surface-variant">Review partner deal registrations, inspect non-blocking duplicate flags, and set 60–90 day deal protection.</p>
      </div>

      {actionNotice && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-4 rounded-xl text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" /> {actionNotice}
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-300 text-red-800 p-4 rounded-xl text-xs font-bold">
          {error}
        </div>
      )}

      {/* Deals Approval Table */}
      <div className="bg-surface border border-outline-variant rounded-xl p-6 shadow-xs space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-container-low text-on-surface-variant uppercase font-semibold border-b border-outline-variant">
              <tr>
                <th className="p-3">Customer Account</th>
                <th className="p-3">Product</th>
                <th className="p-3">Deal Value</th>
                <th className="p-3">Duplicate Flag</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/60">
              {deals.length > 0 ? (
                deals.map((deal) => (
                  <tr key={deal.id} className="hover:bg-surface-container-low/60 transition-colors">
                    <td className="p-3">
                      <div className="font-semibold text-on-surface">{deal.customer_name}</div>
                      <div className="text-[10px] text-on-surface-variant">{deal.customer_email}</div>
                    </td>
                    <td className="p-3 text-on-surface-variant">{deal.product_name}</td>
                    <td className="p-3 font-bold text-primary">${deal.estimated_value.toLocaleString()} {deal.currency}</td>
                    <td className="p-3">
                      {deal.is_flagged_duplicate ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1 w-fit">
                          <AlertTriangle className="w-3 h-3 text-amber-600" /> Flagged Duplicate
                        </span>
                      ) : (
                        <span className="text-[10px] text-emerald-600 font-semibold">Clean</span>
                      )}
                    </td>
                    <td className="p-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        deal.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                        deal.status === 'WON' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                        'bg-amber-100 text-amber-800 border border-amber-200'
                      }`}>
                        {deal.status}
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-2">
                      {deal.status === 'PENDING_APPROVAL' && (
                        <button
                          onClick={() => setSelectedDeal(deal)}
                          className="bg-secondary-container text-on-secondary text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-secondary transition-colors cursor-pointer"
                        >
                          Review Registration
                        </button>
                      )}
                      {deal.status === 'APPROVED' && (
                        <button
                          onClick={() => handleMarkWon(deal.id)}
                          className="bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer"
                        >
                          Mark as WON
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-on-surface-variant">
                    {loading ? 'Loading deals queue...' : 'No deals in queue.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Modal */}
      {selectedDeal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface rounded-2xl max-w-xl w-full p-6 space-y-5 border border-outline-variant shadow-xl relative">
            <button onClick={() => setSelectedDeal(null)} className="absolute top-4 right-4 text-outline hover:text-primary">
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <h2 className="text-xl font-bold text-primary">Approve Deal Registration</h2>
              <p className="text-xs text-on-surface-variant">Customer: {selectedDeal.customer_name}</p>
            </div>

            {selectedDeal.is_flagged_duplicate && (
              <div className="bg-amber-50 border border-amber-300 text-amber-900 p-3.5 rounded-xl text-xs space-y-1">
                <div className="font-bold flex items-center gap-1 text-amber-800">
                  <AlertTriangle className="w-4 h-4 text-amber-600" /> Non-Blocking Duplicate Warning Flag:
                </div>
                <p className="text-[11px]">Customer email matches existing active record.</p>
              </div>
            )}

            <div className="bg-surface-container-low border border-outline-variant p-4 rounded-xl space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Customer Name:</span>
                <span className="font-bold text-primary">{selectedDeal.customer_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Registered Product:</span>
                <span className="font-bold text-primary">{selectedDeal.product_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Estimated Deal Value:</span>
                <span className="font-bold text-primary">${selectedDeal.estimated_value.toLocaleString()} {selectedDeal.currency}</span>
              </div>
            </div>

            {/* Configurable Protection Expiry Picker */}
            <div className="space-y-2 text-xs">
              <label className="font-bold text-primary block">Select Protection Duration</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setProtectionDays(60)}
                  className={`p-3 rounded-xl border font-bold text-center cursor-pointer ${
                    protectionDays === 60 ? 'border-secondary-container bg-secondary-container/10 text-primary' : 'border-outline-variant'
                  }`}
                >
                  60 Days Protection (Standard)
                </button>
                <button
                  type="button"
                  onClick={() => setProtectionDays(90)}
                  className={`p-3 rounded-xl border font-bold text-center cursor-pointer ${
                    protectionDays === 90 ? 'border-secondary-container bg-secondary-container/10 text-primary' : 'border-outline-variant'
                  }`}
                >
                  90 Days Protection (Extended)
                </button>
              </div>
            </div>

            <div className="flex gap-3 pt-2 text-xs">
              <button
                onClick={handleApproveDeal}
                disabled={submitting}
                className="flex-1 bg-emerald-600 text-white font-bold py-3 rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-50"
              >
                <ShieldCheck className="w-4 h-4" /> Approve Deal & Activate Protection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
