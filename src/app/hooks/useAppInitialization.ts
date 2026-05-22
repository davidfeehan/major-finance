import { useState, useEffect, useMemo } from 'react';
import { AppScreen } from '../constants';
import { useAppContext } from '../contexts/AppContext';

// Demo profile data - extracted to separate hook for better organization
export function useDemoData() {
  const demoProfile = useMemo(() => ({
    rank: 'Staff Sergeant (E-6)',
    yearsOfService: '8',
    retirementGoal: 'Comfortable retirement with travel and financial security for family',
    currentAge: '30',
    desiredRetirementAge: '50', // 20-year military retirement
    branch: 'army',
    xp: 1250, // Experienced user who has completed several missions
    completedMissions: 5 // Has completed emergency fund, TSP basics, investment training, etc.
  }), []);

  const demoRetirementData = useMemo(() => ({
    currentSavings: '85000', // Realistic TSP balance for E-6 with 8 years
    monthlyContribution: '1200', // Maxing TSP matching + additional
    expectedReturn: '7',
    retirementAge: '50', // 20-year military retirement
    currentAge: '30',
    militaryPension: '3200', // E-6 pension after 20 years (roughly 50% of base pay)
    socialSecurityAge: '67'
  }), []);

  return { demoProfile, demoRetirementData };
}

// App initialization logic extracted from main App component
export function useAppInitialization() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('auth');
  const { auth, userData } = useAppContext();
  const { demoProfile, demoRetirementData } = useDemoData();

  // Initialize app state
  useEffect(() => {
    const initializeApp = async () => {
      if (auth.isAuthenticated) {
        if (auth.isDemo) {
          // For demo mode, use pre-created profile and skip onboarding
          userData.initializeDemoData(demoProfile, demoRetirementData);
          setCurrentScreen('dashboard');
        } else {
          // For real users, load data and check onboarding status
          userData.loadUserData(auth.accessToken);
          setCurrentScreen(userData.userData.rank ? 'dashboard' : 'onboarding');
        }
      } else if (!auth.isLoading) {
        setCurrentScreen('auth');
      }
    };

    initializeApp();
  }, [
    auth.isAuthenticated, 
    auth.isLoading, 
    auth.accessToken, 
    auth.isDemo,
    userData,
    demoProfile, 
    demoRetirementData
  ]);

  // Check if navigation should be shown
  const showNavigation = useMemo(() => {
    return !['auth', 'demo-interstitial', 'onboarding', 'xp-notification'].includes(currentScreen);
  }, [currentScreen]);

  // Check if app is loading
  const isAppLoading = useMemo(() => {
    // Only show full app loading during initial auth check
    return auth.isLoading;
  }, [auth.isLoading]);

  return {
    currentScreen,
    setCurrentScreen,
    showNavigation,
    isAppLoading,
  };
}