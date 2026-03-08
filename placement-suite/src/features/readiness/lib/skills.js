/**
 * Skill extraction from JD text (heuristic, case-insensitive)
 */

const SKILL_CATEGORIES = {
  coreCS: {
    label: 'Core CS',
    keywords: ['DSA', 'OOP', 'DBMS', 'OS', 'Networks', 'Data Structures', 'Algorithms', 'Operating System', 'Computer Networks'],
  },
  languages: {
    label: 'Languages',
    keywords: ['Java', 'Python', 'JavaScript', 'TypeScript', 'C', 'C++', 'C#', 'Go', 'Rust', 'Kotlin', 'Swift'],
  },
  web: {
    label: 'Web',
    keywords: ['React', 'Next.js', 'Node.js', 'Express', 'REST', 'GraphQL', 'Angular', 'Vue', 'HTML', 'CSS'],
  },
  data: {
    label: 'Data',
    keywords: ['SQL', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'NoSQL', 'Elasticsearch'],
  },
  cloudDevOps: {
    label: 'Cloud/DevOps',
    keywords: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'CI/CD', 'Linux', 'Terraform', 'Jenkins', 'Git'],
  },
  testing: {
    label: 'Testing',
    keywords: ['Selenium', 'Cypress', 'Playwright', 'JUnit', 'PyTest', 'Jest', 'Mocha', 'Unit Testing'],
  },
};

export function extractSkills(jdText) {
  if (!jdText || typeof jdText !== 'string') {
    return { byCategory: {}, all: [], isGeneralFresher: true };
  }

  const text = jdText.toLowerCase();
  const byCategory = {};
  const all = [];

  for (const [key, { label, keywords }] of Object.entries(SKILL_CATEGORIES)) {
    const found = keywords.filter((kw) => {
      const pattern = new RegExp(`\\b${kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
      return pattern.test(text);
    });
    if (found.length > 0) {
      byCategory[key] = { label, skills: found };
      all.push(...found);
    }
  }

  const isGeneralFresher = Object.keys(byCategory).length === 0;
  if (isGeneralFresher) {
    byCategory.other = {
      label: 'Other',
      skills: ['Communication', 'Problem solving', 'Basic coding', 'Projects'],
    };
  }

  return { byCategory, all: [...new Set(all)], isGeneralFresher };
}
