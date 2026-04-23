import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardPage from './pages/DashboardPage';
import ParticipantsPage from './pages/ParticipantsPage';
import AlertsPage from './pages/AlertsPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';
import ParticipantDetail from './pages/ParticipantDetail';
import { Participant } from './data/types';
import { getDashboardSummary } from './data/mockData';

type TabType = 'dashboard' | 'participants' | 'alerts' | 'reports' | 'settings';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);

  const summary = getDashboardSummary();

  if (selectedParticipant) {
    return (
      <div className="min-h-screen bg-background flex">
        <div className="sticky top-0 h-screen flex-shrink-0">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab as any} />
        </div>
        <div className="flex-1 flex flex-col min-w-0 min-h-screen">
          <Header activeTab={activeTab} />
          <main className="flex-1 overflow-auto">
            <div className="p-4 sm:p-6">
              <ParticipantDetail
                participant={selectedParticipant}
                onBack={() => setSelectedParticipant(null)}
              />
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      <div className="sticky top-0 h-screen flex-shrink-0">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab as any} />
      </div>
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <Header activeTab={activeTab} />
        <main className="flex-1 overflow-auto">
          <div className="p-4 sm:p-6">
            {activeTab === 'dashboard' && (
              <DashboardPage
                summary={summary}
                onViewParticipant={setSelectedParticipant}
              />
            )}
            {activeTab === 'participants' && (
              <ParticipantsPage onViewParticipant={setSelectedParticipant} />
            )}
            {activeTab === 'alerts' && <AlertsPage />}
            {activeTab === 'reports' && <ReportsPage />}
            {activeTab === 'settings' && <SettingsPage />}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;