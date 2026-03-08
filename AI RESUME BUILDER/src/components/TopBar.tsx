interface TopBarProps {
  stepLabel: string;
  status: 'pending' | 'in-progress' | 'complete';
}

export function TopBar({ stepLabel, status }: TopBarProps) {
  const statusColors: Record<string, string> = {
    pending: 'var(--status-pending)',
    'in-progress': 'var(--status-in-progress)',
    complete: 'var(--status-complete)',
  };

  return (
    <header className="top-bar">
      <div className="top-bar-left">AI Resume Builder</div>
      <div className="top-bar-center">{stepLabel}</div>
      <div className="top-bar-right">
        <span className="status-badge" style={{ backgroundColor: statusColors[status] }}>
          {status.replace('-', ' ')}
        </span>
      </div>
    </header>
  );
}
