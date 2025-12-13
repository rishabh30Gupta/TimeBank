# 🔧 Troubleshooting Guide

## Common Errors & Solutions

### Error 1: "Insufficient collateral"
**Cause:** Trying to send less collateral than contract requires (10 ETH per hour)

**Solution:**
1. Use fractional hours: **0.01 to 0.03 hours**
2. Example: 0.03 hours = 0.3 ETH collateral (you have 0.31 ETH ✅)

---

### Error 2: "Cannot read properties of undefined"
**Cause:** MetaMask not connected or wrong network

**Solution:**
1. Click "Connect Wallet" in top right
2. Make sure MetaMask shows "Sepolia" network
3. Refresh the page

---

### Error 3: "Execution reverted"
**Cause:** Contract function failed

**Possible fixes:**
1. **Check you're on Sepolia network** (not Mainnet!)
2. **Check you have enough ETH** (need at least 0.1 ETH for 0.01 hours)
3. **Try smaller hours** (0.01 instead of 0.03)

---

### Error 4: "Transaction failed"
**Cause:** Not enough gas or wrong parameters

**Solution:**
1. Make sure you have at least 0.05 ETH for gas
2. Try again with lower hours
3. Check MetaMask gas settings

---

## 🎯 **Guaranteed Working Test:**

### Use These EXACT Values:

1. **Description:** `Test IOU`
2. **Hours:** `0.01` (exactly this!)
3. **Category:** `Basic` (BASIC = 0)
4. **Deadline:** `30`

**This will:**
- Require: 0.1 ETH collateral
- Create: 0.1 skill points
- Definitely work with your 0.31 ETH ✅

---

## 🔍 **Debug Checklist:**

Before creating IOU, verify:

- [ ] MetaMask connected (see address in navbar)
- [ ] On Sepolia network (check MetaMask)
- [ ] Have at least 0.15 ETH (for 0.01 hours + gas)
- [ ] Using hours between 0.01-0.03
- [ ] All form fields filled

---

## 🆘 **Still Not Working?**

### Check Browser Console:

1. Press `F12` to open DevTools
2. Go to "Console" tab
3. Look for red error messages
4. Share the error with me

### Check MetaMask:

1. Click MetaMask icon
2. Check "Activity" tab
3. See if transaction is "Pending" or "Failed"
4. If failed, click it to see why

---

## 💡 **Alternative: Get More Test ETH**

If you want to use normal hours (1-2), you need more ETH:

### Get More Sepolia ETH:

1. **Alchemy Faucet:**
   - https://www.alchemy.com/faucets/ethereum-sepolia
   - Gives 0.5 ETH per day

2. **QuickNode Faucet:**
   - https://faucet.quicknode.com/ethereum/sepolia
   - Gives 0.1 ETH

3. **Sepolia PoW Faucet:**
   - https://sepolia-faucet.pk910.de/
   - Mine for ETH (takes 10 mins)

---

## 🎬 **Step-by-Step Video Guide:**

If you're still stuck, I can create a video showing:
1. Connecting wallet
2. Creating IOU with 0.01 hours
3. Confirming transaction
4. Viewing in marketplace

**Want me to create this?** Let me know!

---

## 📞 **Share Your Error:**

If none of this helps, share:
1. Screenshot of error
2. Browser console log (F12)
3. MetaMask transaction details

I'll help you fix it immediately! 🚀
