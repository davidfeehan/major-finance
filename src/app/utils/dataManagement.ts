/**
 * Data Management Utilities
 * Handles user data export and account deletion in compliance with GDPR/CCPA
 */

import { supabase } from './supabase/client';

export interface UserDataExport {
  exportDate: string;
  version: string;
  userData: {
    profile?: any;
    retirementData?: any;
    missionProgress?: any;
    settings?: any;
    localStorage?: any;
  };
  metadata: {
    accountCreated?: string;
    lastLogin?: string;
    totalMissions?: number;
    level?: number;
  };
}

/**
 * Export all user data in a portable JSON format
 * Complies with GDPR Article 20 (Right to Data Portability)
 */
export async function exportUserData(accessToken: string): Promise<UserDataExport> {
  try {
    const exportData: UserDataExport = {
      exportDate: new Date().toISOString(),
      version: '1.0.0',
      userData: {},
      metadata: {}
    };

    // Get user session to verify authentication
    const { data: { user } } = await supabase.auth.getUser(accessToken);
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    // Fetch all user data from Supabase
    const userId = user.id;

    // Get profile data
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (profile) {
      exportData.userData.profile = profile;
      exportData.metadata.accountCreated = profile.created_at;
    }

    // Get retirement data
    const { data: retirementData } = await supabase
      .from('retirement_data')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (retirementData) {
      exportData.userData.retirementData = retirementData;
    }

    // Get mission progress
    const { data: missions } = await supabase
      .from('mission_progress')
      .select('*')
      .eq('user_id', userId);

    if (missions) {
      exportData.userData.missionProgress = missions;
      exportData.metadata.totalMissions = missions.length;
    }

    // Get user settings
    const { data: settings } = await supabase
      .from('user_settings')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (settings) {
      exportData.userData.settings = settings;
    }

    // Export relevant localStorage data (client-side only, no PII)
    exportData.userData.localStorage = {
      tutorialCompleted: localStorage.getItem('major-finance-tutorial-completed'),
      walkthroughCompleted: localStorage.getItem('major-finance-walkthrough-completed'),
      developerMode: localStorage.getItem('major-finance-developer-mode')
    };

    // Calculate metadata
    const xp = profile?.xp || 0;
    exportData.metadata.level = Math.floor(xp / 100) + 1;
    exportData.metadata.lastLogin = new Date().toISOString();

    return exportData;
  } catch (error) {
    console.error('Error exporting user data:', error);
    throw new Error('Failed to export user data. Please try again or contact support.');
  }
}

/**
 * Download user data as a JSON file
 */
export function downloadUserData(exportData: UserDataExport, filename?: string): void {
  try {
    const jsonString = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename || `major-finance-data-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading user data:', error);
    throw new Error('Failed to download data file.');
  }
}

/**
 * Delete all user data from the system
 * Complies with GDPR Article 17 (Right to Erasure) and CCPA
 */
export async function deleteUserAccount(accessToken: string, userId: string): Promise<void> {
  try {
    // Verify user authentication
    const { data: { user } } = await supabase.auth.getUser(accessToken);
    
    if (!user || user.id !== userId) {
      throw new Error('User authentication failed');
    }

    // Delete user data in the correct order (respecting foreign key constraints)
    
    // 1. Delete mission progress
    const { error: missionsError } = await supabase
      .from('mission_progress')
      .delete()
      .eq('user_id', userId);

    if (missionsError && missionsError.code !== 'PGRST116') { // PGRST116 = no rows found (ok)
      console.error('Error deleting missions:', missionsError);
    }

    // 2. Delete user settings
    const { error: settingsError } = await supabase
      .from('user_settings')
      .delete()
      .eq('user_id', userId);

    if (settingsError && settingsError.code !== 'PGRST116') {
      console.error('Error deleting settings:', settingsError);
    }

    // 3. Delete retirement data
    const { error: retirementError } = await supabase
      .from('retirement_data')
      .delete()
      .eq('user_id', userId);

    if (retirementError && retirementError.code !== 'PGRST116') {
      console.error('Error deleting retirement data:', retirementError);
    }

    // 4. Delete user profile
    const { error: profileError } = await supabase
      .from('user_profiles')
      .delete()
      .eq('user_id', userId);

    if (profileError && profileError.code !== 'PGRST116') {
      console.error('Error deleting profile:', profileError);
    }

    // 5. Delete the auth user (this should cascade delete any remaining data)
    const { error: authError } = await supabase.auth.admin.deleteUser(userId);

    if (authError) {
      // If admin deletion fails, try regular user deletion
      console.warn('Admin user deletion failed, attempting regular deletion');
      
      // User can delete their own account
      const { error: userDeleteError } = await supabase.rpc('delete_user');
      
      if (userDeleteError) {
        throw new Error('Failed to delete account from authentication system');
      }
    }

    // Clear local storage
    clearLocalUserData();

  } catch (error) {
    console.error('Error deleting user account:', error);
    throw new Error('Failed to delete account. Please contact support for assistance.');
  }
}

/**
 * Clear all user data from localStorage
 */
export function clearLocalUserData(): void {
  const keysToRemove = [
    'major-finance-tutorial-completed',
    'major-finance-tutorial-skipped',
    'major-finance-tutorial-completed-date',
    'major-finance-tutorial-step',
    'major-finance-walkthrough-completed',
    'major-finance-walkthrough-skipped',
    'major-finance-walkthrough-completed-date',
    'major-finance-developer-mode',
    'major-finance-theme',
  ];

  keysToRemove.forEach(key => {
    localStorage.removeItem(key);
  });
}

/**
 * Export demo user data (for demo mode)
 */
export function exportDemoData(): UserDataExport {
  return {
    exportDate: new Date().toISOString(),
    version: '1.0.0',
    userData: {
      profile: {
        name: 'Marcus Martinez',
        rank: 'Staff Sergeant (E-6)',
        yearsOfService: '12',
        branch: 'army',
        xp: 850,
        completedMissions: 4
      },
      retirementData: {
        currentSavings: '128450',
        monthlyContribution: '1152',
        expectedReturn: '7.5',
        retirementAge: '42',
        currentAge: '34'
      },
      localStorage: {
        tutorialCompleted: localStorage.getItem('major-finance-tutorial-completed'),
        walkthroughCompleted: localStorage.getItem('major-finance-walkthrough-completed')
      }
    },
    metadata: {
      accountCreated: '2023-06-15T00:00:00.000Z',
      lastLogin: new Date().toISOString(),
      totalMissions: 4,
      level: 9
    }
  };
}
