import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "jsr:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
);

// Helper to get user ID from access token
async function getUserId(request: Request): Promise<string | null> {
  const accessToken = request.headers.get('Authorization')?.split(' ')[1];
  if (!accessToken) return null;

  const { data: { user }, error } = await supabase.auth.getUser(accessToken);
  if (error || !user?.id) return null;
  return user.id;
}

// User signup endpoint
app.post('/make-server-03c1d5b1/signup', async (c) => {
  try {
    const { email, password, name } = await c.req.json();

    if (!email || !password || !name) {
      return c.json({ error: 'Missing required fields' }, 400);
    }

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.log('Signup error:', error);
      return c.json({ error: error.message }, 400);
    }

    return c.json({ user: data.user });
  } catch (error) {
    console.log('Signup error:', error);
    return c.json({ error: 'Internal server error during signup' }, 500);
  }
});

// Save user profile data (onboarding)
app.post('/make-server-03c1d5b1/profile', async (c) => {
  try {
    const userId = await getUserId(c.req.raw);
    if (!userId) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const profileData = await c.req.json();
    await kv.set(`profile:${userId}`, profileData);

    return c.json({ success: true });
  } catch (error) {
    console.log('Profile save error:', error);
    return c.json({ error: 'Failed to save profile data' }, 500);
  }
});

// Get user profile data
app.get('/make-server-03c1d5b1/profile', async (c) => {
  try {
    const userId = await getUserId(c.req.raw);
    if (!userId) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const profileData = await kv.get(`profile:${userId}`);
    return c.json({ profile: profileData });
  } catch (error) {
    console.log('Profile fetch error:', error);
    return c.json({ error: 'Failed to fetch profile data' }, 500);
  }
});

// Save retirement plan data
app.post('/make-server-03c1d5b1/retirement-plan', async (c) => {
  try {
    const userId = await getUserId(c.req.raw);
    if (!userId) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const retirementData = await c.req.json();
    const planData = {
      ...retirementData,
      updatedAt: new Date().toISOString()
    };

    await kv.set(`retirement:${userId}`, planData);
    return c.json({ success: true });
  } catch (error) {
    console.log('Retirement plan save error:', error);
    return c.json({ error: 'Failed to save retirement plan' }, 500);
  }
});

// Get retirement plan data
app.get('/make-server-03c1d5b1/retirement-plan', async (c) => {
  try {
    const userId = await getUserId(c.req.raw);
    if (!userId) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const retirementData = await kv.get(`retirement:${userId}`);
    return c.json({ plan: retirementData });
  } catch (error) {
    console.log('Retirement plan fetch error:', error);
    return c.json({ error: 'Failed to fetch retirement plan' }, 500);
  }
});

// Update user XP and mission progress
app.post('/make-server-03c1d5b1/progress', async (c) => {
  try {
    const userId = await getUserId(c.req.raw);
    if (!userId) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { xp, completedMissions, completedMissionsList, missionId } = await c.req.json();

    // Get current progress
    const currentProgress = await kv.get(`progress:${userId}`) || {
      xp: 0,
      completedMissions: 0,
      completedMissionsList: [],
      missions: []
    };

    // Update progress with completedMissionsList
    const newProgress = {
      xp: xp !== undefined ? xp : currentProgress.xp,
      completedMissions: completedMissions !== undefined ? completedMissions : currentProgress.completedMissions,
      completedMissionsList: completedMissionsList !== undefined ? completedMissionsList : currentProgress.completedMissionsList,
      missions: missionId ? [...(currentProgress.missions || []), {
        id: missionId,
        completedAt: new Date().toISOString()
      }] : currentProgress.missions,
      updatedAt: new Date().toISOString()
    };

    await kv.set(`progress:${userId}`, newProgress);
    return c.json({ success: true, progress: newProgress });
  } catch (error) {
    console.log('Progress update error:', error);
    return c.json({ error: 'Failed to update progress' }, 500);
  }
});

// Get user progress
app.get('/make-server-03c1d5b1/progress', async (c) => {
  try {
    const userId = await getUserId(c.req.raw);
    if (!userId) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const progress = await kv.get(`progress:${userId}`) || {
      xp: 0,
      completedMissions: 0,
      completedMissionsList: [],
      missions: []
    };
    return c.json({ progress });
  } catch (error) {
    console.log('Progress fetch error:', error);
    return c.json({ error: 'Failed to fetch progress' }, 500);
  }
});

// Set reminder preferences
app.post('/make-server-03c1d5b1/reminders', async (c) => {
  try {
    const userId = await getUserId(c.req.raw);
    if (!userId) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { type, frequency, nextDate } = await c.req.json();

    const reminderData = {
      type,
      frequency,
      nextDate,
      createdAt: new Date().toISOString(),
      active: true
    };

    await kv.set(`reminder:${userId}:${type}`, reminderData);
    return c.json({ success: true });
  } catch (error) {
    console.log('Reminder save error:', error);
    return c.json({ error: 'Failed to set reminder' }, 500);
  }
});

// Get user reminders
app.get('/make-server-03c1d5b1/reminders', async (c) => {
  try {
    const userId = await getUserId(c.req.raw);
    if (!userId) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const reminders = await kv.getByPrefix(`reminder:${userId}:`);
    return c.json({ reminders });
  } catch (error) {
    console.log('Reminders fetch error:', error);
    return c.json({ error: 'Failed to fetch reminders' }, 500);
  }
});

// Save calculator state (emergency fund, TSP, etc.)
app.post('/make-server-03c1d5b1/calculator-state', async (c) => {
  try {
    const userId = await getUserId(c.req.raw);
    if (!userId) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { calculatorType, state } = await c.req.json();

    if (!calculatorType) {
      return c.json({ error: 'Calculator type is required' }, 400);
    }

    const stateData = {
      ...state,
      updatedAt: new Date().toISOString()
    };

    await kv.set(`calculator:${userId}:${calculatorType}`, stateData);
    return c.json({ success: true });
  } catch (error) {
    console.log('Calculator state save error:', error);
    return c.json({ error: 'Failed to save calculator state' }, 500);
  }
});

// Get calculator state
app.get('/make-server-03c1d5b1/calculator-state/:type', async (c) => {
  try {
    const userId = await getUserId(c.req.raw);
    if (!userId) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const calculatorType = c.req.param('type');
    const state = await kv.get(`calculator:${userId}:${calculatorType}`);
    return c.json({ state });
  } catch (error) {
    console.log('Calculator state fetch error:', error);
    return c.json({ error: 'Failed to fetch calculator state' }, 500);
  }
});

// Save banking/accounts data
app.post('/make-server-03c1d5b1/accounts', async (c) => {
  try {
    const userId = await getUserId(c.req.raw);
    if (!userId) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const accountsData = await c.req.json();
    const data = {
      ...accountsData,
      updatedAt: new Date().toISOString()
    };

    await kv.set(`accounts:${userId}`, data);
    return c.json({ success: true });
  } catch (error) {
    console.log('Accounts save error:', error);
    return c.json({ error: 'Failed to save accounts data' }, 500);
  }
});

// Get banking/accounts data
app.get('/make-server-03c1d5b1/accounts', async (c) => {
  try {
    const userId = await getUserId(c.req.raw);
    if (!userId) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const accounts = await kv.get(`accounts:${userId}`);
    return c.json({ accounts });
  } catch (error) {
    console.log('Accounts fetch error:', error);
    return c.json({ error: 'Failed to fetch accounts data' }, 500);
  }
});

// Save mission-specific data (for form persistence)
app.post('/make-server-03c1d5b1/mission-data', async (c) => {
  try {
    const userId = await getUserId(c.req.raw);
    if (!userId) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { missionId, data } = await c.req.json();

    if (!missionId) {
      return c.json({ error: 'Mission ID is required' }, 400);
    }

    const missionData = {
      ...data,
      updatedAt: new Date().toISOString()
    };

    await kv.set(`mission:${userId}:${missionId}`, missionData);
    return c.json({ success: true });
  } catch (error) {
    console.log('Mission data save error:', error);
    return c.json({ error: 'Failed to save mission data' }, 500);
  }
});

// Get mission-specific data
app.get('/make-server-03c1d5b1/mission-data/:missionId', async (c) => {
  try {
    const userId = await getUserId(c.req.raw);
    if (!userId) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const missionId = c.req.param('missionId');
    const data = await kv.get(`mission:${userId}:${missionId}`);
    return c.json({ data });
  } catch (error) {
    console.log('Mission data fetch error:', error);
    return c.json({ error: 'Failed to fetch mission data' }, 500);
  }
});

// Save user settings/preferences
app.post('/make-server-03c1d5b1/settings', async (c) => {
  try {
    const userId = await getUserId(c.req.raw);
    if (!userId) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const settings = await c.req.json();
    const data = {
      ...settings,
      updatedAt: new Date().toISOString()
    };

    await kv.set(`settings:${userId}`, data);
    return c.json({ success: true });
  } catch (error) {
    console.log('Settings save error:', error);
    return c.json({ error: 'Failed to save settings' }, 500);
  }
});

// Get user settings/preferences
app.get('/make-server-03c1d5b1/settings', async (c) => {
  try {
    const userId = await getUserId(c.req.raw);
    if (!userId) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const settings = await kv.get(`settings:${userId}`) || {};
    return c.json({ settings });
  } catch (error) {
    console.log('Settings fetch error:', error);
    return c.json({ error: 'Failed to fetch settings' }, 500);
  }
});

// Get all user data (for backup/export)
app.get('/make-server-03c1d5b1/user-data', async (c) => {
  try {
    const userId = await getUserId(c.req.raw);
    if (!userId) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    // Fetch all user-related data
    const [profile, progress, retirementPlan, accounts, settings] = await Promise.all([
      kv.get(`profile:${userId}`),
      kv.get(`progress:${userId}`),
      kv.get(`retirement:${userId}`),
      kv.get(`accounts:${userId}`),
      kv.get(`settings:${userId}`)
    ]);

    return c.json({
      profile: profile || null,
      progress: progress || { xp: 0, completedMissions: 0, completedMissionsList: [], missions: [] },
      retirementPlan: retirementPlan || null,
      accounts: accounts || null,
      settings: settings || {},
      exportedAt: new Date().toISOString()
    });
  } catch (error) {
    console.log('User data export error:', error);
    return c.json({ error: 'Failed to export user data' }, 500);
  }
});

// Health check endpoint
app.get('/make-server-03c1d5b1/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

Deno.serve(app.fetch);