import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { mockParticipants, mockAlerts } from '../../data/mockData';

function trustColor(score: number): string {
  if (score >= 75) return 'text-emerald-600';
  if (score >= 50) return 'text-amber-600';
  return 'text-red-600';
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

export default function GovCandidates() {
  const [search, setSearch] = useState('');
  const [districtFilter, setDistrictFilter] = useState('All');
  const [phaseFilter, setPhaseFilter] = useState('All');

  const districts = useMemo(() => {
    const set = new Set(mockParticipants.map(p => p.contact?.district ?? '').filter(Boolean));
    return ['All', ...Array.from(set).sort()];
  }, []);

  const alertCountFor = (id: string) =>
    mockAlerts.filter(a => a.participantId === id && !a.acknowledged).length;

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return mockParticipants.filter(p => {
      const matchesSearch = !q || p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q);
      const matchesDistrict = districtFilter === 'All' || p.contact?.district === districtFilter;
      const matchesPhase = phaseFilter === 'All' || String(p.currentPhase) === phaseFilter;
      return matchesSearch && matchesDistrict && matchesPhase;
    });
  }, [search, districtFilter, phaseFilter]);

  return (
    <div className="space-y-4">
      <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-2 text-xs text-amber-700">
        Showing limited data. Contact details restricted per Kerala Health Data Policy.
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <div className="relative flex-1 min-w-48">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name or ID..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 bg-slate-50"
            />
          </div>

          <select
            value={districtFilter}
            onChange={e => setDistrictFilter(e.target.value)}
            className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-200 text-slate-700"
          >
            {districts.map(d => (
              <option key={d} value={d}>{d === 'All' ? 'All Districts' : d}</option>
            ))}
          </select>

          <select
            value={phaseFilter}
            onChange={e => setPhaseFilter(e.target.value)}
            className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-200 text-slate-700"
          >
            <option value="All">All Phases</option>
            {[1, 2, 3, 4, 5, 6].map(n => (
              <option key={n} value={String(n)}>Phase {n}</option>
            ))}
          </select>

          <span className="ml-auto text-xs text-slate-400">{filtered.length} of {mockParticipants.length} records</span>
          <span className="text-xs font-medium bg-red-100 text-red-700 border border-red-200 px-2 py-0.5 rounded-full">READ ONLY</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">ID</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Name</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Age</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">District</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Phase</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Trust Score</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Alerts</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Enrolled</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => {
                const alerts = alertCountFor(p.id);
                return (
                  <tr key={p.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-3 font-mono text-xs text-slate-500">{p.id}</td>
                    <td className="py-2.5 px-3 font-medium text-slate-700">{p.name}</td>
                    <td className="py-2.5 px-3 text-slate-500">{p.age}</td>
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
                    <td className="py-2.5 px-3">
                      {alerts > 0
                        ? <span className="bg-red-50 text-red-600 text-xs font-semibold px-2 py-0.5 rounded-full">{alerts}</span>
                        : <span className="text-slate-300">—</span>
                      }
                    </td>
                    <td className="py-2.5 px-3 text-slate-400 text-xs whitespace-nowrap">{formatDate(p.enrollmentDate)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-10 text-slate-400 text-sm">No candidates match the current filters.</div>
          )}
        </div>
      </div>
    </div>
  );
}
