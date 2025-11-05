'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { MessageCircle, Users, ArrowRight, Shield, Sparkles, Bot, HeadphonesIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleCustomerChat = () => {
    router.push('/customer-chat');
  };

  const handleSupportDashboard = () => {
    if (user?.role === 'agent') {
      router.push('/support-dashboard');
    } else {
      router.push('/support-dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-10 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
        </div>
      </div>

      <header className="relative bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Shield className="h-8 w-8 text-white" />
                <Sparkles className="h-4 w-4 text-yellow-400 absolute -top-1 -right-1" />
              </div>
              <span className="text-xl font-bold text-white">KRUX Finance</span>
            </div>
            
            {user && (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-white/80">
                  Welcome, {user.name}
                </span>
                <Button 
                  variant="outline" 
                  onClick={logout} 
                  size="sm"
                  className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                >
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Intelligent
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Support Hub
              </span>
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              Experience next-generation customer support with AI-powered assistance 
              and seamless human collaboration.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-slate-800/80 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300">
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 mx-auto transform group-hover:scale-110 transition-transform duration-300">
                  <Bot className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  AI Assistant
                </h3>
                <p className="text-white/70 mb-6 leading-relaxed">
                  Get instant, intelligent responses for loan inquiries, document requirements, 
                  and application status. Available 24/7 with human escalation when needed.
                </p>
                <Button 
                  onClick={handleCustomerChat}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-0 shadow-lg shadow-cyan-500/25"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Start Conversation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-slate-800/80 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 mx-auto transform group-hover:scale-110 transition-transform duration-300">
                  <HeadphonesIcon className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  Agent Workspace
                </h3>
                <p className="text-white/70 mb-6 leading-relaxed">
                  Advanced dashboard for support agents with intelligent ticket routing, 
                  customer insights, and productivity tools for exceptional service delivery.
                </p>
                <Button 
                  onClick={handleSupportDashboard}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 shadow-lg shadow-purple-500/25"
                >
                  <Users className="mr-2 h-5 w-5" />
                  {user?.role === 'agent' ? 'Access Workspace' : 'Login as Agent'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-12 text-white">
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">24/7</div>
              <div className="text-sm text-white/60">Available</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">99%</div>
              <div className="text-sm text-white/60">Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-400">2min</div>
              <div className="text-sm text-white/60">Avg Response</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}