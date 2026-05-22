# Testing Sergeant Martinez Tutorial

## Quick Test Methods

### Method 1: Clear localStorage (Fastest)
1. Open browser DevTools (F12)
2. Go to Console tab
3. Run this command:
```javascript
localStorage.removeItem('major-finance-tutorial-completed');
localStorage.removeItem('major-finance-tutorial-skipped');
localStorage.removeItem('major-finance-tutorial-completed-date');
location.reload();
```
4. Tutorial should appear automatically after 1 second

### Method 2: Use Settings Screen
1. Navigate to Settings (bottom nav or sidebar)
2. Scroll to "Getting Started" section
3. Click "Replay Tutorial" button
4. Page reloads and tutorial appears

### Method 3: Fresh Browser Session
1. Open an Incognito/Private window
2. Navigate to your app
3. Complete login/onboarding if needed
4. Tutorial triggers automatically for new users (0 missions, <200 XP)

## What to Test

### ✅ Visual Elements
- [ ] Sergeant Martinez avatar displays correctly
- [ ] Rank badge shows "SGT Martinez"
- [ ] Two-panel layout (avatar left, content right)
- [ ] Progress bar updates as you navigate steps
- [ ] Icons display for each step
- [ ] Gradients render properly

### ✅ Content & Messaging
- [ ] Personalized greeting uses your rank
- [ ] Sergeant's quotes feel military-appropriate
- [ ] Descriptions are clear and helpful
- [ ] Highlights show checkmarks
- [ ] Pro tips display with lightning icon

### ✅ Navigation
- [ ] Back button works (disabled on first step)
- [ ] Next/Continue buttons advance steps
- [ ] Step counter shows "X of 6"
- [ ] Last step shows "Start Mission" button
- [ ] X button closes tutorial
- [ ] "Skip briefing" link works

### ✅ Animations
- [ ] Tutorial fades in smoothly
- [ ] Avatar animates on appearance
- [ ] Content transitions between steps
- [ ] Progress bar animates
- [ ] Modal dismisses smoothly

### ✅ Responsive Design
- [ ] Works on mobile (stacked panels)
- [ ] Works on tablet
- [ ] Works on desktop (side-by-side panels)
- [ ] Text is readable at all sizes
- [ ] Buttons are touch-friendly on mobile

### ✅ Functionality
- [ ] Completing tutorial sets localStorage
- [ ] Tutorial doesn't show again after completion
- [ ] Settings shows completion status
- [ ] Settings shows completion date
- [ ] Replay button works from Settings
- [ ] Tutorial auto-triggers for new users

## Expected Tutorial Flow

### Step 1: Welcome
- Title: "Welcome to Major Finance!"
- Sergeant says: "Sergeant Martinez here! Welcome aboard, [Your Rank]..."
- 3 highlights about the app
- Action: "Begin Mission Briefing"

### Step 2: Mission-Based Learning
- Title: "Mission-Based Learning"
- Sergeant talks about missions approach
- Shows mission structure
- Pro tip about Emergency Fund
- Action: "Copy That"

### Step 3: Intelligence Tools
- Title: "Intelligence Tools"
- Discusses calculators
- Shows available tools
- Pro tip about military-specific features
- Action: "Understood"

### Step 4: AI Mission Control
- Title: "AI Mission Control"
- Explains AI assistance
- Shows context-aware help
- Pro tip about chat button
- Action: "Roger That"

### Step 5: Track Your Advancement
- Title: "Track Your Advancement"
- Discusses XP and levels
- Shows progress tracking
- Pro tip about consistency
- Action: "Ready for Deployment"

### Step 6: Mission Ready!
- Title: "Mission Ready!"
- Final motivational message
- Call to action
- Pro tip for first week
- Action: "Start Mission"

## Common Issues to Check

### Tutorial Doesn't Appear
- Check if localStorage has completion flag
- Verify user has 0 missions and <200 XP
- Check console for errors
- Ensure 1-second delay has passed

### Tutorial Appears Every Time
- Check if localStorage.setItem is working
- Verify completion handler runs
- Check for localStorage clearing code

### Layout Issues
- Check CSS variables are loaded
- Verify Tailwind classes are applied
- Test in different browsers
- Check z-index conflicts

### Content Not Displaying
- Verify SergeantMartinezTutorial component imports
- Check Dashboard integration
- Look for console errors
- Verify props are passed correctly

## Testing Checklist

**Before Starting:**
- [ ] App is running without errors
- [ ] You're logged in (demo or real account)
- [ ] Dashboard is visible
- [ ] DevTools open for inspection

**During Tutorial:**
- [ ] Read each step completely
- [ ] Test all navigation buttons
- [ ] Try keyboard navigation (Tab, Enter)
- [ ] Check mobile responsiveness
- [ ] Note any typos or unclear messaging

**After Completion:**
- [ ] Dashboard appears
- [ ] localStorage has completion flag
- [ ] Settings shows completed status
- [ ] Replay button works
- [ ] Tutorial doesn't auto-trigger again

## Browser Testing Matrix

| Browser | Desktop | Mobile | Notes |
|---------|---------|--------|-------|
| Chrome  | ✅      | ✅     | Primary browser |
| Firefox | ✅      | ✅     | Check animations |
| Safari  | ✅      | ✅     | Check iOS Safari |
| Edge    | ✅      | ✅     | Chromium-based |

## Performance Checks

- [ ] Tutorial loads in <500ms
- [ ] Animations are smooth (60fps)
- [ ] No layout shift on load
- [ ] Images/icons load quickly
- [ ] No console warnings/errors

## Accessibility Checks

- [ ] Can navigate with keyboard only
- [ ] Focus indicators are visible
- [ ] Button labels are descriptive
- [ ] Color contrast is sufficient
- [ ] Screen reader announces content

## Quick localStorage Commands

### Check Current Status
```javascript
console.log('Completed:', localStorage.getItem('major-finance-tutorial-completed'));
console.log('Skipped:', localStorage.getItem('major-finance-tutorial-skipped'));
console.log('Date:', localStorage.getItem('major-finance-tutorial-completed-date'));
```

### Force Tutorial to Show
```javascript
localStorage.removeItem('major-finance-tutorial-completed');
localStorage.removeItem('major-finance-tutorial-skipped');
localStorage.removeItem('major-finance-tutorial-completed-date');
location.reload();
```

### Mark as Completed (Skip Testing)
```javascript
localStorage.setItem('major-finance-tutorial-completed', 'true');
localStorage.setItem('major-finance-tutorial-completed-date', new Date().toISOString());
location.reload();
```

## Reporting Issues

If you find any issues, note:
1. **What**: Describe the problem
2. **Where**: Which step/screen
3. **When**: During what action
4. **Expected**: What should happen
5. **Actual**: What actually happened
6. **Browser**: Which browser/device
7. **Screenshot**: If visual issue

## Success Criteria

✅ Tutorial appears automatically for new users
✅ All 6 steps display correctly
✅ Navigation works smoothly
✅ Animations enhance the experience
✅ Content is clear and helpful
✅ Mobile and desktop layouts work
✅ Completion status is tracked
✅ Replay functionality works

## Next Steps After Testing

Once testing is complete:
1. Note any content improvements
2. Check for typos or unclear messaging
3. Test with real users if possible
4. Gather feedback on helpfulness
5. Iterate on messaging as needed

---

**Ready to Test!** 🎯

Open your browser console and run:
```javascript
localStorage.clear(); location.reload();
```

The Sergeant Martinez tutorial should greet you! 🪖
