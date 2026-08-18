'use client';

import { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  X, 
  Clock 
} from 'lucide-react';
import { getAccessToken } from '@/lib/supabase/client';
import { fetchAdminApplications, approveApplication, rejectApplication } from '@/lib/api';

type ApplicationItem = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  company_name: string;
  country: string;
  city: string;
  industry_focus: string;
  website: string | null;
  preferred_tier: string | null;
  status: string;
  rejection_reason: string | null;
  created_at: string;
};

export default function PartnerApplicationsPage() {
  const [applications, setApplications] = useState<ApplicationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedApp, setSelectedApp] = useState<ApplicationItem | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const [assignedTier, setAssignedTier] = useState('RESELLER');
  const [assignedRate, setAssignedRate] = useState('30.00');
  const [rejectionReason, setRejectionReason] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const loadData = async () => {
    const token = getAccessToken();
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const res = await fetchAdminApplications(token);
      setApplications(res as ApplicationItem[]);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load applications.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleApprove = async () => {
    if (!selectedApp) return;
    setSubmitting(true);
    const token = getAccessToken();
    if (!token) return;

    try {
      await approveApplication(token, selectedApp.id, {
        assigned_tier: assignedTier,
        assigned_rate: parseFloat(assignedRate),
      });
      setActionSuccess(`Application ${selectedApp.company_name} Approved! Assigned ${assignedTier} (${assignedRate}%).`);
      setTimeout(() => {
        setSelectedApp(null);
        setActionSuccess(null);
        loadData();
      }, 1500);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Approval failed.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReject = async () => {
    if (!selectedApp) return;
    setSubmitting(true);
    const token = getAccessToken();
    if (!token) return;

    try {
      await rejectApplication(token, selectedApp.id, rejectionReason || 'Qualifications did not meet minimum criteria.');
      setActionSuccess(`Application ${selectedApp.company_name} Rejected.`);
      setTimeout(() => {
        setSelectedApp(null);
        setActionSuccess(null);
        loadData();
      }, 1500);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Rejection failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-primary">Partner Applications Queue</h1>
        <p className="text-xs text-on-surface-variant">Review incoming partner sign-up applications, assign tier & commission rates, or reject with feedback.</p>
      </div>

      {actionSuccess && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-4 rounded-xl text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" /> {actionSuccess}
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-300 text-red-800 p-4 rounded-xl text-xs font-bold">
          {error}
        </div>
      )}

      {/* Applications Table */}
      <div className="bg-surface border border-outline-variant rounded-xl p-6 shadow-xs space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-container-low text-on-surface-variant uppercase font-semibold border-b border-outline-variant">
              <tr>
                <th className="p-3">Applicant & Company</th>
                <th className="p-3">Location</th>
                <th className="p-3">Industry Focus</th>
                <th className="p-3">Preferred Tier</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/60">
              {applications.length > 0 ? (
                applications.map((app) => (
                  <tr key={app.id} className="hover:bg-surface-container-low/60 transition-colors">
                    <td className="p-3">
                      <div className="font-semibold text-on-surface">{app.company_name}</div>
                      <div className="text-[10px] text-on-surface-variant">{app.full_name} ({app.email})</div>
                    </td>
                    <td className="p-3 text-on-surface-variant">{app.city}, {app.country}</td>
                    <td className="p-3 text-on-surface-variant font-medium">{app.industry_focus}</td>
                    <td className="p-3 font-bold text-secondary-container capitalize">{app.preferred_tier ?? 'Reseller'}</td>
                    <td className="p-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        app.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                        app.status === 'REJECTED' ? 'bg-red-100 text-red-800 border border-red-200' :
                        'bg-amber-100 text-amber-800 border border-amber-200'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => setSelectedApp(app)}
                        className="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-primary-container transition-colors cursor-pointer"
                      >
                        Review & Action
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-on-surface-variant">
                    {loading ? 'Loading applications queue...' : 'No applications pending review.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface rounded-2xl max-w-2xl w-full p-6 space-y-6 border border-outline-variant shadow-xl relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setSelectedApp(null)} className="absolute top-4 right-4 text-outline hover:text-primary">
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-secondary-container bg-secondary-container/10 px-2.5 py-0.5 rounded-full">
                Application Review
              </span>
              <h2 className="text-xl font-bold text-primary">{selectedApp.company_name}</h2>
              <p className="text-xs text-on-surface-variant">Submitted by {selectedApp.full_name} on {new Date(selectedApp.created_at).toLocaleDateString()}</p>
            </div>

            {/* Application Data Grid */}
            <div className="bg-surface-container-low border border-outline-variant p-4 rounded-xl grid grid-cols-2 gap-3 text-xs">
              <div><span className="text-on-surface-variant">Applicant:</span> <strong>{selectedApp.full_name}</strong></div>
              <div><span className="text-on-surface-variant">Email:</span> <strong>{selectedApp.email}</strong></div>
              <div><span className="text-on-surface-variant">Phone:</span> <strong>{selectedApp.phone}</strong></div>
              <div><span className="text-on-surface-variant">Location:</span> <strong>{selectedApp.city}, {selectedApp.country}</strong></div>
              <div><span className="text-on-surface-variant">Industry Focus:</span> <strong>{selectedApp.industry_focus}</strong></div>
              <div><span className="text-on-surface-variant">Website:</span> <strong>{selectedApp.website ?? 'N/A'}</strong></div>
            </div>

            {/* HR Decision Section */}
            <div className="space-y-4 border-t border-outline-variant pt-4 text-xs">
              <h3 className="font-bold text-primary">HR Approval & Tier Assignment</h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-primary block mb-1">Assign Partner Tier</label>
                  <select
                    value={assignedTier}
                    onChange={(e) => setAssignedTier(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-outline-variant bg-surface text-on-surface"
                  >
                    <option value="AFFILIATE">Affiliate (10–20%)</option>
                    <option value="REFERRAL_PARTNER">Referral Partner (15–25%)</option>
                    <option value="RESELLER">Reseller (25–40%)</option>
                    <option value="CERTIFIED_RESELLER">Certified Reseller (30–50%)</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-primary block mb-1">Commission Rate (%)</label>
                  <input
                    type="number"
                    value={assignedRate}
                    onChange={(e) => setAssignedRate(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-outline-variant bg-surface text-on-surface font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-primary block mb-1">Rejection Reason Note (Only if rejecting)</label>
                <textarea
                  rows={2}
                  placeholder="Reason for application rejection..."
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  className="w-full text-xs px-3.5 py-2 rounded-lg border border-outline-variant bg-surface text-on-surface"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleApprove}
                  disabled={submitting}
                  className="flex-1 bg-emerald-600 text-white font-bold text-xs py-3 rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-50"
                >
                  <CheckCircle2 className="w-4 h-4" /> Approve Partner Application
                </button>
                <button
                  onClick={handleReject}
                  disabled={submitting}
                  className="flex-1 bg-red-600 text-white font-bold text-xs py-3 rounded-xl hover:bg-red-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-50"
                >
                  <XCircle className="w-4 h-4" /> Reject Application
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
