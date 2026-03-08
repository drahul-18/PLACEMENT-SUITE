import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useArtifacts } from '../../context/ArtifactContext';

const STEP_NAMES = [
  '01-problem',
  '02-market',
  '03-architecture',
  '04-hld',
  '05-lld',
  '06-build',
  '07-test',
  '08-ship',
];

export function Proof() {
  const { hasArtifact } = useArtifacts();
  const [lovableLink, setLovableLink] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [deployLink, setDeployLink] = useState('');

  const buildSubmission = () => {
    const lines = [
      '=== AI Resume Builder — Build Track — Final Submission ===',
      '',
      'Lovable Link: ' + lovableLink,
      'GitHub Link: ' + githubLink,
      'Deploy Link: ' + deployLink,
      '',
      'Step Status:',
      ...STEP_NAMES.map((name, i) => {
        const stepNum = i + 1;
        const status = hasArtifact(stepNum) ? '✓ Complete' : '○ Pending';
        return `  Step ${stepNum} (${name}): ${status}`;
      }),
    ];
    return lines.join('\n');
  };

  const handleCopyFinal = () => {
    navigator.clipboard.writeText(buildSubmission());
  };

  return (
    <div className="proof-page">
      <header className="proof-top-bar">
        <Link to="/rb/01-problem">AI Resume Builder</Link>
        <span>Project 3 — Proof & Final Submission</span>
      </header>
      <header className="proof-page-header">
        <h1>AI Resume Builder — Project 3 Proof</h1>
        <p>Final submission and proof of completion</p>
      </header>

      <section className="proof-step-status">
        <h2>8 Step Status</h2>
        <ul>
          {STEP_NAMES.map((name, i) => {
            const stepNum = i + 1;
            const done = hasArtifact(stepNum);
            return (
              <li key={name} className={done ? 'complete' : 'pending'}>
                Step {stepNum}: {name} — {done ? '✓ Complete' : '○ Pending'}
              </li>
            );
          })}
        </ul>
      </section>

      <section className="proof-links">
        <h2>Submission Links</h2>
        <div className="proof-input-group">
          <label>Lovable Link</label>
          <input
            type="url"
            value={lovableLink}
            onChange={(e) => setLovableLink(e.target.value)}
            placeholder="https://..."
          />
        </div>
        <div className="proof-input-group">
          <label>GitHub Link</label>
          <input
            type="url"
            value={githubLink}
            onChange={(e) => setGithubLink(e.target.value)}
            placeholder="https://github.com/..."
          />
        </div>
        <div className="proof-input-group">
          <label>Deploy Link</label>
          <input
            type="url"
            value={deployLink}
            onChange={(e) => setDeployLink(e.target.value)}
            placeholder="https://..."
          />
        </div>
      </section>

      <section className="proof-actions">
        <button type="button" onClick={handleCopyFinal} className="copy-final-btn">
          Copy Final Submission
        </button>
      </section>
    </div>
  );
}
