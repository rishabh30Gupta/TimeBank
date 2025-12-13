import hre from "hardhat";

async function main() {
  console.log("🚀 Deploying TimeBankV2 (Two-Sided Collateral System)...\n");

  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with account:", deployer.address);
  console.log("Account balance:", (await hre.ethers.provider.getBalance(deployer.address)).toString());

  // Deploy SkillRegistry
  console.log("\n1️⃣ Deploying SkillRegistry...");
  const SkillRegistry = await hre.ethers.getContractFactory("SkillRegistry");
  const skillRegistry = await SkillRegistry.deploy();
  await skillRegistry.waitForDeployment();
  const skillRegistryAddress = await skillRegistry.getAddress();
  console.log("✅ SkillRegistry deployed to:", skillRegistryAddress);

  // Deploy Reputation
  console.log("\n2️⃣ Deploying Reputation...");
  const Reputation = await hre.ethers.getContractFactory("Reputation");
  const reputation = await Reputation.deploy();
  await reputation.waitForDeployment();
  const reputationAddress = await reputation.getAddress();
  console.log("✅ Reputation deployed to:", reputationAddress);

  // Deploy IOUToken
  console.log("\n3️⃣ Deploying IOUToken...");
  const IOUToken = await hre.ethers.getContractFactory("IOUToken");
  const iouToken = await IOUToken.deploy();
  await iouToken.waitForDeployment();
  const iouTokenAddress = await iouToken.getAddress();
  console.log("✅ IOUToken deployed to:", iouTokenAddress);

  // Deploy TimeBankV2
  console.log("\n4️⃣ Deploying TimeBankV2...");
  const TimeBankV2 = await hre.ethers.getContractFactory("TimeBankV2");
  const timeBankV2 = await TimeBankV2.deploy(
    iouTokenAddress,
    reputationAddress,
    skillRegistryAddress
  );
  await timeBankV2.waitForDeployment();
  const timeBankV2Address = await timeBankV2.getAddress();
  console.log("✅ TimeBankV2 deployed to:", timeBankV2Address);

  // Configure contracts
  console.log("\n5️⃣ Configuring contracts...");
  await iouToken.setTimeBankContract(timeBankV2Address);
  console.log("✅ IOUToken configured");
  
  await reputation.setTimeBankContract(timeBankV2Address);
  console.log("✅ Reputation configured");

  console.log("\n🎉 All contracts deployed successfully!");
  console.log("\n" + "=".repeat(60));
  console.log("📝 CONTRACT ADDRESSES (V2 - Two-Sided Collateral):");
  console.log("=".repeat(60));
  console.log("SkillRegistry:", skillRegistryAddress);
  console.log("Reputation:", reputationAddress);
  console.log("IOUToken:", iouTokenAddress);
  console.log("TimeBankV2:", timeBankV2Address);
  console.log("=".repeat(60));

  console.log("\n📋 Add these to your .env file:");
  console.log("=".repeat(60));
  console.log(`VITE_CONTRACT_ADDRESS_SKILL_REGISTRY=${skillRegistryAddress}`);
  console.log(`VITE_CONTRACT_ADDRESS_REPUTATION=${reputationAddress}`);
  console.log(`VITE_CONTRACT_ADDRESS_IOU_TOKEN=${iouTokenAddress}`);
  console.log(`VITE_CONTRACT_ADDRESS_TIMEBANK_V2=${timeBankV2Address}`);
  console.log("=".repeat(60));

  console.log("\n🔗 View on Etherscan:");
  console.log(`https://sepolia.etherscan.io/address/${timeBankV2Address}`);

  console.log("\n💡 Key Features:");
  console.log("✅ Two-sided collateral (both parties stake)");
  console.log("✅ Dispute resolution by admin");
  console.log("✅ False claim penalties (-20 reputation)");
  console.log("✅ Fair compensation system");
  console.log("✅ Reduced collateral (0.1 ETH per hour for demo)");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
