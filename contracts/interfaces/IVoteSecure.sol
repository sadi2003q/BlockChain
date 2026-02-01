// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "../libraries/VotingTypes.sol";

/**
 * @title IVoteSecure
 * @author VoteSecure Team
 * @notice Main interface for the VoteSecure voting platform
 * @dev All core contracts should implement this interface
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 *                              VOTESECURE INTERFACE
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * This interface defines the complete API for the voting system.
 * Implementing this interface ensures compatibility with:
 * - Frontend (Next.js)
 * - Backend (MongoDB sync)
 * - Testing (Hardhat/Postman)
 * 
 * Architecture:
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │                              IVoteSecure                                    │
 * │  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐                  │
 * │  │ Voter Mgmt    │  │ Election Mgmt │  │ Voting Ops    │                  │
 * │  │ - register    │  │ - create      │  │ - castVote    │                  │
 * │  │ - verify      │  │ - update      │  │ - getResults  │                  │
 * │  │ - getVoter    │  │ - manage      │  │ - publish     │                  │
 * │  └───────────────┘  └───────────────┘  └───────────────┘                  │
 * └─────────────────────────────────────────────────────────────────────────────┘
 */
interface IVoteSecure {
    
    // ═══════════════════════════════════════════════════════════════════════════
    //                              EVENTS
    // ═══════════════════════════════════════════════════════════════════════════
    
    // ─────────────────────────────────────────────────────────────────
    //                         VOTER EVENTS
    // ─────────────────────────────────────────────────────────────────
    
    /**
     * @notice Emitted when a new voter registers
     * @param userId Unique voter identifier
     * @param walletAddress Voter's wallet address
     * @param timestamp Registration timestamp
     */
    event VoterRegistered(
        string indexed userId,
        address indexed walletAddress,
        uint256 timestamp
    );
    
    /**
     * @notice Emitted when voter verification status changes
     * @param userId Voter identifier
     * @param oldStatus Previous verification status
     * @param newStatus New verification status
     * @param verifiedBy Admin who verified (if applicable)
     * @param timestamp Change timestamp
     */
    event VoterVerificationStatusChanged(
        string indexed userId,
        VotingTypes.VerificationStatus oldStatus,
        VotingTypes.VerificationStatus newStatus,
        address indexed verifiedBy,
        uint256 timestamp
    );
    
    // ─────────────────────────────────────────────────────────────────
    //                         ELECTION EVENTS
    // ─────────────────────────────────────────────────────────────────
    
    /**
     * @notice Emitted when a new election is created
     * @param electionId Unique election identifier
     * @param title Election title
     * @param electionType Type of election
     * @param createdBy Admin who created
     * @param timestamp Creation timestamp
     */
    event ElectionCreated(
        string indexed electionId,
        string title,
        VotingTypes.ElectionType electionType,
        address indexed createdBy,
        uint256 timestamp
    );
    
    /**
     * @notice Emitted when election status changes
     * @param electionId Election identifier
     * @param oldStatus Previous status
     * @param newStatus New status
     * @param changedBy Admin who changed
     * @param timestamp Change timestamp
     */
    event ElectionStatusChanged(
        string indexed electionId,
        VotingTypes.ElectionStatus oldStatus,
        VotingTypes.ElectionStatus newStatus,
        address indexed changedBy,
        uint256 timestamp
    );
    
    /**
     * @notice Emitted when election timeline is updated
     * @param electionId Election identifier
     * @param timeline New timeline
     * @param updatedBy Admin who updated
     */
    event ElectionTimelineUpdated(
        string indexed electionId,
        VotingTypes.ElectionTimeline timeline,
        address indexed updatedBy
    );
    
    // ─────────────────────────────────────────────────────────────────
    //                         CANDIDATE EVENTS
    // ─────────────────────────────────────────────────────────────────
    
    /**
     * @notice Emitted when a candidate registers for an election
     * @param candidateId Candidate identifier
     * @param electionId Election identifier
     * @param name Candidate name
     * @param walletAddress Candidate's wallet
     * @param timestamp Registration timestamp
     */
    event CandidateRegistered(
        string indexed candidateId,
        string indexed electionId,
        string name,
        address indexed walletAddress,
        uint256 timestamp
    );
    
    /**
     * @notice Emitted when candidate status changes
     * @param candidateId Candidate identifier
     * @param oldStatus Previous status
     * @param newStatus New status
     * @param reason Reason for change (if rejected/disqualified)
     * @param changedBy Admin who changed
     */
    event CandidateStatusChanged(
        string indexed candidateId,
        VotingTypes.CandidateStatus oldStatus,
        VotingTypes.CandidateStatus newStatus,
        string reason,
        address indexed changedBy
    );
    
    // ─────────────────────────────────────────────────────────────────
    //                         VOTING EVENTS
    // ─────────────────────────────────────────────────────────────────
    
    /**
     * @notice Emitted when a vote is cast (anonymous - no voter info)
     * @dev For ANONYMITY: Does NOT reveal who voted for whom
     * @param electionId Election identifier
     * @param voteHash Hash of the vote (for verification)
     * @param timestamp Vote timestamp
     */
    event VoteCast(
        string indexed electionId,
        bytes32 indexed voteHash,
        uint256 timestamp
    );
    
    // ─────────────────────────────────────────────────────────────────
    //                         RESULT EVENTS
    // ─────────────────────────────────────────────────────────────────
    
    /**
     * @notice Emitted when election results are published
     * @param electionId Election identifier
     * @param winnerId Winner's candidate ID
     * @param totalVotes Total votes cast
     * @param publishedBy Admin who published
     * @param timestamp Publish timestamp
     */
    event ResultsPublished(
        string indexed electionId,
        string winnerId,
        uint256 totalVotes,
        address indexed publishedBy,
        uint256 timestamp
    );
    
    // ═══════════════════════════════════════════════════════════════════════════
    //                              VOTER FUNCTIONS
    // ═══════════════════════════════════════════════════════════════════════════
    
    /**
     * @notice Register a new voter
     * @dev Called by the voter themselves or by an authorized party
     * @param userId Unique voter identifier (from MongoDB)
     * @param walletAddress Voter's Ethereum wallet address
     * @return success True if registration successful
     * 
     * Requirements:
     * - userId must not be empty
     * - userId must not already exist
     * - walletAddress must not be zero address
     * - walletAddress must not already be registered
     */
    function registerVoter(
        string calldata userId,
        address walletAddress
    ) external returns (bool success);
    
    /**
     * @notice Update voter verification status
     * @dev Only callable by admins with VERIFY_VOTER permission
     * @param userId Voter identifier
     * @param newStatus New verification status
     * @return success True if update successful
     * 
     * Requirements:
     * - Caller must have VERIFY_VOTER permission
     * - Voter must exist
     * - Status transition must be valid
     */
    function updateVoterVerification(
        string calldata userId,
        VotingTypes.VerificationStatus newStatus
    ) external returns (bool success);
    
    /**
     * @notice Get voter information
     * @param userId Voter identifier
     * @return voter The voter struct
     */
    function getVoter(string calldata userId) external view returns (VotingTypes.Voter memory voter);
    
    /**
     * @notice Check if a voter exists
     * @param userId Voter identifier
     * @return exists True if voter exists
     */
    function voterExists(string calldata userId) external view returns (bool exists);
    
    /**
     * @notice Check if a voter is verified
     * @param userId Voter identifier
     * @return isVerified True if voter is verified
     */
    function isVoterVerified(string calldata userId) external view returns (bool isVerified);
    
    // ═══════════════════════════════════════════════════════════════════════════
    //                              ELECTION FUNCTIONS
    // ═══════════════════════════════════════════════════════════════════════════
    
    /**
     * @notice Create a new election
     * @dev Only callable by admins with CREATE_ELECTION permission
     * @param electionId Unique election identifier (from MongoDB)
     * @param title Election title
     * @param electionType Type of election
     * @param scope Geographic/organizational scope
     * @param timeline Election timeline
     * @return success True if creation successful
     * 
     * Requirements:
     * - Caller must have CREATE_ELECTION permission
     * - electionId must not already exist
     * - Timeline must be valid (start < end, etc.)
     */
    function createElection(
        string calldata electionId,
        string calldata title,
        VotingTypes.ElectionType electionType,
        VotingTypes.ElectionScope scope,
        VotingTypes.ElectionTimeline calldata timeline
    ) external returns (bool success);
    
    /**
     * @notice Update election status
     * @dev Only callable by admins with appropriate permissions
     * @param electionId Election identifier
     * @param newStatus New election status
     * @return success True if update successful
     */
    function updateElectionStatus(
        string calldata electionId,
        VotingTypes.ElectionStatus newStatus
    ) external returns (bool success);
    
    /**
     * @notice Get election information
     * @param electionId Election identifier
     * @return election The election struct
     */
    function getElection(string calldata electionId) external view returns (VotingTypes.Election memory election);
    
    /**
     * @notice Check if an election exists
     * @param electionId Election identifier
     * @return exists True if election exists
     */
    function electionExists(string calldata electionId) external view returns (bool exists);
    
    /**
     * @notice Get current election status
     * @param electionId Election identifier
     * @return status The current status
     */
    function getElectionStatus(string calldata electionId) external view returns (VotingTypes.ElectionStatus status);
    
    // ═══════════════════════════════════════════════════════════════════════════
    //                              CANDIDATE FUNCTIONS
    // ═══════════════════════════════════════════════════════════════════════════
    
    /**
     * @notice Register a candidate for an election
     * @param candidateId Unique candidate identifier
     * @param name Candidate name
     * @param electionId Election to register for
     * @param walletAddress Candidate's wallet address
     * @return success True if registration successful
     * 
     * Requirements:
     * - Election must exist and be in registration period
     * - Candidate must not already be registered for this election
     */
    function registerCandidate(
        string calldata candidateId,
        string calldata name,
        string calldata electionId,
        address walletAddress
    ) external returns (bool success);
    
    /**
     * @notice Approve a candidate
     * @dev Only callable by admins with APPROVE_CANDIDATE permission
     * @param candidateId Candidate identifier
     * @return success True if approval successful
     */
    function approveCandidate(string calldata candidateId) external returns (bool success);
    
    /**
     * @notice Reject a candidate
     * @dev Only callable by admins with REJECT_CANDIDATE permission
     * @param candidateId Candidate identifier
     * @param reason Rejection reason
     * @return success True if rejection successful
     */
    function rejectCandidate(
        string calldata candidateId,
        string calldata reason
    ) external returns (bool success);
    
    /**
     * @notice Get candidate information
     * @param candidateId Candidate identifier
     * @return candidate The candidate struct
     */
    function getCandidate(string calldata candidateId) external view returns (VotingTypes.Candidate memory candidate);
    
    /**
     * @notice Get all candidates for an election
     * @param electionId Election identifier
     * @return candidateIds Array of candidate IDs
     */
    function getElectionCandidates(string calldata electionId) external view returns (string[] memory candidateIds);
    
    // ═══════════════════════════════════════════════════════════════════════════
    //                              VOTING FUNCTIONS
    // ═══════════════════════════════════════════════════════════════════════════
    
    /**
     * @notice Cast a vote (anonymous)
     * @dev The vote is anonymous - only a hash is stored on-chain
     * @param electionId Election identifier
     * @param voteHash Hash of the vote (computed off-chain for anonymity)
     * @return success True if vote cast successful
     * 
     * Requirements:
     * - Caller must be a verified voter
     * - Election must be in ONGOING status
     * - Caller must not have already voted in this election
     * - Current time must be within voting period
     * 
     * ANONYMITY:
     * The voteHash is computed as: keccak256(abi.encodePacked(voterSecret, candidateId))
     * This ensures:
     * - No one can determine who voted for whom
     * - Voter can verify their vote was recorded
     * - Double voting is prevented
     */
    function castVote(
        string calldata electionId,
        bytes32 voteHash
    ) external returns (bool success);
    
    /**
     * @notice Check if voter has voted in an election
     * @param userId Voter identifier
     * @param electionId Election identifier
     * @return hasVoted True if voter has voted
     */
    function hasVoted(
        string calldata userId,
        string calldata electionId
    ) external view returns (bool);
    
    /**
     * @notice Get total votes cast in an election
     * @param electionId Election identifier
     * @return totalVotes Number of votes cast
     */
    function getTotalVotes(string calldata electionId) external view returns (uint256 totalVotes);
    
    // ═══════════════════════════════════════════════════════════════════════════
    //                              RESULT FUNCTIONS
    // ═══════════════════════════════════════════════════════════════════════════
    
    /**
     * @notice Publish election results
     * @dev Only callable by admins with PUBLISH_RESULTS permission
     * @param electionId Election identifier
     * @return success True if publish successful
     * 
     * Requirements:
     * - Caller must have PUBLISH_RESULTS permission
     * - Election must be in VOTING_ENDED status
     * - Results must not already be published
     */
    function publishResults(string calldata electionId) external returns (bool success);
    
    /**
     * @notice Get election results
     * @param electionId Election identifier
     * @return result The election result
     * 
     * Requirements:
     * - Results must be published
     */
    function getResults(string calldata electionId) external view returns (VotingTypes.ElectionResult memory result);
    
    /**
     * @notice Get candidate results for an election
     * @param electionId Election identifier
     * @return candidateResults Array of candidate results
     * 
     * Requirements:
     * - Results must be published
     */
    function getCandidateResults(string calldata electionId) external view returns (VotingTypes.CandidateResult[] memory candidateResults);
}
