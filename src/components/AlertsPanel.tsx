import { mockAlerts } from '../data/mockData';
import { AlertTriangle, Clock, CheckCircle, XCircle, Phone } from 'lucide-react';

interface AlertsPanelProps {
  compact?: boolean;
}

const severityStyles = {
  critical: { bg: 'bg-red-50', border: 'border-red-200', icon: 'text-danger', badge: 'bg-red-100 text-danger' },
  warning: { bg: 'bg-amber-50', border: 'border-amber-200', icon: 'text-warning', badge: 'bg-amber-100 text-warning' },
  info: { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'text-primary', badge: 'bg-blue-100 text-primary' }
};

function formatTimestamp(ts: string): string {
  const diff = Date.now() - new Date(ts).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export default function AlertsPanel({ compact = false }: AlertsPanelProps) {
  const alerts = mockAlerts.filter(a => !a.acknowledged);

  if (compact) {
    return (
      <div className="bg-white rounded-xl p-5 border border-gray-200 h-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-text-primary">Recent Alerts</h3>
          <span className="text-xs text-danger font-medium">{alerts.length} active</span>
        </div>
        <div className="space-y-3 overflow-auto">
          {alerts.slice(0, 5).map(alert => {
            const styles = severityStyles[alert.severity];
            return (
              <div key={alert.id} className={`p-3 rounded-lg ${styles.bg} border ${styles.border}`}>
                <div className="flex items-start gap-3">
                  <AlertTriangle size={16} className={styles.icon} />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-text-primary truncate">{alert.title}</p>
                    <p className="text-xs text-text-secondary mt-1">{alert.participantName}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded ${styles.badge} flex-shrink-0`}>
                    {alert.severity}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-text-primary">Alerts & Warnings</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-text-secondary">Filter:</span>
          <select className="px-3 py-1.5 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
            <option>All Types</option>
            <option>HRV Spike</option>
            <option>Idle Alert</option>
            <option>Location</option>
          </select>
        </div>
      </div>

      {alerts.map(alert => {
        const styles = severityStyles[alert.severity];
        return (
          <div key={alert.id} className={`p-5 rounded-xl border ${styles.bg} ${styles.border}`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${styles.badge}`}>
                  <AlertTriangle size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary">{alert.title}</h3>
                  <p className="text-sm text-text-secondary mt-0.5">
                    <span className="font-medium">{alert.participantName}</span> ({alert.participantId})
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 text-xs font-medium rounded ${styles.badge}`}>
                  {alert.severity}
                </span>
                <span className="text-xs text-text-secondary flex items-center gap-1">
                  <Clock size={12} />
                  {formatTimestamp(alert.timestamp)}
                </span>
              </div>
            </div>

            <p className="text-sm text-text-secondary mb-4 pl-11">{alert.description}</p>

            <div className="flex items-center gap-3 pl-11">
              <button className="flex items-center gap-2 px-3 py-1.5 bg-danger text-white rounded-lg text-sm font-medium hover:bg-danger/90 transition-colors">
                <CheckCircle size={14} />
                Acknowledge
              </button>
              <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-text-primary rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                <Phone size={14} />
                Contact
              </button>
              <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-text-secondary rounded-lg text-sm hover:bg-gray-200 transition-colors">
                <XCircle size={14} />
                Dismiss
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}