"use client"

import React from 'react';
import { getColor } from '@/lib/_colors';
import { Clock, Users, Vote, ArrowRight, Zap, TrendingUp } from 'lucide-react';
import { Election } from '@/app/dashboard/page';

interface RunningElectionsProps {
    isDarkMode: boolean;
    elections: Election[];
}

export const RunningElections: React.FC<RunningElectionsProps> = ({ isDarkMode, elections }) => {
    const colors = getColor(isDarkMode);

    const getParticipationPercent = (election: Election) => {
        return Math.round((election.votedCount / election.totalVoters) * 100);
    };

    if (elections.length === 0) {
        return (
            <div
                className="p-6 rounded-2xl border text-center"
                style={{
                    backgroundColor: colors.bg.card,
                    borderColor: colors.border.subtle
                }}
            >
                <p style={{ color: colors.text.muted }}>No running elections at the moment</p>
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
                        style={{ backgroundColor: '#f59e0b20' }}
                    >
                        <Zap className="w-4 h-4" style={{ color: '#f59e0b' }} />
                    </div>
                    Running Elections
                </h3>
                <span
                    className="px-3 py-1 rounded-full text-sm font-medium animate-pulse"
                    style={{ backgroundColor: '#f59e0b20', color: '#f59e0b' }}
                >
                    {elections.length} Active
                </span>
            </div>

            {/* Elections List */}
            <div className="space-y-4">
                {elections.map((election) => (
                    <div
                        key={election.id}
                        className="p-4 sm:p-5 rounded-xl border transition-all duration-300 hover:shadow-lg hover:scale-[1.01]"
                        style={{
                            backgroundColor: `${colors.bg.secondary}80`,
                            borderColor: `${colors.accent.primary}30`
                        }}
                    >
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-start gap-3">
                                    <div
                                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0"
                                        style={{ backgroundColor: `${colors.accent.primary}20` }}
                                    >
                                        <Vote className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: colors.accent.primary }} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4
                                            className="text-base sm:text-lg font-bold truncate"
                                            style={{ color: colors.text.primary }}
                                        >
                                            {election.title}
                                        </h4>
                                        <p
                                            className="text-sm mt-0.5 line-clamp-1"
                                            style={{ color: colors.text.secondary }}
                                        >
                                            {election.description}
                                        </p>
                                        <div className="flex flex-wrap items-center gap-3 mt-2">
                                            <span
                                                className="px-2 py-0.5 rounded-full text-xs font-medium"
                                                style={{ backgroundColor: `${colors.accent.primary}15`, color: colors.accent.primary }}
                                            >
                                                {election.category}
                                            </span>
                                            <div className="flex items-center gap-1 text-xs" style={{ color: colors.text.muted }}>
                                                <Clock className="w-3 h-3" />
                                                <span>Ends: {election.endDate}</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-xs" style={{ color: colors.text.muted }}>
                                                <Users className="w-3 h-3" />
                                                <span>{election.totalCandidates} Candidates</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Participation Bar */}
                                <div className="mt-4 lg:mt-3">
                                    <div className="flex items-center justify-between text-xs mb-1.5">
                                        <span className="flex items-center gap-1" style={{ color: colors.text.muted }}>
                                            <TrendingUp className="w-3 h-3" />
                                            Participation
                                        </span>
                                        <span style={{ color: colors.accent.primary }}>
                                            {election.votedCount.toLocaleString()} / {election.totalVoters.toLocaleString()} voted
                                        </span>
                                    </div>
                                    <div
                                        className="h-2 rounded-full overflow-hidden"
                                        style={{ backgroundColor: `${colors.accent.primary}15` }}
                                    >
                                        <div
                                            className="h-full rounded-full transition-all duration-500"
                                            style={{
                                                width: `${getParticipationPercent(election)}%`,
                                                backgroundColor: colors.accent.primary
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Vote Button */}
                            <button
                                className="w-full lg:w-auto px-5 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 text-white shrink-0"
                                style={{ backgroundColor: colors.accent.primary }}
                                onClick={() => window.location.href = '/VotingPortal'}
                            >
                                <Vote className="w-4 h-4" />
                                <span>Cast Vote</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
