const ACTION_VERBS = [
  'built',
  'developed',
  'designed',
  'implemented',
  'led',
  'improved',
  'created',
  'optimized',
  'automated',
  'managed',
  'delivered',
  'established',
  'launched',
  'reduced',
  'increased',
  'achieved',
  'coordinated',
  'architected',
];

function hasMeasurableImpact(text: string): boolean {
  return /[\d%]|\bk\b/i.test(text);
}

function startsWithActionVerb(text: string): boolean {
  const firstWord = text.trim().split(/\s+/)[0]?.toLowerCase();
  return !!firstWord && ACTION_VERBS.includes(firstWord);
}

/** Split description into bullet lines (non-empty) */
export function getBullets(text: string): string[] {
  return (text || '')
    .split(/\n/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/** Check if any bullet lacks action verb */
export function needsActionVerb(text: string): boolean {
  const bullets = getBullets(text);
  if (bullets.length === 0) return false;
  return bullets.some((b) => !startsWithActionVerb(b));
}

/** Check if text has no measurable impact */
export function needsMeasurableImpact(text: string): boolean {
  const bullets = getBullets(text);
  if (bullets.length === 0) return false;
  return !bullets.some((b) => hasMeasurableImpact(b));
}
