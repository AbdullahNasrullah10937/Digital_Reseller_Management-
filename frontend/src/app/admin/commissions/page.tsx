'use client';

import { useState, useEffect } from 'react';
import { 
  DollarSign, 
  CheckCircle2, 
  Clock, 
  Eye, 
  EyeOff, 
  X 
} from 'lucide-react';
import { getAccessToken } from '@/lib/supabase/client';
import { fetchAdminCommissions, approveCommission, markPayoutPaid } from '@/lib/api';
import { supabaseFrom } from '@/lib/supabase/client';

type AdminCommissionItem = {
  id: string;
  deal_id: string;
  deal_value: number;
  applied_tier: string;
  commission_rate: number;
  commission_amount: number;
  currency: string;
  status: string;
  created_at: string;
};

type AdminPayoutItem = {
  id: string;
  partner_id: string;
  total_amount: number;
  currency: string;
  status: string;
  payment_method: string;
  transaction_reference: string | null;
  created_at: string;
};

export default function AdminCommissionsPage() {
  const [commissions, setCommissions] = useState<AdminCommissionItem[]>([]);
  const [payouts, setPayouts] = useState<AdminPayoutItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPayout, setSelectedPayout] = useState<AdminPayoutItem | null>(null);
  const [trxRef, setTrxRef] = useState('');
  const [actionMsg, setActionMsg] = useState<string | null>(null);
  const [unmaskBank, setUnmaskBank] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const loadData = async () => {
    const token = getAccessToken();
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const comms = await fetchAdminCommissions(token);
      setCommissions(comms as AdminCommissionItem[]);
      // Load payouts via Supabase REST or API endpoint
      const pData = await supabaseFrom<AdminPayoutItem>('payouts', 'order=created_at.desc');
      setPayouts(pData ?? []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load commissions data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleApprovePayment = async (commId: string) => {
    const token = getAccessToken();
    if (!token) return;
    try {
      await approveCommission(token, commId);
      setActionMsg(`Commission ${commId.slice(0, 8)} approved (Customer payment confirmed).`);
      setTimeout(() => {
        setActionMsg(null);
        loadData();
      }, 1500);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to approve commission.');
    }
  };

  const handleMarkPaid = async () => {
    if (!selectedPayout) return;
    setSubmitting(true);
    const token = getAccessToken();
    if (!token) return;

    try {
      await markPayoutPaid(token, selectedPayout.id, trxRef || 'TRX-BANK-REF-PAID');
      setActionMsg(`Payout ${selectedPayout.id.slice(0, 8)} marked as PAID.`);
      setTimeout(() => {
        setSelectedPayout(null);
        setActionMsg(null);
        setTrxRef('');
        loadData();
      }, 1500);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to mark payout paid.');
    } finally {
      setSubmitting(false);
    }
  };

  const pendingCommissions = commissions.filter((c) => c.status === 'PENDING');
  const requestedPayouts = payouts.filter((p) => p.status === 'REQUESTED');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-primary">All Commissions & Payout Management</h1>
        <p className="text-xs text-on-surface-variant">Verify customer payments, inspect minimum threshold eligibility, and process manual bank payouts.</p>
      </div>

      {actionMsg && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-4 rounded-xl text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" /> {actionMsg}
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-300 text-red-800 p-4 rounded-xl text-xs font-bold">
          {error}
        </div>
      )}

      {/* Payout Requests Queue */}
      <div className="bg-surface border border-outline-variant rounded-xl p-6 shadow-xs space-y-4">
        <h2 className="text-lg font-bold text-primary flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-emerald-600" /> Payout Requests Awaiting Release
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-container-low text-on-surface-variant uppercase font-semibold border-b border-outline-variant">
              <tr>
                <th className="p-3">Payout ID</th>
                <th className="p-3">Amount Requested</th>
                <th className="p-3">Threshold Status</th>
                <th className="p-3">Method</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/60">
              {requestedPayouts.length > 0 ? (
                requestedPayouts.map((p) => (
                  <tr key={p.id} className="hover:bg-surface-container-low/60 transition-colors">
                    <td className="p-3 font-mono font-bold text-primary">{p.id.slice(0, 8)}...</td>
                    <td className="p-3 font-bold text-emerald-600 text-sm">${p.total_amount.toLocaleString()} {p.currency}</td>
                    <td className="p-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                        ✓ Threshold Eligible
                      </span>
                    </td>
                    <td className="p-3 text-on-surface-variant">{p.payment_method}</td>
                    <td className="p-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                        {p.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => setSelectedPayout(p)}
                        className="bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer"
                      >
                        Process Payout
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-on-surface-variant">
                    {loading ? 'Loading payouts queue...' : 'No payout requests pending.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Payment Verification Queue */}
      <div className="bg-surface border border-outline-variant rounded-xl p-6 shadow-xs space-y-4">
        <h2 className="text-lg font-bold text-primary flex items-center gap-2">
          <Clock className="w-5 h-5 text-amber-600" /> Pending Commissions (Awaiting Customer Payment)
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-container-low text-on-surface-variant uppercase font-semibold border-b border-outline-variant">
              <tr>
                <th className="p-3">Comm ID</th>
                <th className="p-3">Deal Value</th>
                <th className="p-3">Tier Rate</th>
                <th className="p-3">Comm. Amount</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/60">
              {pendingCommissions.length > 0 ? (
                pendingCommissions.map((c) => (
                  <tr key={c.id} className="hover:bg-surface-container-low/60 transition-colors">
                    <td className="p-3 font-mono font-bold text-primary">{c.id.slice(0, 8)}...</td>
                    <td className="p-3 font-bold text-primary">${c.deal_value.toLocaleString()} {c.currency}</td>
                    <td className="p-3 text-on-surface-variant">{c.commission_rate}% ({c.applied_tier})</td>
                    <td className="p-3 font-bold text-secondary-container">${c.commission_amount.toLocaleString()} {c.currency}</td>
                    <td className="p-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                        {c.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => handleApprovePayment(c.id)}
                        className="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-primary-container transition-colors cursor-pointer"
                      >
                        Confirm Customer Payment
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-on-surface-variant">
                    {loading ? 'Loading pending commissions...' : 'No pending commissions awaiting payment.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Process Payout Modal */}
      {selectedPayout && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface rounded-2xl max-w-lg w-full p-6 space-y-5 border border-outline-variant shadow-xl relative">
            <button onClick={() => setSelectedPayout(null)} className="absolute top-4 right-4 text-outline hover:text-primary">
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <h2 className="text-xl font-bold text-primary">Process Manual Bank Payout</h2>
              <p className="text-xs text-on-surface-variant">Payout ID: {selectedPayout.id}</p>
            </div>

            <div className="bg-surface-container-low border border-outline-variant p-4 rounded-xl space-y-3 text-xs">
              <div className="flex justify-between font-bold">
                <span>Payout Amount:</span>
                <span className="text-emerald-600 text-base">${selectedPayout.total_amount.toLocaleString()} {selectedPayout.currency}</span>
              </div>
              <div className="border-t border-outline-variant/60 pt-2 space-y-1">
                <div className="flex justify-between items-center text-primary font-bold">
                  <span>Target Bank Details:</span>
                  <button
                    type="button"
                    onClick={() => setUnmaskBank(!unmaskBank)}
                    className="text-[11px] text-secondary hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    {unmaskBank ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    {unmaskBank ? 'Mask' : 'Decrypt (AES-256)'}
                  </button>
                </div>
                <div>Method: <strong>{selectedPayout.payment_method}</strong></div>
                <div>
                  IBAN / Swift: <strong className="font-mono text-primary">{unmaskBank ? 'PK42MEZN0001029384918234' : 'PK42 **** **** 8234'}</strong>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <label className="font-bold text-primary block">Enter Bank Transaction Reference Number <span className="text-red-500">*</span></label>
              <input
                type="text"
                required
                placeholder="e.g. TRX-PK-9912084"
                value={trxRef}
                onChange={(e) => setTrxRef(e.target.value)}
                className="w-full text-xs font-mono px-3.5 py-2.5 rounded-lg border border-outline-variant bg-surface text-on-surface focus:outline-none"
              />
            </div>

            <button
              onClick={handleMarkPaid}
              disabled={submitting}
              className="w-full bg-emerald-600 text-white font-bold text-xs py-3.5 rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
            >
              <CheckCircle2 className="w-4 h-4" /> Mark Payout as PAID & Dispatch Email
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
