import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  getTestChecklist,
  setTestChecklistItem,
  resetTestChecklist,
  isAllTestsPassed,
} from '../lib/testChecklist';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { ArrowLeft, CheckCircle2, AlertTriangle, RotateCcw, HelpCircle } from 'lucide-react';

export function TestChecklist() {
  const [items, setItems] = useState(getTestChecklist());

  useEffect(() => {
    setItems(getTestChecklist());
  }, []);

  const handleToggle = (id, checked) => {
    setTestChecklistItem(id, checked);
    setItems(getTestChecklist());
  };

  const handleReset = () => {
    resetTestChecklist();
    setItems(getTestChecklist());
  };

  const passed = items.filter((i) => i.checked).length;
  const allPassed = isAllTestsPassed();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-primary hover:underline mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">Test Checklist</h1>
        <p className="text-gray-600 mb-8">
          Verify all tests before shipping. Checklist persists in localStorage.
        </p>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-gray-900">
                  Tests Passed: {passed} / 10
                </span>
                {allPassed && (
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                )}
              </div>
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Reset checklist
              </button>
            </div>
            {!allPassed && (
              <p className="mt-4 text-amber-700 bg-amber-50 px-4 py-3 rounded-lg flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                Fix issues before shipping.
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Placement Readiness Platform — Test Items</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 bg-white"
                >
                  <input
                    type="checkbox"
                    id={item.id}
                    checked={item.checked}
                    onChange={(e) => handleToggle(item.id, e.target.checked)}
                    className="mt-1 w-5 h-5 rounded border-gray-300 accent-primary cursor-pointer"
                  />
                  <div className="flex-1 min-w-0">
                    <label
                      htmlFor={item.id}
                      className="font-medium text-gray-900 cursor-pointer block"
                    >
                      {item.label}
                    </label>
                    {item.hint && (
                      <p className="mt-1 text-sm text-gray-500 flex items-start gap-1">
                        <HelpCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        How to test: {item.hint}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <div className="mt-8 flex gap-4">
          <Link
            to="/prp/08-ship"
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              allPassed
                ? 'bg-primary hover:bg-primary-hover text-white'
                : 'border border-gray-300 text-gray-500 hover:bg-gray-100'
            }`}
          >
            {allPassed ? 'Go to Ship' : 'View Ship (locked)'}
          </Link>
        </div>
      </div>
    </div>
  );
}
