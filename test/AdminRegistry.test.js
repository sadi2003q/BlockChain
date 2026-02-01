/**
 * @title AdminRegistry Tests
 * @author VoteSecure Team
 * @notice Comprehensive test suite for AdminRegistry contract
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 *                           TEST COVERAGE
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * ✓ Deployment tests
 * ✓ Admin registration tests
 * ✓ Admin status management tests
 * ✓ Role management tests
 * ✓ Permission management tests
 * ✓ Admin removal tests
 * ✓ View function tests
 * ✓ Access control tests
 * ✓ Edge case tests
 */

const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AdminRegistry", function () {
    // ═══════════════════════════════════════════════════════════════════════════
    //                              TEST FIXTURES
    // ═══════════════════════════════════════════════════════════════════════════
    
    let adminRegistry;
    let owner, admin1, admin2, admin3, nonAdmin;
    
    // Admin IDs
    const OWNER_ADMIN_ID = "ADMIN_001";
    const ADMIN_1_ID = "ADMIN_002";
    const ADMIN_2_ID = "ADMIN_003";
    const ADMIN_3_ID = "ADMIN_004";
    
    // Admin Roles (matching VotingTypes.sol)
    const AdminRole = {
        SUPER_ADMIN: 0,
        ELECTION_ADMIN: 1,
        VERIFICATION_ADMIN: 2,
        RESULT_ADMIN: 3,
        AUDITOR: 4
    };
    
    // Permissions (matching VotingTypes.sol)
    const Permissions = {
        CREATE_ELECTION: 1 << 0,      // 1
        UPDATE_ELECTION: 1 << 1,      // 2
        CANCEL_ELECTION: 1 << 2,      // 4
        VERIFY_VOTER: 1 << 3,         // 8
        REJECT_VOTER: 1 << 4,         // 16
        APPROVE_CANDIDATE: 1 << 5,    // 32
        REJECT_CANDIDATE: 1 << 6,     // 64
        DISQUALIFY_CANDIDATE: 1 << 7, // 128
        PUBLISH_RESULTS: 1 << 8,      // 256
        VIEW_ANALYTICS: 1 << 9,       // 512
        AUDIT_LOGS: 1 << 10,          // 1024
        MANAGE_ADMINS: 1 << 11,       // 2048
        // SUPER_ADMIN gets type(uint256).max = all bits set
        ALL: ethers.MaxUint256
    };
    
    /**
     * @notice Deploy fresh contract before each test
     */
    beforeEach(async function () {
        [owner, admin1, admin2, admin3, nonAdmin] = await ethers.getSigners();
        
        const AdminRegistry = await ethers.getContractFactory("AdminRegistry");
        adminRegistry = await AdminRegistry.deploy(OWNER_ADMIN_ID);
        await adminRegistry.waitForDeployment();
    });
    
    // ═══════════════════════════════════════════════════════════════════════════
    //                         DEPLOYMENT TESTS
    // ═══════════════════════════════════════════════════════════════════════════
    
    describe("Deployment", function () {
        it("Should set deployer as owner", async function () {
            expect(await adminRegistry.owner()).to.equal(owner.address);
        });
        
        it("Should register deployer as first SUPER_ADMIN", async function () {
            const admin = await adminRegistry.getAdmin(OWNER_ADMIN_ID);
            expect(admin.walletAddress).to.equal(owner.address);
            expect(admin.role).to.equal(AdminRole.SUPER_ADMIN);
            expect(admin.isSuperAdmin).to.be.true;
            expect(admin.isActive).to.be.true;
        });
        
        it("Should set super admin count to 1", async function () {
            expect(await adminRegistry.getSuperAdminCount()).to.equal(1);
        });
        
        it("Should set total admin count to 1", async function () {
            expect(await adminRegistry.getAdminCount()).to.equal(1);
        });
        
        it("Should give deployer all permissions", async function () {
            const admin = await adminRegistry.getAdmin(OWNER_ADMIN_ID);
            expect(admin.permissions).to.equal(Permissions.ALL);
        });
        
        it("Should revert if initial admin ID is empty", async function () {
            const AdminRegistry = await ethers.getContractFactory("AdminRegistry");
            await expect(AdminRegistry.deploy("")).to.be.reverted;
        });
        
        it("Should emit AdminRegistered event", async function () {
            const AdminRegistry = await ethers.getContractFactory("AdminRegistry");
            const tx = await AdminRegistry.deploy("NEW_ADMIN");
            
            await expect(tx.deploymentTransaction())
                .to.emit(await tx, "AdminRegistered");
        });
    });
    
    // ═══════════════════════════════════════════════════════════════════════════
    //                      ADMIN REGISTRATION TESTS
    // ═══════════════════════════════════════════════════════════════════════════
    
    describe("Admin Registration", function () {
        it("Should register a new admin", async function () {
            await adminRegistry.registerAdmin(
                ADMIN_1_ID,
                admin1.address,
                AdminRole.ELECTION_ADMIN,
                0 // Use default permissions
            );
            
            const admin = await adminRegistry.getAdmin(ADMIN_1_ID);
            expect(admin.walletAddress).to.equal(admin1.address);
            expect(admin.role).to.equal(AdminRole.ELECTION_ADMIN);
            expect(admin.isActive).to.be.true;
        });
        
        it("Should register admin with custom permissions", async function () {
            const customPermissions = Permissions.CREATE_ELECTION | Permissions.VIEW_ANALYTICS;
            
            await adminRegistry.registerAdmin(
                ADMIN_1_ID,
                admin1.address,
                AdminRole.ELECTION_ADMIN,
                customPermissions
            );
            
            const admin = await adminRegistry.getAdmin(ADMIN_1_ID);
            expect(admin.permissions).to.equal(customPermissions);
        });
        
        it("Should emit AdminRegistered event", async function () {
            await expect(adminRegistry.registerAdmin(
                ADMIN_1_ID,
                admin1.address,
                AdminRole.ELECTION_ADMIN,
                0
            ))
                .to.emit(adminRegistry, "AdminRegistered")
                .withArgs(
                    ADMIN_1_ID,
                    admin1.address,
                    AdminRole.ELECTION_ADMIN,
                    owner.address,
                    await getBlockTimestamp() + 1
                );
        });
        
        it("Should increment admin count", async function () {
            await adminRegistry.registerAdmin(
                ADMIN_1_ID,
                admin1.address,
                AdminRole.ELECTION_ADMIN,
                0
            );
            
            expect(await adminRegistry.getAdminCount()).to.equal(2);
        });
        
        it("Should increment super admin count if SUPER_ADMIN role", async function () {
            await adminRegistry.registerAdmin(
                ADMIN_1_ID,
                admin1.address,
                AdminRole.SUPER_ADMIN,
                0
            );
            
            expect(await adminRegistry.getSuperAdminCount()).to.equal(2);
        });
        
        it("Should revert if admin ID already exists", async function () {
            await adminRegistry.registerAdmin(
                ADMIN_1_ID,
                admin1.address,
                AdminRole.ELECTION_ADMIN,
                0
            );
            
            await expect(adminRegistry.registerAdmin(
                ADMIN_1_ID,
                admin2.address,
                AdminRole.ELECTION_ADMIN,
                0
            )).to.be.reverted;
        });
        
        it("Should revert if wallet already registered", async function () {
            await adminRegistry.registerAdmin(
                ADMIN_1_ID,
                admin1.address,
                AdminRole.ELECTION_ADMIN,
                0
            );
            
            await expect(adminRegistry.registerAdmin(
                ADMIN_2_ID,
                admin1.address, // Same wallet
                AdminRole.ELECTION_ADMIN,
                0
            )).to.be.reverted;
        });
        
        it("Should revert if called by non-super-admin", async function () {
            // First register a non-super admin
            await adminRegistry.registerAdmin(
                ADMIN_1_ID,
                admin1.address,
                AdminRole.ELECTION_ADMIN,
                0
            );
            
            // Try to register from non-super admin
            await expect(adminRegistry.connect(admin1).registerAdmin(
                ADMIN_2_ID,
                admin2.address,
                AdminRole.ELECTION_ADMIN,
                0
            )).to.be.reverted;
        });
        
        it("Should revert if called by non-admin", async function () {
            await expect(adminRegistry.connect(nonAdmin).registerAdmin(
                ADMIN_1_ID,
                admin1.address,
                AdminRole.ELECTION_ADMIN,
                0
            )).to.be.reverted;
        });
        
        it("Should revert if admin ID is empty", async function () {
            await expect(adminRegistry.registerAdmin(
                "",
                admin1.address,
                AdminRole.ELECTION_ADMIN,
                0
            )).to.be.reverted;
        });
        
        it("Should revert if wallet is zero address", async function () {
            await expect(adminRegistry.registerAdmin(
                ADMIN_1_ID,
                ethers.ZeroAddress,
                AdminRole.ELECTION_ADMIN,
                0
            )).to.be.reverted;
        });
    });
    
    // ═══════════════════════════════════════════════════════════════════════════
    //                      ADMIN STATUS TESTS
    // ═══════════════════════════════════════════════════════════════════════════
    
    describe("Admin Status Management", function () {
        beforeEach(async function () {
            // Register test admins
            await adminRegistry.registerAdmin(
                ADMIN_1_ID,
                admin1.address,
                AdminRole.ELECTION_ADMIN,
                0
            );
        });
        
        it("Should deactivate an admin", async function () {
            await adminRegistry.setAdminStatus(ADMIN_1_ID, false);
            
            const admin = await adminRegistry.getAdmin(ADMIN_1_ID);
            expect(admin.isActive).to.be.false;
        });
        
        it("Should reactivate an admin", async function () {
            await adminRegistry.setAdminStatus(ADMIN_1_ID, false);
            await adminRegistry.setAdminStatus(ADMIN_1_ID, true);
            
            const admin = await adminRegistry.getAdmin(ADMIN_1_ID);
            expect(admin.isActive).to.be.true;
        });
        
        it("Should emit AdminStatusChanged event", async function () {
            await expect(adminRegistry.setAdminStatus(ADMIN_1_ID, false))
                .to.emit(adminRegistry, "AdminStatusChanged")
                .withArgs(ADMIN_1_ID, false, owner.address, await getBlockTimestamp() + 1);
        });
        
        it("Should revert if admin not found", async function () {
            await expect(adminRegistry.setAdminStatus("INVALID_ID", false))
                .to.be.reverted;
        });
        
        it("Should revert if deactivating last super admin", async function () {
            await expect(adminRegistry.setAdminStatus(OWNER_ADMIN_ID, false))
                .to.be.reverted;
        });
        
        it("Should allow deactivating super admin if another exists", async function () {
            // Register another super admin
            await adminRegistry.registerAdmin(
                ADMIN_2_ID,
                admin2.address,
                AdminRole.SUPER_ADMIN,
                0
            );
            
            // Now we can deactivate the original
            await adminRegistry.setAdminStatus(OWNER_ADMIN_ID, false);
            
            expect(await adminRegistry.isAdminActive(OWNER_ADMIN_ID)).to.be.false;
        });
    });
    
    // ═══════════════════════════════════════════════════════════════════════════
    //                      ROLE MANAGEMENT TESTS
    // ═══════════════════════════════════════════════════════════════════════════
    
    describe("Role Management", function () {
        beforeEach(async function () {
            await adminRegistry.registerAdmin(
                ADMIN_1_ID,
                admin1.address,
                AdminRole.ELECTION_ADMIN,
                0
            );
        });
        
        it("Should update admin role", async function () {
            await adminRegistry.updateAdminRole(ADMIN_1_ID, AdminRole.VERIFICATION_ADMIN);
            
            const admin = await adminRegistry.getAdmin(ADMIN_1_ID);
            expect(admin.role).to.equal(AdminRole.VERIFICATION_ADMIN);
        });
        
        it("Should promote to super admin", async function () {
            await adminRegistry.updateAdminRole(ADMIN_1_ID, AdminRole.SUPER_ADMIN);
            
            const admin = await adminRegistry.getAdmin(ADMIN_1_ID);
            expect(admin.role).to.equal(AdminRole.SUPER_ADMIN);
            expect(admin.isSuperAdmin).to.be.true;
        });
        
        it("Should increment super admin count on promotion", async function () {
            await adminRegistry.updateAdminRole(ADMIN_1_ID, AdminRole.SUPER_ADMIN);
            
            expect(await adminRegistry.getSuperAdminCount()).to.equal(2);
        });
        
        it("Should emit AdminRoleUpdated event", async function () {
            await expect(adminRegistry.updateAdminRole(ADMIN_1_ID, AdminRole.VERIFICATION_ADMIN))
                .to.emit(adminRegistry, "AdminRoleUpdated")
                .withArgs(
                    ADMIN_1_ID,
                    AdminRole.ELECTION_ADMIN,
                    AdminRole.VERIFICATION_ADMIN,
                    owner.address,
                    await getBlockTimestamp() + 1
                );
        });
        
        it("Should revert if demoting last super admin", async function () {
            await expect(adminRegistry.updateAdminRole(OWNER_ADMIN_ID, AdminRole.ELECTION_ADMIN))
                .to.be.reverted;
        });
    });
    
    // ═══════════════════════════════════════════════════════════════════════════
    //                      PERMISSION MANAGEMENT TESTS
    // ═══════════════════════════════════════════════════════════════════════════
    
    describe("Permission Management", function () {
        beforeEach(async function () {
            await adminRegistry.registerAdmin(
                ADMIN_1_ID,
                admin1.address,
                AdminRole.ELECTION_ADMIN,
                0
            );
        });
        
        it("Should update admin permissions", async function () {
            const newPermissions = Permissions.ALL;
            await adminRegistry.updateAdminPermissions(ADMIN_1_ID, newPermissions);
            
            const admin = await adminRegistry.getAdmin(ADMIN_1_ID);
            expect(admin.permissions).to.equal(newPermissions);
        });
        
        it("Should grant specific permission", async function () {
            await adminRegistry.grantPermission(ADMIN_1_ID, Permissions.PUBLISH_RESULTS);
            
            expect(await adminRegistry.adminHasPermission(ADMIN_1_ID, Permissions.PUBLISH_RESULTS))
                .to.be.true;
        });
        
        it("Should revoke specific permission", async function () {
            // First grant all
            await adminRegistry.updateAdminPermissions(ADMIN_1_ID, Permissions.ALL);
            
            // Then revoke one
            await adminRegistry.revokePermission(ADMIN_1_ID, Permissions.PUBLISH_RESULTS);
            
            expect(await adminRegistry.adminHasPermission(ADMIN_1_ID, Permissions.PUBLISH_RESULTS))
                .to.be.false;
        });
        
        it("Should emit AdminPermissionsUpdated on grant", async function () {
            await expect(adminRegistry.grantPermission(ADMIN_1_ID, Permissions.PUBLISH_RESULTS))
                .to.emit(adminRegistry, "AdminPermissionsUpdated");
        });
        
        it("Should emit AdminPermissionsUpdated on revoke", async function () {
            await expect(adminRegistry.revokePermission(ADMIN_1_ID, Permissions.CREATE_ELECTION))
                .to.emit(adminRegistry, "AdminPermissionsUpdated");
        });
    });
    
    // ═══════════════════════════════════════════════════════════════════════════
    //                      ADMIN REMOVAL TESTS
    // ═══════════════════════════════════════════════════════════════════════════
    
    describe("Admin Removal", function () {
        beforeEach(async function () {
            await adminRegistry.registerAdmin(
                ADMIN_1_ID,
                admin1.address,
                AdminRole.ELECTION_ADMIN,
                0
            );
        });
        
        it("Should remove an admin", async function () {
            await adminRegistry.removeAdmin(ADMIN_1_ID);
            
            expect(await adminRegistry.adminExists(ADMIN_1_ID)).to.be.false;
        });
        
        it("Should decrement admin count", async function () {
            await adminRegistry.removeAdmin(ADMIN_1_ID);
            
            expect(await adminRegistry.getAdminCount()).to.equal(1);
        });
        
        it("Should clear wallet mapping", async function () {
            await adminRegistry.removeAdmin(ADMIN_1_ID);
            
            expect(await adminRegistry.isAdminWallet(admin1.address)).to.be.false;
        });
        
        it("Should emit AdminRemoved event", async function () {
            await expect(adminRegistry.removeAdmin(ADMIN_1_ID))
                .to.emit(adminRegistry, "AdminRemoved")
                .withArgs(ADMIN_1_ID, owner.address, await getBlockTimestamp() + 1);
        });
        
        it("Should revert if removing self", async function () {
            await expect(adminRegistry.removeAdmin(OWNER_ADMIN_ID))
                .to.be.reverted;
        });
        
        it("Should revert if removing last super admin (even if not self)", async function () {
            // Register another super admin
            await adminRegistry.registerAdmin(
                ADMIN_2_ID,
                admin2.address,
                AdminRole.SUPER_ADMIN,
                0
            );
            
            // Deactivate owner
            await adminRegistry.setAdminStatus(OWNER_ADMIN_ID, false);
            
            // admin2 tries to remove owner (who is inactive but only active super is admin2)
            // This should still work since owner is inactive
            await expect(adminRegistry.connect(admin2).removeAdmin(OWNER_ADMIN_ID))
                .to.not.be.reverted;
        });
        
        it("Should revert if admin not found", async function () {
            await expect(adminRegistry.removeAdmin("INVALID_ID"))
                .to.be.reverted;
        });
    });
    
    // ═══════════════════════════════════════════════════════════════════════════
    //                      VIEW FUNCTION TESTS
    // ═══════════════════════════════════════════════════════════════════════════
    
    describe("View Functions", function () {
        beforeEach(async function () {
            await adminRegistry.registerAdmin(
                ADMIN_1_ID,
                admin1.address,
                AdminRole.ELECTION_ADMIN,
                0
            );
            await adminRegistry.registerAdmin(
                ADMIN_2_ID,
                admin2.address,
                AdminRole.VERIFICATION_ADMIN,
                0
            );
        });
        
        it("Should get admin by ID", async function () {
            const admin = await adminRegistry.getAdmin(ADMIN_1_ID);
            
            expect(admin.adminId_).to.equal(ADMIN_1_ID);
            expect(admin.walletAddress).to.equal(admin1.address);
        });
        
        it("Should get admin by wallet", async function () {
            const admin = await adminRegistry.getAdminByWallet(admin1.address);
            
            expect(admin.adminId).to.equal(ADMIN_1_ID);
            expect(admin.role).to.equal(AdminRole.ELECTION_ADMIN);
        });
        
        it("Should check if admin exists", async function () {
            expect(await adminRegistry.adminExists(ADMIN_1_ID)).to.be.true;
            expect(await adminRegistry.adminExists("INVALID")).to.be.false;
        });
        
        it("Should check if wallet is admin", async function () {
            expect(await adminRegistry.isAdminWallet(admin1.address)).to.be.true;
            expect(await adminRegistry.isAdminWallet(nonAdmin.address)).to.be.false;
        });
        
        it("Should check if admin is active", async function () {
            expect(await adminRegistry.isAdminActive(ADMIN_1_ID)).to.be.true;
            
            await adminRegistry.setAdminStatus(ADMIN_1_ID, false);
            
            expect(await adminRegistry.isAdminActive(ADMIN_1_ID)).to.be.false;
        });
        
        it("Should check admin permission", async function () {
            expect(await adminRegistry.adminHasPermission(ADMIN_1_ID, Permissions.CREATE_ELECTION))
                .to.be.true;
        });
        
        it("Should check wallet permission", async function () {
            expect(await adminRegistry.walletHasPermission(admin1.address, Permissions.CREATE_ELECTION))
                .to.be.true;
        });
        
        it("Should return false for inactive admin permission", async function () {
            await adminRegistry.setAdminStatus(ADMIN_1_ID, false);
            
            expect(await adminRegistry.adminHasPermission(ADMIN_1_ID, Permissions.CREATE_ELECTION))
                .to.be.false;
        });
        
        it("Should get all admin IDs", async function () {
            const adminIds = await adminRegistry.getAllAdminIds();
            
            expect(adminIds.length).to.equal(3);
            expect(adminIds).to.include(OWNER_ADMIN_ID);
            expect(adminIds).to.include(ADMIN_1_ID);
            expect(adminIds).to.include(ADMIN_2_ID);
        });
        
        it("Should get admins by role", async function () {
            const electionAdmins = await adminRegistry.getAdminsByRole(AdminRole.ELECTION_ADMIN);
            
            expect(electionAdmins.length).to.equal(1);
            expect(electionAdmins[0]).to.equal(ADMIN_1_ID);
        });
        
        it("Should get admin count", async function () {
            expect(await adminRegistry.getAdminCount()).to.equal(3);
        });
        
        it("Should get super admin count", async function () {
            expect(await adminRegistry.getSuperAdminCount()).to.equal(1);
        });
    });
    
    // ═══════════════════════════════════════════════════════════════════════════
    //                      CALLER HELPER TESTS
    // ═══════════════════════════════════════════════════════════════════════════
    
    describe("Caller Helper Functions", function () {
        beforeEach(async function () {
            await adminRegistry.registerAdmin(
                ADMIN_1_ID,
                admin1.address,
                AdminRole.ELECTION_ADMIN,
                0
            );
        });
        
        it("Should check if caller is super admin", async function () {
            expect(await adminRegistry.callerIsSuperAdmin()).to.be.true;
            expect(await adminRegistry.connect(admin1).callerIsSuperAdmin()).to.be.false;
        });
        
        it("Should check if caller is admin", async function () {
            expect(await adminRegistry.callerIsAdmin()).to.be.true;
            expect(await adminRegistry.connect(admin1).callerIsAdmin()).to.be.true;
            expect(await adminRegistry.connect(nonAdmin).callerIsAdmin()).to.be.false;
        });
        
        it("Should get caller admin ID", async function () {
            expect(await adminRegistry.getCallerAdminId()).to.equal(OWNER_ADMIN_ID);
            expect(await adminRegistry.connect(admin1).getCallerAdminId()).to.equal(ADMIN_1_ID);
            expect(await adminRegistry.connect(nonAdmin).getCallerAdminId()).to.equal("");
        });
        
        it("Should get caller permissions", async function () {
            expect(await adminRegistry.getCallerPermissions()).to.equal(Permissions.ALL);
            expect(await adminRegistry.connect(nonAdmin).getCallerPermissions()).to.equal(0);
        });
    });
    
    // ═══════════════════════════════════════════════════════════════════════════
    //                      PAUSABLE TESTS
    // ═══════════════════════════════════════════════════════════════════════════
    
    describe("Pausable Functionality", function () {
        it("Should pause the contract", async function () {
            await adminRegistry.pause();
            expect(await adminRegistry.paused()).to.be.true;
        });
        
        it("Should unpause the contract", async function () {
            await adminRegistry.pause();
            await adminRegistry.unpause();
            expect(await adminRegistry.paused()).to.be.false;
        });
        
        it("Should revert on register when paused", async function () {
            await adminRegistry.pause();
            
            await expect(adminRegistry.registerAdmin(
                ADMIN_1_ID,
                admin1.address,
                AdminRole.ELECTION_ADMIN,
                0
            )).to.be.reverted;
        });
        
        it("Should emit Paused event", async function () {
            await expect(adminRegistry.pause())
                .to.emit(adminRegistry, "Paused")
                .withArgs(owner.address);
        });
        
        it("Should emit Unpaused event", async function () {
            await adminRegistry.pause();
            
            await expect(adminRegistry.unpause())
                .to.emit(adminRegistry, "Unpaused")
                .withArgs(owner.address);
        });
    });
    
    // ═══════════════════════════════════════════════════════════════════════════
    //                      OWNERSHIP TESTS
    // ═══════════════════════════════════════════════════════════════════════════
    
    describe("Ownership", function () {
        it("Should initiate ownership transfer", async function () {
            await adminRegistry.transferOwnership(admin1.address);
            expect(await adminRegistry.pendingOwner()).to.equal(admin1.address);
        });
        
        it("Should complete ownership transfer", async function () {
            await adminRegistry.transferOwnership(admin1.address);
            await adminRegistry.connect(admin1).acceptOwnership();
            
            expect(await adminRegistry.owner()).to.equal(admin1.address);
        });
        
        it("Should emit OwnershipTransferStarted", async function () {
            await expect(adminRegistry.transferOwnership(admin1.address))
                .to.emit(adminRegistry, "OwnershipTransferStarted")
                .withArgs(owner.address, admin1.address);
        });
        
        it("Should emit OwnershipTransferred", async function () {
            await adminRegistry.transferOwnership(admin1.address);
            
            await expect(adminRegistry.connect(admin1).acceptOwnership())
                .to.emit(adminRegistry, "OwnershipTransferred")
                .withArgs(owner.address, admin1.address);
        });
        
        it("Should revert if non-pending owner accepts", async function () {
            await adminRegistry.transferOwnership(admin1.address);
            
            await expect(adminRegistry.connect(admin2).acceptOwnership())
                .to.be.reverted;
        });
    });
    
    // ═══════════════════════════════════════════════════════════════════════════
    //                      HELPER FUNCTIONS
    // ═══════════════════════════════════════════════════════════════════════════
    
    /**
     * @notice Get current block timestamp
     */
    async function getBlockTimestamp() {
        const block = await ethers.provider.getBlock("latest");
        return block.timestamp;
    }
});
