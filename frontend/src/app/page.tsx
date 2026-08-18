import Link from 'next/link';
import { 
  Hexagon, 
  ArrowRight, 
  TrendingUp, 
  ShieldCheck, 
  Grid, 
  Headphones, 
  Award, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  ChevronRight 
} from 'lucide-react';

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
        <section className="bg-gradient-to-br from-surface via-surface-container-low to-surface-container-high pt-12 pb-20 px-4 md:px-8 border-b border-outline-variant relative overflow-hidden">
          <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            <div className="flex flex-col gap-5 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-highest border border-outline-variant w-fit shadow-xs">
                <Sparkles className="w-4 h-4 text-secondary-container fill-secondary-container" />
                <span className="text-xs font-bold text-primary-container uppercase tracking-wider">Enterprise Partner Program</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-primary tracking-tight leading-tight">
                Grow Your Business With Digitalsofts
              </h1>
              <p className="text-lg text-on-surface-variant leading-relaxed">
                Join an elite ecosystem of technology resellers and referral partners. Access 30+ B2B software products, earn up to 50% commissions, and protect your sales deals with guaranteed registration periods.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link href="/apply" className="bg-secondary-container text-on-secondary font-semibold text-base px-6 py-3.5 rounded-xl hover:bg-secondary transition-all duration-200 shadow-md hover:shadow-lg text-center flex items-center justify-center gap-2 cursor-pointer">
                  Apply for Partnership
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/login" className="bg-surface border-2 border-primary-container text-primary-container font-semibold text-base px-6 py-3.5 rounded-xl hover:bg-surface-variant transition-colors duration-200 text-center flex items-center justify-center gap-2 cursor-pointer">
                  Partner Portal Login
                </Link>
              </div>

              {/* Key Quick Stats */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-outline-variant/60">
                <div>
                  <div className="text-2xl font-bold text-primary">30+</div>
                  <div className="text-xs text-on-surface-variant">Live Products</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-secondary-container">10–50%</div>
                  <div className="text-xs text-on-surface-variant">Commission Range</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">90 Days</div>
                  <div className="text-xs text-on-surface-variant">Deal Protection</div>
                </div>
              </div>
            </div>

            {/* Visual Card / Mockup preview */}
            <div className="relative w-full h-[460px] rounded-2xl overflow-hidden border border-outline-variant shadow-xl bg-primary p-6 text-white flex flex-col justify-between">
              <div className="flex justify-between items-center pb-4 border-b border-primary-container">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <span className="text-xs text-on-primary-container font-mono ml-2">Digitalsofts Partner Console v1.0</span>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded bg-secondary-container/20 text-secondary-container border border-secondary-container/30">
                  Certified Reseller Tier
                </span>
              </div>

              <div className="space-y-4 my-auto">
                <div className="bg-primary-container/80 backdrop-blur border border-primary-container rounded-xl p-4 flex justify-between items-center">
                  <div>
                    <div className="text-xs text-on-primary-container">Active Registered Deals</div>
                    <div className="text-2xl font-bold text-white">$142,500 USD</div>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-secondary-container/20 flex items-center justify-center text-secondary-container">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-primary-container/80 backdrop-blur border border-primary-container rounded-xl p-4">
                    <div className="text-xs text-on-primary-container">Pending Commission</div>
                    <div className="text-xl font-bold text-secondary-container">$28,500</div>
                  </div>
                  <div className="bg-primary-container/80 backdrop-blur border border-primary-container rounded-xl p-4">
                    <div className="text-xs text-on-primary-container">Paid Commission</div>
                    <div className="text-xl font-bold text-emerald-400">$64,200</div>
                  </div>
                </div>
              </div>

              <div className="bg-primary-container/40 rounded-xl p-3 flex justify-between items-center text-xs text-on-primary-container border border-primary-container/40">
                <span>Minimum Payout Threshold: PKR 5,000 / USD 50</span>
                <span className="text-emerald-400 font-medium">Eligible for Release ✓</span>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-20 px-4 md:px-8 bg-surface">
          <div className="max-w-container-max mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary mb-3">Unrivaled Partner Benefits</h2>
              <p className="text-base text-on-surface-variant max-w-2xl mx-auto">
                Our program is engineered to provide high profit margins, protected deal pipelines, and dedicated support for technology partners.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Benefit Card 1 */}
              <div className="bg-surface border border-outline-variant rounded-xl p-6 hover:border-secondary-container hover:shadow-lg transition-all duration-200 group">
                <div className="w-12 h-12 rounded-xl bg-surface-container-low flex items-center justify-center mb-5 group-hover:bg-secondary-container/10 transition-colors">
                  <TrendingUp className="w-6 h-6 text-primary group-hover:text-secondary-container transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-2">Lucrative Commissions</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Earn 10% to 50% recurring revenue share based on your tier, plus performance bonuses for high sales volume.
                </p>
              </div>

              {/* Benefit Card 2 */}
              <div className="bg-surface border border-outline-variant rounded-xl p-6 hover:border-secondary-container hover:shadow-lg transition-all duration-200 group">
                <div className="w-12 h-12 rounded-xl bg-surface-container-low flex items-center justify-center mb-5 group-hover:bg-secondary-container/10 transition-colors">
                  <ShieldCheck className="w-6 h-6 text-primary group-hover:text-secondary-container transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-2">Protected Pipeline</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Register deals to lock in client exclusivity for 60 to 90 days with guaranteed margin protection.
                </p>
              </div>

              {/* Benefit Card 3 */}
              <div className="bg-surface border border-outline-variant rounded-xl p-6 hover:border-secondary-container hover:shadow-lg transition-all duration-200 group">
                <div className="w-12 h-12 rounded-xl bg-surface-container-low flex items-center justify-center mb-5 group-hover:bg-secondary-container/10 transition-colors">
                  <Grid className="w-6 h-6 text-primary group-hover:text-secondary-container transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-2">30+ B2B Software Products</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Access industry ERPs, POS software, hospitality, and real estate solutions from digitalsofts.com.
                </p>
              </div>

              {/* Benefit Card 4 */}
              <div className="bg-surface border border-outline-variant rounded-xl p-6 hover:border-secondary-container hover:shadow-lg transition-all duration-200 group">
                <div className="w-12 h-12 rounded-xl bg-surface-container-low flex items-center justify-center mb-5 group-hover:bg-secondary-container/10 transition-colors">
                  <Headphones className="w-6 h-6 text-primary group-hover:text-secondary-container transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-2">Fast Bank Payouts</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Accumulate earnings across deals and request bank payouts starting at PKR 5,000 / USD 50 minimum.
                </p>
              </div>
            </div>
          </div>
        </section>

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

        {/* CTA Banner */}
        <section className="py-16 px-4 md:px-8 bg-primary text-white text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to Become a Digitalsofts Partner?</h2>
            <p className="text-base text-on-primary-container mb-8">
              Submit your application in under 2 minutes. Our HR team reviews and approves applications within 24–48 hours.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/apply" className="bg-secondary-container text-on-secondary font-bold text-base px-8 py-3.5 rounded-xl hover:bg-secondary transition-all duration-200 shadow-md">
                Start Partner Application
              </Link>
              <Link href="/login" className="bg-primary-container text-white font-bold text-base px-8 py-3.5 rounded-xl hover:bg-primary-container/80 border border-on-primary-container/20 transition-all duration-200">
                Log In to Existing Account
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-highest border-t border-outline-variant py-10 px-4 md:px-8 text-xs text-on-surface-variant">
        <div className="max-w-container-max mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 font-bold text-primary text-sm">
            <Hexagon className="w-4 h-4 text-secondary-container fill-secondary-container" />
            Digitalsofts Partner Program
          </div>
          <div>© {new Date().getFullYear()} Digitalsofts. All rights reserved.</div>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-primary">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary">Terms of Service</Link>
            <Link href="#" className="hover:text-primary">Support</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
