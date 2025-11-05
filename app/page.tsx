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
        </div>
      </main>
    </div>
  );
}