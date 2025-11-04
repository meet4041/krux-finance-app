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