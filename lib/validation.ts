import { z } from 'zod';

export const loginSchema = z.object({
    phone: z.string().optional(),
    username: z.string().optional(),
}).refine((data) => data.phone || data.username, {
    message: "Either phone or username must be provided",
});

export const messageSchema = z.object({
    content: z.string().min(1, "Message cannot be empty"),
    sender: z.enum(['user', 'bot', 'agent']),
});

export const ticketSchema = z.object({
    customerName: z.string().min(1, "Customer name is required"),
    customerPhone: z.string().min(1, "Phone number is required"),
    category: z.enum(['loan-application', 'document-requirements', 'application-status', 'general']),
    priority: z.enum(['low', 'medium', 'high', 'urgent']),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type MessageFormData = z.infer<typeof messageSchema>;
export type TicketFormData = z.infer<typeof ticketSchema>;