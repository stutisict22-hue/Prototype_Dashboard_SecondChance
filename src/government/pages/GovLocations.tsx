import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { govMetrics } from '../../data/mockData';

interface TooltipPayload {
  payload?: {
    name: string;
    active: number;
    critical: number;
  };
}

function DistrictTooltip({ active, payload }: { active?: boolean; payload?: TooltipPayload[] }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  if (!d) return null;
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3 text-sm">
      <p className="font-semibold text-slate-700">{d.name}</p>
      <p className="text-emerald-600">Active: {d.active}</p>
      {d.critical > 0 && <p className="text-red-500">Critical: {d.critical}</p>}
    </div>
  );
}

export default function GovLocations() {
  const districts = govMetrics.districts;

  const scatterData = districts.map(d => ({
    x: d.lng,
    y: d.lat,
    name: d.name,
    active: d.active,
    critical: d.critical,
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-700">District Activity Map</h2>
          <p className="text-sm text-slate-400 mt-0.5">Kerala — Active Candidates &amp; Critical Alerts</p>
        </div>
        <span className="text-xs font-medium bg-red-100 text-red-700 border border-red-200 px-2 py-0.5 rounded-full">READ ONLY</span>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <div className="flex items-center gap-4 mb-4">
          <span className="flex items-center gap-1.5 text-xs text-slate-500">
            <span className="w-3 h-3 rounded-full bg-red-400 inline-block"></span>Critical District
          </span>
          <span className="flex items-center gap-1.5 text-xs text-slate-500">
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>Active District
          </span>
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <ScatterChart margin={{ top: 10, right: 20, bottom: 10, left: 10 }}>
            <XAxis
              type="number"
              dataKey="x"
              domain={[75.2, 77.2]}
              name="Longitude"
              tick={{ fontSize: 11, fill: '#94a3b8' }}
              tickLine={false}
              axisLine={false}
              tickFormatter={v => `${v.toFixed(1)}°E`}
            />
            <YAxis
              type="number"
              dataKey="y"
              domain={[8.2, 12.2]}
              name="Latitude"
              tick={{ fontSize: 11, fill: '#94a3b8' }}
              tickLine={false}
              axisLine={false}
              tickFormatter={v => `${v.toFixed(1)}°N`}
            />
            <Tooltip content={<DistrictTooltip />} />
            <Scatter data={scatterData} r={10}>
              {scatterData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.critical > 0 ? '#f87171' : '#10b981'}
                  stroke={entry.critical > 0 ? '#dc2626' : '#059669'}
                  strokeWidth={1.5}
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
        <p className="text-xs text-slate-400 text-center mt-1">Longitude (East) vs Latitude (North) — Kerala districts</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {districts.map(d => {
          const capacity = d.active * 2;
          const pct = Math.round((d.active / capacity) * 100);
          return (
            <div key={d.name} className="bg-white border border-slate-200 rounded-xl p-4">
              <div className="flex items-start justify-between mb-3">
                <p className="font-semibold text-slate-700 text-sm">{d.name}</p>
                <div className="flex gap-1.5">
                  <span className="bg-emerald-50 text-emerald-700 text-xs px-2 py-0.5 rounded-full">{d.active} active</span>
                  {d.critical > 0
                    ? <span className="bg-red-50 text-red-600 text-xs font-semibold px-2 py-0.5 rounded-full">{d.critical} critical</span>
                    : <span className="bg-slate-100 text-slate-400 text-xs px-2 py-0.5 rounded-full">0 critical</span>
                  }
                </div>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 mb-2">
                <div
                  className={`h-2 rounded-full transition-all ${d.critical > 0 ? 'bg-red-400' : 'bg-emerald-500'}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-slate-400">
                <span>{d.active} / {capacity} capacity</span>
                <span>{d.lat.toFixed(4)}°N, {d.lng.toFixed(4)}°E</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
