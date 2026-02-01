// Deploy script for AdminRegistry contract
const hre = require("hardhat");

async function main() {
    console.log("Deploying AdminRegistry...\n");
    
    // Get deployer account
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying from account:", deployer.address);
    console.log("Account balance:", hre.ethers.formatEther(await hre.ethers.provider.getBalance(deployer.address)), "ETH\n");
    
    // Deploy AdminRegistry
    const AdminRegistry = await hre.ethers.getContractFactory("AdminRegistry");
    const adminRegistry = await AdminRegistry.deploy("SUPER_ADMIN_001");
    
    await adminRegistry.waitForDeployment();
    const address = await adminRegistry.getAddress();
    
    console.log("AdminRegistry deployed to:", address);
    
    // Get initial data
    const owner = await adminRegistry.owner();
    const adminCount = await adminRegistry.getAdminCount();
    const superAdminCount = await adminRegistry.getSuperAdminCount();
    
    console.log("\n Initial State:");
    console.log("   Owner:", owner);
    console.log("   Total Admins:", adminCount.toString());
    console.log("   Super Admins:", superAdminCount.toString());
    
    // Get deployer's admin details
    const deployerAdmin = await adminRegistry.getAdmin("SUPER_ADMIN_001");
    console.log("\n Deployer Admin Details:");
    console.log("   Admin ID:", deployerAdmin.adminId_);
    console.log("   Wallet:", deployerAdmin.walletAddress);
    console.log("   Role:", deployerAdmin.role.toString());
    console.log("   Is Active:", deployerAdmin.isActive);
    console.log("   Is Super Admin:", deployerAdmin.isSuperAdmin);
    
    console.log("\n Deployment complete!\n");
    
    return {
        adminRegistry: address,
        deployer: deployer.address
    };
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
