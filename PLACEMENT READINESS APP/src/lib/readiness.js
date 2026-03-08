/**
 * Readiness score calculation (0–100)
 * Start 35, +5 per category (max 30), +10 company, +10 role, +10 JD > 800 chars
 */

export function calculateReadinessScore({ company, role, jdText, extractedSkills }) {
  let score = 35;

  const categoryCount = Object.keys(extractedSkills.byCategory || {}).filter(
    (k) => k !== 'general'
  ).length;
  score += Math.min(categoryCount * 5, 30);

  if (company && String(company).trim().length > 0) {
    score += 10;
  }

  if (role && String(role).trim().length > 0) {
    score += 10;
  }

  if (jdText && String(jdText).length > 800) {
    score += 10;
  }

  return Math.min(score, 100);
}
