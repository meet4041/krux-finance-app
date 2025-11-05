import { SupportTicket } from '@/types';

export const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
};

export const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

export const getPriorityColor = (priority: string): string => {
    switch (priority) {
        case 'urgent':
            return 'bg-red-500/20 text-red-300 border-red-500/40';
        case 'high':
            return 'bg-orange-500/20 text-orange-300 border-orange-500/40';
        case 'medium':
            return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40';
        case 'low':
            return 'bg-green-500/20 text-green-300 border-green-500/40';
        default:
            return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
    }
};

export const getStatusColor = (status: string): string => {
    switch (status) {
        case 'open':
            return 'bg-cyan-500/20 text-cyan-300';
        case 'in-progress':
            return 'bg-blue-500/20 text-blue-300';
        case 'resolved':
            return 'bg-green-500/20 text-green-300';
        case 'escalated':
            return 'bg-purple-500/20 text-purple-300';
        default:
            return 'bg-slate-500/20 text-slate-300';
    }
};

export const calculateResponseTime = (ticket: SupportTicket): string => {
    const firstUserMessage = ticket.messages.find(m => m.sender === 'user');
    if (!firstUserMessage) return 'N/A';

    const firstResponse = ticket.messages.find(m => m.sender === 'bot' || m.sender === 'agent');
    if (!firstResponse) return 'Pending';

    const diff = firstResponse.timestamp.getTime() - firstUserMessage.timestamp.getTime();
    const minutes = Math.floor(diff / 60000);

    if (minutes < 1) return '< 1 min';
    if (minutes < 60) return `${minutes} min`;

    const hours = Math.floor(minutes / 60);
    return `${hours} h ${minutes % 60} min`;
};