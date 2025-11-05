'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Smartphone, User } from 'lucide-react';

interface LoginFormProps {
    userType: 'customer' | 'agent';
    onSuccess: () => void;
}

export function LoginForm({ userType, onSuccess }: LoginFormProps) {
    const [credentials, setCredentials] = useState({
        phone: '',
        username: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const success = await login(credentials);
            if (success) {
                onSuccess();
            } else {
                setError(userType === 'customer'
                    ? 'Invalid phone number. Use demo numbers: +919876543210 or +919876543211'
                    : 'Invalid username. Use: amit.kumar or sneha.singh'
                );
            }
        } catch (err) {
            setError('Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {userType === 'customer' ? (
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-white-700 mb-2">
                        Phone Number
                    </label>
                    <div className="relative">
                        <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            id="phone"
                            type="tel"
                            placeholder="+91"
                            value={credentials.phone}
                            onChange={(e) => setCredentials({ ...credentials, phone: e.target.value })}
                            className="pl-10"
                            required
                        />
                    </div>
                </div>
            ) : (
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-white-700 mb-2">
                        Username
                    </label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            id="username"
                            type="text"
                            placeholder="name"
                            value={credentials.username}
                            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                            className="pl-10"
                            required
                        />
                    </div>
                </div>
            )}

            {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3">
                    <p className="text-sm text-red-600">{error}</p>
                </div>
            )}

            <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-krux-blue hover:bg-krux-dark"
            >
                {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                    </>
                ) : (
                    `Sign in as ${userType === 'customer' ? 'Customer' : 'Agent'}`
                )}
            </Button>
        </form>
    );
}