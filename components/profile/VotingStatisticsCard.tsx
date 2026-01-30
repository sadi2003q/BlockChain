import React from 'react';

interface VotingStatisticsCardProps {
    totalVotesParticipated: number;
    lastVoted?: Date;
    registeredDate: Date;
    colors: any;
}

export const VotingStatisticsCard: React.FC<VotingStatisticsCardProps> = ({
    totalVotesParticipated,
    lastVoted,
    registeredDate,
    colors
}) => {
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
        </div>
    );
};