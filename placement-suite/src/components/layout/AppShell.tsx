import { Link, Outlet, useLocation } from 'react-router-dom';

export function AppShell() {
  const location = useLocation();

  const navLinks = [
    { to: '/jobs', label: 'Jobs' },
    { to: '/readiness', label: 'Readiness' },
    { to: '/resume', label: 'Resume' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50">
      <header className="border-b border-slate-200/80 bg-white/95 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <Link
            to="/"
            className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent hover:opacity-90 transition-opacity"
          >
            Placement Suite
          </Link>
          <nav className="flex items-center gap-8">
            {navLinks.map(({ to, label }) => {
              const isActive =
                location.pathname === to || location.pathname.startsWith(to + '/');
              return (
                <Link
                  key={to}
                  to={to}
                  className={`text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-indigo-600'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="py-5 text-center text-slate-500 text-sm border-t border-slate-200/60 bg-white/50">
        © {new Date().getFullYear()} Placement Suite. All rights reserved.
      </footer>
    </div>
  );
}
