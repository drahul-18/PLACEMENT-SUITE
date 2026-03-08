import { Link } from 'react-router-dom';
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

export function Ship() {
  const { getAllTestsPassed, proofArtifacts } = useJobs();
  const allPassed = getAllTestsPassed();
  const hasGithub = isValidUrl(proofArtifacts.githubUrl);
  const hasDeployed = isValidUrl(proofArtifacts.deployedUrl);
  const status = allPassed && hasGithub && hasDeployed ? 'shipped' : hasGithub || hasDeployed || allPassed ? 'in-progress' : 'not-started';

  if (!allPassed) {
    return (
      <div className="kn-page kn-page--ship">
        <div className="kn-page__header">
          <h1 className="kn-page__title">Ship</h1>
        </div>
        <div className="kn-ship-lock">
          <p className="kn-ship-lock__message">
            Complete all 10 test checklist items to unlock Ship.
          </p>
          <Link to="/jobs/jt/07-test" className="kn-btn kn-btn--primary">
            Go to Test Checklist
          </Link>
        </div>
      </div>
    );
  }

  if (status === 'shipped') {
    return (
      <div className="kn-page kn-page--ship">
        <div className="kn-page__header">
          <h1 className="kn-page__title">Ship</h1>
          <span className={`kn-proof-badge kn-proof-badge--shipped`}>Shipped</span>
        </div>
        <div className="kn-ship-unlocked">
          <p className="kn-proof-shipped">Project 1 Shipped Successfully.</p>
          <p className="kn-ship-unlocked__message">
            All quality checks complete. You may proceed with deployment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="kn-page kn-page--ship">
      <div className="kn-page__header">
        <h1 className="kn-page__title">Ship</h1>
        <p className="kn-page__subtext">All tests passed. Add proof artifacts to mark as Shipped.</p>
      </div>
      <div className="kn-ship-unlocked">
        <p className="kn-ship-unlocked__message">
          Complete artifact collection on the Proof page to mark Project 1 as Shipped.
        </p>
        <Link to="/jobs/jt/proof" className="kn-btn kn-btn--primary">
          Go to Proof
        </Link>
      </div>
    </div>
  );
}
