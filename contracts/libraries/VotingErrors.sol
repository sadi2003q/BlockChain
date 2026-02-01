// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

/**
 * @title VotingErrors
 * @author VoteSecure Team
 * @notice Custom errors for the VoteSecure platform
 * @dev Using custom errors instead of revert strings saves gas
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 *                              VOTESECURE ERRORS
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Gas Comparison:
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │  require(condition, "Error message")  →  ~200+ gas per character           │
 * │  if (!condition) revert CustomError() →  ~4 bytes selector only            │
 * └─────────────────────────────────────────────────────────────────────────────┘
 * 
 * Error Naming Convention:
 * - VoteSecure__[Category]__[SpecificError]
 * - This makes errors easily searchable and debuggable
 * 
 * Usage:
 * - import "../libraries/VotingErrors.sol";
 * - revert VotingErrors.VoteSecure__Auth__Unauthorized();
 */
library VotingErrors {
    
    // ═══════════════════════════════════════════════════════════════════════════
    //                              GENERAL ERRORS
    // ═══════════════════════════════════════════════════════════════════════════

    /// @notice Thrown when caller is not authorized
    error VoteSecure__Auth__Unauthorized();

    /// @notice Thrown when caller is not the owner/admin
    error VoteSecure__Auth__NotOwner();

    /// @notice Thrown when caller lacks specific permission
    /// @param required The permission that was required
    /// @param caller The address that attempted the action
    error VoteSecure__Auth__MissingPermission(uint256 required, address caller);

    /// @notice Thrown when an admin is not active
    error VoteSecure__Auth__AdminNotActive();

    /// @notice Thrown when address is zero
    error VoteSecure__General__ZeroAddress();

    /// @notice Thrown when string is empty
    error VoteSecure__General__EmptyString();

    /// @notice Thrown when array is empty
    error VoteSecure__General__EmptyArray();

    /// @notice Thrown when value is zero
    error VoteSecure__General__ZeroValue();

    /// @notice Thrown when contract is paused
    error VoteSecure__General__ContractPaused();

    /// @notice Thrown when contract is not paused
    error VoteSecure__General__ContractNotPaused();

    /// @notice Thrown when an operation is already done
    error VoteSecure__General__AlreadyDone();

    /// @notice Thrown when reentrancy is detected
    error VoteSecure__General__ReentrancyDetected();

    // ═══════════════════════════════════════════════════════════════════════════
    //                              ADMIN ERRORS
    // ═══════════════════════════════════════════════════════════════════════════

    /// @notice Thrown when admin already exists
    /// @param adminId The admin ID that already exists
    error VoteSecure__Admin__AlreadyExists(string adminId);

    /// @notice Thrown when admin is not found
    /// @param adminId The admin ID that was not found
    error VoteSecure__Admin__NotFound(string adminId);

    /// @notice Thrown when admin wallet is already registered
    /// @param wallet The wallet address that is already registered
    error VoteSecure__Admin__WalletAlreadyRegistered(address wallet);

    /// @notice Thrown when admin wallet is not found
    /// @param wallet The wallet address that was not found
    error VoteSecure__Admin__WalletNotFound(address wallet);

    /// @notice Thrown when trying to remove the last super admin
    error VoteSecure__Admin__CannotRemoveLastSuperAdmin();

    /// @notice Thrown when admin tries to remove themselves
    error VoteSecure__Admin__CannotRemoveSelf();

    /// @notice Thrown when admin is not active
    error VoteSecure__Admin__NotActive();

    // ═══════════════════════════════════════════════════════════════════════════
    //                              VOTER ERRORS
    // ═══════════════════════════════════════════════════════════════════════════

    /// @notice Thrown when voter already exists
    /// @param userId The voter ID that already exists
    error VoteSecure__Voter__AlreadyRegistered(string userId);

    /// @notice Thrown when voter is not found
    /// @param userId The voter ID that was not found
    error VoteSecure__Voter__NotFound(string userId);

    /// @notice Thrown when voter is not verified
    /// @param userId The voter ID that is not verified
    error VoteSecure__Voter__NotVerified(string userId);

    /// @notice Thrown when voter is already verified
    /// @param userId The voter ID that is already verified
    error VoteSecure__Voter__AlreadyVerified(string userId);

    /// @notice Thrown when wallet address already registered
    /// @param wallet The wallet address that is already registered
    error VoteSecure__Voter__WalletAlreadyRegistered(address wallet);

    /// @notice Thrown when voter is not eligible
    /// @param userId The voter ID
    /// @param reason The reason for ineligibility
    error VoteSecure__Voter__NotEligible(string userId, string reason);

    /// @notice Thrown when verification status transition is invalid
    /// @param current Current status
    /// @param attempted Attempted new status
    error VoteSecure__Voter__InvalidStatusTransition(uint8 current, uint8 attempted);

    // ═══════════════════════════════════════════════════════════════════════════
    //                              ELECTION ERRORS
    // ═══════════════════════════════════════════════════════════════════════════

    /// @notice Thrown when election already exists
    /// @param electionId The election ID that already exists
    error VoteSecure__Election__AlreadyExists(string electionId);

    /// @notice Thrown when election is not found
    /// @param electionId The election ID that was not found
    error VoteSecure__Election__NotFound(string electionId);

    /// @notice Thrown when election is not in expected status
    /// @param electionId The election ID
    /// @param expected The expected status
    /// @param actual The actual status
    error VoteSecure__Election__InvalidStatus(string electionId, uint8 expected, uint8 actual);

    /// @notice Thrown when election timeline is invalid
    /// @param reason Explanation of why timeline is invalid
    error VoteSecure__Election__InvalidTimeline(string reason);

    /// @notice Thrown when voting has not started
    /// @param electionId The election ID
    /// @param votingStart When voting starts
    error VoteSecure__Election__VotingNotStarted(string electionId, uint256 votingStart);

    /// @notice Thrown when voting has ended
    /// @param electionId The election ID
    /// @param votingEnd When voting ended
    error VoteSecure__Election__VotingEnded(string electionId, uint256 votingEnd);

    /// @notice Thrown when registration period has ended
    /// @param electionId The election ID
    error VoteSecure__Election__RegistrationClosed(string electionId);

    /// @notice Thrown when registration period has not started
    /// @param electionId The election ID
    error VoteSecure__Election__RegistrationNotOpen(string electionId);

    /// @notice Thrown when results are already published
    /// @param electionId The election ID
    error VoteSecure__Election__ResultsAlreadyPublished(string electionId);

    /// @notice Thrown when trying to publish results before voting ends
    /// @param electionId The election ID
    error VoteSecure__Election__VotingNotCompleted(string electionId);

    // ═══════════════════════════════════════════════════════════════════════════
    //                              CANDIDATE ERRORS
    // ═══════════════════════════════════════════════════════════════════════════

    /// @notice Thrown when candidate already exists
    /// @param candidateId The candidate ID
    error VoteSecure__Candidate__AlreadyRegistered(string candidateId);

    /// @notice Thrown when candidate is not found
    /// @param candidateId The candidate ID
    error VoteSecure__Candidate__NotFound(string candidateId);

    /// @notice Thrown when candidate is not approved
    /// @param candidateId The candidate ID
    error VoteSecure__Candidate__NotApproved(string candidateId);

    /// @notice Thrown when candidate is disqualified
    /// @param candidateId The candidate ID
    /// @param reason The disqualification reason
    error VoteSecure__Candidate__Disqualified(string candidateId, string reason);

    /// @notice Thrown when candidate status transition is invalid
    /// @param candidateId The candidate ID
    /// @param current Current status
    /// @param attempted Attempted new status
    error VoteSecure__Candidate__InvalidStatusTransition(string candidateId, uint8 current, uint8 attempted);

    /// @notice Thrown when candidate is already in election
    /// @param candidateId The candidate ID
    /// @param electionId The election ID
    error VoteSecure__Candidate__AlreadyInElection(string candidateId, string electionId);

    // ═══════════════════════════════════════════════════════════════════════════
    //                              VOTING ERRORS
    // ═══════════════════════════════════════════════════════════════════════════

    /// @notice Thrown when voter has already voted in this election
    /// @param userId The user ID
    /// @param electionId The election ID
    error VoteSecure__Vote__AlreadyVoted(string userId, string electionId);

    /// @notice Thrown when vote is invalid
    /// @param reason The reason why vote is invalid
    error VoteSecure__Vote__Invalid(string reason);

    /// @notice Thrown when candidate is not valid for election
    /// @param candidateId The candidate ID
    /// @param electionId The election ID
    error VoteSecure__Vote__InvalidCandidate(string candidateId, string electionId);

    /// @notice Thrown when vote hash verification fails
    error VoteSecure__Vote__HashMismatch();

    /// @notice Thrown when trying to change vote (not allowed)
    error VoteSecure__Vote__CannotChange();

    // ═══════════════════════════════════════════════════════════════════════════
    //                              RESULT ERRORS
    // ═══════════════════════════════════════════════════════════════════════════

    /// @notice Thrown when results are not yet published
    /// @param electionId The election ID
    error VoteSecure__Result__NotPublished(string electionId);

    /// @notice Thrown when trying to modify published results
    /// @param electionId The election ID
    error VoteSecure__Result__AlreadyPublished(string electionId);

    /// @notice Thrown when result calculation fails
    /// @param electionId The election ID
    /// @param reason The failure reason
    error VoteSecure__Result__CalculationFailed(string electionId, string reason);
}
