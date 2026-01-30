import {CandidateCard} from "./CandidateCard";
import React from "react";
import {Candidate} from "@/app/VotingPortal/page";

type ICandidateList = {
    candidates: Candidate[]
    isDarkMode: boolean;
    hasVoted: boolean;
    setSelectedCandidate: (value: React.SetStateAction<number | null>) => void
    selectedCandidate: number | null
}



export const CandidateList = (
    {candidates, isDarkMode, hasVoted, setSelectedCandidate, selectedCandidate}: ICandidateList
) => {



    return (
        <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 relative z-10">
            {candidates.map((candidate, index) => (
                <div
                    key={candidate.id}
                    className="animate-fadeInUp"
                    style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                >
                    <CandidateCard
                        isDarkMode={isDarkMode}
                        candidate={candidate}
                        isSelected={selectedCandidate === candidate.id}
                        hasVoted={hasVoted}
                        onSelect={() => !hasVoted && setSelectedCandidate(candidate.id)}
                    />
                </div>
            ))}
        </div>
    );
}