/**
 * VoteSecure Profile Page
 * 
 * This is a Next.js client-side component that serves as the main user profile page
 * for the VoteSecure voting application. It provides comprehensive user profile
 * management and voting eligibility information in a tabbed interface.
 * 
 * The page consists of two main tabs:
 * 1. Profile Information Tab - Displays and allows editing of user personal information
 * 2. Voting Eligibility Tab - Shows voter status, verification documents, and eligible elections
 * 
 * Features:
 * - Theme toggle (Dark/Light mode) for improved UX
 * - Profile image upload with file preview
 * - Editable personal information form
 * - Voting statistics and history
 * - Tab-based navigation for organized information layout
 * - Responsive design with mobile, tablet, and desktop support
 * - Animated background and smooth transitions
 * - Sticky sidebar on larger screens for persistent visibility
 */

"use client"

import React, {useState, ChangeEvent, JSX} from 'react';
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

// Component Imports
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

/**
 * MenuItem Interface
 * 
 * Defines the structure for menu items displayed in the profile dropdown menu.
 * Each menu item contains an icon, label, and associated action handler.
 * 
 * @interface MenuItem
 * @property {LucideIcon} icon - The Lucid React icon component to display
 * @property {string} label - The display text for the menu item
 * @property {() => void} action - The callback function executed when the menu item is clicked
 */
interface MenuItem {
    icon: LucideIcon;
    label: string;
    action: () => void;
}

/**
 * VoteSecureProfile Component
 * 
 * Main profile page component that manages the complete user profile interface.
 * Handles state management for theme, editing mode, tab navigation, and profile data.
 * 
 * @component
 * @returns {JSX.Element} The complete profile page with all subcomponents and styling
 */
export default function VoteSecureProfile(): JSX.Element {

    // ==================== STATE VARIABLES ====================
    
    /** Tracks whether the application is in dark mode or light mode */
    const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
    
    /** Tracks whether the user is currently editing their profile information */
    const [isEditing, setIsEditing] = useState<boolean>(false);
    
    /** Tracks the visibility state of the profile dropdown menu */
    const [showProfileMenu, setShowProfileMenu] = useState<boolean>(false);
    
    /** Stores the currently active tab ('profile' or 'eligibility') */
    const [activeTab, setActiveTab] = useState<string>('profile');
    
    /** Stores the user's profile image in base64 format or null if not set */
    const [profileImage, setProfileImage] = useState<string | null>(userData.profileImage || null);

    /**
     * Form state containing editable user profile information
     * Used in the Profile Information tab for user data updates
     */
    const [userFormData, setUserFormData] = useState({
        fullName: userData.name,
        email: userData.email,
        phone: userData.phone,
        dateOfBirth: userData.dateOfBirth.toISOString().split('T')[0],
        address: userData.address
    });

    /**
     * Color scheme object retrieved from a utility function
     * Provides theme-aware colors for all UI components (backgrounds, text, accents)
     * Updates dynamically when isDarkMode changes
     */
    const colors = getColor(isDarkMode);

    /**
     * Handles profile image upload and conversion to base64
     * 
     * This function processes the selected image file from the file input,
     * converts it to base64 format, and updates the profileImage state.
     * Used when a user clicks on the profile image to upload a new one.
     * 
     * @param {ChangeEvent<HTMLInputElement>} e - The file input change event
     */
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

    /**
     * Handles saving user profile changes
     * 
     * Called when the user clicks the save button after editing their profile.
     * Currently, exits editing mode; in production, this would send data to a backend API.
     * 
     * @returns {void}
     */
    const handleSave = (): void => {
        setIsEditing(false);
        // Save logic here
    };

    /**
     * Profile dropdown menu items configuration
     * 
     * Defines the menu options displayed when the user clicks their profile dropdown.
     * Each item has an icon, label, and action handler.
     * Currently, placeholder actions should be connected to actual navigation and auth logic.
     */
    const menuItems: MenuItem[] = [
        { icon: User, label: 'View Profile', action: () => {} },
        { icon: Settings, label: 'Settings', action: () => {} },
        { icon: LogOut, label: 'Sign Out', action: () => {} }
    ];

    /**
     * Navigation tabs configuration for the profile page
     * 
     * Defines the two main tabs users can navigate between:
     * - Profile Information: User personal details
     * - Voting Eligibility: Voter status and election information
     */
    const tabs: TabItem[] = [
        { id: 'profile', label: 'Profile Information', icon: User },
        { id: 'eligibility', label: 'Voting Eligibility', icon: CheckCircle }
    ];

    return (
        <div
            className="min-h-screen transition-colors duration-500 relative overflow-hidden"
            style={{ backgroundColor: colors.bg.primary, color: colors.text.primary }}
        >
            {/* ==================== ANIMATED BACKGROUND ==================== */}
            {/* Decorative animated background component for visual appeal and depth */}
            <AnimatedBackground isDarkMode={isDarkMode} />

            {/* ==================== PAGE HEADER / NAVIGATION ==================== */}
            {/* 
             * Header component containing:
             * - Application branding/logo
             * - Theme toggle (dark/light mode)
             * - Notification badge
             * - User profile dropdown menu
             */}
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

            {/* ==================== MAIN CONTENT AREA ==================== */}
            <div className="pt-20 sm:pt-22 pb-20 px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-7xl mx-auto">
                    {/* Page Title and Description */}
                    <PageHeader
                        title="My Profile"
                        description="Manage your account information and voting eligibility"
                        colors={colors}
                    />

                    {/* ==================== TAB NAVIGATION ==================== */}
                    {/* 
                     * Tabbed interface allowing users to switch between:
                     * - Profile Information tab
                     * - Voting Eligibility tab
                     */}
                    <ProfileTabs
                        tabs={tabs}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        colors={colors}
                    />

                    {/* ==================== PAGE LAYOUT ==================== */}
                    {/* 
                     * Responsive grid layout with two sections:
                     * - Left Sidebar (1 column on large screens): Profile image and voting statistics
                     * - Right Content Area (2 columns on large screens): Tab content with form or eligibility info
                     */}
                    <div className="grid lg:grid-cols-3 gap-4 sm:gap-8 lg:items-start">
                        {/* ==================== LEFT SIDEBAR ==================== */}
                        <div className="lg:col-span-1 space-y-4 sm:space-y-6">
                            {/* 
                             * Sticky sidebar container on large screens
                             * Remains visible while a user scrolls through tab content
                             * Contains profile image and voting statistics
                             */}
                            <div className="lg:sticky lg:top-28 space-y-4 sm:space-y-6 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto">
                                {/* 
                                 * Profile Image Card
                                 * Displays: User avatar, name, voter ID, verification status
                                 * Functionality: Image upload capability with preview
                                 */}
                                <ProfileImageCard
                                    profileImage={profileImage}
                                    userName={userData.name}
                                    voterId={voterInfo.voterId}
                                    isVerified={userData.isVerified}
                                    onImageUpload={handleImageUpload}
                                    colors={colors}
                                />

                                {/* 
                                 * Voting Statistics Card
                                 * Displays: Total votes participated, last vote date, registration date
                                 * Purpose: Quick view of the user's voting history and engagement
                                 */}
                                <VotingStatisticsCard
                                    totalVotesParticipated={votingStatistics.totalVotesParticipated}
                                    lastVoted={votingStatistics.lastVoted}
                                    registeredDate={userData.registeredAt}
                                    colors={colors}
                                />
                            </div>
                        </div>

                        {/* ==================== RIGHT CONTENT AREA ==================== */}
                        {/* 
                         * Scrollable content area displaying tab-specific content
                         * Grows to 2 columns on large screens
                         * Height-constrained with internal scroll on large screens
                         */}
                        <div className="lg:col-span-2 lg:max-h-[calc(100vh-12rem)] lg:overflow-y-auto lg:pr-2">
                            {/* ==================== PROFILE INFORMATION TAB ==================== */}
                            {/* 
                             * Conditionally rendered when the 'profile' tab is active
                             * Displays: Editable personal information form
                             * Features: Toggle between view and edit modes
                             */}
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

                            {/* ==================== VOTING ELIGIBILITY TAB ==================== */}
                            {/* 
                             * Conditionally rendered when the 'eligibility' tab is active
                             * Contains three information cards displayed vertically
                             */}
                            {activeTab === 'eligibility' && (
                                <div className="space-y-4 sm:space-y-6">
                                    {/* 
                                     * Eligibility Status Card
                                     * Displays: Voter ID, registration date, current voting status
                                     * Purpose: Shows user's voting eligibility and verification status
                                     */}
                                    <EligibilityStatusCard
                                        voterId={voterInfo.voterId}
                                        registrationDate={userData.registeredAt}
                                        colors={colors}
                                    />

                                    {/* 
                                     * Verification Documents Card
                                     * Displays: List of submitted verification documents
                                     * Purpose: Shows proof of identity verification for voting
                                     */}
                                    <VerificationDocumentsCard
                                        documents={verificationDocuments}
                                        colors={colors}
                                    />

                                    {/* 
                                     * Eligible Elections Card
                                     * Displays: List of elections a user is eligible to vote in
                                     * Purpose: Shows upcoming and available voting opportunities
                                     */}
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

            {/* ==================== GLOBAL STYLES AND ANIMATIONS ==================== */}
            {/* 
             * CSS module containing:
             * - Google Font imports (Sora and Inter typefaces)
             * - Keyframe animations (fadeInDown, fadeInUp, fadeIn, gridMoveFast)
             * - Animation class utilities for component transitions
             * - Global input and scroll behavior styling
             */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600;700&display=swap');
                
                /* ==================== FADE ANIMATIONS ==================== */
                
                /* Fade In animation with downward slide effect */
                /* Used for elements that should appear from the top */
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
                
                /* Fade In animation with upward slide effect */
                /* Used for elements that should appear from the bottom */
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
                
                /* Simple fade in animation */
                /* Used for opacity-only transitions */
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
                
                /* Grid background animation effect */
                /* Creates a moving grid pattern in the background */
                @keyframes gridMoveFast {
                    0% {
                        transform: translate(0, 0);
                    }
                    100% {
                        transform: translate(48px, 48px);
                    }
                }
                
                /* ==================== ANIMATION CLASS UTILITIES ==================== */
                
                /* Applies fadeInDown animation to elements */
                .animate-fadeInDown {
                    animation: fadeInDown 0.5s ease-out forwards;
                }
                
                /* Applies fadeInUp animation to elements */
                .animate-fadeInUp {
                    animation: fadeInUp 0.5s ease-out forwards;
                }
                
                /* Applies fadeIn animation to elements */
                .animate-fadeIn {
                    animation: fadeIn 0.2s ease-out forwards;
                }
                
                /* ==================== GLOBAL BEHAVIORS ==================== */
                
                /* Enable smooth scrolling across the entire page */
                * {
                    scroll-behavior: smooth;
                }
                
                /* Input placeholder styling - shows at normal opacity */
                input::placeholder {
                    opacity: 0.5;
                }
                
                /* Input placeholder styling - dims when input is focused */
                input:focus::placeholder {
                    opacity: 0.3;
                }
            `}</style>
        </div>
    );
}