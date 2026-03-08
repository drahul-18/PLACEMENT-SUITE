import type { ResumeData } from '../types/resume';
import { getTotalSkillCount } from '../types/resume';

const ACTION_VERBS = [
  'built',
  'led',
  'designed',
  'improved',
  'developed',
  'created',
  'implemented',
  'managed',
  'delivered',
  'achieved',
  'optimized',
  'launched',
];

function summaryHasActionVerbs(summary: string): boolean {
  const lower = summary.toLowerCase();
  return ACTION_VERBS.some((verb) => lower.includes(verb));
}

function hasExperienceWithBullets(data: ResumeData): boolean {
  return data.experience.some((e) => e.description?.trim().length > 0);
}

function hasEducationEntry(data: ResumeData): boolean {
  return data.education.length > 0;
}

export function computeATSScore(data: ResumeData): number {
  let score = 0;

  if (data.personal.name?.trim()) score += 10;
  if (data.personal.email?.trim()) score += 10;
  if (data.summary?.trim().length > 50) score += 10;
  if (hasExperienceWithBullets(data)) score += 15;
  if (hasEducationEntry(data)) score += 10;
  if (getTotalSkillCount(data.skills) >= 5) score += 10;
  if (data.projects.length >= 1) score += 10;
  if (data.personal.phone?.trim()) score += 5;
  if (data.links.linkedin?.trim()) score += 5;
  if (data.links.github?.trim()) score += 5;
  if (summaryHasActionVerbs(data.summary)) score += 10;

  return Math.min(score, 100);
}

export type ATSScoreLabel = 'Needs Work' | 'Getting There' | 'Strong Resume';

export function getATSScoreLabel(score: number): ATSScoreLabel {
  if (score <= 40) return 'Needs Work';
  if (score <= 70) return 'Getting There';
  return 'Strong Resume';
}

export function getATSScoreTier(score: number): 'red' | 'amber' | 'green' {
  if (score <= 40) return 'red';
  if (score <= 70) return 'amber';
  return 'green';
}

export interface ATSImprovement {
  message: string;
  points: number;
}

export function getATSImprovements(data: ResumeData): ATSImprovement[] {
  const improvements: ATSImprovement[] = [];

  if (!data.personal.name?.trim()) {
    improvements.push({ message: 'Add your name', points: 10 });
  }
  if (!data.personal.email?.trim()) {
    improvements.push({ message: 'Add your email', points: 10 });
  }
  if (!data.summary?.trim() || data.summary.trim().length <= 50) {
    improvements.push({ message: 'Add a professional summary (50+ chars)', points: 10 });
  }
  if (!summaryHasActionVerbs(data.summary)) {
    improvements.push({ message: 'Use action verbs in summary (built, led, designed, etc.)', points: 10 });
  }
  if (!hasExperienceWithBullets(data)) {
    improvements.push({ message: 'Add at least 1 experience entry with bullets', points: 15 });
  }
  if (!hasEducationEntry(data)) {
    improvements.push({ message: 'Add at least 1 education entry', points: 10 });
  }
  if (getTotalSkillCount(data.skills) < 5) {
    improvements.push({ message: 'Add at least 5 skills', points: 10 });
  }
  if (data.projects.length < 1) {
    improvements.push({ message: 'Add at least 1 project', points: 10 });
  }
  if (!data.personal.phone?.trim()) {
    improvements.push({ message: 'Add your phone number', points: 5 });
  }
  if (!data.links.linkedin?.trim()) {
    improvements.push({ message: 'Add LinkedIn link', points: 5 });
  }
  if (!data.links.github?.trim()) {
    improvements.push({ message: 'Add GitHub link', points: 5 });
  }

  return improvements;
}

