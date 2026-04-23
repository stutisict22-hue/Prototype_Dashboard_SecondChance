import { Participant } from '../data/types';
import { SummaryCards } from '../components/SummaryCards';
import { HeartRateChart, ActivityChart, SleepChart, StressChart } from '../components/Charts';
import ParticipantsTable from '../components/ParticipantsTable';
import AlertsPanel from '../components/AlertsPanel';
import { DashboardSummary } from '../data/types';

interface DashboardPageProps {
  summary: DashboardSummary;
  onViewParticipant: (participant: Participant) => void;
}

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
        <div className="xl:col-span-2">
          <ParticipantsTable onViewParticipant={onViewParticipant} />
        </div>
        <div>
          <AlertsPanel compact />
        </div>
      </div>
    </div>
  );
}