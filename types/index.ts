export interface User {
  id: string;
  name: string;
  phone?: string;
  username?: string;
  role: 'customer' | 'agent';
}

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot' | 'agent';
  timestamp: Date;
  type?: 'text' | 'system' | 'file';
  ticketId?: string;
}

export interface SupportTicket {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  status: 'open' | 'in-progress' | 'resolved' | 'escalated';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'loan-application' | 'document-requirements' | 'application-status' | 'general';
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
  assignedAgent?: string;
  lastMessage?: string;
  unreadCount: number;
  loanHistory?: LoanApplication[];
}

export interface LoanApplication {
  id: string;
  type: 'business' | 'personal' | 'msme';
  status: 'pending' | 'approved' | 'rejected' | 'under-review';
  amount: number;
  appliedDate: Date;
  documents: string[];
}

export interface QuickReply {
  id: string;
  title: string;
  message: string;
  category: string;
}

export interface ChatContextType {
  messages: Message[];
  addMessage: (content: string, sender: 'user' | 'bot' | 'agent') => void;
  isTyping: boolean;
  setIsTyping: (typing: boolean) => void;
  currentTicket?: SupportTicket;
}

export interface AuthContextType {
  user: User | null;
  login: (credentials: { phone?: string; username?: string }) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}