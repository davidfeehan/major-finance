import React, { createContext, useContext, useEffect, useState } from 'react';

export type MilitaryBranch = 
  | 'army' 
  | 'navy' 
  | 'air-force' 
  | 'marines' 
  | 'coast-guard' 
  | 'space-force' 
  | 'joint';

export type ThemeMode = 'light' | 'dark';

export interface ThemeSettings {
  branch: MilitaryBranch;
  mode: ThemeMode;
}

interface ThemeContextType {
  theme: ThemeSettings;
  setTheme: (theme: ThemeSettings) => void;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'major-finance-theme';

const defaultTheme: ThemeSettings = {
  branch: 'joint',
  mode: 'dark'
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeSettings>(defaultTheme);

  // Load theme from localStorage on mount
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme) {
        const parsed = JSON.parse(savedTheme) as ThemeSettings;
        setThemeState(parsed);
      }
    } catch (error) {
      console.error('Error loading theme from localStorage:', error);
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    
    // Remove all existing theme classes
    root.classList.remove(
      'light', 'dark',
      'theme-army', 'theme-navy', 'theme-air-force', 
      'theme-marines', 'theme-coast-guard', 'theme-space-force', 'theme-joint'
    );
    
    // Add current theme classes
    root.classList.add(theme.mode, `theme-${theme.branch}`);
    
    // Save to localStorage
    try {
      localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(theme));
    } catch (error) {
      console.error('Error saving theme to localStorage:', error);
    }
  }, [theme]);

  const setTheme = (newTheme: ThemeSettings) => {
    setThemeState(newTheme);
  };

  const toggleMode = () => {
    setThemeState(prev => ({
      ...prev,
      mode: prev.mode === 'light' ? 'dark' : 'light'
    }));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Theme metadata for UI
export const MILITARY_THEMES = {
  joint: {
    name: 'Joint Forces',
    description: 'Professional military standard',
    icon: '🎖️'
  },
  army: {
    name: 'U.S. Army',
    description: 'Army green and gold',
    icon: '🪖'
  },
  navy: {
    name: 'U.S. Navy',
    description: 'Navy blue and gold',
    icon: '⚓'
  },
  'air-force': {
    name: 'U.S. Air Force',
    description: 'Air Force blue and silver',
    icon: '✈️'
  },
  marines: {
    name: 'U.S. Marines',
    description: 'Marine red and gold',
    icon: '🦅'
  },
  'coast-guard': {
    name: 'U.S. Coast Guard',
    description: 'Coast Guard blue and orange',
    icon: '🚢'
  },
  'space-force': {
    name: 'U.S. Space Force',
    description: 'Space Force delta and silver',
    icon: '🚀'
  }
} as const;