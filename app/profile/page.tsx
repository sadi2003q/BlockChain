"use client"

import React, { useState, ChangeEvent } from 'react';
import {User, Settings, LogOut, CheckCircle, LucideIcon} from 'lucide-react';
import { getColor } from '@/lib/_colors';
import { 
    userData,
    voterInfo,
    votingStatistics,
    verificationDocuments,
    eligibleElections,
    TabItem
} from '@/lib/Schema_Lib/profile.schema';

// Components
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { AnimatedBackground } from '@/components/profile/AnimatedBackground';
import { ProfileImageCard } from '@/components/profile/ProfileImageCard';
import { VotingStatisticsCard } from '@/components/profile/VotingStatisticsCard';
import { ProfileTabs } from '@/components/profile/ProfileTabs';
import { PersonalInfoForm } from '@/components/profile/PersonalInfoForm';
import { EligibilityStatusCard } from '@/components/profile/EligibilityStatusCard';
import { VerificationDocumentsCard } from '@/components/profile/VerificationDocumentsCard';
import { EligibleElectionsCard } from '@/components/profile/EligibleElectionsCard';
import { PageHeader } from '@/components/profile/PageHeader';

// MenuItem interface (component-specific)
interface MenuItem {
    icon: LucideIcon;
    label: string;
    action: () => void;
}

export default function VoteSecureProfile() {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [showProfileMenu, setShowProfileMenu] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<string>('profile');
    const [profileImage, setProfileImage] = useState<string | null>(userData.profileImage || null);

    // Form data for editing
    const [userFormData, setUserFormData] = useState({
        fullName: userData.name,
        email: userData.email,
        phone: userData.phone,
        dateOfBirth: userData.dateOfBirth.toISOString().split('T')[0],
        address: userData.address
    });

    // Get colors from utility function
    const colors = getColor(isDarkMode);

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = (): void => {
        setIsEditing(false);
        // Save logic here
    };

    const menuItems: MenuItem[] = [
        { icon: User, label: 'View Profile', action: () => {} },
        { icon: Settings, label: 'Settings', action: () => {} },
        { icon: LogOut, label: 'Sign Out', action: () => {} }
    ];

    const tabs: TabItem[] = [
        { id: 'profile', label: 'Profile Information', icon: User },
        { id: 'eligibility', label: 'Voting Eligibility', icon: CheckCircle }
    ];

    return (
        <div
            className="min-h-screen transition-colors duration-500 relative overflow-hidden"
            style={{ backgroundColor: colors.bg.primary, color: colors.text.primary }}
        >
            {/* Animated Background */}
            <AnimatedBackground isDarkMode={isDarkMode} />

            {/* Header / Navigation */}
            <ProfileHeader
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
                notificationCount={3}
                showProfileMenu={showProfileMenu}
                setShowProfileMenu={setShowProfileMenu}
                userName={userData.name}
                userEmail={userData.email}
                menuItems={menuItems}
                colors={colors}
            />

            {/* Main Content */}
            <div className="pt-20 sm:pt-22 pb-20 px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-7xl mx-auto">
                    {/* Page Header */}
                    <PageHeader
                        title="My Profile"
                        description="Manage your account information and voting eligibility"
                        colors={colors}
                    />

                    {/* Tabs */}
                    <ProfileTabs
                        tabs={tabs}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        colors={colors}
                    />

                    <div className="grid lg:grid-cols-3 gap-4 sm:gap-8 lg:items-start">
                        {/* Left Sidebar - Profile Image & Quick Stats */}
                        <div className="lg:col-span-1 space-y-4 sm:space-y-6">
                            <div className="lg:sticky lg:top-28 space-y-4 sm:space-y-6 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto">
                                {/* Profile Image Card */}
                                <ProfileImageCard
                                    profileImage={profileImage}
                                    userName={userData.name}
                                    voterId={voterInfo.voterId}
                                    isVerified={userData.isVerified}
                                    onImageUpload={handleImageUpload}
                                    colors={colors}
                                />

                                {/* Quick Stats */}
                                <VotingStatisticsCard
                                    totalVotesParticipated={votingStatistics.totalVotesParticipated}
                                    lastVoted={votingStatistics.lastVoted}
                                    registeredDate={userData.registeredAt}
                                    colors={colors}
                                />
                            </div>
                        </div>

                        {/* Right Content Area - Scrollable */}
                        <div className="lg:col-span-2 lg:max-h-[calc(100vh-12rem)] lg:overflow-y-auto lg:pr-2">
                            {/* Profile Information Tab */}
                            {activeTab === 'profile' && (
                                <PersonalInfoForm
                                    isEditing={isEditing}
                                    setIsEditing={setIsEditing}
                                    formData={userFormData}
                                    setFormData={setUserFormData}
                                    onSave={handleSave}
                                    colors={colors}
                                />
                            )}

                            {/* Voting Eligibility Tab */}
                            {activeTab === 'eligibility' && (
                                <div className="space-y-4 sm:space-y-6">
                                    {/* Eligibility Status Card */}
                                    <EligibilityStatusCard
                                        voterId={voterInfo.voterId}
                                        registrationDate={userData.registeredAt}
                                        colors={colors}
                                    />

                                    {/* Verification Documents */}
                                    <VerificationDocumentsCard
                                        documents={verificationDocuments}
                                        colors={colors}
                                    />

                                    {/* Eligible Elections */}
                                    <EligibleElectionsCard
                                        elections={eligibleElections}
                                        colors={colors}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

           {/* CSS Animations */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600;700&display=swap');
                
                @keyframes fadeInDown {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
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
                
                .animate-fadeInDown {
                    animation: fadeInDown 0.5s ease-out forwards;
                }
                
                .animate-fadeInUp {
                    animation: fadeInUp 0.5s ease-out forwards;
                }
                
                .animate-fadeIn {
                    animation: fadeIn 0.2s ease-out forwards;
                }
                
                * {
                    scroll-behavior: smooth;
                }
                
                input::placeholder {
                    opacity: 0.5;
                }
                
                input:focus::placeholder {
                    opacity: 0.3;
                }
            `}</style>
        </div>
    );
}