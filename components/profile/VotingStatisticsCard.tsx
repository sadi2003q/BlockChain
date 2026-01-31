import React from 'react';
import {_colorType} from "@/lib/_colors";
import {useRouter} from "next/navigation";

interface VotingStatisticsCardProps {
    totalVotesParticipated: number;
    lastVoted?: Date;
    registeredDate: Date;
    isVerified: boolean;
    colors: _colorType;
}

export const VotingStatisticsCard: React.FC<VotingStatisticsCardProps> = (
    {totalVotesParticipated, lastVoted, registeredDate, isVerified, colors}) => {

    const router = useRouter();

    return (
        <div
            className="p-4 sm:p-6 rounded-2xl space-y-4"
            style={{
                backgroundColor: colors.bg.card,
                border: `1px solid ${colors.border.subtle}`
            }}
        >
            <h3
                className="text-base sm:text-lg font-bold mb-4"
                style={{ fontFamily: "'Sora', sans-serif", color: colors.text.primary }}
            >
                Voting Statistics
            </h3>

            {isVerified ? (
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <span
                            className="text-sm"
                            style={{ color: colors.text.secondary, fontFamily: "'Inter', sans-serif" }}
                        >
                            Total Votes Cast
                        </span>
                        <span
                            className="font-bold"
                            style={{ color: colors.accent.primary, fontFamily: "'Inter', sans-serif" }}
                        >
                            {totalVotesParticipated}
                        </span>
                    </div>

                    <div
                        className="h-px"
                        style={{ backgroundColor: colors.border.subtle }}
                    />

                    <div className="flex justify-between items-center">
                        <span
                            className="text-sm"
                            style={{ color: colors.text.secondary, fontFamily: "'Inter', sans-serif" }}
                        >
                            Last Voted
                        </span>
                        <span
                            className="font-medium text-sm"
                            style={{ color: colors.text.primary, fontFamily: "'Inter', sans-serif" }}
                        >
                            {lastVoted ? lastVoted.toLocaleDateString() : 'N/A'}
                        </span>
                    </div>

                    <div
                        className="h-px"
                        style={{ backgroundColor: colors.border.subtle }}
                    />

                    <div className="flex justify-between items-center">
                        <span
                            className="text-sm"
                            style={{ color: colors.text.secondary, fontFamily: "'Inter', sans-serif" }}
                        >
                            Member Since
                        </span>
                        <span
                            className="font-medium text-sm"
                            style={{ color: colors.text.primary, fontFamily: "'Inter', sans-serif" }}
                        >
                            {registeredDate.toLocaleDateString()}
                        </span>
                    </div>
                </div>
            ) : (
                <div className="space-y-3">
                    <p
                        className="text-sm"
                        style={{ color: colors.text.secondary, fontFamily: "'Inter', sans-serif" }}
                    >
                        You are not verified yet. Complete your verification to participate in voting.
                    </p>

                    {/* Verification Button */}
                    <button
                        onClick={() => router.push('/verification')} // navigate to your verification page
                        className="px-4 py-2 rounded-lg font-semibold"
                        style={{
                            backgroundColor: colors.accent.warning || '#f59e0b',
                            color: colors.text.primary,
                            fontFamily: "'Inter', sans-serif",
                        }}
                    >
                        Verify Account
                    </button>
                </div>
            )}
        </div>
    );
};
