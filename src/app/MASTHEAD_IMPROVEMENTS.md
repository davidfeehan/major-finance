# Command Screen Masthead System

## 🎖️ Overview

Implemented unified, military-inspired command screen mastheads across the Dashboard, Missions, and Progress screens. Each masthead provides consistent branding, real-time stats, and contextual information in a visually striking gradient header.

---

## ✨ Design Philosophy

### Military Command Aesthetic
- **Visual Impact**: Large gradient headers with military-professional styling
- **Information Hierarchy**: Clear organization of user identity, stats, and progress
- **Branch Integration**: Displays branch-specific icons and theming
- **Real-time Data**: Live XP, level, and mission statistics

### Consistent Elements Across All Screens
1. **Gradient Background**: `var(--gradient-primary)` with white border overlays
2. **Branch Icon**: 14x14 rounded square with branch emoji
3. **Title + Badge**: Screen name with contextual badge
4. **User Identity Row**: Rank, branch, years of service
5. **Stats Grid**: 4-column stat cards with icons
6. **Responsive Layout**: Adapts from mobile to desktop

---

## 📊 Implementation Details

### Dashboard - "Mission Command"

**Title**: Mission Command  
**Icon**: Branch emoji (⚓ 🦅 🛡️ etc.)  
**Badge**: Theme mode (☀️ Light / 🌙 Dark)

#### Stats Row (4 cards):
1. **Completed Missions** - Green checkmark
   - Shows: X/5 missions completed
   
2. **XP Earned** - Yellow star
   - Shows: Earned/Total XP

3. **Available Missions** - Blue target
   - Shows: Count of available missions

4. **Success Rate** - Purple award
   - Shows: Percentage completion

#### User Identity:
- Rank (with Shield icon)
- Branch name
- Years of service (with Clock icon)

#### Top Right Stats:
- Total XP (with Zap icon)
- Current Level (with Trophy icon)

---

### Missions Screen - "Mission Operations"

**Title**: Mission Operations  
**Icon**: Target icon  
**Badge**: "{X} Active" with Flame icon

#### Stats Row (4 cards):
1. **Completed** - Green checkmark
   - Shows: X/5 missions

2. **XP Earned** - Yellow star
   - Shows: Earned/Total XP

3. **Available** - Blue target
   - Shows: Available mission count

4. **Success Rate** - Purple award
   - Shows: Completion percentage

#### User Identity:
- Rank (with Shield icon)
- Branch name
- Years of service (with Clock icon) [if available]

#### Top Right Stats:
- Total XP (with Zap icon)
- Current Level (with Trophy icon)

---

### Progress Screen - "Achievement Center"

**Title**: Achievement Center / "Martinez's Achievement Center" (demo)  
**Icon**: Trophy icon  
**Badge**: "12-Year Journey" (demo mode only) with Flame icon

#### Stats Row (4 cards):
1. **Missions** - Green checkmark
   - Shows: Total completed missions

2. **Achievements** - Purple award
   - Shows: Unlocked achievements count

3. **Level Progress** - Yellow star
   - Shows: Progress % to next level

4. **To Next Level** - Blue target
   - Shows: XP needed for next level

#### User Identity:
- Rank (with Shield icon)
- Branch name
- Years of service (with Clock icon) [if available]

#### Top Right Stats:
- Total XP (with Zap icon)
- Current Level (with Trophy icon)

#### Demo Mode Summary (bottom):
Full journey summary text in white/5 background card

---

## 🎨 Visual Specifications

### Color Palette
```css
/* Background */
background: var(--gradient-primary)

/* Text Colors */
Primary Text: text-white (with drop-shadow-lg)
Secondary Text: text-white/90, text-white/80, text-white/70
Dividers: bg-white/20, bg-white/40

/* Card Backgrounds */
Stats Cards: bg-white/5 backdrop-blur-sm
Borders: border-white/10, border-white/20

/* Icon Colors */
Green: text-green-300 (completed/success)
Yellow: text-yellow-300 (XP/stars)
Blue: text-blue-300 (targets/available)
Purple: text-purple-300 (achievements)
```

### Typography
```css
/* Title */
h1: text-white drop-shadow-lg tracking-tight

/* Stats */
XP/Level Numbers: text-2xl font-bold text-white drop-shadow-lg
Stat Labels: text-xs text-white/70 drop-shadow

/* Identity Row */
Rank/Branch: text-white/90, text-white/80 drop-shadow
```

### Layout
```css
/* Container */
padding: 2rem (p-8)
border-radius: 0.75rem (rounded-xl)
box-shadow: shadow-2xl
border: 1px solid rgba(255,255,255,0.1)

/* Spacing */
gap-6: Between major sections
gap-4: Between XP and Level stats
gap-3: Between stat cards
gap-2: Within elements
```

### Responsive Breakpoints
```css
/* Mobile First */
Default: Stacked layout, 2-column stats

/* Tablet (sm:) */
@media (min-width: 640px)
- Identity row items inline
- Divider dots visible

/* Desktop (lg:) */
@media (min-width: 1024px)
- Horizontal layout for identity row
- 4-column stats grid
- Side-by-side XP/Level display
```

---

## 🔧 Component Structure

### Base Template
```tsx
<div className="animate-in fade-in duration-500">
  <div className="p-8 rounded-xl shadow-2xl border border-white/10 transition-all hover:shadow-3xl" 
       style={{ background: 'var(--gradient-primary)' }}>
    <div className="space-y-6">
      
      {/* Identity Row */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left: Icon + Title + User Info */}
        <div className="flex items-start gap-4 flex-1">
          {/* Branch Icon */}
          <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-xl 
                          flex items-center justify-center border border-white/20 
                          shadow-lg flex-shrink-0">
            <IconComponent className="w-7 h-7 text-white" />
          </div>
          
          {/* Title & User Info */}
          <div className="flex-1 min-w-0">
            {/* Title + Badge */}
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h1 className="text-white drop-shadow-lg tracking-tight">
                Screen Title
              </h1>
              <Badge variant="secondary" 
                     className="text-xs bg-white/10 text-white/90 border-white/20">
                Badge Text
              </Badge>
            </div>
            
            {/* User Identity */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-white/60" />
                <span className="text-white/90 drop-shadow">{rank}</span>
              </div>
              {/* Divider dots, branch, years... */}
            </div>
          </div>
        </div>
        
        {/* Right: XP & Level */}
        <div className="flex items-center gap-4">
          {/* XP Stat */}
          <div className="text-right">
            <div className="flex items-center justify-end gap-2 mb-1">
              <Zap className="w-5 h-5 text-yellow-300" />
              <span className="text-2xl font-bold text-white drop-shadow-lg">
                {xp}
              </span>
            </div>
            <p className="text-xs text-white/70 drop-shadow">Total XP</p>
          </div>
          
          {/* Divider */}
          <div className="h-12 w-px bg-white/20"></div>
          
          {/* Level Stat */}
          <div className="text-right">
            <div className="flex items-center justify-end gap-2 mb-1">
              <Trophy className="w-5 h-5 text-yellow-300" />
              <span className="text-2xl font-bold text-white drop-shadow-lg">
                {level}
              </span>
            </div>
            <p className="text-xs text-white/70 drop-shadow">Level</p>
          </div>
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Stat Card Template */}
        <div className="p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
          <div className="flex items-center gap-2 mb-1">
            <IconComponent className="w-4 h-4 text-color-300" />
            <span className="text-xs text-white/70">Label</span>
          </div>
          <p className="text-xl font-bold text-white">Value</p>
        </div>
      </div>
      
    </div>
  </div>
</div>
```

---

## 📋 Props & Data Requirements

### Required Props
```typescript
interface UserData {
  xp: number;                    // Total XP earned
  completedMissions: number;     // Number of missions completed
  rank?: string;                 // Military rank (optional)
  yearsOfService?: string;       // Years in service (optional)
}

interface ScreenProps {
  userData: UserData;
  isDemo?: boolean;              // Demo mode flag
  // ... other screen-specific props
}
```

### Theme Integration
```typescript
import { useTheme, MILITARY_THEMES } from './ThemeProvider';

const { theme } = useTheme();
const branchInfo = MILITARY_THEMES[theme.branch];
```

---

## 🎯 Stat Calculations

### Dashboard
```typescript
// Mission stats
const completedCount = missions.filter(m => m.status === 'completed').length;
const availableCount = missions.filter(m => m.status === 'available').length;
const totalMissions = missions.length;

// XP stats
const totalXP = missions.reduce((sum, m) => sum + m.xpReward, 0);
const earnedXP = missions
  .filter(m => m.status === 'completed')
  .reduce((sum, m) => sum + m.xpReward, 0);

// Success rate
const successRate = Math.round((completedCount / totalMissions) * 100);
```

### Missions Screen
```typescript
// Same as Dashboard, but filtered by category if applicable
const filteredMissions = selectedCategory === 'All' 
  ? missions 
  : missions.filter(m => m.category === selectedCategory);
```

### Progress Screen
```typescript
// Level calculations
const currentLevel = Math.floor(userData.xp / 500) + 1;
const xpForNextLevel = (currentLevel * 500) - userData.xp;
const xpProgress = ((userData.xp % 500) / 500) * 100;

// Achievement count
const achievementsUnlocked = achievements.filter(a => a.earned).length;
```

---

## 🔍 Demo Mode Enhancements

### Dashboard
- No specific demo changes to masthead
- Stats reflect demo data automatically

### Missions Screen
- Badge shows active missions count
- Stats calculate from demo mission data

### Progress Screen
- Title changes to "Martinez's Achievement Center"
- Badge shows "12-Year Journey" with Flame icon
- Additional summary card at bottom:
  ```tsx
  {isDemo && (
    <div className="p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
      <p className="text-sm text-white/90 leading-relaxed">
        <strong>Journey Summary:</strong> [Full journey narrative]
      </p>
    </div>
  )}
  ```

---

## 📱 Responsive Behavior

### Mobile (default)
- Stacked layout
- Full-width elements
- 2-column stats grid
- Identity row items stack vertically
- XP/Level stats side-by-side

### Tablet (640px+)
- Identity row items go horizontal with divider dots
- Stats remain 2-column
- Better spacing

### Desktop (1024px+)
- Identity row fully horizontal
- 4-column stats grid
- Optimal spacing and alignment
- Hover effects more pronounced

---

## 🎨 Animation & Transitions

### Entry Animation
```tsx
className="animate-in fade-in duration-500"
```
- Fades in over 500ms
- Applied to entire masthead container

### Hover Effects
```tsx
className="transition-all hover:shadow-3xl"
```
- Shadow increases on hover
- Smooth transition

### Stats Animation
- Numbers animate when values change (future enhancement)
- Progress bars animate on load

---

## 🚀 Future Enhancements

### Phase 2
- [ ] Animated counter transitions for stats
- [ ] Sparkle effects on XP gain
- [ ] Level up animation
- [ ] Achievement pop-ups
- [ ] Progress bar animations

### Phase 3
- [ ] Customizable backgrounds per branch
- [ ] Rank insignia integration
- [ ] Unit/command customization
- [ ] Comparison mode (you vs average)
- [ ] Historical stat tracking

---

## ✅ Implementation Checklist

### Completed
- [x] Dashboard masthead with Mission Command theme
- [x] Missions Screen masthead with Operations theme
- [x] Progress Screen masthead with Achievement Center theme
- [x] Responsive layouts for all screen sizes
- [x] Demo mode enhancements for Progress
- [x] Branch theming integration
- [x] Consistent stat calculations
- [x] Unified color system
- [x] Icon system across all mastheads

### Testing
- [x] Mobile responsive (320px - 640px)
- [x] Tablet responsive (640px - 1024px)
- [x] Desktop responsive (1024px+)
- [x] Demo mode display
- [x] Branch switching
- [x] Theme switching (light/dark)
- [x] Stat accuracy
- [x] Animation performance

---

## 📊 Visual Comparison

### Before
```
Simple header with title and icon
├─ [Icon] Screen Name
└─ Optional subtitle
```

### After
```
Command Screen Masthead
├─ Identity Row
│   ├─ [Branch Icon] Title + Badge
│   │   └─ Rank • Branch • Years of Service
│   └─ XP | Level
├─ Stats Grid (4 cards)
│   ├─ Stat 1: Completed
│   ├─ Stat 2: XP/Achievements
│   ├─ Stat 3: Available/Progress
│   └─ Stat 4: Success Rate/To Next Level
└─ Optional: Demo summary
```

---

## 💡 Key Benefits

1. **Visual Consistency**: Unified design across all major screens
2. **Information Dense**: More stats visible at a glance
3. **Military Aesthetic**: Professional, command-center feel
4. **Contextual**: Each screen shows relevant stats
5. **Responsive**: Adapts beautifully to all screen sizes
6. **Engaging**: Gradient backgrounds and icons draw attention
7. **Professional**: Matches USAA/military finance app standards

---

## 🔗 Related Files

```
/components/Dashboard.tsx          - Mission Command masthead
/components/MissionsScreen.tsx     - Mission Operations masthead
/components/ProgressScreen.tsx     - Achievement Center masthead
/components/ThemeProvider.tsx      - Branch themes and gradients
/styles/globals.css                - Gradient definitions
```

---

## 📝 Usage Example

```typescript
// In any screen component
import { useTheme, MILITARY_THEMES } from './ThemeProvider';

function YourScreen({ userData, isDemo }: ScreenProps) {
  const { theme } = useTheme();
  const branchInfo = MILITARY_THEMES[theme.branch];
  const currentLevel = Math.floor(userData.xp / 500) + 1;
  
  return (
    <div className="min-h-full bg-background p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-10 md:space-y-12">
        
        {/* Command Masthead */}
        <div className="animate-in fade-in duration-500">
          <div className="p-8 rounded-xl shadow-2xl border border-white/10 
                          transition-all hover:shadow-3xl" 
               style={{ background: 'var(--gradient-primary)' }}>
            {/* Implementation here */}
          </div>
        </div>
        
        {/* Rest of screen content */}
      </div>
    </div>
  );
}
```

---

**Status**: ✅ Complete  
**Version**: 1.0  
**Impact**: High - Significantly improves visual hierarchy and user engagement  
**Consistency**: All three major screens now have unified command mastheads
