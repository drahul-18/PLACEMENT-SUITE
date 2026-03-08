/**
 * Error State — KodNest Premium Build System
 * Explain what went wrong + how to fix, never blame user
 */

export function ErrorState({ message, hint }) {
  return (
    <div className="error-state">
      <p>{message}</p>
      {hint && <p className="error-hint">{hint}</p>}
    </div>
  );
}
