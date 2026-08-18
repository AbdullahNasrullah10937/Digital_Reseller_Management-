'use client';

import { useState } from 'react';
import { 
  DollarSign, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  Send, 
  AlertCircle, 
  X 
} from 'lucide-react';

export default function AdminCommissionsPage() {
  const [selectedPayout, setSelectedPayout] = useState<any>(null);
  const [trxRef, setTrxRef] = useState('');
  const [actionMsg, setActionMsg] = useState<string | null>(null);
  const [unmaskBank, setUnmaskBank] = useState(false);

  const pendingCommissions = [
    { id: 'COMM-104', dealId: 'DS-9102', partner: 'TechSolutions Ltd', customer: 'Packages Mall Limited', dealVal: '$25,000', rate: '30%', commAmt: '$7,500', status: 'PENDING', date: '2026-08-11' },
    { id: 'COMM-105', dealId: 'DS-9088', partner: 'TechSolutions Ltd', customer: 'Faisal Textile Mills', dealVal: '$35,000', rate: '30%', commAmt: '$10,500', status: 'PENDING', date: '2026-08-17' },
  ];

  const payoutRequests = [
    { id: 'PAY-805', partner: 'TechSolutions Ltd', code: 'DS-10283', amount: '$14,200 USD', thresholdStatus: 'ELIGIBLE', bankName: 'Meezan Bank', iban: 'PK42MEZN0001029384918234', title: 'TechSolutions Private Limited', status: 'REQUESTED', date: '2026-08-15' },
    { id: 'PAY-804', partner: 'Gulf Software Systems', code: 'DS-10499', amount: '$28,500 USD', thresholdStatus: 'ELIGIBLE', bankName: 'Al Rajhi Bank', iban: 'SA0380000000608010167519', title: 'Gulf Software Solutions LLC', status: 'REQUESTED', date: '2026-08-16' },
  ];

  const handleApprovePayment = (commId: string) => {
    setActionMsg(`Commission ${commId} transition: PENDING -> APPROVED (Customer payment confirmed).`);
    setTimeout(() => setActionMsg(null), 3000);
  };

  const handleMarkPaid = () => {
    setActionMsg(`Payout ${selectedPayout.id} Marked as PAID! Transaction ref: ${trxRef || 'TRX-PK-9912084'}. Notification email dispatched.`);
    setTimeout(() => {
      setSelectedPayout(null);
      setActionMsg(null);
      setTrxRef('');
    }, 2000);
  };

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
                <th className="p-3">Partner Company</th>
                <th className="p-3">Amount Requested</th>
                <th className="p-3">Threshold Status</th>
                <th className="p-3">Target Bank</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/60">
              {payoutRequests.map((p) => (
                <tr key={p.id} className="hover:bg-surface-container-low/60 transition-colors">
                  <td className="p-3 font-mono font-bold text-primary">{p.id}</td>
                  <td className="p-3 font-semibold text-on-surface">{p.partner} ({p.code})</td>
                  <td className="p-3 font-bold text-emerald-600 text-sm">{p.amount}</td>
                  <td className="p-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                      ✓ Threshold Eligible
                    </span>
                  </td>
                  <td className="p-3 text-on-surface-variant">{p.bankName}</td>
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
              ))}
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
                <th className="p-3">Deal ID</th>
                <th className="p-3">Partner</th>
                <th className="p-3">Customer Account</th>
                <th className="p-3">Deal Value</th>
                <th className="p-3">Comm. Amount</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/60">
              {pendingCommissions.map((c) => (
                <tr key={c.id} className="hover:bg-surface-container-low/60 transition-colors">
                  <td className="p-3 font-mono font-bold text-primary">{c.id}</td>
                  <td className="p-3 font-mono text-on-surface-variant">{c.dealId}</td>
                  <td className="p-3 font-semibold text-on-surface">{c.partner}</td>
                  <td className="p-3 text-on-surface-variant">{c.customer}</td>
                  <td className="p-3 font-bold text-primary">{c.dealVal}</td>
                  <td className="p-3 font-bold text-secondary-container">{c.commAmt}</td>
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
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Process Payout Modal with AES Bank Decryption */}
      {selectedPayout && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface rounded-2xl max-w-lg w-full p-6 space-y-5 border border-outline-variant shadow-xl relative">
            <button onClick={() => setSelectedPayout(null)} className="absolute top-4 right-4 text-outline hover:text-primary">
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <h2 className="text-xl font-bold text-primary">Process Manual Bank Payout</h2>
              <p className="text-xs text-on-surface-variant">Payout ID: {selectedPayout.id} for {selectedPayout.partner}</p>
            </div>

            <div className="bg-surface-container-low border border-outline-variant p-4 rounded-xl space-y-3 text-xs">
              <div className="flex justify-between font-bold">
                <span>Payout Amount:</span>
                <span className="text-emerald-600 text-base">{selectedPayout.amount}</span>
              </div>
              <div className="border-t border-outline-variant/60 pt-2 space-y-1">
                <div className="flex justify-between items-center text-primary font-bold">
                  <span>Target Bank Details:</span>
                  <button
                    type="button"
                    onClick={() => setUnmaskBank(!unmaskBank)}
                    className="text-[11px] text-secondary hover:underline flex items-center gap-1"
                  >
                    {unmaskBank ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    {unmaskBank ? 'Mask' : 'Decrypt (AES-256)'}
                  </button>
                </div>
                <div>Bank: <strong>{selectedPayout.bankName}</strong></div>
                <div>Title: <strong>{selectedPayout.title}</strong></div>
                <div>
                  IBAN: <strong className="font-mono text-primary">{unmaskBank ? selectedPayout.iban : 'PK42 **** **** 8234'}</strong>
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
              className="w-full bg-emerald-600 text-white font-bold text-xs py-3.5 rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <CheckCircle2 className="w-4 h-4" /> Mark Payout as PAID & Dispatch Email
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
