// app/page.tsx
'use client';

import Link from 'next/link';
import { MessageCircle, Users, ArrowRight, Sparkles, Bot, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-11 h-11 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">K</span>
              </div>
              <div>
                <span className="text-2xl ml-3 font-bold bg-gradient-to-br from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                  KRUX Finance
                </span>
                <p className="text-sm ml-3 text-gray-600">Customer Support System</p>
              </div>
            </div>
            <nav className="flex items-center gap-3">
              <Link
                href="/customer-chat"
                className="px-4 py-2.5 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-all duration-200 border border-blue-200 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Customer Chat
              </Link>
              <Link
                href="/support-dashboard"
                className="px-4 py-2.5 text-sm font-medium text-green-600 hover:text-green-700 hover:bg-green-50 rounded-xl transition-all duration-200 border border-green-200 hover:border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Support Dashboard
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          {/* Main Heading */}
          <div className="relative inline-block mb-8">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl blur-lg opacity-20"></div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 relative">
              KRUX Finance
              <span className="block text-transparent bg-gradient-to-br from-blue-600 to-indigo-700 bg-clip-text">
                Support System
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-xl text-gray-600 mb-16 max-w-3xl mx-auto leading-relaxed">
            Experience seamless customer support with our dual-interface system.
            Get instant help for loan applications or manage customer conversations efficiently.
          </p>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
            {/* Customer Chat Card */}
            <Link
              href="/customer-chat"
              className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 p-8 text-left border border-white/20 hover:border-blue-300/50 hover:scale-105"
            >
              <div className="flex items-center mb-6">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <MessageCircle className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                    <Sparkles className="w-3 h-3 text-white" />
                  </div>
                </div>
                <ArrowRight className="w-6 h-6 text-gray-400 ml-auto group-hover:text-blue-600 group-hover:translate-x-2 transition-all duration-300" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-br from-blue-600 to-indigo-700 bg-clip-text text-transparent mb-4">
                Customer Chat
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Get instant help with loan applications, document requirements, and application status through our AI-powered assistant.
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  Automated loan assistance
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  Document requirement guidance
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  Real-time status updates
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  Human agent escalation
                </li>
              </ul>
              <div className="mt-6 flex items-center text-blue-600 font-medium">
                Start Chatting
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </Link>

            {/* Support Dashboard Card */}
            <Link
              href="/support-dashboard"
              className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 p-8 text-left border border-white/20 hover:border-green-300/50 hover:scale-105"
            >
              <div className="flex items-center mb-6">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                    <Zap className="w-3 h-3 text-white" />
                  </div>
                </div>
                <ArrowRight className="w-6 h-6 text-gray-400 ml-auto group-hover:text-green-600 group-hover:translate-x-2 transition-all duration-300" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-br from-green-600 to-emerald-700 bg-clip-text text-transparent mb-4">
                Support Dashboard
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Manage customer conversations, track performance metrics, and provide efficient support with powerful agent tools.
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  Ticket queue management
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  Quick reply templates
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  Performance metrics
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  Real-time synchronization
                </li>
              </ul>
              <div className="mt-6 flex items-center text-green-600 font-medium">
                Access Dashboard
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </Link>
          </div>

          {/* Demo Credentials */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-10 max-w-4xl mx-auto border border-white/20">
            <div className="text-center mb-10">
              <h3 className="text-3xl font-bold bg-gradient-to-br from-gray-800 to-gray-900 bg-clip-text text-transparent mb-3">
                Demo Credentials
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Use these credentials to test both customer and agent interfaces
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Customer Access */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-2xl p-6 border border-blue-200/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Customer Access</h4>
                    <p className="text-sm text-gray-600">Test the customer chat experience</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { name: 'Rahul Sharma', credential: '+919876543210', color: 'blue' },
                    { name: 'Priya Patel', credential: '+919876543211', color: 'indigo' }
                  ].map((user, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white/80 rounded-xl border border-gray-200/50 hover:border-blue-300 transition-colors duration-200">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 bg-${user.color}-100 rounded-lg flex items-center justify-center`}>
                          <Users className={`w-4 h-4 text-${user.color}-600`} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-500">Customer</p>
                        </div>
                      </div>
                      <code className="text-sm bg-blue-100 text-blue-800 px-3 py-1.5 rounded-lg font-medium">
                        {user.credential}
                      </code>
                    </div>
                  ))}
                </div>
              </div>

              {/* Agent Access */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50/50 rounded-2xl p-6 border border-green-200/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-700 rounded-xl flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Agent Access</h4>
                    <p className="text-sm text-gray-600">Test the support dashboard</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { name: 'Amit Kumar', credential: 'amit.kumar', role: 'Support Agent', color: 'green' },
                    { name: 'Sneha Singh', credential: 'sneha.singh', role: 'Senior Agent', color: 'emerald' }
                  ].map((agent, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white/80 rounded-xl border border-gray-200/50 hover:border-green-300 transition-colors duration-200">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 bg-${agent.color}-100 rounded-lg flex items-center justify-center`}>
                          <Users className={`w-4 h-4 text-${agent.color}-600`} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{agent.name}</p>
                          <p className="text-xs text-gray-500">{agent.role}</p>
                        </div>
                      </div>
                      <code className="text-sm bg-green-100 text-green-800 px-3 py-1.5 rounded-lg font-medium">
                        {agent.credential}
                      </code>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Start Guide */}
            <div className="mt-8 p-6 bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-2xl border border-gray-200/50">
              <h4 className="font-bold text-gray-900 mb-3 text-center">Quick Start</h4>
              <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                <div className="text-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold">1</span>
                  </div>
                  <p>Choose a customer credential</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <span className="text-green-600 font-bold">2</span>
                  </div>
                  <p>Test the chat interface</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <span className="text-purple-600 font-bold">3</span>
                  </div>
                  <p>Login as agent to manage tickets</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}