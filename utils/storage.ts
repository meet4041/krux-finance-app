import { SupportTicket, Message } from '@/types';

export const saveTicketsToStorage = (tickets: SupportTicket[]): void => {
    if (typeof window !== 'undefined') {
        try {
            localStorage.setItem('supportTickets', JSON.stringify(tickets));
        } catch (error) {
            console.error('Error saving tickets to localStorage:', error);
        }
    }
};

export const loadTicketsFromStorage = (): SupportTicket[] => {
    if (typeof window === 'undefined') return [];

    try {
        const saved = localStorage.getItem('supportTickets');
        if (!saved) return [];

        const parsedData = JSON.parse(saved);

        // Handle both array and single ticket formats
        const ticketsArray = Array.isArray(parsedData) ? parsedData : [parsedData];

        return ticketsArray.map((ticket: any) => ({
            id: ticket.id || generateTicketId(),
            customerId: ticket.customerId || 'unknown',
            customerName: ticket.customerName || 'Customer',
            customerPhone: ticket.customerPhone || '',
            status: ticket.status || 'open',
            priority: ticket.priority || 'medium',
            category: ticket.category || 'general',
            messages: Array.isArray(ticket.messages)
                ? ticket.messages.map((msg: any) => ({
                    id: msg.id || Date.now().toString(),
                    content: msg.content || '',
                    sender: msg.sender || 'user',
                    timestamp: msg.timestamp ? new Date(msg.timestamp) : new Date(),
                    type: msg.type || 'text'
                }))
                : [],
            createdAt: ticket.createdAt ? new Date(ticket.createdAt) : new Date(),
            updatedAt: ticket.updatedAt ? new Date(ticket.updatedAt) : new Date(),
            assignedAgent: ticket.assignedAgent || undefined,
            lastMessage: ticket.lastMessage || '',
            unreadCount: typeof ticket.unreadCount === 'number' ? ticket.unreadCount : 0
        }));
    } catch (error) {
        console.error('Error loading tickets from storage:', error);
        return [];
    }
};

export const generateTicketId = (): string => {
    return `TKT${Date.now()}${Math.random().toString(36).substr(2, 9)}`;
};

export const saveMessagesToStorage = (ticketId: string, messages: Message[]): void => {
    try {
        const tickets = loadTicketsFromStorage();
        const ticketIndex = tickets.findIndex(t => t.id === ticketId);

        if (ticketIndex !== -1) {
            const updatedTickets = [...tickets];
            updatedTickets[ticketIndex] = {
                ...updatedTickets[ticketIndex],
                messages: messages,
                updatedAt: new Date(),
                lastMessage: messages.length > 0 ? messages[messages.length - 1].content : ''
            };
            saveTicketsToStorage(updatedTickets);
        }
    } catch (error) {
        console.error('Error saving messages to storage:', error);
    }
};

export const updateTicketInStorage = (updatedTicket: SupportTicket): void => {
    try {
        const tickets = loadTicketsFromStorage();
        const updatedTickets = tickets.map(ticket =>
            ticket.id === updatedTicket.id ? updatedTicket : ticket
        );
        saveTicketsToStorage(updatedTickets);
    } catch (error) {
        console.error('Error updating ticket in storage:', error);
    }
};

export const addTicketToStorage = (newTicket: SupportTicket): void => {
    try {
        const tickets = loadTicketsFromStorage();
        const updatedTickets = [...tickets, newTicket];
        saveTicketsToStorage(updatedTickets);
    } catch (error) {
        console.error('Error adding ticket to storage:', error);
    }
};

export const getTicketById = (ticketId: string): SupportTicket | null => {
    try {
        const tickets = loadTicketsFromStorage();
        return tickets.find(ticket => ticket.id === ticketId) || null;
    } catch (error) {
        console.error('Error getting ticket by ID:', error);
        return null;
    }
};

export const clearAllStorage = (): void => {
    if (typeof window !== 'undefined') {
        try {
            localStorage.removeItem('supportTickets');
            localStorage.removeItem('currentUser');
        } catch (error) {
            console.error('Error clearing storage:', error);
        }
    }
};

// Initialize with sample data if storage is empty
export const initializeStorage = (): void => {
    if (typeof window === 'undefined') return;

    const existingTickets = loadTicketsFromStorage();
    if (existingTickets.length === 0) {
        // Optionally add some sample tickets for demo
        const sampleTickets: SupportTicket[] = [
            {
                id: generateTicketId(),
                customerId: '1',
                customerName: 'Rahul Sharma',
                customerPhone: '+919876543210',
                status: 'open',
                priority: 'medium',
                category: 'loan-application',
                messages: [
                    {
                        id: '1',
                        content: 'Hello, I need help with my business loan application',
                        sender: 'user',
                        timestamp: new Date('2024-02-20T10:00:00')
                    },
                    {
                        id: '2',
                        content: "Hello Rahul! I can help you with your business loan application. What specific assistance do you need?",
                        sender: 'bot',
                        timestamp: new Date('2024-02-20T10:01:00')
                    }
                ],
                createdAt: new Date('2024-02-20T10:00:00'),
                updatedAt: new Date('2024-02-20T10:01:00'),
                lastMessage: 'Hello, I need help with my business loan application',
                unreadCount: 1
            }
        ];

        saveTicketsToStorage(sampleTickets);
    }
};