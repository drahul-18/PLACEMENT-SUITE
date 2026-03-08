import { useState, useMemo, useCallback } from 'react';
import { JOBS } from '../data/jobsData';
import { useJobs } from '../context/JobsContext';
import { useToast } from '../../../context/ToastContext';
import { JobCard } from '../components/JobCard';
import { JobModal } from '../components/JobModal';
import {
  computeMatchScore,
  extractSalaryValue,
  getUniqueValues,
  type Job,
  type Preferences,
} from '../utils/matchScore';

export interface FilterState {
  keyword: string;
  location: string;
  mode: string;
  experience: string;
  source: string;
  status: string;
  sort: string;
  showMatchesOnly: boolean;
}

function getFilteredJobs(
  jobs: Job[],
  prefs: Preferences | null,
  filter: FilterState,
  getJobStatus: (id: number) => string
): Job[] {
  let result = jobs.map((job) => ({
    ...job,
    matchScore: computeMatchScore(job, prefs),
  }));

  if (filter.keyword) {
    const k = filter.keyword.toLowerCase();
    result = result.filter(
      (j) =>
        j.title.toLowerCase().includes(k) || j.company.toLowerCase().includes(k)
    );
  }
  if (filter.location) {
    result = result.filter((j) => j.location.toLowerCase() === filter.location.toLowerCase());
  }
  if (filter.mode) {
    result = result.filter((j) => j.mode.toLowerCase() === filter.mode.toLowerCase());
  }
  if (filter.experience) {
    result = result.filter((j) => j.experience.toLowerCase() === filter.experience.toLowerCase());
  }
  if (filter.source) {
    result = result.filter((j) => j.source.toLowerCase() === filter.source.toLowerCase());
  }
  if (filter.status) {
    result = result.filter((j) => getJobStatus(j.id) === filter.status);
  }
  if (filter.showMatchesOnly && prefs) {
    const threshold = prefs.minMatchScore ?? 40;
    result = result.filter((j) => (j.matchScore ?? 0) >= threshold);
  }
  if (filter.sort === 'latest') {
    result.sort((a, b) => a.postedDaysAgo - b.postedDaysAgo);
  } else if (filter.sort === 'oldest') {
    result.sort((a, b) => b.postedDaysAgo - a.postedDaysAgo);
  } else if (filter.sort === 'match') {
    result.sort((a, b) => (b.matchScore ?? 0) - (a.matchScore ?? 0));
  } else if (filter.sort === 'salary') {
    result.sort(
      (a, b) =>
        extractSalaryValue(b.salaryRange) - extractSalaryValue(a.salaryRange)
    );
  }
  return result;
}

export function Dashboard() {
  const {
    preferences,
    saveJobId,
    unsaveJobId,
    isSaved,
    getJobStatus,
    setJobStatus,
  } = useJobs();
  const { addToast } = useToast();
  const [filter, setFilter] = useState<FilterState>({
    keyword: '',
    location: '',
    mode: '',
    experience: '',
    source: '',
    status: '',
    sort: 'latest',
    showMatchesOnly: false,
  });
  const [modalJob, setModalJob] = useState<Job | null>(null);

  const filtered = useMemo(
    () => getFilteredJobs(JOBS, preferences, filter, getJobStatus),
    [preferences, filter, getJobStatus]
  );

  const locations = getUniqueValues(JOBS, 'location');
  const modes = getUniqueValues(JOBS, 'mode');
  const experiences = getUniqueValues(JOBS, 'experience');
  const sources = getUniqueValues(JOBS, 'source');

  const emptyMessage =
    filter.showMatchesOnly && preferences
      ? 'No roles match your criteria. Adjust filters or lower threshold.'
      : 'No jobs match your filters. Try adjusting your search.';

  const handleSave = useCallback((id: number) => {
    saveJobId(id);
    addToast('Job saved!', 'success');
  }, [saveJobId, addToast]);

  const handleStatusChange = useCallback((id: number, status: string, job: Job) => {
    setJobStatus(id, status, job);
    if (status !== 'Not Applied') {
      addToast(`Status updated to ${status}`, 'success');
    }
  }, [setJobStatus, addToast]);

  return (
    <>
      <div className="kn-page kn-page--wide">
        {!preferences.roleKeywords && !preferences.skills && (
          <div className="kn-banner">
            Set your preferences to activate intelligent matching.
          </div>
        )}
        <div className="kn-page__header">
          <h1 className="kn-page__title">Dashboard</h1>
        </div>
        <div className="kn-filters-wrap">
          <div className="kn-filters">
            <input
              type="text"
              className="kn-input kn-filters__search"
              placeholder="Search title or company"
              value={filter.keyword}
              onChange={(e) => setFilter((f) => ({ ...f, keyword: e.target.value }))}
            />
            <select
              className="kn-input kn-input--select kn-filters__select"
              value={filter.location}
              onChange={(e) => setFilter((f) => ({ ...f, location: e.target.value }))}
            >
              <option value="">All locations</option>
              {locations.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
            <select
              className="kn-input kn-input--select kn-filters__select"
              value={filter.mode}
              onChange={(e) => setFilter((f) => ({ ...f, mode: e.target.value }))}
            >
              <option value="">All modes</option>
              {modes.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
            <select
              className="kn-input kn-input--select kn-filters__select"
              value={filter.experience}
              onChange={(e) => setFilter((f) => ({ ...f, experience: e.target.value }))}
            >
              <option value="">All experience</option>
              {experiences.map((e) => (
                <option key={e} value={e}>{e}</option>
              ))}
            </select>
            <select
              className="kn-input kn-input--select kn-filters__select"
              value={filter.source}
              onChange={(e) => setFilter((f) => ({ ...f, source: e.target.value }))}
            >
              <option value="">All sources</option>
              {sources.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <select
              className="kn-input kn-input--select kn-filters__select"
              value={filter.status}
              onChange={(e) => setFilter((f) => ({ ...f, status: e.target.value }))}
            >
              <option value="">All</option>
              <option value="Not Applied">Not Applied</option>
              <option value="Applied">Applied</option>
              <option value="Rejected">Rejected</option>
              <option value="Selected">Selected</option>
            </select>
            <select
              className="kn-input kn-input--select kn-filters__select"
              value={filter.sort}
              onChange={(e) => setFilter((f) => ({ ...f, sort: e.target.value }))}
            >
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
              <option value="match">Match Score</option>
              <option value="salary">Salary</option>
            </select>
          </div>
          <label className="kn-filters__toggle">
            <input
              type="checkbox"
              className="kn-filters__checkbox"
              checked={filter.showMatchesOnly}
              onChange={(e) =>
                setFilter((f) => ({ ...f, showMatchesOnly: e.target.checked }))
              }
            />
            <span>Show only jobs above my threshold</span>
          </label>
        </div>
        <div className="kn-jobs">
          {filtered.length === 0 ? (
            <div className="kn-empty">
              <p className="kn-empty__message">{emptyMessage}</p>
            </div>
          ) : (
            filtered.map((j) => (
              <JobCard
                key={j.id}
                job={j}
                showUnsave={false}
                onView={setModalJob}
                onSave={handleSave}
                onUnsave={unsaveJobId}
                onStatusChange={handleStatusChange}
                isSaved={isSaved}
                getJobStatus={getJobStatus}
              />
            ))
          )}
        </div>
      </div>
      <JobModal job={modalJob} onClose={() => setModalJob(null)} />
    </>
  );
}
