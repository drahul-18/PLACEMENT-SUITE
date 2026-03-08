import { useTemplate } from '../../context/TemplateContext';
import { COLOR_THEMES } from '../../context/TemplateContext';
import type { ColorThemeId } from '../../context/TemplateContext';

const THEMES: { id: ColorThemeId; label: string }[] = [
  { id: 'teal', label: 'Teal' },
  { id: 'navy', label: 'Navy' },
  { id: 'burgundy', label: 'Burgundy' },
  { id: 'forest', label: 'Forest' },
  { id: 'charcoal', label: 'Charcoal' },
];

export function ColorThemePicker() {
  const { color, setColor } = useTemplate();

  return (
    <div className="color-theme-picker">
      <span className="color-theme-picker-label">Color</span>
      <div className="color-theme-circles">
        {THEMES.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            className={`color-theme-circle ${color === id ? 'active' : ''}`}
            onClick={() => setColor(id)}
            title={label}
            style={{ backgroundColor: COLOR_THEMES[id] }}
          />
        ))}
      </div>
    </div>
  );
}
