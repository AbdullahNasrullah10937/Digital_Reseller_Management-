'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Hexagon, CheckCircle2, ArrowLeft, Send, Sparkles } from 'lucide-react';
import { submitPartnerApplication } from '@/lib/api';

export default function PartnerApplicationPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    country: 'Pakistan',
    city: '',
    industryFocus: 'POS/Retail',
    website: '',
    preferredTier: 'reseller',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setApiError(null);

    try {
      await submitPartnerApplication({
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        company_name: formData.companyName,
        country: formData.country,
        city: formData.city,
        industry_focus: formData.industryFocus,
        website: formData.website || undefined,
        preferred_tier: formData.preferredTier,
      });
      setSubmitted(true);
    } catch (err: unknown) {
      setApiError(err instanceof Error ? err.message : 'Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-background font-sans flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8">
      {/* Header Bar */}
      <div className="max-w-3xl w-full mx-auto flex justify-between items-center mb-8">
        <Link href="/" className="flex items-center gap-2 text-primary font-bold text-lg hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-secondary-container">
            <Hexagon className="w-5 h-5 fill-secondary-container text-primary" />
          </div>
          <span>Digitalsofts</span>
        </Link>
        <Link href="/" className="text-xs font-semibold text-on-surface-variant hover:text-primary flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </div>

      {/* Main Form Container */}
      <div className="max-w-3xl w-full mx-auto bg-surface-container-lowest p-8 sm:p-12 rounded-2xl shadow-sm border border-outline-variant">
        {submitted ? (
          <div className="text-center py-8 space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-primary mb-2">Application Submitted Successfully!</h2>
              <p className="text-sm text-on-surface-variant max-w-md mx-auto">
                Thank you for applying to the Digitalsofts Partner Program. Your application is currently under review by our HR team (**Status: Pending Review**).
              </p>
            </div>

            <div className="bg-surface-container-low border border-outline-variant p-4 rounded-xl max-w-md mx-auto text-left text-xs space-y-2 text-on-surface">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Applicant:</span>
                <span className="font-semibold">{formData.fullName} ({formData.companyName})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Email:</span>
                <span className="font-semibold">{formData.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Preferred Tier:</span>
                <span className="font-semibold capitalize text-secondary-container">{formData.preferredTier}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Review Timeframe:</span>
                <span className="font-semibold">24–48 Business Hours</span>
              </div>
            </div>

            <div className="pt-4 flex justify-center gap-4">
              <Link href="/" className="bg-primary text-white text-xs font-semibold px-6 py-3 rounded-lg hover:bg-primary-container transition-colors">
                Return to Landing Page
              </Link>
              <Link href="/login" className="bg-surface border border-outline-variant text-primary text-xs font-semibold px-6 py-3 rounded-lg hover:bg-surface-variant transition-colors">
                Go to Partner Login
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container/10 text-secondary-container text-xs font-bold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5" /> Partner Program Application
              </div>
              <h1 className="text-3xl font-bold text-primary tracking-tight">Become a Digitalsofts Partner</h1>
              <p className="mt-2 text-sm text-on-surface-variant">
                Fill out the form below to register your company for the Digitalsofts Partner Program.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-primary mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Muhammad Ali"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-outline-variant bg-surface text-sm text-on-background focus:ring-2 focus:ring-secondary-container focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-primary mb-1.5">
                    Work Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="ali@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-outline-variant bg-surface text-sm text-on-background focus:ring-2 focus:ring-secondary-container focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-primary mb-1.5">
                    Phone / WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+92 300 1234567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-outline-variant bg-surface text-sm text-on-background focus:ring-2 focus:ring-secondary-container focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-primary mb-1.5">
                    Company / Agency Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. TechSolutions Ltd"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-outline-variant bg-surface text-sm text-on-background focus:ring-2 focus:ring-secondary-container focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-primary mb-1.5">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-outline-variant bg-surface text-sm text-on-background focus:ring-2 focus:ring-secondary-container focus:outline-none"
                  >
                    <option value="Pakistan">Pakistan</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Other">Other International</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-primary mb-1.5">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lahore / Karachi"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-outline-variant bg-surface text-sm text-on-background focus:ring-2 focus:ring-secondary-container focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-primary mb-1.5">
                    Industry Focus <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.industryFocus}
                    onChange={(e) => setFormData({ ...formData, industryFocus: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-outline-variant bg-surface text-sm text-on-background focus:ring-2 focus:ring-secondary-container focus:outline-none"
                  >
                    <option value="POS/Retail">POS & Retail Software</option>
                    <option value="Industry ERP">Manufacturing & Industry ERP</option>
                    <option value="Hospitality ERP">Hospitality & Hotel Software</option>
                    <option value="SME ERP">SME Business Management</option>
                    <option value="Real Estate ERP">Property & Real Estate</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-primary mb-1.5">
                    Company Website / LinkedIn
                  </label>
                  <input
                    type="url"
                    placeholder="https://techsolutions.com"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-outline-variant bg-surface text-sm text-on-background focus:ring-2 focus:ring-secondary-container focus:outline-none"
                  />
                </div>
              </div>

              {/* Tier Preference Selection */}
              <div className="pt-4 border-t border-outline-variant">
                <label className="block text-xs font-semibold text-primary mb-3">
                  Preferred Partner Tier <span className="text-red-500">*</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    { id: 'affiliate', title: 'Affiliate', rate: '10–20%', desc: 'Sends leads' },
                    { id: 'referral', title: 'Referral Partner', rate: '15–25%', desc: 'Qualifies deals' },
                    { id: 'reseller', title: 'Reseller', rate: '25–40%', desc: 'Full sales lifecycle' },
                    { id: 'certified', title: 'Certified Reseller', rate: '30–50%', desc: 'Sales + Support' },
                  ].map((tier) => (
                    <label
                      key={tier.id}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        formData.preferredTier === tier.id
                          ? 'border-secondary-container bg-secondary-container/5 ring-2 ring-secondary-container/30'
                          : 'border-outline-variant hover:border-primary-container'
                      }`}
                    >
                      <input
                        type="radio"
                        name="preferredTier"
                        value={tier.id}
                        checked={formData.preferredTier === tier.id}
                        onChange={(e) => setFormData({ ...formData, preferredTier: e.target.value })}
                        className="sr-only"
                      />
                      <div className="font-bold text-xs text-primary">{tier.title}</div>
                      <div className="text-xs font-extrabold text-secondary-container my-0.5">{tier.rate}</div>
                      <div className="text-[11px] text-on-surface-variant">{tier.desc}</div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Notice */}
              <div className="bg-surface-container-high/60 border border-outline-variant rounded-lg p-3 text-xs text-on-surface-variant">
                ℹ️ <strong>Note:</strong> Final tier assignment and commission rate will be set by HR upon reviewing your application credentials.
              </div>

              {/* Error Display */}
              {apiError && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                  {apiError}
                </div>
              )}

              {/* Submit Action */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-secondary-container text-on-secondary font-bold text-sm py-3.5 rounded-xl hover:bg-secondary transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <span>Submitting Application...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Submit Application for HR Review
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Footer link */}
      <div className="text-center text-xs text-on-surface-variant mt-8">
        Already approved? <Link href="/login" className="text-secondary font-bold hover:underline">Log in to Partner Portal</Link>
      </div>
    </div>
  );
}
