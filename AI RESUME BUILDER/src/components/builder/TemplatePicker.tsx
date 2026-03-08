import { useTemplate } from '../../context/TemplateContext';
import type { TemplateId } from '../../context/TemplateContext';

const OPTIONS: { id: TemplateId; label: string }[] = [
  { id: 'classic', label: 'Classic' },
  { id: 'modern', label: 'Modern' },
  { id: 'minimal', label: 'Minimal' },
];

export function TemplatePicker() {
  const { template, setTemplate } = useTemplate();

  return (
    <div className="template-picker">
      <span className="template-picker-label">Template</span>
      <div className="template-thumbnails">
        {OPTIONS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            className={`template-thumbnail ${template === id ? 'active' : ''}`}
            onClick={() => setTemplate(id)}
            title={label}
          >
            <div className={`template-thumbnail-sketch template-thumbnail-sketch--${id}`} />
            <span className="template-thumbnail-label">{label}</span>
            {template === id && (
              <span className="template-thumbnail-check">✓</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
