// types/index.ts
export interface User {
    id: string;
    name: string;
    phone?: string;
    username?: string;
    role: 'customer' | 'agent';
    avatar?: string;
  }
  
  export interface Message {
    id: string;
    conversationId: string;
    content: string;
    sender: 'customer' | 'agent' | 'bot';
    timestamp: Date;
    type: 'text' | 'system' | 'file';
    read: boolean;
  }
  
  export interface Conversation {
    id: string;
    customerId: string;
    customerName: string;
    agentId?: string;
    status: 'active' | 'resolved' | 'pending' | 'escalated';
    priority: 'low' | 'medium' | 'high' | 'urgent';
    category: 'loan_application' | 'document_help' | 'status_check' | 'general';
    createdAt: Date;
    updatedAt: Date;
    lastMessage?: string;
    unreadCount: number;
  }
  
  export interface SupportTicket {
    id: string;
    conversationId: string;
    customerId: string;
    customerName: string;
    assignedAgentId?: string;
    status: 'open' | 'in_progress' | 'resolved' | 'escalated';
    priority: 'low' | 'medium' | 'high' | 'urgent';
    category: string;
    createdAt: Date;
    updatedAt: Date;
    firstResponseTime?: number;
    resolutionTime?: number;
  }
  
  export interface QuickReply {
    id: string;
    title: string;
    content: string;
    category: string;
  }