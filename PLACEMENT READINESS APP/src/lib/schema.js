/**
 * Standardized Analysis Entry Schema
 * All history entries conform to this structure.
 */

const SKILL_KEYS = ['coreCS', 'languages', 'web', 'data', 'cloud', 'testing', 'other'];
const DEFAULT_OTHER_SKILLS = ['Communication', 'Problem solving', 'Basic coding', 'Projects'];

export function normalizeExtractedSkills(raw) {
  const out = {
    coreCS: [],
    languages: [],
    web: [],
    data: [],
    cloud: [],
    testing: [],
    other: [],
  };

  if (!raw?.byCategory) return out;

  const map = {
    coreCS: 'coreCS',
    languages: 'languages',
    web: 'web',
    data: 'data',
    cloudDevOps: 'cloud',
    testing: 'testing',
    general: 'other',
    other: 'other',
  };

  for (const [key, val] of Object.entries(raw.byCategory)) {
    const target = map[key] || 'other';
    const skills = Array.isArray(val?.skills) ? val.skills : (val?.skills ? [val.skills] : []);
    out[target] = [...(out[target] || []), ...skills];
  }

  if (raw.isGeneralFresher && (!out.other || out.other.length === 0)) {
    out.other = [...DEFAULT_OTHER_SKILLS];
  }

  return out;
}

export function normalizeRoundMapping(raw) {
  if (!Array.isArray(raw)) return [];
  return raw.map((r) => {
    const focusStr = r.focus ?? '';
    const focusAreas = Array.isArray(r.focusAreas) ? r.focusAreas : (focusStr ? focusStr.split(/\+|,/).map((s) => s.trim()).filter(Boolean) : []);
    return {
      roundTitle: r.title ?? r.roundTitle ?? `Round ${r.round ?? ''}`,
      focusAreas: focusAreas.length ? focusAreas : [focusStr || 'Technical assessment'],
      whyItMatters: r.why ?? r.whyItMatters ?? '',
    };
  });
}

export function normalizeChecklist(raw) {
  if (!Array.isArray(raw)) return [];
  return raw.map((r) => ({
    roundTitle: r.title ? `${r.round}: ${r.title}` : r.roundTitle ?? `Round ${r.round}`,
    items: Array.isArray(r.items) ? r.items : [],
  }));
}

export function normalizePlan7Days(raw) {
  if (!Array.isArray(raw)) return [];
  return raw.map((r) => ({
    day: r.day ?? 0,
    focus: r.title ?? r.focus ?? '',
    tasks: Array.isArray(r.items) ? r.items : (Array.isArray(r.tasks) ? r.tasks : []),
  }));
}

export function computeFinalScore(baseScore, skillConfidenceMap) {
  let score = baseScore;
  for (const status of Object.values(skillConfidenceMap || {})) {
    if (status === 'know') score += 2;
    else score -= 2;
  }
  return Math.max(0, Math.min(100, score));
}

export function createAnalysisEntry(partial) {
  const now = new Date().toISOString();
  const extractedSkills = normalizeExtractedSkills(partial.extractedSkills);
  const roundMapping = normalizeRoundMapping(partial.roundMapping);
  const checklist = normalizeChecklist(partial.checklist);
  const plan7Days = normalizePlan7Days(partial.plan ?? partial.plan7Days);
  const questions = Array.isArray(partial.questions) ? partial.questions : [];
  const baseScore = typeof partial.baseScore === 'number' ? partial.baseScore : (partial.readinessScore ?? 35);
  const skillConfidenceMap = partial.skillConfidenceMap ?? {};
  const finalScore = computeFinalScore(baseScore, skillConfidenceMap);

  return {
    id: partial.id ?? `analysis_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
    createdAt: partial.createdAt ?? now,
    updatedAt: partial.updatedAt ?? now,
    company: typeof partial.company === 'string' ? partial.company : '',
    role: typeof partial.role === 'string' ? partial.role : '',
    jdText: typeof partial.jdText === 'string' ? partial.jdText : '',
    extractedSkills,
    roundMapping,
    checklist,
    plan7Days,
    questions,
    baseScore,
    skillConfidenceMap,
    finalScore,
    companyIntel: partial.companyIntel ?? null,
  };
}

export function isEntryValid(entry) {
  if (!entry || typeof entry !== 'object') return false;
  if (!entry.id || typeof entry.jdText !== 'string') return false;
  return true;
}

export function normalizeHistoryEntry(raw) {
  if (!raw || typeof raw !== 'object') return null;
  if (typeof raw.jdText !== 'string') return null;
  try {
    return createAnalysisEntry({
      ...raw,
      extractedSkills: raw.extractedSkills ?? { byCategory: {}, all: [], isGeneralFresher: false },
      roundMapping: raw.roundMapping ?? [],
      checklist: raw.checklist ?? [],
      plan: raw.plan ?? raw.plan7Days ?? [],
      questions: raw.questions ?? [],
      baseScore: raw.baseScore ?? raw.readinessScore ?? 35,
      skillConfidenceMap: raw.skillConfidenceMap ?? {},
    });
  } catch (e) {
    console.error('Failed to normalize entry:', e);
    return null;
  }
}

export function getAllSkillsFromNormalized(extractedSkills) {
  const arr = [];
  for (const key of SKILL_KEYS) {
    const s = extractedSkills?.[key];
    if (Array.isArray(s)) arr.push(...s);
  }
  return [...new Set(arr)];
}

const CATEGORY_LABELS = {
  coreCS: 'Core CS',
  languages: 'Languages',
  web: 'Web',
  data: 'Data',
  cloud: 'Cloud/DevOps',
  testing: 'Testing',
  other: 'Other',
};

export function getSkillsForDisplay(extractedSkills) {
  if (!extractedSkills) return {};
  if (extractedSkills.byCategory) return extractedSkills.byCategory;
  const byCategory = {};
  for (const key of SKILL_KEYS) {
    const skills = extractedSkills[key];
    if (Array.isArray(skills) && skills.length > 0) {
      byCategory[key] = { label: CATEGORY_LABELS[key] || key, skills };
    }
  }
  return byCategory;
}
