'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { SupportTicket } from '@/types';
import { loadTicketsFromStorage, saveTicketsToStorage } from '@/utils/storage';

interface TicketState {
  tickets: SupportTicket[];
  selectedTicket: SupportTicket | null;
  filter: 'all' | 'open' | 'in-progress' | 'resolved';
  searchQuery: string;
}

type TicketAction =
  | { type: 'SET_TICKETS'; payload: SupportTicket[] }
  | { type: 'SELECT_TICKET'; payload: SupportTicket }
  | { type: 'UPDATE_TICKET'; payload: SupportTicket }
  | { type: 'ADD_MESSAGE'; payload: { ticketId: string; content: string; sender: 'user' | 'bot' | 'agent' } }
  | { type: 'SET_FILTER'; payload: 'all' | 'open' | 'in-progress' | 'resolved' }
  | { type: 'SET_SEARCH_QUERY'; payload: string };

const initialState: TicketState = {
  tickets: [],
  selectedTicket: null,
  filter: 'all',
  searchQuery: ''
};

function ticketReducer(state: TicketState, action: TicketAction): TicketState {
  switch (action.type) {
    case 'SET_TICKETS':
      return { ...state, tickets: action.payload };

    case 'SELECT_TICKET':
      return { ...state, selectedTicket: action.payload };

    case 'UPDATE_TICKET':
      const updatedTickets = state.tickets.map(ticket =>
        ticket.id === action.payload.id ? action.payload : ticket
      );
      saveTicketsToStorage(updatedTickets);
      return {
        ...state,
        tickets: updatedTickets,
        selectedTicket: state.selectedTicket?.id === action.payload.id ? action.payload : state.selectedTicket
      };

    case 'ADD_MESSAGE':
      const ticketToUpdate = state.tickets.find(t => t.id === action.payload.ticketId);
      if (ticketToUpdate) {
        const newMessage = {
          id: Date.now().toString(),
          content: action.payload.content,
          sender: action.payload.sender,
          timestamp: new Date()
        };
        const updatedTicket = {
          ...ticketToUpdate,
          messages: [...ticketToUpdate.messages, newMessage],
          updatedAt: new Date(),
          lastMessage: action.payload.content
        };
        const updatedTickets = state.tickets.map(t =>
          t.id === action.payload.ticketId ? updatedTicket : t
        );
        saveTicketsToStorage(updatedTickets);
        return {
          ...state,
          tickets: updatedTickets,
          selectedTicket: state.selectedTicket?.id === action.payload.ticketId ? updatedTicket : state.selectedTicket
        };
      }
      return state;

    case 'SET_FILTER':
      return { ...state, filter: action.payload };

    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };

    default:
      return state;
  }
}

interface TicketContextType {
  tickets: SupportTicket[];
  selectedTicket: SupportTicket | null;
  filter: string;
  searchQuery: string;
  setTickets: (tickets: SupportTicket[]) => void;
  selectTicket: (ticket: SupportTicket) => void;
  updateTicket: (ticket: SupportTicket) => void;
  addMessageToTicket: (ticketId: string, content: string, sender: 'user' | 'bot' | 'agent') => void;
  setFilter: (filter: 'all' | 'open' | 'in-progress' | 'resolved') => void;
  setSearchQuery: (query: string) => void;
  getFilteredTickets: () => SupportTicket[];
}

const TicketContext = createContext<TicketContextType | undefined>(undefined);

export function TicketProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(ticketReducer, initialState);

  useEffect(() => {
    const tickets = loadTicketsFromStorage();
    dispatch({ type: 'SET_TICKETS', payload: tickets });
  }, []);

  const setTickets = (tickets: SupportTicket[]) => {
    dispatch({ type: 'SET_TICKETS', payload: tickets });
  };

  const selectTicket = (ticket: SupportTicket) => {
    dispatch({ type: 'SELECT_TICKET', payload: ticket });
  };

  const updateTicket = (ticket: SupportTicket) => {
    dispatch({ type: 'UPDATE_TICKET', payload: ticket });
  };

  const addMessageToTicket = (ticketId: string, content: string, sender: 'user' | 'bot' | 'agent') => {
    dispatch({ type: 'ADD_MESSAGE', payload: { ticketId, content, sender } });
  };

  const setFilter = (filter: 'all' | 'open' | 'in-progress' | 'resolved') => {
    dispatch({ type: 'SET_FILTER', payload: filter });
  };

  const setSearchQuery = (query: string) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
  };

  const getFilteredTickets = () => {
    let filtered = state.tickets;

    if (state.filter !== 'all') {
      filtered = filtered.filter(ticket => ticket.status === state.filter);
    }

    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter(ticket =>
        ticket.customerName.toLowerCase().includes(query) ||
        ticket.customerPhone.includes(query) ||
        ticket.lastMessage?.toLowerCase().includes(query)
      );
    }

    return filtered.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  };

  return (
    <TicketContext.Provider value={{
      ...state,
      setTickets,
      selectTicket,
      updateTicket,
      addMessageToTicket,
      setFilter,
      setSearchQuery,
      getFilteredTickets
    }}>
      {children}
    </TicketContext.Provider>
  );
}

export const useTickets = () => {
  const context = useContext(TicketContext);
  if (context === undefined) {
    throw new Error('useTickets must be used within a TicketProvider');
  }
  return context;
};