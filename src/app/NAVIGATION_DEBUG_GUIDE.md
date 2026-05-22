# Navigation Debug Guide

## Problem
Navigation buttons are not working on desktop or mobile.

## Debug Logging Added

### What to Check in Console

Open your browser's Developer Tools (F12) and look for these console messages:

#### 1. **App Rendering**
```
App render - Current screen: dashboard, isMobile: false
```
- This shows which screen is currently active and whether you're in mobile or desktop mode
- If you don't see this, the App component isn't rendering at all

#### 2. **DesktopSidebar Rendering** (Desktop only)
```
DesktopSidebar render - currentScreen: dashboard
```
- This confirms the sidebar is rendering on desktop
- If you don't see this on desktop, the sidebar isn't being rendered

#### 3. **Click Events**
When you click a navigation button, you should see:
```
Desktop nav clicked: Dashboard dashboard
```
or
```
Desktop nav (account) clicked: Settings settings
```
or for mobile:
```
Mobile nav clicked: Home dashboard
```
- If you don't see these, clicks aren't reaching the buttons

#### 4. **Navigation Handler**
```
handleNavigate called with: dashboard
Navigating to: dashboard
```
- This confirms the navigation function is being called
- If you see "handleNavigate called" but no navigation happening, there's a state update issue

## Common Issues & Solutions

### Issue 1: Sidebar Not Rendering
**Symptom**: No "DesktopSidebar render" message in console

**Possible Causes**:
1. Screen width is below 1024px (mobile breakpoint)
2. CSS `display: none` is being applied
3. Component isn't mounted

**Solution**:
- Check browser width is ≥1024px
- Inspect element to verify sidebar exists in DOM
- Check if `layout.isMobile` is correctly detecting screen size

### Issue 2: Clicks Not Registering
**Symptom**: No click log messages when clicking buttons

**Possible Causes**:
1. Another element is overlaying the buttons (z-index issue)
2. CSS `pointer-events: none` on wrong element
3. Button is disabled
4. Parent element has `pointer-events: none`

**Solution**:
- Inspect the button element in DevTools
- Check computed styles for `pointer-events`
- Check z-index stacking
- Try adding `!important` to button styles temporarily

### Issue 3: Handler Called But No Navigation
**Symptom**: See "handleNavigate called" but screen doesn't change

**Possible Causes**:
1. State update isn't triggering re-render
2. `currentScreen` state isn't updating
3. `renderScreen()` function has an error

**Solution**:
- Check React DevTools to see if state is updating
- Look for errors in console
- Check if the screen name is valid

### Issue 4: Wrong Layout Showing
**Symptom**: Mobile layout on desktop or vice versa

**Possible Causes**:
1. `useMediaQuery` not detecting screen size correctly
2. Breakpoint mismatch (CSS uses 1024px, JS uses different value)

**Solution**:
- Check `useMediaQuery` hook implementation
- Verify breakpoint consistency (should be 1023px for max-width)

## Manual Testing Steps

### Desktop (≥1024px width)

1. **Open DevTools** (F12) and go to Console
2. **Resize browser** to at least 1024px wide
3. **Refresh the page**
4. **Check for logs**:
   - Should see: "App render - Current screen: [screen], isMobile: false"
   - Should see: "DesktopSidebar render - currentScreen: [screen]"
5. **Click Dashboard** in sidebar
   - Should see: "Desktop nav clicked: Dashboard dashboard"
   - Should see: "handleNavigate called with: dashboard"
   - Should see: "Navigating to: dashboard"
   - Screen should change to Dashboard
6. **Repeat for each nav item**: Missions, Banking, Progress, Profile, Settings, Help

### Mobile (<1024px width)

1. **Open DevTools** (F12) and go to Console
2. **Toggle Device Toolbar** (Ctrl+Shift+M / Cmd+Shift+M)
3. **Select mobile device** or set width to 375px
4. **Refresh the page**
5. **Check for logs**:
   - Should see: "App render - Current screen: [screen], isMobile: true"
   - Should NOT see: "DesktopSidebar render"
6. **Tap bottom navigation** (Home, Banking, Missions, Progress, Settings)
   - Should see: "Mobile nav clicked: [name] [id]"
   - Should see: "handleNavigate called with: [id]"
   - Should see: "Navigating to: [id]"
   - Screen should change

## CSS to Check

### Navigation Z-Index
The navigation components should have appropriate z-index values:
- BottomNavigation: `z-50` (fixed at bottom)
- DesktopSidebar: No z-index needed (in normal flow)

### Pointer Events
Check that these are correct:
```css
button {
  cursor: pointer;
  user-select: none;
}

button > *,
a > *,
[role="button"] > * {
  pointer-events: none;  /* Children shouldn't block clicks */
}
```

### Display/Visibility
- DesktopSidebar: `hidden lg:flex` (hidden on mobile, flex on desktop)
- BottomNavigation: `md:hidden` (hidden on tablet/desktop)

## React DevTools Check

1. Open React DevTools
2. Find `App` component
3. Check `currentScreen` state - should update when clicking nav
4. Find `DesktopSidebar` or `BottomNavigation` component  
5. Verify `onNavigate` prop is a function
6. Verify `currentScreen` prop matches App state

## Quick Fix Attempts

If navigation still doesn't work after checking above:

### Try 1: Remove CSS Transitions
Temporarily disable transitions to see if they're causing issues:
```css
* {
  transition: none !important;
}
```

### Try 2: Force Z-Index
Give sidebar a high z-index:
```tsx
className="hidden lg:flex flex-col h-full bg-sidebar border-r border-sidebar-border z-[100]"
```

### Try 3: Simplify Button
Replace Button component with plain button temporarily:
```tsx
<button onClick={() => onNavigate(item.id)}>
  {item.name}
</button>
```

### Try 4: Check Button Component
Verify the shadcn Button component is passing onClick:
```tsx
// In button.tsx, props should spread
<Comp {...props} />
```

## Expected Behavior

### Desktop
- Sidebar visible on left (64px collapsed, 256px expanded)
- Clicking any nav item navigates immediately
- Active item highlighted with primary color
- Content area fills remaining width

### Mobile  
- Bottom navigation fixed at screen bottom
- Content area has padding-bottom for nav clearance
- Tapping any nav item navigates immediately
- Active item highlighted with primary color

## Files to Check

1. `/App.tsx` - Main layout and navigation handler
2. `/components/DesktopSidebar.tsx` - Desktop navigation
3. `/components/BottomNavigation.tsx` - Mobile navigation
4. `/hooks/useAppLayout.ts` - Mobile/desktop detection
5. `/hooks/useMediaQuery.ts` - Screen size detection
6. `/components/ui/button.tsx` - Button component
7. `/styles/globals.css` - Navigation styles

## Next Steps After Debugging

Once you identify which log message is missing, you'll know exactly where the problem is:

- **No "App render"** → App not mounting, check ErrorBoundary
- **No "DesktopSidebar render"** → Layout detection issue or CSS hiding it
- **No click logs** → Z-index/pointer-events/CSS blocking clicks
- **No "handleNavigate"** → onClick not wired up correctly
- **No "Navigating to"** → Invalid screen name or validation issue
- **Navigating but screen doesn't change** → State update or renderScreen issue
