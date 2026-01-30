import React, { ChangeEvent } from 'react';
import { User, Camera, CheckCircle } from 'lucide-react';
import {_colorType} from "@/lib/_colors";

interface ProfileImageCardProps {
    profileImage: string | null;
    userName: string;
    voterId: string;
    isVerified: boolean;
    onImageUpload: (e: ChangeEvent<HTMLInputElement>) => void;
    colors: _colorType;
}

export const ProfileImageCard: React.FC<ProfileImageCardProps> = ({
    profileImage,
    userName,
    voterId,
    isVerified,
    onImageUpload,
    colors
}) => {
    return (
        <div
            className="p-6 sm:p-8 rounded-2xl"
            style={{
                backgroundColor: colors.bg.card,
                border: `1px solid ${colors.border.subtle}`,
                boxShadow: `0 4px 16px ${colors.glow.primary}`
            }}
        >
            <div className="text-center">
                {/* Image Upload - Round */}
                <div className="relative inline-block mb-4 sm:mb-6">
                    <div
                        className="w-24 h-24 sm:w-32 sm:h-32 rounded-full flex items-center justify-center overflow-hidden"
                        style={{
                            backgroundColor: colors.bg.tertiary,
                            border: `3px solid ${colors.accent.primary}`,
                            boxShadow: `0 8px 24px ${colors.glow.primary}`
                        }}
                    >
                        {profileImage ? (
                            <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <User className="w-12 h-12 sm:w-16 sm:h-16" style={{ color: colors.text.tertiary }} />
                        )}
                    </div>
                    <label
                        htmlFor="image-upload"
                        className="absolute bottom-0 right-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-110"
                        style={{
                            backgroundColor: colors.accent.primary,
                            boxShadow: `0 4px 12px ${colors.glow.primary}`
                        }}
                    >
                        <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </label>
                    <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={onImageUpload}
                        className="hidden"
                    />
                </div>

                <h2
                    className="text-xl sm:text-2xl font-bold mb-2"
                    style={{ fontFamily: "'Sora', sans-serif", color: colors.text.primary }}
                >
                    {userName}
                </h2>
                <p
                    className="text-sm mb-4"
                    style={{ color: colors.text.secondary, fontFamily: "'Inter', sans-serif" }}
                >
                    Voter ID: {voterId}
                </p>

                {/* Status Badge */}
                <div
                    className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full"
                    style={{
                        backgroundColor: `${colors.accent.success}20`,
                        border: `1px solid ${colors.accent.success}50`
                    }}
                >
                    <CheckCircle className="w-4 h-4" style={{ color: colors.accent.success }} />
                    <span
                        className="text-sm font-semibold"
                        style={{ color: colors.accent.success, fontFamily: "'Inter', sans-serif" }}
                    >
                        {isVerified ? 'Verified' : 'Pending'}
                    </span>
                </div>
            </div>
        </div>
    );
};
