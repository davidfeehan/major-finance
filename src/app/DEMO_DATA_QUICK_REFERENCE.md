# Demo Data Quick Reference

## 🚀 Quick Start

### Import Demo Data
```typescript
import {
  demoUserProfile,
  demoMissions,
  demoFinancialData,
  getDemoMissionData,
  getCompletedMissions,
  getDemoMissionStats
} from './utils/demoData';
```

### Get Mission Data
```typescript
// Get specific mission
const emergencyFundData = getDemoMissionData('emergency-fund');

// Get all completed missions
const completed = getCompletedMissions();

// Get mission stats
const stats = getDemoMissionStats();
// Returns: { completed: 4, inProgress: 1, total: 5, totalXP: 850, completionRate: 80 }
```

---

## 👤 SSG Martinez - At a Glance

```
Name: Marcus Martinez
Rank: Staff Sergeant (E-6)
Branch: Army
Age: 34
Years of Service: 12
XP: 850 (Level 2)
Missions: 4 completed, 1 in progress
```

---

## 🎯 Mission Status

```
Mission                    Status          XP    Stars   Date
─────────────────────────────────────────────────────────────
Emergency Fund            ✅ Completed    150   ⭐⭐⭐   2016-03-15
Investment Basics         ✅ Completed    200   ⭐⭐⭐   2019-08-22
TSP Optimization          ✅ Completed    300   ⭐⭐⭐⭐ 2021-11-10
Financial Education       ✅ Completed    200   ⭐⭐⭐⭐⭐ 2023-09-05
Retirement Planning       🔄 In Progress  250   TBD     65% done
```

---

## 💰 Financial Snapshot

```typescript
{
  checking: $8,450
  emergencyFund: $18,000
  goalFund: $5,200
  tsp: $128,450
  investments: $45,300
  netWorth: $61,400
}
```

---

## 🧮 Calculator Data Keys

### Retirement Planning
```typescript
demoMissions['retirement-planning'].calculatorData = {
  currentAge: 34,
  retirementAge: 42,
  currentSavings: 128450,
  monthlyContribution: 1152,
  militaryPension: 2520,
  vaDisability: 524,
  // ... full data available
}
```

### Emergency Fund
```typescript
demoMissions['emergency-fund'].calculatorData = {
  monthlyExpenses: 4200,
  targetMonths: 6,
  targetAmount: 25200,
  currentSavings: 18000,
  percentComplete: 71.4
}
```

### TSP Optimization
```typescript
demoMissions['tsp-optimization'].calculatorData = {
  currentBalance: 128450,
  currentContribution: 15,
  governmentMatch: 210,
  fundAllocation: {
    cFund: 60,
    sFund: 30,
    iFund: 10
  },
  projectedAt60: 845000
}
```

### Investment Basics
```typescript
demoMissions['investment-basics'].calculatorData = {
  totalInvestments: 45300,
  assetAllocation: {
    stocks: 70,
    bonds: 25,
    cash: 5
  },
  performance: {
    ytdReturn: 8.4,
    sinceInception: 11.2
  }
}
```

---

## 🎨 UI Component Patterns

### Show Completion Badge
```tsx
import { getDemoMissionData } from '../utils/demoData';

const missionData = getDemoMissionData('emergency-fund');

{missionData?.status === 'completed' && (
  <CompletionBadge
    stars={missionData.stars}
    date={missionData.completedDate}
    xp={missionData.xp}
  />
)}
```

### Show Progress Indicator
```tsx
{missionData?.status === 'in-progress' && (
  <ProgressRing progress={missionData.progress} />
)}
```

### Pre-populate Calculator
```tsx
const demoData = isDemo 
  ? getDemoMissionData('retirement-planning') 
  : null;

const initialValues = demoData?.calculatorData || {};
```

---

## 📝 Mission IDs

```typescript
'emergency-fund'
'investment-basics'
'tsp-optimization'
'financial-education'
'retirement-planning'
```

---

## 🎯 Achievement Highlights

### Emergency Fund
- Built $18K fund
- Maintained 8+ years
- Used during deployments

### TSP Optimization
- $128K balance
- On track for $845K
- Optimization score: 92/100

### Financial Education
- All 12 modules complete
- Mentoring 8 soldiers
- Unit Financial Champion 2024

---

## 💡 Usage Examples

### Check if Demo Mode
```typescript
const isDemo = auth.isDemo;
```

### Get Current Mission Status
```typescript
function getMissionStatus(missionId: string) {
  const data = getDemoMissionData(missionId);
  return data?.status || 'available';
}
```

### Calculate Level
```typescript
import { calculateLevel } from './utils/demoData';

const { level, xpForNext, progress } = calculateLevel(850);
// Returns: { level: 2, xpForNext: 150, progress: 70 }
```

### Format XP Display
```typescript
const stats = getDemoMissionStats();
console.log(`${stats.totalXP} XP • Level ${level}`);
// Output: "850 XP • Level 2"
```

---

## 🔍 Debugging

### Log Demo Data
```typescript
import { allDemoData } from './utils/demoData';
console.log('Demo Data:', allDemoData);
```

### Verify Mission Data
```typescript
Object.keys(demoMissions).forEach(id => {
  const mission = demoMissions[id];
  console.log(`${id}: ${mission.status} - ${mission.xp} XP`);
});
```

---

## ⚡ Common Patterns

### Show Demo Notice
```tsx
{isDemo && (
  <Alert className="mb-4 border-primary/20 bg-primary/5">
    <Sparkles className="h-4 w-4" />
    <AlertTitle>Demo Mode</AlertTitle>
    <AlertDescription>
      Viewing Staff Sergeant Martinez's account
    </AlertDescription>
  </Alert>
)}
```

### Conditional Pre-fill
```tsx
const [formData, setFormData] = useState(() => {
  if (isDemo) {
    const missionData = getDemoMissionData(missionId);
    return missionData?.calculatorData || {};
  }
  return {};
});
```

### Show Mission Quote
```tsx
{missionData?.quote && (
  <blockquote className="border-l-4 border-primary pl-4 italic">
    "{missionData.quote}"
  </blockquote>
)}
```

---

## 📊 Data Structure Reference

```typescript
interface DemoMissionData {
  id: string;
  status: 'completed' | 'in-progress' | 'locked';
  completedDate?: string;        // ISO date
  startedDate?: string;          // ISO date  
  progress?: number;             // 0-100
  xp: number;                    // XP points
  stars?: number;                // 1-5
  calculatorData: any;           // Mission-specific data
  achievements: string[];        // List of achievements
  impact: string;                // Impact statement
  quote?: string;                // SSG Martinez quote
}
```

---

## 🎨 Star Rating Display

```tsx
function StarRating({ stars }: { stars: number }) {
  return (
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
  );
}
```

---

## 🔗 Related Files

```
Strategy:       /DEMO_MODE_STRATEGY.md
Implementation: /DEMO_MODE_IMPLEMENTATION.md
Summary:        /DEMO_MODE_COMPLETE.md
Data Provider:  /utils/demoData.ts
App Config:     /App.tsx (lines 43-67)
```

---

## ✅ Quick Checklist

When implementing demo features:
- [ ] Import demo data utilities
- [ ] Check `isDemo` flag
- [ ] Get mission data with `getDemoMissionData()`
- [ ] Show completion badges for completed missions
- [ ] Show progress for in-progress missions
- [ ] Pre-populate calculators with mission data
- [ ] Display SSG Martinez quotes
- [ ] Show achievement highlights
- [ ] Test with demo mode active

---

**Quick Reference Version**: 1.0  
**Last Updated**: October 2025  
**Print**: Keep near your keyboard!
