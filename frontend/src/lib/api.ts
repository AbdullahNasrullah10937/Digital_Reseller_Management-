/**
 * Frontend API Service Client
 * Centralizes all calls to the FastAPI backend.
 * Base URL is set via NEXT_PUBLIC_API_URL env var.
 */
import { getAccessToken } from '@/lib/supabase/client';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
  token?: string
): Promise<T> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers ?? {}),
  };

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(errorBody?.detail ?? `API error ${res.status}`);
  }

  return res.json() as Promise<T>;
}

// ── Partner Applications ─────────────────────────────────────────────────────

export async function submitPartnerApplication(payload: {
  full_name: string;
  email: string;
  phone: string;
  company_name: string;
  country: string;
  city: string;
  industry_focus: string;
  website?: string;
  preferred_tier?: string;
}) {
  return apiFetch('/api/v1/applications', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

// ── Products ─────────────────────────────────────────────────────────────────

export async function fetchProducts(token: string) {
  return apiFetch<{
    id: string;
    name: string;
    category: string;
    retail_price_usd: number;
    retail_price_pkr: number;
    is_confirmed: boolean;
    price_status: string;
  }[]>('/api/v1/products', {}, token);
}

// ── Dashboard Summary ─────────────────────────────────────────────────────────

export async function fetchPartnerDashboard(token: string) {
  return apiFetch<{
    total_revenue: number;
    pending_commission: number;
    paid_commission: number;
    active_deals: number;
    tier: string;
    commission_rate: number;
    referral_code: string;
    recent_deals: object[];
  }>('/api/v1/partners/dashboard', {}, token);
}

// ── Deals ─────────────────────────────────────────────────────────────────────

export async function fetchDeals(token: string) {
  return apiFetch('/api/v1/deals', {}, token);
}

export async function submitDeal(token: string, payload: {
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  industry: string;
  country: string;
  product_id: string;
  estimated_value: number;
  currency: string;
  expected_close_date: string;
  notes?: string;
}) {
  return apiFetch('/api/v1/deals', {
    method: 'POST',
    body: JSON.stringify(payload),
  }, token);
}

// ── Commissions & Payouts ─────────────────────────────────────────────────────

export async function fetchCommissions(token: string) {
  return apiFetch('/api/v1/commissions', {}, token);
}

export async function requestPayout(token: string, payload: { currency: string }) {
  return apiFetch('/api/v1/commissions/payout-request', {
    method: 'POST',
    body: JSON.stringify(payload),
  }, token);
}

// ── Admin: Applications ───────────────────────────────────────────────────────

export async function fetchAdminApplications(token: string) {
  return apiFetch('/api/v1/applications', {}, token);
}

export async function approveApplication(token: string, appId: string, payload: {
  assigned_tier: string;
  assigned_rate: number;
}) {
  return apiFetch(`/api/v1/applications/${appId}/approve`, {
    method: 'POST',
    body: JSON.stringify(payload),
  }, token);
}

export async function rejectApplication(token: string, appId: string, reason: string) {
  return apiFetch(`/api/v1/applications/${appId}/reject`, {
    method: 'POST',
    body: JSON.stringify({ rejection_reason: reason }),
  }, token);
}

// ── Admin: Deals ──────────────────────────────────────────────────────────────

export async function fetchAdminDeals(token: string) {
  return apiFetch('/api/v1/admin/deals', {}, token);
}

export async function approveDeal(token: string, dealId: string, protectionDays: number) {
  return apiFetch(`/api/v1/admin/deals/${dealId}/approve`, {
    method: 'POST',
    body: JSON.stringify({ protection_days: protectionDays }),
  }, token);
}

export async function rejectDeal(token: string, dealId: string, rejectionReason: string) {
  return apiFetch(`/api/v1/admin/deals/${dealId}/reject`, {
    method: 'POST',
    body: JSON.stringify({ rejection_reason: rejectionReason }),
  }, token);
}

export async function markDealWon(token: string, dealId: string) {
  return apiFetch(`/api/v1/admin/deals/${dealId}/mark-won`, {
    method: 'POST',
  }, token);
}

export async function markDealLost(token: string, dealId: string) {
  return apiFetch(`/api/v1/admin/deals/${dealId}/mark-lost`, {
    method: 'POST',
  }, token);
}

// ── Admin: Commissions / Payouts ──────────────────────────────────────────────

export async function fetchAdminCommissions(token: string) {
  return apiFetch('/api/v1/admin/commissions', {}, token);
}

export async function approveCommission(token: string, commId: string) {
  return apiFetch(`/api/v1/admin/commissions/${commId}/approve`, {
    method: 'POST',
  }, token);
}

export async function markPayoutPaid(token: string, payoutId: string, transactionRef: string) {
  return apiFetch(`/api/v1/admin/payouts/${payoutId}/mark-paid`, {
    method: 'POST',
    body: JSON.stringify({ transaction_reference: transactionRef }),
  }, token);
}
