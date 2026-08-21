import type { Metadata } from 'next';
import LegalLayout from '@/components/legal-layout';

export const metadata: Metadata = {
  title: 'Privacy Policy | Digitalsofts Partner Portal',
};

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" updated="August 20, 2026">
      <p>
        This policy explains how Digitalsofts collects and uses information when you use the Digitalsofts Partner Portal
        (the “Portal”). It applies to partner applicants, approved partners, and Digitalsofts staff who administer the program.
      </p>

      <section className="space-y-2">
        <h2 className="text-base font-bold text-primary">1. Information we collect</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Application details: name, company, email, phone, country, city, industry, website, and preferred partner tier.</li>
          <li>Account details after approval: login identity, referral code, assigned tier, and commission rate.</li>
          <li>Deal data you submit: customer name, email, phone, industry, country, product, estimated value, and notes.</li>
          <li>Payout details you provide: bank name, account title, IBAN, and SWIFT (stored encrypted).</li>
          <li>Usage data needed to operate the Portal, such as session and audit logs of approvals and payouts.</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-bold text-primary">2. How we use it</h2>
        <p>We use this information to review partner applications, protect registered deals, calculate commissions, process bank payouts, prevent duplicate deal claims, and keep an audit trail for HR and Finance.</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-bold text-primary">3. Who can see your data</h2>
        <p>
          A partner can only see their own application, deals, commissions, and payouts. Digitalsofts HR (admin) can see
          partner contact and commission data across the program in order to approve applications, deals, and payouts.
          We do not sell partner or customer lists.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-bold text-primary">4. Sharing</h2>
        <p>
          We may share data with payment/bank processors to complete a payout you requested, and with infrastructure
          providers that host the Portal. We may also disclose information if required by law.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-bold text-primary">5. Retention</h2>
        <p>
          Application, deal, commission, and payout records are kept for the life of the partner program relationship
          and as needed for accounting and dispute resolution. Unpaid commission below the minimum payout threshold
          is retained until it is paid.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-bold text-primary">6. Contact</h2>
        <p>
          For privacy requests, contact Digitalsofts through{' '}
          <a href="https://digitalsofts.com" className="font-semibold text-primary hover:text-secondary-container" target="_blank" rel="noopener noreferrer">
            digitalsofts.com
          </a>{' '}
          or the Support page on this Portal.
        </p>
      </section>
    </LegalLayout>
  );
}
