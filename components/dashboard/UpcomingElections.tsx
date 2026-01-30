"use client"

import React, { useState } from 'react';
import { getColor } from '@/lib/_colors';
import { Calendar, Users, Bell, CalendarCheck, ArrowRight, Timer, ChevronDown, ChevronUp } from 'lucide-react';
import { Election } from '@/app/dashboard/page';

interface UpcomingElectionsProps {
    isDarkMode: boolean;
    elections: Election[];
}

export const UpcomingElections: React.FC<UpcomingElectionsProps> = ({ isDarkMode, elections }) => {
    const colors = getColor(isDarkMode);
    const [isExpanded, setIsExpanded] = useState(false);

    const getDaysUntil = (dateString: string) => {
        const now = new Date();
        const electionDate = new Date(dateString);
        const diffTime = electionDate.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
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
                <p style={{ color: colors.text.muted }}>No upcoming elections scheduled</p>
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
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center justify-between mb-5 cursor-pointer group"
            >
                <h3
                    className="text-lg sm:text-xl font-bold flex items-center gap-2"
                    style={{ color: colors.text.primary, fontFamily: "'Sora', sans-serif" }}
                >
                    <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"
                        style={{ backgroundColor: '#8b5cf620' }}
                    >
                        <Calendar className="w-4 h-4" style={{ color: '#8b5cf6' }} />
                    </div>
                    Upcoming Elections
                </h3>
                <div className="flex items-center gap-2">
                    <span
                        className="px-3 py-1 rounded-full text-sm font-medium"
                        style={{ backgroundColor: '#8b5cf620', color: '#8b5cf6' }}
                    >
                        {elections.length} Scheduled
                    </span>
                    <div
                        className="p-1.5 rounded-lg transition-all"
                        style={{ backgroundColor: `${colors.bg.elevated}` }}
                    >
                        {isExpanded ? (
                            <ChevronUp className="w-4 h-4" style={{ color: colors.text.secondary }} />
                        ) : (
                            <ChevronDown className="w-4 h-4" style={{ color: colors.text.secondary }} />
                        )}
                    </div>
                </div>
            </button>

            {/* Elections Grid */}
            <div 
                className={`grid sm:grid-cols-2 gap-4 transition-all duration-500 overflow-hidden ${
                    isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                {elections.map((election) => {
                    const daysUntil = getDaysUntil(election.startDate);
                    
                    return (
                        <div
                            key={election.id}
                            className="p-4 rounded-xl border transition-all duration-300 hover:shadow-md hover:scale-[1.01]"
                            style={{
                                backgroundColor: `${colors.bg.secondary}60`,
                                borderColor: colors.border.subtle
                            }}
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div
                                    className="px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1"
                                    style={{ backgroundColor: '#8b5cf620', color: '#8b5cf6' }}
                                >
                                    <Timer className="w-3 h-3" />
                                    {daysUntil > 0 ? `${daysUntil} days` : 'Starting soon'}
                                </div>
                                <button
                                    className="p-2 rounded-lg transition-all duration-300 hover:scale-110"
                                    style={{ backgroundColor: `${colors.accent.primary}15` }}
                                    title="Set Reminder"
                                >
                                    <Bell className="w-4 h-4" style={{ color: colors.accent.primary }} />
                                </button>
                            </div>

                            <h4
                                className="text-base font-bold mb-1 line-clamp-1"
                                style={{ color: colors.text.primary }}
                            >
                                {election.title}
                            </h4>
                            <p
                                className="text-sm mb-3 line-clamp-2"
                                style={{ color: colors.text.secondary }}
                            >
                                {election.description}
                            </p>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-xs" style={{ color: colors.text.muted }}>
                                    <CalendarCheck className="w-3.5 h-3.5" />
                                    <span>{election.startDate} - {election.endDate}</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs" style={{ color: colors.text.muted }}>
                                    <Users className="w-3.5 h-3.5" />
                                    <span>{election.totalCandidates} Candidates • {election.totalVoters.toLocaleString()} Eligible Voters</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-4 pt-3 border-t" style={{ borderColor: colors.border.subtle }}>
                                <span
                                    className="px-2 py-0.5 rounded text-xs font-medium"
                                    style={{ backgroundColor: `${colors.bg.tertiary || colors.bg.secondary}`, color: colors.text.secondary }}
                                >
                                    {election.category}
                                </span>
                                <button
                                    className="text-xs font-medium flex items-center gap-1 transition-all hover:gap-2"
                                    style={{ color: colors.accent.primary }}
                                >
                                    <span>View Details</span>
                                    <ArrowRight className="w-3 h-3" />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
