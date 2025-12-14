# 🏦 TimeBank - Decentralized P2P Labor Exchange

> **Making labor markets fair and accessible through two-sided collateral**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Built with React](https://img.shields.io/badge/Built%20with-React-61DAFB?logo=react)](https://reactjs.org/)
[![Powered by Ethereum](https://img.shields.io/badge/Powered%20by-Ethereum-3C3C3D?logo=ethereum)](https://ethereum.org/)

---

## 📖 Table of Contents

- [Overview](#overview)
- [The Problem](#the-problem)
- [Our Solution](#our-solution)
- [How It Works](#how-it-works)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Demo](#demo)
- [Smart Contracts](#smart-contracts)
- [Future Scope](#future-scope)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

**TimeBank** is a decentralized platform that enables peer-to-peer labor exchange using blockchain technology. It solves the "free-rider problem" in P2P labor markets through an innovative **two-sided collateral system** where both parties stake equal amounts to ensure mutual accountability.

### Why TimeBank?

- 💰 **No upfront payment required** - Trade work promises instead of cash
- 🔒 **Two-sided accountability** - Both parties have skin in the game
- 🌐 **Fully decentralized** - No platform fees, no middlemen
- 🏆 **Reputation-based trust** - Build credibility through completed work
- 🔄 **Complete lifecycle** - From creation to redemption

---

## 🚨 The Problem

Traditional P2P labor markets suffer from critical trust issues:

- **Workers** deliver services but may not get paid
- **Clients** pay upfront but may not receive quality work
- **No accountability** mechanism to ensure fairness
- **Trust is required** but hard to establish between strangers

**Result:** The "free-rider problem" where one party benefits at the expense of the other.

---

## 💡 Our Solution: Two-Sided Collateral

### Key Innovation

**Both parties stake equal collateral** to create mutual accountability:

1. **Creator** (needs work done) stakes collateral
2. **Holder** (does the work) stakes equal collateral
3. Both have economic incentive to be honest
4. Disputes are resolved fairly with penalties for dishonesty

### Example

```
Alice needs painting (5 hours)
Alice stakes: 0.5 ETH

Bob accepts and paints
Bob stakes: 0.5 ETH

Total locked: 1.0 ETH

Both complete honestly:
✅ Both get collateral back
✅ Both earn +20 reputation
```

---

## 🔄 How It Works

### Complete Workflow

#### **Phase 1: IOU Creation**
1. Alice needs her shop painted but has no money
2. Alice creates an IOU: "Paint my shop, 5 hours"
3. Alice specifies what she offers: "Web Development"
4. Alice stakes **0.5 ETH collateral**
5. IOU appears in marketplace

#### **Phase 2: Acceptance**
1. Bob sees Alice's IOU in marketplace
2. Bob has painting skills, needs web development
3. Bob accepts the IOU
4. Bob stakes **0.5 ETH collateral** (equal amount)
5. **Total locked:** 1.0 ETH

#### **Phase 3: Work Delivery**
1. Bob paints Alice's shop
2. Bob clicks "Confirm Completion"
3. Alice receives notification
4. Alice verifies work and clicks "Confirm Completion"
5. **Both confirmed** → Work phase complete!

#### **Phase 4: Collateral Return & Reputation**
1. Both get their collateral back (0.5 ETH each)
2. Both earn **+20 reputation points**
3. IOU status: **Completed**
4. Bob now owns an IOU token worth "5 hours of Alice's web development"

#### **Phase 5: Redemption**
1. Bob needs a website coded
2. Bob clicks "Request Redemption"
3. Alice receives notification
4. Alice codes the website for Bob
5. Alice clicks "Confirm Delivered"
6. Bob verifies and clicks "Confirm Receipt"
7. **Both confirmed** → IOU fully redeemed!
8. IOU status: **Redeemed** 🎉

### Dispute Resolution

**What if someone doesn't deliver?**

**Example:** Bob painted but Alice refuses to confirm

1. Bob clicks "File Dispute"
2. Admin reviews evidence (screenshots, messages, files)
3. **If Bob is right:**
   - Bob gets: His 0.5 ETH + Alice's 0.5 ETH = **1.0 ETH**
   - Bob gets: **+20 reputation**
   - Alice loses: **-20 reputation**
4. **If Alice is right:**
   - Alice gets: Both collaterals
   - Bob loses: **-20 reputation**

**False Claim Penalty:**
- Filing a false dispute costs **-20 reputation**
- Discourages frivolous claims
- Ensures system integrity

---

## ✨ Key Features

### 🔐 Security
- **Two-sided collateral** - Mutual accountability
- **Dual confirmation** - Both parties must agree
- **Dispute system** - Fair resolution with evidence
- **Reputation tracking** - Transparent, on-chain history

### 💼 Skill Exchange
- **Specify your skill** - What you offer in exchange
- **Clear expectations** - Everyone knows what they get
- **Flexible trades** - Any skill for any skill
- **Market-driven** - Natural price discovery

### 🏆 Reputation System
- **Start at 100** - Everyone begins equal
- **+20 per completion** - Reward for honest work
- **-20 for disputes** - Penalty for dishonesty
- **Tiered benefits** - Higher reputation = lower collateral (future)

### 🎨 User Experience
- **Modern UI** - Beautiful, professional design
- **MetaMask integration** - Easy wallet connection
- **Real-time updates** - Instant status changes
- **Mobile responsive** - Works on all devices

---

## 🛠️ Tech Stack

### Smart Contracts
- **Solidity 0.8.20** - Smart contract language
- **Hardhat** - Development environment
- **OpenZeppelin** - Secure contract libraries
- **Sepolia Testnet** - Ethereum test network

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool
- **TypeScript** - Type safety
- **TailwindCSS** - Styling
- **shadcn/ui** - Component library
- **ethers.js v6** - Blockchain interaction

### Deployed Contracts (Sepolia)
```
SkillRegistry:  0xFccc03CfB8BB3E39815B0243979Cee869dF39398
Reputation:     0xFBc72F88cd5d4f51E80321c599f63C8735946c09
IOUToken:       0x0D97a173e2cb1ac9350BB0F513a66689D39b4241
TimeBank:       0x26b2E477048a6904513f538de0bBe4957320F371
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MetaMask** browser extension
- **Sepolia ETH** (for testnet)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/timebank.git

# Navigate to project directory
cd timebank

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Add your environment variables
# VITE_CONTRACT_ADDRESS_SKILL_REGISTRY=0xFccc03CfB8BB3E39815B0243979Cee869dF39398
# VITE_CONTRACT_ADDRESS_REPUTATION=0xFBc72F88cd5d4f51E80321c599f63C8735946c09
# VITE_CONTRACT_ADDRESS_IOU_TOKEN=0x0D97a173e2cb1ac9350BB0F513a66689D39b4241
# VITE_CONTRACT_ADDRESS_TIMEBANK=0x26b2E477048a6904513f538de0bBe4957320F371

# Start development server
npm run dev
```

### Using the App

1. **Install MetaMask** and create/import a wallet
2. **Switch to Sepolia** testnet in MetaMask
3. **Get Sepolia ETH** from a faucet (https://sepoliafaucet.com)
4. **Connect your wallet** on the TimeBank homepage
5. **Start creating or accepting IOUs!**

---

## 🎥 Demo

### Demo Mode

For demonstration purposes, the app uses **mock data** and **localStorage** to showcase features without requiring:
- Test ETH for every transaction
- Multiple MetaMask accounts
- Blockchain delays

**In production**, all data would be stored on-chain in smart contracts.

### Quick Demo Flow

1. **Create IOU** - Specify work needed and skill offered
2. **Accept IOU** - Browse marketplace and accept
3. **Complete Work** - Both parties confirm
4. **Redeem IOU** - Use the work promise later
5. **Dispute** - File if there's a problem

---

## 📜 Smart Contracts

### Architecture

```
SkillRegistry.sol    - Manages skill categories
Reputation.sol       - Tracks user reputation
IOUToken.sol         - NFT tokens for IOUs
TimeBank.sol         - Core logic (V1)
TimeBankV2.sol       - Enhanced with disputes (V2)
```

### Key Functions

**TimeBank.sol:**
```solidity
createIOU(description, hours, category, deadline)
acceptIOU(tokenId)
confirmCompletion(tokenId, isCreator)
fileDispute(tokenId)
```

**Reputation.sol:**
```solidity
getUserReputation(address)
updateReputation(address, points)
```

### Deployment

```bash
# Compile contracts
npx hardhat compile

# Deploy to Sepolia
npx hardhat run scripts/deploy.js --network sepolia

# Verify on Etherscan
npx hardhat verify --network sepolia CONTRACT_ADDRESS
```

---

## 🚀 Future Scope

### V2 Features (3-6 Months)

#### 1. Reputation-Based Collateral Reduction

**Current:** Fixed 0.1 ETH per hour for everyone

**Future:** Dynamic collateral based on reputation

```
Beginner (100 rep):  0.1 ETH/hour
Trusted (200 rep):   0.05 ETH/hour
Expert (500 rep):    0.025 ETH/hour
```

**Benefits:**
- Rewards trusted users
- Lowers barrier for experienced workers
- Incentivizes good behavior

#### 2. Reputation-Gated Large Tasks

**Tier System:**
```
Beginner (0-99):     Max 5 hours per IOU
Trusted (100-199):   Max 20 hours per IOU
Verified (200-299):  Max 50 hours per IOU
Expert (300+):       Unlimited
```

**Benefits:**
- Protects users from large scams
- Ensures quality for big projects
- Creates progression system

#### 3. IOU Marketplace & Trading

**Trade IOUs like NFTs:**

```
Scenario:
1. Alice (Painter) creates IOU, offers painting
2. Bob (Coder) accepts, paints house
3. Bob receives IOU worth "5 hours of Alice's painting"
4. Bob doesn't need painting
5. Bob lists IOU on marketplace for 0.3 ETH
6. Carol needs painting, buys IOU
7. Carol redeems IOU for painting
```

**Benefits:**
- Liquidity for work promises
- Market-driven pricing
- Flexibility for workers
- True labor marketplace

### V3 Features (6-12 Months)

#### 1. Skill-Based Value Multipliers

```
Skill Tiers:
Basic (Cleaning):        1x
Skilled (Design):        2x
Technical (Coding):      3x
Expert (Legal):          5x

Example:
10 hours painting (1x) = 10 points
Fair exchange: 3.33 hours coding (3x)
```

#### 2. DAO Governance
- Community voting on disputes
- Token-based governance
- Decentralized decision making

#### 3. Multi-Chain Support
- Polygon (low fees)
- Arbitrum (fast transactions)
- Cross-chain bridges

#### 4. Fiat On-Ramps
- Credit card payments
- Bank transfers
- Automatic crypto conversion

#### 5. Mobile App
- iOS and Android apps
- Push notifications
- Mobile-first design

### Advanced Features (12+ Months)

- **Skill Verification** - Portfolio integration, certifications
- **Escrow Services** - Milestone-based payments
- **Insurance Pool** - Community protection fund
- **Social Features** - Profiles, reviews, messaging
- **Analytics Dashboard** - Earnings tracking, insights

---

## 📊 Market Opportunity

- **Gig Economy:** $400B+ market globally
- **Financial Inclusion:** Enables people with skills but no cash
- **Trust Problem:** Solved through collateral + reputation
- **Global Reach:** Blockchain enables worldwide access

### Target Users

1. **Students** - Have skills, no money
2. **Freelancers** - Diversify income
3. **Small Businesses** - Barter services
4. **Developing Countries** - Financial inclusion

---

## 🎯 Competitive Advantages

### vs Traditional Platforms (Fiverr, Upwork)
- ✅ No upfront payment required
- ✅ Two-sided accountability
- ✅ Decentralized (no 20% platform fees)
- ✅ Tradeable work promises

### vs Other Blockchain Solutions
- ✅ Two-sided collateral (unique!)
- ✅ Dual confirmation system
- ✅ Integrated dispute resolution
- ✅ Reputation-based trust

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style
- Write clear commit messages
- Add tests for new features
- Update documentation

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Contact & Links

- **GitHub:** [Repository Link]
- **Demo Video:** [Coming Soon]
- **Email:** [Your Email]
- **Twitter:** [@TimeBank]

---

## 🙏 Acknowledgments

- Built for the hackathon with ❤️
- Inspired by the need for fair labor markets
- Thanks to the Ethereum community
- Special thanks to all contributors

---

## 📈 Roadmap

```
Q1 2025: MVP Launch (Hackathon) ✅
  ✅ Core features
  ✅ Demo on testnet
  ✅ Community feedback

Q2 2025: V2 Development
  - Reputation-based collateral
  - Large task gating
  - IOU marketplace

Q3 2025: Mainnet Launch
  - Security audits
  - Bug bounty program
  - Public launch

Q4 2025: Scale & Grow
  - Marketing campaign
  - Partnership deals
  - Mobile app beta

2026: Global Expansion
  - Multi-chain support
  - Fiat on-ramps
  - International markets
```

---

## 💪 Why We'll Succeed

1. **Unique Solution** - Two-sided collateral is innovative
2. **Real Problem** - Free-rider problem is well-known
3. **Large Market** - $400B+ gig economy
4. **Strong Execution** - Working MVP
5. **Clear Vision** - Detailed roadmap
6. **Passionate Team** - Committed to the mission

---

<div align="center">

**TimeBank - Making labor markets fair and accessible for everyone** 🌍

*Built with ❤️ for a better, more equitable world*

[Get Started](#getting-started) • [View Demo](#demo) • [Contribute](#contributing)

</div>
