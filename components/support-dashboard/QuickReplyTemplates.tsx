'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { quickReplyTemplates } from '@/utils/mockData';

interface QuickReplyTemplatesProps {
    onSelectTemplate: (message: string) => void;
}

export function QuickReplyTemplates({ onSelectTemplate }: QuickReplyTemplatesProps) {
    return (
        <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-900">Quick Replies</h4>
            <div className="space-y-1">
                {quickReplyTemplates.map((template) => (
                    <Button
                        key={template.id}
                        variant="outline"
                        size="sm"
                        onClick={() => onSelectTemplate(template.message)}
                        className="w-full justify-start text-left h-auto py-2"
                    >
                        <div>
                            <div className="font-medium text-xs">{template.title}</div>
                            <div className="text-gray-600 text-xs line-clamp-2">{template.message}</div>
                        </div>
                    </Button>
                ))}
            </div>
        </div>
    );
}