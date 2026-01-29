import React from "react";
import { getColor } from "@/lib/_colors";
import { TrendingUp, Users } from "lucide-react";
import { ElectionInfo } from "@/app/VotingPortal/page";

interface ParticipationCardProps {
    isDarkMode: boolean;
    electionInfo: ElectionInfo;
}

export const ParticipationCard: React.FC<ParticipationCardProps> = ({ isDarkMode, electionInfo }) => {
    const colors = getColor(isDarkMode);
    const turnoutPercentage = Math.round((electionInfo.votedCount / electionInfo.totalVoters) * 100);

    return (
        <div
            className="p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
            style={{
                backgroundColor: colors.bg.card,
                border: `1px solid ${colors.border.subtle}`,
                boxShadow: `0 8px 24px ${colors.glow.secondary}`
            }}
        >
            <div className="flex items-center gap-2 mb-5">
                <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: colors.bg.elevated }}
                >
                    <TrendingUp className="w-5 h-5" style={{ color: colors.accent.secondary }} />
                </div>
                <h3
                    className="text-lg font-bold"
                    style={{ fontFamily: "'Sora', sans-serif", color: colors.text.primary }}
                >
                    Participation
                </h3>
            </div>

            {/* Progress Bar */}
            <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                    <span
                        className="text-sm font-medium"
                        style={{ color: colors.text.tertiary, fontFamily: "'Inter', sans-serif" }}
                    >
                        Voter Turnout
                    </span>
                    <span
                        className="text-lg font-bold"
                        style={{ color: colors.accent.secondary, fontFamily: "'Sora', sans-serif" }}
                    >
                        {turnoutPercentage}%
                    </span>
                </div>
                <div
                    className="w-full h-3 rounded-full overflow-hidden"
                    style={{ backgroundColor: colors.bg.elevated }}
                >
                    <div
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{
                            width: `${turnoutPercentage}%`,
                            backgroundColor: colors.accent.secondary,
                            boxShadow: `0 0 16px ${colors.glow.secondary}`
                        }}
                    />
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
                <div
                    className="p-4 rounded-xl text-center"
                    style={{
                        backgroundColor: colors.bg.elevated,
                        border: `1px solid ${colors.border.subtle}`
                    }}
                >
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <Users className="w-4 h-4" style={{ color: colors.accent.success }} />
                    </div>
                    <div
                        className="text-2xl font-bold mb-1"
                        style={{ fontFamily: "'Sora', sans-serif", color: colors.text.primary }}
                    >
                        {electionInfo.votedCount.toLocaleString()}
                    </div>
                    <div
                        className="text-xs font-medium"
                        style={{ color: colors.text.tertiary, fontFamily: "'Inter', sans-serif" }}
                    >
                        Voted
                    </div>
                </div>
                <div
                    className="p-4 rounded-xl text-center"
                    style={{
                        backgroundColor: colors.bg.elevated,
                        border: `1px solid ${colors.border.subtle}`
                    }}
                >
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <Users className="w-4 h-4" style={{ color: colors.text.tertiary }} />
                    </div>
                    <div
                        className="text-2xl font-bold mb-1"
                        style={{ fontFamily: "'Sora', sans-serif", color: colors.text.primary }}
                    >
                        {electionInfo.totalVoters.toLocaleString()}
                    </div>
                    <div
                        className="text-xs font-medium"
                        style={{ color: colors.text.tertiary, fontFamily: "'Inter', sans-serif" }}
                    >
                        Total Voters
                    </div>
                </div>
            </div>
        </div>
    );
};
