'use client';

import React from 'react';
import { SupportTicket } from '@/types';
import { useTickets } from '@/contexts/TicketContext';
import { formatTime, getPriorityColor, getStatusColor } from '@/utils/helpers';
import { MessageCircle, Clock, User } from 'lucide-react';
import { clsx } from 'clsx';

interface TicketItemProps {
    ticket: SupportTicket;
}

export function TicketItem({ ticket }: TicketItemProps) {
    const { selectedTicket, selectTicket } = useTickets();

    const isSelected = selectedTicket?.id === ticket.id;

    const handleClick = () => {
        selectTicket(ticket);
    };

    return (
        <div
            className={clsx(
                'p-4 cursor-pointer transition-all duration-300 border-l-4 hover:bg-white/5',
                isSelected
                    ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-l-purple-400'
                    : 'border-l-transparent hover:border-l-purple-500/30',
                ticket.unreadCount > 0 ? 'bg-cyan-500/10' : ''
            )}
            onClick={handleClick}
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                        <User className="h-4 w-4 text-white" />
                    </div>
                    <div>
                        <span className="font-semibold text-sm text-white block">
                            {ticket.customerName}
                        </span>
                        <span className="text-xs text-purple-200">{ticket.customerPhone}</span>
                    </div>
                </div>
                <div className="flex items-center space-x-1">
                    <span className="text-xs text-purple-300">
                        {formatTime(ticket.updatedAt)}
                    </span>
                </div>
            </div>

            {/* Last Message */}
            <p className="text-sm text-purple-100 line-clamp-2 mb-3 leading-relaxed">
                {ticket.lastMessage || 'No messages yet'}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <span
                        className={clsx(
                            'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border shadow-sm',
                            getPriorityColor(ticket.priority)
                        )}
                    >
                        {ticket.priority}
                    </span>
                    <span
                        className={clsx(
                            'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium shadow-sm',
                            getStatusColor(ticket.status)
                        )}
                    >
                        {ticket.status}
                    </span>
                </div>

                <div className="flex items-center space-x-2 text-xs text-purple-300">
                    <MessageCircle className="h-3 w-3" />
                    <span>{ticket.messages.length}</span>
                    {ticket.unreadCount > 0 && (
                        <span className="bg-cyan-500 text-white rounded-full px-2 py-1 text-xs font-medium shadow-lg">
                            {ticket.unreadCount}
                        </span>
                    )}
                </div>
            </div>

            {/* Assigned Agent */}
            {ticket.assignedAgent && (
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-purple-500/20">
                    <span className="text-xs text-purple-300">
                        Assigned to: <span className="text-cyan-300 font-semibold">{ticket.assignedAgent}</span>
                    </span>
                </div>
            )}
        </div>
    );
}