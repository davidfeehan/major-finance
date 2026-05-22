# Developer Guide: Adding Data Collection

Quick reference for adding new data collection endpoints and features to Major Finance.

---

## 🚀 Quick Start: Add New Data Type

### Step 1: Add Server Endpoint

Edit `/supabase/functions/server/index.tsx`:

```typescript
// Save new data type
app.post('/make-server-03c1d5b1/your-data-type', async (c) => {
  try {
    const userId = await getUserId(c.req.raw);
    if (!userId) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const data = await c.req.json();
    const savedData = {
      ...data,
      updatedAt: new Date().toISOString()
    };
    
    await kv.set(`your-data-type:${userId}`, savedData);
    return c.json({ success: true });
  } catch (error) {
    console.log('Save error:', error);
    return c.json({ error: 'Failed to save data' }, 500);
  }
});

// Get new data type
app.get('/make-server-03c1d5b1/your-data-type', async (c) => {
  try {
    const userId = await getUserId(c.req.raw);
    if (!userId) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const data = await kv.get(`your-data-type:${userId}`);
    return c.json({ data });
  } catch (error) {
    console.log('Fetch error:', error);
    return c.json({ error: 'Failed to fetch data' }, 500);
  }
});
```

### Step 2: Use in Your Component

```typescript
import apiClient from '../utils/api';
import { useAuth } from '../hooks/useAuth';

function YourComponent() {
  const { accessToken } = useAuth();
  
  // Save data
  const saveData = async (data: any) => {
    try {
      await apiClient.post('/your-data-type', data, accessToken);
      console.log('Data saved successfully');
    } catch (error) {
      console.error('Failed to save:', error);
    }
  };
  
  // Load data
  const loadData = async () => {
    try {
      const response = await apiClient.get('/your-data-type', accessToken);
      return response.data;
    } catch (error) {
      console.error('Failed to load:', error);
      return null;
    }
  };
  
  return <div>Your component</div>;
}
```

---

## 🎯 Common Patterns

### Pattern 1: Auto-Save Form State

```typescript
function MissionForm() {
  const { accessToken } = useAuth();
  const [formData, setFormData] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  
  // Debounced auto-save
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (accessToken !== 'demo-token-offline-mode') {
        setIsSaving(true);
        try {
          await apiClient.post('/mission-data', {
            missionId: 'your-mission-id',
            data: formData
          }, accessToken);
        } catch (error) {
          console.error('Auto-save failed:', error);
        } finally {
          setIsSaving(false);
        }
      }
    }, 1000); // Save 1 second after user stops typing
    
    return () => clearTimeout(timeoutId);
  }, [formData, accessToken]);
  
  return (
    <form>
      {isSaving && <span>Saving...</span>}
      {/* Form fields */}
    </form>
  );
}
```

### Pattern 2: Optimistic Updates

```typescript
async function updateWithOptimisticUI(newData: any) {
  // Update UI immediately
  setLocalData(newData);
  
  try {
    // Save to backend
    await apiClient.post('/your-endpoint', newData, accessToken);
  } catch (error) {
    // Revert on failure
    setLocalData(previousData);
    toast.error('Failed to save. Please try again.');
  }
}
```

### Pattern 3: Load Data on Mount

```typescript
useEffect(() => {
  async function loadInitialData() {
    if (accessToken === 'demo-token-offline-mode') {
      // Use demo data
      setData(demoData);
      return;
    }
    
    try {
      const response = await apiClient.get('/your-endpoint', accessToken);
      setData(response.data || defaultData);
    } catch (error) {
      console.error('Failed to load:', error);
      setData(defaultData);
    }
  }
  
  loadInitialData();
}, [accessToken]);
```

---

## 🔑 KV Store Key Naming Conventions

Use these patterns for consistency:

```
profile:{userId}                    → User profile
progress:{userId}                   → Progress data
{dataType}:{userId}                 → User-specific data
{dataType}:{userId}:{id}            → Item within collection
reminder:{userId}:{type}            → Categorized data
calculator:{userId}:{type}          → Calculator states
mission:{userId}:{missionId}        → Mission-specific data
```

**Rules:**
- Always include `{userId}` for user data
- Use kebab-case for IDs
- Be descriptive but concise
- Use colons `:` as separators

---

## 🛠️ Utility Functions

### Create a Custom Hook:

```typescript
// hooks/useYourData.ts
import { useState, useEffect, useCallback } from 'react';
import apiClient from '../utils/api';

export function useYourData(accessToken: string) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const loadData = useCallback(async () => {
    if (accessToken === 'demo-token-offline-mode') return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await apiClient.get('/your-endpoint', accessToken);
      setData(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [accessToken]);
  
  const saveData = useCallback(async (newData: any) => {
    if (accessToken === 'demo-token-offline-mode') {
      setData(newData);
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      await apiClient.post('/your-endpoint', newData, accessToken);
      setData(newData);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [accessToken]);
  
  useEffect(() => {
    loadData();
  }, [loadData]);
  
  return { data, isLoading, error, saveData, refreshData: loadData };
}
```

### Use the Hook:

```typescript
function YourComponent() {
  const { accessToken } = useAuth();
  const { data, isLoading, error, saveData } = useYourData(accessToken);
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      {/* Use data */}
      <button onClick={() => saveData(newData)}>Save</button>
    </div>
  );
}
```

---

## 🔍 Debugging Tips

### Check Backend Logs:
1. Open Supabase Dashboard
2. Go to Edge Functions
3. View logs for your function
4. Look for error messages

### Verify Data in KV Store:
1. Go to Database → Tables → kv_store_03c1d5b1
2. Search for your key (e.g., `profile:user-id`)
3. Check the `value` column (JSONB)

### Test API Endpoints:
```bash
# Use curl or Postman
curl -X GET \
  https://YOUR_PROJECT.supabase.co/functions/v1/make-server-03c1d5b1/health \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Demo Mode Testing:
```typescript
// Always test both modes
if (accessToken === 'demo-token-offline-mode') {
  console.log('Running in demo mode');
  // Demo mode behavior
} else {
  console.log('Running in connected mode');
  // Real backend calls
}
```

---

## ⚠️ Common Pitfalls

### ❌ Don't: Store Sensitive Data Client-Side
```typescript
// BAD
localStorage.setItem('password', userPassword);
```

### ✅ Do: Use Server-Side Storage
```typescript
// GOOD
await apiClient.post('/profile', { encryptedData }, accessToken);
```

### ❌ Don't: Skip Error Handling
```typescript
// BAD
const data = await apiClient.get('/data', accessToken);
setData(data);
```

### ✅ Do: Handle Errors Gracefully
```typescript
// GOOD
try {
  const response = await apiClient.get('/data', accessToken);
  setData(response.data || defaultData);
} catch (error) {
  console.error('Failed to load:', error);
  setData(defaultData);
}
```

### ❌ Don't: Forget Demo Mode
```typescript
// BAD
await apiClient.post('/data', data, accessToken); // Will fail in demo mode
```

### ✅ Do: Check for Demo Mode
```typescript
// GOOD
if (accessToken !== 'demo-token-offline-mode') {
  await apiClient.post('/data', data, accessToken);
}
```

---

## 📦 Example: Adding Budget Data Collection

### 1. Add Server Endpoint

```typescript
// Save budget
app.post('/make-server-03c1d5b1/budget', async (c) => {
  const userId = await getUserId(c.req.raw);
  if (!userId) return c.json({ error: 'Unauthorized' }, 401);
  
  const budgetData = await c.req.json();
  await kv.set(`budget:${userId}`, {
    ...budgetData,
    updatedAt: new Date().toISOString()
  });
  
  return c.json({ success: true });
});

// Get budget
app.get('/make-server-03c1d5b1/budget', async (c) => {
  const userId = await getUserId(c.req.raw);
  if (!userId) return c.json({ error: 'Unauthorized' }, 401);
  
  const budget = await kv.get(`budget:${userId}`);
  return c.json({ budget });
});
```

### 2. Create Hook

```typescript
// hooks/useBudget.ts
export function useBudget(accessToken: string) {
  const [budget, setBudget] = useState(null);
  
  const saveBudget = async (data: any) => {
    if (accessToken === 'demo-token-offline-mode') {
      setBudget(data);
      return;
    }
    
    await apiClient.post('/budget', data, accessToken);
    setBudget(data);
  };
  
  useEffect(() => {
    async function load() {
      if (accessToken === 'demo-token-offline-mode') return;
      const response = await apiClient.get('/budget', accessToken);
      setBudget(response.budget);
    }
    load();
  }, [accessToken]);
  
  return { budget, saveBudget };
}
```

### 3. Use in Component

```typescript
function BudgetScreen() {
  const { accessToken } = useAuth();
  const { budget, saveBudget } = useBudget(accessToken);
  
  const handleSave = async () => {
    await saveBudget({
      income: 5000,
      expenses: 3500,
      categories: { ... }
    });
  };
  
  return <div>{/* Budget UI */}</div>;
}
```

---

## 🎓 Best Practices

1. **Always handle demo mode** - Check for `'demo-token-offline-mode'`
2. **Use TypeScript types** - Define interfaces for your data
3. **Add loading states** - Show spinners/skeletons while loading
4. **Implement error boundaries** - Catch and display errors gracefully
5. **Log errors** - Console.error for debugging
6. **Use optimistic updates** - Better UX
7. **Debounce auto-saves** - Prevent excessive API calls
8. **Validate data** - Both client and server-side
9. **Document your endpoints** - Update this guide
10. **Test both modes** - Demo and connected

---

## 🔄 Data Migration

If you change data structure:

```typescript
// Migration function
async function migrateUserData(userId: string) {
  const oldData = await kv.get(`old-format:${userId}`);
  
  const newData = {
    // Transform old to new format
    field1: oldData.oldField1,
    field2: oldData.oldField2,
    // Add new fields with defaults
    newField: defaultValue
  };
  
  await kv.set(`new-format:${userId}`, newData);
  await kv.del(`old-format:${userId}`);
}
```

---

**Need Help?** Check `/DATA_COLLECTION_SYSTEM.md` for full documentation.
