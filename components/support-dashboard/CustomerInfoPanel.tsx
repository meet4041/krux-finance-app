'use client';

import React from 'react';
import { useTickets } from '@/contexts/TicketContext';
import { User, Phone, Calendar, FileText, CheckCircle, Clock, XCircle } from 'lucide-react';
import { mockLoanApplications } from '@/utils/mockData';
import { formatDate } from '@/utils/helpers';
import { Badge } from '@/components/ui/badge';

export function CustomerInfoPanel() {
    const { selectedTicket } = useTickets();

    if (!selectedTicket) return null;

    const customerLoans = mockLoanApplications;

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'approved':
                return <CheckCircle className="h-4 w-4 text-green-400" />;
            case 'pending':
                return <Clock className="h-4 w-4 text-yellow-400" />;
            case 'under-review':
                return <Clock className="h-4 w-4 text-blue-400" />;
            case 'rejected':
                return <XCircle className="h-4 w-4 text-red-400" />;
            default:
                return <Clock className="h-4 w-4 text-purple-400" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'approved':
                return 'bg-green-500/20 text-green-300 border-green-500/30';
            case 'pending':
                return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
            case 'under-review':
                return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
            case 'rejected':
                return 'bg-red-500/20 text-red-300 border-red-500/30';
            default:
                return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
        }
    };

    return (
        <div className="h-full flex flex-col bg-slate-800/70 backdrop-blur-sm">
            <div className="p-4 border-b border-purple-500/20 bg-slate-800/80">
                <h3 className="text-lg font-semibold text-white">Customer Information</h3>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                <div>
                    <h4 className="text-sm font-medium text-purple-300 mb-3 flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        Customer Details
                    </h4>
                    <div className="space-y-2">
                        <div>
                            <p className="text-sm font-medium text-white">{selectedTicket.customerName}</p>
                            <p className="text-sm text-purple-200 flex items-center">
                                <Phone className="h-3 w-3 mr-1" />
                                {selectedTicket.customerPhone}
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                                <p className="text-purple-300 mb-1">Ticket Status</p>
                                <Badge variant={selectedTicket.status === 'resolved' ? 'default' : 'secondary'} className="bg-cyan-500/20 text-cyan-200 border-cyan-500/30">
                                    {selectedTicket.status}
                                </Badge>
                            </div>
                            <div>
                                <p className="text-purple-300 mb-1">Priority</p>
                                <Badge variant={selectedTicket.priority === 'high' ? 'destructive' : 'outline'} className="bg-purple-500/20 text-purple-200 border-purple-500/30">
                                    {selectedTicket.priority}
                                </Badge>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h4 className="text-sm font-medium text-purple-300 mb-3 flex items-center">
                        <FileText className="h-4 w-4 mr-2" />
                        Loan Applications
                    </h4>
                    <div className="space-y-3">
                        {customerLoans.length === 0 ? (
                            <p className="text-sm text-purple-200/60 text-center py-4">
                                No loan applications found
                            </p>
                        ) : (
                            customerLoans.map((loan) => (
                                <div key={loan.id} className="border border-purple-500/20 bg-slate-700/50 rounded-lg p-3 backdrop-blur-sm">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-white capitalize">
                                            {loan.type} Loan
                                        </span>
                                        <div className="flex items-center space-x-2">
                                            {getStatusIcon(loan.status)}
                                            <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(loan.status)}`}>
                                                {loan.status}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-xs text-purple-200 space-y-1">
                                        <p>Amount: ₹{loan.amount.toLocaleString()}</p>
                                        <p className="flex items-center">
                                            <Calendar className="h-3 w-3 mr-1" />
                                            Applied: {formatDate(loan.appliedDate)}
                                        </p>
                                    </div>
                                    {loan.documents.length > 0 && (
                                        <div className="mt-2">
                                            <p className="text-xs text-purple-300 mb-1">Documents:</p>
                                            <div className="flex flex-wrap gap-1">
                                                {loan.documents.slice(0, 3).map((doc, index) => (
                                                    <span
                                                        key={index}
                                                        className="inline-block bg-purple-500/20 text-purple-200 text-xs px-2 py-1 rounded border border-purple-500/30"
                                                    >
                                                        {doc}
                                                    </span>
                                                ))}
                                                {loan.documents.length > 3 && (
                                                    <span className="inline-block bg-purple-500/20 text-purple-200 text-xs px-2 py-1 rounded border border-purple-500/30">
                                                        +{loan.documents.length - 3} more
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div>
                    <h4 className="text-sm font-medium text-purple-300 mb-3">Conversation Summary</h4>
                    <div className="text-xs text-purple-200 space-y-2">
                        <div className="flex justify-between">
                            <span>Messages exchanged:</span>
                            <span className="text-white font-medium">{selectedTicket.messages.length}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Customer messages:</span>
                            <span className="text-cyan-300 font-medium">{selectedTicket.messages.filter(m => m.sender === 'user').length}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Agent responses:</span>
                            <span className="text-purple-300 font-medium">{selectedTicket.messages.filter(m => m.sender === 'agent').length}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Bot responses:</span>
                            <span className="text-green-300 font-medium">{selectedTicket.messages.filter(m => m.sender === 'bot').length}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Ticket created:</span>
                            <span className="text-white font-medium">{formatDate(selectedTicket.createdAt)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Last activity:</span>
                            <span className="text-white font-medium">{formatDate(selectedTicket.updatedAt)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}