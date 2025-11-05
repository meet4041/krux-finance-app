'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { SupportProvider, useSupport } from '@/contexts/SupportContext';
import { SupportTicket, Message } from '@/types';
import {
  Users,
  MessageCircle,
  Search,
  Clock,
  CheckCircle,
  AlertCircle,
  Send,
  LogOut,
  Bot,
  Sparkles,
  ChevronRight,
  BarChart3,
  Home,
  Settings,
} from 'lucide-react';

// Components
interface SidebarProps {
  onLogout: () => void;
  user: any;
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout, user }) => (
  <div className="w-20 bg-gradient-to-b from-green-600 to-emerald-700 h-screen flex flex-col items-center py-6 space-y-8 shadow-2xl">
    <div className="relative group">
      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
        <Home className="text-white w-6 h-6" />
      </div>
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
      <a href="/">Home</a>
        
      </div>
    </div>
    
    <div className="relative group">
      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
        <Users className="text-white w-6 h-6" />
      </div>
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
        Agents
      </div>
    </div>
    
    <div className="relative group">
      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
        <BarChart3 className="text-white w-6 h-6" />
      </div>
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
        Analytics
      </div>
    </div>
    
    <div className="flex-grow" />
    
    <div className="relative group">
      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
        <Settings className="text-white w-6 h-6" />
      </div>
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
        Settings
      </div>
    </div>
    
    <div className="relative group">
      <LogOut 
        className="text-white w-6 h-6 cursor-pointer hover:scale-110 transition-transform duration-200" 
        onClick={onLogout}
      />
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
        Logout
      </div>
    </div>
  </div>
);

interface TicketListProps {
  tickets: SupportTicket[];
  activeTicket: string | null;
  onSelectTicket: (ticketId: string) => void;
  user: any;
}

const TicketList: React.FC<TicketListProps> = ({ tickets, activeTicket, onSelectTicket, user }) => {
  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'medium': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'low': return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'in_progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'resolved': return 'bg-green-100 text-green-800 border-green-200';
      case 'escalated': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="w-96 bg-white/80 backdrop-blur-sm h-screen overflow-y-auto border-r border-gray-200/50 shadow-xl">
      {/* Header */}
      <div className="p-6 border-b border-gray-200/50">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl flex items-center justify-center shadow-lg">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-br from-green-600 to-emerald-700 bg-clip-text text-transparent">
              Support Dashboard
            </h1>
            <p className="text-sm text-gray-600">{user.name}</p>
          </div>
        </div>
        
        <div className="relative">
          <Search className="text-gray-400 w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search tickets..." 
            className="w-full bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="p-6 border-b border-gray-200/50">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50/80 backdrop-blur-sm p-4 rounded-2xl border border-blue-200/50">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-blue-700">Active</span>
              <MessageCircle className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-blue-900 mt-2">
              {tickets.filter(t => t.status === 'in_progress').length}
            </p>
          </div>
          <div className="bg-orange-50/80 backdrop-blur-sm p-4 rounded-2xl border border-orange-200/50">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-orange-700">Pending</span>
              <Clock className="w-4 h-4 text-orange-600" />
            </div>
            <p className="text-2xl font-bold text-orange-900 mt-2">
              {tickets.filter(t => t.status === 'open').length}
            </p>
          </div>
        </div>
      </div>

      {/* Ticket List */}
      <div className="p-4 space-y-2">
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            onClick={() => onSelectTicket(ticket.id)}
            className={`p-4 rounded-2xl cursor-pointer backdrop-blur-sm border transition-all duration-200 group ${
              activeTicket === ticket.id 
                ? 'bg-white/80 border-green-200 shadow-lg' 
                : 'bg-white/50 border-gray-200/50 hover:bg-white/70 hover:shadow-md'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-gray-900 group-hover:text-gray-800">
                {ticket.customerName}
              </span>
              <div className="flex items-center space-x-2">
                {getPriorityIcon(ticket.priority)}
              </div>
            </div>
            
            <div className="text-sm text-gray-500 mb-3 capitalize">
              {ticket.category.replace('_', ' ')}
            </div>
            
            <div className="flex items-center justify-between">
              <span className={`text-xs px-2.5 py-1 rounded-full border ${getStatusColor(ticket.status)}`}>
                {ticket.status.replace('_', ' ')}
              </span>
              <span className="text-xs text-gray-500">
                {new Date(ticket.updatedAt).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface ChatViewProps {
  ticket: SupportTicket;
  messages: Message[];
  onSendMessage: (e: React.FormEvent) => void;
  message: string;
  setMessage: (message: string) => void;
  isSending: boolean;
  onUpdateStatus: (status: string) => void;
}

const ChatView: React.FC<ChatViewProps> = ({
  ticket,
  messages,
  onSendMessage,
  message,
  setMessage,
  isSending,
  onUpdateStatus
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'in_progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'resolved': return 'bg-green-100 text-green-800 border-green-200';
      case 'escalated': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="flex-1 flex flex-col h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/30">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{ticket.customerName}</h2>
              <div className="flex items-center space-x-3 mt-2">
                <span className={`text-sm px-3 py-1 rounded-full border ${getPriorityColor(ticket.priority)}`}>
                  {ticket.priority} priority
                </span>
                <span className="text-sm text-gray-500 capitalize">
                  {ticket.category.replace('_', ' ')}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <select 
              className={`text-sm px-4 py-2 rounded-2xl border focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 ${getStatusColor(ticket.status)}`}
              value={ticket.status}
              onChange={(e) => onUpdateStatus(e.target.value)}
            >
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="escalated">Escalated</option>
            </select>
            
            <button
              onClick={() => onUpdateStatus('resolved')}
              className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-2xl hover:from-green-700 hover:to-emerald-800 transition-all duration-200 shadow-lg hover:shadow-xl font-medium text-sm"
            >
              Resolve
            </button>
          </div>
        </div>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'agent' ? 'justify-end' : 'justify-start'} animate-fade-in`}
            >
              <div className="flex items-end space-x-3 max-w-[80%]">
                {msg.sender !== 'agent' && (
                  <div className="w-10 h-10 bg-gradient-to-br from-gray-500 to-gray-600 rounded-2xl flex items-center justify-center flex-shrink-0 mb-1 shadow-lg">
                    {msg.sender === 'customer' ? (
                      <Users className="w-5 h-5 text-white" />
                    ) : (
                      <Bot className="w-5 h-5 text-white" />
                    )}
                  </div>
                )}
                <div
                  className={`px-6 py-4 rounded-3xl backdrop-blur-sm border ${
                    msg.sender === 'agent'
                      ? 'bg-gradient-to-br from-green-600 to-emerald-700 text-white rounded-br-none shadow-lg border-green-500/20'
                      : msg.sender === 'customer'
                      ? 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-bl-none shadow-lg border-blue-500/20'
                      : 'bg-white/80 text-gray-900 rounded-bl-none shadow-lg border-gray-200/50'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                  <p className={`text-xs mt-2 ${
                    msg.sender === 'agent' ? 'text-green-100' : 
                    msg.sender === 'customer' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                {msg.sender === 'agent' && (
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0 mb-1 shadow-lg">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message Input */}
      <div className="bg-white/80 backdrop-blur-sm border-t border-gray-200/50 p-6">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={onSendMessage} className="flex space-x-4 items-end">
            <div className="flex-1 relative">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your response..."
                className="w-full pl-6 pr-12 py-4 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 placeholder-gray-500 shadow-lg"
                disabled={isSending}
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <MessageCircle className="w-5 h-5" />
              </div>
            </div>
            <button
              type="submit"
              disabled={!message.trim() || isSending}
              className="bg-gradient-to-r from-green-600 to-emerald-700 text-white p-4 rounded-2xl hover:from-green-700 hover:to-emerald-800 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl group"
            >
              {isSending ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Send className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

interface LoginFormProps {
  username: string;
  setUsername: (username: string) => void;
  onLogin: (e: React.FormEvent) => void;
  isLoading: boolean;
  error: string | null;
}

const LoginForm: React.FC<LoginFormProps> = ({
  username,
  setUsername,
  onLogin,
  isLoading,
  error
}) => (
  <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100 flex items-center justify-center p-4">
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 w-full max-w-md border border-white/20">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="relative inline-block mb-4">
          <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl flex items-center justify-center shadow-lg">
            <Users className="w-8 h-8 text-white" />
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-br from-green-600 to-emerald-700 bg-clip-text text-transparent mb-2">
          Agent Portal
        </h1>
        <p className="text-gray-600">Access the support dashboard</p>
      </div>

      {/* Login Form */}
      <form onSubmit={onLogin} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Username
          </label>
          <div className="relative">
            <Users className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="amit.kumar"
              autoComplete="username"
              autoFocus
              className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white/50 backdrop-blur-sm"
              required
            />
          </div>
          {error && (
            <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
              <span>⚠️</span> {error}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-green-600 to-emerald-700 text-white py-4 px-6 rounded-xl hover:from-green-700 hover:to-emerald-800 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl font-semibold"
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Signing in...
            </div>
          ) : (
            'Access Dashboard'
          )}
        </button>
      </form>

      {/* Demo Credentials */}
      <div className="mt-8 p-6 bg-gradient-to-br from-gray-50 to-green-50/50 rounded-2xl border border-gray-200/50">
        <p className="text-sm font-semibold text-gray-700 text-center mb-4">
          Credentials
        </p>
        <div className="space-y-3">
          {[
            { name: 'Amit Kumar', username: 'amit.kumar', role: 'Support Agent', color: 'green' },
            { name: 'Sneha Singh', username: 'sneha.singh', role: 'Senior Agent', color: 'emerald' }
          ].map((agent, index) => (
            <button
              key={index}
              onClick={() => setUsername(agent.username)}
              className="w-full flex items-center gap-4 p-3 bg-white rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-md transition-all duration-200 group"
            >
              <div className={`w-10 h-10 bg-${agent.color}-100 rounded-lg flex items-center justify-center group-hover:bg-${agent.color}-200 transition-colors`}>
                <Users className={`w-5 h-5 text-${agent.color}-600`} />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-gray-900">{agent.name}</p>
                <div className="flex items-center gap-1 mt-1">
                  <code className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                    {agent.username}
                  </code>
                  <span className="text-xs text-gray-500">• {agent.role}</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-green-600 transition-colors" />
            </button>
          ))}
        </div>
      </div>

      {/* Back to Home Button */}
      <div className="mt-6 text-center">
        <a
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-2xl transition-all duration-200 font-medium group"
        >
          <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
          Back to Home
        </a>
      </div>
    </div>
  </div>
);

function SupportDashboardContent() {
  const { user, login, logout } = useAuth();
  const { state, assignTicket, sendMessage, updateTicketStatus, loadTicketMessages } = useSupport();
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [activeTicket, setActiveTicket] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError(null);
    const success = await login({ username });
    setIsLoading(false);
    if (!success) {
      setLoginError('Invalid credentials. Try "amit.kumar" or "sneha.singh".');
    }
  };

  const handleLogout = () => {
    logout();
    setActiveTicket(null);
    setMessage('');
  };

  // Auto-select first ticket after login
  useEffect(() => {
    if (user && user.role === 'agent' && state.tickets.length > 0 && !activeTicket) {
      const firstUnassignedTicket = state.tickets.find((t: SupportTicket) => !t.assignedAgentId);
      if (firstUnassignedTicket) {
        setActiveTicket(firstUnassignedTicket.id);
        assignTicket(firstUnassignedTicket.id, user.id);
      } else {
        setActiveTicket(state.tickets[0].id);
      }
    }
  }, [user, state.tickets, activeTicket, assignTicket]);

  // Load messages when active ticket changes
  useEffect(() => {
    if (activeTicket && user) {
      const currentTicket = state.tickets.find((t: SupportTicket) => t.id === activeTicket);
      if (currentTicket) {
        loadTicketMessages(currentTicket.conversationId);
        
        if (!currentTicket.assignedAgentId || currentTicket.assignedAgentId !== user.id) {
          assignTicket(currentTicket.id, user.id);
        }
      }
    }
  }, [activeTicket, user, state.tickets, loadTicketMessages, assignTicket]);

  const handleSendMessage = async (content: string) => {
    if (!activeTicket || !user || isSending) return;

    setIsSending(true);
    try {
      await sendMessage(activeTicket, content);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsSending(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !activeTicket || isSending) return;

    await handleSendMessage(message);
    setMessage('');
  };

  const handleUpdateStatus = async (status: string) => {
    if (!activeTicket) return;
    await updateTicketStatus(activeTicket, status);
  };

  const currentTicket = activeTicket
    ? state.tickets.find((t: SupportTicket) => t.id === activeTicket)
    : undefined;

  const currentMessages = currentTicket ? state.messages[currentTicket.conversationId] || [] : [];

  if (!user) {
    return (
      <LoginForm
        username={username}
        setUsername={setUsername}
        onLogin={handleLogin}
        isLoading={isLoading}
        error={loginError}
      />
    );
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100">
      <Sidebar onLogout={handleLogout} user={user} />
      <TicketList
        tickets={state.tickets}
        activeTicket={activeTicket}
        onSelectTicket={setActiveTicket}
        user={user}
      />
      {currentTicket ? (
        <ChatView
          ticket={currentTicket}
          messages={currentMessages}
          onSendMessage={handleFormSubmit}
          message={message}
          setMessage={setMessage}
          isSending={isSending}
          onUpdateStatus={handleUpdateStatus}
        />
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <MessageCircle className="w-20 h-20 text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No ticket selected</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              {state.tickets.length === 0 
                ? "No tickets available. Tickets from customer chats will appear here."
                : "Choose a ticket from the sidebar to start chatting with customers and provide support."
              }
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SupportDashboardPage() {
  return (
    <SupportProvider>
      <SupportDashboardContent />
    </SupportProvider>
  );
}