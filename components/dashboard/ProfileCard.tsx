"use client"

import React from 'react';
import { getColor } from '@/lib/_colors';
import { Shield, MapPin, Calendar, Wallet, Mail, BadgeCheck, Copy, ExternalLink } from 'lucide-react';
import { UserProfile } from '@/app/dashboard/page';

interface ProfileCardProps {
    isDarkMode: boolean;
    profile: UserProfile;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ isDarkMode, profile }) => {
    const colors = getColor(isDarkMode);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div
            className="p-5 sm:p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:shadow-xl"
            style={{
                backgroundColor: colors.bg.card,
                borderColor: colors.border.subtle
            }}
        >
            {/* Profile Header */}
            <div className="flex flex-col items-center text-center mb-6">
                <div className="relative mb-4">
                    <div
                        className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl flex items-center justify-center text-white text-3xl sm:text-4xl font-bold shadow-lg"
                        style={{ backgroundColor: colors.accent.primary }}
                    >
                        {profile.profileImage}
                    </div>
                    {profile.isVerified && (
                        <div
                            className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: '#22c55e' }}
                        >
                            <BadgeCheck className="w-5 h-5 text-white" />
                        </div>
                    )}
                </div>
                <h3
                    className="text-xl sm:text-2xl font-bold"
                    style={{ color: colors.text.primary, fontFamily: "'Sora', sans-serif" }}
                >
                    {profile.name}
                </h3>
                <div
                    className="flex items-center gap-2 mt-1 px-3 py-1 rounded-full text-sm"
                    style={{ backgroundColor: `${colors.accent.primary}15`, color: colors.accent.primary }}
                >
                    <Shield className="w-4 h-4" />
                    <span className="font-medium">{profile.voterId}</span>
                </div>
            </div>

            {/* Profile Details */}
            <div className="space-y-4">
                <div
                    className="flex items-center gap-3 p-3 rounded-xl"
                    style={{ backgroundColor: `${colors.bg.tertiary || colors.bg.secondary}50` }}
                >
                    <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${colors.accent.primary}20` }}
                    >
                        <Mail className="w-5 h-5" style={{ color: colors.accent.primary }} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs" style={{ color: colors.text.muted }}>Email</p>
                        <p
                            className="text-sm font-medium truncate"
                            style={{ color: colors.text.primary }}
                        >
                            {profile.email}
                        </p>
                    </div>
                </div>

                <div
                    className="flex items-center gap-3 p-3 rounded-xl"
                    style={{ backgroundColor: `${colors.bg.tertiary || colors.bg.secondary}50` }}
                >
                    <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${colors.accent.primary}20` }}
                    >
                        <MapPin className="w-5 h-5" style={{ color: colors.accent.primary }} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs" style={{ color: colors.text.muted }}>District</p>
                        <p
                            className="text-sm font-medium truncate"
                            style={{ color: colors.text.primary }}
                        >
                            {profile.district}
                        </p>
                    </div>
                </div>

                <div
                    className="flex items-center gap-3 p-3 rounded-xl"
                    style={{ backgroundColor: `${colors.bg.tertiary || colors.bg.secondary}50` }}
                >
                    <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${colors.accent.primary}20` }}
                    >
                        <Calendar className="w-5 h-5" style={{ color: colors.accent.primary }} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs" style={{ color: colors.text.muted }}>Registered</p>
                        <p
                            className="text-sm font-medium truncate"
                            style={{ color: colors.text.primary }}
                        >
                            {profile.registrationDate}
                        </p>
                    </div>
                </div>

                <div
                    className="flex items-center gap-3 p-3 rounded-xl"
                    style={{ backgroundColor: `${colors.bg.tertiary || colors.bg.secondary}50` }}
                >
                    <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${colors.accent.primary}20` }}
                    >
                        <Wallet className="w-5 h-5" style={{ color: colors.accent.primary }} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs" style={{ color: colors.text.muted }}>Wallet</p>
                        <div className="flex items-center gap-2">
                            <p
                                className="text-sm font-mono font-medium truncate"
                                style={{ color: colors.text.primary }}
                            >
                                {profile.walletAddress}
                            </p>
                            <button
                                onClick={() => copyToClipboard(profile.walletAddress)}
                                className="p-1 rounded hover:opacity-70 transition-opacity"
                            >
                                <Copy className="w-3.5 h-3.5" style={{ color: colors.text.muted }} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* View Profile Button */}
            <button
                className="w-full mt-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02]"
                style={{
                    backgroundColor: `${colors.accent.primary}15`,
                    color: colors.accent.primary
                }}
            >
                <span>View Full Profile</span>
                <ExternalLink className="w-4 h-4" />
            </button>
        </div>
    );
};
