import { Link } from 'react-router-dom';
import {
  Briefcase,
  Target,
  FileText,
  TrendingUp,
  ArrowRight,
  Bell,
  CheckCircle2,
} from 'lucide-react';
import { getItem } from '../lib/storage';

function getUserName(): string {
  const name = getItem<string>('app', 'userName');
  return name || 'there';
}

function getDashboardStats() {
  const savedIds = getItem<number[]>('jobs', 'savedIds') ?? [];
  const statusUpdates = getItem<Array<{ status: string }>>('jobs', 'statusUpdates') ?? [];
  const preferences = getItem<{ roleKeywords?: string; skills?: string }>('jobs', 'preferences') ?? {};
  const savedCount = savedIds.length;
  const appliedCount = statusUpdates.filter(
    (u) => u.status === 'Applied' || u.status === 'Selected'
  ).length;
  return { savedCount, appliedCount, preferences };
}

export function DashboardPage() {
  const userName = getUserName();
  const { savedCount, appliedCount, preferences } = getDashboardStats();

  // Mock scores - in real app these would come from actual data
  const readinessScore = 72;
  const resumeScore = preferences.roleKeywords || preferences.skills ? 68 : 45;

  const cards = [
    {
      title: 'New Job Alerts',
      value: '12',
      subtext: 'Matching your preferences',
      icon: Bell,
      to: '/jobs/dashboard',
      color: 'from-amber-500 to-orange-500',
      bg: 'bg-amber-50',
      iconColor: 'text-amber-600',
    },
    {
      title: 'Applications',
      value: `${appliedCount}`,
      subtext: `${savedCount} saved jobs`,
      icon: CheckCircle2,
      to: '/jobs/saved',
      color: 'from-emerald-500 to-teal-500',
      bg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
    },
    {
      title: 'Readiness Score',
      value: `${readinessScore}%`,
      subtext: 'Placement readiness',
      icon: Target,
      to: '/readiness/dashboard',
      color: 'from-indigo-500 to-violet-500',
      bg: 'bg-indigo-50',
      iconColor: 'text-indigo-600',
    },
    {
      title: 'Resume Strength',
      value: `${resumeScore}%`,
      subtext: 'ATS optimization',
      icon: TrendingUp,
      to: '/resume',
      color: 'from-rose-500 to-pink-500',
      bg: 'bg-rose-50',
      iconColor: 'text-rose-600',
    },
  ];

  const quickActions = [
    { to: '/jobs/dashboard', label: 'Browse Jobs', icon: Briefcase },
    { to: '/readiness/dashboard', label: 'Practice', icon: Target },
    { to: '/resume/builder', label: 'Edit Resume', icon: FileText },
  ];

  return (
    <div className="p-6 lg:p-10 max-w-6xl mx-auto">
      {/* Greeting */}
      <div className="mb-10">
        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
          Hello, {userName}!
        </h1>
        <p className="mt-1 text-slate-600">
          Here's your placement journey at a glance.
        </p>
      </div>

      {/* Overview cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {cards.map(({ title, value, subtext, icon: Icon, to, bg, iconColor }) => (
          <Link
            key={title}
            to={to}
            className="group block p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-slate-300/80 transition-all duration-200"
          >
            <div className={`w-12 h-12 rounded-xl ${bg} ${iconColor} flex items-center justify-center mb-4`}>
              <Icon className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-slate-500">{title}</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
            <p className="mt-0.5 text-sm text-slate-500">{subtext}</p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-indigo-600 group-hover:gap-2 transition-all">
              View
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-4">
          {quickActions.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className="flex items-center gap-3 px-6 py-4 bg-white rounded-xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all duration-200"
            >
              <Icon className="w-5 h-5 text-indigo-600" />
              <span className="font-medium text-slate-700">{label}</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
