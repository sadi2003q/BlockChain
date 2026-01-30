import React from "react";
import { getColor } from "@/lib/_colors";
import { CheckCircle, Shield, ExternalLink } from "lucide-react";

interface VoteSuccessAlertProps {
    isDarkMode: boolean;
}

export const VoteSuccessAlert: React.FC<VoteSuccessAlertProps> = ({ isDarkMode }) => {
    const colors = getColor(isDarkMode);

    return (
        <div
            className="mb-8 p-6 rounded-2xl animate-fadeInUp"
            style={{
                backgroundColor: colors.bg.card,
                border: `2px solid ${colors.accent.success}`,
                boxShadow: `0 12px 32px rgba(34, 197, 94, 0.2)`
            }}
        >
            <div className="flex items-start gap-4">
                <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                    style={{ 
                        backgroundColor: `${colors.accent.success}20`,
                        boxShadow: `0 4px 16px rgba(34, 197, 94, 0.3)`
                    }}
                >
                    <CheckCircle className="w-7 h-7" style={{ color: colors.accent.success }} />
                </div>
                <div className="flex-1">
                    <h3
                        className="text-xl font-bold mb-2"
                        style={{ fontFamily: "'Sora', sans-serif", color: colors.text.primary }}
                    >
                        🎉 Vote Successfully Cast!
                    </h3>
                    <p
                        className="text-sm mb-4 leading-relaxed"
                        style={{ color: colors.text.secondary, fontFamily: "'Inter', sans-serif" }}
                    >
                        Your vote has been securely recorded on the blockchain. Thank you for participating in this election!
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                        <div
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium"
                            style={{
                                backgroundColor: colors.bg.elevated,
                                color: colors.text.tertiary,
                                border: `1px solid ${colors.border.subtle}`
                            }}
                        >
                            <Shield className="w-4 h-4" style={{ color: colors.accent.success }} />
                            TX: 0x7a3f...2e9c
                        </div>
                        <button
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105"
                            style={{
                                backgroundColor: `${colors.accent.secondary}20`,
                                color: colors.accent.secondary,
                            }}
                        >
                            <ExternalLink className="w-4 h-4" />
                            View on Explorer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
