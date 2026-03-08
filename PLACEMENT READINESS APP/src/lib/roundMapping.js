/**
 * Round Mapping Engine — dynamic rounds based on company size + detected skills
 */

const ROUND_TEMPLATES = {
  enterprise: {
    hasDSA: [
      { round: 1, title: 'Online Test', focus: 'DSA + Aptitude', why: 'Filters for fundamentals before technical deep-dive.' },
      { round: 2, title: 'Technical', focus: 'DSA + Core CS', why: 'Validates problem-solving and CS concepts.' },
      { round: 3, title: 'Tech + Projects', focus: 'System design + Experience', why: 'Assesses real-world application and design thinking.' },
      { round: 4, title: 'HR', focus: 'Culture fit + Behavioural', why: 'Final alignment on values and expectations.' },
    ],
    hasWeb: [
      { round: 1, title: 'Online Test', focus: 'Coding + Aptitude', why: 'Initial screening for technical and logical ability.' },
      { round: 2, title: 'Technical', focus: 'Frontend/Backend + DSA', why: 'Deep-dive into stack and problem-solving.' },
      { round: 3, title: 'System Design', focus: 'Architecture + Scalability', why: 'Evaluates design and scalability thinking.' },
      { round: 4, title: 'HR', focus: 'Culture fit', why: 'Final behavioural and cultural assessment.' },
    ],
    default: [
      { round: 1, title: 'Online Test', focus: 'Aptitude + Basics', why: 'Screens for foundational skills.' },
      { round: 2, title: 'Technical', focus: 'Core CS + Coding', why: 'Validates technical depth.' },
      { round: 3, title: 'Projects + HR', focus: 'Experience + Fit', why: 'Assesses fit and past work.' },
    ],
  },
  midSize: {
    hasDSA: [
      { round: 1, title: 'Technical Screen', focus: 'DSA + Core', why: 'Quick validation of fundamentals.' },
      { round: 2, title: 'Technical Deep-dive', focus: 'Projects + Design', why: 'Explores experience and approach.' },
      { round: 3, title: 'Culture + HR', focus: 'Team fit', why: 'Ensures mutual alignment.' },
    ],
    hasWeb: [
      { round: 1, title: 'Practical Coding', focus: 'Stack + Problem-solving', why: 'Tests hands-on ability.' },
      { round: 2, title: 'System Discussion', focus: 'Architecture + Trade-offs', why: 'Evaluates design thinking.' },
      { round: 3, title: 'Culture Fit', focus: 'Values + Collaboration', why: 'Assesses team fit.' },
    ],
    default: [
      { round: 1, title: 'Technical', focus: 'Coding + Basics', why: 'Initial technical assessment.' },
      { round: 2, title: 'Experience + HR', focus: 'Projects + Fit', why: 'Combined technical and cultural round.' },
    ],
  },
  startup: {
    hasDSA: [
      { round: 1, title: 'Coding Round', focus: 'DSA + Logic', why: 'Practical problem-solving under constraints.' },
      { round: 2, title: 'Technical + Projects', focus: 'Experience + Approach', why: 'Understands how you build and think.' },
      { round: 3, title: 'Culture Fit', focus: 'Values + Growth', why: 'Startups prioritize alignment and adaptability.' },
    ],
    hasWeb: [
      { round: 1, title: 'Practical Coding', focus: 'React/Node + Build', why: 'Tests what you can ship quickly.' },
      { round: 2, title: 'System Discussion', focus: 'Architecture + Decisions', why: 'Evaluates technical judgment.' },
      { round: 3, title: 'Culture Fit', focus: 'Ownership + Learning', why: 'Assesses startup mindset.' },
    ],
    default: [
      { round: 1, title: 'Practical Coding', focus: 'Problem-solving + Stack', why: 'Fast validation of hands-on skills.' },
      { round: 2, title: 'Culture Fit', focus: 'Values + Collaboration', why: 'Ensures team alignment.' },
    ],
  },
};

function getAllSkillsFromExtracted(extractedSkills) {
  if (extractedSkills?.all?.length) return extractedSkills.all;
  const flat = extractedSkills?.coreCS ?? extractedSkills?.languages ?? extractedSkills?.web
    ? extractedSkills
    : null;
  if (flat) {
    const arr = [];
    for (const key of ['coreCS', 'languages', 'web', 'data', 'cloud', 'testing', 'other']) {
      const s = flat[key];
      if (Array.isArray(s)) arr.push(...s);
    }
    return arr;
  }
  return [];
}

export function getRoundMapping(companyIntel, extractedSkills) {
  const size = companyIntel?.sizeCategory || 'Startup';
  const skills = extractedSkills?.byCategory || {};
  const allSkills = getAllSkillsFromExtracted(extractedSkills);

  const coreCS = skills.coreCS?.skills ?? extractedSkills?.coreCS ?? [];
  const web = skills.web?.skills ?? extractedSkills?.web ?? [];
  const hasDSA = !!(
    coreCS.some((s) => /DSA|Algorithms|Data Structures/i.test(s)) ||
    allSkills.some((s) => /DSA|Algorithms|Data Structures/i.test(s))
  );
  const hasWeb = !!(
    web.length > 0 ||
    allSkills.some((s) => /React|Node|Express|JavaScript|TypeScript/i.test(s))
  );

  const templates = ROUND_TEMPLATES[size] || ROUND_TEMPLATES.startup;
  let rounds;

  if (hasDSA && hasWeb) {
    rounds = templates.hasWeb || templates.hasDSA || templates.default;
  } else if (hasDSA) {
    rounds = templates.hasDSA || templates.default;
  } else if (hasWeb) {
    rounds = templates.hasWeb || templates.default;
  } else {
    rounds = templates.default;
  }

  return rounds;
}
