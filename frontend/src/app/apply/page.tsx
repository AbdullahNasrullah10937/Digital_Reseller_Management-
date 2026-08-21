'use client';

import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Hexagon, CheckCircle2, ArrowLeft, Send, Sparkles, ShieldCheck, Clock, TrendingUp } from 'lucide-react';
import { submitPartnerApplication } from '@/lib/api';

const inputClass =
  'w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-white text-sm text-on-background placeholder:text-outline focus:ring-2 focus:ring-secondary-container/40 focus:border-secondary-container focus:outline-none';

function PartnerApplicationForm() {
  const searchParams = useSearchParams();
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

  useEffect(() => {
    const tier = searchParams.get('tier');
    if (tier && ['affiliate', 'referral', 'reseller', 'certified'].includes(tier)) {
      setFormData((prev) => ({ ...prev, preferredTier: tier }));
    }
  }, [searchParams]);

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
    <div className="min-h-screen bg-surface-container-low font-sans flex">
      <aside className="hidden lg:flex w-[42%] min-h-screen flex-col justify-between bg-primary text-white p-10 xl:p-14 relative overflow-hidden">
        <div className="absolute -top-20 -right-16 w-72 h-72 rounded-full bg-secondary-container/20 blur-3xl pointer-events-none" aria-hidden />
        <div>
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-secondary-container flex items-center justify-center">
              <Hexagon className="w-6 h-6 fill-white text-primary" />
            </div>
            <span className="text-lg font-bold tracking-tight">Digitalsofts</span>
          </Link>
          <div className="mt-14">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-secondary-container">
              <Sparkles className="w-3.5 h-3.5" /> Partner program
            </span>
            <h1 className="mt-3 text-4xl font-bold tracking-tight leading-tight">
              Become a Digitalsofts partner
            </h1>
            <p className="mt-4 text-sm text-on-primary-container leading-relaxed max-w-sm">
              Sell 32 B2B products, lock deals for 90 days, and earn 10–50% commission. HR reviews every application within 24–48 hours.
            </p>
          </div>
          <ul className="mt-10 space-y-5">
            {[
              { icon: TrendingUp, title: '10–50% commission', desc: 'Rates by tier, plus volume bonuses.' },
              { icon: ShieldCheck, title: 'Protected pipeline', desc: 'Registered deals stay exclusive.' },
              { icon: Clock, title: 'Fast payouts', desc: 'From PKR 5,000 or USD 50.' },
            ].map((item) => (
              <li key={item.title} className="flex gap-3.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-secondary-container">
                  <item.icon className="w-5 h-5" />
                </span>
                <div>
                  <div className="text-sm font-semibold">{item.title}</div>
                  <div className="text-xs text-on-primary-container mt-0.5">{item.desc}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-xs text-on-primary-container relative z-10">
          Final tier and rate are assigned by HR after review.
        </p>
      </aside>

      <div className="flex-1 flex flex-col px-4 sm:px-8 py-8 lg:py-10">
        <div className="w-full max-w-2xl mx-auto flex justify-between items-center mb-8">
          <Link href="/" className="lg:hidden flex items-center gap-2 text-primary font-bold text-lg">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-secondary-container">
              <Hexagon className="w-5 h-5 fill-secondary-container text-primary" />
            </div>
            Digitalsofts
          </Link>
          <Link href="/" className="ml-auto text-xs font-semibold text-on-surface-variant hover:text-primary inline-flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>
        </div>

        <div className="w-full max-w-2xl mx-auto bg-white p-6 sm:p-10 rounded-2xl shadow-sm border border-outline-variant">
          {submitted ? (
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-primary mb-2">Application submitted</h2>
                <p className="text-sm text-on-surface-variant max-w-md mx-auto">
                  Thank you. Your application is with HR for review (status: Pending Review).
                </p>
              </div>
              <div className="bg-surface-container-low border border-outline-variant p-4 rounded-xl max-w-md mx-auto text-left text-xs space-y-2 text-on-surface">
                <div className="flex justify-between gap-4">
                  <span className="text-on-surface-variant">Applicant</span>
                  <span className="font-semibold text-right">{formData.fullName} ({formData.companyName})</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-on-surface-variant">Email</span>
                  <span className="font-semibold">{formData.email}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-on-surface-variant">Preferred tier</span>
                  <span className="font-semibold capitalize text-secondary">{formData.preferredTier}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-on-surface-variant">Review window</span>
                  <span className="font-semibold">24–48 business hours</span>
                </div>
              </div>
              <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
                <Link href="/" className="bg-primary text-white text-xs font-semibold px-6 py-3 rounded-xl hover:bg-primary-container transition-colors">
                  Return home
                </Link>
                <Link href="/login" className="bg-white border border-outline-variant text-primary text-xs font-semibold px-6 py-3 rounded-xl hover:bg-surface-container-low transition-colors">
                  Partner login
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <div className="lg:hidden inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container/10 text-secondary-container text-xs font-bold uppercase tracking-wider mb-3">
                  <Sparkles className="w-3.5 h-3.5" /> Partner application
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-primary tracking-tight">Apply to the partner program</h2>
                <p className="mt-2 text-sm text-on-surface-variant">
                  Company details only — no payment required. HR assigns the final tier after review.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-primary mb-1.5">
                      Full name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Muhammad Ali"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-primary mb-1.5">
                      Work email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="ali@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={inputClass}
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
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-primary mb-1.5">
                      Company name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. TechSolutions Ltd"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-primary mb-1.5">
                      Country <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className={inputClass}
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
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-primary mb-1.5">
                      Industry focus <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.industryFocus}
                      onChange={(e) => setFormData({ ...formData, industryFocus: e.target.value })}
                      className={inputClass}
                    >
                      <option value="POS/Retail">Retail Industry</option>
                      <option value="Industry ERP">Manufacturing / Oil & Gas / Textile</option>
                      <option value="Hospitality ERP">Hospitality Business</option>
                      <option value="SME ERP">SME / Visa / Electronics</option>
                      <option value="Real Estate ERP">Real Estate / Logistics / Agriculture</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-primary mb-1.5">
                      Website / LinkedIn
                    </label>
                    <input
                      type="url"
                      placeholder="https://company.com"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-outline-variant">
                  <label className="block text-xs font-semibold text-primary mb-3">
                    Preferred partner tier <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { id: 'affiliate', title: 'Affiliate', rate: '10–20%', desc: 'Sends leads' },
                      { id: 'referral', title: 'Referral Partner', rate: '15–25%', desc: 'Qualifies deals' },
                      { id: 'reseller', title: 'Reseller', rate: '25–40%', desc: 'Full sales lifecycle' },
                      { id: 'certified', title: 'Certified Reseller', rate: '30–50%', desc: 'Sales + support' },
                    ].map((tier) => (
                      <label
                        key={tier.id}
                        className={`p-4 rounded-xl border cursor-pointer transition-all ${
                          formData.preferredTier === tier.id
                            ? 'border-secondary-container bg-orange-50 ring-2 ring-secondary-container/25'
                            : 'border-outline-variant bg-white hover:border-primary'
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
                        <div className="font-bold text-sm text-primary">{tier.title}</div>
                        <div className="text-sm font-extrabold text-secondary my-0.5">{tier.rate}</div>
                        <div className="text-[11px] text-on-surface-variant">{tier.desc}</div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl bg-surface-container-low border border-outline-variant px-4 py-3 text-xs text-on-surface-variant">
                  Final tier and commission rate are set by HR after reviewing your credentials.
                </div>

                {apiError && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                    {apiError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-secondary-container text-on-secondary font-bold text-sm py-3.5 rounded-xl hover:bg-secondary transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    'Submitting application...'
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Submit for HR review
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>

        <p className="text-center text-xs text-on-surface-variant mt-6">
          Already approved?{' '}
          <Link href="/login" className="text-secondary font-bold hover:underline">
            Log in to the partner portal
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function PartnerApplicationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface-container-low" />}>
      <PartnerApplicationForm />
    </Suspense>
  );
}
