import { Routes, Route, Navigate } from 'react-router-dom';
import {
  DashboardLayout,
  Dashboard,
  Practice,
  Assessments,
  Results,
  History,
  Resources,
  Profile,
  TestChecklist,
  Ship,
} from './pages';

export default function ReadinessFeature() {
  return (
    <Routes>
      <Route index element={<Navigate to="dashboard" replace />} />
      <Route path="prp/07-test" element={<TestChecklist />} />
      <Route path="prp/08-ship" element={<Ship />} />
      <Route path="dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="practice" element={<Practice />} />
        <Route path="assessments" element={<Assessments />} />
        <Route path="results" element={<Results />} />
        <Route path="history" element={<History />} />
        <Route path="resources" element={<Resources />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<Navigate to="/readiness" replace />} />
    </Routes>
  );
}
