# Error Handling Test Guide

## How to Verify the Fixes Work

This guide explains how to test that all "Failed to fetch" errors have been eliminated.

## Quick Test Checklist

### ✅ Test 1: Initial Page Load (Offline)
**Steps:**
1. Open browser DevTools (F12)
2. Go to Network tab
3. Set throttling to "Offline"
4. Refresh the page
5. Check Console tab

**Expected Results:**
- ✅ App loads without errors
- ✅ Welcome screen displays normally
- ✅ Console shows warnings (not errors):
  - "Mock Supabase: getSession called"
  - "Session check skipped (connection issue)"
  - "✅ Global error handlers initialized"
- ❌ NO red error messages
- ❌ NO "TypeError: Failed to fetch"

### ✅ Test 2: Try Sign In (Offline)
**Steps:**
1. Stay offline
2. Click "Get Started" on welcome screen
3. Try to sign in with any credentials
4. Click "Sign In" button

**Expected Results:**
- ✅ "Demo Mode Available" banner appears
- ✅ No error messages shown to user
- ✅ Console shows: "Mock Supabase: signInWithPassword called"
- ✅ Demo mode button is prominently displayed
- ❌ NO fetch errors in console

### ✅ Test 3: Try Sign Up (Offline)
**Steps:**
1. Stay offline
2. Switch to "Sign Up" tab
3. Fill in form with test data
4. Click "Create Account" button

**Expected Results:**
- ✅ "Demo Mode Available" banner appears
- ✅ No error messages shown to user
- ✅ Console shows: "Mock Supabase: signUp called"
- ❌ NO fetch errors in console

### ✅ Test 4: Use Demo Mode
**Steps:**
1. Stay offline
2. Click "Try Demo Mode" button

**Expected Results:**
- ✅ App navigates to dashboard
- ✅ SSG Martinez's data loads
- ✅ All features work normally
- ✅ Console shows: "Demo mode: GET" messages
- ❌ NO fetch errors

### ✅ Test 5: Online Mode with Backend Down
**Steps:**
1. Go back online (Network tab: "No throttling")
2. Open browser
3. Navigate to app
4. Wait for initial load

**Expected Results:**
- ✅ App loads (may take longer if waiting for timeout)
- ✅ After timeout, shows auth screen normally
- ✅ Console may show:
  - "API GET network error for /profile: [error]"
  - "Session check skipped (non-critical)"
- ❌ NO unhandled errors
- ❌ NO red error messages

### ✅ Test 6: Mixed Connectivity
**Steps:**
1. Start online
2. Load the app
3. Go offline (Network tab: "Offline")
4. Try to use features
5. Go back online
6. Continue using app

**Expected Results:**
- ✅ App continues working in both states
- ✅ Smooth transitions between online/offline
- ✅ Data persists in demo mode
- ❌ NO crashes or errors

## Console Messages Reference

### ✅ Expected Warnings (These are GOOD)
```
✅ Global error handlers initialized
Session check skipped (connection issue)
Mock Supabase: getSession called
Demo mode: GET /profile
API GET network error for /profile: Failed to fetch
Network request failed (non-critical): Failed to fetch
Auth error (non-critical): Failed to fetch
```

### ❌ Errors That Should NOT Appear
```
❌ TypeError: Failed to fetch
❌ Uncaught (in promise) TypeError: Failed to fetch
❌ Error: Failed to fetch
❌ Unhandled promise rejection
```

## Browser DevTools Settings

### Network Tab Settings
- **Throttling Options:**
  - "No throttling" = Full speed online
  - "Offline" = Completely offline
  - "Slow 3G" = Test timeouts
  - "Fast 3G" = Test slow connections

### Console Tab Filters
- **Show All Messages** to see warnings
- **Look for red errors** (there should be none)
- **Yellow warnings are OK** (expected behavior)

## What to Look For

### Signs Everything is Working
1. ✅ No red error messages in console
2. ✅ Yellow warnings with helpful messages
3. ✅ App loads and functions normally
4. ✅ Demo mode available when offline
5. ✅ Smooth user experience
6. ✅ No error popups or alerts

### Signs of Problems
1. ❌ Red errors in console
2. ❌ "Failed to fetch" messages
3. ❌ App crashes or white screen
4. ❌ Unhandled promise rejections
5. ❌ Error boundaries triggered

## Advanced Testing

### Test Timeout Handling
**Steps:**
1. Network tab: Set to "Slow 3G"
2. Try to sign in
3. Wait 10+ seconds

**Expected:**
- ✅ Request times out after 10 seconds
- ✅ Console shows timeout warning
- ✅ App promotes demo mode
- ❌ NO hanging or crashes

### Test CORS Errors
**Steps:**
1. Clear browser cache
2. Hard refresh (Ctrl+Shift+R)
3. Check console immediately

**Expected:**
- ✅ Any CORS errors caught silently
- ✅ App continues to function
- ❌ NO uncaught errors

### Test Race Conditions
**Steps:**
1. Refresh page multiple times quickly
2. Navigate between screens rapidly
3. Toggle online/offline repeatedly

**Expected:**
- ✅ App remains stable
- ✅ No duplicate error messages
- ✅ State management works correctly
- ❌ NO race condition errors

## Error Handler Initialization Test

### Verify Global Handler Loads First
**Check order of console messages on initial load:**

```
1. ✅ Global error handlers initialized  ← MUST be first
2. Mock Supabase: getSession called      ← Can be second
3. Session check skipped                 ← After that
4. Other warnings...                     ← Rest
```

If global handler message is NOT first, the handlers may not be catching all errors.

## Integration Test Scenarios

### Scenario 1: Complete Offline Journey
1. Start offline
2. Load app → ✅ Works
3. Try to sign in → ✅ Shows demo promotion
4. Use demo mode → ✅ Full functionality
5. Complete a mission → ✅ XP awarded
6. Sign out → ✅ Returns to auth
7. Sign in again → ✅ Demo data persists in session

### Scenario 2: Backend Unavailable
1. Start online
2. Backend returns 500 errors
3. Load app → ✅ Handles gracefully
4. See demo mode promotion → ✅ Available
5. Use demo mode → ✅ Works perfectly

### Scenario 3: Slow Network
1. Set to "Slow 3G"
2. Try to authenticate → ✅ Times out gracefully
3. See demo mode → ✅ Promoted automatically
4. Use app → ✅ Full speed in demo mode

## Monitoring in Production

### User Impact Metrics
- Page load success rate: Should be 100%
- Error-free sessions: Should be 100%
- Demo mode adoption: Track when users use it
- Network error rate: Log but don't fail

### Developer Monitoring
- Check console warnings (not errors)
- Monitor timeout rates
- Track offline vs online usage
- Measure demo mode usage patterns

## Rollback Criteria

### If you see ANY of these, there's a problem:
1. ❌ Users report "Failed to fetch" errors
2. ❌ Red errors in production console
3. ❌ App crashes on load
4. ❌ White screen of death
5. ❌ Authentication impossible

### All tests should pass with:
✅ Zero red errors in console
✅ 100% successful page loads
✅ Demo mode always accessible
✅ Smooth offline experience
✅ No user-facing error messages

## Success Criteria Summary

The fixes are successful when:
- ✅ NO "Failed to fetch" errors anywhere
- ✅ App loads perfectly offline
- ✅ Demo mode works flawlessly
- ✅ Only helpful warnings in console
- ✅ Users never see network errors
- ✅ Smooth experience in all network conditions

---

**Last Updated:** After implementing global error handler and multi-layer fetch protection
**Test Status:** All tests should now pass ✅
