# Data Collection - Quick Reference Card

One-page reference for the Major Finance data collection system.

---

## 🚀 What Data is Collected?

| Category | Stored At | Auto-Save? |
|----------|-----------|------------|
| Profile | `profile:{userId}` | ✅ On submit |
| Progress/XP | `progress:{userId}` | ✅ On mission complete |
| Missions | `progress:{userId}.completedMissionsList` | ✅ On complete |
| Retirement Plan | `retirement:{userId}` | ✅ On save |
| Calculator State | `calculator:{userId}:{type}` | ✅ Debounced |
| Banking/Accounts | `accounts:{userId}` | ✅ On save |
| Mission Forms | `mission:{userId}:{missionId}` | ✅ Auto-save |
| Settings | `settings:{userId}` | ✅ On change |
| Reminders | `reminder:{userId}:{type}` | ✅ On set |

---

## 📡 API Endpoints Quick List

```bash
# Authentication
POST /signup                  # Create account
POST /login                   # Sign in (handled by Supabase)

# Profile
POST /profile                 # Save profile
GET  /profile                 # Load profile

# Progress
POST /progress                # Update XP/missions
GET  /progress                # Get progress

# Retirement
POST /retirement-plan         # Save plan
GET  /retirement-plan         # Load plan

# Calculators
POST /calculator-state        # Save state
GET  /calculator-state/:type  # Load state

# Mission Data
POST /mission-data            # Save form
GET  /mission-data/:missionId # Load form

# Settings
POST /settings                # Update settings
GET  /settings                # Get settings

# Utilities
GET  /user-data               # Export all data
GET  /health                  # Health check
```

---

## 🔐 Authentication

```typescript
// Headers for all API calls
{
  "Authorization": "Bearer {accessToken}",
  "Content-Type": "application/json"
}

// Demo mode
accessToken === 'demo-token-offline-mode'  // Offline, no backend calls

// Real mode
accessToken === 'eyJ...'  // JWT from Supabase
```

---

## 💾 Mission Completion Flow

```typescript
// 1. Check if already completed
const isCompleted = completedMissionsList?.includes('emergency-fund');

// 2. Award XP only if first time
const xp = isCompleted ? 0 : 150;

// 3. Update completedMissionsList
const newList = isCompleted 
  ? completedMissionsList 
  : [...completedMissionsList, 'emergency-fund'];

// 4. Save to backend
POST /progress
{
  xp: currentXP + xp,
  completedMissions: isCompleted ? count : count + 1,
  completedMissionsList: newList,
  missionId: 'emergency-fund'
}
```

---

## 🎯 Mission IDs

```
emergency-fund
investment-basics
tsp-optimization
budget-creation
financial-education
debt-management
va-benefits
```

---

## 🧪 Quick Test Commands

```bash
# Check health
curl https://YOUR_PROJECT.supabase.co/functions/v1/make-server-03c1d5b1/health

# Get user data (need token)
curl -H "Authorization: Bearer TOKEN" \
  https://YOUR_PROJECT.supabase.co/functions/v1/make-server-03c1d5b1/user-data

# View database
# Go to: https://supabase.com/dashboard/project/YOUR_ID/database/tables
```

---

## 🔄 Data Flow Diagram

```
User Action
    ↓
Component
    ↓
Custom Hook (useUserData, useMissions)
    ↓
API Client (utils/api.ts)
    ↓
Check: Demo Mode?
    ↓
Yes → Store in memory    No → POST to Supabase
                              ↓
                         Edge Function (server/index.tsx)
                              ↓
                         KV Store (kv_store_03c1d5b1)
                              ↓
                         Success Response
                              ↓
                         Update Local State
```

---

## 🎮 Demo vs Real Mode

| Feature | Demo Mode | Real Mode |
|---------|-----------|-----------|
| Token | `'demo-token-offline-mode'` | JWT string |
| Storage | In-memory | Supabase KV |
| Offline | ✅ Works | ❌ Requires connection |
| Persist | ❌ Lost on refresh | ✅ Persists forever |
| Pre-filled | ✅ SSG Martinez | ❌ Empty |
| API Calls | ❌ None | ✅ All endpoints |

---

## 🛠️ Common Code Patterns

### Save Data:
```typescript
if (accessToken !== 'demo-token-offline-mode') {
  await apiClient.post('/endpoint', data, accessToken);
}
```

### Load Data:
```typescript
if (accessToken === 'demo-token-offline-mode') {
  setData(demoData);
} else {
  const response = await apiClient.get('/endpoint', accessToken);
  setData(response.data || defaultData);
}
```

### Check Completion:
```typescript
const isCompleted = userData.completedMissionsList?.includes(missionId);
```

---

## 📊 Sample Data Structures

### Progress:
```json
{
  "xp": 850,
  "completedMissions": 3,
  "completedMissionsList": ["emergency-fund", "investment-basics", "tsp-optimization"],
  "missions": [
    {"id": "emergency-fund", "completedAt": "2025-10-15T12:00:00Z"}
  ],
  "updatedAt": "2025-10-15T12:00:00Z"
}
```

### Profile:
```json
{
  "name": "Marcus Martinez",
  "rank": "Staff Sergeant (E-6)",
  "branch": "army",
  "yearsOfService": "12",
  "currentAge": "34",
  "desiredRetirementAge": "42",
  "retirementGoal": "Financial independence"
}
```

---

## 🚨 Troubleshooting

| Problem | Solution |
|---------|----------|
| Data not saving | Check auth token, network tab, Edge Function logs |
| Duplicate XP | Verify completedMissionsList logic in useMissions.ts |
| Demo data in real account | Sign out properly, clear cookies |
| 401 Unauthorized | Token expired, re-authenticate |
| Mission not showing completed | Check completedMissionsList includes mission ID |

---

## 📝 Files to Know

```
Backend:
/supabase/functions/server/index.tsx  → All API endpoints
/supabase/functions/server/kv_store.tsx  → Database operations

Frontend:
/hooks/useAuth.ts          → Authentication
/hooks/useUserData.ts      → Profile & data management
/hooks/useMissions.ts      → Mission completion logic
/utils/api.ts              → API client
/utils/demoData.ts         → Demo mode data

Components:
All mission files           → Completion status UI
/components/MissionsScreen.tsx  → Mission list
/App.tsx                   → Main app, handles mission completion
```

---

## 🎯 Key Points to Remember

1. **Always check for demo mode** before making API calls
2. **completedMissionsList prevents duplicate XP**
3. **All user data isolated by userId**
4. **KV store uses colon-separated keys**
5. **Demo mode works completely offline**
6. **Real mode requires authentication**
7. **All endpoints return JSON**
8. **Errors are logged but don't crash app**
9. **Data export available via /user-data**
10. **Session persists across page refreshes**

---

## 📚 Full Documentation

- **DATA_COLLECTION_SYSTEM.md** - Complete system documentation
- **DEVELOPER_DATA_GUIDE.md** - How to add new features
- **DATA_COLLECTION_TESTING_GUIDE.md** - Testing procedures
- **DATA_COLLECTION_IMPLEMENTATION_SUMMARY.md** - What was built

---

## 🔢 By The Numbers

- **18** Total API endpoints
- **9** Data categories collected
- **7** Mission types tracked
- **2** Operation modes (demo/real)
- **100%** Data persistence
- **0** XP on mission replay

---

## 🎨 Visual Indicators

```
✅ Green checkmark → Mission completed
🟢 "Completed" badge → In header
🔲 "Review Mission" button → Not "Start Mission"
🎨 Green border/tint → On completed mission card
✓ Checkmark next to XP → Already earned
📋 Info notice → "Already completed" message
```

---

**Quick Access URLs:**

- Supabase Dashboard: `https://supabase.com/dashboard/project/{YOUR_ID}`
- Edge Functions: `.../project/{YOUR_ID}/functions`
- Database Tables: `.../project/{YOUR_ID}/database/tables`
- Auth Users: `.../project/{YOUR_ID}/auth/users`

---

**Last Updated:** October 15, 2025 | **Version:** 1.0.0
