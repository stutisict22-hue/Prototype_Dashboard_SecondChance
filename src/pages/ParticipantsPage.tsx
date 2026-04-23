import { Search, Filter, Download, FileText } from 'lucide-react';
import { mockParticipants, getParticipantBiometrics } from '../data/mockData';
import { Participant } from '../data/types';

interface ParticipantsPageProps {
  onViewParticipant: (participant: Participant) => void;
}

function TrustScoreCircle({ score }: { score: number }) {
  const circumference = 2 * Math.PI * 18;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 75 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444';

  return (
    <div className="relative w-12 h-12">
      <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
        <circle cx="18" cy="18" r="16" fill="none" stroke="#e2e8f0" strokeWidth="3" />
        <circle
          cx="18" cy="18" r="16"
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold" style={{ color }}>
        {score}
      </span>
    </div>
  );
}

function PhaseProgress({ phase }: { phase: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5, 6].map(p => (
          <div
            key={p}
            className={`w-2 h-2 rounded-full ${p <= phase ? 'bg-primary' : 'bg-gray-300'}`}
          />
        ))}
      </div>
      <span className="text-xs text-text-secondary ml-1">Phase {phase}</span>
    </div>
  );
}

export default function ParticipantsPage({ onViewParticipant }: ParticipantsPageProps) {
  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-text-primary">All Participants</h2>
          <p className="text-sm text-text-secondary">Manage and monitor all registered participants</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-text-primary rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
            <Filter size={16} />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-4">
          <div className="relative w-full lg:flex-1 lg:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
            <input
              type="text"
              placeholder="Search by name or ID..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <select className="px-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-full sm:w-auto">
            <option>All Phases</option>
            <option>Phase 1</option>
            <option>Phase 2</option>
            <option>Phase 3</option>
            <option>Phase 4</option>
            <option>Phase 5</option>
            <option>Phase 6</option>
          </select>
          <select className="px-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-full sm:w-auto">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-text-secondary">Participant</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-text-secondary">ID</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-text-secondary">Phase</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-text-secondary">Trust Score</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-text-secondary">Enrolled</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-text-secondary">Status</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-text-secondary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockParticipants.map(participant => {
                const { current } = getParticipantBiometrics(participant);
                const hasAlerts = current.alertFlags.hrvSpike || current.alertFlags.locationAlert || current.alertFlags.idleAlert;

                return (
                  <tr key={participant.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-white font-medium">
                          {participant.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-medium text-text-primary">{participant.name}</p>
                          <p className="text-xs text-text-secondary">Age {participant.age}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm font-medium text-primary">{participant.id}</td>
                    <td className="px-5 py-4"><PhaseProgress phase={participant.currentPhase} /></td>
                    <td className="px-5 py-4"><TrustScoreCircle score={participant.trustScore} /></td>
                    <td className="px-5 py-4 text-sm text-text-secondary">{participant.enrollmentDate}</td>
                    <td className="px-5 py-4">
                      {hasAlerts ? (
                        <span className="px-2 py-1 bg-red-100 text-danger text-xs font-medium rounded-full">Alert</span>
                      ) : (
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          participant.isActive ? 'bg-emerald-100 text-success' : 'bg-gray-100 text-text-secondary'
                        }`}>
                          {participant.isActive ? 'Active' : 'Inactive'}
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onViewParticipant(participant)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary text-xs font-medium rounded-lg hover:bg-primary/20 transition-colors"
                        >
                          <FileText size={14} />
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-gray-200 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm text-text-secondary">Showing {mockParticipants.length} participants</span>
          <div className="flex items-center gap-2 flex-wrap">
            <button className="px-3 py-1.5 bg-gray-100 text-text-secondary rounded-lg text-sm hover:bg-gray-200 transition-colors disabled:opacity-50" disabled>
              Previous
            </button>
            <button className="px-3 py-1.5 bg-primary text-white rounded-lg text-sm">1</button>
            <button className="px-3 py-1.5 bg-gray-100 text-text-primary rounded-lg text-sm hover:bg-gray-200 transition-colors">2</button>
            <button className="px-3 py-1.5 bg-gray-100 text-text-primary rounded-lg text-sm hover:bg-gray-200 transition-colors">3</button>
            <button className="px-3 py-1.5 bg-gray-100 text-text-secondary rounded-lg text-sm hover:bg-gray-200 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}