import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Area, AreaChart, ComposedChart, Bar } from 'recharts';
import { generateHeartRateChartData, generateActivityChartData, generateSleepChartData, generateStressChartData } from '../data/mockData';

export function HeartRateChart() {
  const data = generateHeartRateChartData();
  const chartData = data.hours.map((hour, i) => ({
    hour,
    current: data.currentValues[i],
    avg: data.avgValues[i]
  }));

  return (
    <div className="bg-white rounded-xl p-5 border border-gray-200 h-full flex flex-col min-h-[320px]">
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <h3 className="font-semibold text-text-primary">Heart Rate Trends</h3>
        <span className="text-xs text-text-secondary">24 hours</span>
      </div>
      <div className="flex-1 min-h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="hour" tick={{ fontSize: 10 }} stroke="#64748b" />
            <YAxis domain={[40, 180]} tick={{ fontSize: 10 }} stroke="#64748b" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '12px'
              }}
            />
            <ReferenceLine y={60} stroke="#10b981" strokeDasharray="3 3" label={{ value: 'Low', fontSize: 10, fill: '#10b981' }} />
            <ReferenceLine y={100} stroke="#f59e0b" strokeDasharray="3 3" label={{ value: 'High', fontSize: 10, fill: '#f59e0b' }} />
            <ReferenceLine y={120} stroke="#ef4444" strokeDasharray="3 3" label={{ value: 'Critical', fontSize: 10, fill: '#ef4444' }} />
            <Line type="monotone" dataKey="current" stroke="#2563eb" strokeWidth={2} dot={false} name="Current" />
            <Line type="monotone" dataKey="avg" stroke="#7c3aed" strokeWidth={2} strokeDasharray="5 5" dot={false} name="7-day Avg" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center gap-4 mt-3 text-xs flex-shrink-0">
        <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-primary rounded"></span> Current</span>
        <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-secondary rounded" style={{backgroundImage: 'repeating-linear-gradient(90deg, #7c3aed 0, #7c3aed 4px, transparent 4px, transparent 8px)'}}></span> 7-day Avg</span>
        <span className="text-text-secondary ml-4">Normal: 60-100 BPM</span>
      </div>
    </div>
  );
}

export function ActivityChart() {
  const data = generateActivityChartData();
  const chartData = data.days.map((day, i) => ({
    day,
    steps: data.steps[i],
    calories: data.calories[i]
  }));

  return (
    <div className="bg-white rounded-xl p-5 border border-gray-200 h-full flex flex-col min-h-[320px]">
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <h3 className="font-semibold text-text-primary">Activity Overview</h3>
        <span className="text-xs text-text-secondary">This week</span>
      </div>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="day" tick={{ fontSize: 10 }} stroke="#64748b" />
            <YAxis tick={{ fontSize: 10 }} stroke="#64748b" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '12px'
              }}
            />
            <defs>
              <linearGradient id="stepsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="steps" stroke="#2563eb" strokeWidth={2} fill="url(#stepsGradient)" name="Steps" />
            <ReferenceLine y={10000} stroke="#10b981" strokeDasharray="3 3" label={{ value: 'Goal: 10k', fontSize: 10, fill: '#10b981' }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center gap-4 mt-3 text-xs flex-shrink-0">
        <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-primary rounded"></span> Steps</span>
        <span className="text-text-secondary">Daily goal: 10,000 steps</span>
      </div>
    </div>
  );
}

export function SleepChart() {
  const data = generateSleepChartData();
  const chartData = data.days.map((day, i) => ({
    day,
    hours: data.hours[i],
    quality: data.quality[i]
  }));

  return (
    <div className="bg-white rounded-xl p-5 border border-gray-200 h-full flex flex-col min-h-[320px]">
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <h3 className="font-semibold text-text-primary">Sleep Quality</h3>
        <span className="text-xs text-text-secondary">This week</span>
      </div>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="day" tick={{ fontSize: 10 }} stroke="#64748b" />
            <YAxis yAxisId="left" domain={[0, 12]} tick={{ fontSize: 10 }} stroke="#64748b" />
            <YAxis yAxisId="right" domain={[0, 100]} orientation="right" tick={{ fontSize: 10 }} stroke="#64748b" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '12px'
              }}
            />
            <Bar yAxisId="left" dataKey="hours" fill="#7c3aed" fillOpacity={0.6} name="Hours" radius={[4, 4, 0, 0]} />
            <Line yAxisId="right" type="monotone" dataKey="quality" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981', strokeWidth: 2 }} name="Quality Score" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center gap-4 mt-3 text-xs flex-shrink-0">
        <span className="flex items-center gap-1"><span className="w-3 h-3 bg-secondary rounded" style={{opacity: 0.6}}></span> Hours</span>
        <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-success rounded"></span> Quality (0-100)</span>
        <span className="text-text-secondary ml-4">Good: 7-9 hrs, quality &gt;70</span>
      </div>
    </div>
  );
}

export function StressChart() {
  const data = generateStressChartData();
  const chartData = data.hours.map((hour, i) => ({
    hour,
    level: data.levels[i]
  }));

  return (
    <div className="bg-white rounded-xl p-5 border border-gray-200 h-full flex flex-col min-h-[320px]">
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <h3 className="font-semibold text-text-primary">Stress Level Analysis</h3>
        <span className="text-xs text-text-secondary">24 hours</span>
      </div>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="hour" tick={{ fontSize: 10 }} stroke="#64748b" />
            <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} stroke="#64748b" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '12px'
              }}
            />
            <defs>
              <linearGradient id="stressGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="50%" stopColor="#f59e0b" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0.3}/>
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="level" stroke="#f59e0b" strokeWidth={2} fill="url(#stressGradient)" name="Stress Level" />
            <ReferenceLine y={33} stroke="#10b981" strokeDasharray="3 3" label={{ value: 'Low', fontSize: 10, fill: '#10b981' }} />
            <ReferenceLine y={66} stroke="#f59e0b" strokeDasharray="3 3" label={{ value: 'Moderate', fontSize: 10, fill: '#f59e0b' }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center gap-2 mt-3 text-xs flex-shrink-0">
        <span className="px-2 py-1 bg-emerald-100 text-success rounded">Low: 0-33</span>
        <span className="px-2 py-1 bg-amber-100 text-warning rounded">Moderate: 34-66</span>
        <span className="px-2 py-1 bg-red-100 text-danger rounded">High: 67-100</span>
      </div>
    </div>
  );
}