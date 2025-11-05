'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useChat } from '@/contexts/ChatContext';
import { useAuth } from '@/contexts/AuthContext';
import { getBotResponse, quickReplies } from '@/utils/botResponses';
import { generateTicketId, saveTicketsToStorage, loadTicketsFromStorage } from '@/utils/storage';
import { MessageBubble } from './MessageBubble';
import { QuickReplies } from './QuickReplies';
import { TypingIndicator } from '@/components/shared/TypingIndicator';
import { SupportTicket } from '@/types';

export function ChatInterface() {
    const [inputMessage, setInputMessage] = useState('');
    const [showQuickReplies, setShowQuickReplies] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { messages, addMessage, isTyping, setIsTyping } = useChat();
    const { user } = useAuth();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (messages.length === 0) {
            addMessage("Hello! Welcome to KRUX Finance support. I'm here to help you with loan applications, document requirements, status checks, and more. How can I assist you today?", 'bot');
        }
    }, [addMessage, messages.length]);

    const handleSendMessage = async () => {
        if (!inputMessage.trim()) return;

        const userMessage = inputMessage.trim();
        setInputMessage('');
        setShowQuickReplies(false);

        addMessage(userMessage, 'user');

        setIsTyping(true);
        await new Promise(resolve => setTimeout(resolve, 1000));

        const botResponse = getBotResponse(userMessage);
        addMessage(botResponse, 'bot');
        setIsTyping(false);

        const tickets = loadTicketsFromStorage();
        const existingTicket = tickets.find(t => t.customerId === user?.id && t.status === 'open');

        if (existingTicket) {
            const updatedTicket: SupportTicket = {
                ...existingTicket,
                messages: [
                    ...existingTicket.messages,
                    { id: Date.now().toString(), content: userMessage, sender: 'user', timestamp: new Date() },
                    { id: (Date.now() + 1).toString(), content: botResponse, sender: 'bot', timestamp: new Date() }
                ],
                updatedAt: new Date(),
                lastMessage: userMessage,
                unreadCount: existingTicket.unreadCount + 1
            };

            const updatedTickets = tickets.map(ticket =>
                ticket.id === existingTicket.id ? updatedTicket : ticket
            );
            saveTicketsToStorage(updatedTickets);
        } else {
            const newTicket: SupportTicket = {
                id: generateTicketId(),
                customerId: user?.id || 'unknown',
                customerName: user?.name || 'Customer',
                customerPhone: user?.phone || '',
                status: 'open',
                priority: 'medium',
                category: 'general',
                messages: [
                    { id: Date.now().toString(), content: userMessage, sender: 'user', timestamp: new Date() },
                    { id: (Date.now() + 1).toString(), content: botResponse, sender: 'bot', timestamp: new Date() }
                ],
                createdAt: new Date(),
                updatedAt: new Date(),
                lastMessage: userMessage,
                unreadCount: 1
            };

            const updatedTickets: SupportTicket[] = [...tickets, newTicket];
            saveTicketsToStorage(updatedTickets);
        }
    };

    const handleQuickReply = (message: string) => {
        setInputMessage(message);
        setShowQuickReplies(false);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="h-full flex flex-col bg-slate-800/50 backdrop-blur-sm">
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.length === 0 && (
                    <div className="text-center py-12">
                        <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Send className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">Start a Conversation</h3>
                        <p className="text-white/60">Ask about loans, documents, or application status</p>
                    </div>
                )}

                {messages.map((message) => (
                    <MessageBubble key={message.id} message={message} />
                ))}

                {isTyping && <TypingIndicator />}

                <div ref={messagesEndRef} />
            </div>

            <QuickReplies
                onQuickReply={handleQuickReply}
                visible={showQuickReplies && messages.length <= 2}
            />

            <div className="border-t border-white/10 bg-slate-800/80 backdrop-blur-lg p-6">
                <div className="flex space-x-3">
                    <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" className="text-white/60 hover:text-white hover:bg-white/10">
                            <Paperclip className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-white/60 hover:text-white hover:bg-white/10">
                            <Mic className="h-4 w-4" />
                        </Button>
                    </div>
                    <Input
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message..."
                        className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-cyan-500 focus:ring-cyan-500"
                    />
                    <Button
                        onClick={handleSendMessage}
                        disabled={!inputMessage.trim()}
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-0 shadow-lg shadow-cyan-500/25"
                    >
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}