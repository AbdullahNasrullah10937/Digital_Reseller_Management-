import type { Metadata } from 'next';
import LegalLayout from '@/components/legal-layout';

export const metadata: Metadata = {
  title: 'Terms of Service | Digitalsofts Partner Portal',
};

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" updated="August 20, 2026">
      <p>
        These terms govern use of the Digitalsofts Partner Portal. By submitting an application or logging in, you agree
        to them. Digitalsofts may update these terms; the date above shows the latest version.
      </p>

      <section className="space-y-2">
        <h2 className="text-base font-bold text-primary">1. The program</h2>
        <p>
          The Portal lets approved partners view the product catalog, register customer deals, track commissions, and
          request bank payouts. Participation is by application. HR reviews every application and deal. Approval is not
          guaranteed.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-bold text-primary">2. Tiers and commission</h2>
        <p>
          Partners are placed in one of four tiers (Affiliate, Referral Partner, Reseller, Certified Reseller). Commission
          is a percentage within that tier’s published range, assigned by HR. Performance bonuses, if any, are set by
          Digitalsofts and may change. Draft catalog prices are estimates until Digitalsofts confirms launch pricing —
          they must not be quoted to customers as final.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-bold text-primary">3. Deal registration</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>You must submit accurate customer and deal information.</li>
          <li>A deal stays Pending until HR approves or rejects it.</li>
          <li>Once approved, the deal is protected for the period shown in the Portal (typically 60–90 days).</li>
          <li>If the same customer is already registered, the deal may be flagged for HR review.</li>
          <li>Commission is created when HR marks a deal as Won, using deal value × your assigned rate.</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-bold text-primary">4. Payouts</h2>
        <p>
          Payouts are by bank transfer. Commission accumulates across your approved deals. A payout can be requested
          only when unpaid approved commission reaches PKR 5,000 (Pakistan) or USD 50 (international). Amounts below
          that threshold do not expire. Digitalsofts processes payouts manually and marks them Paid in the Portal after
          the transfer is sent.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-bold text-primary">5. Your responsibilities</h2>
        <p>
          Keep login credentials confidential. Do not register deals you do not have a genuine relationship with. Do not
          access another partner’s data. Digitalsofts may suspend or terminate access for misuse, inaccurate submissions,
          or breach of these terms.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-bold text-primary">6. Contact</h2>
        <p>
          Questions about these terms: use the{' '}
          <a href="/support" className="font-semibold text-primary hover:text-secondary-container">Support</a> page
          or visit{' '}
          <a href="https://digitalsofts.com" className="font-semibold text-primary hover:text-secondary-container" target="_blank" rel="noopener noreferrer">
            digitalsofts.com
          </a>.
        </p>
      </section>
    </LegalLayout>
  );
}
