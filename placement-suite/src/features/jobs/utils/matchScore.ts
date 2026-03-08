export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  mode: string;
  experience: string;
  skills: string[];
  source: string;
  postedDaysAgo: number;
  salaryRange: string;
  applyUrl: string;
  description: string;
  matchScore?: number;
}

export interface Preferences {
  roleKeywords: string;
  preferredLocations: string[];
  preferredMode: string[];
  experienceLevel: string;
  skills: string;
  minMatchScore: number;
}

export function computeMatchScore(job: Job, prefs: Preferences | null): number {
  if (!prefs) return 0;
  let score = 0;
  const roleKeywords = (prefs.roleKeywords || '')
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  const userSkills = (prefs.skills || '')
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  const preferredLocations = (prefs.preferredLocations || []).map((l) => l.toLowerCase());
  const preferredMode = (prefs.preferredMode || []).map((m) => m.toLowerCase());

  if (roleKeywords.length > 0) {
    const titleLower = job.title.toLowerCase();
    if (roleKeywords.some((k) => titleLower.includes(k))) score += 25;
  }
  if (roleKeywords.length > 0 && job.description) {
    const descLower = job.description.toLowerCase();
    if (roleKeywords.some((k) => descLower.includes(k))) score += 15;
  }
  if (preferredLocations.length > 0) {
    if (preferredLocations.includes(job.location.toLowerCase())) score += 15;
  }
  if (preferredMode.length > 0) {
    if (preferredMode.includes(job.mode.toLowerCase())) score += 10;
  }
  if (prefs.experienceLevel) {
    if (job.experience.toLowerCase() === prefs.experienceLevel.toLowerCase()) score += 10;
  }
  if (userSkills.length > 0 && job.skills) {
    const jobSkillsLower = job.skills.map((s) => s.toLowerCase());
    const hasOverlap = userSkills.some((us) =>
      jobSkillsLower.some((js) => js.includes(us) || us.includes(js))
    );
    if (hasOverlap) score += 15;
  }
  if (job.postedDaysAgo <= 2) score += 5;
  if (job.source?.toLowerCase() === 'linkedin') score += 5;
  return Math.min(score, 100);
}

export function extractSalaryValue(salaryRange: string): number {
  if (!salaryRange) return 0;
  const match = salaryRange.match(/₹?(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

export function getUniqueValues(jobs: Job[], key: keyof Job): string[] {
  const set = new Set(
    jobs.map((j) => (j as unknown as Record<string, string>)[key]).filter(Boolean)
  );
  return [...set].sort();
}
