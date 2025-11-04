// app/support-dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { SupportProvider, useSupport } from '@/context/SupportContext';
import { SupportTicket, Message } from '@/types';
import { 
  Users, 
  MessageCircle, 
  Search, 
  Filter, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Star,
  Send,
  LogOut
} from 'lucide-react';

function SupportDashboardContent() {
  const { user, login, logout } = useAuth();
  const { state, assignTicket, sendMessage, updateTicketStatus } = useSupport();
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTicket, setActiveTicket] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await login({ username });
    setIsLoading(false);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !activeTicket) return;

    await sendMessage(activeTicket, message);
    setMessage('');
  };

  const quickReplies = [
    "Please provide your application ID for status check.",
    "I'll help you with the document requirements.",
    "Let me transfer you to a specialist for this query.",
    "Thank you for your patience. I'm looking into this.",
    "Could you please share more details about your issue?"
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Support Agent Login</h1>
            <p className="text-gray-600 mt-2">Enter your credentials to access the dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="amit.kumar"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Access Dashboard'}
            </button>
          </form>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 text-center">
              Demo credentials: <br />
              <code className="bg-gray-200 px-2 py-1 rounded">amit.kumar</code> or{' '}
              <code className="bg-gray-200 px-2 py-1 rounded">sneha.singh</code>
            </p>
          </div>
        </div>
      </div>
    );
  }

  const currentTicket = state.tickets.find((t: SupportTicket) => t.id === activeTicket);
  const ticketMessages = currentTicket ? state.messages[currentTicket.conversationId] || [] : [];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-gray-900">Support Dashboard</h1>
                <p className="text-sm text-gray-500">{user.name}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="p-4 border-b border-gray-200">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-700">Active</span>
                <MessageCircle className="w-4 h-4 text-blue-600" />
              </div>
              <p className="text-xl font-bold text-blue-900 mt-1">
                {state.tickets.filter((t: SupportTicket) => t.status === 'in_progress').length}
              </p>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm text-orange-700">Pending</span>
                <Clock className="w-4 h-4 text-orange-600" />
              </div>
              <p className="text-xl font-bold text-orange-900 mt-1">
                {state.tickets.filter((t: SupportTicket) => t.status === 'open').length}
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex space-x-2">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search tickets..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Ticket List */}
        <div className="flex-1 overflow-y-auto">
          {state.tickets.map((ticket: SupportTicket) => (
            <button
              key={ticket.id}
              onClick={() => setActiveTicket(ticket.id)}
              className={`w-full p-4 border-b border-gray-200 text-left hover:bg-gray-50 transition-colors ${
                activeTicket === ticket.id ? 'bg-blue-50 border-blue-200' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-medium text-gray-900">{ticket.customerName}</h3>
                  <p className="text-sm text-gray-500">{ticket.category}</p>
                </div>
                <div className="flex items-center space-x-1">
                  {ticket.priority === 'high' && <AlertCircle className="w-4 h-4 text-red-500" />}
                  {ticket.priority === 'medium' && <Clock className="w-4 h-4 text-yellow-500" />}
                  {ticket.priority === 'low' && <CheckCircle className="w-4 h-4 text-green-500" />}
                </div>
              </div>
              <p className="text-sm text-gray-600 truncate">
                {ticketMessages[ticketMessages.length - 1]?.content || 'No messages yet'}
              </p>
              <div className="flex items-center justify-between mt-2">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  ticket.status === 'open' ? 'bg-orange-100 text-orange-800' :
                  ticket.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {ticket.status.replace('_', ' ')}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(ticket.updatedAt).toLocaleTimeString()}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {currentTicket ? (
          <>
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">{currentTicket.customerName}</h2>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      currentTicket.priority === 'high' ? 'bg-red-100 text-red-800' :
                      currentTicket.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {currentTicket.priority} priority
                    </span>
                    <span className="text-sm text-gray-500">{currentTicket.category}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => updateTicketStatus(currentTicket.id, 'resolved')}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                  >
                    Resolve
                  </button>
                  <button
                    onClick={() => updateTicketStatus(currentTicket.id, 'escalated')}
                    className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm"
                  >
                    Escalate
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              <div className="max-w-4xl mx-auto space-y-4">
                {ticketMessages.map((msg: Message) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'agent' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs md:max-w-md px-4 py-3 rounded-2xl ${
                        msg.sender === 'agent'
                          ? 'bg-green-600 text-white rounded-br-none'
                          : msg.sender === 'customer'
                          ? 'bg-blue-600 text-white rounded-bl-none'
                          : 'bg-gray-200 text-gray-900 rounded-bl-none'
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                      <p className={`text-xs mt-1 ${
                        msg.sender === 'agent' ? 'text-green-100' : 'text-gray-500'
                      }`}>
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Replies */}
            <div className="bg-white border-t border-gray-200 p-4">
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => setMessage(reply)}
                    className="flex-shrink-0 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm whitespace-nowrap"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <div className="bg-white border-t border-gray-200 p-4">
              <form onSubmit={handleSendMessage} className="flex space-x-4">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your response..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!message.trim()}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No ticket selected</h3>
              <p className="text-gray-500">Choose a ticket from the sidebar to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SupportDashboard() {
  return (
    <SupportProvider>
      <SupportDashboardContent />
    </SupportProvider>
  );
}