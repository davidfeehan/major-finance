# Major Finance - Navigation Map

## ✅ Navigation Status: All Links Working

Last Updated: Current Session

---

## Main Navigation

### Mobile Bottom Navigation (5 items)
```
┌─────────────────────────────────────────────────┐
│  🏠      💳       🎯      🏆      ⚙️        │
│ Home  Banking  Missions Progress Settings    │
└─────────────────────────────────────────────────┘
```

- **Home** → `dashboard`
- **Banking** → `banking`
- **Missions** → `missions`
- **Progress** → `progress`
- **Settings** → `settings`

### Mobile Footer Link
- **Help & Support** → `help`

### Desktop Sidebar (7 items)

**Main Section:**
- Dashboard → `dashboard`
- Banking → `banking` (NEW badge)
- Missions → `missions` (5 badge)
- Progress → `progress`

**Account Section:**
- Profile → `profile`
- Settings → `settings`
- Help & Support → `help`

---

## Mission Navigation

### Available from Dashboard & Missions Screen

1. **Retirement Planning** → `retirement-planning`
   - XP Reward: 250
   - Difficulty: Intermediate
   - Leads to → `retirement-calculator`

2. **Emergency Fund Mission** → `emergency-fund`
   - XP Reward: 150
   - Difficulty: Beginner

3. **Investment Training** → `investment-basics`
   - XP Reward: 200
   - Difficulty: Intermediate

4. **TSP Optimization** → `tsp-optimization`
   - XP Reward: 300
   - Difficulty: Advanced
   - Unlocks after 2 missions completed

5. **Financial Education** → `financial-education`
   - XP Reward: 100
   - Difficulty: Beginner

---

## Screen Hierarchy

### Entry Points
```
auth
  └─> onboarding (first time users)
       └─> dashboard
  └─> dashboard (returning users/demo)
```

### Dashboard Flows
```
dashboard
  ├─> missions
  │    ├─> retirement-planning
  │    │    └─> retirement-calculator
  │    │         └─> xp-notification
  │    ├─> emergency-fund
  │    │    └─> xp-notification
  │    ├─> investment-basics
  │    │    └─> xp-notification
  │    ├─> tsp-optimization
  │    │    └─> xp-notification
  │    └─> financial-education
  │         └─> xp-notification
  ├─> banking
  ├─> progress
  ├─> profile
  ├─> settings
  │    ├─> nav-test (debug)
  │    └─> desktop-layout-test (debug)
  └─> help
```

---

## All Implemented Screens (15 total)

### Public Screens
1. ✅ `auth` - Authentication flow
2. ✅ `onboarding` - First-time setup

### Main Screens
3. ✅ `dashboard` - Main hub
4. ✅ `banking` - Account management
5. ✅ `missions` - Mission list
6. ✅ `progress` - User progress tracking
7. ✅ `profile` - User profile management
8. ✅ `settings` - App settings
9. ✅ `help` - Help & Support

### Mission Screens
10. ✅ `retirement-planning` - Planning form
11. ✅ `retirement-calculator` - Calculator results
12. ✅ `emergency-fund` - Emergency fund mission
13. ✅ `investment-basics` - Investment training
14. ✅ `tsp-optimization` - TSP optimization
15. ✅ `financial-education` - Financial education

### Special Screens
16. ✅ `xp-notification` - XP reward screen
17. ✅ `nav-test` - Navigation testing (debug)
18. ✅ `desktop-layout-test` - Layout testing (debug)

---

## Navigation Features

### Active State Detection
- Dashboard: Active only on dashboard
- Missions: Active on missions + all mission screens
- Banking: Active only on banking
- Other screens: Direct match

### Back Navigation
All mission screens have back button → returns to dashboard

### Demo Mode
- Test navigation button on auth screen (debug)
- Pre-populated data
- Skip onboarding
- Full feature access

---

## Layout Responsiveness

### Mobile (< 1024px)
- Bottom navigation bar
- FAB AI chat
- Full-screen content

### Desktop (≥ 1024px)
- Left sidebar navigation
- Main content area
- Right chat panel (collapsible)
- Resizable panels

---

## Debug Tools

### Navigation Debug Panel
- Shows current screen
- Quick navigation buttons
- Always visible in corner

### Settings Debug Links
- Navigation Test → Comprehensive test screen
- Desktop Layout Test → Layout testing screen

---

## Navigation Guards

### Onboarding Check
- Non-demo users without profile → redirect to onboarding
- Demo users → skip directly to dashboard

### Auth Check
- Unauthenticated users → redirect to auth
- Authenticated users → navigate normally

### Mission Unlocking
- TSP Optimization requires 2 completed missions
- Other missions always available

---

## Status: ✅ All Links Verified

All navigation paths have been tested and verified as working correctly.
No broken links or missing screens detected.
