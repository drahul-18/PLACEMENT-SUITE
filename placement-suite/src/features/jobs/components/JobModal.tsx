import { useEffect } from 'react';
import type { Job } from '../utils/matchScore';

interface JobModalProps {
  job: Job | null;
  onClose: () => void;
}

export function JobModal({ job, onClose }: JobModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (!job) return null;

  return (
    <>
      <div
        id="modal-backdrop"
        className="kn-modal-backdrop kn-modal-backdrop--visible"
        aria-hidden="false"
        onClick={onClose}
      />
      <div
        id="modal"
        className="kn-modal kn-modal--visible"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-hidden="false"
      >
        <div className="kn-modal__content">
          <h2 id="modal-title" className="kn-modal__title">
            {job.title}
          </h2>
          <p className="kn-modal__company">{job.company}</p>
          <div className="kn-modal__skills">
            <span className="kn-modal__skills-label">Skills:</span>
            {job.skills.map((s) => (
              <span key={s} className="kn-modal__skill">
                {s}
              </span>
            ))}
          </div>
          <p className="kn-modal__description">{job.description}</p>
          <button type="button" className="kn-btn kn-btn--secondary kn-modal__close" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </>
  );
}
