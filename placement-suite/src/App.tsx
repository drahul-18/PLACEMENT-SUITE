import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { AppLayout } from './components/layout/AppLayout';
import { LoadingFallback } from './components/LoadingFallback';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';

const JobsFeature = lazy(() => import('./features/jobs/JobsFeature'));
const ReadinessFeature = lazy(() => import('./features/readiness/ReadinessFeature'));
const ResumeFeature = lazy(() => import('./features/resume/ResumeFeature'));

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/jobs/*" element={<Suspense fallback={<LoadingFallback />}><JobsFeature /></Suspense>} />
            <Route path="/readiness/*" element={<Suspense fallback={<LoadingFallback />}><ReadinessFeature /></Suspense>} />
            <Route path="/resume/*" element={<Suspense fallback={<LoadingFallback />}><ResumeFeature /></Suspense>} />
          </Route>
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
