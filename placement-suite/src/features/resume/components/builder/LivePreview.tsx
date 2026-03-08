import { useTemplate } from '../../context/TemplateContext';
import type { ResumeData } from '../../types/resume';

interface Props {
  data: ResumeData;
}

export function LivePreview({ data }: Props) {
  const { template, accentColor } = useTemplate();

  return (
    <div
      className={`live-preview live-preview--${template}`}
      data-template={template}
      style={{ '--resume-accent': accentColor } as React.CSSProperties}
    >
      <div className="live-preview-paper">
        {template === 'modern' ? (
          <div className="live-preview-modern-layout">
            <aside className="live-preview-sidebar">
              <header className="preview-header">
                <h1>{data.personal.name || 'Your Name'}</h1>
                <div className="preview-contact">
                  {data.personal.email && <span>{data.personal.email}</span>}
                  {data.personal.phone && <span>{data.personal.phone}</span>}
                  {data.personal.location && <span>{data.personal.location}</span>}
                </div>
              </header>
              {(data.skills.technical.length > 0 || data.skills.soft.length > 0 || data.skills.tools.length > 0) && (
                <section className="preview-section">
                  <h2>Skills</h2>
                  <div className="preview-skills-grouped">
                    {data.skills.technical.length > 0 && (
                      <div className="preview-skill-group">
                        <span className="preview-skill-label">Technical</span>
                        <div className="preview-skill-pills">
                          {data.skills.technical.map((s) => (
                            <span key={s} className="preview-skill-pill">{s}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {data.skills.soft.length > 0 && (
                      <div className="preview-skill-group">
                        <span className="preview-skill-label">Soft</span>
                        <div className="preview-skill-pills">
                          {data.skills.soft.map((s) => (
                            <span key={s} className="preview-skill-pill">{s}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {data.skills.tools.length > 0 && (
                      <div className="preview-skill-group">
                        <span className="preview-skill-label">Tools</span>
                        <div className="preview-skill-pills">
                          {data.skills.tools.map((s) => (
                            <span key={s} className="preview-skill-pill">{s}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              )}
              {(data.links.github || data.links.linkedin) && (
                <section className="preview-section">
                  <h2>Links</h2>
                  <div className="preview-links">
                    {data.links.github && <a href={data.links.github} target="_blank" rel="noreferrer">GitHub</a>}
                    {data.links.linkedin && <a href={data.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>}
                  </div>
                </section>
              )}
            </aside>
            <main className="live-preview-main">
              {data.summary && (
                <section className="preview-section">
                  <h2>Summary</h2>
                  <p>{data.summary}</p>
                </section>
              )}
              {data.education.length > 0 && (
                <section className="preview-section">
                  <h2>Education</h2>
                  {data.education.map((edu) => (
                    <div key={edu.id} className="preview-entry">
                      <div className="preview-entry-header">
                        <strong>{edu.degree} {edu.field}</strong>
                        <span>{edu.institution}</span>
                        <span className="preview-meta">
                          {edu.startDate} – {edu.endDate}
                        </span>
                      </div>
                    </div>
                  ))}
                </section>
              )}
              {data.experience.length > 0 && (
                <section className="preview-section">
                  <h2>Experience</h2>
                  {data.experience.map((exp) => (
                    <div key={exp.id} className="preview-entry">
                      <div className="preview-entry-header">
                        <strong>{exp.role}</strong>
                        <span>{exp.company}</span>
                        <span className="preview-meta">
                          {exp.startDate} – {exp.endDate} · {exp.location}
                        </span>
                      </div>
                      {exp.description && <p>{exp.description}</p>}
                    </div>
                  ))}
                </section>
              )}
              {data.projects.length > 0 && (
                <section className="preview-section">
                  <h2>Projects</h2>
                  {data.projects.map((proj) => (
                    <div key={proj.id} className="preview-project-card">
                      <div className="preview-project-header">
                        <strong>{proj.name}</strong>
                        <div className="preview-project-links">
                          {proj.liveUrl && (
                            <a href={proj.liveUrl} target="_blank" rel="noreferrer" title="Live">↗</a>
                          )}
                          {proj.githubUrl && (
                            <a href={proj.githubUrl} target="_blank" rel="noreferrer" title="GitHub">⌘</a>
                          )}
                        </div>
                      </div>
                      {proj.description && <p>{proj.description}</p>}
                      {proj.techStack?.length > 0 && (
                        <div className="preview-project-tech">
                          {proj.techStack.map((t) => (
                            <span key={t} className="preview-tech-pill">{t}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </section>
              )}
            </main>
          </div>
        ) : (
          <>
        <header className="preview-header">
          <h1>{data.personal.name || 'Your Name'}</h1>
          <div className="preview-contact">
            {data.personal.email && <span>{data.personal.email}</span>}
            {data.personal.phone && <span>{data.personal.phone}</span>}
            {data.personal.location && <span>{data.personal.location}</span>}
          </div>
        </header>

        {data.summary && (
          <section className="preview-section">
            <h2>Summary</h2>
            <p>{data.summary}</p>
          </section>
        )}

        {data.education.length > 0 && (
          <section className="preview-section">
            <h2>Education</h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="preview-entry">
                <div className="preview-entry-header">
                  <strong>{edu.degree} {edu.field}</strong>
                  <span>{edu.institution}</span>
                  <span className="preview-meta">
                    {edu.startDate} – {edu.endDate}
                  </span>
                </div>
              </div>
            ))}
          </section>
        )}

        {data.experience.length > 0 && (
          <section className="preview-section">
            <h2>Experience</h2>
            {data.experience.map((exp) => (
              <div key={exp.id} className="preview-entry">
                <div className="preview-entry-header">
                  <strong>{exp.role}</strong>
                  <span>{exp.company}</span>
                  <span className="preview-meta">
                    {exp.startDate} – {exp.endDate} · {exp.location}
                  </span>
                </div>
                {exp.description && <p>{exp.description}</p>}
              </div>
            ))}
          </section>
        )}

        {data.projects.length > 0 && (
          <section className="preview-section">
            <h2>Projects</h2>
            {data.projects.map((proj) => (
              <div key={proj.id} className="preview-project-card">
                <div className="preview-project-header">
                  <strong>{proj.name}</strong>
                  <div className="preview-project-links">
                    {proj.liveUrl && (
                      <a href={proj.liveUrl} target="_blank" rel="noreferrer" title="Live">
                        ↗
                      </a>
                    )}
                    {proj.githubUrl && (
                      <a href={proj.githubUrl} target="_blank" rel="noreferrer" title="GitHub">
                        ⌘
                      </a>
                    )}
                  </div>
                </div>
                {proj.description && <p>{proj.description}</p>}
                {proj.techStack?.length > 0 && (
                  <div className="preview-project-tech">
                    {proj.techStack.map((t) => (
                      <span key={t} className="preview-tech-pill">{t}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        {(data.skills.technical.length > 0 || data.skills.soft.length > 0 || data.skills.tools.length > 0) && (
          <section className="preview-section">
            <h2>Skills</h2>
            <div className="preview-skills-grouped">
              {data.skills.technical.length > 0 && (
                <div className="preview-skill-group">
                  <span className="preview-skill-label">Technical</span>
                  <div className="preview-skill-pills">
                    {data.skills.technical.map((s) => (
                      <span key={s} className="preview-skill-pill">{s}</span>
                    ))}
                  </div>
                </div>
              )}
              {data.skills.soft.length > 0 && (
                <div className="preview-skill-group">
                  <span className="preview-skill-label">Soft</span>
                  <div className="preview-skill-pills">
                    {data.skills.soft.map((s) => (
                      <span key={s} className="preview-skill-pill">{s}</span>
                    ))}
                  </div>
                </div>
              )}
              {data.skills.tools.length > 0 && (
                <div className="preview-skill-group">
                  <span className="preview-skill-label">Tools</span>
                  <div className="preview-skill-pills">
                    {data.skills.tools.map((s) => (
                      <span key={s} className="preview-skill-pill">{s}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {(data.links.github || data.links.linkedin) && (
          <section className="preview-section">
            <h2>Links</h2>
            <div className="preview-links">
              {data.links.github && <a href={data.links.github} target="_blank" rel="noreferrer">GitHub</a>}
              {data.links.linkedin && <a href={data.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>}
            </div>
          </section>
        )}
          </>
        )}
      </div>
    </div>
  );
}
