// lib/chat.ts
import { Conversation, Message } from '@/types';
import { storage } from './storage';

const CONVERSATIONS_KEY = 'chat_conversations';
const MESSAGES_KEY = 'chat_messages';

export const chatService = {
  async getConversations(): Promise<Conversation[]> {
    return storage.get<Conversation[]>(CONVERSATIONS_KEY) || [];
  },

  async getConversation(id: string): Promise<Conversation | null> {
    const conversations = await this.getConversations();
    return conversations.find(c => c.id === id) || null;
  },

  async createConversation(category: Conversation['category']): Promise<Conversation> {
    const conversations = await this.getConversations();
    const conversation: Conversation = {
      id: Date.now().toString(),
      customerId: 'current-customer', // Would come from auth in real app
      customerName: 'Current Customer',
      status: 'active',
      priority: 'medium',
      category,
      createdAt: new Date(),
      updatedAt: new Date(),
      unreadCount: 0
    };

    conversations.push(conversation);
    storage.set(CONVERSATIONS_KEY, conversations);
    return conversation;
  },

  async saveConversation(conversation: Conversation): Promise<void> {
    const conversations = await this.getConversations();
    const index = conversations.findIndex(c => c.id === conversation.id);
    if (index >= 0) {
      conversations[index] = conversation;
    } else {
      conversations.push(conversation);
    }
    storage.set(CONVERSATIONS_KEY, conversations);
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