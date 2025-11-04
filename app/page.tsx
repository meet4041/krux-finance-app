// app/page.tsx
'use client';

import Link from 'next/link';
import { MessageCircle, Users, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">K</span>
              </div>
              <span className="text-xl font-bold text-gray-900">KRUX Finance</span>
            </div>
            <nav className="flex items-center gap-2">
              <Link
                href="/customer-chat"
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-700 hover:bg-blue-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                Customer Chat
              </Link>
              <Link
                href="/support-dashboard"
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-700 hover:bg-blue-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
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
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            KRUX Finance
            <span className="block text-blue-600">Support System</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Experience seamless customer support with our dual-interface system. 
            Get instant help for loan applications or manage customer conversations efficiently.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Customer Chat Card */}
            <Link 
              href="/customer-chat" 
              className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 text-left border border-gray-100 hover:border-blue-200"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <MessageCircle className="w-6 h-6 text-blue-600" />
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 ml-auto group-hover:text-blue-600 transition-colors" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Customer Chat</h3>
              <p className="text-gray-600 mb-4">
                Get instant help with loan applications, document requirements, and application status.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Automated loan assistance</li>
                <li>• Document requirement guidance</li>
                <li>• Real-time status updates</li>
                <li>• Human agent escalation</li>
              </ul>
            </Link>

            {/* Support Dashboard Card */}
            <Link 
              href="/support-dashboard" 
              className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 text-left border border-gray-100 hover:border-green-200"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 ml-auto group-hover:text-green-600 transition-colors" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Support Dashboard</h3>
              <p className="text-gray-600 mb-4">
                Manage customer conversations, track performance, and provide efficient support.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Ticket queue management</li>
                <li>• Quick reply templates</li>
                <li>• Performance metrics</li>
                <li>• Real-time synchronization</li>
              </ul>
            </Link>
          </div>

          {/* Demo Credentials */}
          <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Demo Credentials</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Customer Access</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Rahul Sharma</span>
                    <code className="bg-blue-100 text-blue-800 px-2 py-1 rounded">+919876543210</code>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Priya Patel</span>
                    <code className="bg-blue-100 text-blue-800 px-2 py-1 rounded">+919876543211</code>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Agent Access</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Amit Kumar</span>
                    <code className="bg-green-100 text-green-800 px-2 py-1 rounded">amit.kumar</code>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Sneha Singh</span>
                    <code className="bg-green-100 text-green-800 px-2 py-1 rounded">sneha.singh</code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}