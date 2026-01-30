import React from "react";
import { getColor } from "@/lib/_colors";
import { Vote } from "lucide-react";
import { ElectionInfo } from "@/app/VotingPortal/page";

interface ElectionInfoCardProps {
    isDarkMode: boolean;
    electionInfo: ElectionInfo;
}

export const ElectionInfoCard: React.FC<ElectionInfoCardProps> = ({ isDarkMode, electionInfo }) => {
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
            <div className="flex items-center gap-3 mb-5">
                <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ 
                        backgroundColor: colors.accent.primary,
                        boxShadow: `0 4px 16px ${colors.glow.primary}`
                    }}
                >
                    <Vote className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h2
                        className="text-lg font-bold"
                        style={{ fontFamily: "'Sora', sans-serif", color: colors.text.primary }}
                    >
                        Active Election
                    </h2>
                    <p
                        className="text-xs font-medium"
                        style={{ color: colors.accent.primary, fontFamily: "'Inter', sans-serif" }}
                    >
                        Official Ballot
                    </p>
                </div>
            </div>

            <h3
                className="text-xl font-bold mb-3"
                style={{ fontFamily: "'Sora', sans-serif", color: colors.text.primary }}
            >
                {electionInfo.title}
            </h3>

            <p
                className="text-sm mb-5 leading-relaxed"
                style={{ color: colors.text.secondary, fontFamily: "'Inter', sans-serif" }}
            >
                {electionInfo.description}
            </p>

            <div className="space-y-3">
                <div 
                    className="flex items-center justify-between p-3 rounded-xl"
                    style={{ backgroundColor: colors.bg.elevated }}
                >
                    <span
                        className="text-sm font-medium"
                        style={{ color: colors.text.tertiary, fontFamily: "'Inter', sans-serif" }}
                    >
                        Start Date
                    </span>
                    <span
                        className="text-sm font-bold"
                        style={{ color: colors.text.primary, fontFamily: "'Inter', sans-serif" }}
                    >
                        {electionInfo.startDate}
                    </span>
                </div>
                <div 
                    className="flex items-center justify-between p-3 rounded-xl"
                    style={{ backgroundColor: colors.bg.elevated }}
                >
                    <span
                        className="text-sm font-medium"
                        style={{ color: colors.text.tertiary, fontFamily: "'Inter', sans-serif" }}
                    >
                        End Date
                    </span>
                    <span
                        className="text-sm font-bold"
                        style={{ color: colors.text.primary, fontFamily: "'Inter', sans-serif" }}
                    >
                        {electionInfo.endDate}
                    </span>
                </div>
            </div>
        </div>
    );
};
