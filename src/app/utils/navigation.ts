import { AppScreen } from '../constants';

/**
 * Navigation utility functions for consistent routing throughout the app
 */

// Valid screen names for navigation
export const VALID_SCREENS: readonly AppScreen[] = [
  'auth',
  'onboarding',
  'dashboard',
  'retirement-planning',
  'retirement-calculator',
  'emergency-fund',
  'investment-basics',
  'tsp-optimization',
  'financial-education',
  'banking',
  'profile',
  'settings',
  'help',
  'progress',
  'missions',
  'xp-notification',
  'nav-test',
  'desktop-layout-test'
] as const;

// Screen display names for UI
export const SCREEN_NAMES: Record<AppScreen, string> = {
  'auth': 'Sign In',
  'onboarding': 'Getting Started',
  'dashboard': 'Dashboard',
  'retirement-planning': 'Retirement Planning',
  'retirement-calculator': 'Retirement Calculator',
  'emergency-fund': 'Emergency Fund',
  'investment-basics': 'Investment Basics',
  'tsp-optimization': 'TSP Optimization',
  'financial-education': 'Financial Education',
  'banking': 'Banking',
  'profile': 'Profile',
  'settings': 'Settings',
  'help': 'Help & Support',
  'progress': 'Progress',
  'missions': 'All Missions',
  'xp-notification': 'Mission Complete',
  'nav-test': 'Navigation Test',
  'desktop-layout-test': 'Layout Test'
};

/**
 * Validates if a screen name is valid
 */
export function isValidScreen(screen: string): screen is AppScreen {
  return VALID_SCREENS.includes(screen as AppScreen);
}

/**
 * Gets the display name for a screen
 */
export function getScreenDisplayName(screen: AppScreen): string {
  return SCREEN_NAMES[screen] || screen;
}

/**
 * Validates and returns a safe screen name, defaulting to dashboard if invalid
 */
export function getSafeScreen(screen: string): AppScreen {
  if (isValidScreen(screen)) {
    return screen;
  }
  console.warn(`Invalid screen name: ${screen}, defaulting to dashboard`);
  return 'dashboard';
}

/**
 * Checks if a screen requires authentication
 */
export function requiresAuth(screen: AppScreen): boolean {
  return !['auth', 'onboarding'].includes(screen);
}

/**
 * Checks if a screen should show navigation
 */
export function shouldShowNavigation(screen: AppScreen): boolean {
  return !['auth', 'onboarding', 'xp-notification'].includes(screen);
}

/**
 * Maps mission IDs to their corresponding screen names
 */
export const MISSION_SCREEN_MAP: Record<string, AppScreen> = {
  'retirement-planning': 'retirement-planning',
  'emergency-fund': 'emergency-fund',
  'investment-basics': 'investment-basics',
  'tsp-optimization': 'tsp-optimization',
  'financial-education': 'financial-education',
  'banking': 'banking',
  'profile': 'profile',
  'settings': 'settings',
  'help': 'help',
  'progress': 'progress',
  'missions': 'missions'
};

/**
 * Gets the screen name for a mission ID
 */
export function getMissionScreen(missionId: string): AppScreen {
  const screen = MISSION_SCREEN_MAP[missionId];
  if (!screen) {
    console.warn(`Unknown mission ID: ${missionId}, defaulting to dashboard`);
    return 'dashboard';
  }
  return screen;
}

/**
 * Logs navigation events for debugging
 */
export function logNavigation(from: AppScreen, to: AppScreen, context?: string) {
  console.log(`🧭 Navigation: ${from} → ${to}${context ? ` (${context})` : ''}`);
}

/**
 * Creates a navigation handler with validation and logging
 */
export function createNavigationHandler(
  setScreen: (screen: AppScreen) => void,
  currentScreen: AppScreen
) {
  return (targetScreen: string, context?: string) => {
    const safeScreen = getSafeScreen(targetScreen);
    logNavigation(currentScreen, safeScreen, context);
    setScreen(safeScreen);
  };
}
