import { useParams, useNavigate } from 'react-router-dom';
import { PremiumLayout } from '../../components/PremiumLayout';
import { useArtifacts } from '../../context/ArtifactContext';

const STEP_CONFIG: Record<string, { title: string; subtitle?: string }> = {
  '01-problem': { title: 'Problem', subtitle: 'Define the problem you are solving' },
  '02-market': { title: 'Market', subtitle: 'Understand your market and users' },
  '03-architecture': { title: 'Architecture', subtitle: 'High-level system design' },
  '04-hld': { title: 'High-Level Design', subtitle: 'HLD diagrams and flows' },
  '05-lld': { title: 'Low-Level Design', subtitle: 'LLD and component details' },
  '06-build': { title: 'Build', subtitle: 'Implement in Lovable' },
  '07-test': { title: 'Test', subtitle: 'Validate your build' },
  '08-ship': { title: 'Ship', subtitle: 'Deploy and deliver' },
};

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

export function StepPage() {
  const { stepId } = useParams<{ stepId: string }>();
  const navigate = useNavigate();
  const { canProceed } = useArtifacts();

  const stepIndex = STEP_ORDER.indexOf(stepId || '');
  const stepNumber = stepIndex >= 0 ? stepIndex + 1 : 1;
  const config = STEP_CONFIG[stepId || '01-problem'] || STEP_CONFIG['01-problem'];

  const prevStep = stepIndex > 0 ? STEP_ORDER[stepIndex - 1] : null;
  const nextStep = stepIndex < 7 ? STEP_ORDER[stepIndex + 1] : null;
  const canGoNext = canProceed(stepNumber);

  const handlePrev = () => prevStep && navigate(`/rb/${prevStep}`);
  const handleNext = () => nextStep && canGoNext && navigate(`/rb/${nextStep}`);

  return (
    <PremiumLayout
      stepNumber={stepNumber}
      stepTitle={config.title}
      stepSubtitle={config.subtitle}
    >
      <div className="step-content">
        <p>Step {stepNumber}: {config.title}</p>
        <p className="step-hint">
          Complete the build panel and upload an artifact to enable Next.
        </p>
        <div className="step-nav">
          <button
            type="button"
            onClick={handlePrev}
            disabled={!prevStep}
          >
            Previous
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={!canGoNext}
          >
            Next
          </button>
        </div>
        {!canGoNext && (
          <p className="gate-message">Next is disabled until artifact is uploaded.</p>
        )}
      </div>
    </PremiumLayout>
  );
}
