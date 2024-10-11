import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Reports from './pages/Reports';
import Compliance from './pages/Compliance';
import StakeholderEngagement from './pages/StakeholderEngagement';
import RiskAssessment from './pages/RiskAssessment';
import DocumentManagement from './pages/DocumentManagement';
import ReportingWizard from './pages/ReportingWizard';
import RealTimeMetrics from './pages/RealTimeMetrics';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-100">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/compliance" element={<Compliance />} />
              <Route path="/stakeholders" element={<StakeholderEngagement />} />
              <Route path="/risk-assessment" element={<RiskAssessment />} />
              <Route path="/documents" element={<DocumentManagement />} />
              <Route path="/reporting-wizard" element={<ReportingWizard />} />
              <Route path="/real-time-metrics" element={<RealTimeMetrics />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;