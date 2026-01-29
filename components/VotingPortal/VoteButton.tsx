import React from "react";
import { getColor } from "@/lib/_colors";
import { Vote, ArrowRight } from "lucide-react";

interface VoteButtonProps {
    isDarkMode: boolean;
    selectedCandidate: number | null;
    onClick: () => void;
}

export const VoteButton: React.FC<VoteButtonProps> = ({
    isDarkMode,
    selectedCandidate,
    onClick
}) => {
    const colors = getColor(isDarkMode);
    const isEnabled = selectedCandidate !== null;

    return (
        <button
            onClick={onClick}
            disabled={!isEnabled}
            className={`w-full py-5 rounded-2xl font-bold text-lg tracking-wide transition-all duration-300 flex items-center justify-center gap-3 ${
                isEnabled ? 'hover:scale-[1.02] hover:shadow-2xl' : 'opacity-50 cursor-not-allowed'
            }`}
            style={{
                backgroundColor: isEnabled ? colors.accent.primary : colors.bg.tertiary,
                color: isEnabled ? '#ffffff' : colors.text.muted,
                fontFamily: "'Inter', sans-serif",
                boxShadow: isEnabled ? `0 16px 40px ${colors.glow.primary}` : 'none',
                border: isEnabled ? 'none' : `2px solid ${colors.border.subtle}`
            }}
        >
            <Vote className="w-6 h-6" />
            {isEnabled ? 'Cast Your Vote Securely' : 'Select a Candidate to Vote'}
            {isEnabled && (
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            )}
        </button>
    );
};
