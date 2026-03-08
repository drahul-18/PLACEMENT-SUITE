/**
 * 7-day preparation plan (adaptive based on detected skills)
 */

const BASE_PLAN = [
  { day: 1, title: 'Basics + Core CS', items: ['Review OOP, DBMS, OS basics', 'Solve 2–3 aptitude problems', 'Note weak topics'] },
  { day: 2, title: 'Core CS continued', items: ['Deep dive into weak core topics', 'Practice logical reasoning', 'Review computer networks basics'] },
  { day: 3, title: 'DSA + Coding', items: ['Arrays and strings problems', 'Linked list and tree basics', 'Solve 3–5 LeetCode easy'] },
  { day: 4, title: 'DSA Practice', items: ['Graphs and dynamic programming', 'Solve 3–5 medium problems', 'Time complexity practice'] },
  { day: 5, title: 'Project + Resume', items: ['Update resume to match JD', 'Prepare project descriptions', 'Align tech stack with requirements'] },
  { day: 6, title: 'Mock Interview', items: ['Practice mock tech questions', 'Record and review answers', 'Prepare behavioral stories'] },
  { day: 7, title: 'Revision + Weak Areas', items: ['Revise weak topics', 'Quick DSA revision', 'Rest and stay confident'] },
];

const GENERAL_FRESHER_PLAN = [
  { day: 1, title: 'Communication + Basics', items: ['Practice clear explanations', 'Review basic programming concepts', 'Prepare "tell me about yourself"'] },
  { day: 2, title: 'Problem Solving', items: ['Practice logical puzzles', 'Solve 2–3 basic coding problems', 'Work on approach articulation'] },
  { day: 3, title: 'Basic Coding', items: ['Arrays and loops practice', 'String manipulation basics', 'Simple algorithm patterns'] },
  { day: 4, title: 'Projects', items: ['Document 1–2 projects clearly', 'Prepare STAR format stories', 'Align projects with role'] },
  { day: 5, title: 'Resume + Prep', items: ['Update resume', 'Prepare for common questions', 'Research company'] },
  { day: 6, title: 'Mock Practice', items: ['Practice mock interview', 'Record and review', 'Work on weak areas'] },
  { day: 7, title: 'Revision', items: ['Quick revision of basics', 'Rest and stay confident', 'Review key points'] },
];

export function generatePlan(skills) {
  if (skills.isGeneralFresher) return GENERAL_FRESHER_PLAN.map((d) => ({ ...d, items: [...d.items] }));

  const plan = BASE_PLAN.map((d) => ({ ...d, items: [...d.items] }));

  const hasReact = skills.all?.some((s) => /React/i.test(s));
  const hasWeb = skills.byCategory?.web;
  const hasData = skills.byCategory?.data;
  const hasCloud = skills.byCategory?.cloudDevOps;

  if (hasReact || hasWeb) {
    plan[4].items.push('Frontend/framework revision');
    plan[5].items.push('Prepare React/Web-specific questions');
  }

  if (hasData) {
    plan[1].items.push('SQL and database basics');
    plan[5].items.push('Database design and query questions');
  }

  if (hasCloud) {
    plan[4].items.push('Cloud/DevOps experience alignment');
    plan[5].items.push('Deployment and CI/CD questions');
  }

  return plan;
}
