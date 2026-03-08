import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { ReactNode } from 'react';

export type TemplateId = 'classic' | 'modern' | 'minimal';

export type ColorThemeId = 'teal' | 'navy' | 'burgundy' | 'forest' | 'charcoal';

export const COLOR_THEMES: Record<ColorThemeId, string> = {
  teal: 'hsl(168, 60%, 40%)',
  navy: 'hsl(220, 60%, 35%)',
  burgundy: 'hsl(345, 60%, 35%)',
  forest: 'hsl(150, 50%, 30%)',
  charcoal: 'hsl(0, 0%, 25%)',
};

const TEMPLATE_KEY = 'resumeBuilderTemplate';
const COLOR_KEY = 'resumeBuilderColor';

function loadTemplate(): TemplateId {
  try {
    const raw = localStorage.getItem(TEMPLATE_KEY);
    if (raw === 'classic' || raw === 'modern' || raw === 'minimal') return raw;
  } catch {
    // ignore
  }
  return 'classic';
}

function loadColor(): ColorThemeId {
  try {
    const raw = localStorage.getItem(COLOR_KEY);
    if (raw && raw in COLOR_THEMES) return raw as ColorThemeId;
  } catch {
    // ignore
  }
  return 'teal';
}

interface TemplateContextType {
  template: TemplateId;
  setTemplate: (t: TemplateId) => void;
  color: ColorThemeId;
  setColor: (c: ColorThemeId) => void;
  accentColor: string;
}

const TemplateContext = createContext<TemplateContextType | null>(null);

export function TemplateProvider({ children }: { children: ReactNode }) {
  const [template, setTemplateState] = useState<TemplateId>(loadTemplate);
  const [color, setColorState] = useState<ColorThemeId>(loadColor);

  useEffect(() => {
    try {
      localStorage.setItem(TEMPLATE_KEY, template);
    } catch {
      // ignore
    }
  }, [template]);

  useEffect(() => {
    try {
      localStorage.setItem(COLOR_KEY, color);
    } catch {
      // ignore
    }
  }, [color]);

  const setTemplate = useCallback((t: TemplateId) => setTemplateState(t), []);
  const setColor = useCallback((c: ColorThemeId) => setColorState(c), []);

  return (
    <TemplateContext.Provider
      value={{
        template,
        setTemplate,
        color,
        setColor,
        accentColor: COLOR_THEMES[color],
      }}
    >
      {children}
    </TemplateContext.Provider>
  );
}

export function useTemplate() {
  const ctx = useContext(TemplateContext);
  if (!ctx) throw new Error('useTemplate must be used within TemplateProvider');
  return ctx;
}
