import React from "react";
import { getColor } from "@/lib/_colors";
import { AlertCircle } from "lucide-react";
import { Candidate } from "@/app/VotingPortal/page";

interface ConfirmVoteModalProps {
    isDarkMode: boolean;
    candidate: Candidate | undefined;
    onConfirm: () => void;
    onCancel: () => void;
}

export const ConfirmVoteModal: React.FC<ConfirmVoteModalProps> = ({
    isDarkMode,
    candidate,
    onConfirm,
    onCancel
}) => {
    const colors = getColor(isDarkMode);

    if (!candidate) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-6 animate-fadeIn"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
            onClick={onCancel}
        >
            <div
                className="max-w-md w-full p-8 rounded-3xl animate-fadeInUp"
                style={{
                    backgroundColor: colors.bg.card,
                    border: `2px solid ${colors.accent.primary}`,
                    boxShadow: `0 32px 64px ${colors.glow.primary}`
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="text-center mb-6">
                    <div
                        className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                        style={{
                            backgroundColor: `${colors.accent.primary}15`,
                            border: `3px solid ${colors.accent.primary}`
                        }}
                    >
                        <AlertCircle className="w-10 h-10" style={{ color: colors.accent.primary }} />
                    </div>
                    <h3
                        className="text-2xl font-bold mb-2"
                        style={{ fontFamily: "'Sora', sans-serif", color: colors.text.primary }}
                    >
                        Confirm Your Vote
                    </h3>
                    <p
                        className="text-sm leading-relaxed"
                        style={{ color: colors.text.secondary, fontFamily: "'Inter', sans-serif" }}
                    >
                        Please review your selection carefully.<br />
                        <strong style={{ color: colors.accent.warning }}>This action cannot be undone.</strong>
                    </p>
                </div>

                {/* Selected Candidate */}
                <div
                    className="p-5 rounded-2xl mb-6"
                    style={{
                        backgroundColor: colors.bg.elevated,
                        border: `2px solid ${colors.accent.primary}40`
                    }}
                >
                    <div className="flex items-center gap-4">
                        <div
                            className="w-14 h-14 rounded-xl flex items-center justify-center font-bold text-lg"
                            style={{
                                backgroundColor: colors.accent.primary,
                                color: '#ffffff',
                                boxShadow: `0 4px 16px ${colors.glow.primary}`
                            }}
                        >
                            {candidate.image}
                        </div>
                        <div>
                            <div
                                className="font-bold text-lg"
                                style={{ fontFamily: "'Sora', sans-serif", color: colors.text.primary }}
                            >
                                {candidate.name}
                            </div>
                            <div
                                className="text-sm"
                                style={{ color: colors.text.tertiary, fontFamily: "'Inter', sans-serif" }}
                            >
                                {candidate.party}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-4">
                    <button
                        onClick={onCancel}
                        className="flex-1 py-4 rounded-xl font-semibold text-base transition-all duration-300 hover:scale-105"
                        style={{
                            backgroundColor: colors.bg.tertiary,
                            color: colors.text.primary,
                            fontFamily: "'Inter', sans-serif",
                            border: `2px solid ${colors.border.medium}`
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 py-4 rounded-xl font-bold text-base transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                        style={{
                            backgroundColor: colors.accent.primary,
                            color: '#ffffff',
                            fontFamily: "'Inter', sans-serif",
                            boxShadow: `0 12px 32px ${colors.glow.primary}`
                        }}
                    >
                        Confirm Vote
                    </button>
                </div>
            </div>
        </div>
    );
};
