'use client';

import React from 'react';
import { User, Bot, Clock, Shield } from 'lucide-react';
import { Message } from '@/types';
import { formatTime } from '@/utils/helpers';
import { clsx } from 'clsx';

interface MessageBubbleProps {
    message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
    const isUser = message.sender === 'user';
    const isBot = message.sender === 'bot';
    const isAgent = message.sender === 'agent';

    return (
        <div
            className={clsx(
                'flex',
                isUser ? 'justify-end' : 'justify-start'
            )}
        >
            <div
                className={clsx(
                    'flex max-w-xs md:max-w-md lg:max-w-lg rounded-2xl px-4 py-3 backdrop-blur-sm border',
                    isUser
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-cyan-400/30 shadow-lg shadow-cyan-500/25'
                        : isAgent
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-purple-400/30 shadow-lg shadow-purple-500/25'
                            : 'bg-white/10 text-white border-white/20'
                )}
            >
                <div className="flex items-start space-x-3">
                    {!isUser && (
                        <div
                            className={clsx(
                                'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
                                isBot ? 'bg-white/20' : 'bg-white/20'
                            )}
                        >
                            {isBot ? (
                                <Bot className="h-4 w-4 text-cyan-300" />
                            ) : (
                                <Shield className="h-4 w-4 text-purple-300" />
                            )}
                        </div>
                    )}
                    <div className="flex-1 min-w-0">
                        <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                        <div
                            className={clsx(
                                'flex items-center space-x-1 mt-2 text-xs',
                                isUser ? 'text-cyan-100' : 'text-white/60'
                            )}
                        >
                            <Clock className="h-3 w-3" />
                            <span>{formatTime(message.timestamp)}</span>
                        </div>
                    </div>
                    {isUser && (
                        <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-white" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}