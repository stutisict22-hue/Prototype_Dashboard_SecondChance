import { Bell, Shield, Database, Users, Clock } from 'lucide-react';

export default function SettingsPage() {
  const settingsSections = [
    {
      title: 'Notifications',
      icon: Bell,
      items: ['Alert sounds', 'Desktop notifications', 'Email alerts', 'SMS notifications']
    },
    {
      title: 'Security',
      icon: Shield,
      items: ['Two-factor authentication', 'Session timeout', 'Access logs', 'Data encryption']
    },
    {
      title: 'Data Management',
      icon: Database,
      items: ['Data retention', 'Backup settings', 'Export formats', 'API access']
    },
    {
      title: 'User Management',
      icon: Users,
      items: ['Team members', 'Roles & permissions', 'Activity logs', 'Invite member']
    },
    {
      title: 'Monitoring',
      icon: Clock,
      items: ['Sync interval', 'Refresh rate', 'Alert thresholds', 'Location tracking']
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-text-primary">Settings</h2>
        <p className="text-sm text-text-secondary">Configure your dashboard preferences</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {settingsSections.map(section => (
          <div key={section.title} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <section.icon size={20} className="text-primary" />
              </div>
              <h3 className="font-semibold text-text-primary">{section.title}</h3>
            </div>
            <div className="space-y-3">
              {section.items.map(item => (
                <label key={item} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                  <span className="text-sm text-text-primary">{item}</span>
                  <div className="relative">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-10 h-6 bg-gray-300 rounded-full peer-checked:bg-primary transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-4"></div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-3">
        <button className="w-full sm:w-auto px-4 py-2 bg-gray-100 text-text-primary rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
          Cancel
        </button>
        <button className="w-full sm:w-auto px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  );
}