import { useJobs } from '../context/JobsContext';
import { Briefcase, XCircle, Award } from 'lucide-react';

function formatDate(isoStr: string) {
  const d = new Date(isoStr);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  return d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' });
}

const statusConfig = {
  Applied: { icon: Briefcase, color: 'text-sky-600', bg: 'bg-sky-50', border: 'border-sky-200' },
  Rejected: { icon: XCircle, color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-200' },
  Selected: { icon: Award, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
};

export function Timeline() {
  const { statusUpdates } = useJobs();

  if (statusUpdates.length === 0) {
    return (
      <div className="p-6 lg:p-10 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Application Timeline</h1>
        <p className="text-slate-600 mb-8">Track your job application status over time.</p>
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <Briefcase className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-700 mb-2">No applications yet</h3>
          <p className="text-slate-500 text-sm max-w-sm mx-auto">
            When you update job status to Applied, Rejected, or Selected on the Dashboard or Saved page, they'll appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-10 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-900 mb-2">Application Timeline</h1>
      <p className="text-slate-600 mb-8">Your job application history</p>

      <div className="space-y-0">
        {statusUpdates.map((update, i) => {
          const config = statusConfig[update.status as keyof typeof statusConfig] ?? statusConfig.Applied;
          const Icon = config.icon;
          return (
            <div key={`${update.jobId}-${update.dateChanged}-${i}`} className="relative flex gap-4">
              {i < statusUpdates.length - 1 && (
                <div className="absolute left-5 top-12 bottom-0 w-0.5 bg-slate-200" />
              )}
              <div className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full ${config.bg} ${config.color} shrink-0`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 pb-8">
                <div className={`p-4 rounded-xl border ${config.border} ${config.bg}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-slate-900">{update.title}</h3>
                      <p className="text-sm text-slate-600">{update.company}</p>
                    </div>
                    <span className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.color}`}>
                      {update.status}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-slate-500">{formatDate(update.dateChanged)}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
