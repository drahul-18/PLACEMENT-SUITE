import { useState } from 'react';
import type { ProjectEntry } from '../../types/resume';
import { needsActionVerb, needsMeasurableImpact } from '../../utils/bulletGuidance';
import { SkillTagInput } from './SkillTagInput';

const DESC_MAX = 200;

interface Props {
  entries: ProjectEntry[];
  onChange: (entries: ProjectEntry[]) => void;
}

function newEntry(): ProjectEntry {
  return {
    id: crypto.randomUUID(),
    name: '',
    description: '',
    techStack: [],
    liveUrl: '',
    githubUrl: '',
  };
}

export function ProjectsFormSection({ entries, onChange }: Props) {
  const [expandedId, setExpandedId] = useState<string | null>(entries[0]?.id ?? null);

  const add = () => {
    const entry = newEntry();
    onChange([...entries, entry]);
    setExpandedId(entry.id);
  };

  const remove = (id: string) => {
    onChange(entries.filter((e) => e.id !== id));
    if (expandedId === id) setExpandedId(entries[0]?.id ?? null);
  };

  const update = (id: string, updates: Partial<ProjectEntry>) =>
    onChange(
      entries.map((e) => (e.id === id ? { ...e, ...updates } : e))
    );

  const toggle = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="form-section projects-accordion">
      <div className="form-section-header">
        <h3>Projects</h3>
        <button type="button" onClick={add} className="btn-add">
          Add Project
        </button>
      </div>

      {entries.map((entry) => (
        <div key={entry.id} className="project-accordion-item">
          <button
            type="button"
            className={`project-accordion-header ${expandedId === entry.id ? 'expanded' : ''}`}
            onClick={() => toggle(entry.id)}
          >
            <span className="project-accordion-title">
              {entry.name || 'Untitled Project'}
            </span>
            <button
              type="button"
              className="btn-delete-project"
              onClick={(e) => {
                e.stopPropagation();
                remove(entry.id);
              }}
              aria-label="Delete project"
            >
              Delete
            </button>
          </button>

          {expandedId === entry.id && (
            <div className="project-accordion-body">
              <div className="form-grid">
                <div className="form-field form-field-full">
                  <label>Project Title</label>
                  <input
                    value={entry.name}
                    onChange={(e) => update(entry.id, { name: e.target.value })}
                    placeholder="Project name"
                  />
                </div>
                <div className="form-field form-field-full">
                  <label>Description (max {DESC_MAX} chars)</label>
                  <textarea
                    value={entry.description}
                    onChange={(e) =>
                      update(entry.id, {
                        description: e.target.value.slice(0, DESC_MAX),
                      })
                    }
                    placeholder="Brief description"
                    rows={3}
                  />
                  <span className="char-counter">
                    {entry.description.length}/{DESC_MAX}
                  </span>
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
                <div className="form-field form-field-full">
                  <label>Tech Stack</label>
                  <SkillTagInput
                    skills={entry.techStack}
                    onChange={(techStack) => update(entry.id, { techStack })}
                    placeholder="Add tech (e.g. React, Node)"
                  />
                </div>
                <div className="form-field">
                  <label>Live URL</label>
                  <input
                    value={entry.liveUrl}
                    onChange={(e) => update(entry.id, { liveUrl: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
                <div className="form-field">
                  <label>GitHub URL</label>
                  <input
                    value={entry.githubUrl}
                    onChange={(e) => update(entry.id, { githubUrl: e.target.value })}
                    placeholder="https://github.com/..."
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
