import { useState } from 'react';
import { Download, BarChart2, Calendar, Bell, TrendingUp, Shield, FileText } from 'lucide-react';

interface ReportCard {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  buttonLabel: string;
}

const reportCards: ReportCard[] = [
  { id: 'court',     title: 'Court Compliance Report',   description: 'Full candidate history for court proceedings',  icon: Download,   buttonLabel: 'Export for Court' },
  { id: 'district',  title: 'District Summary Report',   description: 'Aggregate stats by district',                   icon: BarChart2,  buttonLabel: 'Download Report' },
  { id: 'monthly',   title: 'Monthly Progress Report',   description: '30-day program metrics',                        icon: Calendar,   buttonLabel: 'Generate PDF' },
  { id: 'alerts',    title: 'Alert History Export',      description: 'All alerts with resolutions',                   icon: Bell,       buttonLabel: 'Export CSV' },
  { id: 'trust',     title: 'Trust Score Analysis',      description: 'Score trends and risk analysis',                icon: TrendingUp, buttonLabel: 'Generate Report' },
  { id: 'audit',     title: 'Compliance Audit Trail',    description: 'Full audit log for compliance review',          icon: Shield,     buttonLabel: 'Export Audit' },
];

interface ReportStatus {
  state: 'idle' | 'generating' | 'ready';
}

const mockRecentReports = [
  { id: 'R-001', date: '2026-04-28', type: 'District Summary Report',    generatedBy: 'Excise Officer — Kochi',             status: 'Delivered' },
  { id: 'R-002', date: '2026-04-25', type: 'Monthly Progress Report',    generatedBy: 'Excise Officer — HQ',                status: 'Delivered' },
  { id: 'R-003', date: '2026-04-20', type: 'Court Compliance Report',    generatedBy: 'Legal Dept — Thiruvananthapuram',    status: 'Delivered' },
  { id: 'R-004', date: '2026-04-15', type: 'Trust Score Analysis',       generatedBy: 'Excise Officer — HQ',                status: 'Delivered' },
  { id: 'R-005', date: '2026-04-10', type: 'Alert History Export',       generatedBy: 'Excise Officer — Thrissur',          status: 'Pending' },
];

export default function GovReports() {
  const [statuses, setStatuses] = useState<Record<string, ReportStatus>>({});

  const handleGenerate = (id: string) => {
    setStatuses(s => ({ ...s, [id]: { state: 'generating' } }));
    setTimeout(() => {
      setStatuses(s => ({ ...s, [id]: { state: 'ready' } }));
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-700">Reports &amp; Export</h2>
          <p className="text-sm text-slate-400 mt-0.5">Generate compliance reports for legal and administrative use</p>
        </div>
        <span className="text-xs font-medium bg-red-100 text-red-700 border border-red-200 px-2 py-0.5 rounded-full">READ ONLY</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {reportCards.map(card => {
          const status = statuses[card.id];
          const Icon = card.icon;
          return (
            <div key={card.id} className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 bg-indigo-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-indigo-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-700 text-sm">{card.title}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{card.description}</p>
                </div>
              </div>

              {status?.state === 'generating' && (
                <div className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                  Generating secure document...
                </div>
              )}
              {status?.state === 'ready' && (
                <div className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2 flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full inline-block"></span>
                  Ready for download
                </div>
              )}

              <button
                onClick={() => handleGenerate(card.id)}
                disabled={status?.state === 'generating'}
                className="mt-auto self-start text-xs font-medium bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white px-3 py-1.5 rounded-lg transition-colors"
              >
                {card.buttonLabel}
              </button>
            </div>
          );
        })}
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <h3 className="font-semibold text-slate-700 mb-4 flex items-center gap-2">
          <FileText size={16} className="text-slate-400" />
          Recent Reports
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Date</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Report Type</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Generated By</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Download</th>
              </tr>
            </thead>
            <tbody>
              {mockRecentReports.map(r => (
                <tr key={r.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3 text-xs text-slate-400 whitespace-nowrap">{r.date}</td>
                  <td className="py-2.5 px-3 text-slate-700">{r.type}</td>
                  <td className="py-2.5 px-3 text-slate-500 text-xs">{r.generatedBy}</td>
                  <td className="py-2.5 px-3">
                    {r.status === 'Delivered'
                      ? <span className="bg-emerald-50 text-emerald-700 text-xs px-2 py-0.5 rounded-full">Delivered</span>
                      : <span className="bg-amber-50 text-amber-700 text-xs px-2 py-0.5 rounded-full">Pending</span>
                    }
                  </td>
                  <td className="py-2.5 px-3">
                    <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors" title="Download">
                      <Download size={14} className="text-slate-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
