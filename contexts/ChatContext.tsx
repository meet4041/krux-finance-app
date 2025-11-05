'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Message, SupportTicket, ChatContextType } from '@/types';

interface ChatState {
  messages: Message[];
  isTyping: boolean;
  currentTicket?: SupportTicket;
  tickets: SupportTicket[];
}

type ChatAction =
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'SET_TYPING'; payload: boolean }
  | { type: 'SET_TICKET'; payload: SupportTicket }
  | { type: 'SET_TICKETS'; payload: SupportTicket[] }
  | { type: 'UPDATE_TICKET'; payload: SupportTicket }
  | { type: 'SET_MESSAGES'; payload: Message[] };

const initialState: ChatState = {
  messages: [],
  isTyping: false,
  tickets: []
};

function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload]
      };
    case 'SET_TYPING':
      return {
        ...state,
        isTyping: action.payload
      };
    case 'SET_TICKET':
      return {
        ...state,
        currentTicket: action.payload,
        messages: action.payload.messages
      };
    case 'SET_TICKETS':
      return {
        ...state,
        tickets: action.payload
      };
    case 'UPDATE_TICKET':
      return {
        ...state,
        tickets: state.tickets.map(ticket =>
          ticket.id === action.payload.id ? action.payload : ticket
        ),
        currentTicket: state.currentTicket?.id === action.payload.id ? action.payload : state.currentTicket
      };
    case 'SET_MESSAGES':
      return {
        ...state,
        messages: action.payload
      };
    default:
      return state;
  }
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  useEffect(() => {
    const savedTickets = localStorage.getItem('supportTickets');
    if (savedTickets) {
      const tickets = JSON.parse(savedTickets).map((ticket: any) => ({
        ...ticket,
        createdAt: new Date(ticket.createdAt),
        updatedAt: new Date(ticket.updatedAt),
        messages: ticket.messages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }))
      }));
      dispatch({ type: 'SET_TICKETS', payload: tickets });
    }
  }, []);

  const addMessage = (content: string, sender: 'user' | 'bot' | 'agent') => {
    const message: Message = {
      id: Date.now().toString(),
      content,
      sender,
      timestamp: new Date()
    };
    dispatch({ type: 'ADD_MESSAGE', payload: message });
  };

  const setIsTyping = (typing: boolean) => {
    dispatch({ type: 'SET_TYPING', payload: typing });
  };

  return (
    <ChatContext.Provider value={{
      messages: state.messages,
      addMessage,
      isTyping: state.isTyping,
      setIsTyping,
      currentTicket: state.currentTicket
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};