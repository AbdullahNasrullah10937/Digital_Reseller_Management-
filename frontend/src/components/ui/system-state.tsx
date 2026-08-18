'use client';

import Link from 'next/link';
import { 
  AlertTriangle, 
  ShieldAlert, 
  Inbox, 
  RefreshCw, 
  ArrowLeft, 
  Lock, 
  HelpCircle 
} from 'lucide-react';

interface SystemStateProps {
  type: '404' | '403' | 'EMPTY' | 'THRESHOLD_WARNING' | 'LOADING';
  title?: string;
  message?: string;
  actionHref?: string;
  actionText?: string;
}

export default function SystemState({
  type,
  title,
  message,
  actionHref = '/dashboard',
  actionText = 'Return to Dashboard',
}: SystemStateProps) {
  if (type === '404') {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
        <div className="w-16 h-16 rounded-full bg-primary-container/10 text-primary flex items-center justify-center">
          <HelpCircle className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold text-primary">{title || '404 — Page Not Found'}</h1>
        <p className="text-xs text-on-surface-variant max-w-md">
          {message || 'The requested portal page does not exist or has been relocated.'}
        </p>
        <Link href={actionHref} className="bg-primary text-white text-xs font-bold px-6 py-3 rounded-xl hover:bg-primary-container transition-colors">
          {actionText}
        </Link>
      </div>
    );
  }

  if (type === '403') {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
        <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
          <Lock className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold text-primary">{title || '403 — Access Denied'}</h1>
        <p className="text-xs text-on-surface-variant max-w-md">
          {message || 'You do not have administrative permissions to view this HR/Finance section.'}
        </p>
        <Link href="/dashboard" className="bg-primary text-white text-xs font-bold px-6 py-3 rounded-xl hover:bg-primary-container transition-colors">
          Back to Partner Dashboard
        </Link>
      </div>
    );
  }

  if (type === 'EMPTY') {
    return (
      <div className="py-12 flex flex-col items-center justify-center text-center p-6 space-y-3 bg-surface-container-low border border-outline-variant/60 rounded-xl">
        <Inbox className="w-10 h-10 text-outline" />
        <div className="text-sm font-bold text-primary">{title || 'No Records Found'}</div>
        <p className="text-xs text-on-surface-variant max-w-sm">{message || 'There are no active records in this view currently.'}</p>
        {actionHref && (
          <Link href={actionHref} className="bg-secondary-container text-on-secondary text-xs font-bold px-4 py-2 rounded-lg hover:bg-secondary transition-colors mt-2">
            {actionText}
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="py-12 text-center text-xs text-on-surface-variant flex items-center justify-center gap-2">
      <RefreshCw className="w-4 h-4 animate-spin text-secondary-container" />
      <span>Loading portal data...</span>
    </div>
  );
}
