'use client';

import React from 'react';
import { Bell, Search, User, LogOut } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export function DashboardHeader() {
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    return (
        <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="px-6 h-16 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div>
                        <h1 className="text-lg font-semibold text-gray-900">
                            Support Executive Dashboard
                        </h1>
                        <p className="text-sm text-gray-600">
                            Welcome, {user?.name} • {user?.username}
                        </p>
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search..."
                            className="pl-10 w-64"
                        />
                    </div>

                    {/* Notifications */}
                    <Button variant="ghost" size="sm" className="relative">
                        <Bell className="h-5 w-5" />
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
                            3
                        </span>
                    </Button>

                    {/* User Menu */}
                    <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-krux-blue rounded-full flex items-center justify-center">
                                <User className="h-4 w-4 text-white" />
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                                <p className="text-xs text-green-600">● Online</p>
                            </div>
                        </div>
                        <Button variant="ghost" size="sm" onClick={handleLogout}>
                            <LogOut className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
}