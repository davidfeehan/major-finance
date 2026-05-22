# Data Collection Testing Guide

Complete testing procedures for the Major Finance data collection system.

---

## 🧪 Test Categories

### 1. Account Creation & Authentication
### 2. Profile & Onboarding
### 3. Mission Completion Tracking
### 4. Data Persistence
### 5. Demo Mode vs Real Mode
### 6. Calculator State Saving
### 7. Error Handling

---

## 1️⃣ Account Creation & Authentication

### Test 1.1: Sign Up Flow
**Steps:**
1. Click "Create Account" on welcome screen
2. Enter email: `test@example.com`
3. Enter password: `Test123!@#`
4. Enter name: `Test User`
5. Click "Sign Up"

**Expected Results:**
- ✅ User created in Supabase Auth
- ✅ Redirected to onboarding flow
- ✅ No error messages displayed
- ✅ Welcome XP (100) awarded

**Verify in Supabase:**
```
1. Open Supabase Dashboard
2. Go to Authentication → Users
3. Confirm new user exists
4. Check user_metadata contains name
```

### Test 1.2: Login Flow
**Steps:**
1. Sign out
2. Click "Sign In"
3. Enter credentials
4. Click "Sign In"

**Expected Results:**
- ✅ Successfully authenticated
- ✅ Redirected to dashboard
- ✅ All previous data loaded
- ✅ Access token valid

### Test 1.3: Session Persistence
**Steps:**
1. Login
2. Refresh page (F5)
3. Close tab and reopen

**Expected Results:**
- ✅ Still logged in after refresh
- ✅ Session persists across tabs
- ✅ No re-authentication required

---

## 2️⃣ Profile & Onboarding

### Test 2.1: Onboarding Data Collection
**Steps:**
1. Complete onboarding with:
   - Name: "John Smith"
   - Rank: "Captain (O-3)"
   - Branch: "Army"
   - Years of Service: "8"
   - Current Age: "30"
   - Desired Retirement Age: "42"
   - Retirement Goal: "Financial independence"

**Expected Results:**
- ✅ All fields saved to backend
- ✅ Profile visible in dashboard
- ✅ Welcome XP (100) awarded
- ✅ Redirected to dashboard

**Verify in Database:**
```sql
-- In Supabase SQL Editor
SELECT * FROM kv_store_03c1d5b1 
WHERE key = 'profile:USER_ID';
```

**Expected Data:**
```json
{
  "name": "John Smith",
  "rank": "Captain (O-3)",
  "branch": "army",
  "yearsOfService": "8",
  "currentAge": "30",
  "desiredRetirementAge": "42",
  "retirementGoal": "Financial independence"
}
```

### Test 2.2: Profile Update
**Steps:**
1. Go to Profile screen
2. Change rank to "Major (O-4)"
3. Click "Save"

**Expected Results:**
- ✅ Profile updated in backend
- ✅ Success message shown
- ✅ Changes persist after refresh

---

## 3️⃣ Mission Completion Tracking

### Test 3.1: First Mission Completion
**Steps:**
1. Start "Emergency Fund Mission"
2. Fill out form with sample data
3. Click "Complete Mission & Earn 150 XP"

**Expected Results:**
- ✅ XP increases by 150
- ✅ Completion modal appears
- ✅ completedMissions count increases by 1
- ✅ 'emergency-fund' added to completedMissionsList
- ✅ Mission shows green checkmark
- ✅ Button changes to "Review Mission"

**Verify in Database:**
```sql
SELECT * FROM kv_store_03c1d5b1 
WHERE key = 'progress:USER_ID';
```

**Expected Data:**
```json
{
  "xp": 250,
  "completedMissions": 1,
  "completedMissionsList": ["emergency-fund"],
  "missions": [{
    "id": "emergency-fund",
    "completedAt": "2025-10-15T12:00:00.000Z"
  }],
  "updatedAt": "2025-10-15T12:00:00.000Z"
}
```

### Test 3.2: Duplicate Mission Completion (No XP)
**Steps:**
1. Click "Review Mission" on completed Emergency Fund
2. Click "Review Mission" button again

**Expected Results:**
- ✅ NO XP awarded (still 250 total)
- ✅ NO modal shown
- ✅ completedMissions count unchanged
- ✅ Green "Completed" badge still visible
- ✅ Notice shown: "Mission Already Completed!"
- ✅ Can still view all content

### Test 3.3: Multiple Mission Completions
**Steps:**
1. Complete "Investment Training" (200 XP)
2. Complete "TSP Optimization" (300 XP)
3. Complete "Budget Creation" (100 XP)

**Expected Results:**
- ✅ XP = 250 + 200 + 300 + 100 = 850
- ✅ completedMissions = 4
- ✅ completedMissionsList = ["emergency-fund", "investment-basics", "tsp-optimization", "budget-creation"]
- ✅ All missions show completion status
- ✅ Missions screen shows accurate count

### Test 3.4: Mission Persistence Across Sessions
**Steps:**
1. Complete 2 missions
2. Sign out
3. Sign in again
4. Check Missions screen

**Expected Results:**
- ✅ Completed missions still show green checkmarks
- ✅ Buttons still say "Review Mission"
- ✅ Completion badges visible
- ✅ XP count unchanged

---

## 4️⃣ Data Persistence

### Test 4.1: Calculator State Saving
**Steps:**
1. Open Emergency Fund calculator
2. Enter:
   - Monthly expenses: $3,000
   - Current savings: $5,000
   - Target months: 6
3. Close calculator
4. Reopen calculator

**Expected Results:**
- ✅ All values still filled in
- ✅ Calculations still displayed
- ✅ No data loss

**API Call to Check:**
```
GET /calculator-state/emergency-fund
Authorization: Bearer {token}
```

### Test 4.2: Retirement Plan Persistence
**Steps:**
1. Open Retirement Planning
2. Fill out calculator
3. Save plan
4. Refresh page
5. Reopen Retirement Planning

**Expected Results:**
- ✅ All inputs preserved
- ✅ Results still displayed
- ✅ Charts render correctly

### Test 4.3: Settings Persistence
**Steps:**
1. Go to Settings
2. Change theme to dark
3. Enable notifications
4. Sign out
5. Sign in

**Expected Results:**
- ✅ Theme still dark
- ✅ Notifications still enabled
- ✅ All settings preserved

---

## 5️⃣ Demo Mode vs Real Mode

### Test 5.1: Demo Mode Data Isolation
**Steps:**
1. Click "Try Demo"
2. Complete a mission
3. Note XP: Should be 850 (SSG Martinez)
4. Sign out
5. Create real account
6. Note XP: Should be 100

**Expected Results:**
- ✅ Demo data doesn't leak to real account
- ✅ Real account starts fresh
- ✅ Demo XP != Real XP

### Test 5.2: Demo Mode Offline Functionality
**Steps:**
1. Disconnect internet
2. Click "Try Demo"
3. Navigate around app
4. Complete a mission

**Expected Results:**
- ✅ No errors
- ✅ All features work
- ✅ No "Network Error" messages
- ✅ Demo data loads instantly

### Test 5.3: Real Mode Requires Connection
**Steps:**
1. Disconnect internet
2. Try to sign in
3. Reconnect internet
4. Try again

**Expected Results:**
- ✅ Error when offline: "Unable to connect"
- ✅ Success when online
- ✅ Graceful error handling

---

## 6️⃣ Calculator State Saving

### Test 6.1: Emergency Fund Auto-Save
**Steps:**
1. Open Emergency Fund mission
2. Start entering expenses
3. Wait 2 seconds (auto-save delay)
4. Check network tab for POST request

**Expected Results:**
- ✅ POST /calculator-state called
- ✅ "Saving..." indicator shown briefly
- ✅ Data saved in background
- ✅ No interruption to user

### Test 6.2: TSP Calculator State
**Steps:**
1. Fill TSP calculator with:
   - Annual salary: $75,000
   - Current balance: $50,000
   - Contribution %: 10%
2. Navigate away
3. Return to TSP Mission

**Expected Results:**
- ✅ All values retained
- ✅ Projections still showing
- ✅ Charts re-render correctly

---

## 7️⃣ Error Handling

### Test 7.1: Backend Unavailable
**Steps:**
1. Simulate backend down (network throttling)
2. Try to complete mission
3. Check console

**Expected Results:**
- ✅ Error logged to console
- ✅ User sees friendly message
- ✅ App doesn't crash
- ✅ Can continue using app

### Test 7.2: Invalid Data Submission
**Steps:**
1. Intercept API call
2. Send invalid JSON
3. Check response

**Expected Results:**
- ✅ 400 Bad Request returned
- ✅ Error message clear
- ✅ Data not corrupted

### Test 7.3: Session Expiration
**Steps:**
1. Login
2. Wait for token to expire (or manually expire)
3. Try to save data

**Expected Results:**
- ✅ 401 Unauthorized returned
- ✅ Redirected to login
- ✅ Can login again
- ✅ Data not lost

---

## 🎯 Comprehensive Test Scenario

**Complete User Journey Test:**

1. **Sign Up**
   - Create account: `journey.test@example.com`
   - Verify user created in Supabase

2. **Onboarding**
   - Complete with Army, SSG, 10 years
   - Verify profile saved
   - Check XP = 100

3. **First Mission**
   - Complete Emergency Fund
   - Check XP = 250
   - Verify completedMissionsList = ["emergency-fund"]
   - Confirm green checkmark visible

4. **Second Mission**
   - Complete Investment Training
   - Check XP = 450
   - Verify completedMissionsList = ["emergency-fund", "investment-basics"]

5. **Replay Mission**
   - Click "Review Mission" on Emergency Fund
   - Confirm NO XP change (still 450)
   - Verify notice shown

6. **Calculator Usage**
   - Fill TSP calculator
   - Close and reopen
   - Confirm data persists

7. **Settings**
   - Change theme to dark
   - Enable notifications
   - Sign out and back in
   - Confirm settings saved

8. **Cross-Device Test**
   - Login on different browser
   - Verify all data synced:
     - XP = 450
     - 2 missions completed
     - Calculator state present
     - Settings applied

9. **Export Data**
   - Call GET /user-data
   - Verify all data in response

10. **Sign Out**
    - Sign out
    - Try to access protected endpoint
    - Verify 401 error

---

## 🔍 Database Verification Queries

### Check All User Data:
```sql
SELECT * FROM kv_store_03c1d5b1 
WHERE key LIKE 'profile:%' 
   OR key LIKE 'progress:%'
   OR key LIKE 'retirement:%'
ORDER BY key;
```

### Check Specific User:
```sql
-- Replace USER_ID with actual UUID
SELECT key, value 
FROM kv_store_03c1d5b1 
WHERE key LIKE '%USER_ID%';
```

### Count Total Users:
```sql
SELECT COUNT(DISTINCT SUBSTRING(key FROM 'profile:(.*)')) as user_count
FROM kv_store_03c1d5b1
WHERE key LIKE 'profile:%';
```

---

## 📊 Expected Database State After Tests

After running all tests, you should see:

```
kv_store_03c1d5b1
├── profile:USER_ID_1         → Test user profile
├── progress:USER_ID_1        → XP: 850, missions: 4
├── retirement:USER_ID_1      → Saved plan
├── accounts:USER_ID_1        → Banking data (if added)
├── settings:USER_ID_1        → Theme, notifications, etc.
├── calculator:USER_ID_1:emergency-fund  → Form state
├── calculator:USER_ID_1:tsp             → Form state
├── mission:USER_ID_1:emergency-fund     → Mission data
└── reminder:USER_ID_1:retirement-checkin → Reminder pref
```

---

## ✅ Success Criteria

**All Tests Pass If:**
- ✅ No console errors
- ✅ All data persists across sessions
- ✅ Mission XP only awarded once
- ✅ Demo mode works offline
- ✅ Real mode syncs across devices
- ✅ Calculator states saved
- ✅ Settings preserved
- ✅ Export returns complete data
- ✅ Errors handled gracefully
- ✅ No data corruption

---

## 🚨 Common Issues & Solutions

### Issue: Data Not Persisting
**Check:**
1. Is user authenticated? (not demo mode)
2. Check network tab for API calls
3. Verify Supabase credentials
4. Check Edge Function logs

### Issue: Duplicate XP Awarded
**Check:**
1. completedMissionsList being updated?
2. useMissions.ts logic correct?
3. Backend saving completedMissionsList?

### Issue: Demo Data in Real Account
**Check:**
1. Access token not 'demo-token-offline-mode'
2. Proper sign out from demo
3. New account created properly

---

## 📝 Test Results Template

```
Test Date: __________
Tester: __________

[ ] Account Creation Working
[ ] Onboarding Data Saved
[ ] First Mission Completion
[ ] No Duplicate XP
[ ] Multiple Missions
[ ] Cross-Session Persistence
[ ] Calculator Auto-Save
[ ] Settings Persistence
[ ] Demo Mode Offline
[ ] Real Mode Sync
[ ] Error Handling
[ ] Export Data

Notes:
_______________________________
_______________________________

Pass/Fail: __________
```

---

**Ready to Test!** Follow this guide sequentially for comprehensive testing coverage.
