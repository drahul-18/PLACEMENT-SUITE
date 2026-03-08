import { useNavigate } from 'react-router-dom';
import { JOBS } from '../data/jobsData';
import { useJobs } from '../context/JobsContext';
import { getUniqueValues } from '../utils/matchScore';

export function Settings() {
  const navigate = useNavigate();
  const { preferences, setPreferences } = useJobs();
  const locations = getUniqueValues(JOBS, 'location');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const prefs = {
      roleKeywords: (form.querySelector('#role-keywords') as HTMLInputElement)?.value?.trim() ?? '',
      preferredLocations: Array.from(
        (form.querySelector('#preferred-locations') as HTMLSelectElement)?.selectedOptions ?? []
      ).map((o) => (o as HTMLOptionElement).value),
      preferredMode: Array.from(
        form.querySelectorAll<HTMLInputElement>('input[name="preferred-mode"]:checked')
      ).map((c) => c.value),
      experienceLevel: (form.querySelector('#experience-level') as HTMLSelectElement)?.value ?? '',
      skills: (form.querySelector('#skills') as HTMLInputElement)?.value?.trim() ?? '',
      minMatchScore: parseInt(
        (form.querySelector('#min-match-score') as HTMLInputElement)?.value ?? '40',
        10
      ),
    };
    setPreferences(prefs);
    navigate('/jobs/dashboard');
  };

  return (
    <div>
      <div className="kn-page__header">
        <h1 className="kn-page__title">Settings</h1>
        <p className="kn-page__subtext">Configure your job preferences.</p>
      </div>
      <form id="settings-form" className="kn-settings" onSubmit={handleSubmit}>
        <div className="kn-settings__field">
          <label className="kn-settings__label" htmlFor="role-keywords">
            Role keywords
          </label>
          <input
            type="text"
            id="role-keywords"
            className="kn-input"
            placeholder="e.g. Frontend, React, Full Stack"
            defaultValue={preferences.roleKeywords}
          />
        </div>
        <div className="kn-settings__field">
          <label className="kn-settings__label" htmlFor="preferred-locations">
            Preferred locations
          </label>
          <select
            id="preferred-locations"
            className="kn-input kn-input--select kn-input--multi"
            multiple
          >
            {locations.map((l) => (
              <option key={l} value={l} selected={preferences.preferredLocations?.includes(l)}>
                {l}
              </option>
            ))}
          </select>
          <span className="kn-settings__hint">Hold Ctrl/Cmd to select multiple</span>
        </div>
        <div className="kn-settings__field">
          <label className="kn-settings__label">Preferred mode</label>
          <div className="kn-settings__checkboxes">
            <label className="kn-settings__checkbox-label">
              <input
                type="checkbox"
                name="preferred-mode"
                value="Remote"
                defaultChecked={preferences.preferredMode?.includes('Remote')}
              />
              Remote
            </label>
            <label className="kn-settings__checkbox-label">
              <input
                type="checkbox"
                name="preferred-mode"
                value="Hybrid"
                defaultChecked={preferences.preferredMode?.includes('Hybrid')}
              />
              Hybrid
            </label>
            <label className="kn-settings__checkbox-label">
              <input
                type="checkbox"
                name="preferred-mode"
                value="Onsite"
                defaultChecked={preferences.preferredMode?.includes('Onsite')}
              />
              Onsite
            </label>
          </div>
        </div>
        <div className="kn-settings__field">
          <label className="kn-settings__label" htmlFor="experience-level">
            Experience level
          </label>
          <select id="experience-level" className="kn-input kn-input--select" defaultValue={preferences.experienceLevel}>
            <option value="">Select level</option>
            <option value="Fresher">Fresher</option>
            <option value="0-1">0-1</option>
            <option value="1-3">1-3</option>
            <option value="3-5">3-5</option>
          </select>
        </div>
        <div className="kn-settings__field">
          <label className="kn-settings__label" htmlFor="skills">
            Skills
          </label>
          <input
            type="text"
            id="skills"
            className="kn-input"
            placeholder="e.g. React, Python, Java"
            defaultValue={preferences.skills}
          />
        </div>
        <div className="kn-settings__field">
          <label className="kn-settings__label" htmlFor="min-match-score">
            Minimum match threshold: <span id="min-match-value">{preferences.minMatchScore ?? 40}</span>
          </label>
          <input
            type="range"
            id="min-match-score"
            className="kn-slider"
            min={0}
            max={100}
            defaultValue={preferences.minMatchScore ?? 40}
            onInput={(e) => {
              const el = document.getElementById('min-match-value');
              if (el) el.textContent = (e.target as HTMLInputElement).value;
            }}
          />
        </div>
        <button type="submit" className="kn-btn kn-btn--primary">
          Save Preferences
        </button>
      </form>
    </div>
  );
}
