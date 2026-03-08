/**
 * Test Checklist — localStorage persistence
 */

const STORAGE_KEY = 'placement_readiness_test_checklist';

export const TEST_ITEMS = [
  { id: 'jd-required', label: 'JD required validation works', hint: 'Go to Assessments, leave JD empty, click Analyze. Error should appear.' },
  { id: 'short-jd-warning', label: 'Short JD warning shows for <200 chars', hint: 'Paste fewer than 200 characters in JD. Warning banner should appear.' },
  { id: 'skills-extraction', label: 'Skills extraction groups correctly', hint: 'Paste sample JD with DSA, React, SQL. Check Results shows skills by category.' },
  { id: 'round-mapping', label: 'Round mapping changes based on company + skills', hint: 'Try Amazon + DSA vs unknown company + React. Round flow should differ.' },
  { id: 'score-deterministic', label: 'Score calculation is deterministic', hint: 'Same JD + company + role should yield same base score every time.' },
  { id: 'skill-toggles', label: 'Skill toggles update score live', hint: 'On Results, click Know/Practice on skills. Score should update immediately.' },
  { id: 'persist-refresh', label: 'Changes persist after refresh', hint: 'Toggle skills, refresh page. Toggles and score should remain.' },
  { id: 'history-saves', label: 'History saves and loads correctly', hint: 'Analyze a JD, go to History. Entry should appear. Click it to open Results.' },
  { id: 'export-buttons', label: 'Export buttons copy the correct content', hint: 'Use Copy 7-day plan, Copy checklist, Copy questions. Paste elsewhere to verify.' },
  { id: 'no-console-errors', label: 'No console errors on core pages', hint: 'Open DevTools Console. Visit /, /dashboard, /dashboard/assessments, /dashboard/results. No red errors.' },
];

function getStored() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return typeof parsed === 'object' ? parsed : {};
  } catch (e) {
    console.error('Failed to read test checklist:', e);
    return {};
  }
}

export function getTestChecklist() {
  const stored = getStored();
  return TEST_ITEMS.map((item) => ({
    ...item,
    checked: !!stored[item.id],
  }));
}

export function setTestChecklistItem(id, checked) {
  const stored = getStored();
  stored[id] = checked;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    return true;
  } catch (e) {
    console.error('Failed to save test checklist:', e);
    return false;
  }
}

export function resetTestChecklist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({}));
    return true;
  } catch (e) {
    console.error('Failed to reset test checklist:', e);
    return false;
  }
}

export function isAllTestsPassed() {
  const stored = getStored();
  return TEST_ITEMS.every((item) => !!stored[item.id]);
}
