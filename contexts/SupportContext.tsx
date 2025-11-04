// contexts/SupportContext.tsx
'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { SupportTicket, Message, QuickReply } from '@/types';
import { supportService } from '@/lib/support';

interface SupportState {
  tickets: SupportTicket[];
  messages: { [conversationId: string]: Message[] };
  quickReplies: QuickReply[];
  isLoading: boolean;
}

type SupportAction =
  | { type: 'SET_TICKETS'; payload: SupportTicket[] }
  | { type: 'SET_MESSAGES'; payload: { conversationId: string; messages: Message[] } }
  | { type: 'ADD_MESSAGE'; payload: { conversationId: string; message: Message } }
  | { type: 'UPDATE_TICKET'; payload: SupportTicket }
  | { type: 'SET_LOADING'; payload: boolean };

const supportReducer = (state: SupportState, action: SupportAction): SupportState => {
  switch (action.type) {
    case 'SET_TICKETS':
      return { ...state, tickets: action.payload };
    case 'SET_MESSAGES':
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.payload.conversationId]: action.payload.messages
        }
      };
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.payload.conversationId]: [
            ...(state.messages[action.payload.conversationId] || []),
            action.payload.message
          ]
        }
      };
    case 'UPDATE_TICKET':
      return {
        ...state,
        tickets: state.tickets.map(ticket =>
          ticket.id === action.payload.id ? action.payload : ticket
        )
      };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

interface SupportContextType {
  state: SupportState;
  assignTicket: (ticketId: string, agentId: string) => Promise<void>;
  sendMessage: (ticketId: string, content: string) => Promise<void>;
  updateTicketStatus: (ticketId: string, status: string) => Promise<void>;
  loadTicketMessages: (conversationId: string) => Promise<void>;
}

const SupportContext = createContext<SupportContextType | undefined>(undefined);

export function SupportProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(supportReducer, {
    tickets: [],
    messages: {},
    quickReplies: [],
    isLoading: false
  });

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    const tickets = await supportService.getTickets();
    dispatch({ type: 'SET_TICKETS', payload: tickets });
    dispatch({ type: 'SET_LOADING', payload: false });
  };

  const assignTicket = async (ticketId: string, agentId: string) => {
    const ticket = state.tickets.find(t => t.id === ticketId);
    if (!ticket) return;

    const updatedTicket: SupportTicket = {
      ...ticket,
      assignedAgentId: agentId,
      status: 'in_progress',
      updatedAt: new Date()
    };

    dispatch({ type: 'UPDATE_TICKET', payload: updatedTicket });
    await supportService.updateTicket(updatedTicket);
  };

  const sendMessage = async (ticketId: string, content: string) => {
    const ticket = state.tickets.find(t => t.id === ticketId);
    if (!ticket) return;

    const message: Message = {
      id: Date.now().toString(),
      conversationId: ticket.conversationId,
      content,
      sender: 'agent',
      timestamp: new Date(),
      type: 'text',
      read: false
    };

    dispatch({
      type: 'ADD_MESSAGE',
      payload: { conversationId: ticket.conversationId, message }
    });
    await supportService.saveMessage(message);

    // Update ticket
    const updatedTicket: SupportTicket = {
      ...ticket,
      updatedAt: new Date()
    };
    dispatch({ type: 'UPDATE_TICKET', payload: updatedTicket });
    await supportService.updateTicket(updatedTicket);
  };

  const updateTicketStatus = async (ticketId: string, status: string) => {
    const ticket = state.tickets.find(t => t.id === ticketId);
    if (!ticket) return;

    const updatedTicket: SupportTicket = {
      ...ticket,
      status: status as any,
      updatedAt: new Date()
    };

    dispatch({ type: 'UPDATE_TICKET', payload: updatedTicket });
    await supportService.updateTicket(updatedTicket);
  };

  const loadTicketMessages = async (conversationId: string) => {
    const messages = await supportService.getMessages(conversationId);
    dispatch({
      type: 'SET_MESSAGES',
      payload: { conversationId, messages }
    });
  };

  return (
    <SupportContext.Provider value={{
      state,
      assignTicket,
      sendMessage,
      updateTicketStatus,
      loadTicketMessages
    }}>
      {children}
    </SupportContext.Provider>
  );
}

export function useSupport() {
  const context = useContext(SupportContext);
  if (context === undefined) {
    throw new Error('useSupport must be used within a SupportProvider');
  }
  return context;
}