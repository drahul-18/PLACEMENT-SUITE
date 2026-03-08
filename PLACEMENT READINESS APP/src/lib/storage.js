/**
 * localStorage persistence for analysis history
 * Uses standardized schema. Handles corrupted entries.
 */

import { createAnalysisEntry, normalizeHistoryEntry, computeFinalScore } from './schema';

const STORAGE_KEY = 'placement_readiness_history';

export function saveAnalysis(entry) {
  const normalized = createAnalysisEntry({
    ...entry,
    baseScore: entry.baseScore ?? entry.readinessScore,
    company: entry.company ?? '',
    role: entry.role ?? '',
    jdText: entry.jdText ?? '',
  });

  const history = getHistory();
  history.unshift(normalized);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    return normalized.id;
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
    return null;
  }
}

let _lastSkippedCount = 0;

export function getHistory() {
  _lastSkippedCount = 0;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    const result = [];

    for (const item of parsed) {
      const normalized = normalizeHistoryEntry(item);
      if (normalized && typeof normalized.jdText === 'string') {
        result.push(normalized);
      } else {
        _lastSkippedCount++;
      }
    }

    if (_lastSkippedCount > 0) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(result));
      } catch (e) {
        console.error('Failed to save cleaned history:', e);
      }
    }

    return result;
  } catch (e) {
    console.error('Failed to read from localStorage:', e);
    return [];
  }
}

export function getLastSkippedCount() {
  return _lastSkippedCount;
}

export function getAnalysisById(id) {
  const history = getHistory();
  return history.find((e) => e.id === id) || null;
}

export function getLatestAnalysis() {
  const history = getHistory();
  return history[0] || null;
}

export function updateStorageEntry(id, updates) {
  const history = getHistory();
  const idx = history.findIndex((e) => e.id === id);
  if (idx === -1) return false;

  const entry = history[idx];
  const now = new Date().toISOString();

  let newEntry = { ...entry, ...updates, updatedAt: now };

  if (updates.skillConfidenceMap !== undefined) {
    newEntry.finalScore = computeFinalScore(entry.baseScore, updates.skillConfidenceMap);
  }

  history[idx] = newEntry;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    return true;
  } catch (e) {
    console.error('Failed to update localStorage:', e);
    return false;
  }
}

