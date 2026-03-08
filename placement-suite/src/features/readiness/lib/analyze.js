/**
 * Main analysis orchestrator
 */

import { extractSkills } from './skills';
import { generateChecklist } from './checklist';
import { generatePlan } from './plan';
import { generateQuestions } from './questions';
import { calculateReadinessScore } from './readiness';
import { getCompanyIntel } from './companyIntel';
import { getRoundMapping } from './roundMapping';

export function runAnalysis({ company, role, jdText }) {
  const extractedSkills = extractSkills(jdText);
  const checklist = generateChecklist(extractedSkills);
  const plan = generatePlan(extractedSkills);
  const questions = generateQuestions(extractedSkills);
  const readinessScore = calculateReadinessScore({
    company,
    role,
    jdText,
    extractedSkills,
  });

  const companyIntel = getCompanyIntel(company, jdText);
  const roundMapping = getRoundMapping(companyIntel, extractedSkills);

  return {
    extractedSkills,
    checklist,
    plan,
    questions,
    readinessScore,
    companyIntel,
    roundMapping,
  };
}
