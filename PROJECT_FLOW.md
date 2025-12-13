# TimeBank - Complete Project Flow

## 🎯 **What is TimeBank?**

TimeBank is a decentralized marketplace where people trade **future work promises** (IOUs) as NFTs. No money needed - just skills!

**Example:**
- Alice needs tutoring but has no cash
- She creates an IOU: "I'll design a logo in 30 days"
- Bob accepts the IOU and tutors Alice today
- Bob can trade Alice's IOU to someone who needs design
- In 30 days, whoever holds the IOU gets the logo from Alice

---

## 📊 **System Architecture Flow**

```
┌─────────────────────────────────────────────────────────────┐
│                     USER INTERFACE (React)                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Home    │  │ Create   │  │Marketplace│ │ My IOUs  │   │
│  │  Page    │  │   IOU    │  │          │  │          │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                    WEB3 INTEGRATION                          │
│              (ethers.js + MetaMask)                          │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│              SMART CONTRACTS (Sepolia Blockchain)            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  IOUToken    │  │  TimeBank    │  │  Reputation  │      │
│  │  (NFTs)      │  │  (Logic)     │  │  (Scores)    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│  ┌──────────────┐                                           │
│  │SkillRegistry │                                           │
│  │ (Categories) │                                           │
│  └──────────────┘                                           │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 **Complete User Flow**

### **Scenario: Alice Needs Tutoring, Bob is a Tutor**

```
┌─────────────────────────────────────────────────────────────┐
│                    STEP 1: CREATE IOU                        │
└─────────────────────────────────────────────────────────────┘

Alice (Student):
1. Opens TimeBank website
2. Connects MetaMask wallet
3. Clicks "Create IOU"
4. Fills form:
   - Work: "Design a logo"
   - Hours: 2
   - Skill: Skilled (20 pts/hr)
   - Deadline: 30 days
5. Stakes collateral: 20 tokens
6. Clicks "Create IOU"

What Happens:
→ MetaMask popup: "Confirm transaction"
→ Alice confirms
→ Smart Contract: TimeBank.createIOU()
→ Smart Contract: IOUToken.mintIOU()
→ NFT created with ID #1
→ Alice's collateral locked in contract
→ IOU appears in marketplace

Result: IOU #1 exists, Alice owns it
```

```
┌─────────────────────────────────────────────────────────────┐
│                 STEP 2: BOB ACCEPTS IOU                      │
└─────────────────────────────────────────────────────────────┘

Bob (Tutor):
1. Opens TimeBank website
2. Connects MetaMask
3. Goes to "Marketplace"
4. Sees Alice's IOU:
   - "Design a logo"
   - 40 skill points (2 hrs × 20 pts)
   - Deadline: 30 days
5. Clicks "Accept IOU"

What Happens:
→ MetaMask popup: "Confirm transaction"
→ Bob confirms
→ Smart Contract: IOUToken.transferIOU()
→ IOU #1 transfers from Alice to Bob
→ Bob now owns the IOU NFT

Result: Bob owns IOU, Alice still owes the work
```

```
┌─────────────────────────────────────────────────────────────┐
│              STEP 3: BOB TUTORS ALICE (OFF-CHAIN)            │
└─────────────────────────────────────────────────────────────┘

Real World:
- Bob tutors Alice for 2 hours
- This happens outside the blockchain
- They meet/video call/etc.

Result: Alice got help, Bob completed his service
```

```
┌─────────────────────────────────────────────────────────────┐
│            STEP 4: BOB TRADES IOU TO CAROL                   │
└─────────────────────────────────────────────────────────────┘

Bob (doesn't need design):
1. Goes to "My IOUs" → "IOUs I Hold"
2. Sees Alice's IOU
3. Clicks "Trade"
4. Lists it on marketplace

Carol (needs a logo):
1. Browses marketplace
2. Sees Alice's IOU
3. Clicks "Accept"

What Happens:
→ Smart Contract: IOUToken.transferIOU()
→ IOU #1 transfers from Bob to Carol
→ Carol now owns the IOU

Result: Carol owns IOU, Alice still owes work to whoever holds it
```

```
┌─────────────────────────────────────────────────────────────┐
│              STEP 5: CAROL REDEEMS IOU                       │
└─────────────────────────────────────────────────────────────┘

Carol (after 30 days):
1. Goes to "My IOUs" → "IOUs I Hold"
2. Clicks "Redeem IOU"

What Happens:
→ Smart Contract: TimeBank.redeemIOU()
→ IOU marked as "redeemed"
→ Alice gets notification

Result: Alice knows she needs to deliver work to Carol
```

```
┌─────────────────────────────────────────────────────────────┐
│           STEP 6: ALICE DELIVERS WORK (OFF-CHAIN)            │
└─────────────────────────────────────────────────────────────┘

Real World:
- Alice designs logo for Carol
- Sends files via email/drive
- Carol reviews and approves

Result: Work completed in real world
```

```
┌─────────────────────────────────────────────────────────────┐
│            STEP 7: BOTH CONFIRM COMPLETION                   │
└─────────────────────────────────────────────────────────────┘

Alice:
1. Goes to "My IOUs" → "IOUs I Created"
2. Clicks "Confirm Completion"

Carol:
1. Goes to "My IOUs" → "IOUs I Hold"
2. Clicks "Confirm Completion"

What Happens:
→ Smart Contract: TimeBank.confirmCompletion() (Alice)
→ Smart Contract: TimeBank.confirmCompletion() (Carol)
→ Both confirmed? → _completeIOU()
→ Alice's 20 tokens returned
→ Alice's reputation +10
→ IOU marked as "completed"

Result: Alice got collateral back, reputation improved
```

---

## 🎮 **Alternative Flow: Alice Defaults**

```
┌─────────────────────────────────────────────────────────────┐
│              WHAT IF ALICE DOESN'T DELIVER?                  │
└─────────────────────────────────────────────────────────────┘

Scenario:
- Carol redeemed IOU
- 30 days passed
- Alice didn't deliver logo

Carol:
1. Goes to "My IOUs"
2. Clicks "Report Default"

What Happens:
→ Smart Contract: TimeBank.reportDefault()
→ Checks: deadline passed? ✓
→ Checks: work completed? ✗
→ Alice's 20 tokens → sent to Carol (compensation)
→ Alice's reputation -100 (penalty)
→ Alice can't create new IOUs until reputation rebuilt

Result: Carol gets compensated, Alice penalized
```

---

## 🏗️ **Technical Flow (Behind the Scenes)**

### **When Alice Creates IOU:**

```
Frontend (CreateIOU.tsx)
    ↓
User fills form
    ↓
Click "Create IOU"
    ↓
Web3 Hook (useWeb3.ts)
    ↓
Call: timeBank.createIOU(description, hours, category, deadline)
    ↓
MetaMask: "Confirm transaction + send 20 tokens"
    ↓
User confirms
    ↓
Transaction sent to Sepolia blockchain
    ↓
Smart Contract: TimeBank.sol
    ↓
1. Check collateral amount ✓
2. Get user's reputation multiplier
3. Calculate skill points
4. Call: iouToken.mintIOU()
    ↓
Smart Contract: IOUToken.sol
    ↓
1. Mint NFT with ID
2. Set creator = Alice
3. Set holder = Alice
4. Store IOU details
5. Emit IOUCreated event
    ↓
Transaction confirmed
    ↓
Frontend updates
    ↓
IOU appears in marketplace
```

---

## 📱 **Page-by-Page Flow**

### **1. Home Page (Index.tsx)**
```
User arrives
    ↓
Sees stats: "2,847 Active IOUs", "98.2% Completion Rate"
    ↓
Two buttons:
  - "Create IOU" → Goes to Create page
  - "Browse Marketplace" → Goes to Marketplace
```

### **2. Create IOU Page (CreateIOU.tsx)**
```
User clicks "Create IOU"
    ↓
Form appears:
  - Work description
  - Hours
  - Skill category
  - Deadline
    ↓
Shows: "Total: 40 skill points"
Shows: "Collateral: 20 tokens"
    ↓
User clicks "Create IOU"
    ↓
MetaMask popup
    ↓
Transaction confirmed
    ↓
Success message
    ↓
Redirect to "My IOUs"
```

### **3. Marketplace Page (Marketplace.tsx)**
```
User clicks "Marketplace"
    ↓
Smart Contract: getMarketplaceIOUs()
    ↓
Returns: [IOU #1, IOU #5, IOU #12, ...]
    ↓
For each IOU:
  - Fetch details
  - Display card:
    * Work description
    * Skill points
    * Creator's reputation badge
    * Deadline
    * "Accept" button
    ↓
User clicks "Accept"
    ↓
MetaMask popup
    ↓
IOU transfers to user
```

### **4. My IOUs Page (MyIOUs.tsx)**
```
Two tabs:

Tab 1: "IOUs I Created" (work I owe)
    ↓
Smart Contract: getIOUsByCreator(userAddress)
    ↓
Shows list with status:
  - Pending (not redeemed yet)
  - Redeemed (need to deliver)
  - Completed (done!)
    ↓
Actions:
  - "Confirm Completion" (if redeemed)

Tab 2: "IOUs I Hold" (work owed to me)
    ↓
Smart Contract: getIOUsByHolder(userAddress)
    ↓
Shows list
    ↓
Actions:
  - "Redeem" (request work)
  - "Trade" (sell to someone else)
  - "Confirm Completion" (after work done)
```

### **5. Reputation Page (Reputation.tsx)**
```
User clicks "Reputation"
    ↓
Smart Contract: getUserStats(userAddress)
    ↓
Displays:
  - Reputation score: 450
  - Tier: Silver (with badge)
  - Completed IOUs: 12
  - Defaulted IOUs: 1
  - Completion rate: 92%
  - Progress bar to next tier
```

---

## 🔐 **Smart Contract Interactions**

### **IOUToken.sol (NFT Contract)**
```
Functions:
- mintIOU() → Create new IOU NFT
- transferIOU() → Trade IOU to someone
- markRedeemed() → Mark as redeemed
- markCompleted() → Mark as completed
- getIOU() → Get IOU details
- getIOUsByCreator() → Get all IOUs user created
- getIOUsByHolder() → Get all IOUs user holds
```

### **TimeBank.sol (Main Logic)**
```
Functions:
- createIOU() → Create new work promise
- redeemIOU() → Request work from creator
- confirmCompletion() → Confirm work done
- reportDefault() → Report if work not delivered
- getMarketplaceIOUs() → Get available IOUs
```

### **Reputation.sol (Scoring)**
```
Functions:
- updateReputation() → Update user score
- getReputationScore() → Get user's score
- getReputationTier() → Get tier (Bronze/Silver/Gold)
- getReputationMultiplier() → Get multiplier (1x/1.2x/1.5x)
- getUserStats() → Get all stats
- getCompletionRate() → Get completion percentage
```

### **SkillRegistry.sol (Categories)**
```
Functions:
- calculateSkillPoints() → Calculate points for work
- getPointsPerHour() → Get points for category

Categories:
- BASIC: 10 pts/hr (moving, cleaning)
- SKILLED: 20 pts/hr (design, writing)
- TECHNICAL: 30 pts/hr (coding, tutoring)
- EXPERT: 50 pts/hr (legal, medical)
```

---

## 🎯 **Data Flow Example**

### **Creating an IOU:**
```
User Input:
  Work: "Design logo"
  Hours: 2
  Category: SKILLED
  Deadline: 30 days

Calculations:
  Base points: 20 pts/hr × 2 hrs = 40 pts
  User reputation: Silver (1.2x multiplier)
  Final points: 40 × 1.2 = 48 pts
  Collateral: 2 hrs × 10 tokens = 20 tokens

Blockchain Storage:
  IOU #1 {
    id: 1
    creator: 0xAlice...
    holder: 0xAlice...
    description: "Design logo"
    skillPoints: 48
    deadline: timestamp + 30 days
    collateral: 20 tokens
    redeemed: false
    completed: false
  }
```

---

## 🚀 **Deployment Flow**

```
1. Developer (You)
    ↓
Compile contracts
    ↓
Deploy to Sepolia:
  - SkillRegistry
  - Reputation
  - IOUToken
  - TimeBank
    ↓
Get contract addresses
    ↓
Update .env file
    ↓
Build frontend
    ↓
Deploy frontend to Vercel/Netlify

2. Users
    ↓
Visit website
    ↓
Connect MetaMask
    ↓
Start creating/trading IOUs
```

---

## 📊 **Summary Diagram**

```
┌─────────────┐
│    USER     │
└──────┬──────┘
       │
       ↓
┌─────────────┐     ┌──────────────┐
│  FRONTEND   │────→│   METAMASK   │
│   (React)   │     │   (Wallet)   │
└──────┬──────┘     └──────┬───────┘
       │                   │
       ↓                   ↓
┌─────────────────────────────────┐
│    SEPOLIA BLOCKCHAIN           │
│  ┌──────────┐  ┌──────────┐    │
│  │IOUToken  │  │TimeBank  │    │
│  │  (NFTs)  │  │ (Logic)  │    │
│  └──────────┘  └──────────┘    │
│  ┌──────────┐  ┌──────────┐    │
│  │Reputation│  │ Skill    │    │
│  │ (Scores) │  │Registry  │    │
│  └──────────┘  └──────────┘    │
└─────────────────────────────────┘
```

---

## ✅ **Key Takeaways**

1. **IOUs are NFTs** - They can be traded like any NFT
2. **Collateral ensures delivery** - Creators stake tokens
3. **Reputation matters** - Good performers earn more
4. **Fully decentralized** - No central server
5. **Both parties must confirm** - Prevents fraud
6. **Defaults are penalized** - Lose collateral + reputation

---

This is the complete flow of TimeBank! Any questions about how it works? 🚀
