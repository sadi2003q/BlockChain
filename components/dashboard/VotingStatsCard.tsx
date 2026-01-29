"use client"

import React from 'react';
import { getColor } from '@/lib/_colors';
import { Vote, CheckCircle2, Clock, Calendar, TrendingUp } from 'lucide-react';

interface VotingStats {
    totalVotesCast: number;
    electionsParticipated: number;
    upcomingElections: number;
    activeElections: number;
}

interface VotingStatsCardProps {
    isDarkMode: boolean;
    stats: VotingStats;
}

export const VotingStatsCard: React.FC<VotingStatsCardProps> = ({ isDarkMode, stats }) => {
    const colors = getColor(isDarkMode);

    const statItems = [
        {
            label: 'Votes Cast',
            value: stats.totalVotesCast,
            icon: CheckCircle2,
            color: '#22c55e',
            bgColor: '#22c55e20'
        },
        {
            label: 'Participated',
            value: stats.electionsParticipated,
            icon: Vote,
            color: colors.accent.primary,
            bgColor: `${colors.accent.primary}20`
        },
        {
            label: 'Active Now',
            value: stats.activeElections,
            icon: Clock,
            color: '#f59e0b',
            bgColor: '#f59e0b20'
        },
        {
            label: 'Upcoming',
            value: stats.upcomingElections,
            icon: Calendar,
            color: '#8b5cf6',
            bgColor: '#8b5cf620'
        }
    ];

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
                    className="text-lg font-bold flex items-center gap-2"
                    style={{ color: colors.text.primary, fontFamily: "'Sora', sans-serif" }}
                >
                    <TrendingUp className="w-5 h-5" style={{ color: colors.accent.primary }} />
                    Voting Activity
                </h3>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
                {statItems.map((item, index) => (
                    <div
                        key={index}
                        className="p-4 rounded-xl text-center transition-all duration-300 hover:scale-105"
                        style={{ backgroundColor: item.bgColor }}
                    >
                        <div
                            className="w-10 h-10 mx-auto rounded-lg flex items-center justify-center mb-2"
                            style={{ backgroundColor: `${item.color}30` }}
                        >
                            <item.icon className="w-5 h-5" style={{ color: item.color }} />
                        </div>
                        <p
                            className="text-2xl font-bold"
                            style={{ color: colors.text.primary }}
                        >
                            {item.value}
                        </p>
                        <p
                            className="text-xs font-medium"
                            style={{ color: colors.text.muted }}
                        >
                            {item.label}
                        </p>
                    </div>
                ))}
            </div>

            {/* Participation Rate */}
            <div
                className="mt-5 p-4 rounded-xl"
                style={{ backgroundColor: `${colors.accent.primary}10` }}
            >
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium" style={{ color: colors.text.secondary }}>
                        Participation Rate
                    </span>
                    <span className="text-sm font-bold" style={{ color: colors.accent.primary }}>
                        100%
                    </span>
                </div>
                <div
                    className="h-2 rounded-full overflow-hidden"
                    style={{ backgroundColor: `${colors.accent.primary}20` }}
                >
                    <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{
                            width: '100%',
                            backgroundColor: colors.accent.primary,
                            animation: 'progressFill 1.5s ease-out'
                        }}
                    />
                </div>
                <p className="text-xs mt-2" style={{ color: colors.text.muted }}>
                    You've voted in all eligible elections!
                </p>
            </div>

            <style>{`
                @keyframes progressFill {
                    from {
                        width: 0%;
                    }
                }
            `}</style>
        </div>
    );
};
