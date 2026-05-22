# Content Display Debugging Guide

## Problem
Navigation is working, but screen content is not loading/displaying properly or being overlayed.

## Debug Indicators Added

### Visual Borders (Temporary)
1. **Green border** - `.desktop-layout` container
2. **Blue border** - `.desktop-main` scrolling area  
3. **Red border** - `.content-area` wrapper

### Debug Text Overlays
1. **Top-right (black)** - Shows current screen, layout mode, auth status
2. **Bottom-left (green)** - "Dashboard Rendered" indicator

## What to Check

### 1. Can you see the borders?
- **YES** → Layout is rendering, check content inside
- **NO** → Layout CSS issue or React not rendering

### 2. Can you see "Dashboard Rendered"?
- **YES** → Dashboard component is mounting
- **NO** → Component not being called or conditional rendering hiding it

### 3. Check Console Logs
Look for these log sequences:
```
[APP] Navigation requested: dashboard
[APP] Setting screen to: dashboard
[APP] Rendering screen: dashboard
```

### 4. Check Browser DevTools
- Open Elements inspector
- Look for `.desktop-layout` div
- Check if it has children
- Look for `.content-area` div
- Check if Dashboard content is inside

## Common Issues

### Issue 1: Content is rendering but not visible
**Symptoms**: 
- Borders show but no content
- "Dashboard Rendered" shows

**Possible Causes**:
- Z-index stacking issue
- Content positioned off-screen
- Height/overflow issues
- Text color same as background

**Fix**: Check element styles in DevTools

### Issue 2: Content area has no height
**Symptoms**:
- Red border (content-area) is thin line
- Blue border (desktop-main) shows
- No scroll behavior

**Possible Causes**:
- Children have no height
- Min-height conflicts in nested containers
- Flex layout issues

**Fix**: Check if Dashboard's inner divs have proper heights

### Issue 3: Sidebar covering content
**Symptoms**:
- Only green/blue borders visible on left
- No red border visible
- Content pushed off screen

**Possible Causes**:
- Sidebar width calculation wrong
- Z-index too high on sidebar
- Flex layout not working

**Fix**: Check `.desktop-sidebar` width and flex properties

### Issue 4: Content behind something
**Symptoms**:
- All borders visible
- "Dashboard Rendered" shows
- But can't see actual content

**Possible Causes**:
- Another element with higher z-index
- Overlay component not closing
- Fixed positioned element covering
- Auth/loading screen still showing

**Fix**: Check for overlays, modals, or auth screens

## Layout Structure (Desktop)

```
<ErrorBoundary>
  <ThemeProvider>
    <div className="desktop-layout">  ← Green border
      <DesktopSidebar />
      <main className="desktop-main">  ← Blue border
        <div className="content-area">  ← Red border
          <Dashboard>  ← Your content
            <div> actual content </div>
          </Dashboard>
        </div>
      </main>
    </div>
  </ThemeProvider>
</ErrorBoundary>
```

## CSS Flow

### Desktop Layout (≥1024px)
```css
.desktop-layout {
  display: flex;        /* Sidebar + Main side by side */
  height: 100vh;        /* Full viewport height */
  overflow: hidden;     /* No page scroll */
}

.desktop-main {
  flex: 1;              /* Take remaining space */
  overflow-y: auto;     /* Scroll inside */
}

.content-area {
  min-height: 100%;     /* Fill container */
}
```

### Mobile Layout (<1024px)
```css
Mobile uses flex column with bottom navigation
Content has min-h-screen and scrolls normally
```

## Changes Made

### 1. Fixed content-area height
**Before**: `min-height: 100vh` (caused overflow)
**After**: `min-height: 100%` (fits container)

### 2. Added z-index layering
- Desktop sidebar: z-10
- Desktop main: z-1
- Content area: z-1

### 3. Fixed Dashboard height
**Before**: `min-h-screen` (conflicted with desktop layout)
**After**: `min-h-full` (works with container)

### 4. Added visual debugging
- Colored borders
- Debug indicators
- Enhanced logging

## How to Test

### Desktop (≥1024px)
1. Open in browser at desktop width
2. Navigate to Dashboard
3. Check console for logs
4. Look for colored borders
5. Check if content is visible
6. Try scrolling

### Mobile (<1024px)
1. Resize to mobile width
2. Should see bottom navigation
3. Content should scroll normally
4. No layout changes needed

## Expected Behavior

### ✅ Working Desktop Layout
- Green border around entire viewport
- Blue border on right side (scrollable)
- Red border inside blue
- Dashboard content visible and scrollable
- Sidebar fixed on left
- Content doesn't overflow viewport

### ✅ Working Mobile Layout
- No borders (different layout)
- Bottom navigation visible
- Content scrolls normally
- Full screen usage

### ❌ Broken Layout Signs
- No borders visible
- Only one color of border
- Borders but no content
- Content flickering
- White/blank screen
- Console errors

## Next Steps

Once we identify the issue:

1. **Remove debug borders** from globals.css
2. **Remove debug indicators** from components
3. **Remove console.logs** from App.tsx
4. **Test all screens** to ensure they work
5. **Document the fix** for future reference

## Quick Fixes to Try

### If sidebar is too wide
```css
.desktop-sidebar {
  width: 280px; /* or max-width: 280px */
}
```

### If content not scrolling
```css
.desktop-main {
  overflow-y: auto !important;
}
```

### If content has no height
```tsx
// In Dashboard.tsx, ensure wrapper has content
<div className="min-h-full" style={{border: '1px solid yellow'}}>
  {/* content */}
</div>
```

### If z-index issues
```css
.desktop-layout {
  z-index: 1;
}
.debug-indicator {
  z-index: 9999 !important;
}
```

## Rollback Plan

If debugging makes things worse:

1. **Remove all debug borders** (search for "DEBUG:" in globals.css)
2. **Remove debug indicators** (search for "DEBUG:" in components)
3. **Revert to original min-h-screen** in Dashboard
4. **Remove enhanced console logging**

## Contact Points

Files modified for debugging:
- `/styles/globals.css` - Added borders, fixed heights
- `/components/Dashboard.tsx` - Changed min-h-screen to min-h-full, added indicator
- `/App.tsx` - Added enhanced debug indicator

All changes are marked with `DEBUG:` comments for easy removal.
