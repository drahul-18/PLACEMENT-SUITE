import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';

const STORAGE_PREFIX = 'rb_step_';
const STEPS = [1, 2, 3, 4, 5, 6, 7, 8] as const;

type ArtifactState = Record<number, string | null>;

interface ArtifactContextType {
  artifacts: ArtifactState;
  setArtifact: (step: number, value: string | null) => void;
  hasArtifact: (step: number) => boolean;
  canProceed: (step: number) => boolean;
}

const loadArtifacts = (): ArtifactState => {
  const state: ArtifactState = {};
  STEPS.forEach((step) => {
    const key = `${STORAGE_PREFIX}${step}_artifact`;
    try {
      const stored = localStorage.getItem(key);
      state[step] = stored;
    } catch {
      state[step] = null;
    }
  });
  return state;
};

const saveArtifact = (step: number, value: string | null) => {
  const key = `${STORAGE_PREFIX}${step}_artifact`;
  if (value) {
    localStorage.setItem(key, value);
  } else {
    localStorage.removeItem(key);
  }
};

const ArtifactContext = createContext<ArtifactContextType | null>(null);

export function ArtifactProvider({ children }: { children: ReactNode }) {
  const [artifacts, setArtifactsState] = useState<ArtifactState>(loadArtifacts);

  const setArtifact = useCallback((step: number, value: string | null) => {
    saveArtifact(step, value);
    setArtifactsState((prev) => ({ ...prev, [step]: value }));
  }, []);

  const hasArtifact = useCallback((step: number) => {
    return !!artifacts[step];
  }, [artifacts]);

  const canProceed = useCallback((step: number) => {
    return hasArtifact(step);
  }, [hasArtifact]);

  return (
    <ArtifactContext.Provider value={{ artifacts, setArtifact, hasArtifact, canProceed }}>
      {children}
    </ArtifactContext.Provider>
  );
}

export function useArtifacts() {
  const ctx = useContext(ArtifactContext);
  if (!ctx) throw new Error('useArtifacts must be used within ArtifactProvider');
  return ctx;
}
