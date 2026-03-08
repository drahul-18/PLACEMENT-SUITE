/**
 * Context Header — KodNest Premium Build System
 * Large serif headline, 1-line subtext, clear purpose
 */

export function ContextHeader({ headline, subtext }) {
  return (
    <div className="context-header">
      <h1>{headline}</h1>
      {subtext && <p className="context-header__subtext">{subtext}</p>}
    </div>
  );
}
