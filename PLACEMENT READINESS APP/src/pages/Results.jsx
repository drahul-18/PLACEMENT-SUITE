import { useSearchParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { getAnalysisById, getLatestAnalysis, updateStorageEntry } from '../lib/storage';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '../components/ui/card';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle2,
  Calendar,
  HelpCircle,
  Copy,
  Download,
  Check,
  Target,
  Building2,
  GitBranch,
} from 'lucide-react';
import { getCompanyIntel } from '../lib/companyIntel';
import { getRoundMapping } from '../lib/roundMapping';
import {
  getSkillsForDisplay,
  getAllSkillsFromNormalized,
  computeFinalScore,
} from '../lib/schema';

function CircularScore({ value }) {
  const size = 120;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.max(0, Math.min(100, value)) / 100;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#e5e7eb" strokeWidth={strokeWidth} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#4F46E5"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: 'stroke-dashoffset 0.3s ease-in-out' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-gray-900">{Math.round(value)}</span>
        <span className="text-xs text-gray-500">Readiness</span>
      </div>
    </div>
  );
}

function getAllSkills(extractedSkills) {
  if (extractedSkills?.byCategory) {
    const skills = [];
    for (const { skills: s } of Object.values(extractedSkills.byCategory || {})) {
      skills.push(...(s || []));
    }
    return [...new Set(skills)];
  }
  return getAllSkillsFromNormalized(extractedSkills);
}

function formatPlanText(plan) {
  if (!plan?.length) return '';
  return plan
    .map((d) => {
      const title = d.title ?? d.focus ?? '';
      const tasks = d.items ?? d.tasks ?? [];
      return `Day ${d.day}: ${title}\n${tasks.map((i) => `  • ${i}`).join('\n')}`;
    })
    .join('\n\n');
}

function formatChecklistText(checklist) {
  if (!checklist?.length) return '';
  return checklist
    .map((r) => {
      const title = r.roundTitle ?? `${r.round}: ${r.title}`;
      const items = r.items ?? [];
      return `${title}\n${items.map((i) => `  • ${i}`).join('\n')}`;
    })
    .join('\n\n');
}

function formatQuestionsText(questions) {
  if (!questions?.length) return '';
  return questions.map((q, i) => `${i + 1}. ${q}`).join('\n');
}

function formatRoundMappingText(roundMapping) {
  if (!roundMapping?.length) return '';
  return roundMapping
    .map((r, i) => {
      const title = r.roundTitle ?? r.title ?? `Round ${i + 1}`;
      const focus = Array.isArray(r.focusAreas) ? r.focusAreas.join(', ') : (r.focus ?? '');
      const why = r.whyItMatters ?? r.why ?? '';
      return `${title}\n  Focus: ${focus}\n  Why: ${why}`;
    })
    .join('\n\n');
}

export function Results() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const [data, setData] = useState(null);
  const [copiedSection, setCopiedSection] = useState(null);

  useEffect(() => {
    const entry = id ? getAnalysisById(id) : getLatestAnalysis();
    setData(entry);
  }, [id]);

  const updateConfidence = useCallback((skill, status) => {
    setData((prev) => {
      if (!prev?.id) return prev;
      const map = { ...(prev.skillConfidenceMap || {}) };
      map[skill] = status;
      updateStorageEntry(prev.id, { skillConfidenceMap: map });
      return { ...prev, skillConfidenceMap: map };
    });
  }, []);

  const copyToClipboard = async (text, section) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSection(section);
      setTimeout(() => setCopiedSection(null), 1500);
    } catch (e) {
      console.error('Copy failed:', e);
    }
  };

  const downloadTxt = () => {
    if (!data) return;
    const { company, role, extractedSkills, checklist, plan, plan7Days, questions } = data;
    const planForExport = plan7Days ?? plan ?? [];
    const baseScore = data.baseScore ?? data.readinessScore ?? 35;
    const finalScore = data.finalScore ?? computeFinalScore(baseScore, data.skillConfidenceMap);
    const intel = data.companyIntel ?? (company ? getCompanyIntel(company, data.jdText) : null);
    const mapping = data.roundMapping ?? getRoundMapping(intel, extractedSkills);
    const planData = plan7Days ?? plan ?? [];

    const sections = [
      `Placement Readiness Analysis`,
      company ? `Company: ${company}` : '',
      role ? `Role: ${role}` : '',
      `Readiness Score: ${finalScore}`,
      '',
      ...(intel
        ? [
            '--- Company Intel ---',
            `Industry: ${intel.industry}`,
            `Size: ${intel.sizeLabel}`,
            `Hiring Focus: ${intel.hiringFocus}`,
            '',
          ]
        : []),
      '--- Key Skills ---',
      ...Object.entries(getSkillsForDisplay(extractedSkills)).flatMap(([k, val]) => {
        const skills = val?.skills ?? val;
        return Array.isArray(skills) ? [`${val?.label ?? k}: ${skills.join(', ')}`] : [];
      }),
      '',
      ...(mapping?.length ? ['--- Round Mapping ---', formatRoundMappingText(mapping), ''] : []),
      '--- Round-wise Checklist ---',
      formatChecklistText(checklist),
      '',
      '--- 7-Day Plan ---',
      formatPlanText(planForExport),
      '',
      '--- 10 Likely Interview Questions ---',
      formatQuestionsText(questions),
    ];

    const blob = new Blob([sections.filter(Boolean).join('\n\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `placement-readiness-${company || 'analysis'}-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!data) {
    return (
      <div className="space-y-6">
        <Link
          to="/dashboard/assessments"
          className="inline-flex items-center gap-2 text-primary hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Assessments
        </Link>
        <Card>
          <CardContent className="py-12 text-center text-gray-500">
            No analysis found. Analyze a job description first.
          </CardContent>
        </Card>
      </div>
    );
  }

  const { company, role, extractedSkills, checklist, plan, plan7Days, questions } = data;
  const baseScore = data.baseScore ?? data.readinessScore ?? 35;
  const companyIntel = data.companyIntel ?? (company ? getCompanyIntel(company, data.jdText) : null);
  const roundMapping = data.roundMapping ?? getRoundMapping(companyIntel, extractedSkills);
  const skillsForDisplay = getSkillsForDisplay(extractedSkills);
  const skillConfidenceMap = (() => {
    const all = getAllSkills(extractedSkills);
    const map = { ...(data?.skillConfidenceMap || {}) };
    for (const s of all) {
      if (map[s] === undefined) map[s] = 'practice';
    }
    return map;
  })();
  const finalScore = data.finalScore ?? computeFinalScore(baseScore, skillConfidenceMap);
  const weakSkills = getAllSkills(extractedSkills).filter(
    (s) => (skillConfidenceMap[s] || 'practice') === 'practice'
  );
  const top3Weak = weakSkills.slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link
          to="/dashboard/assessments"
          className="inline-flex items-center gap-2 text-primary hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Assessments
        </Link>
        <Link
          to="/dashboard/history"
          className="text-sm text-gray-600 hover:text-primary"
        >
          View History
        </Link>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        {company && <span className="text-gray-600">{company}</span>}
        {role && <span className="text-gray-600">• {role}</span>}
      </div>

      {companyIntel && (
        <Card className="border-primary-light/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" />
              Company Intel
            </CardTitle>
            <p className="text-xs text-gray-500">Demo Mode: Company intel generated heuristically.</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase">Company</p>
                <p className="font-medium text-gray-900">{companyIntel.companyName}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase">Industry</p>
                <p className="text-gray-600">{companyIntel.industry}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase">Estimated Size</p>
                <p className="text-gray-600">{companyIntel.sizeLabel}</p>
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase mb-1">Typical Hiring Focus</p>
              <p className="text-gray-600 text-sm">{companyIntel.hiringFocus}</p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Readiness Score */}
        <Card>
          <CardHeader>
            <CardTitle>Readiness Score</CardTitle>
            <p className="text-sm text-gray-500">Updates as you mark skills</p>
          </CardHeader>
          <CardContent className="flex justify-center">
            <CircularScore value={finalScore} />
          </CardContent>
        </Card>

        {/* Key Skills Extracted — with toggles */}
        <Card>
          <CardHeader>
            <CardTitle>Key Skills Extracted</CardTitle>
            <p className="text-sm text-gray-500">Toggle your confidence per skill</p>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {Object.entries(skillsForDisplay).map(([key, { label, skills }]) => (
                <div key={key}>
                  <span className="text-xs font-medium text-gray-500 uppercase">{label}</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {skills.map((s) => {
                      const status = skillConfidenceMap[s] || 'practice';
                      return (
                        <div
                          key={s}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-md border border-gray-200 bg-gray-50"
                        >
                          <span className="text-sm text-gray-800">{s}</span>
                          <div className="flex gap-0.5 ml-1">
                            <button
                              onClick={() => updateConfidence(s, 'know')}
                              className={`px-1.5 py-0.5 text-xs rounded transition-colors ${
                                status === 'know'
                                  ? 'bg-green-100 text-green-800'
                                  : 'text-gray-500 hover:bg-gray-100'
                              }`}
                              title="I know this"
                            >
                              Know
                            </button>
                            <button
                              onClick={() => updateConfidence(s, 'practice')}
                              className={`px-1.5 py-0.5 text-xs rounded transition-colors ${
                                status === 'practice'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'text-gray-500 hover:bg-gray-100'
                              }`}
                              title="Need practice"
                            >
                              Practice
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Round Mapping — vertical timeline */}
        {roundMapping?.length > 0 && (
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitBranch className="w-5 h-5" />
                Round Mapping
              </CardTitle>
              <p className="text-sm text-gray-500">Expected flow based on company size and detected skills</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-0">
                {roundMapping.map((r, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center shrink-0">
                      <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center text-primary font-semibold">
                        {i + 1}
                      </div>
                      {i < roundMapping.length - 1 && (
                        <div className="w-0.5 flex-1 min-h-[20px] bg-gray-200 my-1" />
                      )}
                    </div>
                    <div className="pb-8 last:pb-0">
                      <h4 className="font-semibold text-gray-900">{r.roundTitle ?? r.title}</h4>
                      <p className="text-sm text-primary mt-0.5">
                        {(Array.isArray(r.focusAreas) ? r.focusAreas : [r.focus]).filter(Boolean).join(' + ')}
                      </p>
                      <p className="text-sm text-gray-500 mt-2">Why this round matters: {r.whyItMatters ?? r.why}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Round-wise Checklist + Export */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              Round-wise Preparation Checklist
            </CardTitle>
            <button
              onClick={() => copyToClipboard(formatChecklistText(checklistData), 'checklist')}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {copiedSection === 'checklist' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              Copy round checklist
            </button>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {checklistData?.map((round, idx) => (
                <div key={idx}>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {round.roundTitle ?? `${round.round}: ${round.title}`}
                  </h4>
                  <ul className="space-y-1">
                    {(round.items ?? []).map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-600">
                        <span className="text-primary mt-0.5">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 7-day Plan + Export */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              7-Day Preparation Plan
            </CardTitle>
            <button
              onClick={() => copyToClipboard(formatPlanText(plan), 'plan')}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {copiedSection === 'plan' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              Copy 7-day plan
            </button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {planData?.map((day) => (
                <div
                  key={day.day}
                  className="p-4 border border-gray-200 rounded-lg bg-gray-50"
                >
                  <h4 className="font-semibold text-gray-900 mb-2">Day {day.day}</h4>
                  <p className="text-sm text-gray-600 mb-2">{day.title ?? day.focus}</p>
                  <ul className="space-y-1 text-sm text-gray-600">
                    {(day.items ?? day.tasks ?? []).map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 10 Likely Questions + Export */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5" />
              10 Likely Interview Questions
            </CardTitle>
            <button
              onClick={() => copyToClipboard(formatQuestionsText(questions), 'questions')}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {copiedSection === 'questions' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              Copy 10 questions
            </button>
          </CardHeader>
          <CardContent>
            <ol className="space-y-2">
              {questions?.map((q, i) => (
                <li key={i} className="flex gap-2 text-gray-700">
                  <span className="font-medium text-primary shrink-0">{i + 1}.</span>
                  {q}
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        {/* Export: Download as TXT */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Export</CardTitle>
          </CardHeader>
          <CardContent>
            <button
              onClick={downloadTxt}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors"
            >
              <Download className="w-5 h-5" />
              Download as TXT
            </button>
          </CardContent>
        </Card>

        {/* Action Next */}
        <Card className="lg:col-span-2 border-primary-light bg-primary-light/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Action Next
            </CardTitle>
          </CardHeader>
          <CardContent>
            {top3Weak.length > 0 ? (
              <>
                <p className="text-sm text-gray-600 mb-3">Top weak areas (need practice):</p>
                <ul className="space-y-1 mb-4">
                  {top3Weak.map((s) => (
                    <li key={s} className="text-gray-800 font-medium">
                      • {s}
                    </li>
                  ))}
                </ul>
                <p className="text-primary font-medium">Start Day 1 plan now.</p>
              </>
            ) : (
              <p className="text-gray-600">All skills marked as known. Keep revising and stay confident.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
