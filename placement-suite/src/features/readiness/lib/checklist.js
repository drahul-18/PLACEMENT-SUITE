/**
 * Round-wise preparation checklist (template-based, adapted to detected skills)
 */

const BASE_ITEMS = {
  round1: [
    'Review quantitative aptitude basics (percentages, ratios, time-speed)',
    'Practice logical reasoning and puzzles',
    'Brush up on verbal ability and comprehension',
    'Solve sample aptitude tests under time pressure',
    'Identify weak areas in basics and note them',
    'Practice numerical problem-solving',
    'Review probability and statistics fundamentals',
    'Time management for aptitude sections',
  ],
  round2: [
    'Revise core data structures: arrays, linked lists, trees, graphs',
    'Practice common DSA patterns (two pointers, sliding window)',
    'Solve 5–10 medium LeetCode problems',
    'Review OOP concepts: encapsulation, inheritance, polymorphism',
    'Brush up on OS: processes, threads, scheduling, memory',
    'Review DBMS: normalization, indexing, transactions',
    'Practice coding on paper/whiteboard',
    'Time complexity analysis for solutions',
  ],
  round3: [
    'Prepare 2–3 project descriptions with STAR format',
    'Align resume bullet points with JD requirements',
    'Practice explaining technical decisions in projects',
    'Review system design basics (if applicable)',
    'Prepare for stack-specific deep-dive questions',
    'Practice live coding with clear communication',
    'Prepare questions to ask the interviewer',
    'Review recent project technologies in depth',
  ],
  round4: [
    'Prepare "Tell me about yourself" (2 min version)',
    'List 5 strengths with examples',
    'List 3 weaknesses with improvement steps',
    'Prepare behavioral questions (conflict, failure, teamwork)',
    'Research company culture and values',
    'Prepare salary expectations (if applicable)',
    'Practice professional body language and tone',
    'Prepare questions about role and team',
  ],
};

function getSkillAwareItems(roundKey, skills) {
  const items = [...BASE_ITEMS[roundKey]];
  const extras = [];

  if (skills.coreCS?.skills?.length) {
    if (roundKey === 'round2') {
      extras.push('Focus on DSA topics mentioned in JD');
      if (skills.coreCS.skills.some((s) => /DBMS|SQL/i.test(s))) {
        extras.push('Revise SQL queries and database design');
      }
      if (skills.coreCS.skills.some((s) => /OS|Networks/i.test(s))) {
        extras.push('Review OS and networking concepts');
      }
    }
  }

  if (skills.web?.skills?.length && roundKey === 'round3') {
    const webSkills = skills.web.skills.join(', ');
    extras.push(`Prepare frontend/backend deep-dive for ${webSkills}`);
    if (skills.web.skills.some((s) => /React/i.test(s))) {
      extras.push('Review React lifecycle, hooks, and state management');
    }
  }

  if (skills.data?.skills?.length && roundKey === 'round3') {
    extras.push('Prepare database and query optimization examples');
  }

  if (skills.cloudDevOps?.skills?.length && roundKey === 'round3') {
    extras.push('Prepare cloud/deployment experience examples');
  }

  if (skills.testing?.skills?.length && roundKey === 'round3') {
    extras.push('Prepare testing strategy and automation examples');
  }

  const combined = [...items, ...extras];
  return combined.slice(0, 8);
}

const GENERAL_FRESHER_CHECKLIST = [
  { round: 'Round 1', title: 'Aptitude / Basics', items: ['Practice quantitative aptitude', 'Logical reasoning', 'Verbal ability', 'Time-bound practice tests'] },
  { round: 'Round 2', title: 'Communication + Problem Solving', items: ['Prepare clear explanations', 'Practice approach articulation', 'Basic coding problems', 'Logical puzzles'] },
  { round: 'Round 3', title: 'Projects + Fit', items: ['Document projects with STAR', 'Prepare "tell me about yourself"', 'Research company', 'Prepare questions to ask'] },
];

export function generateChecklist(skills) {
  if (skills.isGeneralFresher) return GENERAL_FRESHER_CHECKLIST;

  return [
    {
      round: 'Round 1',
      title: 'Aptitude / Basics',
      items: getSkillAwareItems('round1', skills.byCategory || {}),
    },
    {
      round: 'Round 2',
      title: 'DSA + Core CS',
      items: getSkillAwareItems('round2', skills.byCategory || {}),
    },
    {
      round: 'Round 3',
      title: 'Tech Interview (Projects + Stack)',
      items: getSkillAwareItems('round3', skills.byCategory || {}),
    },
    {
      round: 'Round 4',
      title: 'Managerial / HR',
      items: getSkillAwareItems('round4', skills.byCategory || {}),
    },
  ];
}
