import { useState } from 'react';
import { MessageSquare, ChevronDown, ChevronUp, Send, CheckCircle, Clock, RefreshCw, Inbox } from 'lucide-react';
import { Ticket, TicketStatus } from '../data/types';
import { mockParticipants } from '../data/mockData';
import { getTickets, addReply, setTicketStatus } from '../data/ticketStore';

type FilterTab = 'incoming' | 'in_progress' | 'resolved';

const FILTER_TABS: { id: FilterTab; label: string; status: TicketStatus; icon: React.ElementType }[] = [
  { id: 'incoming',    label: 'Incoming',    status: 'open',        icon: Inbox },
  { id: 'in_progress', label: 'In Progress', status: 'in_progress', icon: Clock },
  { id: 'resolved',    label: 'Resolved',    status: 'resolved',    icon: CheckCircle },
];

const CATEGORY_COLORS: Record<string, string> = {
  'Craving':   'bg-red-100 text-red-700',
  'Low Mood':  'bg-purple-100 text-purple-700',
  'Med Issue': 'bg-blue-100 text-blue-700',
  'Emergency': 'bg-red-200 text-red-800',
  'Other':     'bg-slate-100 text-slate-600',
};

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function formatTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) +
    ' · ' + d.toLocaleDateString([], { month: 'short', day: 'numeric' });
}

function participantName(id: string): string {
  return mockParticipants.find(p => p.id === id)?.name ?? id;
}

function participantPhase(id: string): number {
  return mockParticipants.find(p => p.id === id)?.currentPhase ?? 1;
}

function participantTrust(id: string): number {
  return mockParticipants.find(p => p.id === id)?.trustScore ?? 0;
}

interface TicketCardProps {
  ticket: Ticket;
  onStatusChange: (id: string, status: TicketStatus) => void;
}

function TicketCard({ ticket, onStatusChange }: TicketCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [replyText, setReplyText] = useState('');

  function sendReply() {
    if (!replyText.trim()) return;
    const msg = {
      id: `M-${Date.now()}`,
      sender: 'social_worker' as const,
      senderName: 'Priya Suresh',
      text: replyText.trim(),
      timestamp: new Date().toISOString(),
    };
    addReply(ticket.id, msg);
    // Force local re-render by pushing to ticket.messages directly
    ticket.messages.push(msg);
    ticket.updatedAt = new Date().toISOString();
    setReplyText('');
    // Trigger re-render via a no-op state update trick — expand stays open
    setExpanded(true);
  }

  const trust = participantTrust(ticket.participantId);
  const trustColor = trust >= 75 ? 'text-success' : trust >= 50 ? 'text-warning' : 'text-danger';

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Card header */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          {/* Left: participant + category */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
              {participantName(ticket.participantId).split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-text-primary text-sm">
                  {participantName(ticket.participantId)}
                </span>
                <span className="text-xs text-text-secondary">
                  {ticket.participantId}
                </span>
                <span className="text-xs text-text-secondary">
                  Phase {participantPhase(ticket.participantId)}
                </span>
                <span className={`text-xs font-semibold ${trustColor}`}>
                  Trust {trust}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${CATEGORY_COLORS[ticket.category] ?? 'bg-slate-100 text-slate-600'}`}>
                  {ticket.category}
                </span>
                <span className="text-xs text-text-secondary">{timeAgo(ticket.updatedAt)}</span>
                <span className="text-xs text-text-secondary">· {ticket.messages.length} message{ticket.messages.length !== 1 ? 's' : ''}</span>
              </div>
            </div>
          </div>

          {/* Right: status action buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {ticket.status === 'open' && (
              <button
                onClick={() => onStatusChange(ticket.id, 'in_progress')}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 transition-colors"
              >
                Start
              </button>
            )}
            {ticket.status === 'in_progress' && (
              <button
                onClick={() => onStatusChange(ticket.id, 'resolved')}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-50 text-success border border-emerald-200 hover:bg-emerald-100 transition-colors flex items-center gap-1"
              >
                <CheckCircle size={12} /> Resolve
              </button>
            )}
            {ticket.status === 'resolved' && (
              <button
                onClick={() => onStatusChange(ticket.id, 'open')}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-50 text-text-secondary border border-gray-200 hover:bg-gray-100 transition-colors flex items-center gap-1"
              >
                <RefreshCw size={12} /> Reopen
              </button>
            )}
          </div>
        </div>

        <p className="text-sm text-text-secondary mt-3 line-clamp-2">{ticket.description}</p>

        <button
          onClick={() => setExpanded(v => !v)}
          className="mt-3 flex items-center gap-1 text-xs font-semibold text-primary hover:text-blue-700 transition-colors"
        >
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          {expanded ? 'Hide thread' : 'View thread'}
        </button>
      </div>

      {/* Expanded thread */}
      {expanded && (
        <div className="border-t border-gray-100 bg-slate-50 px-4 py-4 space-y-3">
          {/* Messages */}
          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {ticket.messages.map(msg => {
              const isCandidate = msg.sender === 'candidate';
              return (
                <div key={msg.id} className={`flex flex-col ${isCandidate ? 'items-start' : 'items-end'}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                    isCandidate
                      ? 'bg-white border border-gray-200 text-text-primary rounded-tl-sm'
                      : 'bg-primary text-white rounded-tr-sm'
                  }`}>
                    {msg.text}
                  </div>
                  <span className="text-xs text-text-secondary mt-1 px-1">
                    {msg.senderName} · {formatTime(msg.timestamp)}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Reply box — only for open/in_progress tickets */}
          {ticket.status !== 'resolved' && (
            <div className="flex gap-2 pt-2 border-t border-gray-200">
              <input
                type="text"
                value={replyText}
                onChange={e => setReplyText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendReply()}
                placeholder="Type a reply to the candidate..."
                className="flex-1 text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white"
              />
              <button
                onClick={sendReply}
                disabled={!replyText.trim()}
                className="p-2 bg-primary text-white rounded-xl hover:bg-blue-700 disabled:opacity-40 transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          )}

          {ticket.status === 'resolved' && (
            <p className="text-xs text-text-secondary text-center py-1">This ticket is resolved. Reopen it to send a reply.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default function TicketsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('incoming');
  const [tickets, setTickets] = useState<Ticket[]>(() => getTickets());

  function handleStatusChange(id: string, status: TicketStatus) {
    setTicketStatus(id, status);
    setTickets([...getTickets()]);
  }

  const filtered = tickets
    .filter(t => t.status === FILTER_TABS.find(f => f.id === activeFilter)!.status)
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  const counts: Record<FilterTab, number> = {
    incoming:    tickets.filter(t => t.status === 'open').length,
    in_progress: tickets.filter(t => t.status === 'in_progress').length,
    resolved:    tickets.filter(t => t.status === 'resolved').length,
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center gap-3">
        <MessageSquare size={22} className="text-primary" />
        <div>
          <h1 className="text-xl font-bold text-text-primary">Support Tickets</h1>
          <p className="text-sm text-text-secondary">Incoming requests from candidates — reply and track resolution</p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {FILTER_TABS.map(tab => {
          const active = activeFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${
                active
                  ? 'bg-primary text-white border-primary shadow-sm'
                  : 'bg-white text-text-secondary border-gray-200 hover:border-gray-300'
              }`}
            >
              <tab.icon size={15} />
              {tab.label}
              <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
                active ? 'bg-white/20 text-white' : 'bg-gray-100 text-text-secondary'
              }`}>
                {counts[tab.id]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Ticket list */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <MessageSquare size={32} className="text-gray-300 mx-auto mb-3" />
            <p className="text-text-secondary font-medium">
              {activeFilter === 'incoming'    && 'No open tickets — all clear!'}
              {activeFilter === 'in_progress' && 'No tickets in progress.'}
              {activeFilter === 'resolved'    && 'No resolved tickets yet.'}
            </p>
          </div>
        ) : (
          filtered.map(ticket => (
            <TicketCard key={ticket.id} ticket={ticket} onStatusChange={handleStatusChange} />
          ))
        )}
      </div>
    </div>
  );
}
