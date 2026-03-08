import type { EducationEntry } from '../../types/resume';

interface Props {
  entries: EducationEntry[];
  onChange: (entries: EducationEntry[]) => void;
}

function newEntry(): EducationEntry {
  return {
    id: crypto.randomUUID(),
    institution: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
  };
}

export function EducationForm({ entries, onChange }: Props) {
  const add = () => onChange([...entries, newEntry()]);
  const remove = (id: string) => onChange(entries.filter((e) => e.id !== id));
  const update = (id: string, updates: Partial<EducationEntry>) =>
    onChange(
      entries.map((e) => (e.id === id ? { ...e, ...updates } : e))
    );

  return (
    <section className="form-section">
      <div className="form-section-header">
        <h3>Education</h3>
        <button type="button" onClick={add} className="btn-add">
          Add
        </button>
      </div>
      {entries.map((entry) => (
        <div key={entry.id} className="form-block">
          <div className="form-grid">
            <div className="form-field">
              <label>Institution</label>
              <input
                value={entry.institution}
                onChange={(e) => update(entry.id, { institution: e.target.value })}
                placeholder="University name"
              />
            </div>
            <div className="form-field">
              <label>Degree</label>
              <input
                value={entry.degree}
                onChange={(e) => update(entry.id, { degree: e.target.value })}
                placeholder="B.S., M.S."
              />
            </div>
            <div className="form-field">
              <label>Field</label>
              <input
                value={entry.field}
                onChange={(e) => update(entry.id, { field: e.target.value })}
                placeholder="Computer Science"
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
          </div>
          <button type="button" onClick={() => remove(entry.id)} className="btn-remove">
            Remove
          </button>
        </div>
      ))}
    </section>
  );
}
