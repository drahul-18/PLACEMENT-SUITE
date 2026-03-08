import { NavLink } from 'react-router-dom';

export function AppNav() {
  return (
    <nav className="app-nav">
      <NavLink to="/resume" className="app-nav-brand">
        AI Resume Builder
      </NavLink>
      <div className="app-nav-links">
        <NavLink to="/resume/builder" className={({ isActive }) => (isActive ? 'active' : '')}>
          Builder
        </NavLink>
        <NavLink to="/resume/preview" className={({ isActive }) => (isActive ? 'active' : '')}>
          Preview
        </NavLink>
        <NavLink to="/resume/proof" className={({ isActive }) => (isActive ? 'active' : '')}>
          Proof
        </NavLink>
      </div>
    </nav>
  );
}
