'use client';

import { useState } from 'react';
import { 
  User, 
  Building, 
  Lock, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  Key, 
  Save, 
  CheckCircle2, 
  Copy, 
  Award 
} from 'lucide-react';

export default function ProfileSettingsPage() {
  const [unmaskBank, setUnmaskBank] = useState(false);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const partnerProfile = {
    fullName: 'Muhammad Ali',
    companyName: 'TechSolutions Ltd',
    email: 'ali@techsolutions.com',
    phone: '+92 300 1234567',
    country: 'Pakistan',
    city: 'Lahore',
    referralCode: 'DS-10283',
    tier: 'Reseller',
    commissionRate: '30%',
    status: 'ACTIVE',
  };

  const [bankData, setBankData] = useState({
    bankName: 'Meezan Bank Limited',
    accountTitle: 'TechSolutions Private Limited',
    iban: 'PK42MEZN0001029384918234',
    swiftCode: 'MEZNPKKA',
  });

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(partnerProfile.referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveBank = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-primary">Profile & Settings</h1>
        <p className="text-xs text-on-surface-variant">Manage your account credentials, partner tier, and encrypted bank payout settings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Card: Partner Profile Overview */}
        <div className="bg-surface border border-outline-variant rounded-2xl p-6 shadow-xs space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-secondary-container text-primary font-bold text-xl flex items-center justify-center mx-auto shadow-sm">
              MA
            </div>
            <div>
              <h2 className="text-lg font-bold text-primary">{partnerProfile.fullName}</h2>
              <div className="text-xs text-on-surface-variant font-semibold">{partnerProfile.companyName}</div>
            </div>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
              Active {partnerProfile.tier} (30%)
            </span>
          </div>

          {/* Referral Code Display */}
          <div className="bg-surface-container-low border border-outline-variant rounded-xl p-4 space-y-2">
            <div className="text-[11px] text-on-surface-variant font-bold uppercase tracking-wider">Unique Partner Code</div>
            <div className="flex justify-between items-center bg-surface border border-outline-variant rounded-lg p-2 font-mono font-bold text-sm text-primary">
              <span>{partnerProfile.referralCode}</span>
              <button
                onClick={handleCopyReferral}
                className="text-xs text-secondary hover:text-primary flex items-center gap-1 font-sans"
              >
                <Copy className="w-3.5 h-3.5" /> {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="text-[10px] text-on-surface-variant">Use this code for offline deal submissions.</div>
          </div>
        </div>

        {/* Right Cards: Bank Details & Password */}
        <div className="md:col-span-2 space-y-6">
          {/* Encrypted Bank Details Form */}
          <div className="bg-surface border border-outline-variant rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex justify-between items-center border-b border-outline-variant pb-3">
              <div>
                <h2 className="text-base font-bold text-primary flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> Payout Banking Details
                </h2>
                <p className="text-xs text-on-surface-variant">Encrypted at rest using AES-256 Fernet security.</p>
              </div>

              <button
                type="button"
                onClick={() => setUnmaskBank(!unmaskBank)}
                className="text-xs font-bold text-primary hover:text-secondary flex items-center gap-1.5 bg-surface-container-low px-3 py-1.5 rounded-lg border border-outline-variant"
              >
                {unmaskBank ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                {unmaskBank ? 'Mask Sensitive Details' : 'Unmask IBAN'}
              </button>
            </div>

            {saved && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-3 rounded-lg flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Banking details encrypted & saved successfully!
              </div>
            )}

            <form onSubmit={handleSaveBank} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-primary block mb-1">Bank Name</label>
                  <input
                    type="text"
                    value={bankData.bankName}
                    onChange={(e) => setBankData({ ...bankData, bankName: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-outline-variant bg-surface text-on-surface"
                  />
                </div>

                <div>
                  <label className="font-semibold text-primary block mb-1">Account Title</label>
                  <input
                    type="text"
                    value={bankData.accountTitle}
                    onChange={(e) => setBankData({ ...bankData, accountTitle: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-outline-variant bg-surface text-on-surface"
                  />
                </div>

                <div>
                  <label className="font-semibold text-primary block mb-1">IBAN / Account Number</label>
                  <input
                    type={unmaskBank ? 'text' : 'password'}
                    value={unmaskBank ? bankData.iban : 'PK42MEZN0001029384918234'}
                    onChange={(e) => setBankData({ ...bankData, iban: e.target.value })}
                    className="w-full text-xs font-mono px-3.5 py-2.5 rounded-lg border border-outline-variant bg-surface text-on-surface"
                  />
                </div>

                <div>
                  <label className="font-semibold text-primary block mb-1">SWIFT / BIC Code</label>
                  <input
                    type={unmaskBank ? 'text' : 'password'}
                    value={unmaskBank ? bankData.swiftCode : 'MEZNPKKA'}
                    onChange={(e) => setBankData({ ...bankData, swiftCode: e.target.value })}
                    className="w-full text-xs font-mono px-3.5 py-2.5 rounded-lg border border-outline-variant bg-surface text-on-surface"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-primary text-white text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-primary-container transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Save className="w-4 h-4" /> Save Bank Details (AES-256 Encrypted)
              </button>
            </form>
          </div>

          {/* Password Change Form */}
          <div className="bg-surface border border-outline-variant rounded-2xl p-6 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-primary flex items-center gap-2 border-b border-outline-variant pb-3">
              <Key className="w-4 h-4 text-secondary-container" /> Security & Password
            </h2>

            <form className="space-y-4 text-xs max-w-md">
              <div>
                <label className="font-semibold text-primary block mb-1">Current Password</label>
                <input
                  type="password"
                  placeholder="••••••••••••"
                  className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-outline-variant bg-surface text-on-surface"
                />
              </div>

              <div>
                <label className="font-semibold text-primary block mb-1">New Password</label>
                <input
                  type="password"
                  placeholder="••••••••••••"
                  className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-outline-variant bg-surface text-on-surface"
                />
              </div>

              <button
                type="button"
                className="bg-surface border border-outline-variant text-primary text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-surface-variant transition-colors"
              >
                Update Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
