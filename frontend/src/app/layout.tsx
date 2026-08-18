import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Digitalsofts Partner Portal | B2B Program',
  description: 'Official Partner Portal for Digitalsofts — Register deals, track tier commissions, and manage payouts.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <body className="min-h-screen bg-background font-sans antialiased text-on-background">
        {children}
      </body>
    </html>
  );
}
