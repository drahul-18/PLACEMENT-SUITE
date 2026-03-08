/**
 * Empty State — KodNest Premium Build System
 * Provide next action, never feel dead
 */

export function EmptyState({ message, actionLabel, onAction }) {
  return (
    <div className="empty-state">
      <p>{message}</p>
      {actionLabel && onAction && (
        <button className="btn btn-primary" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}
