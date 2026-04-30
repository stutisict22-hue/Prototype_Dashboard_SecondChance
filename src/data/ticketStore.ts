import { Ticket, TicketMessage } from './types';
import { mockTickets } from './mockData';

// Module-level store — mutations here are visible to both candidate and SW portals
// within the same browser session. When the user switches roles, the new portal
// initialises from this store and sees tickets raised by the other role.
const store: Ticket[] = [...mockTickets];

export const getTickets = (): Ticket[] => store;

export const addTicket = (ticket: Ticket): void => {
  store.unshift(ticket);
};

export const addReply = (ticketId: string, message: TicketMessage): void => {
  const ticket = store.find(t => t.id === ticketId);
  if (!ticket) return;
  ticket.messages.push(message);
  ticket.updatedAt = new Date().toISOString();
};

export const setTicketStatus = (ticketId: string, status: Ticket['status']): void => {
  const ticket = store.find(t => t.id === ticketId);
  if (!ticket) return;
  ticket.status = status;
  ticket.updatedAt = new Date().toISOString();
};
