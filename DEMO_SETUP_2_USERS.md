# 🎬 **COMPLETE DEMO SETUP - 2 USERS**

## ✅ **FIX 1: IOUs Now Persist!**

I just fixed the localStorage issue. Now:
- ✅ Create IOU → Persists forever
- ✅ Refresh page → IOUs still there
- ✅ Accept IOU → Persists forever

---

## 🎯 **FIX 2: Demo with 2 Users**

### **Setup (Do This Once):**

#### **Step 1: Create 2 MetaMask Accounts**

**Account 1 - Alice (Creator):**
1. Open MetaMask
2. Click account icon (top right)
3. Click "Create Account"
4. Name: "Alice"
5. Copy address (e.g., `0x1234...5678`)

**Account 2 - Bob (Holder):**
1. Click account icon again
2. Click "Create Account"
3. Name: "Bob"
4. Copy address (e.g., `0xabcd...efgh`)

#### **Step 2: Clear Old Data (One Time)**
1. Open browser console (F12)
2. Type: `localStorage.clear()`
3. Press Enter
4. Refresh page

---

## 🎬 **DEMO SCRIPT - 2 Users**

### **Scene 1: Alice Creates IOU (2 mins)**

**Switch to Alice:**
1. Click MetaMask → Select "Alice"
2. Refresh page
3. Connect wallet (Alice's address)
4. **Navbar shows:** ⭐ 100

**Create IOU:**
1. Go to "Create IOU"
2. Fill in:
   - Description: "Design a professional logo"
   - Hours: 3
   - Category: Skilled
   - Deadline: 15
3. Click "Create IOU"
4. See success: "IOU Created! 🎉"

**Verify:**
1. Go to "My IOUs"
2. See in "IOUs I Created" section
3. Status: "Pending" (yellow)

**Check Marketplace:**
1. Go to "Marketplace"
2. Alice's IOU should NOT appear (can't accept own)
3. See other 30 IOUs

---

### **Scene 2: Bob Accepts IOU (2 mins)**

**Switch to Bob:**
1. Click MetaMask → Select "Bob"
2. Refresh page
3. Connect wallet (Bob's address)
4. **Navbar shows:** ⭐ 100

**Find Alice's IOU:**
1. Go to "Marketplace"
2. Find "Design a professional logo" (Alice's IOU)
3. Shows: 3 hours, 0.3 ETH collateral

**Accept IOU:**
1. Click "Accept IOU"
2. See: "Accepting... Staking collateral..."
3. Wait 1.5s
4. See: "IOU Accepted! 🎉"
5. IOU disappears from marketplace

**Verify:**
1. Go to "My IOUs"
2. See in "IOUs I Accepted" section
3. Status: "Accepted" (blue)
4. Shows Alice's address as creator
5. See buttons: "Confirm Completion" & "File Dispute"

---

### **Scene 3: Bob Completes Work (1 min)**

**Bob confirms:**
1. In "My IOUs" → Accepted
2. Click "Confirm Completion"
3. See: "Confirmed! ✅ Waiting for other party..."
4. **Wait 3 seconds** (auto-magic!)
5. See: "Work Completed! 🎉 Both parties confirmed!"
6. Status → "Completed" (green)

**Check Reputation:**
1. Go to "Reputation"
2. See: "Current Reputation: 120" (was 100!)
3. **Navbar updates:** ⭐ 120 (within 2s)

---

### **Scene 4: Alice Sees Completion (1 min)**

**Switch to Alice:**
1. Click MetaMask → Select "Alice"
2. Refresh page
3. Connect wallet

**Check My IOUs:**
1. Go to "My IOUs" → Created
2. See IOU status: "Completed" (green)
3. Message: "Completed! +20 reputation earned"

**Check Reputation:**
1. Go to "Reputation"
2. See: "Current Reputation: 120"
3. **Navbar shows:** ⭐ 120

**Both got +20 reputation!** ✅

---

### **Scene 5: Dispute Demo (2 mins)**

**Bob accepts another IOU:**
1. Switch to Bob
2. Go to Marketplace
3. Accept any IOU
4. Go to "My IOUs" → Accepted

**File Dispute:**
1. Click "File Dispute"
2. See: "Filing Dispute..."
3. Wait 1.5s: "Dispute Filed ⚠️"
4. Wait 4s: Random outcome

**Outcome A - Valid (50%):**
- Toast: "Claim Valid ✅"
- Status: "Completed" (green)
- Bob gets +20 reputation

**Outcome B - False (50%):**
- Toast: "False Claim ❌"
- Status: "False Claim" (red)
- Bob gets -20 reputation penalty

**Show Both:**
- Try 2-3 disputes to show both outcomes
- Check console (F12) to see random values

---

## 🎥 **RECORDING TIPS:**

### **Before Recording:**

1. **Clear localStorage:**
   ```javascript
   localStorage.clear()
   ```

2. **Prepare 2 MetaMask accounts:**
   - Alice (Account 1)
   - Bob (Account 2)

3. **Test the flow once** (practice run)

4. **Close unnecessary tabs**

5. **Zoom browser to 100%**

### **During Recording:**

1. **Speak clearly:**
   - "I'm Alice, creating an IOU..."
   - "Now switching to Bob..."
   - "Bob accepts the IOU..."

2. **Show key moments:**
   - Toast notifications
   - Status changes
   - Reputation updates
   - Navbar changes

3. **Explain as you go:**
   - "Notice both parties stake collateral"
   - "Auto-confirmation simulates both parties agreeing"
   - "Reputation updates in real-time"

### **Recording Tools:**

**Option 1: OBS Studio** (Best quality)
- Free, professional
- Records screen + audio
- Download: obsproject.com

**Option 2: Windows Game Bar** (Easiest)
- Press Win+G
- Click record
- Built-in to Windows

**Option 3: Loom** (Quick & Easy)
- loom.com
- Browser-based
- Easy sharing

---

## ✅ **QUICK TEST NOW:**

### **Test 1: Persistence (2 mins)**
1. Clear localStorage
2. Connect as Alice
3. Create IOU
4. **Refresh page**
5. Reconnect as Alice
6. Go to My IOUs
7. **IOU should still be there!** ✅

### **Test 2: Two Users (3 mins)**
1. Alice creates IOU
2. Switch to Bob
3. Bob sees IOU in marketplace
4. Bob accepts IOU
5. **Both see it in My IOUs!** ✅

### **Test 3: Completion (2 mins)**
1. Bob confirms
2. Wait 3s for auto-complete
3. Check both users' reputation
4. **Both at 120!** ✅

---

## ⏰ **TIME PLAN:**

**Current:** 5:10 AM
**Deadline:** 10:00 AM
**Remaining:** 4h 50m

**Schedule:**
- **5:10-5:20:** Test fixes (10 mins)
- **5:20-5:30:** Practice demo (10 mins)
- **5:30-6:30:** Record demo video (1 hour)
- **6:30-8:00:** Create pitch deck (1.5 hours)
- **8:00-8:30:** Practice presentation (30 mins)
- **8:30-9:30:** Final polish & submit (1 hour)
- **9:30-10:00:** Buffer time

**Perfect timing!** ✅

---

## 🎯 **ACTION ITEMS:**

### **RIGHT NOW (Next 20 mins):**

1. **Test localStorage fix:**
   - Clear localStorage
   - Create IOU
   - Refresh
   - Verify persists ✅

2. **Test 2 users:**
   - Create Alice & Bob accounts
   - Alice creates IOU
   - Bob accepts
   - Verify both see it ✅

3. **Test completion:**
   - Bob confirms
   - Wait 3s
   - Check both reputations ✅

### **If Everything Works:**
✅ Start recording demo video!

### **If Something Breaks:**
🔧 Tell me immediately and I'll fix it!

---

**Test the fixes NOW and let me know if it works!** 🚀

**Once confirmed, we record the demo!** 🎥
