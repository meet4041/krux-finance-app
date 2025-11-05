import { SupportTicket, LoanApplication } from '@/types';

export const mockLoanApplications: LoanApplication[] = [
    {
        id: 'APP001',
        type: 'personal',
        status: 'approved',
        amount: 500000,
        appliedDate: new Date('2024-01-15'),
        documents: ['Aadhaar', 'PAN', 'Salary Slips', 'Bank Statements']
    },
    {
        id: 'APP002',
        type: 'business',
        status: 'under-review',
        amount: 2000000,
        appliedDate: new Date('2024-02-01'),
        documents: ['Business Registration', 'GST Certificate', 'ITR', 'Bank Statements']
    }
];

export const initialTickets: SupportTicket[] = [
    {
        id: 'TKT001',
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
    },
    {
        id: 'TKT002',
        customerId: '2',
        customerName: 'Priya Patel',
        customerPhone: '+919876543211',
        status: 'in-progress',
        priority: 'high',
        category: 'document-requirements',
        messages: [
            {
                id: '1',
                content: 'What documents are needed for a personal loan?',
                sender: 'user',
                timestamp: new Date('2024-02-20T09:30:00')
            },
            {
                id: '2',
                content: "For personal loans, you'll need: Aadhaar Card, PAN Card, salary slips, and bank statements.",
                sender: 'bot',
                timestamp: new Date('2024-02-20T09:31:00')
            }
        ],
        createdAt: new Date('2024-02-20T09:30:00'),
        updatedAt: new Date('2024-02-20T09:31:00'),
        assignedAgent: 'amit.kumar',
        lastMessage: 'What documents are needed for a personal loan?',
        unreadCount: 0
    }
];

export const quickReplyTemplates = [
    {
        id: '1',
        title: 'Welcome Message',
        message: 'Hello! Welcome to KRUX Finance support. How can I help you today?',
        category: 'greeting'
    },
    {
        id: '2',
        title: 'Document List',
        message: 'For your loan application, you will need the following documents: Aadhaar Card, PAN Card, address proof, income proof, and bank statements.',
        category: 'documents'
    },
    {
        id: '3',
        title: 'Status Update',
        message: 'I can check your application status for you. Please provide your application ID or registered phone number.',
        category: 'status'
    },
    {
        id: '4',
        title: 'Process Explanation',
        message: 'The loan application process typically takes 3-5 business days after document submission. It involves verification, approval, and disbursement stages.',
        category: 'process'
    },
    {
        id: '5',
        title: 'Escalation',
        message: 'I understand your concern. Let me connect you with a senior agent who can better assist with this matter.',
        category: 'escalation'
    }
];