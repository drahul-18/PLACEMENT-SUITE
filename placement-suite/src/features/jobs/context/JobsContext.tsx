import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useJobsStorage } from '../hooks/useJobsStorage';

type JobsStorage = ReturnType<typeof useJobsStorage>;

const JobsContext = createContext<JobsStorage | null>(null);

export function JobsProvider({ children }: { children: ReactNode }) {
  const value = useJobsStorage();
  return <JobsContext.Provider value={value}>{children}</JobsContext.Provider>;
}

export function useJobs() {
  const ctx = useContext(JobsContext);
  if (!ctx) throw new Error('useJobs must be used within JobsProvider');
  return ctx;
}
