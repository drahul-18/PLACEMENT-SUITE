import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ArtifactProvider } from './context/ArtifactContext';
import { ResumeProvider } from './context/ResumeContext';
import { TemplateProvider } from './context/TemplateContext';
import { ResumeLayout } from './components/ResumeLayout';
import { Home } from './pages/Home';
import { Builder } from './pages/Builder';
import { Preview } from './pages/Preview';
import { ResumeProof } from './pages/ResumeProof';
import { StepPage } from './pages/rb/StepPage';
import { Proof } from './pages/rb/Proof';
import { StepGuard } from './components/StepGuard';
import './App.css';

function App() {
  return (
    <ArtifactProvider>
      <ResumeProvider>
        <TemplateProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <ResumeLayout>
                  <Home />
                </ResumeLayout>
              }
            />
            <Route
              path="/builder"
              element={
                <ResumeLayout>
                  <Builder />
                </ResumeLayout>
              }
            />
            <Route
              path="/preview"
              element={
                <ResumeLayout>
                  <Preview />
                </ResumeLayout>
              }
            />
            <Route
              path="/proof"
              element={
                <ResumeLayout>
                  <ResumeProof />
                </ResumeLayout>
              }
            />
            <Route path="/rb/proof" element={<Proof />} />
            <Route
              path="/rb/:stepId"
              element={
                <StepGuard>
                  <StepPage />
                </StepGuard>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
        </TemplateProvider>
      </ResumeProvider>
    </ArtifactProvider>
  );
}

export default App;
