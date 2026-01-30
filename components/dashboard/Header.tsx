"use client"

import React from 'react';
import { getColor } from '@/lib/_colors';
import { Bell, Menu, Vote, LayoutDashboard, History, LogOut, Home } from 'lucide-react';
import { UserProfile } from '@/app/dashboard/page';

interface DashboardHeaderProps {
    isDarkMode: boolean;
    userProfile: UserProfile;
    unreadCount: number;
    activeTab: 'overview' | 'elections' | 'history' | 'notifications';
    setActiveTab: (tab: 'overview' | 'elections' | 'history' | 'notifications') => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
    isDarkMode,
    userProfile,
    unreadCount,
    activeTab,
    setActiveTab
}) => {
    const colors = getColor(isDarkMode);

    return (
        <header
            className="sticky top-0 z-50 backdrop-blur-xl border-b"
            style={{
                backgroundColor: `${colors.bg.secondary}e6`,
                borderColor: colors.border.subtle
            }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 sm:h-20">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center"
                            style={{ backgroundColor: colors.accent.primary }}
                        >
                            <Vote className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </div>
                        <div className="hidden sm:block">
                            <h1
                                className="text-lg sm:text-xl font-bold"
                                style={{
                                    fontFamily: "'Sora', sans-serif",
                                    color: colors.text.primary
                                }}
                            >
                                VoteSecure
                            </h1>
                            <p
                                className="text-xs"
                                style={{ color: colors.text.muted }}
                            >
                                Dashboard
                            </p>
                        </div>
                    </div>

                    {/* Navigation - Desktop */}
                    <nav className="hidden md:flex items-center gap-1">
                        {[
                            { id: 'overview', label: 'Overview', icon: LayoutDashboard },
                            { id: 'elections', label: 'Elections', icon: Vote },
                            { id: 'history', label: 'History', icon: History },
                            { id: 'notifications', label: 'Alerts', icon: Bell },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300"
                                style={{
                                    backgroundColor: activeTab === tab.id ? `${colors.accent.primary}20` : 'transparent',
                                    color: activeTab === tab.id ? colors.accent.primary : colors.text.secondary,
                                    fontFamily: "'Inter', sans-serif"
                                }}
                            >
                                <tab.icon className="w-4 h-4" />
                                <span className="text-sm font-medium">{tab.label}</span>
                                {tab.id === 'notifications' && unreadCount > 0 && (
                                    <span
                                        className="ml-1 px-1.5 py-0.5 text-xs font-bold rounded-full text-white"
                                        style={{ backgroundColor: '#ef4444' }}
                                    >
                                        {unreadCount}
                                    </span>
                                )}
                            </button>
                        ))}
                    </nav>

                    {/* Right Section */}
                    <div className="flex items-center gap-2 sm:gap-4">
                        {/* Home Link */}
                        <button
                            className="p-2 sm:p-2.5 rounded-xl transition-all duration-300 hover:scale-105"
                            style={{
                                backgroundColor: colors.bg.card,
                                color: colors.text.secondary
                            }}
                            onClick={() => window.location.href = '/'}
                        >
                            <Home className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>

                        {/* Notifications Bell */}
                        <button
                            className="relative p-2 sm:p-2.5 rounded-xl transition-all duration-300 hover:scale-105"
                            style={{
                                backgroundColor: colors.bg.card,
                                color: colors.text.secondary
                            }}
                        >
                            <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                            {unreadCount > 0 && (
                                <span
                                    className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-xs font-bold rounded-full text-white"
                                    style={{ backgroundColor: '#ef4444' }}
                                >
                                    {unreadCount}
                                </span>
                            )}
                        </button>

                        {/* User Profile */}
                        <div
                            className="flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 pl-2 sm:pl-3 rounded-xl"
                            style={{ backgroundColor: colors.bg.card }}
                        >
                            <div className="hidden sm:block text-right">
                                <p
                                    className="text-sm font-semibold"
                                    style={{ color: colors.text.primary }}
                                >
                                    {userProfile.name}
                                </p>
                                <p
                                    className="text-xs"
                                    style={{ color: colors.text.muted }}
                                >
                                    {userProfile.voterId}
                                </p>
                            </div>
                            <div
                                className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm"
                                style={{ backgroundColor: colors.accent.primary }}
                            >
                                {userProfile.profileImage}
                            </div>
                        </div>

                        {/* Logout */}
                        <button
                            className="hidden sm:flex p-2.5 rounded-xl transition-all duration-300 hover:scale-105"
                            style={{
                                backgroundColor: '#ef444420',
                                color: '#ef4444'
                            }}
                        >
                            <LogOut className="w-5 h-5" />
                        </button>

                        {/* Mobile Menu */}
                        <button
                            className="md:hidden p-2 rounded-xl"
                            style={{
                                backgroundColor: colors.bg.card,
                                color: colors.text.secondary
                            }}
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};
