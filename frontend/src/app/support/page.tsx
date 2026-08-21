import type { Metadata } from 'next';
import Link from 'next/link';
import { Clock, Mail, ShieldCheck, Headphones } from 'lucide-react';
import LegalLayout from '@/components/legal-layout';

export const metadata: Metadata = {
  title: 'Support | Digitalsofts Partner Portal',
};

export default function SupportPage() {
  return (
    <LegalLayout title="Support" updated="August 20, 2026">
      <p>
        HR reviews partner applications and deal registrations. Use this page to know where to go for the most common
        partner-program questions.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="rounded-xl border border-outline-variant bg-surface-container-low p-4">
          <Clock className="w-5 h-5 text-secondary-container mb-2" />
          <h3 className="text-sm font-bold text-primary">Application review</h3>
          <p className="text-xs mt-1">New applications are reviewed within 24–48 business hours. You will be contacted after HR approves or rejects.</p>
        </div>
        <div className="rounded-xl border border-outline-variant bg-surface-container-low p-4">
          <ShieldCheck className="w-5 h-5 text-secondary-container mb-2" />
          <h3 className="text-sm font-bold text-primary">Deal protection</h3>
          <p className="text-xs mt-1">After approval, deals are protected for 60–90 days. Check status under My Deals once you can log in.</p>
        </div>
        <div className="rounded-xl border border-outline-variant bg-surface-container-low p-4">
          <Headphones className="w-5 h-5 text-secondary-container mb-2" />
          <h3 className="text-sm font-bold text-primary">Payouts</h3>
          <p className="text-xs mt-1">Request a payout when approved commission reaches PKR 5,000 or USD 50. Transfers are sent manually, then marked Paid in the Portal.</p>
        </div>
        <div className="rounded-xl border border-outline-variant bg-surface-container-low p-4">
          <Mail className="w-5 h-5 text-secondary-container mb-2" />
          <h3 className="text-sm font-bold text-primary">Product sites</h3>
          <p className="text-xs mt-1">
            Product pages:{' '}
            <a href="https://digitalsofts.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary">digitalsofts.com</a>
            {' '}and{' '}
            <a href="https://digitalmanager.pk" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary">digitalmanager.pk</a>
          </p>
        </div>
      </div>

      <section className="space-y-2">
        <h2 className="text-base font-bold text-primary">Common questions</h2>
        <p>
          <strong className="text-primary">I applied but cannot log in.</strong> Login is created after HR approval. Until then your status stays Pending Review.
        </p>
        <p>
          <strong className="text-primary">When do I get a referral code?</strong> After approval. It appears on your partner dashboard.
        </p>
        <p>
          <strong className="text-primary">Can I see another partner’s deals?</strong> No. You only see your own deals and commissions.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-primary">Get help</h2>
        <p>For application or deal questions, start here:</p>
        <div className="flex flex-wrap gap-3">
          <Link href="/apply" className="inline-flex items-center rounded-xl bg-secondary-container text-on-secondary text-xs font-bold px-4 py-2.5 hover:bg-secondary">
            Submit an application
          </Link>
          <Link href="/login" className="inline-flex items-center rounded-xl border border-outline-variant bg-white text-primary text-xs font-bold px-4 py-2.5 hover:bg-surface-container-low">
            Partner login
          </Link>
        </div>
      </section>
    </LegalLayout>
  );
}
