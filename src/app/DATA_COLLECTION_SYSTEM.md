# Data Collection System - Major Finance App

## Overview

The Major Finance app now has a comprehensive data collection and persistence system powered by Supabase. All user data is automatically saved to the backend and synced across sessions.

---

## ✅ Data Categories Collected

### 1. **Account & Authentication**
- User email and password (hashed)
- User ID (UUID)
- Sign-up timestamp
- Session tokens
- Authentication state

### 2. **Profile Information**
Stored at: `profile:{userId}`
```typescript
{
  name: string;
  rank: string;                    // e.g., "Staff Sergeant (E-6)"
  branch: string;                  // army, navy, airforce, marines, coastguard, spaceforce, joint
  yearsOfService: string;
  currentAge: string;
  desiredRetirementAge: string;
  retirementGoal: string;
  completedMissionsList?: string[]; // Tracks individual mission completions
}
```

### 3. **Progress & Achievements**
Stored at: `progress:{userId}`
```typescript
{
  xp: number;                       // Total experience points
  completedMissions: number;        // Count of completed missions
  completedMissionsList: string[];  // Array of mission IDs (e.g., ["emergency-fund", "tsp-optimization"])
  missions: Array<{                 // Detailed mission history
    id: string;
    completedAt: string;            // ISO timestamp
  }>;
  updatedAt: string;
}
```

### 4. **Retirement Planning**
Stored at: `retirement:{userId}`
```typescript
{
  currentSavings: string;
  monthlyContribution: string;
  expectedReturn: string;
  retirementAge: string;
  currentAge: string;
  militaryPension: string;
  socialSecurityAge: string;
  updatedAt: string;
}
```

### 5. **Calculator States**
Stored at: `calculator:{userId}:{calculatorType}`

Calculator types include:
- `emergency-fund`
- `tsp`
- `investment`
- `debt`
- `budget`

Each stores its specific form state for persistence.

### 6. **Banking & Accounts**
Stored at: `accounts:{userId}`
```typescript
{
  accounts: Array<{
    id: string;
    name: string;
    type: string;
    balance: number;
    institution: string;
  }>;
  updatedAt: string;
}
```

### 7. **Mission-Specific Data**
Stored at: `mission:{userId}:{missionId}`

Preserves form data for each mission so users can resume where they left off.

### 8. **User Settings & Preferences**
Stored at: `settings:{userId}`
```typescript
{
  theme: 'light' | 'dark';
  branch: string;
  notifications: boolean;
  language: string;
  updatedAt: string;
}
```

### 9. **Reminders**
Stored at: `reminder:{userId}:{type}`
```typescript
{
  type: string;                     // e.g., "retirement-checkin"
  frequency: string;                // e.g., "monthly"
  nextDate: string;                 // ISO timestamp
  active: boolean;
  createdAt: string;
}
```

---

## 🔌 API Endpoints

### Authentication
```
POST /make-server-03c1d5b1/signup
Body: { email, password, name }
Returns: { user }
```

### Profile
```
POST /make-server-03c1d5b1/profile
GET  /make-server-03c1d5b1/profile
Body: { rank, yearsOfService, retirementGoal, ... }
```

### Progress
```
POST /make-server-03c1d5b1/progress
GET  /make-server-03c1d5b1/progress
Body: { xp, completedMissions, completedMissionsList, missionId }
```

### Retirement Plan
```
POST /make-server-03c1d5b1/retirement-plan
GET  /make-server-03c1d5b1/retirement-plan
Body: { currentSavings, monthlyContribution, ... }
```

### Calculator State
```
POST /make-server-03c1d5b1/calculator-state
GET  /make-server-03c1d5b1/calculator-state/:type
Body: { calculatorType, state }
```

### Banking/Accounts
```
POST /make-server-03c1d5b1/accounts
GET  /make-server-03c1d5b1/accounts
Body: { accounts: [...] }
```

### Mission Data
```
POST /make-server-03c1d5b1/mission-data
GET  /make-server-03c1d5b1/mission-data/:missionId
Body: { missionId, data }
```

### Settings
```
POST /make-server-03c1d5b1/settings
GET  /make-server-03c1d5b1/settings
Body: { theme, notifications, ... }
```

### Reminders
```
POST /make-server-03c1d5b1/reminders
GET  /make-server-03c1d5b1/reminders
Body: { type, frequency, nextDate }
```

### User Data Export
```
GET /make-server-03c1d5b1/user-data
Returns: Complete user data dump for backup/export
```

### Health Check
```
GET /make-server-03c1d5b1/health
Returns: { status: 'ok', timestamp }
```

---

## 🔐 Security & Privacy

### Data Protection
- All API calls require authentication via Bearer token
- User ID extracted from JWT token server-side
- No PII in client-side storage
- Passwords hashed with bcrypt
- Session tokens auto-refresh

### Access Control
- Users can only access their own data
- Unauthorized requests return 401
- Service role key used only server-side
- CORS enabled for security

### Data Ownership
- Users own all their data
- Export endpoint available for data portability
- No cross-user data sharing

---

## 🔄 Data Flow

### On Sign Up:
1. User creates account → `POST /signup`
2. User completes onboarding → `POST /profile`
3. Initial progress created → `POST /progress` (100 XP welcome bonus)

### During Mission:
1. User starts mission → Form data loaded from `GET /mission-data/:missionId`
2. User fills out form → Auto-save to `POST /mission-data`
3. User completes mission → `POST /progress` (XP + completedMissionsList updated)

### On Calculator Use:
1. User opens calculator → State loaded from `GET /calculator-state/:type`
2. User inputs data → Auto-save to `POST /calculator-state`
3. Results stored for future reference

### On App Load:
1. Check session → `supabase.auth.getSession()`
2. If authenticated → Load all user data:
   - Profile data
   - Progress data
   - Retirement plan
   - Settings

---

## 🎯 Demo Mode vs Real Mode

### Demo Mode (Offline)
- Access token: `'demo-token-offline-mode'`
- Data stored in memory only
- Pre-populated with SSG Martinez data
- No backend calls made
- Data lost on refresh

### Real Mode (Connected)
- Access token: JWT from Supabase Auth
- All data persisted to Supabase KV store
- Data synced across devices
- Survives refresh/logout/login

---

## 📊 Data Storage Architecture

### KV Store Structure
```
kv_store_03c1d5b1
├── profile:{userId}              → User profile
├── progress:{userId}             → XP & missions
├── retirement:{userId}           → Retirement plan
├── accounts:{userId}             → Banking data
├── settings:{userId}             → Preferences
├── calculator:{userId}:{type}    → Calculator states
├── mission:{userId}:{missionId}  → Mission form data
└── reminder:{userId}:{type}      → Notification prefs
```

### Benefits of KV Store:
- ✅ Simple key-value pairs
- ✅ Fast read/write operations
- ✅ Flexible JSON storage
- ✅ Easy to query by prefix
- ✅ Automatic upserts

---

## 🚀 Usage Examples

### Saving Progress After Mission:
```typescript
await apiClient.post('/progress', {
  xp: 450,
  completedMissions: 3,
  completedMissionsList: ['emergency-fund', 'investment-basics', 'tsp-optimization'],
  missionId: 'tsp-optimization'
}, accessToken);
```

### Loading Calculator State:
```typescript
const response = await apiClient.get('/calculator-state/emergency-fund', accessToken);
const savedState = response.state;
```

### Exporting All User Data:
```typescript
const response = await apiClient.get('/user-data', accessToken);
// Returns all user data for backup
```

---

## 🛡️ Error Handling

### Graceful Degradation:
- Backend errors don't crash the app
- Failed saves logged but user continues
- Demo mode automatically enabled if connection fails
- Clear error messages for users

### Retry Logic:
- Failed requests logged for debugging
- Optimistic UI updates
- Background sync where appropriate

---

## 📈 Future Enhancements

### Planned Features:
- [ ] Real-time sync across devices
- [ ] Batch operations for performance
- [ ] Data encryption at rest
- [ ] Audit logging for compliance
- [ ] Automated backups
- [ ] Data retention policies
- [ ] GDPR compliance tools
- [ ] Multi-factor authentication

---

## 🔧 Development & Testing

### Testing Data Collection:
1. Create test account
2. Complete onboarding
3. Check Supabase dashboard for stored data
4. Complete a mission
5. Verify progress updated
6. Log out and log back in
7. Confirm data persisted

### Supabase Dashboard:
- View data: https://supabase.com/dashboard/project/{projectId}/database/tables
- Monitor API calls in Edge Functions logs
- Check auth users in Authentication tab

---

## 📝 Notes

- All timestamps in ISO 8601 format
- User IDs are UUIDs from Supabase Auth
- Mission IDs use kebab-case (e.g., 'emergency-fund')
- XP values are integers
- Completed missions tracked both as count and list for flexibility

---

**Last Updated:** October 15, 2025  
**Version:** 1.0.0
