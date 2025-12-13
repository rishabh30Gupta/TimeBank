# 🎯 QUICK FIX: Try These Steps

## ⚠️ **Current Issue:**

The Sepolia RPC (`https://rpc.sepolia.org`) is having connectivity issues (error 522).

---

## ✅ **Solution 1: Use Different RPC**

Update your `.env` file:

```bash
# Change this line:
SEPOLIA_RPC_URL=https://rpc.sepolia.org

# To this:
SEPOLIA_RPC_URL=https://ethereum-sepolia.publicnode.com
```

Then **restart the dev server**:
1. Press `Ctrl+C` in the terminal running `npm run dev`
2. Run `npm run dev` again

---

## ✅ **Solution 2: Wait 5 Minutes**

The RPC might just be temporarily down. Try again in 5 minutes.

---

## ✅ **Solution 3: Test with These EXACT Steps**

Once the app loads:

### 1. **Connect Wallet**
- Click "Connect Wallet" (top right)
- Confirm in MetaMask
- See your address appear

### 2. **Create Test IOU**
Go to "Create IOU" and enter:
- **Description:** `Test IOU for demo`
- **Hours:** `0.01` ⭐ (IMPORTANT: Use 0.01!)
- **Category:** `Basic`
- **Deadline:** `30`

### 3. **Verify Collateral**
You should see:
- **Total Value:** 0.1 Skill Points
- **Collateral Required:** 0.1 ETH ✅

### 4. **Create IOU**
- Click "Create IOU & Stake Collateral"
- **Confirm in MetaMask**
- Wait 10-20 seconds
- **Success!** 🎉

---

## 🔍 **If Still Getting Errors:**

### Share These Details:

1. **What error message do you see?**
   - Take a screenshot
   - Or copy the error text

2. **What values did you enter?**
   - Hours: ?
   - Category: ?

3. **MetaMask status:**
   - Connected? (Yes/No)
   - Network: ? (should be "Sepolia")
   - Balance: ? (should be ~0.31 ETH)

---

## 💡 **Most Common Mistakes:**

| Mistake | Fix |
|---------|-----|
| Using 2 hours | Use 0.01 hours instead |
| Wrong network | Switch to Sepolia in MetaMask |
| Not connected | Click "Connect Wallet" |
| Not enough ETH | Use 0.01 hours (needs only 0.1 ETH) |

---

## 🎯 **Expected Result:**

When it works, you'll see:
1. ✅ Toast notification: "IOU Created! 🎉"
2. ✅ Transaction hash shown
3. ✅ Form resets
4. ✅ Can go to Marketplace and see your IOU

---

## 📸 **Share Your Screen:**

If you're still stuck, share a screenshot showing:
- The Create IOU form (with values filled in)
- Any error messages
- MetaMask status

I'll help you fix it immediately! 🚀

---

## ⏰ **Quick Status:**

- ✅ Contracts deployed
- ✅ Frontend built
- ✅ You have ETH
- ⚠️ RPC might be slow
- 🎯 Use 0.01 hours for testing

**You're SO close!** Just need to get past this RPC issue. 💪
