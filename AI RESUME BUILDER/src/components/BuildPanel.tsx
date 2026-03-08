import { useState } from 'react';

interface BuildPanelProps {
  stepNumber: number;
  lovablePrompt?: string;
  onArtifactUpload: (value: string) => void;
}

type FeedbackType = 'none' | 'worked' | 'error' | 'screenshot';

export function BuildPanel({ stepNumber, lovablePrompt = '', onArtifactUpload }: BuildPanelProps) {
  const [textareaValue, setTextareaValue] = useState(lovablePrompt);
  const [feedback, setFeedback] = useState<FeedbackType>('none');

  const handleCopy = () => {
    navigator.clipboard.writeText(textareaValue);
  };

  const handleBuildInLovable = () => {
    window.open('https://lovable.dev', '_blank');
  };

  const handleFeedback = (type: FeedbackType) => {
    setFeedback(type);
    if (type === 'worked') {
      onArtifactUpload(`step-${stepNumber}-complete`);
    } else if (type === 'error') {
      onArtifactUpload(`step-${stepNumber}-error`);
    } else if (type === 'screenshot') {
      onArtifactUpload(`step-${stepNumber}-screenshot`);
    }
  };

  return (
    <div className="build-panel">
      <label>Copy This Into Lovable</label>
      <textarea
        value={textareaValue}
        onChange={(e) => setTextareaValue(e.target.value)}
        placeholder="Paste your prompt or instructions here..."
        rows={8}
      />
      <div className="build-panel-actions">
        <button type="button" onClick={handleCopy}>
          Copy
        </button>
        <button type="button" onClick={handleBuildInLovable} className="primary">
          Build in Lovable
        </button>
      </div>
      <div className="build-panel-feedback">
        <span className="feedback-label">Feedback:</span>
        <button
          type="button"
          className={feedback === 'worked' ? 'active' : ''}
          onClick={() => handleFeedback('worked')}
        >
          It Worked
        </button>
        <button
          type="button"
          className={feedback === 'error' ? 'active' : ''}
          onClick={() => handleFeedback('error')}
        >
          Error
        </button>
        <button
          type="button"
          className={feedback === 'screenshot' ? 'active' : ''}
          onClick={() => handleFeedback('screenshot')}
        >
          Add Screenshot
        </button>
      </div>
    </div>
  );
}
