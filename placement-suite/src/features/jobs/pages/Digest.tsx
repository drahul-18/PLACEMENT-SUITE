import { useState } from 'react';
import { Link } from 'react-router-dom';
import { JOBS } from '../data/jobsData';
import { useJobs } from '../context/JobsContext';
import { computeMatchScore } from '../utils/matchScore';
import type { Job } from '../utils/matchScore';

function formatDigestAsPlainText(jobs: Job[]): string {
  const dateStr = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const header = `Top 10 Jobs For You — 9AM Digest\n${dateStr}\n\n`;
  const body = jobs
    .map(
      (j, i) =>
        `${i + 1}. ${j.title} — ${j.company}\n   ${j.location} · ${j.experience} · Match: ${j.matchScore}\n   ${j.applyUrl}`
    )
    .join('\n\n');
  return header + body;
}

function formatStatusDate(isoStr: string) {
  return new Date(isoStr).toLocaleDateString('en-IN', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function Digest() {
  const {
    preferences,
    statusUpdates,
    getTodayDigest,
    saveTodayDigest,
    getDigestKey,
  } = useJobs();
  const [digest, setDigest] = useState(() => getTodayDigest());

  const generateDigest = () => {
    if (!preferences) return;
    const jobsWithScores = JOBS.map((j) => ({
      ...j,
      matchScore: computeMatchScore(j, preferences),
    }));
    const sorted = [...jobsWithScores].sort((a, b) => {
      if (b.matchScore !== a.matchScore) return b.matchScore - a.matchScore;
      return a.postedDaysAgo - b.postedDaysAgo;
    });
    const top10 = sorted.slice(0, 10);
    const newDigest = {
      date: getDigestKey().replace('digest_', ''),
      jobs: top10,
    };
    saveTodayDigest(newDigest);
    setDigest(newDigest);
  };

  const dateStr = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const digestJobs = (digest?.jobs ?? []) as Job[];
  const hasDigest = digest !== null;

  if (!preferences.roleKeywords && !preferences.skills) {
    return (
      <div className="kn-page">
        <div className="kn-page__header">
          <h1 className="kn-page__title">Digest</h1>
        </div>
        <div className="kn-digest-block">
          <p className="kn-digest-block__message">
            Set preferences to generate a personalized digest.
          </p>
          <Link to="/jobs/settings" className="kn-btn kn-btn--primary">
            Go to Settings
          </Link>
        </div>
      </div>
    );
  }

  const handleCopy = () => {
    if (digestJobs.length > 0) {
      navigator.clipboard.writeText(formatDigestAsPlainText(digestJobs));
    }
  };

  const handleEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    if (digestJobs.length > 0) {
      const body = encodeURIComponent(formatDigestAsPlainText(digestJobs));
      const subject = encodeURIComponent('My 9AM Job Digest');
      window.location.href = `mailto:?subject=${subject}&body=${body}`;
    }
  };

  return (
    <div className="kn-page kn-page--digest">
      <div className="kn-page__header">
        <h1 className="kn-page__title">Digest</h1>
      </div>
      <div className="kn-digest-actions">
        <button
          type="button"
          className="kn-btn kn-btn--secondary"
          onClick={generateDigest}
        >
          Generate Today's 9AM Digest (Simulated)
        </button>
      </div>
      <p className="kn-digest__note">Demo Mode: Daily 9AM trigger simulated manually.</p>

      {hasDigest && digestJobs.length > 0 ? (
        <div className="kn-digest-card">
          <h2 className="kn-digest-card__title">Top 10 Jobs For You — 9AM Digest</h2>
          <p className="kn-digest-card__date">{dateStr}</p>
          <div className="kn-digest-card__jobs">
            {digestJobs.map((j: Job) => (
              <div key={j.id} className="kn-digest-item">
                <div className="kn-digest-item__header">
                  <h3 className="kn-digest-item__title">{j.title}</h3>
                  <span className="kn-digest-item__score">{j.matchScore}</span>
                </div>
                <p className="kn-digest-item__company">{j.company}</p>
                <p className="kn-digest-item__meta">
                  {j.location} · {j.experience}
                </p>
                <a
                  href={j.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="kn-btn kn-btn--primary kn-digest-item__apply"
                >
                  Apply
                </a>
              </div>
            ))}
          </div>
          <p className="kn-digest-card__footer">
            This digest was generated based on your preferences.
          </p>
          <div className="kn-digest-card__actions">
            <button
              type="button"
              className="kn-btn kn-btn--secondary"
              onClick={handleCopy}
            >
              Copy Digest to Clipboard
            </button>
            <a href="#" className="kn-btn kn-btn--secondary" onClick={handleEmail}>
              Create Email Draft
            </a>
          </div>
        </div>
      ) : (
        <div className="kn-digest-block">
          <p className="kn-digest-block__message">
            {hasDigest && digestJobs.length === 0
              ? 'No matching roles today. Check again tomorrow.'
              : 'Generate digest to see top 10 jobs.'}
          </p>
        </div>
      )}

      {statusUpdates.length > 0 && (
        <div className="kn-digest-status-updates">
          <h3 className="kn-digest-status-updates__title">Recent Status Updates</h3>
          <div className="kn-digest-status-updates__list">
            {statusUpdates.slice(0, 10).map((u, i) => (
              <div key={i} className="kn-digest-status-update">
                <span className="kn-digest-status-update__title">{u.title}</span>
                <span className="kn-digest-status-update__company">{u.company}</span>
                <span
                  className={`kn-digest-status-update__status kn-digest-status-update__status--${u.status.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {u.status}
                </span>
                <span className="kn-digest-status-update__date">
                  {formatStatusDate(u.dateChanged)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
