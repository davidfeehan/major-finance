# Developer Mode System - Complete Guide

## Overview

Major Finance now features a **Developer Mode** toggle in Settings that hides all debugging tools and testing features from end users while keeping them easily accessible for developers.

## What Gets Hidden/Shown

### Hidden When Developer Mode is OFF (Default)
✅ **Clean Production Experience**
- ❌ Resolution Selector (viewport switcher)
- ❌ Demo Mode Indicator badge
- ❌ Navigation Test screen
- ❌ Desktop Layout Test screen
- ❌ Debug buttons in Settings
- ❌ Developer tools section

### Visible When Developer Mode is ON
🛠️ **Full Development Tools**
- ✅ Resolution Selector in header (test responsive layouts)
- ✅ Demo Mode Indicator (shows when in demo mode)
- ✅ Navigation Test screen (debug navigation system)
- ✅ Desktop Layout Test screen (test desktop layouts)
- ✅ Developer Tools section in Settings
- ✅ Quick access debug buttons
- ✅ Console logging indicators

## How to Enable/Disable

### Method 1: Settings Screen (Recommended)
1. Navigate to **Settings** → **Developer Mode** section
2. Toggle **"Enable Developer Mode"** switch
3. Tools appear/disappear immediately

### Method 2: Browser Console
```javascript
// Enable
localStorage.setItem('major-finance-developer-mode', 'true');
window.location.reload();

// Disable
localStorage.removeItem('major-finance-developer-mode');
window.location.reload();

// Check Status
localStorage.getItem('major-finance-developer-mode') === 'true'
```

### Method 3: URL Parameter (Future Enhancement)
```
https://yourapp.com/?dev=true  // Enable developer mode
https://yourapp.com/?dev=false // Disable developer mode
```

## Developer Mode UI

### Settings Screen - Developer Mode Section

```
┌─────────────────────────────────────────┐
│ 🖥️  Developer Mode                      │
│ Show debugging tools and testing features│
├─────────────────────────────────────────┤
│                                         │
│ Enable Developer Mode          [ON/OFF]│
│ Show resolution selector, debug         │
│ screens, and testing tools              │
│                                         │
│ ────────────────────────────────────    │
│                                         │
│ 🔧 Developer Tools Active               │
│    • Resolution selector in header      │
│    • Debug screens accessible           │
│    • Console logging enabled            │
│    • Demo mode indicator visible        │
│                                         │
│ ────────────────────────────────────    │
│                                         │
│ Debug Screens:                          │
│ [🐛 Navigation Test]                    │
│ [🖥️  Desktop Layout Test]               │
│                                         │
└─────────────────────────────────────────┘
```

## Technical Implementation

### Hook: `useDeveloperMode`

**File:** `/hooks/useDeveloperMode.ts`

```tsx
import { useDeveloperMode } from '../hooks/useDeveloperMode';

function MyComponent() {
  const { 
    isDeveloperMode,        // boolean - current state
    toggleDeveloperMode,    // () => void - toggle on/off
    enableDeveloperMode,    // () => void - turn on
    disableDeveloperMode    // () => void - turn off
  } = useDeveloperMode();

  if (!isDeveloperMode) {
    return null; // Hide component
  }

  return <DebugTool />;
}
```

### Utility Function: `checkDeveloperMode`

For non-React contexts (router logic, etc.):

```tsx
import { checkDeveloperMode } from '../hooks/useDeveloperMode';

// In router
if (!checkDeveloperMode()) {
  // Redirect to dashboard instead of showing debug screen
  return <Dashboard />;
}
```

### localStorage Key

```javascript
const DEVELOPER_MODE_KEY = 'major-finance-developer-mode';

// Values:
// 'true' = Developer mode enabled
// null/undefined = Developer mode disabled (default)
```

## Updated Components

### 1. **ResolutionSelector** (`/components/ResolutionSelector.tsx`)

**Before:** Always visible in header  
**After:** Only visible when `isDeveloperMode === true`

```tsx
export function ResolutionSelector({ isDemo, currentViewport, onViewportChange }) {
  const { isDeveloperMode } = useDeveloperMode();
  
  // Don't render if developer mode is off
  if (!isDeveloperMode) {
    return null;
  }
  
  // ... rest of component
}
```

**Impact:**
- Header is cleaner for end users
- No confusing viewport switcher
- Responsive design works automatically

### 2. **DemoModeIndicator** (`/components/DemoModeIndicator.tsx`)

**Before:** Always visible when `visible={true}`  
**After:** Only visible when `isDeveloperMode === true`

```tsx
export function DemoModeIndicator({ visible = true, compact = false }) {
  const { isDeveloperMode } = useDeveloperMode();
  
  // Only show in developer mode
  if (!visible || !isDeveloperMode) return null;
  
  // ... rest of component
}
```

**Impact:**
- Demo mode is silent to end users
- Developers can still see demo indicator
- Cleaner UI for production

### 3. **AppRouter** (`/components/AppRouter.tsx`)

**Before:** Debug screens always accessible  
**After:** Redirects to dashboard if developer mode is off

```tsx
case 'nav-test':
  if (!checkDeveloperMode()) {
    return <Dashboard userData={userData.userData} onMissionSelect={onMissionSelect} isDemo={auth.isDemo} />;
  }
  return <NavigationTest onNavigate={onNavigate} currentScreen={currentScreen} />;

case 'desktop-layout-test':
  if (!checkDeveloperMode()) {
    return <Dashboard userData={userData.userData} onMissionSelect={onMissionSelect} isDemo={auth.isDemo} />;
  }
  return <DesktopLayoutTest onNavigate={onNavigate} />;
```

**Impact:**
- Debug screens are protected
- Users can't accidentally access them
- Graceful fallback to dashboard

### 4. **SettingsScreen** (`/components/SettingsScreen.tsx`)

**Added:**
- Developer Mode section with toggle
- Developer tools list when enabled
- Quick access debug screen buttons
- Visual indicator of active dev tools

**Changes:**
- Debug buttons only show when `isDeveloperMode === true`
- Clear separation between user settings and dev tools
- Informative descriptions

### 5. **ProfileScreen** & **ProgressScreen**

**Added:** `isDemo` prop passed from AppRouter

```tsx
// Now these screens can show Martinez's data in demo mode
<ProfileScreen userData={userData} isDemo={auth.isDemo} onUpdateProfile={onUpdateProfile} />
<ProgressScreen userData={userData} isDemo={auth.isDemo} />
```

## Benefits

### For End Users (Military Personnel)
✅ **Clean, Professional Interface**
- No confusing debugging tools
- Focus on financial planning features
- Professional military-grade UI
- No "demo mode" distractions

### For Developers
✅ **Easy Access to Tools**
- One toggle in Settings
- Persistent across sessions
- Quick testing of responsive layouts
- Access to debug screens

### For Product Team
✅ **Flexible Deployment**
- Same codebase for dev and prod
- No environment-specific builds
- Easy demonstrations
- A/B testing capabilities

## Use Cases

### 1. **Development & Testing**
```javascript
// Enable developer mode
localStorage.setItem('major-finance-developer-mode', 'true');

// Test features:
- Viewport responsive testing
- Navigation debugging
- Layout verification
- Demo mode visibility
```

### 2. **Client Demonstrations**
```javascript
// Disable developer mode for clean demo
localStorage.removeItem('major-finance-developer-mode');

// Show professional UI:
- No debug badges
- No resolution selector
- Clean, military-professional appearance
```

### 3. **Production Deployment**
```javascript
// Developer mode OFF by default
// localStorage key doesn't exist
// All debug tools hidden

// Power users can enable if needed
// Internal team can use for support
```

### 4. **QA Testing**
```javascript
// Enable developer mode
// Test all debug screens
// Verify tools work correctly
// Test toggle functionality
```

## Testing Checklist

### Developer Mode OFF (Default)
- [ ] Resolution selector NOT visible in header
- [ ] Demo mode indicator NOT visible (even in demo mode)
- [ ] Navigation Test screen redirects to Dashboard
- [ ] Desktop Layout Test screen redirects to Dashboard
- [ ] Settings shows Developer Mode section (but OFF)
- [ ] Debug buttons NOT visible in Settings > App Info
- [ ] Clean header with just branding and navigation

### Developer Mode ON
- [ ] Resolution selector visible in header
- [ ] Demo mode indicator visible (when in demo mode)
- [ ] Navigation Test screen accessible
- [ ] Desktop Layout Test screen accessible
- [ ] Settings shows active developer tools list
- [ ] Debug buttons visible in Settings
- [ ] Console logs show "[Developer Mode] Enabled"

### Toggle Functionality
- [ ] Toggle switch works in Settings
- [ ] Changes persist after refresh
- [ ] Tools appear/disappear immediately
- [ ] localStorage updated correctly
- [ ] No console errors when toggling

## Future Enhancements

### Planned Features
1. **URL Parameter Support**
   - `?dev=true` to enable via URL
   - Temporary sessions without localStorage
   - Share debug links with team

2. **Developer Panel**
   - Floating panel with quick tools
   - State inspector
   - Redux DevTools integration
   - Performance metrics

3. **Logging Levels**
   - Verbose, Info, Warning, Error
   - Configurable in developer mode
   - Export logs for debugging

4. **Feature Flags**
   - Enable/disable specific features
   - A/B testing support
   - Beta feature access

5. **Mock Data Controls**
   - Switch between different user profiles
   - Simulate edge cases
   - Test error states

6. **Screenshot Mode**
   - Hide all developer indicators
   - Perfect screenshots for marketing
   - One-click toggle

## Troubleshooting

### Issue: Developer Mode Won't Enable
**Solution:**
```javascript
// Clear localStorage and try again
localStorage.clear();
localStorage.setItem('major-finance-developer-mode', 'true');
window.location.reload();
```

### Issue: Tools Still Showing After Disabling
**Solution:**
```javascript
// Force clear and reload
localStorage.removeItem('major-finance-developer-mode');
window.location.reload();

// Check if cleared
console.log(localStorage.getItem('major-finance-developer-mode')); // Should be null
```

### Issue: Debug Screens Show 404
**Problem:** Trying to access nav-test or desktop-layout-test with dev mode off  
**Expected:** Should redirect to dashboard automatically  
**Check:** Verify `checkDeveloperMode()` logic in AppRouter.tsx

### Issue: Toggle Doesn't Persist
**Problem:** Developer mode resets on refresh  
**Check:** 
1. localStorage is enabled in browser
2. No Private/Incognito mode
3. No browser extensions clearing storage

## Best Practices

### For Developers
1. **Always Test Both Modes**
   - Test features with dev mode ON
   - Verify UI with dev mode OFF
   - Ensure graceful degradation

2. **Don't Rely on Dev Tools in Production Logic**
   - Dev tools should be supplementary
   - Core features should work without them
   - Fallbacks for when tools are hidden

3. **Keep Dev Tools Organized**
   - Group related tools
   - Clear labels and descriptions
   - Consistent naming

### For Product Team
1. **Default to OFF for Demos**
   - Clean, professional appearance
   - Focus on features, not tools
   - Enable only when needed

2. **Use for Training**
   - Show internal team how to debug
   - Demonstrate responsive testing
   - Troubleshooting guide

3. **Document Tool Usage**
   - When to enable each tool
   - What each tool does
   - How to interpret results

## Security Considerations

### Not for Sensitive Data Protection
⚠️ **Important:** Developer mode is UI-only security
- Does NOT protect sensitive API endpoints
- Does NOT encrypt data
- Does NOT prevent console access
- Users can still enable it manually

### What It Does Protect
✅ **UI/UX Cleanliness**
- Hides debug clutter from regular users
- Prevents accidental navigation to debug screens
- Maintains professional appearance

### Actual Security Layers
For real security, use:
1. **Backend Authorization:** Server-side permission checks
2. **API Authentication:** JWT tokens, role-based access
3. **Environment Variables:** Separate dev/prod configs
4. **Feature Flags:** Server-controlled feature access

## Summary

The Developer Mode system provides a **clean, professional user interface** for military personnel while maintaining **easy access to debugging tools** for the development team. It's controlled by a single toggle in Settings, persists across sessions, and gracefully hides all development-specific UI elements.

### Quick Commands

```javascript
// Enable Developer Mode
localStorage.setItem('major-finance-developer-mode', 'true');

// Disable Developer Mode  
localStorage.removeItem('major-finance-developer-mode');

// Check Status
localStorage.getItem('major-finance-developer-mode') === 'true'
```

### Key Files Modified
- `/hooks/useDeveloperMode.ts` - Core hook and utility
- `/components/SettingsScreen.tsx` - Toggle UI
- `/components/ResolutionSelector.tsx` - Conditional render
- `/components/DemoModeIndicator.tsx` - Conditional render
- `/components/AppRouter.tsx` - Screen protection
- `/DEVELOPER_MODE_GUIDE.md` - This documentation

**Result:** A professional military finance app with hidden developer superpowers! 🎖️🛠️
