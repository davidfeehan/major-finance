import React, { createContext, useContext, ReactNode } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useUserData } from '../hooks/useUserData';
import { useMissions } from '../hooks/useMissions';
import { useAppLayout } from '../hooks/useAppLayout';

interface AppContextType {
  auth: ReturnType<typeof useAuth>;
  userData: ReturnType<typeof useUserData>;
  missions: ReturnType<typeof useMissions>;
  layout: ReturnType<typeof useAppLayout>;
}

const AppContext = createContext<AppContextType | null>(null);

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
}

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const auth = useAuth();
  const userData = useUserData();
  const missions = useMissions();
  const layout = useAppLayout();

  const value = {
    auth,
    userData,
    missions,
    layout,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}