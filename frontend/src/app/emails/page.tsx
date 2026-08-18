'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Hexagon, Mail, ShieldCheck, CheckCircle2, DollarSign, ArrowLeft } from 'lucide-react';

export default function EmailTemplatesPage() {
  const [template, setTemplate] = useState<'app' | 'deal' | 'payout'>('app');

  return (
    <div className="min-h-screen bg-background p-6 space-y-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <Link href="/dashboard" className="text-xs font-semibold text-on-surface-variant hover:text-primary flex items-center gap-1 mb-1">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-primary">Transactional Email Templates Preview</h1>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setTemplate('app')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold ${template === 'app' ? 'bg-primary text-white' : 'bg-surface border border-outline-variant text-on-surface-variant'}`}
          >
            Application Approved Email
          </button>
          <button
            onClick={() => setTemplate('deal')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold ${template === 'deal' ? 'bg-primary text-white' : 'bg-surface border border-outline-variant text-on-surface-variant'}`}
          >
            Deal Protection Email
          </button>
          <button
            onClick={() => setTemplate('payout')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold ${template === 'payout' ? 'bg-primary text-white' : 'bg-surface border border-outline-variant text-on-surface-variant'}`}
          >
            Payout Release Email
          </button>
        </div>
      </div>

      {/* HTML Email Container Box */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-8 max-w-2xl mx-auto shadow-md space-y-6 text-on-surface">
        {/* Email Header */}
        <div className="flex items-center gap-3 border-b border-outline-variant pb-6">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-secondary-container">
            <Hexagon className="w-6 h-6 fill-secondary-container text-primary" />
          </div>
          <div>
            <div className="font-bold text-lg text-primary">Digitalsofts Partner Program</div>
            <div className="text-xs text-on-surface-variant">no-reply@digitalsofts.com</div>
          </div>
        </div>

        {template === 'app' && (
          <div className="space-y-4 text-xs">
            <div className="text-base font-bold text-primary">Congratulations! Your Digitalsofts Partner Application is Approved</div>
            <p className="text-on-surface-variant">
              Dear Muhammad Ali,<br /><br />
              We are excited to inform you that your partner application for <strong>TechSolutions Ltd</strong> has been reviewed and approved by Digitalsofts HR.
            </p>

            <div className="bg-surface-container-low border border-outline-variant p-4 rounded-xl space-y-2">
              <div>Assigned Tier: <strong>Reseller Tier</strong></div>
              <div>Commission Rate: <strong>30% Revenue Share</strong></div>
              <div>Unique Partner Referral Code: <strong className="font-mono text-primary text-sm">DS-10283</strong></div>
            </div>

            <div className="pt-2">
              <Link href="/login" className="bg-secondary-container text-on-secondary font-bold px-6 py-3 rounded-xl inline-block text-center">
                Log In to Partner Console
              </Link>
            </div>
          </div>
        )}

        {template === 'deal' && (
          <div className="space-y-4 text-xs">
            <div className="text-base font-bold text-primary">Deal Registration Approved — 60 Days Protection Activated</div>
            <p className="text-on-surface-variant">
              Dear Muhammad Ali,<br /><br />
              Your registered deal for <strong>Packages Mall Limited</strong> (Retail Management Software) has been approved by HR Admin.
            </p>

            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-emerald-900 space-y-1">
              <div className="font-bold text-sm">🛡️ Guaranteed Deal Protection Active</div>
              <div>Expires: <strong>October 10, 2026 (60 Days Protection)</strong></div>
              <div>Estimated Reseller Margin (30%): <strong>$7,500 USD</strong></div>
            </div>

            <div className="pt-2">
              <Link href="/deals/DS-9102" className="bg-primary text-white font-bold px-6 py-3 rounded-xl inline-block text-center">
                View Deal Timeline & Protection
              </Link>
            </div>
          </div>
        )}

        {template === 'payout' && (
          <div className="space-y-4 text-xs">
            <div className="text-base font-bold text-primary">Commission Payout Paid — Transaction Reference: TRX-PK-9812401</div>
            <p className="text-on-surface-variant">
              Dear Muhammad Ali,<br /><br />
              Digitalsofts Finance has processed your requested commission payout via manual bank transfer.
            </p>

            <div className="bg-surface-container-low border border-outline-variant p-4 rounded-xl space-y-2">
              <div>Amount Released: <strong className="text-emerald-600 text-sm">$14,200 USD</strong></div>
              <div>Target Bank: <strong>Meezan Bank Limited</strong></div>
              <div>Transaction Reference: <strong className="font-mono text-primary font-bold">TRX-PK-9812401</strong></div>
            </div>

            <div className="pt-2">
              <Link href="/commissions" className="bg-primary text-white font-bold px-6 py-3 rounded-xl inline-block text-center">
                View Commission Ledger & Payout History
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
