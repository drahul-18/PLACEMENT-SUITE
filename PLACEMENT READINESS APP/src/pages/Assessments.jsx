import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '../components/ui/card';
import { runAnalysis } from '../lib/analyze';
import { saveAnalysis } from '../lib/storage';
import { FileText } from 'lucide-react';

export function Assessments() {
  const navigate = useNavigate();
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [jdText, setJdText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const handleAnalyze = () => {
    setError('');

    if (!jdText.trim()) {
      setError('Please paste the job description text.');
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = runAnalysis({ company: company.trim(), role: role.trim(), jdText: jdText.trim() });
      const entry = {
        company: company.trim(),
        role: role.trim(),
        jdText: jdText.trim(),
        extractedSkills: result.extractedSkills,
        checklist: result.checklist,
        plan: result.plan,
        questions: result.questions,
        readinessScore: result.readinessScore,
        companyIntel: result.companyIntel,
        roundMapping: result.roundMapping,
      };
      const id = saveAnalysis(entry);
      navigate(`/dashboard/results${id ? `?id=${id}` : ''}`);
    } catch (err) {
      setError('Analysis failed. Please try again.');
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">JD Analysis</h2>
      <p className="text-gray-600">
        Paste a job description to extract skills, get a preparation checklist, 7-day plan, and likely interview questions.
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Analyze Job Description</CardTitle>
          <CardDescription>
            Enter company and role (optional). Paste the full JD for best results.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Google, Microsoft"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. SDE 1, Full Stack Developer"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Description <span className="text-gray-500">(required)</span>
            </label>
            <textarea
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
              placeholder="Paste the full job description here..."
              rows={12}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-y font-mono text-sm"
              required
            />
          </div>

          {jdText.trim().length > 0 && jdText.trim().length < 200 && (
            <p className="text-sm text-amber-700 bg-amber-50 px-3 py-2 rounded-lg">
              This JD is too short to analyze deeply. Paste full JD for better output.
            </p>
          )}

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FileText className="w-5 h-5" />
            {isAnalyzing ? 'Analyzing...' : 'Analyze'}
          </button>
        </CardContent>
      </Card>
    </div>
  );
}
