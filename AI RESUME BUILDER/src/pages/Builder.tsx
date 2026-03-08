import { useResume } from '../context/ResumeContext';
import { PersonalInfoForm } from '../components/builder/PersonalInfoForm';
import { EducationForm } from '../components/builder/EducationForm';
import { ExperienceForm } from '../components/builder/ExperienceForm';
import { ProjectsFormSection } from '../components/builder/ProjectsFormSection';
import { SkillsFormSection } from '../components/builder/SkillsFormSection';
import { LivePreview } from '../components/builder/LivePreview';
import { ATSScoreCard } from '../components/builder/ATSScoreCard';
import { TemplatePicker } from '../components/builder/TemplatePicker';
import { ColorThemePicker } from '../components/builder/ColorThemePicker';

export function Builder() {
  const { data, setData, loadSample } = useResume();

  return (
    <div className="builder-page">
      <div className="builder-header">
        <h1>Resume Builder</h1>
        <div className="builder-header-actions">
          <button type="button" onClick={loadSample} className="btn-load-sample">
          Load Sample Data
        </button>
        </div>
      </div>

      <div className="builder-columns">
        <aside className="builder-form">
          <PersonalInfoForm
            data={data.personal}
            onChange={(personal) => setData((prev) => ({ ...prev, personal }))}
          />

          <section className="form-section">
            <h3>Summary</h3>
            <textarea
              value={data.summary}
              onChange={(e) => setData((prev) => ({ ...prev, summary: e.target.value }))}
              placeholder="Professional summary..."
              rows={4}
            />
          </section>

          <EducationForm
            entries={data.education}
            onChange={(education) => setData((prev) => ({ ...prev, education }))}
          />

          <ExperienceForm
            entries={data.experience}
            onChange={(experience) => setData((prev) => ({ ...prev, experience }))}
          />

          <ProjectsFormSection
            entries={data.projects}
            onChange={(projects) => setData((prev) => ({ ...prev, projects }))}
          />

          <SkillsFormSection
            skills={data.skills}
            onChange={(skills) => setData((prev) => ({ ...prev, skills }))}
          />

          <section className="form-section">
            <h3>Links</h3>
            <div className="form-grid">
              <div className="form-field">
                <label>GitHub</label>
                <input
                  value={data.links.github}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      links: { ...prev.links, github: e.target.value },
                    }))
                  }
                  placeholder="https://github.com/..."
                />
              </div>
              <div className="form-field">
                <label>LinkedIn</label>
                <input
                  value={data.links.linkedin}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      links: { ...prev.links, linkedin: e.target.value },
                    }))
                  }
                  placeholder="https://linkedin.com/in/..."
                />
              </div>
            </div>
          </section>
        </aside>

        <main className="builder-preview">
          <div className="preview-panel-controls">
            <TemplatePicker />
            <ColorThemePicker />
          </div>
          <ATSScoreCard data={data} />
          <LivePreview data={data} />
        </main>
      </div>
    </div>
  );
}
