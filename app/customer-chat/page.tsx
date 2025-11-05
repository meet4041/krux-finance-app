'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { ChatInterface } from '@/components/customer-chat/ChatInterface';
import { LoginForm } from '@/components/auth/LoginForm';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CustomerChatPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setShowLogin(true);
    }
  }, [isAuthenticated]);

  if (showLogin && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="glass rounded-3xl p-8 border border-white/10 shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Customer Access</h2>
              <p className="text-white/60 mt-2">Enter your phone number to continue</p>
            </div>
            <LoginForm 
              userType="customer" 
              onSuccess={() => setShowLogin(false)}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col">
      <header className="glass border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => router.push('/')}
              className="flex items-center space-x-2 border-white/20 text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Button>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-white">
                  KRUX Finance AI Assistant
                </h1>
                <p className="text-sm text-white/60">
                  Hello, {user?.name} • We're here to help
                </p>
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => router.push('/')}
            className="border-white/20 text-white hover:bg-white/10"
          >
            End Chat
          </Button>
        </div>
      </header>

      <div className="flex-1 overflow-hidden">
        <ChatInterface />
      </div>
    </div>
  );
}