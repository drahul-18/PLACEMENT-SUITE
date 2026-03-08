import { useMemo, useState, useCallback } from 'react';
import { JOBS } from '../data/jobsData';
import { useJobs } from '../context/JobsContext';
import { useToast } from '../../../context/ToastContext';
import { JobCard } from '../components/JobCard';
import { JobModal } from '../components/JobModal';
import { computeMatchScore } from '../utils/matchScore';
import type { Job } from '../utils/matchScore';

export function Saved() {
  const {
    savedIds,
    preferences,
    saveJobId,
    unsaveJobId,
    isSaved,
    getJobStatus,
    setJobStatus,
  } = useJobs();
  const { addToast } = useToast();
  const [modalJob, setModalJob] = useState<Job | null>(null);

  const handleSave = useCallback((id: number) => {
    saveJobId(id);
    addToast('Job saved!', 'success');
  }, [saveJobId, addToast]);

  const handleUnsave = useCallback((id: number) => {
    unsaveJobId(id);
    addToast('Job removed from saved', 'info');
  }, [unsaveJobId, addToast]);

  const handleStatusChange = useCallback((id: number, status: string, job: Job) => {
    setJobStatus(id, status, job);
    if (status !== 'Not Applied') {
      addToast(`Status updated to ${status}`, 'success');
    }
  }, [setJobStatus, addToast]);

  const savedJobs = useMemo(
    () =>
      JOBS.filter((j) => savedIds.includes(j.id)).map((j) => ({
        ...j,
        matchScore: computeMatchScore(j, preferences),
      })),
    [savedIds, preferences]
  );

  return (
    <>
      <div className="kn-page kn-page--wide">
        <div className="kn-page__header">
          <h1 className="kn-page__title">Saved</h1>
        </div>
        <div className="kn-jobs">
          {savedJobs.length === 0 ? (
            <div className="kn-empty">
              <p className="kn-empty__message">
                No saved jobs yet. Jobs you save will appear here.
              </p>
            </div>
          ) : (
            savedJobs.map((j) => (
              <JobCard
                key={j.id}
                job={j}
                showUnsave
                onView={setModalJob}
                onSave={handleSave}
                onUnsave={handleUnsave}
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
