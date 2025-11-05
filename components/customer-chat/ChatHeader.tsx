'use client';

import React from 'react';
import { ArrowLeft, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface ChatHeaderProps {
    onEndChat?: () => void;
}

export function ChatHeader({ onEndChat }: ChatHeaderProps) {
    const { user } = useAuth();
    const router = useRouter();

    return (
        <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Button
                        variant="ghost"
                        onClick={() => router.push('/')}
                        className="flex items-center space-x-2"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span>Back</span>
                    </Button>
                    <div className="flex items-center space-x-3">
                        <Shield className="h-6 w-6 text-krux-blue" />
                        <div>
                            <h1 className="text-lg font-semibold text-gray-900">
                                KRUX Finance Support
                            </h1>
                            <p className="text-sm text-gray-600">
                                Hello, {user?.name} • We're here to help
                            </p>
                        </div>
                    </div>
                </div>
                <Button
                    variant="outline"
                    onClick={onEndChat}
                >
                    End Chat
                </Button>
            </div>
        </header>
    );
}