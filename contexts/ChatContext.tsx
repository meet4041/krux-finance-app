// contexts/ChatContext.tsx
'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Conversation, Message } from '@/types';
import { chatService } from '@/lib/chat';
import { supportService } from '@/lib/support';
import { authService } from '@/lib/auth';
import { botService } from '@/lib/bot';

interface ChatState {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  messages: Message[];
  isLoading: boolean;
}

type ChatAction =
  | { type: 'SET_CONVERSATIONS'; payload: Conversation[] }
  | { type: 'SET_CURRENT_CONVERSATION'; payload: Conversation | null }
  | { type: 'SET_MESSAGES'; payload: Message[] }
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'UPDATE_CONVERSATION'; payload: Conversation };

const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
  switch (action.type) {
    case 'SET_CONVERSATIONS':
      return { ...state, conversations: action.payload };
    case 'SET_CURRENT_CONVERSATION':
      return { ...state, currentConversation: action.payload };
    case 'SET_MESSAGES':
      return { ...state, messages: action.payload };
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'UPDATE_CONVERSATION':
      return {
        ...state,
        conversations: state.conversations.map(conv =>
          conv.id === action.payload.id ? action.payload : conv
        ),
        currentConversation: state.currentConversation?.id === action.payload.id 
          ? action.payload 
          : state.currentConversation
      };
    default:
      return state;
  }
};

interface ChatContextType {
  state: ChatState;
  sendMessage: (content: string) => Promise<void>;
  startNewConversation: (category: Conversation['category']) => Promise<Conversation>;
  loadConversation: (conversationId: string) => Promise<void>;
  markAsRead: (conversationId: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(chatReducer, {
    conversations: [],
    currentConversation: null,
    messages: [],
    isLoading: false
  });

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    const conversations = await chatService.getConversations();
    dispatch({ type: 'SET_CONVERSATIONS', payload: conversations });
    dispatch({ type: 'SET_LOADING', payload: false });
  };

  const sendMessage = async (content: string) => {
    const current = state.currentConversation;
    if (!current) return;

    const message: Message = {
      id: Date.now().toString(),
      conversationId: current.id,
      content,
      sender: 'customer',
      timestamp: new Date(),
      type: 'text',
      read: false
    };

    dispatch({ type: 'ADD_MESSAGE', payload: message });
    await chatService.saveMessage(message);

    // Update conversation
    const updatedConversation: Conversation = {
      ...current,
      updatedAt: new Date(),
      lastMessage: content
    };
    dispatch({ type: 'UPDATE_CONVERSATION', payload: updatedConversation });
    await chatService.saveConversation(updatedConversation);

    // Get bot response
    setTimeout(async () => {
      const botResponse = await botService.getResponse(content, current);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        conversationId: current.id,
        content: botResponse,
        sender: 'bot',
        timestamp: new Date(),
        type: 'text',
        read: false
      };
      dispatch({ type: 'ADD_MESSAGE', payload: botMessage });
      await chatService.saveMessage(botMessage);
    }, 1000);
  };

  const startNewConversation = async (category: Conversation['category']): Promise<Conversation> => {
    const conversation = await chatService.createConversation(category);
    dispatch({ type: 'SET_CONVERSATIONS', payload: [...state.conversations, conversation] });
    dispatch({ type: 'SET_CURRENT_CONVERSATION', payload: conversation });
    dispatch({ type: 'SET_MESSAGES', payload: [] });

    // If this conversation category requires human support, create a support ticket
    try {
      if (category === 'status_check' || category === 'general') {
        const currentUser = authService.getCurrentUser();
        const priority = category === 'general' ? 'high' : 'medium';
        await supportService.createTicket({
          conversationId: conversation.id,
          customerId: currentUser?.id || conversation.customerId,
          customerName: currentUser?.name || conversation.customerName,
          status: 'open',
          priority: priority as any,
          category: category as any,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
    } catch (err) {
      console.error('Error creating support ticket:', err);
    }
    return conversation;
  };

  const loadConversation = async (conversationId: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    const conversation = state.conversations.find(c => c.id === conversationId) || 
                        await chatService.getConversation(conversationId);
    const messages = await chatService.getMessages(conversationId);
    
    dispatch({ type: 'SET_CURRENT_CONVERSATION', payload: conversation });
    dispatch({ type: 'SET_MESSAGES', payload: messages });
    dispatch({ type: 'SET_LOADING', payload: false });
  };

  const markAsRead = (conversationId: string) => {
    // Implementation for marking messages as read
  };

  return (
    <ChatContext.Provider value={{
      state,
      sendMessage,
      startNewConversation,
      loadConversation,
      markAsRead
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}