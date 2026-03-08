import type { ResumeData } from '../types/resume';
import { getTotalSkillCount } from '../types/resume';

/** Generate plain-text version of resume for copy */
export function resumeToPlainText(data: ResumeData): string {
  const lines: string[] = [];

  const name = data.personal.name?.trim() || 'Your Name';
  lines.push(name);
  lines.push('');

  const contact: string[] = [];
  if (data.personal.email?.trim()) contact.push(data.personal.email);
  if (data.personal.phone?.trim()) contact.push(data.personal.phone);
  if (data.personal.location?.trim()) contact.push(data.personal.location);
  if (contact.length > 0) {
    lines.push(contact.join(' | '));
    lines.push('');
  }

  if (data.summary?.trim()) {
    lines.push('SUMMARY');
    lines.push('-------');
    lines.push(data.summary.trim());
    lines.push('');
  }

  if (data.education.length > 0) {
    lines.push('EDUCATION');
    lines.push('---------');
    data.education.forEach((edu) => {
      const deg = [edu.degree, edu.field].filter(Boolean).join(' ');
      lines.push(`${deg} — ${edu.institution}`);
      if (edu.startDate || edu.endDate) {
        lines.push(`${edu.startDate || ''} – ${edu.endDate || ''}`);
      }
      lines.push('');
    });
  }

  if (data.experience.length > 0) {
    lines.push('EXPERIENCE');
    lines.push('----------');
    data.experience.forEach((exp) => {
      lines.push(`${exp.role} — ${exp.company}`);
      if (exp.location || exp.startDate || exp.endDate) {
        const meta = [exp.startDate, exp.endDate, exp.location].filter(Boolean).join(' · ');
        lines.push(meta);
      }
      if (exp.description?.trim()) {
        exp.description.split('\n').forEach((line) => {
          if (line.trim()) lines.push(`  • ${line.trim()}`);
        });
      }
      lines.push('');
    });
  }

  if (data.projects.length > 0) {
    lines.push('PROJECTS');
    lines.push('--------');
    data.projects.forEach((proj) => {
      lines.push(proj.name);
      if (proj.githubUrl?.trim()) lines.push(proj.githubUrl);
      if (proj.liveUrl?.trim()) lines.push(proj.liveUrl);
      if (proj.techStack?.length) lines.push(proj.techStack.join(', '));
      if (proj.description?.trim()) {
        proj.description.split('\n').forEach((line) => {
          if (line.trim()) lines.push(`  • ${line.trim()}`);
        });
      }
      lines.push('');
    });
  }

  const totalSkills = getTotalSkillCount(data.skills);
  if (totalSkills > 0) {
    lines.push('SKILLS');
    lines.push('------');
    const allSkills = [
      ...data.skills.technical,
      ...data.skills.soft,
      ...data.skills.tools,
    ];
    lines.push(allSkills.join(', '));
    lines.push('');
  }

  if (data.links.github?.trim() || data.links.linkedin?.trim()) {
    lines.push('LINKS');
    lines.push('-----');
    if (data.links.github?.trim()) lines.push(`GitHub: ${data.links.github}`);
    if (data.links.linkedin?.trim()) lines.push(`LinkedIn: ${data.links.linkedin}`);
  }

  return lines.join('\n').trim();
}

/** Check if resume may look incomplete (validation warning) */
export function isResumeIncomplete(data: ResumeData): boolean {
  const hasName = !!data.personal.name?.trim();
  const hasProjectOrExperience =
    data.projects.length > 0 || data.experience.length > 0;
  return !hasName || !hasProjectOrExperience;
}
