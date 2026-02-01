// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

/**
 * @title VotingTypes
 * @author VoteSecure Team
 * @notice Contains all enums and structs used across the VoteSecure platform
 * @dev This library centralizes all type definitions for easy maintenance and updates
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 *                              VOTESECURE TYPES
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Architecture:
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │  VotingTypes.sol                                                            │
 * │  ├── Enums (Gender, Verification, Admin Roles, Election Status, etc.)      │
 * │  ├── Structs (User, Admin, Candidate, Election, Vote, Result)              │
 * │  └── Constants (easily configurable values)                                │
 * └─────────────────────────────────────────────────────────────────────────────┘
 */
library VotingTypes {
    
    // ═══════════════════════════════════════════════════════════════════════════
    //                              USER ENUMS
    // ═══════════════════════════════════════════════════════════════════════════
    
    /**
     * @notice Gender options for users
     * @dev Matches MongoDB schema: "MALE" | "FEMALE" | "THIRD_GENDER"
     */
    enum Gender {
        MALE,           // 0
        FEMALE,         // 1
        THIRD_GENDER    // 2
    }
    
    /**
     * @notice User verification status
     * @dev Matches MongoDB schema: "pending" | "verified" | "rejected"
     * Note: Stored as enum in Solidity, mapped to lowercase strings in frontend
     */
    enum VerificationStatus {
        PENDING,        // 0 → "pending" - Awaiting verification
        VERIFIED,       // 1 → "verified" - Approved and eligible
        REJECTED        // 2 → "rejected" - Verification failed
    }
    
    // ═══════════════════════════════════════════════════════════════════════════
    //                              ADMIN ENUMS
    // ═══════════════════════════════════════════════════════════════════════════
    
    /**
     * @notice Admin role types
     * @dev Each role has specific permissions defined in the contract
     */
    enum AdminRole {
        SUPER_ADMIN,            // 0 - Full access
        ELECTION_ADMIN,         // 1 - Manage elections
        VERIFICATION_ADMIN,     // 2 - Verify voters
        RESULT_ADMIN,           // 3 - Publish results
        AUDITOR                 // 4 - View-only access
    }
    
    /**
     * @notice Admin permission flags
     * @dev Uses bitmask pattern for efficient permission checking
     * 
     * Permission Bitmap:
     * ┌────────────────────────────────────────────────────────────────┐
     * │ Bit 0: CREATE_ELECTION    │ Bit 5: START_VOTING              │
     * │ Bit 1: UPDATE_ELECTION    │ Bit 6: END_VOTING                │
     * │ Bit 2: DELETE_ELECTION    │ Bit 7: PUBLISH_RESULTS           │
     * │ Bit 3: APPROVE_CANDIDATE  │ Bit 8: VIEW_AUDIT_LOGS           │
     * │ Bit 4: VERIFY_VOTER       │                                   │
     * └────────────────────────────────────────────────────────────────┘
     */
    uint256 constant PERMISSION_CREATE_ELECTION = 1 << 0;    // 1
    uint256 constant PERMISSION_UPDATE_ELECTION = 1 << 1;    // 2
    uint256 constant PERMISSION_DELETE_ELECTION = 1 << 2;    // 4
    uint256 constant PERMISSION_APPROVE_CANDIDATE = 1 << 3;  // 8
    uint256 constant PERMISSION_REJECT_CANDIDATE = 1 << 4;   // 16
    uint256 constant PERMISSION_VERIFY_VOTER = 1 << 5;       // 32
    uint256 constant PERMISSION_START_VOTING = 1 << 6;       // 64
    uint256 constant PERMISSION_END_VOTING = 1 << 7;         // 128
    uint256 constant PERMISSION_PUBLISH_RESULTS = 1 << 8;    // 256
    uint256 constant PERMISSION_VIEW_AUDIT_LOGS = 1 << 9;    // 512
    
    // Combined permission sets for roles
    uint256 constant SUPER_ADMIN_PERMISSIONS = type(uint256).max; // All permissions
    uint256 constant ELECTION_ADMIN_PERMISSIONS = 
        PERMISSION_CREATE_ELECTION | 
        PERMISSION_UPDATE_ELECTION | 
        PERMISSION_START_VOTING | 
        PERMISSION_END_VOTING;
    uint256 constant VERIFICATION_ADMIN_PERMISSIONS = 
        PERMISSION_VERIFY_VOTER | 
        PERMISSION_APPROVE_CANDIDATE | 
        PERMISSION_REJECT_CANDIDATE;
    uint256 constant RESULT_ADMIN_PERMISSIONS = PERMISSION_PUBLISH_RESULTS;
    uint256 constant AUDITOR_PERMISSIONS = PERMISSION_VIEW_AUDIT_LOGS;
    
    // ═══════════════════════════════════════════════════════════════════════════
    //                              ELECTION ENUMS
    // ═══════════════════════════════════════════════════════════════════════════
    
    /**
     * @notice Types of elections
     * @dev Determines eligibility rules and scope
     */
    enum ElectionType {
        GENERAL,        // 0 - National/General elections
        LOCAL,          // 1 - Local body elections
        STUDENT,        // 2 - Student council elections
        INTERNAL,       // 3 - Organization internal elections
        REFERENDUM      // 4 - Public referendum
    }
    
    /**
     * @notice Geographic/organizational scope of election
     */
    enum ElectionScope {
        NATIONAL,       // 0
        STATE,          // 1
        DISTRICT,       // 2
        CONSTITUENCY,   // 3
        ORGANIZATION    // 4
    }
    
    /**
     * @notice Current status of an election
     * @dev State machine: UPCOMING -> ONGOING -> COMPLETED
     *                              -> CANCELLED (from any state)
     */
    enum ElectionStatus {
        DRAFT,              // 0 - Being created
        UPCOMING,           // 1 - Scheduled, not yet started
        REGISTRATION_OPEN,  // 2 - Candidate registration period
        ONGOING,            // 3 - Voting in progress
        VOTING_ENDED,       // 4 - Voting closed, awaiting results
        COMPLETED,          // 5 - Results published
        CANCELLED           // 6 - Election cancelled
    }
    
    // ═══════════════════════════════════════════════════════════════════════════
    //                              CANDIDATE ENUMS
    // ═══════════════════════════════════════════════════════════════════════════
    
    /**
     * @notice Candidate application status
     */
    enum CandidateStatus {
        PENDING,            // 0 - Application submitted
        APPROVED,           // 1 - Approved to participate
        REJECTED,           // 2 - Application rejected
        DISQUALIFIED,       // 3 - Disqualified during election
        WITHDRAWN           // 4 - Candidate withdrew
    }
    
    // ═══════════════════════════════════════════════════════════════════════════
    //                              STRUCTS - USER
    // ═══════════════════════════════════════════════════════════════════════════
    
    /**
     * @notice Voter information stored on-chain
     * @dev Minimal data for privacy; full data in MongoDB
     * 
     * MongoDB ↔ Blockchain Sync:
     * - MongoDB stores: Full name, email, phone, address details, documents, images
     * - Blockchain stores: Only userId, wallet, verification status (essential data)
     * 
     * @param userId Unique identifier from MongoDB (format: USR_xxxxxx)
     * @param walletAddress Ethereum address
     * @param verificationStatus Current verification status (pending/verified/rejected)
     * @param isVerified Quick check if voter is verified
     * @param registeredAt Timestamp of registration
     * @param verifiedAt Timestamp of verification (0 if not verified)
     */
    struct Voter {
        string userId;
        address walletAddress;
        VerificationStatus verificationStatus;
        bool isVerified;
        uint256 registeredAt;
        uint256 verifiedAt;
    }
    
    // ═══════════════════════════════════════════════════════════════════════════
    //                              STRUCTS - ELECTION
    // ═══════════════════════════════════════════════════════════════════════════
    
    /**
     * @notice Election timeline configuration
     * @dev All timestamps are Unix timestamps
     */
    struct ElectionTimeline {
        uint256 registrationStart;  // Candidate registration opens
        uint256 registrationEnd;    // Candidate registration closes
        uint256 votingStart;        // Voting begins
        uint256 votingEnd;          // Voting ends
    }
    
    /**
     * @notice Election statistics
     * @dev Updated in real-time during voting
     */
    struct ElectionStats {
        uint256 totalEligibleVoters;
        uint256 totalCandidates;
        uint256 totalVotesCast;
        uint256 lastUpdated;
    }
    
    /**
     * @notice Complete election information
     * @param electionId Unique identifier (matches MongoDB)
     * @param title Election title
     * @param electionType Type of election
     * @param scope Geographic/organizational scope
     * @param status Current status
     * @param timeline All important timestamps
     * @param stats Real-time statistics
     * @param createdBy Admin who created this election
     * @param isResultPublished Whether results are public
     */
    struct Election {
        string electionId;
        string title;
        ElectionType electionType;
        ElectionScope scope;
        ElectionStatus status;
        ElectionTimeline timeline;
        ElectionStats stats;
        address createdBy;
        bool isResultPublished;
    }
    
    // ═══════════════════════════════════════════════════════════════════════════
    //                              STRUCTS - CANDIDATE
    // ═══════════════════════════════════════════════════════════════════════════
    
    /**
     * @notice Candidate information
     * @dev Vote count is private until results are published
     */
    struct Candidate {
        string candidateId;
        string name;
        string electionId;
        address walletAddress;
        CandidateStatus status;
        string disqualificationReason;
        uint256 registeredAt;
        uint256 approvedAt;
    }
    
    // ═══════════════════════════════════════════════════════════════════════════
    //                              STRUCTS - VOTE
    // ═══════════════════════════════════════════════════════════════════════════
    
    /**
     * @notice Vote record (anonymized)
     * @dev For ANONYMITY: We only store the hash, not who voted for whom
     * 
     * The voteHash is computed as:
     * keccak256(abi.encodePacked(electionId, secret, candidateId))
     * 
     * This allows:
     * - Verification that a vote was cast
     * - Prevention of double voting
     * - Complete anonymity of voter choice
     */
    struct VoteRecord {
        bytes32 voteHash;           // Hash of the vote (anonymous)
        string electionId;          // Which election
        uint256 timestamp;          // When vote was cast
        bool isValid;               // Vote validity
    }
    
    // ═══════════════════════════════════════════════════════════════════════════
    //                              STRUCTS - RESULT
    // ═══════════════════════════════════════════════════════════════════════════
    
    /**
     * @notice Candidate result in an election
     */
    struct CandidateResult {
        string candidateId;
        uint256 voteCount;
        uint256 votePercentage;     // Stored as basis points (10000 = 100%)
        uint256 position;           // 1 = winner, 2 = runner-up, etc.
    }
    
    /**
     * @notice Complete election result
     */
    struct ElectionResult {
        string electionId;
        uint256 totalVotes;
        string winnerId;
        uint256 publishedAt;
        bool isPublished;
    }
    
    // ═══════════════════════════════════════════════════════════════════════════
    //                              HELPER FUNCTIONS
    // ═══════════════════════════════════════════════════════════════════════════
    
    /**
     * @notice Get default permissions for a role
     * @param role The admin role
     * @return permissions The permission bitmask
     */
    function getDefaultPermissions(AdminRole role) internal pure returns (uint256 permissions) {
        if (role == AdminRole.SUPER_ADMIN) return SUPER_ADMIN_PERMISSIONS;
        if (role == AdminRole.ELECTION_ADMIN) return ELECTION_ADMIN_PERMISSIONS;
        if (role == AdminRole.VERIFICATION_ADMIN) return VERIFICATION_ADMIN_PERMISSIONS;
        if (role == AdminRole.RESULT_ADMIN) return RESULT_ADMIN_PERMISSIONS;
        if (role == AdminRole.AUDITOR) return AUDITOR_PERMISSIONS;
        return 0;
    }
    
    /**
     * @notice Check if a permission is granted
     * @param permissions The permission bitmask
     * @param permission The permission to check
     * @return hasPermission True if permission is granted
     */
    function hasPermission(uint256 permissions, uint256 permission) internal pure returns (bool) {
        return (permissions & permission) == permission;
    }
}
