import { useState, useEffect } from 'react';

const BANKING_FEATURE_KEY = 'major-finance-banking-enabled';

/**
 * Custom hook to manage banking feature toggle
 * Controls whether banking functionality is displayed throughout the app
 * Default: OFF (false)
 */
export function useBankingFeature() {
  const [isBankingEnabled, setIsBankingEnabled] = useState<boolean>(() => {
    // Default to false (OFF)
    const stored = localStorage.getItem(BANKING_FEATURE_KEY);
    return stored === 'true';
  });

  useEffect(() => {
    // Persist to localStorage whenever it changes
    localStorage.setItem(BANKING_FEATURE_KEY, String(isBankingEnabled));
  }, [isBankingEnabled]);

  const toggleBankingFeature = () => {
    setIsBankingEnabled(prev => !prev);
  };

  const enableBanking = () => {
    setIsBankingEnabled(true);
  };

  const disableBanking = () => {
    setIsBankingEnabled(false);
  };

  return {
    isBankingEnabled,
    toggleBankingFeature,
    enableBanking,
    disableBanking
  };
}
