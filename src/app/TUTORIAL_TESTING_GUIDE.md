# Sergeant Martinez Tutorial - Testing & Debugging Guide

## Overview
This guide provides comprehensive testing procedures, debugging tools, and troubleshooting steps for the Sergeant Martinez Tutorial system.

## ✅ Testing Checklist

### 1. **Initial Load Testing**
- [ ] Tutorial auto-triggers for new users (0 missions, <200 XP)
- [ ] Tutorial appears after 1-second delay on dashboard
- [ ] Tutorial doesn't show for returning users who completed it
- [ ] Loading states are smooth with no flashing

### 2. **Navigation Testing**
- [ ] **Next Button**: Advances through all 6 steps
- [ ] **Back Button**: Returns to previous steps
- [ ] **Arrow Keys**: Right arrow advances, left arrow goes back
- [ ] **First Step**: Back button is disabled
- [ ] **Last Step**: Shows completion action
- [ ] **Rapid Clicking**: Prevented by transition state

### 3. **Keyboard Navigation**
- [ ] **Escape Key**: Triggers skip confirmation
- [ ] **Arrow Keys**: Navigate between steps
- [ ] **Tab Navigation**: Properly cycles through interactive elements
- [ ] **Enter/Space**: Activates focused buttons
- [ ] **Keyboard shortcuts hint** visible on screen

### 4. **Animation & Performance**
- [ ] Sergeant avatar animates smoothly on step change
- [ ] Content slides in/out without lag
- [ ] Progress bar updates smoothly
- [ ] No jank or stutter during transitions
- [ ] Animations are disabled when "prefers-reduced-motion" is set

### 5. **Progress Persistence**
- [ ] Current step is saved to localStorage
- [ ] Tutorial resumes from last step on refresh
- [ ] Progress is cleared on completion
- [ ] Progress is cleared on skip

### 6. **Completion & Skip**
- [ ] **Complete**: Sets completion flags in localStorage
- [ ] **Complete**: Clears progress step
- [ ] **Complete**: Logs analytics event
- [ ] **Skip**: Shows confirmation dialog
- [ ] **Skip**: Sets skip flag in localStorage
- [ ] **Skip**: Returns to dashboard

### 7. **Replay Functionality**
- [ ] Settings screen shows tutorial status
- [ ] Settings screen shows completion date
- [ ] "Replay Tutorial" button clears all flags
- [ ] Tutorial appears immediately on dashboard after replay
- [ ] Replay starts from step 1

### 8. **Accessibility**
- [ ] Dialog role and ARIA attributes present
- [ ] Keyboard focus is trapped within tutorial
- [ ] Screen reader announces steps correctly
- [ ] Button labels are descriptive
- [ ] Color contrast meets WCAG AA standards

### 9. **Responsive Design**
- [ ] Layout works on mobile (320px+)
- [ ] Layout works on tablet (768px+)
- [ ] Layout works on desktop (1024px+)
- [ ] Avatar section stacks on mobile
- [ ] All text is readable on all screen sizes

### 10. **Error Handling**
- [ ] Handles missing userData gracefully
- [ ] Handles localStorage errors
- [ ] Doesn't crash on rapid interactions
- [ ] Recovers from animation interruptions

## 🧪 Testing Procedures

### A. New User Flow Test
```javascript
// 1. Clear all tutorial flags
localStorage.removeItem('major-finance-tutorial-completed');
localStorage.removeItem('major-finance-tutorial-skipped');
localStorage.removeItem('major-finance-tutorial-completed-date');
localStorage.removeItem('major-finance-tutorial-step');

// 2. Set user to new state (via app state or demo mode)
// - completedMissions: 0
// - xp: 0

// 3. Navigate to dashboard
// Expected: Tutorial appears after 1 second
```

### B. Returning User Test
```javascript
// 1. Set completion flag
localStorage.setItem('major-finance-tutorial-completed', 'true');

// 2. Navigate to dashboard
// Expected: Tutorial does NOT appear
// Expected: CTA card at bottom if completedMissions === 0
```

### C. Progress Resume Test
```javascript
// 1. Start tutorial
// 2. Navigate to step 3
// 3. Refresh browser
// Expected: Tutorial resumes at step 3
```

### D. Skip Flow Test
```javascript
// 1. Start tutorial
// 2. Click X or skip button
// Expected: Confirmation dialog appears
// 3. Confirm skip
// Expected: Returns to dashboard
// Expected: 'major-finance-tutorial-skipped' flag set
```

### E. Replay Test
```javascript
// 1. Complete tutorial
// 2. Go to Settings
// 3. Click "Replay Tutorial"
// Expected: All flags cleared
// Expected: Navigate to dashboard
// Expected: Tutorial appears immediately
```

### F. Keyboard Navigation Test
```
1. Start tutorial
2. Press Right Arrow
   Expected: Advance to step 2
3. Press Left Arrow
   Expected: Return to step 1
4. Press Escape
   Expected: Skip confirmation appears
5. Press Tab repeatedly
   Expected: Focus cycles through buttons
```

## 🐛 Debugging Tools

### Development Mode Features
When `process.env.NODE_ENV === 'development'`, the tutorial shows:
- Current step number
- Transition state
- Animation state
- Debug panel at bottom

### Console Logging
The tutorial logs key events:
- `[Tutorial] Completed successfully`
- `[Tutorial] Skipped by user`

### localStorage Inspection
Monitor these keys in DevTools > Application > Local Storage:
```javascript
'major-finance-tutorial-completed'      // 'true' if completed/skipped
'major-finance-tutorial-skipped'        // 'true' if skipped
'major-finance-tutorial-completed-date' // ISO date string
'major-finance-tutorial-step'           // '0' to '5' for current step
```

### React DevTools
Check component state:
- `currentStep`: Should match visible step
- `isVisible`: Should be true when showing
- `showSergeant`: Controls avatar animation
- `isTransitioning`: Prevents rapid clicks

## 🔧 Common Issues & Solutions

### Issue: Tutorial doesn't appear for new users
**Symptoms**: Dashboard loads but no tutorial overlay
**Debug Steps**:
1. Check localStorage for completion flag
2. Verify userData.completedMissions === 0
3. Verify userData.xp < 200
4. Check console for errors

**Solution**: Clear localStorage flags and refresh

### Issue: Animations are choppy
**Symptoms**: Jerky transitions, lag during step changes
**Debug Steps**:
1. Check browser performance in DevTools
2. Look for heavy re-renders in React DevTools
3. Verify CSS `will-change` properties are applied

**Solution**: 
- Ensure hardware acceleration is enabled
- Check for unnecessary re-renders
- Reduce motion if system prefers it

### Issue: Tutorial stuck on one step
**Symptoms**: Can't navigate forward or backward
**Debug Steps**:
1. Check `isTransitioning` state
2. Look for JavaScript errors in console
3. Check if buttons are disabled

**Solution**: Refresh page or clear tutorial progress

### Issue: Skip confirmation appears multiple times
**Symptoms**: Dialog shows repeatedly
**Debug Steps**:
1. Check event listener attachment
2. Look for duplicate component renders

**Solution**: Ensure proper cleanup in useEffect

### Issue: Progress not saving
**Symptoms**: Tutorial restarts from beginning on refresh
**Debug Steps**:
1. Check localStorage.setItem calls
2. Verify no localStorage quota errors
3. Check browser localStorage settings

**Solution**: Ensure localStorage is enabled and not full

## 📊 Performance Benchmarks

### Target Metrics
- **Initial Render**: < 100ms
- **Step Transition**: < 200ms
- **Animation Frame Rate**: 60 FPS
- **Total Bundle Size Impact**: < 50KB

### Measuring Performance
```javascript
// In browser console
performance.mark('tutorial-start');
// ... tutorial interaction ...
performance.mark('tutorial-end');
performance.measure('tutorial-duration', 'tutorial-start', 'tutorial-end');
console.log(performance.getEntriesByName('tutorial-duration'));
```

## 🎯 Accessibility Testing

### Screen Reader Testing
Test with:
- **NVDA** (Windows)
- **JAWS** (Windows)
- **VoiceOver** (Mac/iOS)
- **TalkBack** (Android)

Expected announcements:
- "Dialog, Mission Briefing Progress"
- "Button, Skip tutorial, Escape"
- "Button, Back, Previous step"
- "Button, [Action Name], Next step"

### Keyboard-Only Navigation
- All interactive elements reachable via Tab
- Focus indicators clearly visible
- No keyboard traps
- Logical tab order

### Color Contrast
All text must meet WCAG AA:
- Normal text: 4.5:1 minimum
- Large text: 3:1 minimum
- Use browser DevTools > Accessibility > Contrast

## 🚀 Optimization Tips

### 1. Lazy Loading
Tutorial component is directly imported in App.tsx for instant availability.
If bundle size becomes an issue, consider lazy loading:
```javascript
const SergeantMartinezTutorial = React.lazy(() => 
  import('./components/SergeantMartinezTutorial')
);
```

### 2. Memoization
- Steps array is memoized with `useMemo`
- StepContent is wrapped in `memo()`
- Handlers use `useCallback`

### 3. Animation Performance
- Use CSS transforms instead of position changes
- Apply `will-change` sparingly
- Remove `will-change` after animation completes
- Use `transform: translateZ(0)` for GPU acceleration

### 4. Re-render Prevention
- Prevent navigation during transitions
- Memoize expensive computations
- Split large components into smaller memoized ones

## 📝 User Feedback Collection

### Analytics Events to Track
- `tutorial_started`: When overlay appears
- `tutorial_step_viewed`: For each step (with step number)
- `tutorial_completed`: On successful completion
- `tutorial_skipped`: When user skips (with step number)
- `tutorial_replayed`: When user replays from Settings

### User Testing Questions
1. Did the tutorial help you understand the app?
2. Was the pace too fast or too slow?
3. Was any information confusing?
4. Did you feel compelled to skip? Why?
5. Would you recommend this tutorial to others?

## 🔄 Continuous Improvement

### Metrics to Monitor
- **Completion Rate**: % of users who complete all 6 steps
- **Skip Rate**: % of users who skip at each step
- **Average Time**: Time to complete tutorial
- **Replay Rate**: % of users who replay tutorial

### A/B Testing Ideas
- Different delay times (500ms vs 1000ms vs 1500ms)
- Step count (4 vs 6 vs 8 steps)
- Animation speed (fast vs medium vs slow)
- Sergeant Martinez presence (avatar vs no avatar)

---

## Quick Reference

### localStorage Keys
```javascript
'major-finance-tutorial-completed'      // Completion status
'major-finance-tutorial-skipped'        // Skip status
'major-finance-tutorial-completed-date' // Completion timestamp
'major-finance-tutorial-step'           // Current progress (0-5)
```

### Keyboard Shortcuts
- **→**: Next step
- **←**: Previous step
- **Esc**: Skip (with confirmation)
- **Tab**: Cycle focus
- **Enter/Space**: Activate button

### Component Props
```typescript
interface SergeantMartinezTutorialProps {
  onComplete: () => void;  // Called when tutorial completes
  onSkip: () => void;      // Called when user skips
  userName?: string;       // Display name
  userRank?: string;       // Military rank for personalization
}
```

---

**Last Updated**: October 2025  
**Version**: 2.0 (Enhanced with testing tools)
