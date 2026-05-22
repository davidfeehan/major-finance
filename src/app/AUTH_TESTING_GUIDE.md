# Authentication Testing Guide

## 🧪 Quick Test Checklist

### Test 1: Demo Mode (Always Works)
```
✅ Steps:
1. Open app
2. Click "Try Demo Mode" button
3. Verify app loads to dashboard
4. Check that demo indicator shows
5. Test all features work

Expected: Immediate access to full app
```

### Test 2: Sign In with Network Error
```
✅ Steps:
1. Disconnect internet (or block supabase.co in DevTools)
2. Try to sign in with any credentials
3. Observe error message
4. Check demo mode button is highlighted
5. Click demo mode
6. Verify app loads

Expected: Clear error + prominent demo mode option
```

### Test 3: Sign Up with Network Error
```
✅ Steps:
1. Disconnect internet
2. Go to Sign Up tab
3. Fill in form
4. Submit
5. Observe error message
6. Check demo mode suggestion

Expected: User-friendly error + demo mode option
```

### Test 4: Normal Sign In (When Online)
```
✅ Steps:
1. Ensure internet connected
2. Use valid credentials
3. Sign in
4. Verify session persists on refresh

Expected: Successful authentication
```

### Test 5: Session Persistence
```
✅ Steps:
1. Sign in successfully
2. Refresh page
3. Verify still signed in (no auth screen)
4. Check access token in state

Expected: No re-authentication needed
```

---

## 🔍 Error Message Verification

### What You Should See

#### ❌ Old Errors (Should NOT see):
- "Failed to fetch"
- "AuthRetryableFetchError"
- "TypeError"
- "[Object object]"

#### ✅ New Errors (Should see):
- "Unable to connect to authentication service. Please check your internet connection or try demo mode."
- "Network error. Please try demo mode or check your connection."
- "Invalid email or password. Please check your credentials or try demo mode."

---

## 🛠️ Developer Testing

### Console Commands

**Check Supabase Config:**
```javascript
// In browser console
import { validateSupabaseConfig } from './utils/supabase/client';
console.log(validateSupabaseConfig());
// Should return: { valid: true }
```

**Test Session:**
```javascript
// In browser console
const { data, error } = await supabase.auth.getSession();
console.log('Session:', data);
console.log('Error:', error);
```

**Simulate Network Error:**
```javascript
// In DevTools Network tab:
// 1. Right-click on any request
// 2. Select "Block request domain"
// 3. Add "*.supabase.co"
// 4. Try authentication
```

---

## 📊 Expected Behaviors

### Scenario: No Internet Connection
```
User Action: Try to sign in
   ↓
App Behavior: 
   - Shows clear error message
   - Highlights demo mode button
   - Changes demo button to primary (blue)
   - Shows emoji indicators (💡 🚀)
   ↓
User Action: Clicks demo mode
   ↓
Result: ✅ Immediate app access
```

### Scenario: Supabase Down
```
User Action: Try to sign up
   ↓
App Behavior:
   - Catches fetch error gracefully
   - Shows friendly error message
   - Suggests demo mode
   - App doesn't crash
   ↓
User Action: Uses demo mode
   ↓
Result: ✅ Full app functionality
```

### Scenario: Invalid Credentials
```
User Action: Sign in with wrong password
   ↓
App Behavior:
   - Shows "Invalid email or password" message
   - Demo mode still available (not highlighted)
   - User can retry
   ↓
Result: ✅ Clear feedback
```

---

## ✅ Success Criteria

### Must Pass All:
- [ ] Demo mode works 100% of the time
- [ ] No app crashes from auth errors
- [ ] Error messages are clear and actionable
- [ ] Demo mode button highlights during connection errors
- [ ] Session persists on refresh when online
- [ ] Sign up works with valid credentials
- [ ] Sign in works with valid credentials
- [ ] Network errors don't block app load
- [ ] All error states tested
- [ ] Cross-browser tested (Chrome, Firefox, Safari)

---

## 🚨 Known Limitations

### Demo Mode Limitations (By Design)
- Data stored locally only (localStorage)
- No cross-device sync
- Progress cleared on sign out
- No cloud backup

### Network Requirements
- Sign in/sign up requires internet
- Demo mode works offline
- Session checks graceful when offline

---

## 🐛 If Issues Persist

### Check These:
1. **Browser Console** - Look for errors
2. **Network Tab** - Check request status
3. **localStorage** - Verify data persisting
4. **Supabase Dashboard** - Confirm project active
5. **CORS Settings** - Check allowed origins

### Quick Fixes:
```javascript
// Clear all local storage
localStorage.clear();

// Force reload
location.reload();

// Check Supabase status
// Visit: status.supabase.com
```

---

## 📝 Testing Checklist Summary

```
Authentication Testing - Complete Checklist

Core Functionality:
✅ Demo mode always accessible
✅ Sign in with valid credentials
✅ Sign up with new account
✅ Sign out works
✅ Session persists on refresh

Error Handling:
✅ Network error shows friendly message
✅ Invalid credentials handled
✅ Duplicate email handled
✅ Password validation works
✅ Demo mode highlighted on errors

User Experience:
✅ Error messages are clear
✅ Demo mode discoverable
✅ No dead ends
✅ Loading states shown
✅ Success messages displayed

Performance:
✅ App loads quickly
✅ No blocking auth checks
✅ Session check non-blocking
✅ Smooth transitions

Edge Cases:
✅ Intermittent connection
✅ Slow network
✅ Supabase downtime
✅ Browser refresh during auth
✅ Multiple tabs open
```

---

## 🎯 Testing Priority

### P0 (Critical - Test First):
1. Demo mode access
2. Network error handling
3. App doesn't crash

### P1 (High Priority):
1. Sign in with valid credentials
2. Sign up flow
3. Session persistence
4. Error message clarity

### P2 (Medium Priority):
1. Edge cases
2. Performance
3. Cross-browser
4. Mobile devices

---

**Quick Start Test**: Click demo mode → Should work immediately ✅

**Document Version**: 1.0  
**Last Updated**: October 2025
