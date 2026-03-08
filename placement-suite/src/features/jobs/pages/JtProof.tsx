import { useState } from 'react';
import { useJobs } from '../context/JobsContext';

function isValidUrl(str: string): boolean {
  if (!str || typeof str !== 'string') return false;
  try {
    const url = new URL(str.trim());
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

function getProofSteps(ctx: ReturnType<typeof useJobs>) {
  return [
    { id: 1, label: 'Design system created', done: true },
    { id: 2, label: 'Route skeleton', done: true },
    { id: 3, label: 'Landing and app skeleton', done: true },
    { id: 4, label: 'Job dataset and rendering', done: true },
    { id: 5, label: 'Preferences and match scoring', done: !!(ctx.preferences.roleKeywords || ctx.preferences.skills) },
    { id: 6, label: 'Digest engine', done: !!ctx.getTodayDigest() },
    { id: 7, label: 'Status tracking', done: Object.keys(ctx.statuses).length > 0 || ctx.statusUpdates.length > 0 },
    { id: 8, label: 'Test checklist', done: ctx.getAllTestsPassed() },
  ];
}

export function JtProof() {
  const ctx = useJobs();
  const [githubUrl, setGithubUrl] = useState(ctx.proofArtifacts.githubUrl);
  const [deployedUrl, setDeployedUrl] = useState(ctx.proofArtifacts.deployedUrl);
  const [githubError, setGithubError] = useState('');
  const [deployedError, setDeployedError] = useState('');

  const hasGithub = isValidUrl(githubUrl);
  const hasDeployed = isValidUrl(deployedUrl);
  const allTestsPassed = ctx.getAllTestsPassed();
  const status = allTestsPassed && hasGithub && hasDeployed ? 'shipped' : hasGithub || hasDeployed || allTestsPassed ? 'in-progress' : 'not-started';
  const statusLabels: Record<string, string> = {
    'not-started': 'Not Started',
    'in-progress': 'In Progress',
    shipped: 'Shipped',
  };

  const handleSave = () => {
    let valid = true;
    if (githubUrl && !isValidUrl(githubUrl)) {
      setGithubError('Enter a valid URL');
      valid = false;
    } else setGithubError('');
    if (deployedUrl && !isValidUrl(deployedUrl)) {
      setDeployedError('Enter a valid URL');
      valid = false;
    } else setDeployedError('');
    if (valid) {
      ctx.saveProofArtifacts({ githubUrl, deployedUrl });
    }
  };

  const handleCopy = () => {
    const artifacts = { ...ctx.proofArtifacts };
    if (githubUrl && isValidUrl(githubUrl)) artifacts.githubUrl = githubUrl;
    if (deployedUrl && isValidUrl(deployedUrl)) artifacts.deployedUrl = deployedUrl;
    ctx.saveProofArtifacts(artifacts);
    const text = `------------------------------------------
Job Notification Tracker — Final Submission

GitHub Repository:
${artifacts.githubUrl || '(not provided)'}

Live Deployment:
${artifacts.deployedUrl || '(not provided)'}

Core Features:
- Intelligent match scoring
- Daily digest simulation
- Status tracking
- Test checklist enforced
------------------------------------------`;
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="kn-page kn-page--proof">
      <div className="kn-page__header">
        <h1 className="kn-page__title">Project 1 — Job Notification Tracker</h1>
        <span className={`kn-proof-badge kn-proof-badge--${status}`}>{statusLabels[status]}</span>
      </div>

      <section className="kn-proof-section">
        <h2 className="kn-proof-section__title">A) Step Completion Summary</h2>
        <div className="kn-proof-steps">
          {getProofSteps(ctx).map((s) => (
            <div key={s.id} className={`kn-proof-step ${s.done ? 'kn-proof-step--done' : ''}`}>
              <span className="kn-proof-step__status">{s.done ? 'Completed' : 'Pending'}</span>
              <span className="kn-proof-step__label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="kn-proof-section">
        <h2 className="kn-proof-section__title">B) Artifact Collection Inputs</h2>
        <div className="kn-proof-artifacts">
          <div className="kn-settings__field">
            <label className="kn-settings__label" htmlFor="proof-github">
              GitHub Repository Link
            </label>
            <input
              type="url"
              id="proof-github"
              className="kn-input"
              placeholder="https://github.com/..."
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              onBlur={() => {
                if (githubUrl && !isValidUrl(githubUrl)) setGithubError('Enter a valid URL');
                else setGithubError('');
              }}
            />
            <span className="kn-proof-error">{githubError}</span>
          </div>
          <div className="kn-settings__field">
            <label className="kn-settings__label" htmlFor="proof-deployed">
              Deployed URL (Vercel or equivalent)
            </label>
            <input
              type="url"
              id="proof-deployed"
              className="kn-input"
              placeholder="https://your-app.vercel.app"
              value={deployedUrl}
              onChange={(e) => setDeployedUrl(e.target.value)}
              onBlur={() => {
                if (deployedUrl && !isValidUrl(deployedUrl)) setDeployedError('Enter a valid URL');
                else setDeployedError('');
              }}
            />
            <span className="kn-proof-error">{deployedError}</span>
          </div>
        </div>
      </section>

      <div className="kn-proof-actions">
        <button type="button" className="kn-btn kn-btn--secondary" onClick={handleSave}>
          Save Artifacts
        </button>
        <button type="button" className="kn-btn kn-btn--primary" onClick={handleCopy}>
          Copy Final Submission
        </button>
      </div>

      {status === 'shipped' && (
        <p className="kn-proof-shipped">Project 1 Shipped Successfully.</p>
      )}
    </div>
  );
}
