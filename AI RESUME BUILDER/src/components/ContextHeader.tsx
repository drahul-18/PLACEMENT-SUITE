interface ContextHeaderProps {
  title: string;
  subtitle?: string;
}

export function ContextHeader({ title, subtitle }: ContextHeaderProps) {
  return (
    <div className="context-header">
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}
