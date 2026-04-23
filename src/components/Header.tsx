import { Search, Bell, RefreshCw } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  activeTab: string;
}

export default function Header({ activeTab }: HeaderProps) {
  const [lastSync, setLastSync] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLastSync(new Date());
      setIsRefreshing(false);
    }, 1000);
  };

  const tabTitles: Record<string, string> = {
    dashboard: 'Dashboard',
    participants: 'Participants',
    alerts: 'Alerts & Warnings',
    reports: 'Reports',
    settings: 'Settings'
  };

  return (
    <header className="min-h-16 bg-white border-b border-gray-200 flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3">
      <h2 className="text-lg sm:text-xl font-semibold text-text-primary">{tabTitles[activeTab]}</h2>

      <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-end">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
          <input
            type="text"
            placeholder="Search participants..."
            className="pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm w-40 sm:w-56 lg:w-64 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <button
          onClick={handleRefresh}
          className={`p-2 hover:bg-gray-100 rounded-lg transition-all ${isRefreshing ? 'animate-spin' : ''}`}
          title="Refresh data"
        >
          <RefreshCw size={18} className={isRefreshing ? 'text-primary' : 'text-text-secondary'} />
        </button>

        <button className="relative p-2 hover:bg-gray-100 rounded-lg">
          <Bell size={18} className="text-text-secondary" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full"></span>
        </button>

        <div className="hidden lg:block text-sm text-text-secondary whitespace-nowrap">
          Last sync: {lastSync.toLocaleTimeString()}
        </div>
      </div>
    </header>
  );
}