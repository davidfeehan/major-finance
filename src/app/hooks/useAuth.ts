import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase/client';
import apiClient from '../utils/api';

export interface AuthState {
  accessToken: string;
  isLoading: boolean;
  isDemo: boolean;
  isAuthenticated: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    accessToken: '',
    isLoading: true,
    isDemo: false,
    isAuthenticated: false,
  });

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const { data, error } = await supabase.auth.getSession();
      const session = data?.session;
      
      if (error) {
        // Silently handle - don't show errors to user
        console.warn('Session check skipped (non-critical):', error.message);
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
          isAuthenticated: false,
        }));
        return;
      }
      
      if (session?.access_token) {
        setAuthState({
          accessToken: session.access_token,
          isLoading: false,
          isDemo: false,
          isAuthenticated: true,
        });
      } else {
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
          isAuthenticated: false,
        }));
      }
    } catch (error: any) {
      // Catch all errors silently - app should never fail to load
      // This includes network errors, fetch failures, etc.
      console.warn('Session check skipped (connection issue)');
      
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        isAuthenticated: false,
      }));
    }
  };

  const authenticate = (token: string) => {
    const isDemo = token === 'demo-token-offline-mode';
    setAuthState({
      accessToken: token,
      isLoading: false,
      isDemo,
      isAuthenticated: true,
    });
  };

  const signOut = async () => {
    try {
      if (!authState.isDemo) {
        await supabase.auth.signOut();
      }
      setAuthState({
        accessToken: '',
        isLoading: false,
        isDemo: false,
        isAuthenticated: false,
      });
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  return {
    ...authState,
    authenticate,
    signOut,
    checkSession,
  };
};