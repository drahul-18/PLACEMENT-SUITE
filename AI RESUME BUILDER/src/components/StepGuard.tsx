import { Navigate, useParams } from 'react-router-dom';
import { useArtifacts } from '../context/ArtifactContext';

const STEP_ORDER = [
  '01-problem',
  '02-market',
  '03-architecture',
  '04-hld',
  '05-lld',
  '06-build',
  '07-test',
  '08-ship',
];

export function StepGuard({ children }: { children: React.ReactNode }) {
  const { stepId } = useParams<{ stepId: string }>();
  const { hasArtifact } = useArtifacts();

  const stepIndex = STEP_ORDER.indexOf(stepId || '');
  if (stepIndex < 0) return <Navigate to="/rb/01-problem" replace />;

  for (let i = 0; i < stepIndex; i++) {
    if (!hasArtifact(i + 1)) {
      const firstIncomplete = STEP_ORDER[i];
      return <Navigate to={`/rb/${firstIncomplete}`} replace />;
    }
  }

  return <>{children}</>;
}
