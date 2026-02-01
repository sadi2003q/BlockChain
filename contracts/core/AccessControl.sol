// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "../libraries/VotingTypes.sol";
import "../libraries/VotingErrors.sol";

/**
 * @title AccessControl
 * @author VoteSecure Team
 * @notice Base contract for role-based access control
 * @dev Inherit this contract to add access control to your contracts
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 *                              ACCESS CONTROL
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * This contract provides:
 * - Ownership management (single owner)
 * - Role-based access control hooks
 * - Permission checking utilities
 * - Pausable functionality for emergencies
 * 
 * Security Features:
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │  ✓ Ownership transfer with 2-step confirmation                             │
 * │  ✓ Emergency pause mechanism                                               │
 * │  ✓ Reentrancy guard                                                        │
 * │  ✓ Permission-based function access                                        │
 * └─────────────────────────────────────────────────────────────────────────────┘
 * 
 * Inheritance Pattern:
 *   AccessControl
 *       ↓
 *   AdminRegistry / VoterRegistry / ElectionFactory / etc.
 */
abstract contract AccessControl {
    
    // ═══════════════════════════════════════════════════════════════════════════
    //                              STATE VARIABLES
    // ═══════════════════════════════════════════════════════════════════════════
    
    /// @notice Contract owner address
    address private _owner;
    
    /// @notice Pending owner for 2-step transfer
    address private _pendingOwner;
    
    /// @notice Contract paused state
    bool private _paused;
    
    /// @notice Reentrancy guard state
    uint256 private _reentrancyStatus;
    
    /// @dev Reentrancy guard constants
    uint256 private constant _NOT_ENTERED = 1;
    uint256 private constant _ENTERED = 2;
    
    // ═══════════════════════════════════════════════════════════════════════════
    //                              EVENTS
    // ═══════════════════════════════════════════════════════════════════════════
    
    /**
     * @notice Emitted when ownership is transferred
     * @param previousOwner Previous owner address
     * @param newOwner New owner address
     */
    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );
    
    /**
     * @notice Emitted when ownership transfer is initiated
     * @param currentOwner Current owner address
     * @param pendingOwner Pending owner address
     */
    event OwnershipTransferStarted(
        address indexed currentOwner,
        address indexed pendingOwner
    );
    
    /**
     * @notice Emitted when contract is paused
     * @param account Address that paused the contract
     */
    event Paused(address indexed account);
    
    /**
     * @notice Emitted when contract is unpaused
     * @param account Address that unpaused the contract
     */
    event Unpaused(address indexed account);
    
    // ═══════════════════════════════════════════════════════════════════════════
    //                              MODIFIERS
    // ═══════════════════════════════════════════════════════════════════════════
    
    /**
     * @notice Restricts function to contract owner only
     */
    modifier onlyOwner() {
        _checkOwner();
        _;
    }
    
    /**
     * @notice Ensures contract is not paused
     */
    modifier whenNotPaused() {
        _requireNotPaused();
        _;
    }
    
    /**
     * @notice Ensures contract is paused
     */
    modifier whenPaused() {
        _requirePaused();
        _;
    }
    
    /**
     * @notice Prevents reentrant calls
     */
    modifier nonReentrant() {
        _nonReentrantBefore();
        _;
        _nonReentrantAfter();
    }
    
    /**
     * @notice Validates address is not zero
     * @param addr Address to validate
     */
    modifier validAddress(address addr) {
        if (addr == address(0)) {
            revert VotingErrors.VoteSecure__General__ZeroAddress();
        }
        _;
    }
    
    /**
     * @notice Validates string is not empty
     * @param str String to validate
     */
    modifier notEmptyString(string calldata str) {
        if (bytes(str).length == 0) {
            revert VotingErrors.VoteSecure__General__EmptyString();
        }
        _;
    }
    
    // ═══════════════════════════════════════════════════════════════════════════
    //                              CONSTRUCTOR
    // ═══════════════════════════════════════════════════════════════════════════
    
    /**
     * @notice Initializes the contract with owner
     * @dev Sets the deployer as the initial owner
     */
    constructor() {
        _transferOwnership(msg.sender);
        _reentrancyStatus = _NOT_ENTERED;
        _paused = false;
    }
    
    // ═══════════════════════════════════════════════════════════════════════════
    //                         OWNERSHIP FUNCTIONS
    // ═══════════════════════════════════════════════════════════════════════════
    
    /**
     * @notice Returns the address of the current owner
     * @return Current owner address
     */
    function owner() public view virtual returns (address) {
        return _owner;
    }
    
    /**
     * @notice Returns the address of the pending owner
     * @return Pending owner address
     */
    function pendingOwner() public view virtual returns (address) {
        return _pendingOwner;
    }
    
    /**
     * @notice Starts the ownership transfer process
     * @dev Can only be called by current owner
     * @param newOwner Address of the new owner
     * 
     * Requirements:
     * - Caller must be the current owner
     * - newOwner must not be zero address
     */
    function transferOwnership(address newOwner) 
        public 
        virtual 
        onlyOwner 
        validAddress(newOwner) 
    {
        _pendingOwner = newOwner;
        emit OwnershipTransferStarted(_owner, newOwner);
    }
    
    /**
     * @notice Completes the ownership transfer
     * @dev Can only be called by pending owner
     * 
     * Requirements:
     * - Caller must be the pending owner
     */
    function acceptOwnership() public virtual {
        if (msg.sender != _pendingOwner) {
            revert VotingErrors.VoteSecure__Auth__NotOwner();
        }
        _transferOwnership(_pendingOwner);
    }
    
    /**
     * @notice Renounces ownership of the contract
     * @dev Leaves the contract without owner - DANGEROUS!
     * 
     * Requirements:
     * - Caller must be the current owner
     */
    function renounceOwnership() public virtual onlyOwner {
        _transferOwnership(address(0));
    }
    
    // ═══════════════════════════════════════════════════════════════════════════
    //                         PAUSABLE FUNCTIONS
    // ═══════════════════════════════════════════════════════════════════════════
    
    /**
     * @notice Returns true if the contract is paused
     * @return Paused state
     */
    function paused() public view virtual returns (bool) {
        return _paused;
    }
    
    /**
     * @notice Pauses the contract
     * @dev Can only be called by owner
     * 
     * Requirements:
     * - Caller must be owner
     * - Contract must not be paused
     */
    function pause() public virtual onlyOwner whenNotPaused {
        _paused = true;
        emit Paused(msg.sender);
    }
    
    /**
     * @notice Unpauses the contract
     * @dev Can only be called by owner
     * 
     * Requirements:
     * - Caller must be owner
     * - Contract must be paused
     */
    function unpause() public virtual onlyOwner whenPaused {
        _paused = false;
        emit Unpaused(msg.sender);
    }
    
    // ═══════════════════════════════════════════════════════════════════════════
    //                         INTERNAL FUNCTIONS
    // ═══════════════════════════════════════════════════════════════════════════
    
    /**
     * @notice Checks if caller is owner
     * @dev Reverts if caller is not owner
     */
    function _checkOwner() internal view virtual {
        if (msg.sender != _owner) {
            revert VotingErrors.VoteSecure__Auth__NotOwner();
        }
    }
    
    /**
     * @notice Internal function to transfer ownership
     * @param newOwner Address of new owner
     */
    function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        _pendingOwner = address(0);
        emit OwnershipTransferred(oldOwner, newOwner);
    }
    
    /**
     * @notice Checks if contract is not paused
     * @dev Reverts if contract is paused
     */
    function _requireNotPaused() internal view virtual {
        if (_paused) {
            revert VotingErrors.VoteSecure__General__ContractPaused();
        }
    }
    
    /**
     * @notice Checks if contract is paused
     * @dev Reverts if contract is not paused
     */
    function _requirePaused() internal view virtual {
        if (!_paused) {
            revert VotingErrors.VoteSecure__General__ContractNotPaused();
        }
    }
    
    /**
     * @notice Reentrancy guard - before execution
     */
    function _nonReentrantBefore() private {
        if (_reentrancyStatus == _ENTERED) {
            revert VotingErrors.VoteSecure__General__ReentrancyDetected();
        }
        _reentrancyStatus = _ENTERED;
    }
    
    /**
     * @notice Reentrancy guard - after execution
     */
    function _nonReentrantAfter() private {
        _reentrancyStatus = _NOT_ENTERED;
    }
    
    // ═══════════════════════════════════════════════════════════════════════════
    //                      PERMISSION HELPER FUNCTIONS
    // ═══════════════════════════════════════════════════════════════════════════
    
    /**
     * @notice Check if a permission bitmask includes a specific permission
     * @param permissions The permissions bitmask to check
     * @param permission The specific permission to look for
     * @return True if permission is included
     */
    function _hasPermission(
        uint256 permissions,
        uint256 permission
    ) internal pure returns (bool) {
        return VotingTypes.hasPermission(permissions, permission);
    }
    
    /**
     * @notice Add a permission to a bitmask
     * @param permissions Current permissions bitmask
     * @param permission Permission to add
     * @return New permissions bitmask
     */
    function _addPermission(
        uint256 permissions,
        uint256 permission
    ) internal pure returns (uint256) {
        return permissions | permission;
    }
    
    /**
     * @notice Remove a permission from a bitmask
     * @param permissions Current permissions bitmask
     * @param permission Permission to remove
     * @return New permissions bitmask
     */
    function _removePermission(
        uint256 permissions,
        uint256 permission
    ) internal pure returns (uint256) {
        return permissions & ~permission;
    }
    
    // ═══════════════════════════════════════════════════════════════════════════
    //                         ABSTRACT FUNCTIONS
    // ═══════════════════════════════════════════════════════════════════════════
    
    /**
     * @notice Hook to check if caller has required permission
     * @dev Override in derived contracts to implement permission checking
     * @param permission The required permission
     * @return True if caller has permission
     */
    function _callerHasPermission(uint256 permission) internal view virtual returns (bool);
    
    /**
     * @notice Modifier to require caller has specific permission
     * @param permission The required permission
     */
    modifier requiresPermission(uint256 permission) {
        if (!_callerHasPermission(permission)) {
            revert VotingErrors.VoteSecure__Auth__MissingPermission(permission, msg.sender);
        }
        _;
    }
}
