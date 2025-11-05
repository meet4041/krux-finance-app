'use client';

import React from 'react';
import { Search, Filter, MessageCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TicketItem } from './TicketItem';
import { useTickets } from '@/contexts/TicketContext';
import { Badge } from '@/components/ui/badge';

export function TicketList() {
    const {
        getFilteredTickets,
        filter,
        setFilter,
        searchQuery,
        setSearchQuery,
        tickets
    } = useTickets();

    const filteredTickets = getFilteredTickets();

    const getTicketCount = (status: string) => {
        return tickets.filter(ticket => ticket.status === status).length;
    };

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-6 border-b border-white/10 bg-slate-800/80">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-white">Support Tickets</h2>
                    <Badge variant="secondary" className="bg-purple-500/20 text-purple-200 border-purple-500/30">
                        {filteredTickets.length} tickets
                    </Badge>
                </div>

                {/* Search */}
                <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-purple-300" />
                    <Input
                        placeholder="Search tickets..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-slate-700/50 border-purple-500/30 text-white placeholder:text-purple-200/60 focus:border-purple-400"
                    />
                </div>

                {/* Filters */}
                <div className="flex space-x-2">
                    <Button
                        variant={filter === 'all' ? 'gradient' : 'outline'}
                        size="sm"
                        onClick={() => setFilter('all')}
                        className="flex-1 text-xs bg-purple-600 hover:bg-purple-700 text-white"
                    >
                        All ({tickets.length})
                    </Button>
                    <Button
                        variant={filter === 'open' ? 'gradient' : 'outline'}
                        size="sm"
                        onClick={() => setFilter('open')}
                        className="flex-1 text-xs bg-cyan-600 hover:bg-cyan-700 text-white"
                    >
                        Open ({getTicketCount('open')})
                    </Button>
                    <Button
                        variant={filter === 'in-progress' ? 'gradient' : 'outline'}
                        size="sm"
                        onClick={() => setFilter('in-progress')}
                        className="flex-1 text-xs bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        Active ({getTicketCount('in-progress')})
                    </Button>
                </div>
            </div>

            {/* Ticket List */}
            <div className="flex-1 overflow-y-auto bg-slate-800/30">
                {filteredTickets.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-purple-200/60 p-8">
                        <MessageCircle className="h-16 w-16 mb-4 text-purple-500/30" />
                        <p className="text-sm text-center">
                            {searchQuery ? 'No tickets match your search' : 'No tickets found'}
                        </p>
                        {!searchQuery && (
                            <p className="text-xs text-purple-200/40 mt-2">
                                New customer chats will appear here
                            </p>
                        )}
                    </div>
                ) : (
                    <div className="divide-y divide-white/10">
                        {filteredTickets.map((ticket) => (
                            <TicketItem key={ticket.id} ticket={ticket} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}