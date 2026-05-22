import { useState, useCallback } from 'react';
import apiClient from '../utils/api';

export interface MissionState {
  currentMissionName: string;
  currentXPReward: number;
  isCompleting: boolean;
  error: string | null;
}

export type MissionType = 
  | 'retirement-planning'
  | 'emergency-fund'
  | 'investment-basics'
  | 'tsp-optimization'
  | 'financial-education';

export const MISSION_XP_REWARDS: Record<string, number> = {
  'retirement-planning': 250,
  'emergency-fund': 150,
  'investment-basics': 200,
  'tsp-optimization': 300,
  'financial-education': 100,
  'Retirement Planning': 250,
  'Emergency Fund': 150,
  'Investment Training': 200,
  'TSP Optimization': 300,
  'Financial Education': 100,
};

export const useMissions = () => {
  const [missionState, setMissionState] = useState<MissionState>({
    currentMissionName: '',
    currentXPReward: 0,
    isCompleting: false,
    error: null,
  });

  const completeMission = useCallback(async (
    missionType: string,
    currentXP: number,
    completedMissions: number,
    accessToken: string,
    xpReward?: number,
    completedMissionsList?: string[]
  ) => {
    setMissionState(prev => ({ ...prev, isCompleting: true, error: null }));

    try {
      // Normalize mission ID for comparison
      const missionId = missionType.toLowerCase().replace(/\s+/g, '-');
      const alreadyCompleted = completedMissionsList?.includes(missionId) || false;
      
      // Award XP only if mission hasn't been completed before
      const earnedXP = alreadyCompleted ? 0 : (xpReward || MISSION_XP_REWARDS[missionType] || 100);
      const newXP = currentXP + earnedXP;
      const newCompletedMissions = alreadyCompleted ? completedMissions : completedMissions + 1;
      const newCompletedMissionsList = alreadyCompleted 
        ? completedMissionsList 
        : [...(completedMissionsList || []), missionId];
      
      // Save progress to backend if not in demo mode
      if (accessToken !== 'demo-token-offline-mode') {
        await apiClient.post('/progress', {
          xp: newXP,
          completedMissions: newCompletedMissions,
          completedMissionsList: newCompletedMissionsList,
          missionId: missionId
        }, accessToken);
      }

      setMissionState({
        currentMissionName: missionType,
        currentXPReward: earnedXP,
        isCompleting: false,
        error: null,
      });

      return { newXP, newCompletedMissions, earnedXP, completedMissionsList: newCompletedMissionsList, alreadyCompleted };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to save mission progress';
      setMissionState(prev => ({
        ...prev,
        isCompleting: false,
        error: errorMessage,
      }));
      
      console.error('Failed to save mission progress:', err);
      
      // Continue anyway - update locally
      const missionId = missionType.toLowerCase().replace(/\s+/g, '-');
      const alreadyCompleted = completedMissionsList?.includes(missionId) || false;
      const earnedXP = alreadyCompleted ? 0 : (xpReward || MISSION_XP_REWARDS[missionType] || 100);
      const newXP = currentXP + earnedXP;
      const newCompletedMissions = alreadyCompleted ? completedMissions : completedMissions + 1;
      const newCompletedMissionsList = alreadyCompleted 
        ? completedMissionsList 
        : [...(completedMissionsList || []), missionId];
      
      setMissionState({
        currentMissionName: missionType,
        currentXPReward: earnedXP,
        isCompleting: false,
        error: null,
      });

      return { newXP, newCompletedMissions, earnedXP, completedMissionsList: newCompletedMissionsList, alreadyCompleted };
    }
  }, []);

  const setReminder = useCallback(async (accessToken: string) => {
    try {
      if (accessToken === 'demo-token-offline-mode') {
        console.log('Reminder set for retirement planning check-in (demo mode)');
        return;
      }

      const nextMonth = new Date();
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      
      await apiClient.post('/reminders', {
        type: 'retirement-checkin',
        frequency: 'monthly',
        nextDate: nextMonth.toISOString()
      }, accessToken);

      console.log('Reminder set for retirement planning check-in');
    } catch (err) {
      console.error('Failed to set reminder:', err);
    }
  }, []);

  const calculateLevelUp = useCallback((previousXP: number, newXP: number) => {
    const currentLevel = Math.floor(newXP / 500) + 1;
    const previousLevel = Math.floor(previousXP / 500) + 1;
    return {
      currentLevel,
      previousLevel,
      leveledUp: currentLevel > previousLevel,
    };
  }, []);

  const clearMissionState = useCallback(() => {
    setMissionState({
      currentMissionName: '',
      currentXPReward: 0,
      isCompleting: false,
      error: null,
    });
  }, []);

  return {
    ...missionState,
    completeMission,
    setReminder,
    calculateLevelUp,
    clearMissionState,
  };
};