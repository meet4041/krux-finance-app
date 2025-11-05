'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Clock, Archive, Shield, AlertCircle, MessageCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTickets } from '@/contexts/TicketContext';
import { useAuth } from '@/contexts/AuthContext';
import { AgentTools } from './AgentTools';
import { formatTime } from '@/utils/helpers';
import { Badge } from '@/components/ui/badge';

export function ChatPanel() {
    const [inputMessage, setInputMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { selectedTicket, addMessageToTicket, updateTicket } = useTickets();
    const { user } = useAuth();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [selectedTicket?.messages]);

    const handleSendMessage = () => {
        if (!inputMessage.trim() || !selectedTicket) return;

        addMessageToTicket(selectedTicket.id, inputMessage, 'agent');
        setInputMessage('');

        if (selectedTicket.status === 'open') {
            updateTicket({
                ...selectedTicket,
                status: 'in-progress',
                assignedAgent: user?.username
            });
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleQuickReply = (message: string) => {
        setInputMessage(message);
    };

    const handleResolveTicket = () => {
        if (selectedTicket) {
            updateTicket({
                ...selectedTicket,
                status: 'resolved'
            });
        }
    };

    const handleEscalateTicket = () => {
        if (selectedTicket) {
            updateTicket({
                ...selectedTicket,
                status: 'escalated',
                priority: 'high'
            });
        }
    };

    if (!selectedTicket) {
        return (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <MessageCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Ticket Selected</h3>
                    <p className="text-gray-500 max-w-sm">
                        Select a ticket from the list to start chatting with the customer
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col bg-white">
            <div className="border-b border-white/10 bg-slate-800/80 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                            <User className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white">
                                {selectedTicket.customerName}
                            </h3>
                            <p className="text-sm text-purple-200">{selectedTicket.customerPhone}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Badge variant={selectedTicket.priority === 'high' || selectedTicket.priority === 'urgent' ? 'destructive' : 'secondary'} className="bg-red-500/20 text-red-200 border-red-500/30">
                            {selectedTicket.priority} priority
                        </Badge>
                        <Badge variant="outline" className="bg-purple-500/20 text-purple-200 border-purple-500/30">
                            {selectedTicket.category}
                        </Badge>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-800/80">
                {selectedTicket.messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex ${message.sender === 'user' ? 'justify-start' : 'justify-end'}`}
                    >
                        <div
                            className={`flex max-w-xs md:max-w-md lg:max-w-lg ${message.sender === 'user'
                                ? 'bg-white text-gray-900 border border-gray-200'
                                : 'bg-krux-blue text-white'
                                } rounded-2xl px-4 py-2 shadow-sm`}
                        >
                            <div className="flex items-start space-x-2">
                                {message.sender === 'user' && (
                                    <div className="flex-shrink-0 w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
                                        <User className="h-3 w-3 text-white" />
                                    </div>
                                )}
                                <div>
                                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                                    <div className={`flex items-center space-x-1 mt-1 text-xs ${message.sender === 'user' ? 'text-gray-500' : 'text-blue-100'
                                        }`}>
                                        <Clock className="h-3 w-3" />
                                        <span>{formatTime(message.timestamp)}</span>
                                        {message.sender === 'agent' && (
                                            <span>• {user?.name}</span>
                                        )}
                                    </div>
                                </div>
                                {message.sender === 'agent' && (
                                    <div className="flex-shrink-0 w-6 h-6 bg-blue-300 rounded-full flex items-center justify-center">
                                        <Shield className="h-3 w-3 text-white" />
                                    </div>
                                )}
                                {message.sender === 'bot' && (
                                    <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                        <Bot className="h-3 w-3 text-white" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <AgentTools onQuickReply={handleQuickReply} />

            <div className="border-t bg-black p-4">
                <div className="flex space-x-2">
                    <Input
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your response..."
                        className="flex-1"
                    />
                    <Button
                        onClick={handleSendMessage}
                        disabled={!inputMessage.trim()}
                        className="bg-krux-blue hover:bg-krux-dark"
                    >
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}