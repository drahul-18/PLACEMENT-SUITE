import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { ResumeData } from '../types/resume';
import { emptyResume, sampleResume } from '../types/resume';
import { migrateResume } from '../utils/migrateResume';

interface ResumeContextType {
  data: ResumeData;
  setData: (data: ResumeData | ((prev: ResumeData) => ResumeData)) => void;
  loadSample: () => void;
}

const STORAGE_KEY = 'resumeBuilderData';

function loadFromStorage(): ResumeData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyResume();
    const parsed = JSON.parse(raw) as unknown;
    return migrateResume(parsed);
  } catch {
    // ignore parse errors
  }
  return emptyResume();
}

function saveToStorage(data: ResumeData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // ignore storage errors
  }
}

const ResumeContext = createContext<ResumeContextType | null>(null);

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [data, setDataState] = useState<ResumeData>(loadFromStorage);

  useEffect(() => {
    saveToStorage(data);
  }, [data]);

  const setData = useCallback(
    (updater: ResumeData | ((prev: ResumeData) => ResumeData)) => {
      setDataState((prev) => {
        const next = typeof updater === 'function' ? updater(prev) : updater;
        return next;
      });
    },
    []
  );

  const loadSample = useCallback(() => {
    setDataState(sampleResume());
  }, []);

  return (
    <ResumeContext.Provider value={{ data, setData, loadSample }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error('useResume must be used within ResumeProvider');
  return ctx;
}
