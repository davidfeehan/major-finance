import React from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { RetryableLoading } from './components/LoadingStates';
import { ThemeProvider } from './components/ThemeProvider';
import { AppProvider } from './contexts/AppContext';
import { AppRouter } from './components/AppRouter';
import { AppLayout } from './components/AppLayout';
import { useAppInitialization } from './hooks/useAppInitialization';
import { useAppHandlers } from './hooks/useAppHandlers';

function AppCore() {
  const {
    currentScreen,
    setCurrentScreen,
    showNavigation,
    isAppLoading,
  } = useAppInitialization();

  const handlers = useAppHandlers(setCurrentScreen);

  return (
    <RetryableLoading
      isLoading={isAppLoading}
      error={null} // Don't block app for background loading errors
      onRetry={() => {
        // Retry logic can be moved to a separate handler if needed
        window.location.reload();
      }}
    >
      <AppLayout
        currentScreen={currentScreen}
        onNavigate={handlers.handleNavigate}
        showNavigation={showNavigation}
      >
        <AppRouter
          currentScreen={currentScreen}
          onNavigate={handlers.handleNavigate}
          onAuthenticated={handlers.handleAuthenticated}
          onOnboardingComplete={handlers.handleOnboardingComplete}
          onMissionSelect={handlers.handleMissionSelect}
          onReturnToDashboard={handlers.handleReturnToDashboard}
          onRetirementCalculate={handlers.handleRetirementCalculate}
          onMissionComplete={handlers.handleMissionComplete}
          onSetReminder={handlers.handleSetReminder}
          onUpdateProfile={handlers.handleUpdateProfile}
          onSignOut={handlers.handleSignOut}
        />
      </AppLayout>
    </RetryableLoading>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AppProvider>
          <AppCore />
        </AppProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}