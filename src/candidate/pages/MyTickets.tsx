import { useState } from 'react';
import { Plus, ChevronDown, ChevronUp } from 'lucide-react';
import { Ticket, TicketCategory, TicketStatus } from '../../data/types';
import { getTickets, addTicket } from '../../data/ticketStore';
import TicketThread from '../components/TicketThread';

const CANDIDATE_ID = 'SC-003';

const CATEGORIES: TicketCategory[] = ['Low Mood', 'Craving', 'Med Issue', 'Emergency', 'Other'];

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

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export default function MyTickets() {
  const [tickets, setTickets] = useState<Ticket[]>(() =>
    getTickets()
      .filter((t) => t.participantId === CANDIDATE_ID)
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
  );
  const [showForm, setShowForm] = useState(false);
  const [category, setCategory] = useState<TicketCategory>('Craving');
  const [description, setDescription] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  function handleSubmit() {
    if (!description.trim()) return;
    const now = new Date().toISOString();
    const newTicket: Ticket = {
      id: `TKT-${Date.now()}`,
      participantId: CANDIDATE_ID,
      category,
      description: description.trim(),
      status: 'open',
      createdAt: now,
      updatedAt: now,
      messages: [
        {
          id: `M-${Date.now()}`,
          sender: 'candidate',
          senderName: 'Vineeth Thomas',
          text: description.trim(),
          timestamp: now,
        },
      ],
    };
    addTicket(newTicket);
    setTickets((prev) => [newTicket, ...prev]);
    setDescription('');
    setCategory('Craving');
    setShowForm(false);
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-text-primary">My Tickets</h1>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
        >
          <Plus size={16} />
          Raise New Ticket
        </button>
      </div>

      {showForm && (
        <div className="bg-white border border-emerald-100 rounded-2xl shadow-sm p-5 mb-5">
          <h2 className="font-semibold text-text-primary mb-4">New Ticket</h2>
          <div className="flex flex-col gap-3">
            <div>
              <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-1 block">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as TicketCategory)}
                className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-emerald-300 bg-white"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-1 block">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what you're experiencing..."
                rows={3}
                className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2.5 text-text-primary placeholder-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-300"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-text-secondary hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!description.trim()}
                className="flex-1 py-2.5 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white rounded-xl text-sm font-semibold transition-colors"
              >
                Submit Ticket
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {tickets.length === 0 && (
          <p className="text-center text-text-secondary text-sm py-10">No tickets yet. Raise one if you need support.</p>
        )}
        {tickets.map((ticket) => {
          const expanded = expandedId === ticket.id;
          return (
            <div key={ticket.id} className="bg-white border border-slate-100 rounded-2xl shadow-sm p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                    {ticket.category}
                  </span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STATUS_STYLES[ticket.status]}`}>
                    {STATUS_LABELS[ticket.status]}
                  </span>
                </div>
                <span className="text-xs text-text-secondary flex-shrink-0">{formatDate(ticket.updatedAt)}</span>
              </div>
              <p className="text-sm text-text-primary line-clamp-2 mb-3">{ticket.description}</p>
              <button
                onClick={() => setExpandedId(expanded ? null : ticket.id)}
                className="flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                {expanded ? 'Hide Thread' : 'View Thread'}
              </button>
              {expanded && <TicketThread ticket={ticket} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
