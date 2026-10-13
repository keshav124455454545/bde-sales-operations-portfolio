import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AppLayout } from './components/layout/AppLayout';
import { Dashboard } from './pages/Dashboard';
import { Leads } from './pages/Leads';
import { Prospecting } from './pages/Prospecting';
import { Bidding } from './pages/Bidding';
import { Pipeline } from './pages/Pipeline';
import { MarketResearch } from './pages/MarketResearch';
import { Network } from './pages/Network';
import { Services } from './pages/Services';
import { Proposals } from './pages/Proposals';
import { Activities } from './pages/Activities';
import { Reports } from './pages/Reports';
import { Portfolio } from './pages/Portfolio';
import { Settings } from './pages/Settings';

export const App: React.FC = () => {
  return (
    <AppProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="leads" element={<Leads />} />
            <Route path="prospecting" element={<Prospecting />} />
            <Route path="bidding" element={<Bidding />} />
            <Route path="pipeline" element={<Pipeline />} />
            <Route path="market-research" element={<MarketResearch />} />
            <Route path="network" element={<Network />} />
            <Route path="services" element={<Services />} />
            <Route path="proposals" element={<Proposals />} />
            <Route path="activities" element={<Activities />} />
            <Route path="reports" element={<Reports />} />
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </HashRouter>
    </AppProvider>
  );
};

export default App;
