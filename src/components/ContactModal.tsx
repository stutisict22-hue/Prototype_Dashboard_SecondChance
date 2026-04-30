import { useState } from 'react';
import { X, Phone, MessageCircle, Mail, MapPin, PhoneCall } from 'lucide-react';
import { Participant } from '../data/types';

interface ContactModalProps {
  participant: Participant;
  onClose: () => void;
  onEmailClick: () => void;
}

export default function ContactModal({ participant, onClose, onEmailClick }: ContactModalProps) {
  const [callStatus, setCallStatus] = useState<'call' | 'whatsapp' | null>(null);

  const handleCall = () => {
    setCallStatus('call');
  };

  const handleWhatsApp = () => {
    setCallStatus('whatsapp');
  };

  const initials = participant.name.split(' ').map(n => n[0]).join('');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl max-w-sm w-full mx-4 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-text-primary truncate">{participant.name}</p>
            <p className="text-xs text-text-secondary">{participant.id}</p>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={16} className="text-text-secondary" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="flex items-center gap-3">
            <Phone size={16} className="text-text-secondary flex-shrink-0" />
            <span className="text-sm text-text-primary flex-1">{participant.contact?.phone}</span>
            <button
              onClick={handleCall}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 text-white text-xs font-medium rounded-lg hover:bg-emerald-600 transition-colors"
            >
              <PhoneCall size={12} />
              Call
            </button>
          </div>
          {callStatus === 'call' && (
            <p className="text-xs text-success ml-7">Initiating call...</p>
          )}

          <div className="flex items-center gap-3">
            <MessageCircle size={16} className="text-text-secondary flex-shrink-0" />
            <span className="text-sm text-text-primary flex-1">{participant.contact?.whatsapp}</span>
            <button
              onClick={handleWhatsApp}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 text-white text-xs font-medium rounded-lg hover:bg-emerald-600 transition-colors"
            >
              <MessageCircle size={12} />
              WhatsApp
            </button>
          </div>
          {callStatus === 'whatsapp' && (
            <p className="text-xs text-success ml-7">Initiating chat...</p>
          )}

          <div className="flex items-center gap-3">
            <Mail size={16} className="text-text-secondary flex-shrink-0" />
            <span className="text-sm text-text-primary flex-1 truncate">{participant.contact?.email}</span>
            <button
              onClick={onEmailClick}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500 text-white text-xs font-medium rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Mail size={12} />
              Email Update
            </button>
          </div>

          {participant.contact?.district && (
            <div className="flex items-center gap-3 pt-1 border-t border-gray-100">
              <MapPin size={16} className="text-text-secondary flex-shrink-0" />
              <span className="text-sm text-text-secondary">{participant.contact.district}</span>
            </div>
          )}
        </div>

        <div className="px-5 pb-5">
          <p className="text-xs text-text-secondary text-center bg-gray-50 rounded-lg py-2 px-3">
            Calls and messages are logged for compliance
          </p>
        </div>
      </div>
    </div>
  );
}
