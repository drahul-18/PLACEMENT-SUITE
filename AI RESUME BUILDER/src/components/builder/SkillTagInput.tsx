import { useState, useRef } from 'react';

interface Props {
  skills: string[];
  onChange: (skills: string[]) => void;
  placeholder?: string;
}

export function SkillTagInput({ skills, onChange, placeholder = 'Type and press Enter' }: Props) {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const add = (value: string) => {
    const trimmed = value.trim();
    if (trimmed && !skills.includes(trimmed)) {
      onChange([...skills, trimmed]);
      setInput('');
    }
  };

  const remove = (skill: string) => {
    onChange(skills.filter((s) => s !== skill));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      add(input);
    }
  };

  return (
    <div className="skill-tag-input">
      <div className="skill-chips">
        {skills.map((skill) => (
          <span key={skill} className="skill-chip">
            {skill}
            <button
              type="button"
              className="skill-chip-remove"
              onClick={() => remove(skill)}
              aria-label={`Remove ${skill}`}
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="skill-tag-input-field"
      />
    </div>
  );
}
