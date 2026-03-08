import type { Job } from '../utils/matchScore';
import { JOB_STATUSES } from '../hooks/useJobsStorage';

function formatPosted(days: number) {
  if (days === 0) return 'Today';
  if (days === 1) return '1 day ago';
  return `${days} days ago`;
}

function getScoreClass(score: number) {
  if (score >= 80) return 'kn-job-card__score--high';
  if (score >= 60) return 'kn-job-card__score--medium';
  if (score >= 40) return 'kn-job-card__score--neutral';
  return 'kn-job-card__score--low';
}

function getStatusClass(status: string) {
  const map: Record<string, string> = {
    'Not Applied': 'kn-job-card__status--neutral',
    Applied: 'kn-job-card__status--applied',
    Rejected: 'kn-job-card__status--rejected',
    Selected: 'kn-job-card__status--selected',
  };
  return map[status] ?? 'kn-job-card__status--neutral';
}

interface JobCardProps {
  job: Job;
  showUnsave?: boolean;
  onView: (job: Job) => void;
  onSave: (id: number) => void;
  onUnsave: (id: number) => void;
  onStatusChange: (id: number, status: string, job: Job) => void;
  isSaved: (id: number) => boolean;
  getJobStatus: (id: number) => string;
}

export function JobCard({
  job,
  showUnsave = false,
  onView,
  onSave,
  onUnsave,
  onStatusChange,
  isSaved,
  getJobStatus,
}: JobCardProps) {
  const saved = isSaved(job.id);
  const score = job.matchScore ?? 0;
  const status = getJobStatus(job.id);

  return (
    <article className="kn-job-card" data-id={job.id}>
      <div className="kn-job-card__header">
        <h3 className="kn-job-card__title">{job.title}</h3>
        <div className="kn-job-card__badges">
          <span className={`kn-job-card__score ${getScoreClass(score)}`}>{score}</span>
          <span className={`kn-job-card__badge kn-job-card__badge--${job.source.toLowerCase()}`}>
            {job.source}
          </span>
        </div>
      </div>
      <p className="kn-job-card__company">{job.company}</p>
      <p className="kn-job-card__meta">
        {job.location} · {job.mode} · {job.experience}
      </p>
      <p className="kn-job-card__salary">{job.salaryRange}</p>
      <p className="kn-job-card__posted">{formatPosted(job.postedDaysAgo)}</p>
      <div className="kn-job-card__status-group">
        {JOB_STATUSES.map((s) => (
          <button
            key={s}
            type="button"
            className={`kn-job-card__status-btn ${status === s ? getStatusClass(status) : ''}`}
            onClick={() => onStatusChange(job.id, s, job)}
          >
            {s}
          </button>
        ))}
      </div>
      <div className="kn-job-card__actions">
        <button type="button" className="kn-btn kn-btn--secondary kn-job-card__btn" onClick={() => onView(job)}>
          View
        </button>
        <button
          type="button"
          className="kn-btn kn-btn--secondary kn-job-card__btn"
          onClick={() => (saved && showUnsave ? onUnsave(job.id) : onSave(job.id))}
        >
          {saved && showUnsave ? 'Unsave' : 'Save'}
        </button>
        <a href={job.applyUrl} target="_blank" rel="noopener noreferrer" className="kn-btn kn-btn--primary kn-job-card__btn">
          Apply
        </a>
      </div>
    </article>
  );
}
