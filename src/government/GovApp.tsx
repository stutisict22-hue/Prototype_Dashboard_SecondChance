import { useState } from 'react';
import { LayoutDashboard, Users, MapPin, FileText, LogOut, Shield } from 'lucide-react';
import GovOverview from './pages/GovOverview';
import GovCandidates from './pages/GovCandidates';
import GovLocations from './pages/GovLocations';
import GovReports from './pages/GovReports';

type GovTab = 'overview' | 'candidates' | 'locations' | 'reports';

interface NavItem {
  id: GovTab;
  label: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { id: 'overview',   label: 'Overview',    icon: LayoutDashboard },
  { id: 'candidates', label: 'Candidates',  icon: Users },
  { id: 'locations',  label: 'Locations',   icon: MapPin },
  { id: 'reports',    label: 'Reports',     icon: FileText },
];

const tabLabels: Record<GovTab, string> = {
  overview:   'Overview',
  candidates: 'Candidates',
  locations:  'Locations',
  reports:    'Reports',
};

interface GovAppProps {
  onLogout: () => void;
}

export default function GovApp({ onLogout }: GovAppProps) {
  const [activeTab, setActiveTab] = useState<GovTab>('overview');

  const today = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen flex bg-slate-100">
      <aside className="w-60 bg-slate-800 flex flex-col h-screen sticky top-0 flex-shrink-0">
        <div className="p-5 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Shield size={20} className="text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-white text-sm">Second Chance</h1>
              <p className="text-xs text-slate-400">Excise Dept.</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {navItems.map(item => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    activeTab === item.id
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  <item.icon size={18} />
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-slate-700 space-y-2">
          <div className="flex items-start gap-3 p-3 bg-slate-700 rounded-lg">
            <div className="w-9 h-9 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Shield size={16} className="text-white" />
            </div>
            <div className="min-w-0">
              <p className="font-medium text-sm text-white truncate">Kerala Excise Officer</p>
              <span className="text-xs bg-indigo-700 text-indigo-200 px-1.5 py-0.5 rounded mt-0.5 inline-block">Gov. Official</span>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-700 hover:text-white transition-all"
          >
            <LogOut size={16} />
            Switch Role
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-10 bg-white border-b border-slate-200 px-5 py-3 flex items-center justify-between">
          <div className="text-sm text-slate-500">
            <span className="text-slate-400">Excise Department</span>
            <span className="mx-2 text-slate-300">/</span>
            <span className="font-medium text-slate-700">{tabLabels[activeTab]}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold bg-red-100 text-red-700 border border-red-200 px-2.5 py-1 rounded-full tracking-wide">READ ONLY</span>
            <span className="text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200 px-2.5 py-1 rounded-full">Kerala State</span>
            <span className="text-xs text-slate-400 ml-1">{today}</span>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-5">
          {activeTab === 'overview'   && <GovOverview />}
          {activeTab === 'candidates' && <GovCandidates />}
          {activeTab === 'locations'  && <GovLocations />}
          {activeTab === 'reports'    && <GovReports />}
        </main>
      </div>
    </div>
  );
}
