import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './info';

// Create a singleton Supabase client to avoid multiple instances
let supabaseClient: ReturnType<typeof createClient> | null = null;

export function getSupabaseClient() {
  if (!supabaseClient) {
    try {
      // Validate config before creating client
      if (!projectId || !publicAnonKey) {
        console.warn('Supabase configuration missing - using mock client');
        return createMockSupabaseClient();
      }

      supabaseClient = createClient(
        `https://${projectId}.supabase.co`,
        publicAnonKey,
        {
          auth: {
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: true,
          },
          global: {
            headers: {
              'X-Client-Info': 'major-finance-app',
            },
            // Intercept fetch to prevent network crashes
            fetch: (url, options) => {
              return fetch(url, options).catch(err => {
                // Silently handle network errors to prevent crashes
                // We return a 503 so the app can gracefully degrade to offline/demo mode
                return new Response(JSON.stringify({ error: 'Network error - Connection unavailable' }), {
                  status: 503,
                  statusText: 'Service Unavailable',
                  headers: { 'Content-Type': 'application/json' }
                });
              });
            }
          },
        }
      );
    } catch (error) {
      console.warn('Supabase client initialization skipped (connection issue)');
      // Return a mock client that won't throw errors
      return createMockSupabaseClient();
    }
  }
  return supabaseClient;
}

// Create a mock Supabase client for offline/error scenarios
function createMockSupabaseClient() {
  return {
    auth: {
      getUser: async () => {
        console.log('Mock Auth: getUser called');
        // Return a mock user so useRole doesn't error out, 
        // but typically session check is done via getSession
        return { data: { user: { id: 'mock-user-id', email: 'mock@example.com' } }, error: null };
      },
      getSession: async () => {
        console.log('Mock Auth: getSession called');
        // Return null session initially so user starts at Auth screen
        return { data: { session: null }, error: null };
      },
      signOut: async () => {
        console.log('Mock Auth: signOut called');
        return { error: null };
      },
      signInWithPassword: async (credentials: any) => {
        console.log('Mock Auth: Signing in as', credentials.email);
        // Simulate successful login with a fake token
        return { 
          data: { 
            session: { 
              access_token: 'mock-access-token', 
              user: { id: 'mock-user-id', email: credentials.email || 'mock@example.com' } 
            },
            user: { id: 'mock-user-id', email: credentials.email || 'mock@example.com' }
          }, 
          error: null 
        };
      },
      signUp: async (credentials: any) => {
        console.log('Mock Auth: Signing up as', credentials.email);
        // Simulate successful signup
        return { 
          data: { 
            user: { id: 'mock-user-id', email: credentials.email || 'mock@example.com' },
            session: null // Supabase usually returns null session if email confirm needed
          }, 
          error: null 
        };
      },
      resetPasswordForEmail: async (email: string) => {
        console.log('Mock Auth: Reset password for', email);
        return { data: {}, error: null };
      },
      resend: async () => {
        console.log('Mock Auth: Resend verification');
        return { error: null };
      },
      signInWithOAuth: async (params: any) => {
        console.log('Mock Auth: OAuth for', params.provider);
        return { data: {}, error: null };
      }
    },
    from: (table: string) => ({
      select: (cols: string) => ({
        eq: (col: string, val: any) => ({
          maybeSingle: async () => ({ data: null, error: null }), // Return null role = USER
          single: async () => ({ data: null, error: { message: 'Mock data not found' } }),
        }),
      }),
    }),
  } as any;
}

// Validate Supabase configuration
export function validateSupabaseConfig(): { valid: boolean; error?: string } {
  if (!projectId || projectId === 'undefined' || projectId === '') {
    return { valid: false, error: 'Supabase project ID is not configured' };
  }
  
  if (!publicAnonKey || publicAnonKey === 'undefined' || publicAnonKey === '') {
    return { valid: false, error: 'Supabase anon key is not configured' };
  }
  
  return { valid: true };
}

// Export with try-catch wrapper to prevent any initialization errors
let exportedClient: any;
try {
  exportedClient = getSupabaseClient();
} catch (error) {
  console.warn('Failed to export Supabase client - using mock');
  exportedClient = createMockSupabaseClient();
}

export const supabase = exportedClient;