import { useCallback } from 'react';
import { AppScreen } from '../constants';
import { useAppContext } from '../contexts/AppContext';

// Utility function to scroll to top
const scrollToTop = () => {
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
};

// Extract all handler functions to a separate hook
export function useAppHandlers(setCurrentScreen: (screen: AppScreen) => void) {
  const { auth, userData, missions } = useAppContext();

  const handleAuthenticated = useCallback(async (token: string) => {
    auth.authenticate(token);
    scrollToTop();
  }, [auth]);

  const handleReturnToDashboard = useCallback(() => {
    setCurrentScreen('dashboard');
    scrollToTop();
  }, [setCurrentScreen]);

  const handleNavigate = useCallback((screen: string) => {
    setCurrentScreen(screen as AppScreen);
    scrollToTop();
  }, [setCurrentScreen]);

  const handleOnboardingComplete = useCallback(async (data: any) => {
    // Only process onboarding for non-demo users
    if (!auth.isDemo) {
      await userData.completeOnboarding(data, auth.accessToken);
    }
    setCurrentScreen('dashboard');
    scrollToTop();
  }, [userData, auth.accessToken, auth.isDemo, setCurrentScreen]);

  const handleMissionSelect = useCallback((missionId: string) => {
    if (missionId === 'retirement-planning') {
      // Pre-populate retirement data with onboarding info
      userData.setRetirementData(prev => ({
        ...prev,
        currentAge: userData.userData.currentAge,
        retirementAge: userData.userData.desiredRetirementAge
      }));
      setCurrentScreen('retirement-planning');
    } else {
      setCurrentScreen(missionId as AppScreen);
    }
    scrollToTop();
  }, [userData, setCurrentScreen]);

  const handleRetirementCalculate = useCallback(async (data: any) => {
    await userData.saveRetirementData(data, auth.accessToken);
    setCurrentScreen('retirement-calculator');
    scrollToTop();
  }, [userData, auth.accessToken, setCurrentScreen]);

  const handleMissionComplete = useCallback(async (
    missionType: string = 'retirement-planning', 
    xpReward?: number,
    onShowModal?: (missionName: string, earnedXP: number, newLevel?: number) => void
  ) => {
    const result = await missions.completeMission(
      missionType,
      userData.userData.xp,
      userData.userData.completedMissions,
      auth.accessToken,
      xpReward
    );
    
    userData.setUserData(prev => ({
      ...prev,
      xp: result.newXP,
      completedMissions: result.newCompletedMissions
    }));
    
    // Calculate if user leveled up
    const oldLevel = Math.floor((userData.userData.xp) / 500) + 1;
    const newLevel = Math.floor(result.newXP / 500) + 1;
    const leveledUp = newLevel > oldLevel;
    
    // Show modal if callback provided, otherwise fallback to screen navigation
    if (onShowModal) {
      onShowModal(missionType, result.earnedXP, leveledUp ? newLevel : undefined);
      scrollToTop();
    } else {
      setCurrentScreen('xp-notification');
      scrollToTop();
    }
  }, [missions, userData, auth.accessToken, setCurrentScreen]);

  const handleSetReminder = useCallback(async () => {
    await missions.setReminder(auth.accessToken);
  }, [missions, auth.accessToken]);

  const handleUpdateProfile = useCallback(async (profileData: any) => {
    await userData.updateProfile(profileData, auth.accessToken);
  }, [userData, auth.accessToken]);

  const handleSignOut = useCallback(async () => {
    await auth.signOut();
    userData.resetUserData();
    missions.clearMissionState();
    setCurrentScreen('auth');
    scrollToTop();
  }, [auth, userData, missions, setCurrentScreen]);

  return {
    handleAuthenticated,
    handleReturnToDashboard,
    handleNavigate,
    handleOnboardingComplete,
    handleMissionSelect,
    handleRetirementCalculate,
    handleMissionComplete,
    handleSetReminder,
    handleUpdateProfile,
    handleSignOut,
  };
}