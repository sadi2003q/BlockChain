"use client"

import React from 'react';
import { getColor } from '@/lib/_colors';
import { FileText, CheckCircle2, Clock, ExternalLink, Copy, Shield } from 'lucide-react';
import { VoteCast } from '@/app/dashboard/page';

interface VoteCastHistoryProps {
    isDarkMode: boolean;
    history: VoteCast[];
}

export const VoteCastHistory: React.FC<VoteCastHistoryProps> = ({ isDarkMode, history }) => {
    const colors = getColor(isDarkMode);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    if (history.length === 0) {
        return (
            <div
                className="p-6 rounded-2xl border text-center"
                style={{
                    backgroundColor: colors.bg.card,
                    borderColor: colors.border.subtle
                }}
            >
                <p style={{ color: colors.text.muted }}>No voting history yet</p>
            </div>
        );
    }

    return (
        <div
            className="p-5 sm:p-6 rounded-2xl border backdrop-blur-sm"
            style={{
                backgroundColor: colors.bg.card,
                borderColor: colors.border.subtle
            }}
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
                <h3
                    className="text-lg sm:text-xl font-bold flex items-center gap-2"
                    style={{ color: colors.text.primary, fontFamily: "'Sora', sans-serif" }}
                >
                    <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${colors.accent.primary}20` }}
                    >
                        <FileText className="w-4 h-4" style={{ color: colors.accent.primary }} />
                    </div>
                    Vote Cast History
                </h3>
                <button
                    className="text-sm font-medium flex items-center gap-1"
                    style={{ color: colors.accent.primary }}
                >
                    <span>View All</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                </button>
            </div>

            {/* Blockchain Security Notice */}
            <div
                className="flex items-center gap-3 p-3 rounded-xl mb-4"
                style={{ backgroundColor: `${colors.accent.primary}10` }}
            >
                <Shield className="w-5 h-5 shrink-0" style={{ color: colors.accent.primary }} />
                <p className="text-xs sm:text-sm" style={{ color: colors.text.secondary }}>
                    All votes are permanently recorded on the blockchain for complete transparency and immutability.
                </p>
            </div>

            {/* History List */}
            <div className="space-y-3">
                {history.map((vote) => (
                    <div
                        key={vote.id}
                        className="p-4 rounded-xl border transition-all duration-300 hover:shadow-md"
                        style={{
                            backgroundColor: `${colors.bg.secondary}60`,
                            borderColor: colors.border.subtle
                        }}
                    >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    {vote.status === 'confirmed' ? (
                                        <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: '#22c55e' }} />
                                    ) : (
                                        <Clock className="w-4 h-4 shrink-0 animate-pulse" style={{ color: '#f59e0b' }} />
                                    )}
                                    <h4
                                        className="text-sm sm:text-base font-bold truncate"
                                        style={{ color: colors.text.primary }}
                                    >
                                        {vote.electionTitle}
                                    </h4>
                                </div>
                                
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm">
                                    <span style={{ color: colors.text.secondary }}>
                                        Voted for: <span className="font-semibold" style={{ color: colors.accent.primary }}>{vote.candidateName}</span>
                                    </span>
                                    <span style={{ color: colors.text.muted }}>
                                        {vote.votedAt}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <div
                                    className="px-2 py-1 rounded text-xs font-medium"
                                    style={{
                                        backgroundColor: vote.status === 'confirmed' ? '#22c55e15' : '#f59e0b15',
                                        color: vote.status === 'confirmed' ? '#22c55e' : '#f59e0b'
                                    }}
                                >
                                    {vote.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                                </div>
                            </div>
                        </div>

                        {/* Transaction Hash */}
                        <div
                            className="mt-3 pt-3 flex flex-wrap items-center justify-between gap-2 border-t"
                            style={{ borderColor: colors.border.subtle }}
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-xs" style={{ color: colors.text.muted }}>Tx Hash:</span>
                                <code
                                    className="text-xs font-mono px-2 py-1 rounded"
                                    style={{ backgroundColor: `${colors.bg.tertiary || colors.bg.secondary}`, color: colors.text.secondary }}
                                >
                                    {vote.txHash}
                                </code>
                            </div>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => copyToClipboard(vote.txHash)}
                                    className="p-1.5 rounded-lg transition-all hover:scale-110"
                                    style={{ backgroundColor: colors.bg.elevated }}
                                    title="Copy Hash"
                                >
                                    <Copy className="w-3.5 h-3.5" style={{ color: colors.text.muted }} />
                                </button>
                                <button
                                    className="p-1.5 rounded-lg transition-all hover:scale-110"
                                    style={{ backgroundColor: colors.bg.elevated }}
                                    title="View on Explorer"
                                >
                                    <ExternalLink className="w-3.5 h-3.5" style={{ color: colors.text.muted }} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
