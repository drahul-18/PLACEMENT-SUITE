import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div className="home-page">
      <main className="home-hero">
        <h1 className="home-headline">Build a Resume That Gets Read.</h1>
        <p className="home-subline">
          Create a professional resume with premium structure and clarity.
        </p>
        <Link to="/builder" className="home-cta">
          Start Building
        </Link>
      </main>
    </div>
  );
}
