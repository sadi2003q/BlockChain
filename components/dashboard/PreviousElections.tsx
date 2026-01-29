"use client"

import React, { useState } from 'react';
import { getColor } from '@/lib/_colors';
import { History, CheckCircle2, Users, Trophy, ChevronDown, ChevronUp, BarChart3, Award } from 'lucide-react';
import { Election } from '@/app/dashboard/page';

interface PreviousElectionsProps {
    isDarkMode: boolean;
    elections: Election[];
}

// Mock winners data
const electionResults: { [key: number]: { winner: string; votes: number; percentage: number } } = {
    5: { winner: "Michael Chen", votes: 687, percentage: 41.5 },
    6: { winner: "Emily Rodriguez", votes: 412, percentage: 41.7 }
};

export const PreviousElections: React.FC<PreviousElectionsProps> = ({ isDarkMode, elections }) => {
    const colors = getColor(isDarkMode);
    const [expandedElection, setExpandedElection] = useState<number | null>(null);
    const [isCollapsed, setIsCollapsed] = useState(true);

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
                <p style={{ color: colors.text.muted }}>No previous elections found</p>
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
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="w-full flex items-center justify-between mb-5 cursor-pointer group"
            >
                <h3
                    className="text-lg sm:text-xl font-bold flex items-center gap-2"
                    style={{ color: colors.text.primary, fontFamily: "'Sora', sans-serif" }}
                >
                    <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"
                        style={{ backgroundColor: '#22c55e20' }}
                    >
                        <History className="w-4 h-4" style={{ color: '#22c55e' }} />
                    </div>
                    Previous Elections
                </h3>
                <div className="flex items-center gap-2">
                    <span
                        className="px-3 py-1 rounded-full text-sm font-medium"
                        style={{ backgroundColor: '#22c55e20', color: '#22c55e' }}
                    >
                        {elections.length} Completed
                    </span>
                    <div
                        className="p-1.5 rounded-lg transition-all"
                        style={{ backgroundColor: `${colors.bg.elevated}` }}
                    >
                        {isCollapsed ? (
                            <ChevronDown className="w-4 h-4" style={{ color: colors.text.secondary }} />
                        ) : (
                            <ChevronUp className="w-4 h-4" style={{ color: colors.text.secondary }} />
                        )}
                    </div>
                </div>
            </button>

            {/* Elections List */}
            <div 
                className={`space-y-3 transition-all duration-500 overflow-hidden ${
                    isCollapsed ? 'max-h-0 opacity-0' : 'max-h-[2000px] opacity-100'
                }`}
            >
                {elections.map((election) => {
                    const result = electionResults[election.id];
                    const isExpanded = expandedElection === election.id;
                    const participationPercent = getParticipationPercent(election);

                    return (
                        <div
                            key={election.id}
                            className="rounded-xl border overflow-hidden transition-all duration-300"
                            style={{
                                backgroundColor: `${colors.bg.secondary}60`,
                                borderColor: colors.border.subtle
                            }}
                        >
                            {/* Main Row */}
                            <button
                                onClick={() => setExpandedElection(isExpanded ? null : election.id)}
                                className="w-full p-4 flex items-center justify-between text-left transition-all duration-300 hover:bg-opacity-80"
                            >
                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                                        style={{ backgroundColor: '#22c55e20' }}
                                    >
                                        <CheckCircle2 className="w-5 h-5" style={{ color: '#22c55e' }} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4
                                            className="text-sm sm:text-base font-bold truncate"
                                            style={{ color: colors.text.primary }}
                                        >
                                            {election.title}
                                        </h4>
                                        <p className="text-xs" style={{ color: colors.text.muted }}>
                                            {election.startDate} - {election.endDate}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="hidden sm:block text-right">
                                        <p className="text-xs" style={{ color: colors.text.muted }}>Winner</p>
                                        <p className="text-sm font-semibold" style={{ color: '#22c55e' }}>
                                            {result?.winner || 'N/A'}
                                        </p>
                                    </div>
                                    <div
                                        className="p-2 rounded-lg transition-all duration-300"
                                        style={{ backgroundColor: colors.bg.elevated }}
                                    >
                                        {isExpanded ? (
                                            <ChevronUp className="w-4 h-4" style={{ color: colors.text.secondary }} />
                                        ) : (
                                            <ChevronDown className="w-4 h-4" style={{ color: colors.text.secondary }} />
                                        )}
                                    </div>
                                </div>
                            </button>

                            {/* Expanded Details */}
                            {isExpanded && (
                                <div
                                    className="px-4 pb-4 pt-2 border-t animate-fadeIn"
                                    style={{ borderColor: colors.border.subtle }}
                                >
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {/* Winner Card */}
                                        <div
                                            className="p-4 rounded-xl"
                                            style={{ backgroundColor: `${colors.bg.tertiary || colors.bg.primary}50` }}
                                        >
                                            <div className="flex items-center gap-2 mb-3">
                                                <Trophy className="w-4 h-4" style={{ color: '#fbbf24' }} />
                                                <span className="text-sm font-semibold" style={{ color: colors.text.primary }}>
                                                    Election Winner
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold text-white"
                                                    style={{ backgroundColor: colors.accent.primary }}
                                                >
                                                    {result?.winner?.charAt(0) || 'N'}
                                                </div>
                                                <div>
                                                    <p className="font-bold" style={{ color: colors.text.primary }}>
                                                        {result?.winner || 'Not Available'}
                                                    </p>
                                                    <p className="text-sm" style={{ color: '#22c55e' }}>
                                                        {result?.votes?.toLocaleString()} votes ({result?.percentage}%)
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Stats Card */}
                                        <div
                                            className="p-4 rounded-xl"
                                            style={{ backgroundColor: `${colors.bg.tertiary || colors.bg.primary}50` }}
                                        >
                                            <div className="flex items-center gap-2 mb-3">
                                                <BarChart3 className="w-4 h-4" style={{ color: colors.accent.primary }} />
                                                <span className="text-sm font-semibold" style={{ color: colors.text.primary }}>
                                                    Election Statistics
                                                </span>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span style={{ color: colors.text.muted }}>Total Votes</span>
                                                    <span style={{ color: colors.text.primary }}>{election.votedCount.toLocaleString()}</span>
                                                </div>
                                                <div className="flex items-center justify-between text-sm">
                                                    <span style={{ color: colors.text.muted }}>Eligible Voters</span>
                                                    <span style={{ color: colors.text.primary }}>{election.totalVoters.toLocaleString()}</span>
                                                </div>
                                                <div className="flex items-center justify-between text-sm">
                                                    <span style={{ color: colors.text.muted }}>Participation</span>
                                                    <span style={{ color: colors.accent.primary }}>{participationPercent}%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Your Participation */}
                                    <div
                                        className="mt-4 p-3 rounded-xl flex items-center gap-3"
                                        style={{ backgroundColor: `${colors.accent.primary}10` }}
                                    >
                                        <div
                                            className="w-8 h-8 rounded-lg flex items-center justify-center"
                                            style={{ backgroundColor: `${colors.accent.primary}20` }}
                                        >
                                            <Award className="w-4 h-4" style={{ color: colors.accent.primary }} />
                                        </div>
                                        <p className="text-sm" style={{ color: colors.text.secondary }}>
                                            <span className="font-semibold" style={{ color: colors.accent.primary }}>You participated</span> in this election
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
