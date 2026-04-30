import { Home, Users, Bell, FileText, Settings, User, LogOut, MessageSquare } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout?: () => void;
}

const navItems = [
  { id: 'dashboard',    label: 'Dashboard',    icon: Home },
  { id: 'participants', label: 'Participants',  icon: Users },
  { id: 'alerts',       label: 'Alerts',        icon: Bell },
  { id: 'tickets',      label: 'Tickets',       icon: MessageSquare },
  { id: 'reports',      label: 'Reports',       icon: FileText },
  { id: 'settings',     label: 'Settings',      icon: Settings },
];

export default function Sidebar({ activeTab, setActiveTab, onLogout }: SidebarProps) {
  return (
    <aside className="w-60 bg-white border-r border-gray-200 flex flex-col h-screen">
      <div className="p-5 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">SC</span>
          </div>
          <div>
            <h1 className="font-semibold text-text-primary text-sm">Second Chance</h1>
            <p className="text-xs text-text-secondary">Care Team Portal</p>
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
                    ? 'bg-primary text-white'
                    : 'text-text-secondary hover:bg-gray-100'
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200 space-y-2">
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
            <User size={18} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm text-text-primary truncate">Priya Suresh</p>
            <p className="text-xs text-text-secondary">Social Worker</p>
          </div>
        </div>
        {onLogout && (
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-text-secondary hover:bg-red-50 hover:text-danger transition-all"
          >
            <LogOut size={16} />
            Switch Role
          </button>
        )}
      </div>
    </aside>
  );
}
