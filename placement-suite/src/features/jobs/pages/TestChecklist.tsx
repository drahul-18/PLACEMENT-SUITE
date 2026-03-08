import { useJobs } from '../context/JobsContext';

const TEST_ITEMS = [
  { id: 0, label: 'Preferences persist after refresh', hint: 'Save preferences in Settings, refresh page, confirm values are still there.' },
  { id: 1, label: 'Match score calculates correctly', hint: 'Set preferences, check job cards show numeric scores matching spec rules.' },
  { id: 2, label: '"Show only matches" toggle works', hint: 'Enable toggle on Dashboard, confirm only jobs above threshold appear.' },
  { id: 3, label: 'Save job persists after refresh', hint: 'Save a job, refresh, go to Saved — job should still appear.' },
  { id: 4, label: 'Apply opens in new tab', hint: 'Click Apply on any job card, confirm it opens in a new tab.' },
  { id: 5, label: 'Status update persists after refresh', hint: 'Change status to Applied/Rejected/Selected, refresh — status should remain.' },
  { id: 6, label: 'Status filter works correctly', hint: 'Filter by Applied on Dashboard, confirm only Applied jobs show.' },
  { id: 7, label: 'Digest generates top 10 by score', hint: 'Generate digest, confirm 10 jobs sorted by match score.' },
  { id: 8, label: 'Digest persists for the day', hint: 'Generate digest, refresh page — digest should still be visible.' },
  { id: 9, label: 'No console errors on main pages', hint: 'Navigate Dashboard, Saved, Digest, Settings — check DevTools console for errors.' },
];

export function TestChecklist() {
  const { testChecklist, setTestChecklistItem, resetTestChecklist, getAllTestsPassed } = useJobs();
  const passed = TEST_ITEMS.filter((item) => testChecklist[item.id]).length;
  const total = TEST_ITEMS.length;
  const allPassed = getAllTestsPassed();

  return (
    <div className="kn-page kn-page--test">
      <div className="kn-page__header">
        <h1 className="kn-page__title">Test Checklist</h1>
        <p className="kn-page__subtext">Verify all features before shipping.</p>
      </div>
      <div className={`kn-test-summary ${allPassed ? 'kn-test-summary--pass' : 'kn-test-summary--warn'}`}>
        <span className="kn-test-summary__count">Tests Passed: {passed} / {total}</span>
        {!allPassed && <p className="kn-test-summary__warning">Resolve all issues before shipping.</p>}
      </div>
      <div className="kn-test-actions">
        <button
          type="button"
          className="kn-btn kn-btn--secondary kn-btn--sm"
          onClick={resetTestChecklist}
        >
          Reset Test Status
        </button>
      </div>
      <div className="kn-test-checklist">
        {TEST_ITEMS.map((item) => (
          <label key={item.id} className="kn-test-item">
            <input
              type="checkbox"
              className="kn-test-item__checkbox"
              checked={!!testChecklist[item.id]}
              onChange={(e) => setTestChecklistItem(item.id, e.target.checked)}
            />
            <span className="kn-test-item__label">{item.label}</span>
            <span className="kn-test-item__hint" title={item.hint}>?</span>
          </label>
        ))}
      </div>
    </div>
  );
}
