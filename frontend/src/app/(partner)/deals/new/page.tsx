'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Send, 
  ShieldCheck, 
  AlertCircle, 
  Building, 
  DollarSign, 
  Calendar, 
  Info 
} from 'lucide-react';

export default function RegisterNewDealPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [duplicateWarning, setDuplicateWarning] = useState(false);

  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    industry: 'POS/Retail',
    country: 'Pakistan',
    productId: 'retail-management',
    estimatedValue: '',
    currency: 'USD',
    expectedCloseDate: '',
    notes: '',
  });

  const productsList = [
    { id: 'retail-management', name: 'Retail Management Software', priceUsd: 1200 },
    { id: 'jewellery-store', name: 'Jewellery Store Management Software', priceUsd: 1500 },
    { id: 'petrol-pump', name: 'Petrol Pump Software', priceUsd: 35000 },
    { id: 'textile-erp', name: 'Textile Industry ERP', priceUsd: 35000 },
    { id: 'hotel-mgmt', name: 'Hotel Management Software', priceUsd: 15000 },
    { id: 'sweets-bakery', name: 'Sweets & Bakery Manufacturing Software', priceUsd: 20000 },
    { id: 'garments-mfg', name: 'Garments Manufacturing Software', priceUsd: 30000 },
    { id: 'small-medium-biz', name: 'Small & Medium Businesses Software', priceUsd: 15000 },
  ];

  const handleCustomerEmailChange = (val: string) => {
    setFormData({ ...formData, customerEmail: val });
    // Simulate non-blocking duplicate detection trigger
    if (val.toLowerCase().includes('packages') || val.toLowerCase().includes('gourmet')) {
      setDuplicateWarning(true);
    } else {
      setDuplicateWarning(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      router.push('/deals/DS-9102');
    }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <Link href="/deals" className="text-xs font-semibold text-on-surface-variant hover:text-primary flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Back to My Deals
        </Link>
        <span className="text-xs font-bold text-secondary-container bg-secondary-container/10 px-3 py-1 rounded-full uppercase tracking-wider">
          Deal Protection System
        </span>
      </div>

      <div className="bg-surface border border-outline-variant rounded-2xl p-6 sm:p-10 shadow-xs space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-primary">Register New Deal</h1>
          <p className="text-xs text-on-surface-variant mt-1">
            Register your customer opportunity to lock in your 30% reseller margin and initiate 60–90 days deal protection.
          </p>
        </div>

        {/* Non-blocking Duplicate Check Notice */}
        {duplicateWarning ? (
          <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-xl p-4 text-xs space-y-1">
            <div className="font-bold flex items-center gap-1.5 text-amber-800">
              <AlertCircle className="w-4 h-4 text-amber-600" /> Non-Blocking Duplicate Warning:
            </div>
            <p>
              A customer with a similar email domain is registered by another partner. Your submission will still proceed cleanly with status <strong>Pending Approval</strong> and will be flagged for HR evaluation.
            </p>
          </div>
        ) : (
          <div className="bg-surface-container-low border border-outline-variant rounded-xl p-3.5 text-xs text-on-surface-variant flex items-start gap-2">
            <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <span>
              <strong>Duplicate Check Policy:</strong> Deal submission is never blocked. If a potential matching customer is found, it will be flagged for HR review during approval.
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Customer Details */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-primary flex items-center gap-2 border-b border-outline-variant pb-2">
              <Building className="w-4 h-4 text-secondary-container" /> Customer & Lead Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-primary mb-1">
                  Customer / Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Packages Mall Limited"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-outline-variant bg-surface text-on-surface focus:ring-2 focus:ring-secondary-container focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-primary mb-1">
                  Customer Contact Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="procurement@packages.com"
                  value={formData.customerEmail}
                  onChange={(e) => handleCustomerEmailChange(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-outline-variant bg-surface text-on-surface focus:ring-2 focus:ring-secondary-container focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-primary mb-1">
                  Customer Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+92 42 35712345"
                  value={formData.customerPhone}
                  onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-outline-variant bg-surface text-on-surface focus:ring-2 focus:ring-secondary-container focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-primary mb-1">
                  Industry <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-outline-variant bg-surface text-on-surface focus:ring-2 focus:ring-secondary-container focus:outline-none"
                >
                  <option value="POS/Retail">POS & Retail</option>
                  <option value="Industry ERP">Manufacturing & Industry ERP</option>
                  <option value="Hospitality ERP">Hospitality & Hotel Software</option>
                  <option value="SME ERP">SME Business Management</option>
                  <option value="Real Estate ERP">Property & Real Estate</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Product & Deal Financials */}
          <div className="space-y-4 pt-2">
            <h2 className="text-sm font-bold text-primary flex items-center gap-2 border-b border-outline-variant pb-2">
              <DollarSign className="w-4 h-4 text-secondary-container" /> Product & Financial Estimates
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-primary mb-1">
                  Select Product Catalog Item <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.productId}
                  onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-outline-variant bg-surface text-on-surface focus:ring-2 focus:ring-secondary-container focus:outline-none"
                >
                  {productsList.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} (${p.priceUsd.toLocaleString()} est.)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-primary mb-1">
                  Currency <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-outline-variant bg-surface text-on-surface focus:ring-2 focus:ring-secondary-container focus:outline-none"
                >
                  <option value="USD">USD ($)</option>
                  <option value="PKR">PKR (Rs.)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-primary mb-1">
                  Estimated Total Deal Value <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 25000"
                  value={formData.estimatedValue}
                  onChange={(e) => setFormData({ ...formData, estimatedValue: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-outline-variant bg-surface text-on-surface focus:ring-2 focus:ring-secondary-container focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-primary mb-1">
                  Expected Close Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={formData.expectedCloseDate}
                  onChange={(e) => setFormData({ ...formData, expectedCloseDate: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-outline-variant bg-surface text-on-surface focus:ring-2 focus:ring-secondary-container focus:outline-none"
                />
              </div>
            </div>

            {/* Live Commission Estimate Preview */}
            {formData.estimatedValue && (
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-xs space-y-1">
                <div className="flex justify-between items-center text-emerald-900 font-bold">
                  <span>Estimated Reseller Commission Preview (30% Tier Rate):</span>
                  <span className="text-base text-emerald-700">
                    {formData.currency === 'USD' ? '$' : 'PKR '}
                    {(parseFloat(formData.estimatedValue) * 0.3).toLocaleString()}
                  </span>
                </div>
                <div className="text-[11px] text-emerald-700">
                  Calculated automatically upon deal win based on your active partner tier rate.
                </div>
              </div>
            )}
          </div>

          {/* Section 3: Notes */}
          <div>
            <label className="block text-xs font-semibold text-primary mb-1">
              Deal Notes & Customer Requirements
            </label>
            <textarea
              rows={3}
              placeholder="Provide background on the opportunity, customer requirements, or expected license scope..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-outline-variant bg-surface text-on-surface focus:ring-2 focus:ring-secondary-container focus:outline-none"
            />
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-secondary-container text-on-secondary font-bold text-sm py-3.5 rounded-xl hover:bg-secondary transition-all shadow-sm hover:shadow flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {submitting ? (
              <span>Submitting Deal Registration...</span>
            ) : (
              <>
                <Send className="w-4 h-4" /> Submit Deal Registration for HR Approval
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
