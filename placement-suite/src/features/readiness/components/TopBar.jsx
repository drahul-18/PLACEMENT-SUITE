/**
 * Top Bar — KodNest Premium Build System
 * Left: Project name | Center: Progress | Right: Status badge
 */

export function TopBar({ projectName = 'Project Name', step = 1, totalSteps = 4, status = 'In Progress' }) {
  const statusClass = {
    'Not Started': 'badge-neutral',
    'In Progress': 'badge-progress',
    'Shipped': 'badge-success',
  }[status] || 'badge-neutral';

  return (
    <header className="top-bar">
      <div className="top-bar__left">{projectName}</div>
      <div className="top-bar__center">
        Step {step} / {totalSteps}
      </div>
      <div className="top-bar__right">
        <span className={`badge ${statusClass}`}>{status}</span>
      </div>
    </header>
  );
}
