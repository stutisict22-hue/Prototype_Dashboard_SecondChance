import { Participant } from '../data/types';
import { SummaryCards } from '../components/SummaryCards';
import { HeartRateChart, ActivityChart, SleepChart, StressChart } from '../components/Charts';
import ParticipantsTable from '../components/ParticipantsTable';
import AlertsPanel from '../components/AlertsPanel';
import { DashboardSummary } from '../data/types';
import { Zap } from 'lucide-react';

interface DashboardPageProps {
  summary: DashboardSummary;
  onViewParticipant: (participant: Participant) => void;
}

const AI_PREDICTIONS = [
  { id: 'SC-003', name: 'Vineeth Thomas', risk: 75 },
  { id: 'SC-010', name: 'Joseph Sebastian', risk: 68 },
  { id: 'SC-008', name: 'Ravi Shankar', risk: 52 },
];

export default function DashboardPage({ summary, onViewParticipant }: DashboardPageProps) {
  return (
    <div className="space-y-6">
      <SummaryCards summary={summary} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HeartRateChart />
        <ActivityChart />
        <SleepChart />
        <StressChart />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <Zap size={16} className="text-warning" />
              <span className="font-semibold text-text-primary text-sm">AI Risk Predictions</span>
            </div>
            <p className="text-xs text-text-secondary mb-3">Next 24 hours — based on biometric trends</p>
            <div className="flex flex-wrap gap-3">
              {AI_PREDICTIONS.map(p => (
                <div key={p.id} className="flex items-center gap-2 bg-white border border-amber-200 rounded-lg px-3 py-2">
                  <span className="text-sm font-medium text-text-primary">{p.name}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                    p.risk >= 70 ? 'bg-red-100 text-danger' : 'bg-amber-100 text-warning'
                  }`}>
                    {p.risk}% relapse risk
                  </span>
                  <span className="text-xs text-text-secondary">AI Prediction</span>
                </div>
              ))}
            </div>
          </div>

          <ParticipantsTable onViewParticipant={onViewParticipant} />
        </div>
        <div>
          <AlertsPanel compact />
        </div>
      </div>
    </div>
  );
}
