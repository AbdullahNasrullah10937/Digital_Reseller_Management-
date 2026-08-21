import Link from 'next/link';
import { Hexagon, ArrowLeft } from 'lucide-react';

export default function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-surface-container-low font-sans">
      <header className="bg-primary text-white">
        <div className="max-w-3xl mx-auto px-4 md:px-8 py-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-on-primary-container hover:text-white mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
          <Link href="/" className="flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 rounded-xl bg-secondary-container flex items-center justify-center">
              <Hexagon className="w-5 h-5 fill-white text-primary" />
            </div>
            <span className="font-bold">Digitalsofts Partner Portal</span>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <p className="text-sm text-on-primary-container mt-2">Last updated {updated}</p>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 md:px-8 py-10">
        <article className="bg-white rounded-2xl border border-outline-variant shadow-sm p-6 md:p-10 text-sm text-on-surface-variant leading-relaxed space-y-6">
          {children}
        </article>
        <p className="text-center text-xs text-on-surface-variant mt-8 pb-10">
          <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
          {' · '}
          <Link href="/terms" className="hover:text-primary">Terms of Service</Link>
          {' · '}
          <Link href="/support" className="hover:text-primary">Support</Link>
        </p>
      </main>
    </div>
  );
}
