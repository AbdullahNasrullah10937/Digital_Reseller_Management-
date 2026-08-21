import Link from 'next/link';
import { 
  Hexagon, 
  ArrowRight, 
  TrendingUp, 
  ShieldCheck, 
  Grid, 
  Headphones, 
  CheckCircle2, 
  Sparkles, 
  Clock,
  Shield,
  BarChart3,
  Mail,
  Globe,
  ArrowUpRight
} from 'lucide-react';
import ProductCatalog from '@/components/product-catalog';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-on-background font-sans antialiased overflow-x-hidden">
      {/* Top Navbar */}
      <nav className="bg-surface/90 backdrop-blur-md sticky top-0 z-50 border-b border-outline-variant w-full">
        <div className="flex justify-between items-center px-4 md:px-8 w-full max-w-container-max mx-auto h-20">
          {/* Brand Logo */}
          <Link href="/" className="text-2xl font-bold text-primary flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-secondary-container shadow-md">
              <Hexagon className="w-6 h-6 fill-secondary-container text-primary" />
            </div>
            <span className="tracking-tight">Digitalsofts</span>
            <span className="text-xs uppercase font-semibold tracking-widest px-2 py-0.5 rounded bg-surface-container-high text-primary-container border border-outline-variant">
              Partners
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex gap-8 items-center">
            <Link href="/" className="text-secondary font-semibold text-sm border-b-2 border-secondary pb-1 py-2">
              Home
            </Link>
            <Link href="#tiers" className="text-on-surface-variant text-sm font-medium hover:text-secondary transition-colors duration-200 py-2">
              Partner Tiers
            </Link>
            <Link href="#products" className="text-on-surface-variant text-sm font-medium hover:text-secondary transition-colors duration-200 py-2">
              Product Catalog
            </Link>
            <Link href="#benefits" className="text-on-surface-variant text-sm font-medium hover:text-secondary transition-colors duration-200 py-2">
              Benefits
            </Link>
            <Link href="/login" className="text-on-surface-variant text-sm font-semibold hover:text-secondary transition-colors duration-200 py-2">
              Partner Login
            </Link>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <Link href="/login" className="hidden sm:inline-flex text-primary font-semibold text-sm px-4 py-2 rounded-lg border border-outline-variant hover:bg-surface-container-high transition-colors duration-200">
              Sign In
            </Link>
            <Link href="/apply" className="bg-secondary-container text-on-secondary font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-secondary transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer">
              Become a Partner
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="w-full">
        {/* Hero Section */}
        <section className="hero-mesh pt-16 md:pt-20 pb-20 md:pb-28 px-4 md:px-8 border-b border-outline-variant relative overflow-hidden">
          <div className="hero-grid absolute inset-0 pointer-events-none" aria-hidden />
          <div className="absolute -top-24 right-0 w-[420px] h-[420px] rounded-full bg-secondary-container/10 blur-3xl pointer-events-none" aria-hidden />
          <div className="absolute bottom-0 -left-16 w-[320px] h-[320px] rounded-full bg-primary/5 blur-3xl pointer-events-none" aria-hidden />

          <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-16 items-center relative z-10">
            <div className="flex flex-col gap-6 max-w-2xl">
              <div className="inline-flex items-center gap-2.5 pl-1.5 pr-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-outline-variant w-fit shadow-sm">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-secondary-container text-white">
                  <Sparkles className="w-3.5 h-3.5" />
                </span>
                <span className="text-[11px] font-bold text-primary uppercase tracking-[0.14em]">Enterprise Partner Program</span>
              </div>

              <h1 className="text-[2.5rem] md:text-5xl xl:text-[3.5rem] font-bold text-primary tracking-tight leading-[1.12]">
                Grow your revenue with the{' '}
                <span className="text-secondary-container">Digitalsofts</span> partner network
              </h1>

              <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-xl">
                Register deals, earn 10–50% commission, and sell 32 B2B products — POS, industry ERP, hospitality, and real estate — with 90-day pipeline protection.
              </p>

              <div className="flex flex-col sm:flex-row gap-3.5 pt-1">
                <Link href="/apply" className="bg-secondary-container text-on-secondary font-semibold text-[15px] px-7 py-3.5 rounded-xl hover:bg-secondary transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 text-center flex items-center justify-center gap-2">
                  Apply for Partnership
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/login" className="bg-white/90 border border-outline-variant text-primary font-semibold text-[15px] px-7 py-3.5 rounded-xl hover:border-primary-container hover:bg-white transition-all duration-200 text-center flex items-center justify-center gap-2 shadow-sm">
                  Partner Portal Login
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 text-sm text-on-surface-variant">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Reviewed in 24–48 hours
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-primary" />
                  Exclusive deal registration
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-secondary" />
                  Fast bank payouts
                </span>
              </div>

              <div className="grid grid-cols-3 gap-0 pt-6 mt-1 border-t border-outline-variant/70">
                <div className="pr-4">
                  <div className="text-2xl md:text-3xl font-bold text-primary tracking-tight">32</div>
                  <div className="text-xs font-medium text-on-surface-variant mt-0.5">Live products</div>
                </div>
                <div className="px-4 border-l border-outline-variant/70">
                  <div className="text-2xl md:text-3xl font-bold text-secondary-container tracking-tight">10–50%</div>
                  <div className="text-xs font-medium text-on-surface-variant mt-0.5">Commission range</div>
                </div>
                <div className="pl-4 border-l border-outline-variant/70">
                  <div className="text-2xl md:text-3xl font-bold text-primary tracking-tight">90 days</div>
                  <div className="text-xs font-medium text-on-surface-variant mt-0.5">Deal protection</div>
                </div>
              </div>
            </div>

            {/* Product preview */}
            <div className="relative w-full lg:pl-4 pb-10 lg:pb-6">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/10 via-transparent to-secondary-container/20 blur-xl pointer-events-none" aria-hidden />

              <div className="hero-float relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-primary/25 bg-primary text-white">
                <div className="flex items-center justify-between px-5 py-3.5 bg-primary-container/80 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                    </div>
                    <span className="text-[11px] text-on-primary-container font-medium tracking-wide">Partner Console</span>
                  </div>
                  <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-secondary-container/15 text-secondary-container border border-secondary-container/25">
                    Certified Reseller
                  </span>
                </div>

                <div className="p-5 space-y-4">
                  <div className="rounded-xl bg-white/5 border border-white/10 p-4 flex items-end justify-between">
                    <div>
                      <div className="text-[11px] uppercase tracking-wider text-on-primary-container font-semibold">Pipeline value</div>
                      <div className="text-3xl font-bold tracking-tight mt-1">$142,500</div>
                      <div className="text-xs text-emerald-400 mt-1 font-medium">+18.4% this quarter</div>
                    </div>
                    <div className="w-11 h-11 rounded-xl bg-secondary-container/20 flex items-center justify-center text-secondary-container">
                      <BarChart3 className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-white/5 border border-white/10 p-3.5">
                      <div className="text-[11px] text-on-primary-container">Pending</div>
                      <div className="text-lg font-bold text-secondary-container mt-0.5">$28,500</div>
                    </div>
                    <div className="rounded-xl bg-white/5 border border-white/10 p-3.5">
                      <div className="text-[11px] text-on-primary-container">Paid out</div>
                      <div className="text-lg font-bold text-emerald-400 mt-0.5">$64,200</div>
                    </div>
                  </div>

                  <div className="rounded-xl bg-white/5 border border-white/10 overflow-hidden">
                    <div className="px-3.5 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-on-primary-container border-b border-white/10">
                      Protected deals
                    </div>
                    <ul className="divide-y divide-white/10">
                      <li className="px-3.5 py-2.5 flex items-center justify-between text-sm">
                        <span className="text-white/90">Textile ERP — Lahore</span>
                        <span className="text-[11px] font-semibold text-emerald-400">Approved</span>
                      </li>
                      <li className="px-3.5 py-2.5 flex items-center justify-between text-sm">
                        <span className="text-white/90">Hotel PMS — Karachi</span>
                        <span className="text-[11px] font-semibold text-secondary-container">Review</span>
                      </li>
                      <li className="px-3.5 py-2.5 flex items-center justify-between text-sm">
                        <span className="text-white/90">Retail POS — Islamabad</span>
                        <span className="text-[11px] font-semibold text-on-primary-container">Won</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-3 sm:-left-6 rounded-xl bg-white border border-outline-variant shadow-lg px-3.5 py-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <div className="text-xs font-bold text-primary">90-day protection</div>
                  <div className="text-[11px] text-on-surface-variant">Registered deals stay exclusive</div>
                </div>
              </div>

              <div className="absolute -top-3 -right-2 sm:-right-4 rounded-xl bg-white border border-outline-variant shadow-lg px-3.5 py-3 hidden sm:flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-secondary-container" />
                </div>
                <div>
                  <div className="text-xs font-bold text-primary">Up to 50% share</div>
                  <div className="text-[11px] text-on-surface-variant">Certified reseller tier</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="benefits-mesh py-20 md:py-24 px-4 md:px-8 relative overflow-hidden">
          <div className="benefits-grid absolute inset-0 pointer-events-none" aria-hidden />

          <div className="max-w-container-max mx-auto relative z-10">
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 text-[11px] font-bold text-secondary-container uppercase tracking-[0.16em] mb-3">
                Why partners stay
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">Built for serious resellers</h2>
              <p className="text-base text-on-primary-container max-w-2xl mx-auto leading-relaxed">
                High margins, locked pipelines, a full B2B catalog, and payouts that actually clear — without the usual partner-program friction.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="rounded-2xl p-6 bg-gradient-to-br from-orange-50 to-white border border-secondary-container/25 shadow-lg shadow-black/10 hover:-translate-y-1 hover:shadow-xl transition-all duration-200">
                <div className="w-12 h-12 rounded-xl bg-secondary-container text-white flex items-center justify-center mb-5 shadow-md shadow-secondary-container/30">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">Lucrative commissions</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Earn 10% to 50% recurring revenue share by tier, plus volume bonuses when you close consistently.
                </p>
                <div className="mt-5 pt-4 border-t border-orange-100 text-xs font-bold text-secondary uppercase tracking-wide">
                  10–50% share
                </div>
              </div>

              <div className="rounded-2xl p-6 bg-gradient-to-br from-sky-50 to-white border border-sky-200/80 shadow-lg shadow-black/10 hover:-translate-y-1 hover:shadow-xl transition-all duration-200">
                <div className="w-12 h-12 rounded-xl bg-primary text-secondary-container flex items-center justify-center mb-5 shadow-md shadow-primary/25">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">Protected pipeline</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Register a deal and lock client exclusivity for 60–90 days with guaranteed margin protection.
                </p>
                <div className="mt-5 pt-4 border-t border-sky-100 text-xs font-bold text-primary uppercase tracking-wide">
                  90-day exclusivity
                </div>
              </div>

              <div className="rounded-2xl p-6 bg-gradient-to-br from-indigo-50 to-white border border-indigo-200/70 shadow-lg shadow-black/10 hover:-translate-y-1 hover:shadow-xl transition-all duration-200">
                <div className="w-12 h-12 rounded-xl bg-primary-container text-white flex items-center justify-center mb-5 shadow-md shadow-primary/20">
                  <Grid className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">32 B2B products</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  POS, industry ERP, hospitality, SME, and real estate software — one catalog, one partner portal.
                </p>
                <div className="mt-5 pt-4 border-t border-indigo-100 text-xs font-bold text-primary-container uppercase tracking-wide">
                  One catalog
                </div>
              </div>

              <div className="rounded-2xl p-6 bg-gradient-to-br from-emerald-50 to-white border border-emerald-200/80 shadow-lg shadow-black/10 hover:-translate-y-1 hover:shadow-xl transition-all duration-200">
                <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-5 shadow-md shadow-emerald-600/25">
                  <Headphones className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">Fast bank payouts</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Pool commissions across deals and request payouts from PKR 5,000 or USD 50 — no long holdbacks.
                </p>
                <div className="mt-5 pt-4 border-t border-emerald-100 text-xs font-bold text-emerald-700 uppercase tracking-wide">
                  PKR 5,000 / USD 50
                </div>
              </div>
            </div>
          </div>
        </section>

        <ProductCatalog />

        {/* Partner Program Tiers Section */}
        <section id="tiers" className="py-20 px-4 md:px-8 bg-surface-container-low border-y border-outline-variant">
          <div className="max-w-container-max mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
              <div>
                <span className="text-xs font-bold text-secondary-container uppercase tracking-wider">Program Architecture</span>
                <h2 className="text-3xl font-bold text-primary mt-1">Four Confirmed Partner Tiers</h2>
              </div>
              <p className="text-sm text-on-surface-variant max-w-lg">
                Choose the tier that matches your business model — from simple lead referral to full sales and onboarding services.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Tier 1 */}
              <div className="bg-surface border border-outline-variant rounded-xl p-6 flex flex-col justify-between hover:border-primary-container transition-colors shadow-sm">
                <div>
                  <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Entry Level</span>
                  <h3 className="text-2xl font-bold text-primary mt-1">Affiliate</h3>
                  <div className="text-3xl font-bold text-secondary-container my-4">10–20%</div>
                  <p className="text-xs text-on-surface-variant mb-4">Commission rate per deal value</p>
                  <ul className="space-y-2 text-xs text-on-surface font-medium border-t border-outline-variant/60 pt-4">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Sends traffic and leads</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> No technical support required</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Standard portal tracking</li>
                  </ul>
                </div>
                <Link href="/apply?tier=affiliate" className="mt-6 w-full py-2.5 rounded-lg border border-outline-variant text-center text-xs font-bold text-primary hover:bg-surface-container-high transition-colors">
                  Select Affiliate
                </Link>
              </div>

              {/* Tier 2 */}
              <div className="bg-surface border border-outline-variant rounded-xl p-6 flex flex-col justify-between hover:border-primary-container transition-colors shadow-sm">
                <div>
                  <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Qualified Lead</span>
                  <h3 className="text-2xl font-bold text-primary mt-1">Referral Partner</h3>
                  <div className="text-3xl font-bold text-secondary-container my-4">15–25%</div>
                  <p className="text-xs text-on-surface-variant mb-4">Commission rate per deal value</p>
                  <ul className="space-y-2 text-xs text-on-surface font-medium border-t border-outline-variant/60 pt-4">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Finds and qualifies prospects</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Joint sales assistance</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> 60-day deal protection</li>
                  </ul>
                </div>
                <Link href="/apply?tier=referral" className="mt-6 w-full py-2.5 rounded-lg border border-outline-variant text-center text-xs font-bold text-primary hover:bg-surface-container-high transition-colors">
                  Select Referral
                </Link>
              </div>

              {/* Tier 3 */}
              <div className="bg-surface border-2 border-secondary-container rounded-xl p-6 flex flex-col justify-between shadow-md relative">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary-container text-white text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
                  Popular Choice
                </span>
                <div>
                  <span className="text-xs font-semibold text-secondary uppercase tracking-wider">Full Sales</span>
                  <h3 className="text-2xl font-bold text-primary mt-1">Reseller</h3>
                  <div className="text-3xl font-bold text-secondary-container my-4">25–40%</div>
                  <p className="text-xs text-on-surface-variant mb-4">Commission rate per deal value</p>
                  <ul className="space-y-2 text-xs text-on-surface font-medium border-t border-outline-variant/60 pt-4">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Owns customer relationship</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Full sales deal lifecycle</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> 90-day deal protection</li>
                  </ul>
                </div>
                <Link href="/apply?tier=reseller" className="mt-6 w-full py-2.5 rounded-lg bg-secondary-container text-on-secondary text-center text-xs font-bold hover:bg-secondary transition-colors">
                  Apply as Reseller
                </Link>
              </div>

              {/* Tier 4 */}
              <div className="bg-surface border border-outline-variant rounded-xl p-6 flex flex-col justify-between hover:border-primary-container transition-colors shadow-sm">
                <div>
                  <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Enterprise Partner</span>
                  <h3 className="text-2xl font-bold text-primary mt-1">Certified Reseller</h3>
                  <div className="text-3xl font-bold text-secondary-container my-4">30–50%</div>
                  <p className="text-xs text-on-surface-variant mb-4">Commission rate per deal value</p>
                  <ul className="space-y-2 text-xs text-on-surface font-medium border-t border-outline-variant/60 pt-4">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Sales + Onboarding + Support</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Top tier commission range</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Volume performance bonus</li>
                  </ul>
                </div>
                <Link href="/apply?tier=certified" className="mt-6 w-full py-2.5 rounded-lg border border-outline-variant text-center text-xs font-bold text-primary hover:bg-surface-container-high transition-colors">
                  Apply Certified
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Become a Partner CTA */}
        <section className="relative overflow-hidden bg-primary px-4 md:px-8 py-20 md:py-24">
          <div className="absolute -top-24 -right-16 w-[420px] h-[420px] rounded-full bg-secondary-container/20 blur-3xl pointer-events-none" aria-hidden />
          <div className="absolute -bottom-28 -left-20 w-[360px] h-[360px] rounded-full bg-secondary-container/10 blur-3xl pointer-events-none" aria-hidden />

          <div className="max-w-container-max mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-secondary-container mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                Become a partner
              </span>
              <h2 className="text-3xl md:text-4xl xl:text-[2.75rem] font-bold text-white tracking-tight leading-tight">
                Join the Digitalsofts partner network in under two minutes
              </h2>
              <p className="mt-4 text-base text-on-primary-container leading-relaxed max-w-lg">
                Tell us about your company, pick a preferred tier, and HR reviews your application within 24–48 hours. Approved partners get portal access the same day.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  '32 B2B products across retail, ERP, hospitality, and more',
                  '10–50% commission with 90-day deal protection',
                  'Bank payouts from PKR 5,000 or USD 50',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-white/90">
                    <CheckCircle2 className="w-5 h-5 text-secondary-container shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-white p-7 md:p-8 shadow-2xl shadow-black/20 border border-white/20">
              <div className="text-xs font-bold uppercase tracking-wider text-secondary mb-1">Application path</div>
              <h3 className="text-xl font-bold text-primary mb-6">Three steps to go live</h3>
              <ol className="space-y-4 mb-7">
                {[
                  { step: '01', title: 'Submit your profile', desc: 'Company details, industry, and preferred tier.' },
                  { step: '02', title: 'HR review', desc: 'Credentials checked within 24–48 business hours.' },
                  { step: '03', title: 'Portal access', desc: 'Register deals and start earning commission.' },
                ].map((row) => (
                  <li key={row.step} className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-secondary-container text-xs font-bold">
                      {row.step}
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-primary">{row.title}</div>
                      <div className="text-xs text-on-surface-variant mt-0.5">{row.desc}</div>
                    </div>
                  </li>
                ))}
              </ol>
              <Link
                href="/apply"
                className="w-full inline-flex items-center justify-center gap-2 bg-secondary-container text-on-secondary font-bold text-sm py-3.5 rounded-xl hover:bg-secondary transition-colors shadow-md"
              >
                Start partner application
                <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-center text-xs text-on-surface-variant mt-3">
                Already approved?{' '}
                <Link href="/login" className="font-semibold text-primary hover:text-secondary">
                  Log in to the portal
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white border-t-4 border-secondary-container">
        <div className="max-w-container-max mx-auto px-4 md:px-8 py-14 md:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
            <div className="sm:col-span-2 lg:col-span-1">
              <Link href="/" className="inline-flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-secondary-container flex items-center justify-center">
                  <Hexagon className="w-6 h-6 fill-white text-primary" />
                </div>
                <span className="text-lg font-bold tracking-tight">Digitalsofts</span>
              </Link>
              <p className="mt-4 text-sm text-on-primary-container leading-relaxed max-w-xs">
                Official partner program for 32 B2B products — register deals, earn 10–50% commission, and get paid from PKR 5,000 / USD 50.
              </p>
              <div className="mt-5 flex flex-col gap-2 text-sm text-on-primary-container">
                <a href="https://digitalsofts.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-secondary-container transition-colors">
                  <Globe className="w-4 h-4" />
                  digitalsofts.com
                </a>
                <a href="https://digitalmanager.pk" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-secondary-container transition-colors">
                  <Globe className="w-4 h-4" />
                  digitalmanager.pk
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-[0.16em] text-secondary-container mb-4">Program</h3>
              <ul className="space-y-2.5 text-sm text-on-primary-container">
                <li><Link href="#benefits" className="hover:text-white transition-colors">Partner benefits</Link></li>
                <li><Link href="#products" className="hover:text-white transition-colors">Product catalog</Link></li>
                <li><Link href="#tiers" className="hover:text-white transition-colors">Partner tiers</Link></li>
                <li><Link href="/apply" className="hover:text-white transition-colors">Become a partner</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-[0.16em] text-secondary-container mb-4">Account</h3>
              <ul className="space-y-2.5 text-sm text-on-primary-container">
                <li><Link href="/login" className="hover:text-white transition-colors">Partner login</Link></li>
                <li><Link href="/admin/login" className="hover:text-white transition-colors">Admin login</Link></li>
                <li><Link href="/apply" className="hover:text-white transition-colors">Submit application</Link></li>
                <li><Link href="/login" className="hover:text-white transition-colors">Deal registration</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-[0.16em] text-secondary-container mb-4">Get started</h3>
              <p className="text-sm text-on-primary-container leading-relaxed mb-4">
                Applications are reviewed by HR within 24–48 hours. Approved partners get portal access the same day.
              </p>
              <Link
                href="/apply"
                className="inline-flex items-center gap-2 bg-secondary-container text-on-secondary text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-secondary transition-colors"
              >
                Apply now
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <p className="mt-4 inline-flex items-center gap-2 text-xs text-on-primary-container">
                <Mail className="w-3.5 h-3.5" />
                Review typically within 48 hours
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="max-w-container-max mx-auto px-4 md:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-on-primary-container">
            <p>© {new Date().getFullYear()} Digitalsofts. All rights reserved.</p>
            <div className="flex items-center gap-5">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="/support" className="hover:text-white transition-colors">Support</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
