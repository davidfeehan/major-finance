# Demo Mode Implementation Guide

## 🎯 Overview

This guide provides step-by-step instructions for implementing the enhanced demo mode featuring Sergeant Martinez's comprehensive financial journey.

---

## ✅ Phase 1: Core Implementation (COMPLETED)

### 1. Demo Data Provider ✅
**File**: `/utils/demoData.ts`

**What it provides**:
- Complete Sergeant Martinez profile
- 4 completed missions with detailed data
- 1 in-progress mission (Retirement Planning at 65%)
- Pre-populated calculator data for all missions
- Financial snapshot (accounts, TSP, investments)
- Helper functions for data access

**Key exports**:
```typescript
import {
  demoUserProfile,
  demoMissions,
  demoFinancialData,
  demoRetirementData,
  getDemoMissionData,
  getCompletedMissions,
  getDemoMissionStats
} from './utils/demoData';
```

### 2. Updated App.tsx ✅
**File**: `/App.tsx`

**Changes made**:
- Updated demoProfile with Sergeant Martinez's data
- Updated demoRetirementData with realistic values
- XP: 850 (Level 2, not Level 3)
- Completed missions: 4 (not 5)
- Years of service: 12 (not 8)

---

## 📋 Phase 2: Enhanced Mission Display (NEXT STEPS)

### Task 1: Update MissionsScreen Component

**File**: `/components/MissionsScreen.tsx`

**Objectives**:
1. Show mission completion status from demo data
2. Display completion dates for finished missions
3. Show star ratings (1-5 stars)
4. Add progress indicators for in-progress missions
5. Display XP earned for each mission

**Example implementation**:
```typescript
import { getDemoMissionData } from '../utils/demoData';

// In MissionsScreen component
const missionData = getDemoMissionData(mission.id);

if (missionData) {
  return (
    <MissionCard>
      {missionData.status === 'completed' && (
        <CompletionBadge 
          stars={missionData.stars}
          date={missionData.completedDate}
          xp={missionData.xp}
        />
      )}
      {missionData.status === 'in-progress' && (
        <ProgressIndicator progress={missionData.progress} />
      )}
    </MissionCard>
  );
}
```

### Task 2: Create Mission Detail Modal

**New file**: `/components/MissionDetailModal.tsx`

**Purpose**: Show comprehensive mission information

**Features**:
- Mission status and completion date
- Star rating display
- Achievements list
- Impact statement
- Sergeant Martinez quote
- Current status
- "View Calculator Data" button

**Props**:
```typescript
interface MissionDetailModalProps {
  missionId: string;
  isOpen: boolean;
  onClose: () => void;
  onViewCalculator: () => void;
}
```

---

## 🧮 Phase 3: Calculator Pre-Population

### Task 1: Update RetirementCalculator

**File**: `/components/RetirementCalculator.tsx`

**Add demo mode detection**:
```typescript
import { getDemoMissionData } from '../utils/demoData';

function RetirementCalculator({ onBack, onCompleteMission, retirementData, isDemo }) {
  const [showDemoNotice, setShowDemoNotice] = useState(isDemo);
  const demoData = isDemo ? getDemoMissionData('retirement-planning') : null;
  
  // Pre-populate with demo data if available
  const initialData = isDemo && demoData 
    ? demoData.calculatorData 
    : retirementData;
    
  return (
    <>
      {showDemoNotice && (
        <DemoDataNotice
          missionName="Retirement Planning"
          status="In Progress (65%)"
          onViewResults={() => {/* Show pre-filled calculator */}}
          onStartFresh={() => {/* Clear and start blank */}}
        />
      )}
      {/* Rest of calculator */}
    </>
  );
}
```

### Task 2: Create DemoDataNotice Component

**New file**: `/components/DemoDataNotice.tsx`

**Purpose**: Alert users about pre-populated data

```typescript
export function DemoDataNotice({ 
  missionName, 
  status, 
  onViewResults, 
  onStartFresh 
}: Props) {
  return (
    <Alert className="mb-4 border-primary/20 bg-primary/5">
      <Sparkles className="h-4 w-4" />
      <AlertTitle>Demo Mode - {missionName}</AlertTitle>
      <AlertDescription>
        This calculator is pre-filled with Staff Sergeant Martinez's actual data.
        Status: {status}
        
        <div className="flex gap-2 mt-3">
          <Button onClick={onViewResults} size="sm">
            View His Results
          </Button>
          <Button onClick={onStartFresh} variant="outline" size="sm">
            Start Fresh
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
}
```

### Task 3: Update EmergencyFundMission

**File**: `/components/EmergencyFundMission.tsx`

**Changes**:
```typescript
import { getDemoMissionData } from '../utils/demoData';

// Add isDemo prop
function EmergencyFundMission({ onBack, userContext, onComplete, isDemo }) {
  const demoData = isDemo ? getDemoMissionData('emergency-fund') : null;
  
  if (isDemo && demoData) {
    // Show completion badge
    return (
      <>
        <CompletionBanner
          status="✅ Completed 8 years ago"
          stars={demoData.stars}
          xp={demoData.xp}
          impact={demoData.impact}
          quote={demoData.quote}
        />
        {/* Show calculator with data */}
      </>
    );
  }
  
  // Normal flow for non-demo users
}
```

### Task 4: Update TSPMission

**File**: `/components/TSPMission.tsx`

Similar approach - show completion status and pre-fill calculator

### Task 5: Update InvestmentMission

**File**: `/components/InvestmentMission.tsx`

Similar approach - show completion status and pre-fill calculator

### Task 6: Update FinancialEducationMission

**File**: `/components/FinancialEducationMission.tsx`

Show all 12 modules completed with scores

---

## 🎨 Phase 4: Visual Enhancements

### Task 1: Create CompletionBadge Component

**New file**: `/components/ui/CompletionBadge.tsx`

```typescript
export function CompletionBadge({ 
  stars, 
  date, 
  xp 
}: Props) {
  return (
    <div className="flex items-center gap-3 p-4 bg-success/10 border border-success/20 rounded-lg">
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < stars 
                ? 'fill-yellow-400 text-yellow-400' 
                : 'text-muted-foreground'
            }`}
          />
        ))}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-success" />
          <span className="font-medium text-success">Completed</span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
      </div>
      <Badge className="bg-primary">+{xp} XP</Badge>
    </div>
  );
}
```

### Task 2: Create ProgressRing Component

**New file**: `/components/ui/ProgressRing.tsx`

For in-progress missions:
```typescript
export function ProgressRing({ progress }: { progress: number }) {
  return (
    <div className="relative w-16 h-16">
      <svg className="w-16 h-16 transform -rotate-90">
        <circle
          cx="32"
          cy="32"
          r="28"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
          className="text-muted"
        />
        <circle
          cx="32"
          cy="32"
          r="28"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
          strokeDasharray={`${2 * Math.PI * 28}`}
          strokeDashoffset={`${2 * Math.PI * 28 * (1 - progress / 100)}`}
          className="text-primary transition-all duration-500"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-semibold">{progress}%</span>
      </div>
    </div>
  );
}
```

### Task 3: Update Dashboard Mission Cards

**File**: `/components/Dashboard.tsx`

**Add visual indicators**:
```typescript
import { getDemoMissionData } from '../utils/demoData';

// In mission map
missions.map(mission => {
  const demoData = isDemo ? getDemoMissionData(mission.id) : null;
  
  return (
    <Card key={mission.id}>
      {/* Mission header */}
      
      {demoData?.status === 'completed' && (
        <div className="absolute top-2 right-2">
          <Badge className="bg-success">
            <CheckCircle className="w-3 h-3 mr-1" />
            Completed
          </Badge>
        </div>
      )}
      
      {demoData?.status === 'in-progress' && (
        <div className="absolute top-2 right-2">
          <ProgressRing progress={demoData.progress} />
        </div>
      )}
      
      {/* Rest of card */}
    </Card>
  );
});
```

---

## 💾 Phase 5: Data Persistence

### Task 1: Save Demo State to localStorage

**Add to demo initialization**:
```typescript
// When entering demo mode
function initializeDemoMode() {
  localStorage.setItem('demo-mode-active', 'true');
  localStorage.setItem('demo-user-profile', JSON.stringify(demoUserProfile));
  localStorage.setItem('demo-missions', JSON.stringify(demoMissions));
  localStorage.setItem('demo-financial', JSON.stringify(demoFinancialData));
}
```

### Task 2: Load Demo State on Refresh

**In useUserData hook**:
```typescript
function loadDemoData() {
  const savedProfile = localStorage.getItem('demo-user-profile');
  const savedMissions = localStorage.getItem('demo-missions');
  
  if (savedProfile) {
    return JSON.parse(savedProfile);
  }
  
  return demoUserProfile; // Fallback to default
}
```

---

## 📊 Phase 6: Demo Mode Banner

### Task 1: Create Enhanced Demo Banner

**File**: `/components/DemoModeBanner.tsx` (new)

```typescript
export function DemoModeBanner({ visible }: { visible: boolean }) {
  if (!visible) return null;
  
  return (
    <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">Demo Mode</span>
              <span className="text-sm opacity-90">•</span>
              <span className="text-sm">SSG Marcus Martinez's Account</span>
            </div>
            <p className="text-xs opacity-90">
              Explore all features with realistic military financial data
            </p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="secondary" 
            size="sm"
            onClick={() => {/* Navigate to auth */}}
          >
            Create Your Account
          </Button>
        </div>
      </div>
    </div>
  );
}
```

### Task 2: Add Banner to App Layout

**In App.tsx**:
```typescript
import { DemoModeBanner } from './components/DemoModeBanner';

// In render
<>
  <DemoModeBanner visible={auth.isDemo} />
  {/* Rest of app */}
</>
```

---

## 🎯 Phase 7: Profile Card Enhancement

### Task 1: Create Sergeant Martinez Profile Card

**File**: `/components/SergeantMartinezProfile.tsx` (new)

```typescript
export function SergeantMartinezProfile() {
  const { level, progress } = calculateLevel(850);
  const stats = getDemoMissionStats();
  
  return (
    <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xl font-bold">
            MM
          </div>
          
          <div className="flex-1">
            <h3 className="font-semibold">Marcus Martinez</h3>
            <p className="text-sm text-muted-foreground">Staff Sergeant (E-6)</p>
            
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium">Level {level}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                {stats.completed}/{stats.total} Missions
              </div>
              <div className="text-sm text-muted-foreground">
                12 Years
              </div>
            </div>
            
            <Progress value={progress} className="mt-2 h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              850 XP • 150 XP to Level 3
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
```

### Task 2: Add to Dashboard

Show profile card at top of dashboard in demo mode

---

## 🧪 Testing Checklist

### Demo Mode Entry
- [ ] "Try Demo Mode" button works
- [ ] Demo banner appears
- [ ] Profile shows correct data (SSG Martinez)
- [ ] XP shows 850
- [ ] Level shows 2

### Mission Display
- [ ] Emergency Fund shows completed
- [ ] Investment Basics shows completed
- [ ] TSP Optimization shows completed
- [ ] Financial Education shows completed
- [ ] Retirement Planning shows 65% progress

### Calculator Pre-population
- [ ] Retirement calculator pre-fills correctly
- [ ] Emergency fund calculator shows data
- [ ] TSP calculator shows optimized allocation
- [ ] Investment calculator shows portfolio

### Visual Elements
- [ ] Completion badges show correct stars
- [ ] Progress rings animate smoothly
- [ ] XP values display correctly
- [ ] Dates format properly

### Data Persistence
- [ ] Demo state persists on refresh
- [ ] Can navigate between screens
- [ ] Data remains consistent
- [ ] Exit demo mode clears data

---

## 📝 Implementation Priority

### HIGH PRIORITY (Do First)
1. ✅ Create demo data provider
2. ✅ Update App.tsx with new demo data
3. Create DemoModeBanner component
4. Add demo data to Dashboard mission cards
5. Create CompletionBadge component

### MEDIUM PRIORITY (Do Next)
1. Create DemoDataNotice component
2. Update RetirementCalculator with pre-population
3. Create MissionDetailModal
4. Update MissionsScreen with status indicators
5. Create ProgressRing component

### LOW PRIORITY (Nice to Have)
1. Create SergeantMartinezProfile card
2. Add mission completion timeline
3. Add "Compare to SSG Martinez" feature
4. Create achievement gallery
5. Add mission replay capability

---

## 🚀 Rollout Strategy

### Week 1: Foundation
- Implement demo data provider ✅
- Update App.tsx ✅
- Create demo banner
- Add basic status indicators

### Week 2: Calculators
- Pre-populate retirement calculator
- Pre-populate emergency fund calculator
- Add DemoDataNotice component
- Test all calculator flows

### Week 3: Polish
- Add visual enhancements
- Create mission details modal
- Implement profile card
- Comprehensive testing

### Week 4: Launch
- Final QA
- User testing
- Documentation
- Deploy to production

---

## 📚 Documentation Needs

### For Users
- "About Demo Mode" help article
- "Meet Sergeant Martinez" profile page
- Calculator pre-population explanation
- Demo mode vs real account comparison

### For Developers
- Demo data structure documentation ✅
- Component integration guide
- Testing procedures
- Maintenance guidelines

---

## ✅ Success Criteria

### User Experience
- Users understand they're viewing demo data
- Calculator pre-population is clear
- Mission completion status is obvious
- Demo mode value is apparent

### Technical
- No performance degradation
- Data consistency maintained
- Smooth transitions
- No breaking changes

### Business
- Increased demo mode engagement
- Higher conversion to signup
- Positive user feedback
- Clear understanding of features

---

**Status**: Phase 1 Complete, Phase 2 Ready to Start  
**Last Updated**: October 2025  
**Implementation Owner**: Full Development Team
