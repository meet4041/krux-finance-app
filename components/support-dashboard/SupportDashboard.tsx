'use client';

import React from 'react';
import { TicketProvider } from '@/contexts/TicketContext';
import { TicketList } from './TicketList';
import { ChatPanel } from './ChatPanel';
import { CustomerInfoPanel } from './CustomerInfoPanel';
import { useTickets } from '@/contexts/TicketContext';

function DashboardContent() {
    const { selectedTicket } = useTickets();

    return (
        <div className="h-full flex bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Left Sidebar - Ticket List */}
            <div className="w-80 border-r border-purple-500/20 bg-slate-800/70 backdrop-blur-sm flex flex-col">
                <TicketList />
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col">
                <ChatPanel />
            </div>

            {/* Right Sidebar - Customer Info (only show when ticket is selected) */}
            {selectedTicket && (
                <div className="w-80 border-l border-purple-500/20 bg-slate-800/70 backdrop-blur-sm">
                    <CustomerInfoPanel />
                </div>
            )}
        </div>
    );
}

export function SupportDashboard() {
    return (
        <TicketProvider>
            <DashboardContent />
        </TicketProvider>
    );
}