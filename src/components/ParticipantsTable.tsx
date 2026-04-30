import { useState } from 'react';
import { Participant } from '../data/types';
import { mockParticipants, getParticipantBiometrics } from '../data/mockData';
import { Eye, FileText, PhoneCall, Mail } from 'lucide-react';
import ContactModal from './ContactModal';
import EmailTicketModal from './EmailTicketModal';
import { Toast } from './Toast';

interface ParticipantsTableProps {
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

function formatLastSync(timestamp: string): string {
  const diff = Date.now() - new Date(timestamp).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export default function ParticipantsTable({ onViewParticipant }: ParticipantsTableProps) {
  const displayParticipants = mockParticipants.slice(0, 10);

  const [contactParticipant, setContactParticipant] = useState<Participant | null>(null);
  const [emailParticipant, setEmailParticipant] = useState<Participant | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const getStatusBadge = (participant: Participant, current: { alertFlags: { hrvSpike: boolean; idleAlert: boolean; locationAlert: boolean } }) => {
    if (current.alertFlags.hrvSpike || current.alertFlags.locationAlert) {
      return <span className="px-2 py-1 bg-red-100 text-danger text-xs font-medium rounded-full">Critical</span>;
    }
    if (current.alertFlags.idleAlert) {
      return <span className="px-2 py-1 bg-amber-100 text-warning text-xs font-medium rounded-full">Warning</span>;
    }
    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${participant.isActive ? 'bg-emerald-100 text-success' : 'bg-gray-100 text-text-secondary'}`}>
      {participant.isActive ? 'Active' : 'Inactive'}
    </span>;
  };

  const getAlertCount = (participant: Participant) => {
    const { current } = getParticipantBiometrics(participant);
    const count = (current.alertFlags.hrvSpike ? 1 : 0) +
                 (current.alertFlags.idleAlert ? 1 : 0) +
                 (current.alertFlags.locationAlert ? 1 : 0) +
                 (current.alertFlags.sleepAnomaly ? 1 : 0);
    if (count === 0) return <span className="text-text-secondary">-</span>;
    return <span className={`px-2 py-1 text-xs font-medium rounded ${
      count >= 2 ? 'bg-red-100 text-danger' : 'bg-amber-100 text-warning'
    }`}>{count}</span>;
  };

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-5 border-b border-gray-200 flex items-center justify-between">
          <h3 className="font-semibold text-text-primary">Participants</h3>
          <span className="text-sm text-text-secondary">{displayParticipants.length} of {mockParticipants.length} shown</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-text-secondary">ID</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-text-secondary">Name</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-text-secondary">Phase</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-text-secondary">Trust Score</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-text-secondary">Last Sync</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-text-secondary">Status</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-text-secondary">Alerts</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-text-secondary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayParticipants.map(participant => {
                const { current } = getParticipantBiometrics(participant);
                return (
                  <tr key={participant.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4 text-sm font-medium text-primary">{participant.id}</td>
                    <td className="px-5 py-4">
                      <div>
                        <p className="font-medium text-text-primary">{participant.name}</p>
                        <p className="text-xs text-text-secondary">Age {participant.age}</p>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded">
                        Phase {participant.currentPhase}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <TrustScoreCircle score={participant.trustScore} />
                    </td>
                    <td className="px-5 py-4 text-sm text-text-secondary">
                      {formatLastSync(current.timestamp)}
                    </td>
                    <td className="px-5 py-4">
                      {getStatusBadge(participant, current)}
                    </td>
                    <td className="px-5 py-4">
                      {getAlertCount(participant)}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onViewParticipant(participant)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          title="View details"
                        >
                          <Eye size={16} className="text-text-secondary" />
                        </button>
                        <button
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Generate report"
                        >
                          <FileText size={16} className="text-text-secondary" />
                        </button>
                        <button
                          onClick={() => setContactParticipant(participant)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Contact participant"
                        >
                          <PhoneCall size={16} className="text-text-secondary" />
                        </button>
                        <button
                          onClick={() => setEmailParticipant(participant)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Send email update"
                        >
                          <Mail size={16} className="text-text-secondary" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {contactParticipant && (
        <ContactModal
          participant={contactParticipant}
          onClose={() => setContactParticipant(null)}
          onEmailClick={() => {
            setEmailParticipant(contactParticipant);
            setContactParticipant(null);
          }}
        />
      )}
      {emailParticipant && (
        <EmailTicketModal
          participant={emailParticipant}
          onClose={() => setEmailParticipant(null)}
          onSent={() => setToastMessage(`Email sent to ${emailParticipant.name}`)}
        />
      )}
      {toastMessage && (
        <Toast message={toastMessage} type="success" onClose={() => setToastMessage(null)} />
      )}
    </>
  );
}
