"use client"

import React, { useState, useEffect } from 'react';
import { getColor } from "@/lib/_colors";
import { ThemeToggleButton } from "@/components/signin/ThemeToggleButton";
import { VotingPortalHeader } from "@/components/VotingPortal/Header";
import { VotingPortalAnimation } from "@/components/VotingPortal/Animation";
import { ElectionInfoCard } from "@/components/VotingPortal/ElectionInfoCard";
import { TimeRemainingCard } from "@/components/VotingPortal/TimeRemainingCard";
import { ParticipationCard } from "@/components/VotingPortal/ParticipationCard";
import { VoterInfoCard } from "@/components/VotingPortal/VoterInfoCard";
import { CandidateCard } from "@/components/VotingPortal/CandidateCard";
import { VoteButton } from "@/components/VotingPortal/VoteButton";
import { SecurityNotice } from "@/components/VotingPortal/SecurityNotice";
import { ConfirmVoteModal } from "@/components/VotingPortal/ConfirmVoteModal";
import { VoteSuccessAlert } from "@/components/VotingPortal/VoteSuccessAlert";
import { VotePendingAlert } from "@/components/VotingPortal/VotePendingAlert";

export interface Candidate {
    id: number;
    name: string;
    position: string;
    party: string;
    image: string;
    platform: string;
}

export interface TimeRemaining {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export interface ElectionInfo {
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    totalVoters: number;
    votedCount: number;
}

export interface UserData {
    name: string;
    id: string;
    eligibility: string;
    district: string;
}

export default function VotingPortal() {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
    const [selectedCandidate, setSelectedCandidate] = useState<number | null>(null);
    const [hasVoted, setHasVoted] = useState<boolean>(false);
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
    const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
        days: 2,
        hours: 14,
        minutes: 32,
        seconds: 45
    });

    // Mock user data - In production, fetch from blockchain/backend
    const userData: UserData = {
        name: "John Doe",
        id: "VS-2026-8472",
        eligibility: "Verified",
        district: "District 5"
    };

    // Mock election data - In production, fetch from smart contract
    const electionInfo: ElectionInfo = {
        title: "Student Council President 2026",
        description: "Annual election for Student Council President. Your vote matters in shaping the future of our institution.",
        startDate: "Jan 25, 2026",
        endDate: "Jan 30, 2026",
        totalVoters: 2847,
        votedCount: 1923
    };

    // Mock candidates - In production, fetch from smart contract
    const candidates: Candidate[] = [
        {
            id: 1,
            name: "Sarah Johnson",
            position: "Student Council President",
            party: "Progressive Unity",
            image: "SJ",
            platform: "Focus on mental health resources and campus sustainability initiatives"
        },
        {
            id: 2,
            name: "Michael Chen",
            position: "Student Council President",
            party: "Campus First",
            image: "MC",
            platform: "Improve student facilities and expand career services programs"
        },
        {
            id: 3,
            name: "Emily Rodriguez",
            position: "Student Council President",
            party: "Independent",
            image: "ER",
            platform: "Enhance diversity programs and international student support"
        }
    ];

    const colors = getColor(isDarkMode);

    // Timer countdown
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining(prev => {
                if (prev.seconds > 0) {
                    return { ...prev, seconds: prev.seconds - 1 };
                } else if (prev.minutes > 0) {
                    return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                } else if (prev.hours > 0) {
                    return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
                } else if (prev.days > 0) {
                    return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
                }
                return prev;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleVote = () => {
        if (selectedCandidate) {
            setShowConfirmModal(true);
        }
    };

    const confirmVote = () => {
        // Here you would integrate with your blockchain smart contract
        // Example: await votingContract.castVote(selectedCandidate);
        setHasVoted(true);
        setShowConfirmModal(false);
    };

    const getSelectedCandidate = () => {
        return candidates.find(c => c.id === selectedCandidate);
    };

    return (
        <div
            className="min-h-screen transition-colors duration-500 relative overflow-hidden"
            style={{ backgroundColor: colors.bg.primary }}
        >
            {/* Dark Mode Toggle Button */}
            <ThemeToggleButton isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

            {/* Animated Background */}
            <VotingPortalAnimation isDarkMode={isDarkMode} />

            {/* Header */}
            <VotingPortalHeader isDarkMode={isDarkMode} userData={userData} />

            {/* Main Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                {/* Voting Status Alert */}
                {hasVoted ? (
                    <VoteSuccessAlert isDarkMode={isDarkMode} />
                ) : (
                    <VotePendingAlert isDarkMode={isDarkMode} />
                )}

                {/* Main Grid Layout */}
                <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
                    {/* Left Column - Info Cards */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="animate-fadeInLeft" style={{ animationDelay: '0.1s' }}>
                            <ElectionInfoCard isDarkMode={isDarkMode} electionInfo={electionInfo} />
                        </div>

                        <div className="animate-fadeInLeft" style={{ animationDelay: '0.2s' }}>
                            <TimeRemainingCard isDarkMode={isDarkMode} timeRemaining={timeRemaining} />
                        </div>

                        <div className="animate-fadeInLeft" style={{ animationDelay: '0.3s' }}>
                            <ParticipationCard
                                isDarkMode={isDarkMode}
                                electionInfo={electionInfo}
                            />
                        </div>

                        <div className="animate-fadeInLeft" style={{ animationDelay: '0.4s' }}>
                            <VoterInfoCard
                                isDarkMode={isDarkMode}
                                userData={userData}
                            />
                        </div>
                    </div>

                        {/* Right Column - Voting Section */}
                    <div className="lg:col-span-2 animate-fadeInRight" style={{ animationDelay: '0.2s' }}>
                        <div
                            className="p-6 sm:p-8 rounded-3xl backdrop-blur-xl relative overflow-hidden"
                            style={{
                                backgroundColor: colors.bg.card,
                                border: `1px solid ${colors.border.subtle}`,
                                boxShadow: `0 24px 48px ${colors.glow.primary}`
                            }}
                        >
                            {/* Subtle glow effect */}
                            <div
                                className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none"
                                style={{ background: colors.accent.primary }}
                            />

                            {/* Section Header */}
                            <div className="mb-6 sm:mb-8 relative z-10">
                                <h2
                                    className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3"
                                    style={{ fontFamily: "'Sora', sans-serif", color: colors.text.primary }}
                                >
                                    Cast Your Vote
                                </h2>
                                <p
                                    className="text-sm sm:text-base"
                                    style={{ color: colors.text.secondary, fontFamily: "'Inter', sans-serif" }}
                                >
                                    Select one candidate below. Your choice is completely anonymous and secured by blockchain technology.
                                </p>
                            </div>

                            {/* Candidates List */}
                            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 relative z-10">
                                {candidates.map((candidate, index) => (
                                    <div
                                        key={candidate.id}
                                        className="animate-fadeInUp"
                                        style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                                    >
                                        <CandidateCard
                                            isDarkMode={isDarkMode}
                                            candidate={candidate}
                                            isSelected={selectedCandidate === candidate.id}
                                            hasVoted={hasVoted}
                                            onSelect={() => !hasVoted && setSelectedCandidate(candidate.id)}
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Vote Button */}
                            {!hasVoted && (
                                <div className="animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
                                    <VoteButton
                                        isDarkMode={isDarkMode}
                                        selectedCandidate={selectedCandidate}
                                        onClick={handleVote}
                                    />
                                </div>
                            )}

                            {/* Security Notice */}
                            <div className="animate-fadeInUp" style={{ animationDelay: '0.7s' }}>
                                <SecurityNotice isDarkMode={isDarkMode} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Confirmation Modal */}
            {showConfirmModal && (
                <ConfirmVoteModal
                    isDarkMode={isDarkMode}
                    candidate={getSelectedCandidate()}
                    onConfirm={confirmVote}
                    onCancel={() => setShowConfirmModal(false)}
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
