/**
 * Secondary Panel — KodNest Premium Build System
 * 30% width: step explanation, copyable prompt, action buttons
 */

import { useState } from 'react';

export function SecondaryPanel({
  stepExplanation,
  promptText,
  onCopy,
  onBuildInLovable,
  onItWorked,
  onError,
  onAddScreenshot,
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (promptText && navigator.clipboard) {
      navigator.clipboard.writeText(promptText);
      setCopied(true);
      onCopy?.();
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <aside className="secondary-panel">
      {stepExplanation && (
        <div className="secondary-panel__section">
          <div className="secondary-panel__label">Step</div>
          <p style={{ margin: 0, fontSize: 'var(--text-body)', lineHeight: 'var(--line-height-body)' }}>
            {stepExplanation}
          </p>
        </div>
      )}

      {promptText && (
        <div className="secondary-panel__section">
          <div className="secondary-panel__label">Prompt</div>
          <div className="prompt-box">
            <pre>{promptText}</pre>
          </div>
          <div className="secondary-panel__actions">
            <button className="btn btn-secondary btn-sm" onClick={handleCopy}>
              {copied ? 'Copied' : 'Copy'}
            </button>
            {onBuildInLovable && (
              <button className="btn btn-primary btn-sm" onClick={onBuildInLovable}>
                Build in Lovable
              </button>
            )}
            {onItWorked && (
              <button className="btn btn-secondary btn-sm" onClick={onItWorked}>
                It Worked
              </button>
            )}
            {onError && (
              <button className="btn btn-secondary btn-sm" onClick={onError}>
                Error
              </button>
            )}
            {onAddScreenshot && (
              <button className="btn btn-secondary btn-sm" onClick={onAddScreenshot}>
                Add Screenshot
              </button>
            )}
          </div>
        </div>
      )}
    </aside>
  );
}
