# Quick Test Reference - Account Creation

**Date**: October 28, 2025  
**Status**: ✅ Ready to Test

---

## 🚀 Quick Start Test (2 minutes)

### Step 1: Create Account (30 seconds)
```
1. Open app
2. Click "Sign Up" tab
3. Enter:
   - Name: Test User
   - Email: test@example.com
   - Password: testpass123
   - Confirm: testpass123
4. Click "Create Account"
```
✅ **Expected**: Success message appears

---

### Step 2: Complete Onboarding (1 minute)
```
1. Sign in with new account
2. Choose any theme → Next
3. Rank: E4-E6, Years: 8 → Next
4. Goal: Comfortable retirement → Next
5. Age: 30, Retirement: 60 → Complete
```
✅ **Expected**: Dashboard loads, shows 100 XP

---

### Step 3: Verify Persistence (30 seconds)
```
1. Refresh page (F5)
2. Check dashboard still shows your data
3. Check you're still signed in
```
✅ **Expected**: Data persists, no re-login needed

---

## 🎯 What Gets Stored?

| Data Type | When | Where |
|-----------|------|-------|
| **Account** | Sign up | Supabase Auth |
| **Profile** | Onboarding | `profile:{userId}` |
| **XP/Progress** | Onboarding + missions | `progress:{userId}` |
| **Retirement** | Calculator | `retirement:{userId}` |
| **Settings** | Settings screen | `settings:{userId}` |
| **Missions** | Mission completion | `mission:{userId}:{id}` |

---

## 📊 Data Flow

```
Sign Up → Auth → Onboarding → KV Store → Dashboard
   ↓        ↓         ↓           ↓          ↓
 Email   Token    Collect     Save      Display
         JWT      Data        Data      User Info
```

---

## ✅ Success Indicators

### After Sign Up
- ✅ Green success alert
- ✅ "Check your email" message
- ✅ Form clears

### After Onboarding
- ✅ Dashboard loads
- ✅ Shows 100 XP
- ✅ Shows your rank/branch
- ✅ Theme applied

### After Mission
- ✅ XP increases
- ✅ Mission shows checkmark
- ✅ Completion modal appears

### After Refresh
- ✅ Still signed in
- ✅ Data unchanged
- ✅ No loading errors

---

## 🔧 Quick Troubleshooting

### Problem: Can't create account
**Check**: Are you using a unique email?  
**Solution**: Try different email or use sign in

### Problem: Data not saving
**Check**: Are you in demo mode?  
**Solution**: Create real account (demo mode = memory only)

### Problem: Connection error
**Check**: Is Supabase configured?  
**Solution**: Demo mode will activate automatically

### Problem: Signed out after refresh
**Check**: Clear browser cache  
**Solution**: Sign in again, should persist after

---

## 🧪 Test Checklist

- [ ] Create new account
- [ ] Complete onboarding
- [ ] Check 100 XP awarded
- [ ] Complete one mission
- [ ] Check XP increases
- [ ] Refresh page
- [ ] Verify data persists
- [ ] Check mission still complete
- [ ] Sign out
- [ ] Sign in again
- [ ] Verify data still there

**All checked?** ✅ System working perfectly!

---

## 📱 Quick Commands (Browser Console)

### Check if signed in:
```javascript
await supabase.auth.getSession()
```

### View stored data:
```javascript
await apiClient.get('/user-data', accessToken)
```

### Check demo mode:
```javascript
console.log(authState.isDemo)
```

---

## 🎓 Key Concepts

### Authentication
- Supabase Auth handles user accounts
- JWT tokens for API access
- Sessions persist across page loads

### Data Storage
- KV store = key-value database
- Each user has unique ID
- Data keyed as `type:{userId}`

### Demo Mode
- Offline fallback
- Uses local memory
- SSG Martinez persona
- ⚠️ Data doesn't persist

---

## 📞 Need More Details?

See full documentation:
- `/ACCOUNT_CREATION_TEST_GUIDE.md` (Complete testing guide)
- `/ACCOUNT_STORAGE_VERIFICATION.md` (System verification)

---

**Everything Ready!** ✅  
Your account creation and data storage is fully functional.
