import { Routes, Route, Navigate } from 'react-router-dom';
import { JobsProvider } from './context/JobsContext';
import { JobsLayout } from './components/JobsLayout';
import { JobsLanding } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { Saved } from './pages/Saved';
import { Digest } from './pages/Digest';
import { Settings } from './pages/Settings';
import { Proof } from './pages/Proof';
import { Timeline } from './pages/Timeline';
import { TestChecklist } from './pages/TestChecklist';
import { Ship } from './pages/Ship';
import { JtProof } from './pages/JtProof';
import './jobs.css';
import './jobs-components.css';

export default function JobsFeature() {
  return (
    <JobsProvider>
      <Routes>
        <Route element={<JobsLayout />}>
          <Route index element={<JobsLanding />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="saved" element={<Saved />} />
          <Route path="timeline" element={<Timeline />} />
          <Route path="digest" element={<Digest />} />
          <Route path="settings" element={<Settings />} />
          <Route path="proof" element={<Proof />} />
          <Route path="jt/07-test" element={<TestChecklist />} />
          <Route path="jt/08-ship" element={<Ship />} />
          <Route path="jt/proof" element={<JtProof />} />
        </Route>
        <Route path="*" element={<Navigate to="/jobs" replace />} />
      </Routes>
    </JobsProvider>
  );
}
