export const APP_CONFIG = {
    name: 'KRUX Finance Support',
    version: '1.0.0',
    description: 'Dual chatbot system for customer support',
};

export const CHAT_CONFIG = {
    maxMessageLength: 1000,
    typingDelay: 1000, // ms
    maxTickets: 100,
    autoResponseDelay: 2000, // ms
};

export const STORAGE_KEYS = {
    CURRENT_USER: 'currentUser',
    SUPPORT_TICKETS: 'supportTickets',
    QUICK_REPLIES: 'quickReplies',
    CHAT_HISTORY: 'chatHistory',
};

export const PRIORITY_COLORS = {
    urgent: 'red',
    high: 'orange',
    medium: 'yellow',
    low: 'green',
} as const;

export const STATUS_LABELS = {
    open: 'Open',
    'in-progress': 'In Progress',
    resolved: 'Resolved',
    escalated: 'Escalated',
} as const;

export const CATEGORY_LABELS = {
    'loan-application': 'Loan Application',
    'document-requirements': 'Document Requirements',
    'application-status': 'Application Status',
    general: 'General Inquiry',
} as const;