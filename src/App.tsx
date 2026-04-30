import { useState } from 'react';
import { AppRole, Participant } from './data/types';
import { getDashboardSummary } from './data/mockData';

import LoginPage from './pages/LoginPage';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardPage from './pages/DashboardPage';
import ParticipantsPage from './pages/ParticipantsPage';
import AlertsPage from './pages/AlertsPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';
import ParticipantDetail from './pages/ParticipantDetail';
import CandidateApp from './candidate/CandidateApp';
import GovApp from './government/GovApp';
import TicketsPage from './pages/TicketsPage';

type SWTab = 'dashboard' | 'participants' | 'alerts' | 'tickets' | 'reports' | 'settings';

function SocialWorkerShell({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState<SWTab>('dashboard');
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
  const summary = getDashboardSummary();

  if (selectedParticipant) {
    return (
      <div className="min-h-screen bg-background flex">
        <div className="sticky top-0 h-screen flex-shrink-0">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab as any} onLogout={onLogout} />
        </div>
        <div className="flex-1 flex flex-col min-w-0 min-h-screen">
          <Header activeTab={activeTab} />
          <main className="flex-1 overflow-auto">
            <div className="p-4 sm:p-6">
              <ParticipantDetail participant={selectedParticipant} onBack={() => setSelectedParticipant(null)} />
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      <div className="sticky top-0 h-screen flex-shrink-0">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab as any} onLogout={onLogout} />
      </div>
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <Header activeTab={activeTab} />
        <main className="flex-1 overflow-auto">
          <div className="p-4 sm:p-6">
            {activeTab === 'dashboard'     && <DashboardPage summary={summary} onViewParticipant={setSelectedParticipant} />}
            {activeTab === 'participants'  && <ParticipantsPage onViewParticipant={setSelectedParticipant} />}
            {activeTab === 'alerts'        && <AlertsPage />}
            {activeTab === 'tickets'       && <TicketsPage />}
            {activeTab === 'reports'       && <ReportsPage />}
            {activeTab === 'settings'      && <SettingsPage />}
          </div>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  const [role, setRole] = useState<AppRole>(null);

  if (!role) return <LoginPage onSelectRole={setRole} />;
  if (role === 'candidate')     return <CandidateApp onLogout={() => setRole(null)} />;
  if (role === 'government')    return <GovApp onLogout={() => setRole(null)} />;
  return <SocialWorkerShell onLogout={() => setRole(null)} />;
}
