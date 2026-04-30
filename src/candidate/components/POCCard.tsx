import { useState } from 'react';
import { PhoneCall, MessageCircle, Mail } from 'lucide-react';
import { SocialWorkerContact } from '../../data/types';

interface POCCardProps {
  contact: SocialWorkerContact;
}

type ActionType = 'phone' | 'whatsapp' | 'email' | null;

function ActionModal({ contact, action, onClose }: { contact: SocialWorkerContact; action: ActionType; onClose: () => void }) {
  if (!action) return null;

  const messages: Record<NonNullable<ActionType>, string> = {
    phone: `Calling ${contact.name}...`,
    whatsapp: `Opening WhatsApp for ${contact.name}...`,
    email: `Opening email to ${contact.name}...`,
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-xs text-center">
        <p className="text-text-primary font-semibold text-base mb-1">{messages[action]}</p>
        <p className="text-text-secondary text-sm mb-5">
          {action === 'phone' && contact.phone}
          {action === 'whatsapp' && contact.whatsapp}
          {action === 'email' && contact.email}
        </p>
        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-slate-100 text-text-primary font-semibold text-sm hover:bg-slate-200 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default function POCCard({ contact }: POCCardProps) {
  const [activeAction, setActiveAction] = useState<ActionType>(null);

  const avatarColors: Record<SocialWorkerContact['role'], string> = {
    'Social Worker': 'bg-emerald-100 text-emerald-700',
    'Doctor': 'bg-blue-100 text-blue-700',
  };

  const roleBadgeColors: Record<SocialWorkerContact['role'], string> = {
    'Social Worker': 'bg-emerald-50 text-emerald-700',
    'Doctor': 'bg-blue-50 text-blue-700',
  };

  return (
    <>
      <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex flex-col items-center text-center gap-2">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${avatarColors[contact.role]}`}>
          {contact.initials}
        </div>
        <div>
          <p className="font-semibold text-text-primary text-sm leading-tight">{contact.name}</p>
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${roleBadgeColors[contact.role]}`}>
            {contact.role}
          </span>
        </div>
        <div className="flex gap-3 mt-1">
          <button
            onClick={() => setActiveAction('phone')}
            className="flex flex-col items-center gap-1 group"
          >
            <div className="w-9 h-9 rounded-full bg-green-50 hover:bg-green-100 transition-colors flex items-center justify-center">
              <PhoneCall size={16} className="text-green-600" />
            </div>
            <span className="text-xs text-text-secondary">Call</span>
          </button>
          <button
            onClick={() => setActiveAction('whatsapp')}
            className="flex flex-col items-center gap-1 group"
          >
            <div className="w-9 h-9 rounded-full bg-emerald-50 hover:bg-emerald-100 transition-colors flex items-center justify-center">
              <MessageCircle size={16} className="text-emerald-600" />
            </div>
            <span className="text-xs text-text-secondary">WhatsApp</span>
          </button>
          <button
            onClick={() => setActiveAction('email')}
            className="flex flex-col items-center gap-1 group"
          >
            <div className="w-9 h-9 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors flex items-center justify-center">
              <Mail size={16} className="text-blue-600" />
            </div>
            <span className="text-xs text-text-secondary">Email</span>
          </button>
        </div>
      </div>

      <ActionModal
        contact={contact}
        action={activeAction}
        onClose={() => setActiveAction(null)}
      />
    </>
  );
}
