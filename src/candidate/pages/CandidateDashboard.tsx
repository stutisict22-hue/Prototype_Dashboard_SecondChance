import { Heart, Moon, Brain, ExternalLink, Plus } from 'lucide-react';
import {
  mockParticipants,
  mockTickets,
  candidateBadges,
  candidateMedication,
  candidatePOC,
  getParticipantBiometrics,
} from '../../data/mockData';
import { TicketStatus } from '../../data/types';
import SOSButton from '../components/SOSButton';
import POCCard from '../components/POCCard';
import MedicationReminder from '../components/MedicationReminder';
import BadgeReel from '../components/BadgeReel';

interface CandidateDashboardProps {
  onSwitchTab: (tab: 'tickets') => void;
}

const STATUS_STYLES: Record<TicketStatus, string> = {
  open: 'bg-red-100 text-red-700',
  in_progress: 'bg-amber-100 text-amber-700',
  resolved: 'bg-emerald-100 text-emerald-700',
};

const STATUS_LABELS: Record<TicketStatus, string> = {
  open: 'Open',
  in_progress: 'In Progress',
  resolved: 'Resolved',
};

function trustScoreColor(score: number): string {
  if (score >= 75) return 'bg-emerald-100 text-emerald-700';
  if (score >= 50) return 'bg-amber-100 text-amber-700';
  return 'bg-red-100 text-red-700';
}

function formatEnrollment(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString([], { month: 'short', year: 'numeric' });
}

export default function CandidateDashboard({ onSwitchTab }: CandidateDashboardProps) {
  const candidate = mockParticipants.find((p) => p.id === 'SC-003')!;
  const { current } = getParticipantBiometrics(candidate);
  const myTickets = mockTickets
    .filter((t) => t.participantId === 'SC-003')
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 2);

  const hrv = current.heartRate.variability;
  const sleepDuration = current.sleep?.duration ?? null;
  const stressLevel = current.stress.level;

  const [firstName] = candidate.name.split(' ');

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 flex flex-col gap-6">

      {/* Section 1: Greeting + Trust Score */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Hi, {firstName} 👋</h1>
            <p className="text-text-secondary text-sm mt-0.5">
              Phase {candidate.currentPhase} of 6 · Enrolled {formatEnrollment(candidate.enrollmentDate)}
            </p>
          </div>
          <span className={`text-sm font-bold px-3 py-1.5 rounded-full flex-shrink-0 ${trustScoreColor(candidate.trustScore)}`}>
            {candidate.trustScore} Trust
          </span>
        </div>
        <div className="flex items-center gap-2 mt-4">
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className={`h-2.5 flex-1 rounded-full transition-colors ${
                i < candidate.currentPhase ? 'bg-emerald-500' : 'bg-slate-100'
              }`}
            />
          ))}
        </div>
        <p className="text-xs text-text-secondary mt-2 text-right">Phase {candidate.currentPhase} of 6</p>
      </div>

      {/* Section 2: Vitals chips */}
      <div>
        <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-3">Live Vitals</h2>
        <div className="flex gap-3">
          {/* HRV */}
          <div className={`flex-1 flex flex-col items-center gap-1 rounded-2xl py-3 px-2 ${hrv >= 40 ? 'bg-emerald-50' : 'bg-red-50'}`}>
            <Heart size={18} className={hrv >= 40 ? 'text-emerald-500' : 'text-red-500'} />
            <p className={`text-lg font-bold ${hrv >= 40 ? 'text-emerald-700' : 'text-red-700'}`}>{hrv}ms</p>
            <p className="text-xs text-text-secondary">HRV</p>
          </div>
          {/* Sleep */}
          <div className={`flex-1 flex flex-col items-center gap-1 rounded-2xl py-3 px-2 ${
            sleepDuration === null ? 'bg-slate-50' : sleepDuration >= 7 ? 'bg-emerald-50' : 'bg-amber-50'
          }`}>
            <Moon size={18} className={
              sleepDuration === null ? 'text-slate-400' : sleepDuration >= 7 ? 'text-emerald-500' : 'text-amber-500'
            } />
            <p className={`text-lg font-bold ${
              sleepDuration === null ? 'text-slate-500' : sleepDuration >= 7 ? 'text-emerald-700' : 'text-amber-700'
            }`}>
              {sleepDuration !== null ? `${sleepDuration.toFixed(1)}hrs` : 'N/A'}
            </p>
            <p className="text-xs text-text-secondary">Sleep</p>
          </div>
          {/* Stress */}
          <div className={`flex-1 flex flex-col items-center gap-1 rounded-2xl py-3 px-2 ${
            stressLevel < 40 ? 'bg-emerald-50' : stressLevel < 66 ? 'bg-amber-50' : 'bg-red-50'
          }`}>
            <Brain size={18} className={
              stressLevel < 40 ? 'text-emerald-500' : stressLevel < 66 ? 'text-amber-500' : 'text-red-500'
            } />
            <p className={`text-lg font-bold ${
              stressLevel < 40 ? 'text-emerald-700' : stressLevel < 66 ? 'text-amber-700' : 'text-red-700'
            }`}>{stressLevel}</p>
            <p className="text-xs text-text-secondary">Stress</p>
          </div>
        </div>
      </div>

      {/* Section 3: SOS */}
      <div>
        <SOSButton workerName={candidatePOC[0].name} />
      </div>

      {/* Section 4: Care Team */}
      <div>
        <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-3">My Care Team</h2>
        <div className="grid grid-cols-2 gap-3">
          {candidatePOC.map((contact) => (
            <POCCard key={contact.name} contact={contact} />
          ))}
        </div>
      </div>

      {/* Section 5: Medications */}
      <div>
        <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-3">Medication Reminders</h2>
        <MedicationReminder medications={candidateMedication} />
      </div>

      {/* Section 6: Badges */}
      <div>
        <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-3">My Progress & Badges</h2>
        <BadgeReel badges={candidateBadges} />
      </div>

      {/* Section 7: Recent Tickets */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wide">Recent Tickets</h2>
          <button
            onClick={() => onSwitchTab('tickets')}
            className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700"
          >
            <Plus size={14} />
            New Ticket
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {myTickets.length === 0 && (
            <p className="text-sm text-text-secondary text-center py-4">No tickets yet.</p>
          )}
          {myTickets.map((ticket) => (
            <div key={ticket.id} className="bg-white border border-slate-100 rounded-2xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                  {ticket.category}
                </span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STATUS_STYLES[ticket.status]}`}>
                  {STATUS_LABELS[ticket.status]}
                </span>
              </div>
              <p className="text-sm text-text-primary truncate mb-2">{ticket.description}</p>
              <button
                onClick={() => onSwitchTab('tickets')}
                className="flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:text-emerald-700"
              >
                <ExternalLink size={12} />
                View
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
