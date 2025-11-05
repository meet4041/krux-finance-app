// lib/support.ts
import { SupportTicket, Message } from '@/types';
import { storage } from './storage';

const TICKETS_KEY = 'support_tickets';
const MESSAGES_KEY = 'chat_messages'; // Shared with chat service

// Mock initial tickets
const INITIAL_TICKETS: SupportTicket[] = [
  {
    id: '1',
    conversationId: 'conv1',
    customerId: '1',
    customerName: 'Rahul Sharma',
    status: 'open',
    priority: 'high',
    category: 'loan_application',
    createdAt: new Date(Date.now() - 1000 * 60 * 5),
    updatedAt: new Date(Date.now() - 1000 * 60 * 2)
  },
  {
    id: '2',
    conversationId: 'conv2',
    customerId: '2',
    customerName: 'Priya Patel',
    status: 'open',
    priority: 'medium',
    category: 'document_help',
    createdAt: new Date(Date.now() - 1000 * 60 * 10),
    updatedAt: new Date(Date.now() - 1000 * 60 * 8)
  }
];

export const supportService = {
  async createTicket(ticketPartial: Partial<SupportTicket>): Promise<SupportTicket> {
    const tickets = (storage.get<SupportTicket[]>(TICKETS_KEY) || []).slice();
    const ticket: SupportTicket = {
      id: Date.now().toString(),
      conversationId: ticketPartial.conversationId || Date.now().toString(),
      customerId: ticketPartial.customerId || 'unknown',
      customerName: ticketPartial.customerName || 'Unknown',
      status: (ticketPartial.status as any) || 'open',
      priority: (ticketPartial.priority as any) || 'medium',
      category: (ticketPartial.category as any) || 'general',
      createdAt: ticketPartial.createdAt || new Date(),
      updatedAt: ticketPartial.updatedAt || new Date(),
      firstResponseTime: ticketPartial.firstResponseTime,
      resolutionTime: ticketPartial.resolutionTime
    };

    tickets.push(ticket);
    storage.set(TICKETS_KEY, tickets);

    // Notify other parts of the app (SupportProvider) that a ticket was created
    try {
      window.dispatchEvent(new CustomEvent('support:ticketCreated', { detail: ticket }));
    } catch (e) {
      // ignore (SSR or non-window environments)
    }

    return ticket;
  },
  async getTickets(): Promise<SupportTicket[]> {
    const tickets = storage.get<SupportTicket[]>(TICKETS_KEY);
    if (!tickets || tickets.length === 0) {
      storage.set(TICKETS_KEY, INITIAL_TICKETS);
      return INITIAL_TICKETS;
    }
    return tickets;
  },

  async updateTicket(ticket: SupportTicket): Promise<void> {
    const tickets = await this.getTickets();
    const index = tickets.findIndex(t => t.id === ticket.id);
    if (index >= 0) {
      tickets[index] = ticket;
    } else {
      tickets.push(ticket);
    }
    storage.set(TICKETS_KEY, tickets);
    try {
      window.dispatchEvent(new CustomEvent('support:ticketUpdated', { detail: ticket }));
    } catch (e) {
      // ignore for non-browser envs
    }
  },

  async getMessages(conversationId: string): Promise<Message[]> {
    const allMessages = storage.get<{ [key: string]: Message[] }>(MESSAGES_KEY) || {};
    return allMessages[conversationId] || [];
  },

  async saveMessage(message: Message): Promise<void> {
    const allMessages = storage.get<{ [key: string]: Message[] }>(MESSAGES_KEY) || {};
    if (!allMessages[message.conversationId]) {
      allMessages[message.conversationId] = [];
    }
    allMessages[message.conversationId].push(message);
    storage.set(MESSAGES_KEY, allMessages);
  }
};