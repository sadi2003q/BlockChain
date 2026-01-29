import React from "react";
import { getColor } from "@/lib/_colors";
import { User, CheckCircle, MapPin, CreditCard } from "lucide-react";
import { UserData } from "@/app/VotingPortal/page";

interface VoterInfoCardProps {
    isDarkMode: boolean;
    userData: UserData;
}

export const VoterInfoCard: React.FC<VoterInfoCardProps> = ({ isDarkMode, userData }) => {
    const colors = getColor(isDarkMode);

    return (
        <div
            className="p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
            style={{
                backgroundColor: colors.bg.card,
                border: `1px solid ${colors.border.subtle}`,
                boxShadow: `0 8px 24px ${colors.glow.primary}`
            }}
        >
            <div className="flex items-center gap-2 mb-5">
                <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: colors.accent.primary }}
                >
                    <User className="w-5 h-5 text-white" />
                </div>
                <h3
                    className="text-lg font-bold"
                    style={{ fontFamily: "'Sora', sans-serif", color: colors.text.primary }}
                >
                    Your Information
                </h3>
            </div>

            <div className="space-y-4">
                {/* Voter ID */}
                <div
                    className="p-3 rounded-xl flex items-center gap-3"
                    style={{ backgroundColor: colors.bg.elevated }}
                >
                    <CreditCard className="w-4 h-4" style={{ color: colors.text.tertiary }} />
                    <div className="flex-1">
                        <div
                            className="text-xs mb-1"
                            style={{ color: colors.text.tertiary, fontFamily: "'Inter', sans-serif" }}
                        >
                            Voter ID
                        </div>
                        <div
                            className="text-sm font-bold"
                            style={{ color: colors.text.primary, fontFamily: "'Inter', sans-serif" }}
                        >
                            {userData.id}
                        </div>
                    </div>
                </div>

                {/* District */}
                <div
                    className="p-3 rounded-xl flex items-center gap-3"
                    style={{ backgroundColor: colors.bg.elevated }}
                >
                    <MapPin className="w-4 h-4" style={{ color: colors.text.tertiary }} />
                    <div className="flex-1">
                        <div
                            className="text-xs mb-1"
                            style={{ color: colors.text.tertiary, fontFamily: "'Inter', sans-serif" }}
                        >
                            District
                        </div>
                        <div
                            className="text-sm font-bold"
                            style={{ color: colors.text.primary, fontFamily: "'Inter', sans-serif" }}
                        >
                            {userData.district}
                        </div>
                    </div>
                </div>

                {/* Status */}
                <div
                    className="p-3 rounded-xl flex items-center gap-3"
                    style={{ 
                        backgroundColor: colors.bg.elevated,
                        border: `1px solid ${colors.accent.success}30`
                    }}
                >
                    <CheckCircle className="w-4 h-4" style={{ color: colors.accent.success }} />
                    <div className="flex-1">
                        <div
                            className="text-xs mb-1"
                            style={{ color: colors.text.tertiary, fontFamily: "'Inter', sans-serif" }}
                        >
                            Status
                        </div>
                        <div
                            className="text-sm font-bold"
                            style={{ color: colors.accent.success, fontFamily: "'Inter', sans-serif" }}
                        >
                            Eligible to Vote
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
