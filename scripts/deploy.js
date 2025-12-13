import hre from "hardhat";
import { ethers } from "ethers";

async function main() {
  console.log("Deploying TimeBank contracts...");

  // Get signer
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  // Deploy SkillRegistry
  console.log("\n1. Deploying SkillRegistry...");
  const SkillRegistry = await hre.ethers.getContractFactory("SkillRegistry");
  const skillRegistry = await SkillRegistry.deploy();
  await skillRegistry.waitForDeployment();
  const skillRegistryAddress = await skillRegistry.getAddress();
  console.log("✅ SkillRegistry deployed to:", skillRegistryAddress);

  // Deploy Reputation
  console.log("\n2. Deploying Reputation...");
  const Reputation = await hre.ethers.getContractFactory("Reputation");
  const reputation = await Reputation.deploy();
  await reputation.waitForDeployment();
  const reputationAddress = await reputation.getAddress();
  console.log("✅ Reputation deployed to:", reputationAddress);

  // Deploy IOUToken
  console.log("\n3. Deploying IOUToken...");
  const IOUToken = await hre.ethers.getContractFactory("IOUToken");
  const iouToken = await IOUToken.deploy();
  await iouToken.waitForDeployment();
  const iouTokenAddress = await iouToken.getAddress();
  console.log("✅ IOUToken deployed to:", iouTokenAddress);

  // Deploy TimeBank
  console.log("\n4. Deploying TimeBank...");
  const TimeBank = await hre.ethers.getContractFactory("TimeBank");
  const timeBank = await TimeBank.deploy(
    iouTokenAddress,
    reputationAddress,
    skillRegistryAddress
  );
  await timeBank.waitForDeployment();
  const timeBankAddress = await timeBank.getAddress();
  console.log("✅ TimeBank deployed to:", timeBankAddress);

  // Set TimeBank contract address in IOUToken and Reputation
  console.log("\n5. Configuring contracts...");
  await iouToken.setTimeBankContract(timeBankAddress);
  console.log("✅ IOUToken configured");
  
  await reputation.setTimeBankContract(timeBankAddress);
  console.log("✅ Reputation configured");

  console.log("\n🎉 All contracts deployed successfully!");
  console.log("\n📝 Contract Addresses:");
  console.log("====================");
  console.log("SkillRegistry:", skillRegistryAddress);
  console.log("Reputation:", reputationAddress);
  console.log("IOUToken:", iouTokenAddress);
  console.log("TimeBank:", timeBankAddress);

  console.log("\n📋 Add these to your .env file:");
  console.log("====================");
  console.log(`VITE_CONTRACT_ADDRESS_SKILL_REGISTRY=${skillRegistryAddress}`);
  console.log(`VITE_CONTRACT_ADDRESS_REPUTATION=${reputationAddress}`);
  console.log(`VITE_CONTRACT_ADDRESS_IOU_TOKEN=${iouTokenAddress}`);
  console.log(`VITE_CONTRACT_ADDRESS_TIMEBANK=${timeBankAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
