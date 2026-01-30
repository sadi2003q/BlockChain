"use client"

import React, { useState } from 'react';
import { getColor } from "@/lib/_colors";
import { ThemeToggleButton } from "@/components/signin/ThemeToggleButton";
import { DashboardHeader } from "@/components/dashboard/Header";
import { DashboardAnimation } from "@/components/dashboard/Animation";
import { ProfileCard } from "@/components/dashboard/ProfileCard";
import { VotingStatsCard } from "@/components/dashboard/VotingStatsCard";
import { RunningElections } from "@/components/dashboard/RunningElections";
import { UpcomingElections } from "@/components/dashboard/UpcomingElections";
import { PreviousElections } from "@/components/dashboard/PreviousElections";
import { NotificationsPanel } from "@/components/dashboard/NotificationsPanel";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { ElectionCalendar } from "@/components/dashboard/ElectionCalendar";
import {WelcomeMessage} from "@/components/dashboard/WelcomeMessage";
import {LogoutConfirmationModal} from "@/components/dashboard/signOutModel";

export interface UserProfile {
    name: string;
    email: string;
    voterId: string;
    district: string;
    registrationDate: string;
    walletAddress: string;
    profileImage: string;
    isVerified: boolean;
}

export interface Election {
    id: number;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    status: 'running' | 'upcoming' | 'completed';
    totalCandidates: number;
    totalVoters: number;
    votedCount: number;
    category: string;
}
export interface Notification {
    id: number;
    title: string;
    message: string;
    time: string;
    type: 'info' | 'success' | 'warning' | 'election';
    isRead: boolean;
}

export default function Dashboard() {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
    const [activeTab, setActiveTab] = useState<'overview' | 'elections' | 'history' | 'notifications'>('overview');
    const [showLogoutConfirm, setShowLogoutConfirm] = useState<boolean>(false);

    const colors = getColor(isDarkMode);

    // Mock User Profile Data
    const userProfile: UserProfile = {
        name: "John Doe",
        email: "john.doe@university.edu",
        voterId: "VS-2026-8472",
        district: "District 5",
        registrationDate: "Jan 15, 2026",
        walletAddress: "0x7a3f...2e9c",
        profileImage: "JD",
        isVerified: true
    };

    // Mock Running Elections
    const runningElections: Election[] = [
        {
            id: 1,
            title: "Student Council President 2026",
            description: "Annual election for Student Council President",
            startDate: "Jan 25, 2026",
            endDate: "Jan 30, 2026",
            status: 'running',
            totalCandidates: 3,
            totalVoters: 2847,
            votedCount: 1923,
            category: "Student Government"
        },
        {
            id: 2,
            title: "Department Representative",
            description: "Select your department representative",
            startDate: "Jan 26, 2026",
            endDate: "Feb 2, 2026",
            status: 'running',
            totalCandidates: 5,
            totalVoters: 450,
            votedCount: 234,
            category: "Department"
        }
    ];

    // Mock Upcoming Elections
    const upcomingElections: Election[] = [
        {
            id: 3,
            title: "Annual Budget Approval",
            description: "Vote on the proposed annual budget allocation",
            startDate: "Feb 10, 2026",
            endDate: "Feb 15, 2026",
            status: 'upcoming',
            totalCandidates: 2,
            totalVoters: 2847,
            votedCount: 0,
            category: "Finance"
        },
        {
            id: 4,
            title: "Campus Improvement Initiative",
            description: "Choose priority areas for campus improvements",
            startDate: "Feb 20, 2026",
            endDate: "Feb 25, 2026",
            status: 'upcoming',
            totalCandidates: 4,
            totalVoters: 2847,
            votedCount: 0,
            category: "Infrastructure"
        }
    ];

    // Mock Previous Elections
    const previousElections: Election[] = [
        {
            id: 5,
            title: "Club Federation Head 2025",
            description: "Election for Club Federation leadership",
            startDate: "Dec 1, 2025",
            endDate: "Dec 5, 2025",
            status: 'completed',
            totalCandidates: 4,
            totalVoters: 1850,
            votedCount: 1654,
            category: "Student Government"
        },
        {
            id: 6,
            title: "Sports Committee Election",
            description: "Annual sports committee member selection",
            startDate: "Nov 15, 2025",
            endDate: "Nov 20, 2025",
            status: 'completed',
            totalCandidates: 6,
            totalVoters: 1200,
            votedCount: 987,
            category: "Sports"
        }
    ];

    // Mock Notifications
    const [notifications, setNotifications] = useState<Notification[]>([
        {
            id: 1,
            title: "New Election Started",
            message: "Department Representative election is now open for voting",
            time: "2 hours ago",
            type: 'election',
            isRead: false
        },
        {
            id: 2,
            title: "Vote Confirmed",
            message: "Your vote for Student Council President has been recorded on blockchain",
            time: "1 day ago",
            type: 'success',
            isRead: false
        },
        {
            id: 3,
            title: "Upcoming Election",
            message: "Annual Budget Approval voting starts in 2 weeks",
            time: "3 days ago",
            type: 'info',
            isRead: true
        },
        {
            id: 4,
            title: "Election Ending Soon",
            message: "Student Council President election ends in 3 days",
            time: "5 days ago",
            type: 'warning',
            isRead: true
        }
    ]);

    // Voting Stats
    const votingStats = {
        totalVotesCast: 3,
        electionsParticipated: 3,
        upcomingElections: upcomingElections.length,
        activeElections: runningElections.length
    };

    const markNotificationAsRead = (id: number) => {
        setNotifications(prev => 
            prev.map(n => n.id === id ? { ...n, isRead: true } : n)
        );
    };

    const unreadCount = notifications.filter(n => !n.isRead).length;








    //============================ FUNCTIONS =========================
    const showLogoutConfirmation = () => setShowLogoutConfirm(true)

    return (
        <div
            className="min-h-screen transition-colors duration-500 relative overflow-hidden"
            style={{ backgroundColor: colors.bg.primary }}
        >
            {/* Dark Mode Toggle Button */}
            <ThemeToggleButton isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

            {/* Animated Background */}
            <DashboardAnimation isDarkMode={isDarkMode} />

            {/* Header */}
            <DashboardHeader 
                isDarkMode={isDarkMode} 
                userProfile={userProfile} 
                unreadCount={unreadCount}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                showLogoutConfirmation={showLogoutConfirmation}
            />

            {/* Main Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                {/* Welcome Message */}
                <WelcomeMessage isDarkMode={isDarkMode} name={userProfile.name}/>

                {/* Quick Stats Bar */}
                    <QuickActions
                        isDarkMode={isDarkMode} 
                        stats={votingStats}
                        runningElections={runningElections}
                    />

                {/* Main Dashboard Grid */}
                <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
                    {/* Left Column - Profile & Stats */}
                    <div className="lg:col-span-1 space-y-6">
                        <ProfileCard isDarkMode={isDarkMode} profile={userProfile} />

                        <VotingStatsCard isDarkMode={isDarkMode} stats={votingStats} />

                        <ElectionCalendar
                            isDarkMode={isDarkMode}
                            elections={[...runningElections, ...upcomingElections]}
                        />

                        <NotificationsPanel
                            isDarkMode={isDarkMode}
                            notifications={notifications}
                            onMarkAsRead={markNotificationAsRead}
                        />
                    </div>

                    {/* Right Column - Elections */}
                    <div className="lg:col-span-2 space-y-6 sm:space-y-8">
                        {/* Running Elections */}
                            <RunningElections isDarkMode={isDarkMode} elections={runningElections} />

                        {/* Upcoming Elections */}
                            <UpcomingElections isDarkMode={isDarkMode} elections={upcomingElections} />

                        {/* Previous Elections */}
                            <PreviousElections isDarkMode={isDarkMode} elections={previousElections} />
                    </div>
                </div>
            </div>



            {/* Delete Confirmation Modal */}
            {showLogoutConfirm && (
                <LogoutConfirmationModal
                    onCancel={() => setShowLogoutConfirm(false)}
                    onConfirm={() => setShowLogoutConfirm(false)}
                    isDarkMode={isDarkMode}
                />
            )}



            {/* CSS Animations */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600;700&display=swap');
                
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes fadeInLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                
                @keyframes fadeInRight {
                    from {
                        opacity: 0;
                        transform: translateX(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
                
                @keyframes gridMoveFast {
                    0% {
                        transform: translate(0, 0);
                    }
                    100% {
                        transform: translate(48px, 48px);
                    }
                }
                
                @keyframes pulse {
                    0%, 100% {
                        opacity: 0.2;
                    }
                    50% {
                        opacity: 0.35;
                    }
                }
                
                .animate-fadeInUp {
                    animation: fadeInUp 0.6s ease-out forwards;
                    opacity: 0;
                }
                
                .animate-fadeInLeft {
                    animation: fadeInLeft 0.6s ease-out forwards;
                    opacity: 0;
                }
                
                .animate-fadeInRight {
                    animation: fadeInRight 0.6s ease-out forwards;
                    opacity: 0;
                }
                
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out forwards;
                }
                
                * {
                    scroll-behavior: smooth;
                }
            `}</style>
        </div>
    );
}
