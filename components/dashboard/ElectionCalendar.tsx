"use client"

import React, { useState } from 'react';
import { getColor } from '@/lib/_colors';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { Election } from '@/app/dashboard/page';

interface ElectionCalendarProps {
    isDarkMode: boolean;
    elections: Election[];
}

export const ElectionCalendar: React.FC<ElectionCalendarProps> = ({ isDarkMode, elections }) => {
    const colors = getColor(isDarkMode);
    const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 29)); // January 29, 2026

    const getDaysInMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const hasElectionOnDate = (day: number) => {
        const checkDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        return elections.some(election => {
            const startDate = new Date(election.startDate);
            const endDate = new Date(election.endDate);
            return checkDate >= startDate && checkDate <= endDate;
        });
    };

    const previousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const today = new Date();
    const isCurrentMonth = today.getMonth() === currentDate.getMonth() && today.getFullYear() === currentDate.getFullYear();

    return (
        <div
            className="p-4 rounded-2xl border backdrop-blur-sm"
            style={{
                backgroundColor: colors.bg.card,
                borderColor: colors.border.subtle
            }}
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${colors.accent.primary}20` }}
                    >
                        <CalendarIcon className="w-4 h-4" style={{ color: colors.accent.primary }} />
                    </div>
                    <h3
                        className="text-sm font-bold"
                        style={{ color: colors.text.primary, fontFamily: "'Sora', sans-serif" }}
                    >
                        Elections
                    </h3>
                </div>
            </div>

            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-3">
                <button
                    onClick={previousMonth}
                    className="p-1 rounded-lg transition-all hover:scale-110"
                    style={{ backgroundColor: `${colors.bg.elevated}` }}
                >
                    <ChevronLeft className="w-4 h-4" style={{ color: colors.text.secondary }} />
                </button>
                <span className="text-sm font-semibold" style={{ color: colors.text.primary }}>
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </span>
                <button
                    onClick={nextMonth}
                    className="p-1 rounded-lg transition-all hover:scale-110"
                    style={{ backgroundColor: `${colors.bg.elevated}` }}
                >
                    <ChevronRight className="w-4 h-4" style={{ color: colors.text.secondary }} />
                </button>
            </div>

            {/* Day Names */}
            <div className="grid grid-cols-7 gap-1 mb-2">
                {dayNames.map((day) => (
                    <div
                        key={day}
                        className="text-center text-xs font-medium py-1"
                        style={{ color: colors.text.muted }}
                    >
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1">
                {/* Empty cells for days before month starts */}
                {Array.from({ length: firstDay }).map((_, index) => (
                    <div key={`empty-${index}`} />
                ))}

                {/* Actual days */}
                {Array.from({ length: daysInMonth }).map((_, index) => {
                    const day = index + 1;
                    const isToday = isCurrentMonth && day === today.getDate();
                    const hasElection = hasElectionOnDate(day);

                    return (
                        <div
                            key={day}
                            className="relative flex items-center justify-center text-xs py-1.5 rounded-lg transition-all cursor-pointer hover:scale-105"
                            style={{
                                backgroundColor: isToday 
                                    ? colors.accent.primary 
                                    : hasElection 
                                        ? `${colors.accent.primary}20` 
                                        : 'transparent',
                                color: isToday 
                                    ? '#ffffff' 
                                    : hasElection 
                                        ? colors.accent.primary 
                                        : colors.text.primary,
                                fontWeight: isToday || hasElection ? 600 : 400
                            }}
                        >
                            {day}
                            {hasElection && !isToday && (
                                <div
                                    className="absolute bottom-0.5 w-1 h-1 rounded-full"
                                    style={{ backgroundColor: colors.accent.primary }}
                                />
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Legend */}
            <div className="mt-4 pt-3 border-t space-y-2" style={{ borderColor: colors.border.subtle }}>
                <div className="flex items-center gap-2">
                    <div
                        className="w-3 h-3 rounded"
                        style={{ backgroundColor: colors.accent.primary }}
                    />
                    <span className="text-xs" style={{ color: colors.text.muted }}>Today</span>
                </div>
                <div className="flex items-center gap-2">
                    <div
                        className="w-3 h-3 rounded"
                        style={{ backgroundColor: `${colors.accent.primary}20` }}
                    />
                    <span className="text-xs" style={{ color: colors.text.muted }}>Election Date</span>
                </div>
            </div>
        </div>
    );
};
