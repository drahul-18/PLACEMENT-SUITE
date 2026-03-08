import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Briefcase,
  Target,
  FileText,
  Menu,
  X,
  User,
} from 'lucide-react';
import { useState } from 'react';
import { ToastContainer } from '../Toast';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/jobs', label: 'Job Tracker', icon: Briefcase },
  { to: '/readiness', label: 'Readiness', icon: Target },
  { to: '/resume', label: 'Resume Builder', icon: FileText },
  { to: '/readiness/dashboard/profile', label: 'Profile', icon: User },
];

export function AppLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-slate-50/80">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-white border-r border-slate-200/80 shadow-sm">
        <div className="flex items-center h-16 px-6 border-b border-slate-200/80">
          <Link to="/dashboard" className="flex items-center gap-2">
            <span className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Placement Suite
            </span>
          </Link>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navItems.map(({ to, label, icon: Icon }) => {
            const isActive =
              location.pathname === to || location.pathname.startsWith(to + '/');
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/20 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white transform transition-transform duration-200 lg:hidden ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-200">
          <span className="font-bold text-indigo-600">Placement Suite</span>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="px-4 py-6 space-y-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100"
            >
              <Icon className="w-5 h-5" />
              {label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 lg:pl-64">
        {/* Mobile header */}
        <header className="lg:hidden sticky top-0 z-30 flex items-center h-14 px-4 bg-white/95 backdrop-blur border-b border-slate-200/80">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-slate-100"
          >
            <Menu className="w-6 h-6 text-slate-600" />
          </button>
          <Link to="/dashboard" className="ml-4 font-semibold text-indigo-600">
            Placement Suite
          </Link>
        </header>

        <main className="min-h-[calc(100vh-3.5rem)] lg:min-h-screen">
          <Outlet />
        </main>
      </div>

      <ToastContainer />
    </div>
  );
}
