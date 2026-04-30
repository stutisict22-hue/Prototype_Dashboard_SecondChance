import { Ticket } from '../../data/types';

interface TicketThreadProps {
  ticket: Ticket;
}

function formatTime(timestamp: string): string {
  const d = new Date(timestamp);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) +
    ' · ' +
    d.toLocaleDateString([], { month: 'short', day: 'numeric' });
}

export default function TicketThread({ ticket }: TicketThreadProps) {
  return (
    <div className="flex flex-col gap-3 pt-3 border-t border-slate-100">
      {ticket.messages.map((msg) => {
        const isCandidate = msg.sender === 'candidate';
        return (
          <div
            key={msg.id}
            className={`flex flex-col ${isCandidate ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                isCandidate
                  ? 'bg-emerald-500 text-white rounded-br-sm'
                  : 'bg-slate-100 text-text-primary rounded-bl-sm'
              }`}
            >
              {msg.text}
            </div>
            <span className="text-xs text-text-secondary mt-1 px-1">
              {msg.senderName} · {formatTime(msg.timestamp)}
            </span>
          </div>
        );
      })}
    </div>
  );
}
