// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "./AccessControl.sol";
import "../interfaces/IAdminRegistry.sol";
import "../libraries/VotingTypes.sol";
import "../libraries/VotingErrors.sol";

/**
 * @title AdminRegistry
 * @author VoteSecure Team
 * @notice Contract for managing platform administrators
 * @dev Implements IAdminRegistry interface with role-based access control
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 *                              ADMIN REGISTRY
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * This contract manages:
 * - Admin registration and removal
 * - Role assignment and updates
 * - Permission management (grant/revoke)
 * - Admin status (active/inactive)
 * 
 * Security Model:
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │  Owner (Deployer)                                                          │
 * │      ↓                                                                      │
 * │  SUPER_ADMIN (Full Platform Control)                                       │
 * │      ↓                                                                      │
 * │  ┌─────────────┬─────────────────┬──────────────┬───────────┐             │
 * │  │ ELECTION    │ VERIFICATION    │ RESULT       │ AUDITOR   │             │
 * │  │ ADMIN       │ ADMIN           │ ADMIN        │           │             │
 * │  └─────────────┴─────────────────┴──────────────┴───────────┘             │
 * └─────────────────────────────────────────────────────────────────────────────┘
 * 
 * Storage Optimization:
 * - Uses mappings for O(1) lookups
 * - Maintains arrays for iteration when needed
 * - Separate wallet-to-admin mapping for reverse lookups
 */
contract AdminRegistry is AccessControl, IAdminRegistry {
    
    // ═══════════════════════════════════════════════════════════════════════════
    //                              STRUCTS
    // ═══════════════════════════════════════════════════════════════════════════
    
    /**
     * @notice Internal admin data structure
     * @dev Stored in mapping for gas efficiency
     */
    struct AdminData {
        string adminId;                     // Unique identifier from MongoDB
        address walletAddress;              // Ethereum wallet address
        VotingTypes.AdminRole role;         // Admin role
        uint256 permissions;                // Permissions bitmask
        bool isActive;                      // Active status
        bool isSuperAdmin;                  // Super admin flag
        uint256 registeredAt;               // Registration timestamp
        uint256 index;                      // Index in adminIds array
        bool exists;                        // Existence flag
    }
    
    // ═══════════════════════════════════════════════════════════════════════════
    //                              STATE VARIABLES
    // ═══════════════════════════════════════════════════════════════════════════
    
    /// @notice Mapping from adminId to AdminData
    mapping(string => AdminData) private _admins;
    
    /// @notice Mapping from wallet address to adminId
    mapping(address => string) private _walletToAdminId;
    
    /// @notice Array of all admin IDs (for iteration)
    string[] private _adminIds;
    
    /// @notice Count of active super admins
    uint256 private _superAdminCount;
    
    /// @notice Total admin count (including inactive)
    uint256 private _totalAdminCount;
    
    // ═══════════════════════════════════════════════════════════════════════════
    //                              CONSTRUCTOR
    // ═══════════════════════════════════════════════════════════════════════════
    
    /**
     * @notice Initializes the AdminRegistry contract
     * @dev The deployer becomes the first SUPER_ADMIN
     * @param initialAdminId Admin ID for the deployer
     * 
     * The deployer automatically gets:
     * - Contract ownership
     * - SUPER_ADMIN role
     * - Full permissions
     */
    constructor(string memory initialAdminId) {
        if (bytes(initialAdminId).length == 0) {
            revert VotingErrors.VoteSecure__General__EmptyString();
        }
        
        // Register deployer as first SUPER_ADMIN
        _registerAdminInternal(
            initialAdminId,
            msg.sender,
            VotingTypes.AdminRole.SUPER_ADMIN,
            VotingTypes.SUPER_ADMIN_PERMISSIONS
        );
    }
    
    // ═══════════════════════════════════════════════════════════════════════════
    //                         ADMIN MANAGEMENT (EXTERNAL)
    // ═══════════════════════════════════════════════════════════════════════════
    
    /**
     * @inheritdoc IAdminRegistry
     */
    function registerAdmin(
        string calldata adminId,
        address walletAddress,
        VotingTypes.AdminRole role,
        uint256 permissions
    ) 
        external 
        override 
        whenNotPaused
        nonReentrant
        notEmptyString(adminId)
        validAddress(walletAddress)
        returns (bool success) 
    {
        // Only SUPER_ADMIN can register new admins
        _requireSuperAdmin();
        
        // Validate adminId doesn't exist
        if (_admins[adminId].exists) {
            revert VotingErrors.VoteSecure__Admin__AlreadyExists(adminId);
        }
        
        // Validate wallet isn't already registered
        if (bytes(_walletToAdminId[walletAddress]).length > 0) {
            revert VotingErrors.VoteSecure__Admin__WalletAlreadyRegistered(walletAddress);
        }
        
        // Use default permissions for role if none provided
        uint256 finalPermissions = permissions == 0 
            ? VotingTypes.getDefaultPermissions(role)
            : permissions;
        
        // Register the admin
        _registerAdminInternal(adminId, walletAddress, role, finalPermissions);
        
        return true;
    }
    
    /**
     * @inheritdoc IAdminRegistry
     */
    function setAdminStatus(
        string calldata adminId,
        bool isActive
    )
        external
        override
        whenNotPaused
        nonReentrant
        notEmptyString(adminId)
        returns (bool success)
    {
        _requireSuperAdmin();
        
        AdminData storage admin = _admins[adminId];
        if (!admin.exists) {
            revert VotingErrors.VoteSecure__Admin__NotFound(adminId);
        }
        
        // Cannot deactivate if last active super admin
        if (!isActive && admin.isSuperAdmin && _superAdminCount <= 1) {
            revert VotingErrors.VoteSecure__Admin__CannotRemoveLastSuperAdmin();
        }
        
        // Update super admin count
        if (admin.isSuperAdmin) {
            if (admin.isActive && !isActive) {
                _superAdminCount--;
            } else if (!admin.isActive && isActive) {
                _superAdminCount++;
            }
        }
        
        admin.isActive = isActive;
        
        emit AdminStatusChanged(adminId, isActive, msg.sender, block.timestamp);
        
        return true;
    }
    
    /**
     * @inheritdoc IAdminRegistry
     */
    function updateAdminRole(
        string calldata adminId,
        VotingTypes.AdminRole newRole
    )
        external
        override
        whenNotPaused
        nonReentrant
        notEmptyString(adminId)
        returns (bool success)
    {
        _requireSuperAdmin();
        
        AdminData storage admin = _admins[adminId];
        if (!admin.exists) {
            revert VotingErrors.VoteSecure__Admin__NotFound(adminId);
        }
        
        VotingTypes.AdminRole oldRole = admin.role;
        bool wasSuper = admin.isSuperAdmin;
        bool willBeSuper = (newRole == VotingTypes.AdminRole.SUPER_ADMIN);
        
        // Cannot remove last super admin
        if (wasSuper && !willBeSuper && admin.isActive && _superAdminCount <= 1) {
            revert VotingErrors.VoteSecure__Admin__CannotRemoveLastSuperAdmin();
        }
        
        // Update super admin count
        if (wasSuper && !willBeSuper && admin.isActive) {
            _superAdminCount--;
        } else if (!wasSuper && willBeSuper && admin.isActive) {
            _superAdminCount++;
        }
        
        admin.role = newRole;
        admin.isSuperAdmin = willBeSuper;
        
        emit AdminRoleUpdated(adminId, oldRole, newRole, msg.sender, block.timestamp);
        
        return true;
    }
    
    /**
     * @inheritdoc IAdminRegistry
     */
    function updateAdminPermissions(
        string calldata adminId,
        uint256 newPermissions
    )
        external
        override
        whenNotPaused
        nonReentrant
        notEmptyString(adminId)
        returns (bool success)
    {
        _requireSuperAdmin();
        
        AdminData storage admin = _admins[adminId];
        if (!admin.exists) {
            revert VotingErrors.VoteSecure__Admin__NotFound(adminId);
        }
        
        uint256 oldPermissions = admin.permissions;
        admin.permissions = newPermissions;
        
        emit AdminPermissionsUpdated(adminId, oldPermissions, newPermissions, msg.sender, block.timestamp);
        
        return true;
    }
    
    /**
     * @inheritdoc IAdminRegistry
     */
    function grantPermission(
        string calldata adminId,
        uint256 permission
    )
        external
        override
        whenNotPaused
        nonReentrant
        notEmptyString(adminId)
        returns (bool success)
    {
        _requireSuperAdmin();
        
        AdminData storage admin = _admins[adminId];
        if (!admin.exists) {
            revert VotingErrors.VoteSecure__Admin__NotFound(adminId);
        }
        
        uint256 oldPermissions = admin.permissions;
        admin.permissions = _addPermission(admin.permissions, permission);
        
        emit AdminPermissionsUpdated(adminId, oldPermissions, admin.permissions, msg.sender, block.timestamp);
        
        return true;
    }
    
    /**
     * @inheritdoc IAdminRegistry
     */
    function revokePermission(
        string calldata adminId,
        uint256 permission
    )
        external
        override
        whenNotPaused
        nonReentrant
        notEmptyString(adminId)
        returns (bool success)
    {
        _requireSuperAdmin();
        
        AdminData storage admin = _admins[adminId];
        if (!admin.exists) {
            revert VotingErrors.VoteSecure__Admin__NotFound(adminId);
        }
        
        uint256 oldPermissions = admin.permissions;
        admin.permissions = _removePermission(admin.permissions, permission);
        
        emit AdminPermissionsUpdated(adminId, oldPermissions, admin.permissions, msg.sender, block.timestamp);
        
        return true;
    }
    
    /**
     * @inheritdoc IAdminRegistry
     */
    function removeAdmin(string calldata adminId)
        external
        override
        whenNotPaused
        nonReentrant
        notEmptyString(adminId)
        returns (bool success)
    {
        _requireSuperAdmin();
        
        AdminData storage admin = _admins[adminId];
        if (!admin.exists) {
            revert VotingErrors.VoteSecure__Admin__NotFound(adminId);
        }
        
        // Cannot remove yourself
        if (admin.walletAddress == msg.sender) {
            revert VotingErrors.VoteSecure__Admin__CannotRemoveSelf();
        }
        
        // Cannot remove last super admin
        if (admin.isSuperAdmin && admin.isActive && _superAdminCount <= 1) {
            revert VotingErrors.VoteSecure__Admin__CannotRemoveLastSuperAdmin();
        }
        
        // Update counts
        if (admin.isSuperAdmin && admin.isActive) {
            _superAdminCount--;
        }
        _totalAdminCount--;
        
        // Remove from array (swap and pop for gas efficiency)
        uint256 indexToRemove = admin.index;
        uint256 lastIndex = _adminIds.length - 1;
        
        if (indexToRemove != lastIndex) {
            string memory lastAdminId = _adminIds[lastIndex];
            _adminIds[indexToRemove] = lastAdminId;
            _admins[lastAdminId].index = indexToRemove;
        }
        _adminIds.pop();
        
        // Clear wallet mapping
        delete _walletToAdminId[admin.walletAddress];
        
        // Clear admin data
        delete _admins[adminId];
        
        emit AdminRemoved(adminId, msg.sender, block.timestamp);
        
        return true;
    }
    
    // ═══════════════════════════════════════════════════════════════════════════
    //                         VIEW FUNCTIONS
    // ═══════════════════════════════════════════════════════════════════════════
    
    /**
     * @inheritdoc IAdminRegistry
     */
    function getAdmin(string calldata adminId) 
        external 
        view 
        override 
        returns (
            string memory adminId_,
            address walletAddress,
            VotingTypes.AdminRole role,
            uint256 permissions,
            bool isActive,
            bool isSuperAdmin,
            uint256 registeredAt
        ) 
    {
        AdminData storage admin = _admins[adminId];
        if (!admin.exists) {
            revert VotingErrors.VoteSecure__Admin__NotFound(adminId);
        }
        
        return (
            admin.adminId,
            admin.walletAddress,
            admin.role,
            admin.permissions,
            admin.isActive,
            admin.isSuperAdmin,
            admin.registeredAt
        );
    }
    
    /**
     * @inheritdoc IAdminRegistry
     */
    function getAdminByWallet(address walletAddress)
        external
        view
        override
        returns (
            string memory adminId,
            VotingTypes.AdminRole role,
            uint256 permissions,
            bool isActive
        )
    {
        string memory _adminId = _walletToAdminId[walletAddress];
        if (bytes(_adminId).length == 0) {
            revert VotingErrors.VoteSecure__Admin__WalletNotFound(walletAddress);
        }
        
        AdminData storage admin = _admins[_adminId];
        return (
            admin.adminId,
            admin.role,
            admin.permissions,
            admin.isActive
        );
    }
    
    /**
     * @inheritdoc IAdminRegistry
     */
    function adminExists(string calldata adminId)
        external
        view
        override
        returns (bool exists)
    {
        return _admins[adminId].exists;
    }
    
    /**
     * @inheritdoc IAdminRegistry
     */
    function isAdminWallet(address walletAddress)
        external
        view
        override
        returns (bool isAdmin)
    {
        return bytes(_walletToAdminId[walletAddress]).length > 0;
    }
    
    /**
     * @inheritdoc IAdminRegistry
     */
    function isAdminActive(string calldata adminId)
        external
        view
        override
        returns (bool isActive)
    {
        AdminData storage admin = _admins[adminId];
        return admin.exists && admin.isActive;
    }
    
    /**
     * @inheritdoc IAdminRegistry
     */
    function adminHasPermission(
        string calldata adminId,
        uint256 permission
    )
        external
        view
        override
        returns (bool)
    {
        AdminData storage admin = _admins[adminId];
        if (!admin.exists || !admin.isActive) {
            return false;
        }
        return _hasPermission(admin.permissions, permission);
    }
    
    /**
     * @inheritdoc IAdminRegistry
     */
    function walletHasPermission(
        address walletAddress,
        uint256 permission
    )
        external
        view
        override
        returns (bool)
    {
        string memory adminId = _walletToAdminId[walletAddress];
        if (bytes(adminId).length == 0) {
            return false;
        }
        
        AdminData storage admin = _admins[adminId];
        if (!admin.isActive) {
            return false;
        }
        return _hasPermission(admin.permissions, permission);
    }
    
    /**
     * @inheritdoc IAdminRegistry
     */
    function getAdminCount()
        external
        view
        override
        returns (uint256 count)
    {
        return _totalAdminCount;
    }
    
    /**
     * @inheritdoc IAdminRegistry
     */
    function getSuperAdminCount()
        external
        view
        override
        returns (uint256 count)
    {
        return _superAdminCount;
    }
    
    /**
     * @inheritdoc IAdminRegistry
     */
    function getAllAdminIds()
        external
        view
        override
        returns (string[] memory adminIds)
    {
        return _adminIds;
    }
    
    /**
     * @inheritdoc IAdminRegistry
     */
    function getAdminsByRole(VotingTypes.AdminRole role)
        external
        view
        override
        returns (string[] memory adminIds)
    {
        // First, count admins with this role
        uint256 count = 0;
        for (uint256 i = 0; i < _adminIds.length; i++) {
            if (_admins[_adminIds[i]].role == role) {
                count++;
            }
        }
        
        // Create result array
        string[] memory result = new string[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < _adminIds.length; i++) {
            if (_admins[_adminIds[i]].role == role) {
                result[index] = _adminIds[i];
                index++;
            }
        }
        
        return result;
    }
    
    // ═══════════════════════════════════════════════════════════════════════════
    //                         INTERNAL FUNCTIONS
    // ═══════════════════════════════════════════════════════════════════════════
    
    /**
     * @notice Internal function to register an admin
     * @param adminId Admin identifier
     * @param walletAddress Admin's wallet
     * @param role Admin's role
     * @param permissions Permissions bitmask
     */
    function _registerAdminInternal(
        string memory adminId,
        address walletAddress,
        VotingTypes.AdminRole role,
        uint256 permissions
    ) internal {
        bool isSuperAdmin = (role == VotingTypes.AdminRole.SUPER_ADMIN);
        
        // Create admin data
        _admins[adminId] = AdminData({
            adminId: adminId,
            walletAddress: walletAddress,
            role: role,
            permissions: permissions,
            isActive: true,
            isSuperAdmin: isSuperAdmin,
            registeredAt: block.timestamp,
            index: _adminIds.length,
            exists: true
        });
        
        // Update mappings
        _walletToAdminId[walletAddress] = adminId;
        _adminIds.push(adminId);
        
        // Update counts
        _totalAdminCount++;
        if (isSuperAdmin) {
            _superAdminCount++;
        }
        
        emit AdminRegistered(adminId, walletAddress, role, msg.sender, block.timestamp);
    }
    
    /**
     * @notice Require caller to be an active super admin
     * @dev Reverts if caller is not a super admin or not active
     */
    function _requireSuperAdmin() internal view {
        string memory adminId = _walletToAdminId[msg.sender];
        
        // Check if wallet is registered
        if (bytes(adminId).length == 0) {
            revert VotingErrors.VoteSecure__Auth__Unauthorized();
        }
        
        AdminData storage admin = _admins[adminId];
        
        // Check if active
        if (!admin.isActive) {
            revert VotingErrors.VoteSecure__Auth__AdminNotActive();
        }
        
        // Check if super admin
        if (!admin.isSuperAdmin) {
            revert VotingErrors.VoteSecure__Auth__Unauthorized();
        }
    }
    
    /**
     * @notice Get admin ID by wallet address (internal)
     * @param walletAddress Wallet to lookup
     * @return Admin ID or empty string
     */
    function _getAdminIdByWallet(address walletAddress) internal view returns (string memory) {
        return _walletToAdminId[walletAddress];
    }
    
    /**
     * @notice Check if caller has a specific permission
     * @dev Implements the abstract function from AccessControl
     * @param permission Permission to check
     * @return True if caller has permission
     */
    function _callerHasPermission(uint256 permission) internal view override returns (bool) {
        string memory adminId = _walletToAdminId[msg.sender];
        
        if (bytes(adminId).length == 0) {
            return false;
        }
        
        AdminData storage admin = _admins[adminId];
        
        if (!admin.isActive) {
            return false;
        }
        
        return _hasPermission(admin.permissions, permission);
    }
    
    // ═══════════════════════════════════════════════════════════════════════════
    //                         PUBLIC HELPER FUNCTIONS
    // ═══════════════════════════════════════════════════════════════════════════
    
    /**
     * @notice Check if the caller is a super admin
     * @return True if caller is an active super admin
     */
    function callerIsSuperAdmin() public view returns (bool) {
        string memory adminId = _walletToAdminId[msg.sender];
        
        if (bytes(adminId).length == 0) {
            return false;
        }
        
        AdminData storage admin = _admins[adminId];
        return admin.isActive && admin.isSuperAdmin;
    }
    
    /**
     * @notice Check if the caller is any type of admin
     * @return True if caller is an active admin
     */
    function callerIsAdmin() public view returns (bool) {
        string memory adminId = _walletToAdminId[msg.sender];
        
        if (bytes(adminId).length == 0) {
            return false;
        }
        
        return _admins[adminId].isActive;
    }
    
    /**
     * @notice Get caller's admin ID
     * @return Admin ID or empty string
     */
    function getCallerAdminId() public view returns (string memory) {
        return _walletToAdminId[msg.sender];
    }
    
    /**
     * @notice Get caller's permissions
     * @return Permissions bitmask (0 if not admin)
     */
    function getCallerPermissions() public view returns (uint256) {
        string memory adminId = _walletToAdminId[msg.sender];
        
        if (bytes(adminId).length == 0) {
            return 0;
        }
        
        return _admins[adminId].permissions;
    }
}
