import type { ExperienceEntry } from '../../types/resume';
import { needsActionVerb, needsMeasurableImpact } from '../../utils/bulletGuidance';

interface Props {
  entries: ExperienceEntry[];
  onChange: (entries: ExperienceEntry[]) => void;
}

function newEntry(): ExperienceEntry {
  return {
    id: crypto.randomUUID(),
    company: '',
    role: '',
    location: '',
    startDate: '',
    endDate: '',
    description: '',
  };
}

export function ExperienceForm({ entries, onChange }: Props) {
  const add = () => onChange([...entries, newEntry()]);
  const remove = (id: string) => onChange(entries.filter((e) => e.id !== id));
  const update = (id: string, updates: Partial<ExperienceEntry>) =>
    onChange(
      entries.map((e) => (e.id === id ? { ...e, ...updates } : e))
    );

  return (
    <section className="form-section">
      <div className="form-section-header">
        <h3>Experience</h3>
        <button type="button" onClick={add} className="btn-add">
          Add
        </button>
      </div>
      {entries.map((entry) => (
        <div key={entry.id} className="form-block">
          <div className="form-grid">
            <div className="form-field">
              <label>Company</label>
              <input
                value={entry.company}
                onChange={(e) => update(entry.id, { company: e.target.value })}
                placeholder="Company name"
              />
            </div>
            <div className="form-field">
              <label>Role</label>
              <input
                value={entry.role}
                onChange={(e) => update(entry.id, { role: e.target.value })}
                placeholder="Job title"
              />
            </div>
            <div className="form-field">
              <label>Location</label>
              <input
                value={entry.location}
                onChange={(e) => update(entry.id, { location: e.target.value })}
                placeholder="City, State"
              />
            </div>
            <div className="form-field form-field-row">
              <input
                value={entry.startDate}
                onChange={(e) => update(entry.id, { startDate: e.target.value })}
                placeholder="Start"
              />
              <span>–</span>
              <input
                value={entry.endDate}
                onChange={(e) => update(entry.id, { endDate: e.target.value })}
                placeholder="End"
              />
            </div>
            <div className="form-field form-field-full">
              <label>Description</label>
              <textarea
                value={entry.description}
                onChange={(e) => update(entry.id, { description: e.target.value })}
                placeholder="Key responsibilities and achievements (one per line)"
                rows={3}
              />
              {entry.description && (
                <div className="bullet-guidance">
                  {needsActionVerb(entry.description) && (
                    <span className="bullet-hint">Start with a strong action verb.</span>
                  )}
                  {needsMeasurableImpact(entry.description) && (
                    <span className="bullet-hint">Add measurable impact (numbers).</span>
                  )}
                </div>
              )}
            </div>
          </div>
          <button type="button" onClick={() => remove(entry.id)} className="btn-remove">
            Remove
          </button>
        </div>
      ))}
    </section>
  );
}
