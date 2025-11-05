import { useState, useCallback } from 'react';
import { Message } from '@/types';

export function useChat() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isTyping, setIsTyping] = useState(false);

    const addMessage = useCallback((content: string, sender: 'user' | 'bot' | 'agent') => {
        const message: Message = {
            id: Date.now().toString(),
            content,
            sender,
            timestamp: new Date()
        };
        setMessages(prev => [...prev, message]);
    }, []);

    const clearMessages = useCallback(() => {
        setMessages([]);
    }, []);

    return {
        messages,
        addMessage,
        isTyping,
        setIsTyping,
        clearMessages
    };
}