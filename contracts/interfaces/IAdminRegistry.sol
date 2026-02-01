// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "../libraries/VotingTypes.sol";

/**
 * @title IAdminRegistry
 * @author VoteSecure Team
 * @notice Interface for Admin Registry - manages all admin operations
 * @dev Implement this interface for admin management functionality
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 *                           ADMIN REGISTRY INTERFACE
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * This interface defines the complete Admin Management API.
 * 
 * Admin Roles:
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │  SUPER_ADMIN      → Full access, can manage other admins                   │
 * │  ELECTION_ADMIN   → Create/manage elections                                │
 * │  VERIFICATION_ADMIN → Verify voters                                        │
 * │  RESULT_ADMIN     → Publish results                                        │
 * │  AUDITOR          → Read-only audit access                                 │
 * └─────────────────────────────────────────────────────────────────────────────┘
 */
interface IAdminRegistry {
    
    // ═══════════════════════════════════════════════════════════════════════════
    //                              EVENTS
    // ═══════════════════════════════════════════════════════════════════════════
    
    /**
     * @notice Emitted when a new admin is registered
     * @param adminId Unique admin identifier
     * @param walletAddress Admin's wallet address
     * @param role Admin's role
     * @param registeredBy Address that registered the admin
     * @param timestamp Registration timestamp
     */
    event AdminRegistered(
        string indexed adminId,
        address indexed walletAddress,
        VotingTypes.AdminRole role,
        address indexed registeredBy,
        uint256 timestamp
    );
    
    /**
     * @notice Emitted when admin status changes (active/inactive)
     * @param adminId Admin identifier
     * @param isActive New active status
     * @param changedBy Address that made the change
     * @param timestamp Change timestamp
     */
    event AdminStatusChanged(
        string indexed adminId,
        bool isActive,
        address indexed changedBy,
        uint256 timestamp
    );
    
    /**
     * @notice Emitted when admin role is updated
     * @param adminId Admin identifier
     * @param oldRole Previous role
     * @param newRole New role
     * @param changedBy Address that made the change
     * @param timestamp Change timestamp
     */
    event AdminRoleUpdated(
        string indexed adminId,
        VotingTypes.AdminRole oldRole,
        VotingTypes.AdminRole newRole,
        address indexed changedBy,
        uint256 timestamp
    );
    
    /**
     * @notice Emitted when admin permissions are updated
     * @param adminId Admin identifier
     * @param oldPermissions Previous permissions bitmask
     * @param newPermissions New permissions bitmask
     * @param changedBy Address that made the change
     * @param timestamp Change timestamp
     */
    event AdminPermissionsUpdated(
        string indexed adminId,
        uint256 oldPermissions,
        uint256 newPermissions,
        address indexed changedBy,
        uint256 timestamp
    );
    
    /**
     * @notice Emitted when an admin is removed
     * @param adminId Admin identifier
     * @param removedBy Address that removed the admin
     * @param timestamp Removal timestamp
     */
    event AdminRemoved(
        string indexed adminId,
        address indexed removedBy,
        uint256 timestamp
    );
    
    // ═══════════════════════════════════════════════════════════════════════════
    //                         ADMIN MANAGEMENT FUNCTIONS
    // ═══════════════════════════════════════════════════════════════════════════
    
    /**
     * @notice Register a new admin
     * @dev Only callable by SUPER_ADMIN
     * @param adminId Unique admin identifier (from MongoDB)
     * @param walletAddress Admin's Ethereum wallet address
     * @param role Admin's role
     * @param permissions Initial permissions bitmask (0 for default)
     * @return success True if registration successful
     * 
     * Requirements:
     * - Caller must be SUPER_ADMIN
     * - adminId must not be empty
     * - adminId must not already exist
     * - walletAddress must not be zero address
     * - walletAddress must not already be registered as admin
     */
    function registerAdmin(
        string calldata adminId,
        address walletAddress,
        VotingTypes.AdminRole role,
        uint256 permissions
    ) external returns (bool success);
    
    /**
     * @notice Update admin's active status
     * @dev Only callable by SUPER_ADMIN
     * @param adminId Admin identifier
     * @param isActive New active status
     * @return success True if update successful
     * 
     * Requirements:
     * - Caller must be SUPER_ADMIN
     * - Admin must exist
     * - Cannot deactivate yourself if you're the only SUPER_ADMIN
     */
    function setAdminStatus(
        string calldata adminId,
        bool isActive
    ) external returns (bool success);
    
    /**
     * @notice Update admin's role
     * @dev Only callable by SUPER_ADMIN
     * @param adminId Admin identifier
     * @param newRole New admin role
     * @return success True if update successful
     * 
     * Requirements:
     * - Caller must be SUPER_ADMIN
     * - Admin must exist
     * - Cannot change your own role to non-SUPER_ADMIN if you're the only one
     */
    function updateAdminRole(
        string calldata adminId,
        VotingTypes.AdminRole newRole
    ) external returns (bool success);
    
    /**
     * @notice Update admin's permissions
     * @dev Only callable by SUPER_ADMIN
     * @param adminId Admin identifier
     * @param newPermissions New permissions bitmask
     * @return success True if update successful
     * 
     * Requirements:
     * - Caller must be SUPER_ADMIN
     * - Admin must exist
     */
    function updateAdminPermissions(
        string calldata adminId,
        uint256 newPermissions
    ) external returns (bool success);
    
    /**
     * @notice Add specific permission to admin
     * @dev Only callable by SUPER_ADMIN
     * @param adminId Admin identifier
     * @param permission Permission to add
     * @return success True if update successful
     */
    function grantPermission(
        string calldata adminId,
        uint256 permission
    ) external returns (bool success);
    
    /**
     * @notice Remove specific permission from admin
     * @dev Only callable by SUPER_ADMIN
     * @param adminId Admin identifier
     * @param permission Permission to remove
     * @return success True if update successful
     */
    function revokePermission(
        string calldata adminId,
        uint256 permission
    ) external returns (bool success);
    
    /**
     * @notice Remove an admin completely
     * @dev Only callable by SUPER_ADMIN
     * @param adminId Admin identifier
     * @return success True if removal successful
     * 
     * Requirements:
     * - Caller must be SUPER_ADMIN
     * - Admin must exist
     * - Cannot remove the last SUPER_ADMIN
     * - Cannot remove yourself
     */
    function removeAdmin(string calldata adminId) external returns (bool success);
    
    // ═══════════════════════════════════════════════════════════════════════════
    //                         VIEW FUNCTIONS
    // ═══════════════════════════════════════════════════════════════════════════
    
    /**
     * @notice Get admin details by ID
     * @param adminId Admin identifier
     * @return adminId_ The admin ID
     * @return walletAddress The admin's wallet address
     * @return role The admin's role
     * @return permissions The admin's permissions bitmask
     * @return isActive Whether the admin is active
     * @return isSuperAdmin Whether the admin is a super admin
     * @return registeredAt Registration timestamp
     */
    function getAdmin(string calldata adminId) external view returns (
        string memory adminId_,
        address walletAddress,
        VotingTypes.AdminRole role,
        uint256 permissions,
        bool isActive,
        bool isSuperAdmin,
        uint256 registeredAt
    );
    
    /**
     * @notice Get admin details by wallet address
     * @param walletAddress Admin's wallet address
     * @return adminId The admin ID
     * @return role The admin's role
     * @return permissions The admin's permissions bitmask
     * @return isActive Whether the admin is active
     */
    function getAdminByWallet(address walletAddress) external view returns (
        string memory adminId,
        VotingTypes.AdminRole role,
        uint256 permissions,
        bool isActive
    );
    
    /**
     * @notice Check if an admin exists
     * @param adminId Admin identifier
     * @return exists True if admin exists
     */
    function adminExists(string calldata adminId) external view returns (bool exists);
    
    /**
     * @notice Check if a wallet is registered as admin
     * @param walletAddress Wallet address to check
     * @return isAdmin True if wallet is registered as admin
     */
    function isAdminWallet(address walletAddress) external view returns (bool isAdmin);
    
    /**
     * @notice Check if admin is active
     * @param adminId Admin identifier
     * @return isActive True if admin is active
     */
    function isAdminActive(string calldata adminId) external view returns (bool isActive);
    
    /**
     * @notice Check if admin has specific permission
     * @param adminId Admin identifier
     * @param permission Permission to check
     * @return hasPermission True if admin has the permission
     */
    function adminHasPermission(
        string calldata adminId,
        uint256 permission
    ) external view returns (bool hasPermission);
    
    /**
     * @notice Check if wallet has specific permission
     * @param walletAddress Wallet address
     * @param permission Permission to check
     * @return hasPermission True if wallet has the permission
     */
    function walletHasPermission(
        address walletAddress,
        uint256 permission
    ) external view returns (bool hasPermission);
    
    /**
     * @notice Get total number of admins
     * @return count Total admin count
     */
    function getAdminCount() external view returns (uint256 count);
    
    /**
     * @notice Get total number of active SUPER_ADMINs
     * @return count Active super admin count
     */
    function getSuperAdminCount() external view returns (uint256 count);
    
    /**
     * @notice Get all admin IDs
     * @return adminIds Array of all admin IDs
     */
    function getAllAdminIds() external view returns (string[] memory adminIds);
    
    /**
     * @notice Get admins by role
     * @param role Admin role to filter by
     * @return adminIds Array of admin IDs with the specified role
     */
    function getAdminsByRole(VotingTypes.AdminRole role) external view returns (string[] memory adminIds);
}
