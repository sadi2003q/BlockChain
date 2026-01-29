"use client"

import React from 'react';
import { getColor } from '@/lib/_colors';
import { Vote, Clock, CheckCircle, Users, ArrowRight, Zap } from 'lucide-react';
import { Election } from '@/app/dashboard/page';

interface VotingStats {
    totalVotesCast: number;
    electionsParticipated: number;
    upcomingElections: number;
    activeElections: number;
}

interface QuickActionsProps {
    isDarkMode: boolean;
    stats: VotingStats;
    runningElections: Election[];
}

export const QuickActions: React.FC<QuickActionsProps> = ({ isDarkMode, stats, runningElections }) => {
    const colors = getColor(isDarkMode);

    return (
        <div className="space-y-4">
            {/* Stats Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div
                    className="p-4 sm:p-5 rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:scale-[1.02]"
                    style={{
                        backgroundColor: colors.bg.card,
                        borderColor: colors.border.subtle
                    }}
                >
                    <div className="flex items-center gap-3">
                        <div
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center"
                            style={{ backgroundColor: '#22c55e20' }}
                        >
                            <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: '#22c55e' }} />
                        </div>
                        <div>
                            <p className="text-2xl sm:text-3xl font-bold" style={{ color: colors.text.primary }}>
                                {stats.totalVotesCast}
                            </p>
                            <p className="text-xs sm:text-sm" style={{ color: colors.text.muted }}>
                                Votes Cast
                            </p>
                        </div>
                    </div>
                </div>

                <div
                    className="p-4 sm:p-5 rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:scale-[1.02]"
                    style={{
                        backgroundColor: colors.bg.card,
                        borderColor: colors.border.subtle
                    }}
                >
                    <div className="flex items-center gap-3">
                        <div
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center"
                            style={{ backgroundColor: '#f59e0b20' }}
                        >
                            <Clock className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: '#f59e0b' }} />
                        </div>
                        <div>
                            <p className="text-2xl sm:text-3xl font-bold" style={{ color: colors.text.primary }}>
                                {stats.activeElections}
                            </p>
                            <p className="text-xs sm:text-sm" style={{ color: colors.text.muted }}>
                                Active Elections
                            </p>
                        </div>
                    </div>
                </div>

                <div
                    className="p-4 sm:p-5 rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:scale-[1.02]"
                    style={{
                        backgroundColor: colors.bg.card,
                        borderColor: colors.border.subtle
                    }}
                >
                    <div className="flex items-center gap-3">
                        <div
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center"
                            style={{ backgroundColor: '#8b5cf620' }}
                        >
                            <Vote className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: '#8b5cf6' }} />
                        </div>
                        <div>
                            <p className="text-2xl sm:text-3xl font-bold" style={{ color: colors.text.primary }}>
                                {stats.upcomingElections}
                            </p>
                            <p className="text-xs sm:text-sm" style={{ color: colors.text.muted }}>
                                Upcoming
                            </p>
                        </div>
                    </div>
                </div>

                <div
                    className="p-4 sm:p-5 rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:scale-[1.02]"
                    style={{
                        backgroundColor: colors.bg.card,
                        borderColor: colors.border.subtle
                    }}
                >
                    <div className="flex items-center gap-3">
                        <div
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center"
                            style={{ backgroundColor: `${colors.accent.primary}20` }}
                        >
                            <Users className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: colors.accent.primary }} />
                        </div>
                        <div>
                            <p className="text-2xl sm:text-3xl font-bold" style={{ color: colors.text.primary }}>
                                {stats.electionsParticipated}
                            </p>
                            <p className="text-xs sm:text-sm" style={{ color: colors.text.muted }}>
                                Participated
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Action Banner */}
            {runningElections.length > 0 && (
                <div
                    className="p-4 sm:p-5 rounded-2xl border relative overflow-hidden"
                    style={{
                        background: `linear-gradient(135deg, ${colors.accent.primary}20, ${colors.accent.primary}05)`,
                        borderColor: colors.accent.primary
                    }}
                >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div
                                className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center animate-pulse"
                                style={{ backgroundColor: `${colors.accent.primary}30` }}
                            >
                                <Zap className="w-6 h-6 sm:w-7 sm:h-7" style={{ color: colors.accent.primary }} />
                            </div>
                            <div>
                                <h3
                                    className="text-lg sm:text-xl font-bold"
                                    style={{ color: colors.text.primary, fontFamily: "'Sora', sans-serif" }}
                                >
                                    Active Elections Available
                                </h3>
                                <p className="text-sm" style={{ color: colors.text.secondary }}>
                                    {runningElections.length} election{runningElections.length > 1 ? 's' : ''} currently accepting votes
                                </p>
                            </div>
                        </div>
                        <button
                            className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-lg text-white"
                            style={{ backgroundColor: colors.accent.primary }}
                            onClick={() => window.location.href = '/VotingPortal'}
                        >
                            <span>Vote Now</span>
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Decorative Element */}
                    <div
                        className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-10"
                        style={{ backgroundColor: colors.accent.primary }}
                    />
                </div>
            )}
        </div>
    );
};
