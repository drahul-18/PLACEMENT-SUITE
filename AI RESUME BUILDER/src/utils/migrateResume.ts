import type { ResumeData, ProjectEntry } from '../types/resume';
import { emptyResume } from '../types/resume';

/** Migrate old localStorage format to new structure */
export function migrateResume(parsed: unknown): ResumeData {
  if (!parsed || typeof parsed !== 'object') return emptyResume();

  const p = parsed as Record<string, unknown>;
  const base = emptyResume();

  const personal = p.personal as ResumeData['personal'] | undefined;
  if (personal && typeof personal === 'object') {
    base.personal = { ...base.personal, ...personal };
  }

  if (typeof p.summary === 'string') base.summary = p.summary;
  if (Array.isArray(p.education)) base.education = p.education as ResumeData['education'];
  if (Array.isArray(p.experience)) base.experience = p.experience as ResumeData['experience'];

  if (Array.isArray(p.projects)) {
    base.projects = (p.projects as unknown[]).map((proj) => {
      const old = proj as Record<string, unknown>;
      const entry: ProjectEntry = {
        id: typeof old.id === 'string' ? old.id : crypto.randomUUID(),
        name: typeof old.name === 'string' ? old.name : '',
        description: typeof old.description === 'string' ? old.description : '',
        techStack: Array.isArray(old.techStack) ? (old.techStack as string[]) : [],
        liveUrl: typeof old.liveUrl === 'string' ? old.liveUrl : '',
        githubUrl: typeof old.githubUrl === 'string' ? old.githubUrl : (typeof old.url === 'string' ? old.url : ''),
      };
      return entry;
    });
  }

  if (p.skills) {
    if (typeof p.skills === 'object' && 'technical' in p.skills) {
      const s = p.skills as ResumeData['skills'];
      base.skills = {
        technical: Array.isArray(s.technical) ? s.technical : [],
        soft: Array.isArray(s.soft) ? s.soft : [],
        tools: Array.isArray(s.tools) ? s.tools : [],
      };
    } else if (Array.isArray(p.skills)) {
      base.skills = { technical: p.skills as string[], soft: [], tools: [] };
    }
  }

  const links = p.links as ResumeData['links'] | undefined;
  if (links && typeof links === 'object') {
    base.links = { ...base.links, ...links };
  }

  return base;
}
