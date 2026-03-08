import { Link } from 'react-router-dom';
import { Briefcase, Code2, FileText, ArrowRight } from 'lucide-react';

export function LandingPage() {
  const features = [
    {
      to: '/jobs',
      title: 'Job Notification Tracker',
      description: 'Track job postings, filter by preferences, save favorites, and get personalized daily digests.',
      icon: Briefcase,
      iconBg: 'bg-amber-500/10',
      iconColor: 'text-amber-600',
    },
    {
      to: '/readiness',
      title: 'Placement Readiness',
      description: 'Practice, assess, and prepare for your dream job with mock interviews and progress tracking.',
      icon: Code2,
      iconBg: 'bg-indigo-500/10',
      iconColor: 'text-indigo-600',
    },
    {
      to: '/resume',
      title: 'AI Resume Builder',
      description: 'Build a professional resume with premium structure, ATS optimization, and clarity.',
      icon: FileText,
      iconBg: 'bg-rose-500/10',
      iconColor: 'text-rose-600',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <header className="py-6 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            Placement Suite
          </span>
          <nav className="flex gap-6">
            <Link to="/dashboard" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
              Dashboard
            </Link>
            <Link to="/jobs" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
              Jobs
            </Link>
            <Link to="/readiness" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
              Readiness
            </Link>
            <Link to="/resume" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
              Resume
            </Link>
          </nav>
        </div>
      </header>

      <section className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
          Your All-in-One
          <span className="block mt-2 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
            Placement Platform
          </span>
        </h1>
        <p className="text-xl text-slate-600 mb-16 max-w-2xl leading-relaxed">
          Track jobs, build readiness, and create resumes that get noticed. Everything you need to land your dream role.
        </p>

        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          {features.map(({ to, title, description, icon: Icon, iconBg, iconColor }) => (
            <Link
              key={to}
              to={to}
              className="group block bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/80 p-8 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-indigo-200/30 hover:border-indigo-200 transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-14 h-14 rounded-xl ${iconBg} ${iconColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">{title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">{description}</p>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 group-hover:gap-3 transition-all">
                Get Started
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <footer className="py-6 text-center text-slate-500 text-sm border-t border-slate-200/60">
        © {new Date().getFullYear()} Placement Suite. All rights reserved.
      </footer>
    </div>
  );
}
