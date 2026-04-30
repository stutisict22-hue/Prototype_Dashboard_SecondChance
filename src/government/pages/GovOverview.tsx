import { govMetrics, mockAlerts, mockParticipants } from '../../data/mockData';
import GovMetricsRow from '../components/GovMetricsRow';

function timeAgo(timestamp: string): string {
  const diff = Date.now() - new Date(timestamp).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function severityBadge(severity: string) {
  if (severity === 'critical') return 'bg-red-100 text-red-700 border border-red-200';
  if (severity === 'warning') return 'bg-amber-100 text-amber-700 border border-amber-200';
  return 'bg-slate-100 text-slate-600 border border-slate-200';
}

function trustColor(score: number): string {
  if (score >= 75) return 'text-emerald-600';
  if (score >= 50) return 'text-amber-600';
  return 'text-red-600';
}

export default function GovOverview() {
  const openAlerts = mockAlerts.filter(a => !a.acknowledged);
  const resolvedCount = govMetrics.alertsResolved;
  const totalCount = govMetrics.alertsThisWeek;
  const resolvedPct = Math.round((resolvedCount / totalCount) * 100);

  const atRisk = [...mockParticipants]
    .sort((a, b) => a.trustScore - b.trustScore)
    .slice(0, 5);

  const alertCount = (participantId: string) =>
    mockAlerts.filter(a => a.participantId === participantId && !a.acknowledged).length;

  return (
    <div className="space-y-6">
      <GovMetricsRow metrics={govMetrics} />

      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-slate-700">Alert Activity — This Week</h3>
          <span className="text-xs text-slate-400 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded">READ ONLY</span>
        </div>

        <div className="mb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex-1 h-5 bg-slate-100 rounded-full overflow-hidden flex">
              <div
                className="h-full bg-emerald-500 flex items-center justify-center transition-all"
                style={{ width: `${resolvedPct}%` }}
              >
                <span className="text-xs text-white font-medium px-1">{resolvedCount}</span>
              </div>
              <div
                className="h-full bg-red-400 flex items-center justify-center"
                style={{ width: `${100 - resolvedPct}%` }}
              >
                <span className="text-xs text-white font-medium px-1">{totalCount - resolvedCount}</span>
              </div>
            </div>
            <span className="text-xs text-slate-500 whitespace-nowrap">{resolvedCount}/{totalCount} resolved</span>
          </div>
          <div className="flex gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>Resolved ({resolvedCount})</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block"></span>Open ({totalCount - resolvedCount})</span>
          </div>
        </div>

        <div className="space-y-2 mt-4">
          {openAlerts.slice(0, 4).map(alert => (
            <div key={alert.id} className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-100 rounded-lg">
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${severityBadge(alert.severity)}`}>
                {alert.severity}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-700 truncate">{alert.participantName}</p>
                <p className="text-xs text-slate-500 truncate">{alert.title}</p>
              </div>
              <span className="text-xs text-slate-400 whitespace-nowrap">{timeAgo(alert.timestamp)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <h3 className="font-semibold text-slate-700 mb-4">At-Risk Candidates (Top 5)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left py-2 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">ID</th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Name</th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">District</th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Phase</th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Trust Score</th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
              </tr>
            </thead>
            <tbody>
              {atRisk.map(p => (
                <tr
                  key={p.id}
                  className="border-b border-slate-50 hover:bg-slate-50 transition-colors group"
                  title="Read Only — contact details restricted"
                >
                  <td className="py-2.5 px-3 font-mono text-xs text-slate-500">{p.id}</td>
                  <td className="py-2.5 px-3 font-medium text-slate-700">{p.name}</td>
                  <td className="py-2.5 px-3 text-slate-500">{p.contact?.district ?? '—'}</td>
                  <td className="py-2.5 px-3">
                    <span className="bg-indigo-50 text-indigo-700 text-xs px-2 py-0.5 rounded-full">Phase {p.currentPhase}</span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className={`font-bold ${trustColor(p.trustScore)}`}>{p.trustScore}</span>
                  </td>
                  <td className="py-2.5 px-3">
                    {p.isActive
                      ? <span className="bg-emerald-50 text-emerald-700 text-xs px-2 py-0.5 rounded-full">Active</span>
                      : <span className="bg-slate-100 text-slate-500 text-xs px-2 py-0.5 rounded-full">Inactive</span>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-400 mt-3 italic">Hover any row for tooltip. Alert counts: {atRisk.map(p => `${p.name.split(' ')[0]}: ${alertCount(p.id)}`).join(', ')}.</p>
      </div>
    </div>
  );
}
