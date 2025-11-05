'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { LoginForm } from '@/components/auth/LoginForm';
import { SupportDashboard } from '@/components/support-dashboard/SupportDashboard';
import { ArrowLeft, HeadphonesIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SupportDashboardPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'agent') {
      setShowLogin(true);
    }
  }, [isAuthenticated, user]);

  if (showLogin && (!isAuthenticated || user?.role !== 'agent')) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="glass rounded-3xl p-8 border border-white/10 shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <HeadphonesIcon className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Agent Workspace</h2>
              <p className="text-white/60 mt-2">Access the support dashboard</p>
            </div>
            <LoginForm 
              userType="agent" 
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
        <div className="px-6 h-16 flex items-center justify-between">
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
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <HeadphonesIcon className="h-4 w-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-white">
                  Support Executive Dashboard
                </h1>
                <p className="text-sm text-white/60">
                  Welcome, {user?.name} • {user?.username}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-white">Active</p>
              <p className="text-xs text-green-400 flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                Online
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-hidden">
        <SupportDashboard />
      </div>
    </div>
  );
}