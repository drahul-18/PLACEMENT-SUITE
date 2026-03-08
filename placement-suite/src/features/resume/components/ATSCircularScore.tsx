import {
  computeATSScore,
  getATSScoreLabel,
  getATSScoreTier,
  getATSImprovements,
} from '../utils/atsScore';
import type { ResumeData } from '../types/resume';

interface Props {
  data: ResumeData;
}

const SIZE = 120;
const STROKE = 8;
const RADIUS = (SIZE - STROKE) / 2;

export function ATSCircularScore({ data }: Props) {
  const score = computeATSScore(data);
  const label = getATSScoreLabel(score);
  const tier = getATSScoreTier(score);
  const improvements = getATSImprovements(data);

  const circumference = 2 * Math.PI * RADIUS;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className={`ats-circular-score ats-circular-score--${tier}`}>
      <div className="ats-circular-score-ring">
        <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
          <circle
            className="ats-circular-bg"
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            strokeWidth={STROKE}
          />
          <circle
            className="ats-circular-fill"
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            strokeWidth={STROKE}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
          />
        </svg>
        <div className="ats-circular-score-value">
          <span className="ats-circular-number">{score}</span>
          <span className="ats-circular-max">/100</span>
        </div>
      </div>
      <div className="ats-circular-score-label">{label}</div>
      {improvements.length > 0 && (
        <ul className="ats-circular-improvements">
          {improvements.map((i, idx) => (
            <li key={idx}>
              {i.message} <span className="ats-circular-points">(+{i.points})</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
