import { Link } from 'react-router-dom';
import { Briefcase, Settings } from 'lucide-react';

export function JobsLanding() {
  return (
    <div className="kn-landing">
      <div className="kn-landing__icon">
        <Briefcase className="w-12 h-12" />
      </div>
      <h1 className="kn-landing__headline">Stop Missing The Right Jobs</h1>
      <p className="kn-landing__subtext">
        Precision-matched job discovery delivered daily at 9AM. Set your preferences and get personalized recommendations.
      </p>
      <Link to="/jobs/settings" className="kn-btn kn-btn--primary kn-landing__cta">
        <Settings className="w-5 h-5" />
        Configure Preferences
      </Link>
      <Link to="/jobs/dashboard" className="kn-btn kn-btn--secondary kn-landing__cta-secondary">
        Browse Jobs
      </Link>
    </div>
  );
}
