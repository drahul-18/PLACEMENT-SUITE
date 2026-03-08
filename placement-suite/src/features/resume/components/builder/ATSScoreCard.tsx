import { computeATSScore, getATSImprovements } from '../../utils/atsScore';
import type { ResumeData } from '../../types/resume';

interface Props {
  data: ResumeData;
}

export function ATSScoreCard({ data }: Props) {
  const score = computeATSScore(data);
  const improvements = getATSImprovements(data);

  return (
    <div className="ats-score-card">
      <h3 className="ats-score-label">ATS Readiness Score</h3>
      <div className="ats-score-meter">
        <div
          className="ats-score-fill"
          style={{ width: `${score}%` }}
          role="progressbar"
          aria-valuenow={score}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      <div className="ats-score-value">{score}/100</div>
      {improvements.length > 0 && (
        <div className="ats-improvements">
          <h4 className="ats-improvements-label">Improvements</h4>
          <ul className="ats-improvements-list">
            {improvements.map((i, idx) => (
              <li key={idx}>
                {i.message} <span className="ats-improvement-points">(+{i.points})</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
