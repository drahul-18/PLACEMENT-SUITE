import { useState } from 'react';
import type { SkillsGrouped } from '../../types/resume';
import { SkillTagInput } from './SkillTagInput';

const SUGGESTED_SKILLS: SkillsGrouped = {
  technical: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'GraphQL'],
  soft: ['Team Leadership', 'Problem Solving'],
  tools: ['Git', 'Docker', 'AWS'],
};

interface Props {
  skills: SkillsGrouped;
  onChange: (skills: SkillsGrouped) => void;
}

export function SkillsFormSection({ skills, onChange }: Props) {
  const [isSuggesting, setIsSuggesting] = useState(false);

  const updateCategory = (key: keyof SkillsGrouped) => (list: string[]) => {
    onChange({ ...skills, [key]: list });
  };

  const handleSuggestSkills = () => {
    setIsSuggesting(true);
    setTimeout(() => {
      const merged: SkillsGrouped = {
        technical: [...new Set([...skills.technical, ...SUGGESTED_SKILLS.technical])],
        soft: [...new Set([...skills.soft, ...SUGGESTED_SKILLS.soft])],
        tools: [...new Set([...skills.tools, ...SUGGESTED_SKILLS.tools])],
      };
      onChange(merged);
      setIsSuggesting(false);
    }, 1000);
  };

  return (
    <section className="form-section skills-accordion">
      <div className="form-section-header">
        <h3>Skills</h3>
        <button
          type="button"
          onClick={handleSuggestSkills}
          disabled={isSuggesting}
          className="btn-suggest-skills"
        >
          {isSuggesting ? '...' : '✨ Suggest Skills'}
        </button>
      </div>

      <div className="skills-category">
        <h4>
          Technical Skills ({skills.technical.length})
        </h4>
        <SkillTagInput
          skills={skills.technical}
          onChange={updateCategory('technical')}
        />
      </div>

      <div className="skills-category">
        <h4>
          Soft Skills ({skills.soft.length})
        </h4>
        <SkillTagInput
          skills={skills.soft}
          onChange={updateCategory('soft')}
        />
      </div>

      <div className="skills-category">
        <h4>
          Tools & Technologies ({skills.tools.length})
        </h4>
        <SkillTagInput
          skills={skills.tools}
          onChange={updateCategory('tools')}
        />
      </div>
    </section>
  );
}
