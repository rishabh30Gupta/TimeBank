# Complete Beginner's Guide to TimeBank Setup

## 🎯 What We're Going to Do

We need to:
1. Install MetaMask (crypto wallet)
2. Get free test money (Sepolia ETH)
3. Deploy our smart contracts to blockchain
4. Connect frontend to contracts
5. Test the app

**Total time: ~30 minutes**

---

## Step 1: Install MetaMask (5 minutes)

### What is MetaMask?
MetaMask is a digital wallet (like a bank account) for cryptocurrency. We need it to:
- Deploy smart contracts
- Test our app
- Sign transactions

### How to Install:

1. **Go to MetaMask website**
   - Open browser: https://metamask.io/download/
   - Click "Install MetaMask for Chrome" (or your browser)

2. **Install the extension**
   - Click "Add to Chrome"
   - Click "Add extension"

3. **Create a new wallet**
   - Click the MetaMask icon in browser toolbar
   - Click "Create a new wallet"
   - Click "I agree"
   - Create a password (remember this!)
   - Click "Create a new wallet"

4. **IMPORTANT: Save your Secret Recovery Phrase**
   - You'll see 12 words
   - **WRITE THESE DOWN ON PAPER** (very important!)
   - Never share these with anyone
   - Click "Next"
   - Confirm the words
   - Click "Confirm"

5. **Done!** You now have a MetaMask wallet ✅

---

## Step 2: Switch to Sepolia Test Network (2 minutes)

### What is Sepolia?
Sepolia is a "test" blockchain. It's like a practice version where everything is free. We use it for testing before going to the real blockchain.

### How to Switch:

1. **Open MetaMask**
   - Click the MetaMask icon in your browser

2. **Enable test networks**
   - Click the network dropdown (top left, says "Ethereum Mainnet")
   - Click "Show test networks" at the bottom
   - Toggle it ON

3. **Select Sepolia**
   - Click the network dropdown again
   - Select "Sepolia test network"
   - You should now see "Sepolia" at the top

4. **Copy your wallet address**
   - Click on your account name (top center)
   - It will copy your address (looks like: 0x1234...)
   - **Save this somewhere** - we'll need it

---

## Step 3: Get Free Test ETH (5 minutes)

### What is Test ETH?
Test ETH is fake money used on Sepolia. It's completely free and only works on test networks.

### How to Get It:

**Option 1: Alchemy Faucet (Recommended)**
1. Go to: https://www.alchemy.com/faucets/ethereum-sepolia
2. Sign in with Google (or create account)
3. Paste your wallet address (from Step 2)
4. Click "Send Me ETH"
5. Wait 30 seconds
6. Check MetaMask - you should see 0.5 ETH!

**Option 2: Infura Faucet**
1. Go to: https://www.infura.io/faucet/sepolia
2. Sign up (free)
3. Paste your wallet address
4. Click "Receive ETH"

**Option 3: QuickNode Faucet**
1. Go to: https://faucet.quicknode.com/ethereum/sepolia
2. Paste your wallet address
3. Complete captcha
4. Click "Continue"

### Verify You Got ETH:
- Open MetaMask
- You should see something like "0.5 ETH" or "0.1 ETH"
- If yes, you're ready! ✅

---

## Step 4: Get Your Private Key (3 minutes)

### What is a Private Key?
Your private key is like a password that lets you deploy contracts. We need it for the deployment script.

### How to Get It:

1. **Open MetaMask**
   - Click the MetaMask icon

2. **Go to Account Details**
   - Click the three dots (⋮) next to your account name
   - Click "Account details"

3. **Show Private Key**
   - Click "Show private key"
   - Enter your MetaMask password
   - Click "Confirm"
   - Click "Hold to reveal Private Key"
   - **Copy the key** (long string of letters/numbers)

4. **IMPORTANT: Keep this SECRET!**
   - Never share this with anyone
   - Don't post it online
   - Don't commit it to GitHub
   - Anyone with this key can steal your crypto

---

## Step 5: Create .env File (2 minutes)

### What is .env?
This file stores secret information (like your private key) that the deployment script needs.

### How to Create:

1. **Open your project folder**
   ```
   d:\Projects\PeerBand\future-work-exchange-frontend
   ```

2. **Create a new file called `.env`**
   - Right-click in the folder
   - New → Text Document
   - Name it `.env` (delete the .txt extension)
   - If Windows asks "Are you sure?", click Yes

3. **Open .env in Notepad**
   - Right-click `.env`
   - Open with → Notepad

4. **Paste this content:**
   ```
   SEPOLIA_RPC_URL=https://rpc.sepolia.org
   PRIVATE_KEY=paste_your_private_key_here
   ```

5. **Replace `paste_your_private_key_here` with your actual private key**
   - Example:
   ```
   SEPOLIA_RPC_URL=https://rpc.sepolia.org
   PRIVATE_KEY=0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
   ```

6. **Save the file** (Ctrl+S)

7. **Done!** ✅

---

## Step 6: Compile Smart Contracts (3 minutes)

### What is Compiling?
Compiling converts our Solidity code into a format the blockchain can understand.

### How to Compile:

1. **Open Terminal/PowerShell**
   - Press `Windows Key + R`
   - Type `powershell`
   - Press Enter

2. **Navigate to project folder**
   ```powershell
   cd d:\Projects\PeerBand\future-work-exchange-frontend
   ```

3. **Run compile command**
   ```powershell
   npx hardhat compile
   ```

4. **Wait for it to finish**
   - You should see: "Compiled X Solidity files successfully"
   - If you see errors, tell me and I'll help fix them

5. **Done!** ✅

---

## Step 7: Deploy to Sepolia (5 minutes)

### What is Deploying?
Deploying uploads our smart contracts to the Sepolia blockchain. Once deployed, they'll have permanent addresses.

### How to Deploy:

1. **Make sure you're in the project folder**
   ```powershell
   cd d:\Projects\PeerBand\future-work-exchange-frontend
   ```

2. **Run deployment script**
   ```powershell
   npx hardhat run scripts/deploy.js --network sepolia
   ```

3. **Wait for deployment** (takes 2-3 minutes)
   - You'll see:
   ```
   Deploying TimeBank contracts...
   1. Deploying SkillRegistry...
   ✅ SkillRegistry deployed to: 0x1234...
   2. Deploying Reputation...
   ✅ Reputation deployed to: 0x5678...
   ...
   ```

4. **Copy the contract addresses**
   - You'll see 4 addresses at the end
   - Copy them all
   - Save them in a text file

5. **Done!** Your contracts are now on the blockchain! ✅

---

## Step 8: Update Frontend .env (2 minutes)

### Why?
The frontend needs to know where your contracts are deployed.

### How to Update:

1. **Open `.env` file again**

2. **Add the contract addresses** (from Step 7)
   ```
   SEPOLIA_RPC_URL=https://rpc.sepolia.org
   PRIVATE_KEY=your_private_key_here
   
   VITE_CONTRACT_ADDRESS_SKILL_REGISTRY=0x1234...
   VITE_CONTRACT_ADDRESS_REPUTATION=0x5678...
   VITE_CONTRACT_ADDRESS_IOU_TOKEN=0x9abc...
   VITE_CONTRACT_ADDRESS_TIMEBANK=0xdef0...
   ```

3. **Save the file**

4. **Done!** ✅

---

## Step 9: Tell Me You're Ready! 🎉

Once you've completed Steps 1-8, tell me:

**"I'm ready! I have:"**
- ✅ MetaMask installed
- ✅ Sepolia ETH in wallet
- ✅ .env file created
- ✅ Contracts compiled
- ✅ Contracts deployed
- ✅ Contract addresses saved

Then I'll:
1. Create Web3 integration files
2. Connect frontend to your deployed contracts
3. Help you test the app
4. Create the demo

---

## 🆘 Troubleshooting

### "I can't install MetaMask"
- Try a different browser (Chrome, Firefox, Brave)
- Make sure you're on the official site: metamask.io

### "Faucet says 'No ETH available'"
- Try a different faucet (I listed 3 options)
- Wait a few hours and try again
- Join Sepolia Discord and ask for ETH

### "Compilation failed"
- Share the error message with me
- I'll help fix it

### "Deployment failed"
- Check if you have Sepolia ETH in MetaMask
- Check if your private key is correct in .env
- Share the error with me

### "I lost my private key"
- You can get it again from MetaMask (Step 4)
- Never share it with anyone except in .env file

---

## 📝 Quick Checklist

Before you start, make sure you have:
- [ ] Chrome/Firefox/Brave browser
- [ ] Internet connection
- [ ] 30 minutes of time
- [ ] Paper and pen (for recovery phrase)

After completing all steps:
- [ ] MetaMask installed with Sepolia network
- [ ] 0.1+ ETH in wallet
- [ ] .env file created with private key
- [ ] Contracts compiled successfully
- [ ] Contracts deployed to Sepolia
- [ ] Contract addresses saved

---

## 🚀 Ready to Start?

**Start with Step 1** and work your way through. Take your time!

If you get stuck at ANY step, just tell me:
- "I'm stuck at Step X"
- Share any error messages
- I'll help you immediately

Let's build this! 💪
