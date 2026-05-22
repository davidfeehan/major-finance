import { projectId, publicAnonKey } from './supabase/info';

interface APIClient {
  get: (endpoint: string, authToken?: string) => Promise<any>;
  post: (endpoint: string, data: any, authToken?: string) => Promise<any>;
}

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-03c1d5b1`;

// Demo mode storage for offline functionality
const demoStorage: Record<string, any> = {};

const apiClient: APIClient = {
  async get(endpoint: string, authToken?: string) {
    // Handle demo mode
    if (authToken === 'demo-token-offline-mode') {
      console.log('Demo mode: GET', endpoint);
      return { 
        [endpoint.includes('profile') ? 'profile' : endpoint.includes('progress') ? 'progress' : endpoint.includes('retirement') ? 'plan' : 'reminders']: 
        demoStorage[endpoint] || null 
      };
    }

    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken || publicAnonKey}`
      };

      // Wrap fetch in additional try-catch for network errors
      let response;
      try {
        response = await fetch(`${API_BASE_URL}${endpoint}`, {
          method: 'GET',
          headers,
          signal: AbortSignal.timeout(10000), // 10 second timeout
        });
      } catch (fetchError: any) {
        // Handle all fetch errors silently
        console.warn(`API GET network error for ${endpoint}:`, fetchError.message);
        return { 
          [endpoint.includes('profile') ? 'profile' : endpoint.includes('progress') ? 'progress' : endpoint.includes('retirement') ? 'plan' : 'reminders']: null 
        };
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.warn(`API GET warning for ${endpoint}:`, errorData.error || `HTTP ${response.status}`);
        // Return null instead of throwing
        return { 
          [endpoint.includes('profile') ? 'profile' : endpoint.includes('progress') ? 'progress' : endpoint.includes('retirement') ? 'plan' : 'reminders']: null 
        };
      }

      return await response.json();
    } catch (error: any) {
      // Silent error handling - log but don't throw
      console.warn(`API GET skipped for ${endpoint} (connection issue):`, error.message);
      // Return null data structure instead of throwing
      return { 
        [endpoint.includes('profile') ? 'profile' : endpoint.includes('progress') ? 'progress' : endpoint.includes('retirement') ? 'plan' : 'reminders']: null 
      };
    }
  },

  async post(endpoint: string, data: any, authToken?: string) {
    // Handle demo mode
    if (authToken === 'demo-token-offline-mode') {
      console.log('Demo mode: POST', endpoint, data);
      demoStorage[endpoint] = data;
      return { success: true };
    }

    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken || publicAnonKey}`
      };

      // Wrap fetch in additional try-catch for network errors
      let response;
      try {
        response = await fetch(`${API_BASE_URL}${endpoint}`, {
          method: 'POST',
          headers,
          body: JSON.stringify(data),
          signal: AbortSignal.timeout(10000), // 10 second timeout
        });
      } catch (fetchError: any) {
        // Handle all fetch errors silently
        console.warn(`API POST network error for ${endpoint}:`, fetchError.message);
        return { success: false, error: 'Connection unavailable' };
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.warn(`API POST warning for ${endpoint}:`, errorData.error || `HTTP ${response.status}`);
        // Return success=false instead of throwing
        return { success: false, error: errorData.error || 'Request failed' };
      }

      return await response.json();
    } catch (error: any) {
      // Silent error handling - log but don't throw
      console.warn(`API POST skipped for ${endpoint} (connection issue):`, error.message);
      // Return success=false instead of throwing
      return { success: false, error: 'Connection unavailable' };
    }
  }
};

export default apiClient;