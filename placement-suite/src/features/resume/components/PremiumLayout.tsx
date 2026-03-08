import type { ReactNode } from 'react';
import { TopBar } from './TopBar';
import { ContextHeader } from './ContextHeader';
import { BuildPanel } from './BuildPanel';
import { ProofFooter } from './ProofFooter';
import { useArtifacts } from '../context/ArtifactContext';

interface PremiumLayoutProps {
  stepNumber: number;
  stepTitle: string;
  stepSubtitle?: string;
  children: ReactNode;
  lovablePrompt?: string;
  showBuildPanel?: boolean;
  showProofFooter?: boolean;
}

export function PremiumLayout({
  stepNumber,
  stepTitle,
  stepSubtitle,
  children,
  lovablePrompt = '',
  showBuildPanel = true,
  showProofFooter = true,
}: PremiumLayoutProps) {
  const { hasArtifact, setArtifact } = useArtifacts();
  const status = hasArtifact(stepNumber) ? 'complete' : 'in-progress';

  return (
    <div className="premium-layout">
      <TopBar
        stepLabel={`Project 3 — Step ${stepNumber} of 8`}
        status={status}
      />
      <div className="context-header-wrap">
        <ContextHeader title={stepTitle} subtitle={stepSubtitle} />
      </div>
      <div className="workspace-row">
        <main className="main-workspace">{children}</main>
        {showBuildPanel && (
          <aside className="build-panel-wrap">
            <BuildPanel
              stepNumber={stepNumber}
              lovablePrompt={lovablePrompt}
              onArtifactUpload={(v) => setArtifact(stepNumber, v)}
            />
          </aside>
        )}
      </div>
      {showProofFooter && <ProofFooter />}
    </div>
  );
}
