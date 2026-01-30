import React from "react";
import { getColor } from "@/lib/_colors";
import { CheckCircle, Award } from "lucide-react";
import { Candidate } from "@/app/VotingPortal/page";

interface CandidateCardProps {
    isDarkMode: boolean;
    candidate: Candidate;
    isSelected: boolean;
    hasVoted: boolean;
    onSelect: () => void;
}

export const CandidateCard: React.FC<CandidateCardProps> = ({
    isDarkMode,
    candidate,
    isSelected,
    hasVoted,
    onSelect
}) => {
    const colors = getColor(isDarkMode);

    return (
        <div
            onClick={onSelect}
            className={`p-6 rounded-2xl transition-all duration-300 ${
                hasVoted ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:scale-[1.02]'
            }`}
            style={{
                backgroundColor: isSelected ? colors.bg.elevated : colors.bg.tertiary,
                border: `2px solid ${isSelected ? colors.accent.primary : colors.border.subtle}`,
                boxShadow: isSelected ? `0 12px 32px ${colors.glow.primary}` : 'none'
            }}
        >
            <div className="flex items-start gap-5">
                {/* Candidate Avatar - Larger */}
                <div className="shrink-0">
                    <div
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center font-bold text-2xl sm:text-3xl transition-all duration-300"
                        style={{
                            backgroundColor: isSelected ? colors.accent.primary : colors.bg.elevated,
                            color: isSelected ? '#ffffff' : colors.text.primary,
                            border: isSelected ? 'none' : `2px solid ${colors.border.subtle}`,
                            boxShadow: isSelected ? `0 4px 16px ${colors.glow.primary}` : 'none'
                        }}
                    >
                        {candidate.image}
                    </div>
                </div>

                {/* Candidate Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex-1 min-w-0">
                            <h3
                                className="text-lg sm:text-xl font-bold mb-1"
                                style={{ fontFamily: "'Sora', sans-serif", color: colors.text.primary }}
                            >
                                {candidate.name}
                            </h3>
                            <div
                                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
                                style={{
                                    backgroundColor: isSelected ? `${colors.accent.primary}20` : colors.bg.primary,
                                    color: isSelected ? colors.accent.primary : colors.text.secondary,
                                    fontFamily: "'Inter', sans-serif"
                                }}
                            >
                                {candidate.party}
                            </div>
                        </div>

                        {/* Selection Indicator */}
                        {isSelected && (
                            <div
                                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center animate-fadeIn shrink-0"
                                style={{ 
                                    backgroundColor: colors.accent.primary,
                                    boxShadow: `0 4px 12px ${colors.glow.primary}`
                                }}
                            >
                                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            </div>
                        )}
                    </div>

                    <p
                        className="text-sm sm:text-base mb-3 leading-relaxed"
                        style={{ color: colors.text.secondary, fontFamily: "'Inter', sans-serif" }}
                    >
                        {candidate.platform}
                    </p>

                    <div className="flex items-center gap-2">
                        <Award className="w-4 h-4" style={{ color: colors.accent.secondary }} />
                        <span
                            className="text-xs font-semibold"
                            style={{ color: colors.text.tertiary, fontFamily: "'Inter', sans-serif" }}
                        >
                            Running for {candidate.position}
                        </span>
                    </div>
                </div>
            </div>

            {/* Selection Bar */}
            {isSelected && (
                <div
                    className="mt-4 h-1 rounded-full animate-fadeIn"
                    style={{ 
                        backgroundColor: colors.accent.primary,
                        boxShadow: `0 0 12px ${colors.glow.primary}`
                    }}
                />
            )}
        </div>
    );
};
