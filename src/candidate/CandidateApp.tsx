import { useState } from 'react';
import { Home, MessageSquare, ClipboardCheck, LogOut } from 'lucide-react';
import CandidateDashboard from './pages/CandidateDashboard';
import MyTickets from './pages/MyTickets';
import CheckIn from './pages/CheckIn';

type CandidateTab = 'home' | 'tickets' | 'checkin';

interface CandidateAppProps {
  onLogout: () => void;
}

const NAV_ITEMS: { tab: CandidateTab; label: string; Icon: typeof Home }[] = [
  { tab: 'home',    label: 'Home',     Icon: Home },
  { tab: 'tickets', label: 'Tickets',  Icon: MessageSquare },
  { tab: 'checkin', label: 'Check-In', Icon: ClipboardCheck },
];

export default function CandidateApp({ onLogout }: CandidateAppProps) {
  const [activeTab, setActiveTab] = useState<CandidateTab>('home');

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top nav */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-text-primary text-lg">Second Chance</span>
            <span className="text-xs font-semibold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
              Candidate
            </span>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 text-sm font-semibold text-text-secondary hover:text-text-primary transition-colors"
          >
            <LogOut size={15} />
            Switch Role
          </button>
        </div>
      </header>

      {/* Page content — leaves room for bottom nav */}
      <main className="flex-1 overflow-y-auto pb-20">
        {activeTab === 'home'    && <CandidateDashboard onSwitchTab={(tab) => setActiveTab(tab)} />}
        {activeTab === 'tickets' && <MyTickets />}
        {activeTab === 'checkin' && <CheckIn />}
      </main>

      {/* Bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-100 shadow-lg">
        <div className="max-w-2xl mx-auto flex">
          {NAV_ITEMS.map(({ tab, label, Icon }) => {
            const active = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 flex flex-col items-center justify-center gap-1 py-2.5 transition-colors ${
                  active ? 'text-emerald-600' : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <Icon size={20} strokeWidth={active ? 2.5 : 1.8} />
                <span className={`text-xs font-medium ${active ? 'font-semibold' : ''}`}>{label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
