# Sergeant Martinez Tutorial - Quick Reference Card

## 🎯 At a Glance

### Component Location
📁 `/components/SergeantMartinezTutorial.tsx`

### Trigger Conditions
✅ New user (0 missions + XP < 200)  
✅ No completion flag in localStorage  
✅ 1-second delay after dashboard loads

### Duration
⏱️ **6 steps** | ~3-5 minutes average

---

## 🔑 Key Features

| Feature | Status |
|---------|--------|
| Keyboard Navigation | ✅ Arrow keys + Esc |
| Progress Save | ✅ Resume on refresh |
| Skip Confirmation | ✅ Yes |
| Accessibility | ✅ WCAG AA |
| Performance | ✅ 60 FPS animations |
| Mobile Responsive | ✅ 320px+ |
| Replay Available | ✅ From Settings |

---

## ⌨️ Keyboard Shortcuts

```
→  Next step
←  Previous step
Esc  Skip (with confirmation)
Tab  Cycle focus
Enter  Activate button
```

---

## 💾 localStorage Keys

```javascript
// Status flags
'major-finance-tutorial-completed'      // 'true' when done/skipped
'major-finance-tutorial-skipped'        // 'true' if skipped
'major-finance-tutorial-completed-date' // ISO timestamp

// Progress tracking
'major-finance-tutorial-step'           // '0' to '5' - current step
```

---

## 🎨 Component Props

```typescript
interface SergeantMartinezTutorialProps {
  onComplete: () => void;
  onSkip: () => void;
  userName?: string;    // Display name (optional)
  userRank?: string;    // Military rank (optional)
}
```

---

## 🚀 Usage Example

```tsx
import { SergeantMartinezTutorial } from './components/SergeantMartinezTutorial';

// In your component
{showTutorial && (
  <SergeantMartinezTutorial
    onComplete={() => setShowTutorial(false)}
    onSkip={() => setShowTutorial(false)}
    userName="John Doe"
    userRank="Staff Sergeant (E-6)"
  />
)}
```

---

## 🧪 Testing Commands

### Reset Tutorial
```javascript
// In browser console
localStorage.removeItem('major-finance-tutorial-completed');
localStorage.removeItem('major-finance-tutorial-skipped');
localStorage.removeItem('major-finance-tutorial-completed-date');
localStorage.removeItem('major-finance-tutorial-step');
location.reload();
```

### Check Tutorial Status
```javascript
// In browser console
console.log({
  completed: localStorage.getItem('major-finance-tutorial-completed'),
  skipped: localStorage.getItem('major-finance-tutorial-skipped'),
  completedDate: localStorage.getItem('major-finance-tutorial-completed-date'),
  currentStep: localStorage.getItem('major-finance-tutorial-step')
});
```

### Force Show Tutorial
```javascript
// In React component
setShowTutorial(true);
```

---

## 🐛 Common Issues & Quick Fixes

### Issue: Tutorial won't appear
```javascript
// 1. Check completion flag
localStorage.getItem('major-finance-tutorial-completed') // Should be null

// 2. Check user state
userData.completedMissions === 0 && userData.xp < 200 // Should be true

// 3. Force clear and reload
localStorage.clear();
location.reload();
```

### Issue: Animations are choppy
```javascript
// Check GPU acceleration
// In DevTools > Rendering > "Show layer borders"
// Tutorial should be on its own composite layer

// Check FPS
// In DevTools > Rendering > "Frame Rendering Stats"
// Should be 58-60 FPS
```

### Issue: Keyboard navigation not working
```javascript
// Check event listener attachment
// Look for console errors
// Verify no conflicting keyboard shortcuts
// Test in different browser
```

---

## 📊 Performance Targets

| Metric | Target | Critical |
|--------|--------|----------|
| Initial Render | < 100ms | < 150ms |
| Step Transition | < 200ms | < 300ms |
| FPS | 60 | > 50 |
| Re-renders per Step | 1-2 | < 4 |
| Bundle Impact | < 50KB | < 75KB |

---

## 🎯 Step Breakdown

1. **Welcome** (Award icon) - Introduction to app
2. **Missions** (Target icon) - Mission-based learning
3. **Calculators** (Calculator icon) - Intelligence tools
4. **AI Assistant** (Sparkles icon) - 24/7 support
5. **Progress** (Trophy icon) - Track advancement
6. **Ready** (CheckCircle icon) - Mission ready!

---

## 🔧 Quick Maintenance Tasks

### Add New Step
```javascript
// In SergeantMartinezTutorial.tsx
const steps = useMemo(() => [
  // ... existing steps
  {
    id: '7', // Increment
    title: 'New Feature',
    sergeantQuote: 'Quote here',
    description: 'Description here',
    icon: YourIcon,
    highlights: ['Point 1', 'Point 2'],
    tip: 'Pro tip here',
    action: 'Continue'
  }
], [userRank]);
```

### Update Timing
```javascript
// Animation entrance timing
setTimeout(() => setShowSergeant(true), 150); // Adjust ms

// Step transition timing
setTimeout(() => {
  setCurrentStep(prev => prev + 1);
  setIsTransitioning(false);
}, 200); // Adjust ms
```

### Change Trigger Conditions
```javascript
// In Dashboard.tsx
const shouldShowTutorial = useMemo(() => {
  const hasSeenTutorial = localStorage.getItem('major-finance-tutorial-completed');
  const isNewUser = userData.completedMissions === 0 && userData.xp < 200; // Adjust here
  return !hasSeenTutorial && isNewUser;
}, [userData.completedMissions, userData.xp]);
```

---

## 📝 Analytics Events

Track these for insights:
```javascript
// Event 1: Tutorial Started
console.log('[Tutorial] Started');

// Event 2: Step Viewed
console.log('[Tutorial] Step viewed:', currentStep + 1);

// Event 3: Completed
console.log('[Tutorial] Completed successfully');

// Event 4: Skipped
console.log('[Tutorial] Skipped by user');

// Event 5: Replayed
console.log('[Tutorial] Replayed from Settings');
```

---

## 🎨 Theming Integration

Tutorial automatically uses:
- `--gradient-primary` for headers
- `--primary` for accents
- `--muted` for backgrounds
- `--foreground` for text
- `--success` for checkmarks
- Military theme from ThemeProvider

---

## ♿ Accessibility Checklist

✅ ARIA dialog role  
✅ Focus trap within modal  
✅ Keyboard navigation  
✅ Screen reader labels  
✅ Color contrast WCAG AA  
✅ Reduced motion support  
✅ Descriptive button labels  
✅ Logical tab order  

---

## 📱 Responsive Breakpoints

| Breakpoint | Layout | Notes |
|------------|--------|-------|
| 320px-767px | Stacked | Avatar on top |
| 768px-1023px | Side-by-side | 2/5 avatar, 3/5 content |
| 1024px+ | Side-by-side | Max width 3xl |

---

## 🚨 Critical Dependencies

```json
{
  "react": "^18.x",
  "lucide-react": "latest",
  "@/components/ui/card": "local",
  "@/components/ui/button": "local",
  "@/components/ui/badge": "local",
  "@/components/ui/progress": "local"
}
```

---

## 📚 Related Documentation

- **Full Testing Guide**: `/TUTORIAL_TESTING_GUIDE.md`
- **UX Improvements**: `/UX_IMPROVEMENTS_SUMMARY.md`
- **Performance Details**: `/PERFORMANCE_OPTIMIZATION_SUMMARY.md`
- **Sergeant Martinez Doc**: `/SERGEANT_MARTINEZ_TUTORIAL.md`

---

## 🔄 Version History

| Version | Date | Changes |
|---------|------|---------|
| 2.0 | Oct 2025 | Performance + UX improvements |
| 1.5 | Oct 2025 | Progress persistence added |
| 1.0 | Oct 2025 | Initial implementation |

---

## 🎉 Quick Win Tips

1. **Test First**: Always test after changes
2. **Profile Performance**: Use React DevTools
3. **Mobile First**: Test on real devices
4. **Accessibility**: Use keyboard only
5. **User Feedback**: Listen and iterate
6. **Clear Metrics**: Track completion rate
7. **Document Changes**: Update this file
8. **Version Control**: Commit frequently

---

## 📞 Support

Questions? Check:
1. This quick reference first
2. Full testing guide for detailed steps
3. Performance doc for optimization
4. Code comments in component
5. Console logs in development mode

---

**Quick Reference Version**: 1.0  
**Last Updated**: October 2025  
**Print**: This fits on 2 pages for desk reference
