import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import {
  LandingPage,
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/prp/07-test" element={<TestChecklist />} />
        <Route path="/prp/08-ship" element={<Ship />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="practice" element={<Practice />} />
          <Route path="assessments" element={<Assessments />} />
          <Route path="results" element={<Results />} />
          <Route path="history" element={<History />} />
          <Route path="resources" element={<Resources />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
