'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { quickReplies } from '@/utils/botResponses';

interface QuickRepliesProps {
    onQuickReply: (message: string) => void;
    visible: boolean;
}

export function QuickReplies({ onQuickReply, visible }: QuickRepliesProps) {
    if (!visible) return null;

    return (
        <div className="border-t border-white/10 bg-slate-800/80 backdrop-blur-lg p-6">
            <p className="text-sm text-white/60 mb-4 font-medium">Quick questions:</p>
            <div className="flex flex-wrap gap-3">
                {quickReplies.map((reply) => (
                    <Button
                        key={reply.id}
                        variant="outline"
                        size="sm"
                        onClick={() => onQuickReply(reply.message)}
                        className="bg-white/5 text-white border-white/20 hover:bg-white/10 hover:border-white/30 transition-all duration-300"
                    >
                        {reply.title}
                    </Button>
                ))}
            </div>
        </div>
    );
}