import { Users, Activity, Bell, CheckCircle, TrendingUp, Shield } from 'lucide-react';
import { GovMetrics } from '../../data/types';

interface GovMetricsRowProps {
  metrics: GovMetrics;
}

interface KpiCardProps {
  label: string;
  value: string;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
}

function KpiCard({ label, value, icon: Icon, iconColor, iconBg }: KpiCardProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-4">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${iconBg}`}>
        <Icon size={20} className={iconColor} />
      </div>
      <div>
        <p className="text-2xl font-bold text-slate-800">{value}</p>
        <p className="text-xs text-slate-500 mt-0.5">{label}</p>
      </div>
    </div>
  );
}

export default function GovMetricsRow({ metrics }: GovMetricsRowProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
      <KpiCard
        label="Total Enrolled"
        value={String(metrics.totalEnrolled)}
        icon={Users}
        iconColor="text-slate-600"
        iconBg="bg-slate-100"
      />
      <KpiCard
        label="Active This Week"
        value={String(metrics.activeThisWeek)}
        icon={Activity}
        iconColor="text-emerald-600"
        iconBg="bg-emerald-50"
      />
      <KpiCard
        label="Alerts This Week"
        value={String(metrics.alertsThisWeek)}
        icon={Bell}
        iconColor="text-amber-600"
        iconBg="bg-amber-50"
      />
      <KpiCard
        label="Alerts Resolved"
        value={String(metrics.alertsResolved)}
        icon={CheckCircle}
        iconColor="text-emerald-600"
        iconBg="bg-emerald-50"
      />
      <KpiCard
        label="Avg Trust Score"
        value={`${metrics.avgTrustScore}%`}
        icon={TrendingUp}
        iconColor="text-blue-600"
        iconBg="bg-blue-50"
      />
      <KpiCard
        label="Compliance Rate"
        value={`${metrics.complianceRate}%`}
        icon={Shield}
        iconColor="text-indigo-600"
        iconBg="bg-indigo-50"
      />
    </div>
  );
}
