'use client';

import React, { useState } from 'react';
import { MessageSquare, FileText, Clock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { quickReplyTemplates } from '@/utils/mockData';

interface AgentToolsProps {
    onQuickReply: (message: string) => void;
}

export function AgentTools({ onQuickReply }: AgentToolsProps) {
    const [activeCategory, setActiveCategory] = useState('all');

    const categories = ['all', 'greeting', 'documents', 'status', 'process', 'escalation'];

    const filteredTemplates = activeCategory === 'all'
        ? quickReplyTemplates
        : quickReplyTemplates.filter(template => template.category === activeCategory);

    return (
        <div className="border-t bg-white p-4">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                    <MessageSquare className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Quick Replies</span>
                </div>

                <div className="flex space-x-1">
                    {categories.map(category => (
                        <Button
                            key={category}
                            variant={activeCategory === category ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setActiveCategory(category)}
                            className="text-xs h-7"
                        >
                            {category === 'all' ? 'All' : category}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                {filteredTemplates.map((template) => (
                    <Button
                        key={template.id}
                        variant="outline"
                        size="sm"
                        onClick={() => onQuickReply(template.message)}
                        className="justify-start h-auto py-2 text-left text-xs hover:bg-gray-50"
                    >
                        <div>
                            <div className="font-medium">{template.title}</div>
                            <div className="text-gray-600 line-clamp-2">{template.message}</div>
                        </div>
                    </Button>
                ))}
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-4 text-xs text-gray-600">
                    <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>Avg. Response: 2m</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <FileText className="h-3 w-3" />
                        <span>Resolved: 12 today</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span>Active: 3 chats</span>
                    </div>
                </div>
            </div>
        </div>
    );
}