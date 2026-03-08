import type { ReactNode } from 'react';
import { AppNav } from './AppNav';

export function ResumeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="resume-layout">
      <AppNav />
      <div className="resume-layout-content">{children}</div>
    </div>
  );
}
