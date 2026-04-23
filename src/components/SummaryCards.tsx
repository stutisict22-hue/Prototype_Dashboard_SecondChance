import { TrendingUp, TrendingDown, Users, AlertTriangle, ShieldCheck, CheckCircle } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  trend?: string;
  trendDirection?: 'up' | 'down';
  icon: React.ReactNode;
  color: 'primary' | 'success' | 'warning' | 'danger';
}

const colorClasses = {
  primary: 'bg-blue-50 text-primary border-blue-100',
  success: 'bg-emerald-50 text-success border-emerald-100',
  warning: 'bg-amber-50 text-warning border-amber-100',
  danger: 'bg-red-50 text-danger border-red-100',
};

export default function StatCard({ title, value, trend, trendDirection, icon, color }: StatCardProps) {
  return (
    <div className={`p-5 rounded-xl border ${colorClasses[color]} bg-white`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-text-secondary mb-1">{title}</p>
          <p className="text-3xl font-bold text-text-primary">{value}</p>
          {trend && (
            <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${
              trendDirection === 'up' ? 'text-success' : 'text-danger'
            }`}>
              {trendDirection === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              {trend}
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

interface SummaryCardsProps {
  summary: {
    totalParticipants: number;
    activeAlerts: number;
    avgTrustScore: number;
    complianceRate: number;
  };
}

export function SummaryCards({ summary }: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      <StatCard
        title="Total Participants"
        value={summary.totalParticipants}
        trend="+12 this month"
        trendDirection="up"
        icon={<Users size={20} />}
        color="primary"
      />
      <StatCard
        title="Active Alerts"
        value={summary.activeAlerts}
        trend="-3 from yesterday"
        trendDirection="down"
        icon={<AlertTriangle size={20} />}
        color="danger"
      />
      <StatCard
        title="Avg Trust Score"
        value={`${summary.avgTrustScore}%`}
        trend="+5% this month"
        trendDirection="up"
        icon={<ShieldCheck size={20} />}
        color="success"
      />
      <StatCard
        title="Compliance Rate"
        value={`${summary.complianceRate}%`}
        trend="+2% from last week"
        trendDirection="up"
        icon={<CheckCircle size={20} />}
        color="success"
      />
    </div>
  );
}