import pkg from 'hardhat';
const { ethers } = pkg;

async function main() {
  const Adder = await ethers.getContractFactory("Adder");
  const adder = await Adder.deploy();

  await adder.waitForDeployment();

  console.log("Adder deployed to:", await adder.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});