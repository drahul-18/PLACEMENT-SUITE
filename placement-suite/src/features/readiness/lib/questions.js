/**
 * Generate 10 likely interview questions based on detected skills
 */

const QUESTION_TEMPLATES = {
  DSA: [
    'How would you optimize search in sorted data?',
    'Explain the trade-offs between different sorting algorithms.',
    'How would you detect a cycle in a linked list?',
    'Explain when to use a hash map vs. array for lookups.',
    'How would you find the longest substring without repeating characters?',
  ],
  OOP: [
    'Explain the difference between abstraction and encapsulation.',
    'When would you use composition over inheritance?',
    'Explain polymorphism with a real-world example.',
  ],
  DBMS: [
    'Explain indexing and when it helps.',
    'What is normalization and when would you denormalize?',
    'Explain ACID properties and transaction isolation levels.',
  ],
  SQL: [
    'Write a query to find the second highest salary.',
    'Explain the difference between INNER JOIN and LEFT JOIN.',
    'How would you optimize a slow-running query?',
  ],
  React: [
    'Explain state management options in React.',
    'What is the virtual DOM and how does reconciliation work?',
    'When would you use useMemo vs useCallback?',
  ],
  JavaScript: [
    'Explain event loop and async behavior in JavaScript.',
    'What is the difference between var, let, and const?',
    'Explain closures with a practical example.',
  ],
  Python: [
    'Explain the difference between list and tuple.',
    'What are decorators and how do you use them?',
    'Explain the GIL and its impact on multithreading.',
  ],
  Java: [
    'Explain the difference between ArrayList and LinkedList.',
    'What is the JVM and how does garbage collection work?',
    'Explain the difference between == and equals().',
  ],
  SystemDesign: [
    'How would you design a URL shortener?',
    'Explain load balancing and when to use it.',
    'How would you scale a read-heavy application?',
  ],
  AWS: [
    'Explain the difference between S3 and EBS.',
    'When would you use Lambda vs EC2?',
    'How would you design for high availability?',
  ],
  Docker: [
    'Explain the difference between Docker and Kubernetes.',
    'What is a Dockerfile and what are best practices?',
    'How would you reduce Docker image size?',
  ],
  general: [
    'Tell me about a challenging project you worked on.',
    'How do you handle disagreements in a team?',
    'Describe a time you learned from failure.',
  ],
};

const GENERAL_FRESHER_QUESTIONS = [
  'Tell me about yourself and your background.',
  'Describe a project you are proud of.',
  'How do you approach a problem you have not seen before?',
  'What are your strengths and weaknesses?',
  'How do you handle working in a team?',
  'Explain a technical concept to a non-technical person.',
  'What interests you about this role?',
  'Where do you see yourself in 5 years?',
  'Describe a time you overcame a challenge.',
  'What questions do you have for us?',
];

export function generateQuestions(skills) {
  if (skills.isGeneralFresher) return GENERAL_FRESHER_QUESTIONS;

  const questions = new Set();

  if (skills.byCategory?.coreCS?.skills?.some((s) => /DSA|Algorithms|Data Structures/i.test(s))) {
    QUESTION_TEMPLATES.DSA.slice(0, 2).forEach((q) => questions.add(q));
  }
  if (skills.byCategory?.coreCS?.skills?.some((s) => /OOP/i.test(s))) {
    QUESTION_TEMPLATES.OOP.slice(0, 2).forEach((q) => questions.add(q));
  }
  if (skills.byCategory?.coreCS || skills.byCategory?.data) {
    QUESTION_TEMPLATES.DBMS.slice(0, 2).forEach((q) => questions.add(q));
  }
  if (skills.byCategory?.data) {
    QUESTION_TEMPLATES.SQL.forEach((q) => questions.add(q));
  }
  if (skills.byCategory?.web?.skills?.some((s) => /React/i.test(s))) {
    QUESTION_TEMPLATES.React.forEach((q) => questions.add(q));
  }
  if (skills.byCategory?.languages?.skills?.some((s) => /JavaScript/i.test(s))) {
    QUESTION_TEMPLATES.JavaScript.slice(0, 2).forEach((q) => questions.add(q));
  }
  if (skills.byCategory?.languages?.skills?.some((s) => /Python/i.test(s))) {
    QUESTION_TEMPLATES.Python.slice(0, 2).forEach((q) => questions.add(q));
  }
  if (skills.byCategory?.languages?.skills?.some((s) => /Java/i.test(s))) {
    QUESTION_TEMPLATES.Java.slice(0, 2).forEach((q) => questions.add(q));
  }
  if (skills.byCategory?.cloudDevOps?.skills?.some((s) => /AWS/i.test(s))) {
    QUESTION_TEMPLATES.AWS.slice(0, 2).forEach((q) => questions.add(q));
  }
  if (skills.byCategory?.cloudDevOps?.skills?.some((s) => /Docker|Kubernetes/i.test(s))) {
    QUESTION_TEMPLATES.Docker.slice(0, 2).forEach((q) => questions.add(q));
  }

  const arr = [...questions];
  while (arr.length < 10) {
    for (const q of QUESTION_TEMPLATES.general) {
      if (arr.length >= 10) break;
      arr.push(q);
    }
    if (arr.length >= 10) break;
  }

  return arr.slice(0, 10);
}
