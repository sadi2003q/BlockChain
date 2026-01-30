import React from "react";
import { getColor } from "@/lib/_colors";
import { Shield, CheckCircle, LogOut } from "lucide-react";
import { UserData } from "@/app/VotingPortal/page";

interface VotingPortalHeaderProps {
    isDarkMode: boolean;
    userData: UserData;
}

export const VotingPortalHeader: React.FC<VotingPortalHeaderProps> = ({ isDarkMode, userData }) => {
    const colors = getColor(isDarkMode);

    return (
        <header
            className="sticky top-0 z-40 backdrop-blur-2xl border-b"
            style={{
                backgroundColor: isDarkMode ? 'rgba(10, 10, 10, 0.8)' : 'rgba(243, 233, 220, 0.8)',
                borderColor: colors.border.subtle
            }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 sm:h-20">
                    {/* Logo */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        <div
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-transform duration-300 hover:scale-110"
                            style={{
                                backgroundColor: colors.accent.primary,
                                boxShadow: `0 8px 24px ${colors.glow.primary}`
                            }}
                        >
                            <Shield className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                        </div>
                        <div>
                            <span
                                className="text-lg sm:text-2xl font-bold block"
                                style={{ fontFamily: "'Sora', sans-serif", color: colors.text.primary }}
                            >
                                VoteSecure
                            </span>
                            <span
                                className="text-xs font-medium hidden sm:block"
                                style={{ color: colors.text.tertiary, fontFamily: "'Inter', sans-serif" }}
                            >
                                Blockchain Voting Portal
                            </span>
                        </div>
                    </div>

                    {/* User Info */}
                    <div className="flex items-center gap-2 sm:gap-4">
                        <div className="hidden lg:block text-right">
                            <div
                                className="text-sm font-semibold"
                                style={{ fontFamily: "'Inter', sans-serif", color: colors.text.primary }}
                            >
                                {userData.name}
                            </div>
                            <div
                                className="text-xs flex items-center justify-end gap-1"
                                style={{ color: colors.text.tertiary, fontFamily: "'Inter', sans-serif" }}
                            >
                                <CheckCircle className="w-3 h-3" style={{ color: colors.accent.success }} />
                                {userData.eligibility}
                            </div>
                        </div>
                        <div
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center font-bold text-sm sm:text-lg transition-transform duration-300 hover:scale-105"
                            style={{
                                backgroundColor: colors.accent.primary,
                                color: '#ffffff',
                                boxShadow: `0 4px 16px ${colors.glow.primary}`
                            }}
                        >
                            {userData.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <button
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                            style={{
                                backgroundColor: colors.bg.tertiary,
                                border: `1px solid ${colors.border.subtle}`
                            }}
                            title="Logout"
                        >
                            <LogOut className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: colors.text.secondary }} />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};
