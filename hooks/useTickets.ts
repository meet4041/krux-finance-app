import { useState, useEffect } from 'react';
import { SupportTicket } from '@/types';
import { loadTicketsFromStorage, saveTicketsToStorage } from '@/utils/storage';

export function useTickets() {
    const [tickets, setTickets] = useState<SupportTicket[]>([]);
    const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedTickets = loadTicketsFromStorage();
        setTickets(savedTickets);
        setLoading(false);
    }, []);

    const updateTickets = (newTickets: SupportTicket[]) => {
        setTickets(newTickets);
        saveTicketsToStorage(newTickets);
    };

    const addTicket = (ticket: SupportTicket) => {
        const newTickets = [...tickets, ticket];
        updateTickets(newTickets);
    };

    const updateTicket = (updatedTicket: SupportTicket) => {
        const newTickets = tickets.map(ticket =>
            ticket.id === updatedTicket.id ? updatedTicket : ticket
        );
        updateTickets(newTickets);

        if (selectedTicket?.id === updatedTicket.id) {
            setSelectedTicket(updatedTicket);
        }
    };

    const deleteTicket = (ticketId: string) => {
        const newTickets = tickets.filter(ticket => ticket.id !== ticketId);
        updateTickets(newTickets);

        if (selectedTicket?.id === ticketId) {
            setSelectedTicket(null);
        }
    };

    const selectTicket = (ticket: SupportTicket) => {
        setSelectedTicket(ticket);

        // Mark as read
        if (ticket.unreadCount > 0) {
            const updatedTicket = { ...ticket, unreadCount: 0 };
            updateTicket(updatedTicket);
        }
    };

    const addMessageToTicket = (ticketId: string, content: string, sender: 'user' | 'bot' | 'agent') => {
        const ticket = tickets.find(t => t.id === ticketId);
        if (!ticket) return;

        const newMessage = {
            id: Date.now().toString(),
            content,
            sender,
            timestamp: new Date()
        };

        const updatedTicket = {
            ...ticket,
            messages: [...ticket.messages, newMessage],
            updatedAt: new Date(),
            lastMessage: content,
            unreadCount: sender === 'user' ? ticket.unreadCount + 1 : ticket.unreadCount
        };

        updateTicket(updatedTicket);
    };

    const getTicketById = (ticketId: string) => {
        return tickets.find(ticket => ticket.id === ticketId);
    };

    const getTicketsByStatus = (status: SupportTicket['status']) => {
        return tickets.filter(ticket => ticket.status === status);
    };

    return {
        tickets,
        selectedTicket,
        loading,
        addTicket,
        updateTicket,
        deleteTicket,
        selectTicket,
        addMessageToTicket,
        getTicketById,
        getTicketsByStatus,
        setTickets: updateTickets
    };
}