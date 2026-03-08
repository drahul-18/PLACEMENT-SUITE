import { NavLink, Outlet } from 'react-router-dom';

const navItems = [
  { to: '/jobs/dashboard', label: 'Browse' },
  { to: '/jobs/saved', label: 'Saved' },
  { to: '/jobs/timeline', label: 'Timeline' },
  { to: '/jobs/digest', label: 'Digest' },
  { to: '/jobs/settings', label: 'Settings' },
];

export function JobsLayout() {
  return (
    <div className="kn-app--shell" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--kn-color-bg)' }}>
      <header className="kn-nav" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 'var(--kn-topbar-height)', padding: '0 var(--kn-space-md)', borderBottom: 'var(--kn-card-border)', backgroundColor: 'var(--kn-color-bg)', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
        <NavLink to="/jobs" className="kn-nav__brand">
          Job Notification Tracker
        </NavLink>
        <nav className="kn-nav__links" style={{ display: 'flex', gap: 'var(--kn-space-lg)' }}>
          {navItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `kn-nav__link ${isActive ? 'kn-nav__link--active' : ''}`}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="kn-main--page" style={{ flex: 1, padding: 'var(--kn-space-xl) var(--kn-space-md)' }}>
        <Outlet />
      </main>
    </div>
  );
}
