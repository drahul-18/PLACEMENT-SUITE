import { Link } from 'react-router-dom';
import { FileText, Sparkles } from 'lucide-react';

export function Home() {
  return (
    <div className="home-page">
      <main className="home-hero">
        <div className="home-icon-wrap">
          <FileText className="home-icon" />
        </div>
        <h1 className="home-headline">Build a Resume That Gets Read</h1>
        <p className="home-subline">
          Create a professional resume with premium structure, ATS optimization, and clarity. Stand out from the crowd.
        </p>
        <Link to="/resume/builder" className="home-cta">
          <Sparkles className="w-5 h-5" />
          Start Building
        </Link>
      </main>
    </div>
  );
}
