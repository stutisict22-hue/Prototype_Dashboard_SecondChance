import { useState } from 'react';
import { X, Send } from 'lucide-react';
import { Participant } from '../data/types';

interface EmailTicketModalProps {
  participant: Participant;
  onClose: () => void;
  onSent: () => void;
}

export default function EmailTicketModal({ participant, onClose, onSent }: EmailTicketModalProps) {
  const today = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

  const defaultSubject = `Second Chance Update: ${participant.name} — ${today}`;

  const defaultBody = `Dear ${participant.name},

This is your scheduled update from the Second Chance Care Team.

Current Trust Score: ${participant.trustScore}/100
Program Phase: Phase ${participant.currentPhase} of 6
Status: Active

Your social worker is available for support. Please reach out if you need assistance.

Warm regards,
Priya Suresh
Social Worker — Second Chance Program`;

  const [subject, setSubject] = useState(defaultSubject);
  const [body, setBody] = useState(defaultBody);

  const handleSend = () => {
    onSent();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl max-w-lg w-full mx-4 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Send size={16} className="text-primary" />
            <h3 className="font-semibold text-text-primary">Send Email Update</h3>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={16} className="text-text-secondary" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">To</label>
            <input
              type="email"
              value={participant.contact?.email ?? ''}
              readOnly
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 text-text-secondary cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={e => setSubject(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">Body</label>
            <textarea
              value={body}
              onChange={e => setBody(e.target.value)}
              rows={10}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none font-mono"
            />
          </div>
        </div>

        <div className="px-5 pb-5 flex flex-col gap-2">
          <button
            onClick={handleSend}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Send size={14} />
            Send Update
          </button>
          <button
            onClick={onClose}
            className="w-full px-4 py-2.5 bg-gray-100 text-text-secondary text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
