/**
 * Company Intel — heuristic inference (no external scraping)
 */

const ENTERPRISE_COMPANIES = [
  'amazon', 'google', 'microsoft', 'meta', 'apple', 'netflix',
  'infosys', 'tcs', 'wipro', 'hcl', 'cognizant', 'accenture',
  'capgemini', 'ibm', 'oracle', 'sap', 'salesforce', 'adobe',
  'intel', 'nvidia', 'qualcomm', 'cisco', 'vmware', 'dell',
  'hp', 'dell', 'jpmorgan', 'goldman', 'morgan stanley',
  'deloitte', 'ey', 'kpmg', 'pwc', 'tata', 'mahindra',
];

const MID_SIZE_KEYWORDS = ['consulting', 'agency', 'outsourcing', 'services'];

export function getCompanyIntel(companyName, jdText = '') {
  if (!companyName || typeof companyName !== 'string') {
    return null;
  }

  const name = companyName.trim();
  if (!name) return null;

  const nameLower = name.toLowerCase();
  const jdLower = (jdText || '').toLowerCase();

  const isEnterprise = ENTERPRISE_COMPANIES.some((c) =>
    nameLower.includes(c) || c.includes(nameLower)
  );
  const hasMidSizeKeyword = MID_SIZE_KEYWORDS.some((k) =>
    nameLower.includes(k) || jdLower.includes(k)
  );

  let sizeCategory = 'Startup';
  let sizeLabel = 'Startup (<200)';
  if (isEnterprise) {
    sizeCategory = 'Enterprise';
    sizeLabel = 'Enterprise (2000+)';
  } else if (hasMidSizeKeyword) {
    sizeCategory = 'Mid-size';
    sizeLabel = 'Mid-size (200–2000)';
  }

  let industry = 'Technology Services';
  if (jdLower.includes('fintech') || jdLower.includes('banking') || jdLower.includes('finance')) {
    industry = 'Financial Technology';
  } else if (jdLower.includes('healthcare') || jdLower.includes('medical')) {
    industry = 'Healthcare Technology';
  } else if (jdLower.includes('ecommerce') || jdLower.includes('retail')) {
    industry = 'E-commerce';
  } else if (jdLower.includes('edtech') || jdLower.includes('education')) {
    industry = 'EdTech';
  }

  let hiringFocus = '';
  if (sizeCategory === 'Enterprise') {
    hiringFocus = 'Structured DSA rounds, core CS fundamentals, and systematic technical evaluation. Expect multiple rounds with clear separation of aptitude, coding, and system design.';
  } else if (sizeCategory === 'Mid-size') {
    hiringFocus = 'Balanced mix of problem-solving, domain knowledge, and cultural fit. Often fewer rounds with broader scope per round.';
  } else {
    hiringFocus = 'Practical problem-solving, stack depth, and hands-on coding. Expect faster process with emphasis on what you can build.';
  }

  return {
    companyName: name,
    industry,
    sizeCategory,
    sizeLabel,
    hiringFocus,
  };
}
