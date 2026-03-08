import { useState, useCallback, useEffect } from 'react';
import { getItem, setItem } from '../../../lib/storage';

const PREFERENCES_KEY = 'preferences';
const SAVED_IDS_KEY = 'savedIds';
const STATUS_KEY = 'status';
const STATUS_UPDATES_KEY = 'statusUpdates';
const DIGEST_PREFIX = 'digest';
const TEST_CHECKLIST_KEY = 'testChecklist';
const PROOF_ARTIFACTS_KEY = 'proofArtifacts';

const FEATURE = 'jobs';

export const JOB_STATUSES = ['Not Applied', 'Applied', 'Rejected', 'Selected'] as const;

export const DEFAULT_PREFERENCES = {
  roleKeywords: '',
  preferredLocations: [] as string[],
  preferredMode: [] as string[],
  experienceLevel: '',
  skills: '',
  minMatchScore: 40,
};

export function useJobsStorage() {
  const [savedIds, setSavedIds] = useState<number[]>(() =>
    getItem<number[]>(FEATURE, SAVED_IDS_KEY) ?? []
  );
  const [preferences, setPreferencesState] = useState(() => {
    const raw = getItem<Record<string, unknown>>(FEATURE, PREFERENCES_KEY);
    return raw ? { ...DEFAULT_PREFERENCES, ...raw } : DEFAULT_PREFERENCES;
  });
  const [statuses, setStatuses] = useState<Record<number, string>>(() =>
    getItem<Record<number, string>>(FEATURE, STATUS_KEY) ?? {}
  );
  const [statusUpdates, setStatusUpdates] = useState<Array<{ jobId: number; title: string; company: string; status: string; dateChanged: string }>>(
    () => getItem(FEATURE, STATUS_UPDATES_KEY) ?? []
  );
  const [testChecklist, setTestChecklist] = useState<Record<number, boolean>>(() =>
    getItem<Record<number, boolean>>(FEATURE, TEST_CHECKLIST_KEY) ?? {}
  );
  const [proofArtifacts, setProofArtifacts] = useState<{ githubUrl: string; deployedUrl: string }>(
    () => getItem(FEATURE, PROOF_ARTIFACTS_KEY) ?? { githubUrl: '', deployedUrl: '' }
  );

  useEffect(() => {
    setItem(FEATURE, SAVED_IDS_KEY, savedIds);
  }, [savedIds]);
  useEffect(() => {
    setItem(FEATURE, PREFERENCES_KEY, preferences);
  }, [preferences]);
  useEffect(() => {
    setItem(FEATURE, STATUS_KEY, statuses);
  }, [statuses]);
  useEffect(() => {
    setItem(FEATURE, STATUS_UPDATES_KEY, statusUpdates);
  }, [statusUpdates]);
  useEffect(() => {
    setItem(FEATURE, TEST_CHECKLIST_KEY, testChecklist);
  }, [testChecklist]);
  useEffect(() => {
    setItem(FEATURE, PROOF_ARTIFACTS_KEY, proofArtifacts);
  }, [proofArtifacts]);

  const saveJobId = useCallback((id: number) => {
    setSavedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);
  const unsaveJobId = useCallback((id: number) => {
    setSavedIds((prev) => prev.filter((i) => i !== id));
  }, []);
  const isSaved = useCallback(
    (id: number) => savedIds.includes(id),
    [savedIds]
  );
  const getJobStatus = useCallback(
    (jobId: number) => statuses[jobId] ?? 'Not Applied',
    [statuses]
  );
  const setJobStatus = useCallback(
    (jobId: number, status: string, job: { title: string; company: string }) => {
      setStatuses((prev) => ({ ...prev, [jobId]: status }));
      if (['Applied', 'Rejected', 'Selected'].includes(status)) {
        setStatusUpdates((prev) => [
          { jobId, title: job.title, company: job.company, status, dateChanged: new Date().toISOString() },
          ...prev.slice(0, 49),
        ]);
      }
    },
    []
  );
  const setPreferences = useCallback((prefs: typeof DEFAULT_PREFERENCES) => {
    setPreferencesState(prefs);
  }, []);
  const setTestChecklistItem = useCallback((id: number, checked: boolean) => {
    setTestChecklist((prev) => ({ ...prev, [id]: checked }));
  }, []);
  const resetTestChecklist = useCallback(() => {
    setTestChecklist({});
  }, []);
  const getAllTestsPassed = useCallback(() => {
    const TEST_ITEMS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    return TEST_ITEMS.every((id) => testChecklist[id] === true);
  }, [testChecklist]);
  const saveProofArtifacts = useCallback((artifacts: { githubUrl: string; deployedUrl: string }) => {
    setProofArtifacts(artifacts);
  }, []);

  const getDigestKey = useCallback((date?: Date) => {
    const d = date ?? new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${DIGEST_PREFIX}_${y}-${m}-${day}`;
  }, []);

  const getTodayDigest = useCallback(() => {
    const key = getDigestKey();
    return getItem<{ date: string; jobs: unknown[] }>(FEATURE, key);
  }, [getDigestKey]);

  const saveTodayDigest = useCallback(
    (digest: { date: string; jobs: unknown[] }) => {
      const key = getDigestKey();
      setItem(FEATURE, key, digest);
    },
    [getDigestKey]
  );

  return {
    savedIds,
    preferences,
    statuses,
    statusUpdates,
    testChecklist,
    proofArtifacts,
    saveJobId,
    unsaveJobId,
    isSaved,
    getJobStatus,
    setJobStatus,
    setPreferences,
    setTestChecklistItem,
    resetTestChecklist,
    getAllTestsPassed,
    saveProofArtifacts,
    getTodayDigest,
    saveTodayDigest,
    getDigestKey,
  };
}
