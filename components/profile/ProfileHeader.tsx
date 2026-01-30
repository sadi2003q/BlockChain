import React from 'react';
import { Shield, Moon, Sun, Bell, User, Home } from 'lucide-react';
import Link from 'next/link';

interface ProfileHeaderProps {
    isDarkMode: boolean;
    setIsDarkMode: (value: boolean) => void;
    notificationCount: number;
    showProfileMenu: boolean;
    setShowProfileMenu: (value: boolean) => void;
    userName: string;
    userEmail: string;
    menuItems: Array<{ icon: any; label: string; action: () => void }>;
    colors: any;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
    isDarkMode,
    setIsDarkMode,
    notificationCount,
    showProfileMenu,
    setShowProfileMenu,
    userName,
    userEmail,
    menuItems,
    colors
}) => {
    return (
        <header
            className="fixed top-0 left-0 right-0 z-40 backdrop-blur-2xl border-b transition-all duration-300"
            style={{
                backgroundColor: isDarkMode ? 'rgba(10, 10, 10, 0.95)' : 'rgba(243, 233, 220, 0.95)',
                borderColor: colors.border.subtle
            }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 sm:h-20">
                    {/* Logo */}
                    <div className="flex items-center gap-3 sm:gap-8">
                        <div className="flex items-center gap-2 sm:gap-3 group cursor-pointer">
                            <div
                                className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-300"
                                style={{
                                    backgroundColor: colors.accent.primary,
                                    boxShadow: `0 8px 24px ${colors.glow.primary}`
                                }}
                            >
                                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white"/>
                            </div>
                            <div>
                                <span
                                    className="text-lg sm:text-xl font-bold tracking-tight"
                                    style={{
                                        fontFamily: "'Sora', sans-serif",
                                        color: colors.text.primary
                                    }}
                                >
                                    VoteSecure
                                </span>
                                <p
                                    className="text-xs hidden sm:block"
                                    style={{
                                        color: colors.text.tertiary,
                                        fontFamily: "'Inter', sans-serif"
                                    }}
                                >
                                    Profile
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-2 sm:gap-4">
                        {/* Home Button */}
                        <Link href="/dashboard">
                            <button
                                className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl transition-all duration-300 hover:scale-105"
                                style={{
                                    backgroundColor: colors.bg.tertiary,
                                    border: `1px solid ${colors.border.subtle}`,
                                    color: colors.text.secondary,
                                }}
                                title="Go to Dashboard"
                            >
                                <Home className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                        </Link>

                        {/* Dark Mode Toggle */}
                        <button
                            onClick={() => setIsDarkMode(!isDarkMode)}
                            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                            style={{
                                backgroundColor: colors.bg.tertiary,
                                border: `1px solid ${colors.border.subtle}`
                            }}
                        >
                            {isDarkMode ? (
                                <Sun className="w-4 h-4 sm:w-5 sm:h-5" style={{color: colors.accent.warning}}/>
                            ) : (
                                <Moon className="w-4 h-4 sm:w-5 sm:h-5" style={{color: colors.accent.primary}}/>
                            )}
                        </button>

                        {/* Notifications */}
                        <button
                            className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                            style={{
                                backgroundColor: colors.bg.tertiary,
                                border: `1px solid ${colors.border.subtle}`
                            }}
                        >
                            <Bell className="w-4 h-4 sm:w-5 sm:h-5" style={{color: colors.text.secondary}}/>
                            <span
                                className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center text-xs font-bold"
                                style={{
                                    backgroundColor: colors.accent.primary,
                                    color: '#ffffff'
                                }}
                            >
                                {notificationCount}
                            </span>
                        </button>

                        {/* Profile */}
                        <div className="relative">
                            <button
                                onClick={() => setShowProfileMenu(!showProfileMenu)}
                                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                                style={{
                                    backgroundColor: colors.accent.primary,
                                    boxShadow: `0 4px 16px ${colors.glow.primary}`
                                }}
                            >
                                <User className="w-4 h-4 sm:w-5 sm:h-5 text-white"/>
                            </button>

                            {/* Profile Dropdown */}
                            {showProfileMenu && (
                                <div
                                    className="absolute right-0 mt-2 w-56 rounded-xl shadow-2xl animate-fadeIn overflow-hidden"
                                    style={{
                                        backgroundColor: colors.bg.card,
                                        border: `1px solid ${colors.border.subtle}`
                                    }}
                                >
                                    <div
                                        className="px-4 py-3 border-b"
                                        style={{borderColor: colors.border.subtle}}
                                    >
                                        <p
                                            className="text-sm font-bold"
                                            style={{
                                                color: colors.text.primary,
                                                fontFamily: "'Inter', sans-serif"
                                            }}
                                        >
                                            {userName}
                                        </p>
                                        <p
                                            className="text-xs"
                                            style={{
                                                color: colors.text.tertiary,
                                                fontFamily: "'Inter', sans-serif"
                                            }}
                                        >
                                            {userEmail}
                                        </p>
                                    </div>
                                    <div className="py-2">
                                        {menuItems.map((item, i) => (
                                            <button
                                                key={i}
                                                onClick={item.action}
                                                className="w-full px-4 py-2 flex items-center gap-3 transition-colors duration-200"
                                                style={{
                                                    color: colors.text.secondary,
                                                    fontFamily: "'Inter', sans-serif"
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.backgroundColor = colors.bg.elevated;
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.backgroundColor = 'transparent';
                                                }}
                                            >
                                                <item.icon className="w-4 h-4"/>
                                                <span className="text-sm">{item.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};