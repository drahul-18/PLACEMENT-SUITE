import { NavLink } from 'react-router-dom';

export function AppNav() {
  return (
    <nav className="app-nav">
      <NavLink to="/" className="app-nav-brand">
        AI Resume Builder
      </NavLink>
      <div className="app-nav-links">
        <NavLink to="/builder" className={({ isActive }) => (isActive ? 'active' : '')}>
          Builder
        </NavLink>
        <NavLink to="/preview" className={({ isActive }) => (isActive ? 'active' : '')}>
          Preview
        </NavLink>
        <NavLink to="/proof" className={({ isActive }) => (isActive ? 'active' : '')}>
          Proof
        </NavLink>
      </div>
    </nav>
  );
}
