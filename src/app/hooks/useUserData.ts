import { useState, useCallback } from 'react';
import apiClient from '../utils/api';

export interface OnboardingData {
  rank: string;
  yearsOfService: string;
  retirementGoal: string;
  currentAge: string;
  desiredRetirementAge: string;
  branch?: string;
}

export interface UserData extends OnboardingData {
  xp: number;
  completedMissions: number;
  completedMissionsList?: string[]; // Track which specific missions were completed
  branch?: string;
}

export interface RetirementData {
  currentSavings: string;
  monthlyContribution: string;
  expectedReturn: string;
  retirementAge: string;
  currentAge: string;
  militaryPension: string;
  socialSecurityAge: string;
}

const defaultUserData: UserData = {
  rank: '',
  yearsOfService: '',
  retirementGoal: '',
  currentAge: '',
  desiredRetirementAge: '',
  xp: 0,
  completedMissions: 0,
  completedMissionsList: [],
  branch: 'joint'
};

const defaultRetirementData: RetirementData = {
  currentSavings: '',
  monthlyContribution: '',
  expectedReturn: '7',
  retirementAge: '',
  currentAge: '',
  militaryPension: '',
  socialSecurityAge: '67'
};

export const useUserData = () => {
  const [userData, setUserData] = useState<UserData>(defaultUserData);
  const [retirementData, setRetirementData] = useState<RetirementData>(defaultRetirementData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadUserData = useCallback(async (accessToken: string) => {
    if (accessToken === 'demo-token-offline-mode') {
      // Demo mode - data is handled by the main App component
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Load profile data
      const profileResponse = await apiClient.get('/profile', accessToken);
      if (profileResponse.profile) {
        setUserData(prev => ({ ...prev, ...profileResponse.profile }));
      }

      // Load progress data
      const progressResponse = await apiClient.get('/progress', accessToken);
      if (progressResponse.progress) {
        setUserData(prev => ({
          ...prev,
          xp: progressResponse.progress.xp,
          completedMissions: progressResponse.progress.completedMissions,
          completedMissionsList: progressResponse.progress.completedMissionsList || []
        }));
      }

      // Load retirement plan data
      const retirementResponse = await apiClient.get('/retirement-plan', accessToken);
      if (retirementResponse.plan) {
        setRetirementData(retirementResponse.plan);
      }
    } catch (err) {
      // Silent error handling - errors are already handled in apiClient
      // No need to set error state or show to user
      console.warn('User data load skipped (connection issue)');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateProfile = useCallback(async (profileData: Partial<UserData>, accessToken: string) => {
    setError(null);
    
    try {
      // Update local state optimistically
      setUserData(prev => ({ ...prev, ...profileData }));
      
      // Save to backend if not in demo mode
      if (accessToken && accessToken !== 'demo-token-offline-mode') {
        await apiClient.post('/profile', profileData, accessToken);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update profile';
      setError(errorMessage);
      console.error('Failed to update profile:', err);
      
      // Revert optimistic update on error
      await loadUserData(accessToken);
    }
  }, [loadUserData]);

  const completeOnboarding = useCallback(async (data: OnboardingData, accessToken: string) => {
    setError(null);
    
    try {
      const updatedUserData = {
        ...userData,
        ...data,
        xp: 100, // Welcome bonus XP
        completedMissions: 0,
        branch: data.branch || 'joint'
      };

      // Update local state
      setUserData(updatedUserData);

      // Save to backend if not in demo mode
      if (accessToken !== 'demo-token-offline-mode') {
        await apiClient.post('/profile', data, accessToken);
        await apiClient.post('/progress', {
          xp: 100,
          completedMissions: 0
        }, accessToken);
      }

      return updatedUserData;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to save onboarding data';
      setError(errorMessage);
      console.error('Failed to save onboarding data:', err);
      
      // Continue anyway - user can try again later
      const updatedUserData = {
        ...userData,
        ...data,
        xp: 100,
        completedMissions: 0,
        branch: data.branch || 'joint'
      };
      setUserData(updatedUserData);
      return updatedUserData;
    }
  }, [userData]);

  const saveRetirementData = useCallback(async (data: RetirementData, accessToken: string) => {
    setError(null);
    
    try {
      // Update local state
      setRetirementData(data);

      // Save to backend if not in demo mode
      if (accessToken !== 'demo-token-offline-mode') {
        await apiClient.post('/retirement-plan', data, accessToken);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to save retirement plan';
      setError(errorMessage);
      console.error('Failed to save retirement plan:', err);
      
      // Continue anyway - data is still available locally
      setRetirementData(data);
    }
  }, []);

  const resetUserData = useCallback(() => {
    setUserData(defaultUserData);
    setRetirementData(defaultRetirementData);
    setError(null);
  }, []);

  const initializeDemoData = useCallback((demoUserData: UserData, demoRetirementData: RetirementData) => {
    setUserData(demoUserData);
    setRetirementData(demoRetirementData);
    setError(null);
  }, []);

  return {
    userData,
    retirementData,
    isLoading,
    error,
    loadUserData,
    updateProfile,
    completeOnboarding,
    saveRetirementData,
    resetUserData,
    initializeDemoData,
    setUserData,
    setRetirementData,
  };
};