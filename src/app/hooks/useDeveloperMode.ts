import { useState, useEffect } from 'react';

const DEVELOPER_MODE_KEY = 'major-finance-developer-mode';

export function useDeveloperMode() {
  const [isDeveloperMode, setIsDeveloperMode] = useState(() => {
    // Check localStorage on init
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(DEVELOPER_MODE_KEY) === 'true';
  });

  useEffect(() => {
    // Sync to localStorage whenever it changes
    if (isDeveloperMode) {
      localStorage.setItem(DEVELOPER_MODE_KEY, 'true');
    } else {
      localStorage.removeItem(DEVELOPER_MODE_KEY);
    }

    // Log state change for debugging
    console.log(`[Developer Mode] ${isDeveloperMode ? 'Enabled' : 'Disabled'}`);
  }, [isDeveloperMode]);

  const toggleDeveloperMode = () => {
    setIsDeveloperMode(prev => !prev);
  };

  const enableDeveloperMode = () => {
    setIsDeveloperMode(true);
  };

  const disableDeveloperMode = () => {
    setIsDeveloperMode(false);
  };

  return {
    isDeveloperMode,
    toggleDeveloperMode,
    enableDeveloperMode,
    disableDeveloperMode
  };
}

// Utility function to check developer mode without hook (for non-React contexts)
export function checkDeveloperMode(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(DEVELOPER_MODE_KEY) === 'true';
}
