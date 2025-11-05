// app/customer-chat/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { ChatProvider, useChat } from '@/contexts/ChatContext';
import { Message } from '@/types';
import {
  Send,
  Phone,
  MessageCircle,
  User,
  LogOut,
  Sparkles,
  FileText,
  Clock,
  Headphones,
  Bot,
  ChevronRight,
  Home // Added Home icon
} from 'lucide-react';

function CustomerChatContent() {
  const { user, login, logout } = useAuth();
  const { state, sendMessage, startNewConversation } = useChat();
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [state.messages]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError(null);
    const success = await login({ username: name });
    setIsLoading(false);
    if (!success) {
      // If login failed (shouldn't for arbitrary names due to fallback), show a friendly message
      setLoginError('Could not login with that name. Try a different name or use one of the demo profiles below.');
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!user) return;

    setIsSending(true);

    try {
      // Ensure we have a conversation first
      if (!state.currentConversation) {
        await startNewConversation('loan_application');
      }

      await sendMessage(content);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsSending(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !user || isSending) return;

    await handleSendMessage(message);
    setMessage('');
  };

  const quickActions = [
    {
      title: 'Loan Application',
      description: 'Get help with loan applications',
      icon: FileText,
      gradient: 'from-blue-500 to-cyan-500',
      message: 'I need help with loan application'
    },
    {
      title: 'Document Requirements',
      description: 'Check required documents',
      icon: FileText,
      gradient: 'from-green-500 to-emerald-500',
      message: 'What documents do I need for loan application?'
    },
    {
      title: 'Application Status',
      description: 'Check my application status',
      icon: Clock,
      gradient: 'from-purple-500 to-pink-500',
      message: 'I want to check my application status'
    },
    {
      title: 'Speak to Agent',
      description: 'Connect with human agent',
      icon: Headphones,
      gradient: 'from-orange-500 to-red-500',
      message: 'I want to speak to a human agent'
    }
  ];

  const handleQuickAction = async (actionMessage: string) => {
    if (isSending) return; // Prevent multiple clicks

    await handleSendMessage(actionMessage);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 w-full max-w-md border border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="relative inline-block mb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-br from-blue-600 to-indigo-700 bg-clip-text text-transparent mb-2">
              KRUX Support
            </h1>
            <p className="text-gray-600">Get instant help with your loan queries</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-3">
                Your name
              </label>
              <div className="relative">
                <User className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl font-semibold"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Connecting...
                </div>
              ) : (
                'Start Chatting'
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 p-6 bg-gradient-to-br from-gray-50 to-blue-50/50 rounded-2xl border border-gray-200/50">
            <p className="text-sm font-semibold text-gray-700 text-center mb-4">
              Credentials
            </p>
            <div className="space-y-3">
              {[
                { name: 'Rahul Sharma', phone: '+919876543210', color: 'blue' },
                { name: 'Priya Patel', phone: '+919876543211', color: 'indigo' }
              ].map((demo, index) => (
                <button
                  key={index}
                  onClick={() => setName(demo.name)}
                  className="w-full flex items-center gap-4 p-3 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 group"
                >
                  <div className={`w-10 h-10 bg-${demo.color}-100 rounded-lg flex items-center justify-center group-hover:bg-${demo.color}-200 transition-colors`}>
                    <User className={`w-5 h-5 text-${demo.color}-600`} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium text-gray-900">{demo.name}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Phone className="w-3 h-3 text-gray-500" />
                      <code className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                        {demo.phone}
                      </code>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </button>
              ))}
            </div>
          </div>

          {/* Back to Home Button */}
          <div className="mt-6 text-center">
            <a
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-2xl transition-all duration-200 font-medium group"
            >
              <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Back to Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full flex items-center justify-center border-2 border-white">
                  <div className="w-1.5 h-1.5 bg-white rounded-full" />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-br ml-4 from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                  KRUX Support
                </h1>
                <p className="text-sm text-gray-600 flex ml-4 items-center gap-1">
                  <Bot className="w-3 h-3" />
                  AI Assistant
                </p>
              </div>

            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 bg-white/50 backdrop-blur-sm mr-2 rounded-xl px-4 py-2 border border-gray-200/50">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 ml-2.5">{user.name}</p>
                  <p className="text-xs text-gray-500">Customer</p>
                </div>
              </div>
              <button
                onClick={logout}
                className="p-3 border border-blue-200 text-blue-600 rounded-xl hover:bg-gradient-to-br hover:from-blue-500 hover:to-indigo-600 hover:text-white hover:border-transparent transition-all duration-200 shadow-sm hover:shadow-lg group"
                title="Logout"
              >
                <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Quick Actions - Show when no messages */}
      {state.messages.length === 0 && (
        <div className="max-w-6xl mx-auto w-full px-4 py-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              How can we help you today?
            </h2>
            <p className="text-gray-600 max-w-md mx-auto">
              Choose an option below or type your question.<br />
              Our AI assistant is here to help 24/7.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  onClick={() => handleQuickAction(action.message)}
                  disabled={isSending}
                  className="group p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 hover:border-transparent hover:shadow-2xl transition-all duration-300 text-left hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${action.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {action.description}
                  </p>
                  <div className="mt-4 flex items-center text-blue-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {isSending ? 'Sending...' : 'Get started'}
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {state.messages.map((msg: Message) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'customer' ? 'justify-end' : 'justify-start'} animate-fade-in`}
            >
              <div className="flex items-end space-x-2 max-w-[80%]">
                {msg.sender !== 'customer' && (
                  <div className="w-8 h-8 bg-gradient-to-br from-gray-500 to-gray-600 rounded-full flex items-center justify-center flex-shrink-0 mb-1 shadow-lg">
                    {msg.sender === 'agent' ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-white" />
                    )}
                  </div>
                )}
                <div
                  className={`px-6 py-4 rounded-3xl backdrop-blur-sm border ${msg.sender === 'customer'
                    ? 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-br-none shadow-lg border-blue-500/20'
                    : msg.sender === 'agent'
                      ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-bl-none shadow-lg border-green-500/20'
                      : 'bg-white/80 text-gray-900 rounded-bl-none shadow-lg border-gray-200/50'
                    }`}
                >
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                  <p className={`text-xs mt-2 ${msg.sender === 'customer' ? 'text-blue-100' :
                    msg.sender === 'agent' ? 'text-green-100' : 'text-gray-500'
                    }`}>
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                {msg.sender === 'customer' && (
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 mb-1 shadow-lg">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {(state.isLoading || isSending) && (
            <div className="flex justify-start animate-fade-in">
              <div className="flex items-end space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-gray-500 to-gray-600 rounded-full flex items-center justify-center shadow-lg">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white/80 backdrop-blur-sm text-gray-900 px-6 py-4 rounded-3xl rounded-bl-none shadow-lg border border-gray-200/50">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <div className="bg-white/80 backdrop-blur-sm border-t border-gray-200/50 px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleFormSubmit} className="flex space-x-4 items-end">
            <div className="flex-1 relative">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                className="w-full pl-6 pr-12 py-4 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-gray-500 shadow-lg"
                disabled={isSending}
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Bot className="w-5 h-5" />
              </div>
            </div>
            <button
              type="submit"
              disabled={!message.trim() || isSending}
              className="ml-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 rounded-2xl hover:from-blue-700 hover:to-indigo-800 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl group relative"
              title={message.trim() ? "Send message" : "Type a message to send"}
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
}

export default function CustomerChat() {
  return (
    <ChatProvider>
      <CustomerChatContent />
    </ChatProvider>
  );
}