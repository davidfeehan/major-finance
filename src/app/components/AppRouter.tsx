import React from 'react';
import { MissionErrorBoundary } from './ErrorBoundary';
import { useAppContext } from '../contexts/AppContext';
import { AppScreen } from '../constants';
import { checkDeveloperMode } from '../hooks/useDeveloperMode';

// Direct imports instead of lazy loading to avoid suspension issues
import { OnboardingFlow } from './OnboardingFlow';
import Dashboard from './Dashboard';
import { RetirementPlanning } from './RetirementPlanning';
import { RetirementCalculator } from './RetirementCalculator';
import { EmergencyFundMission } from './EmergencyFundMission';
import { InvestmentMission } from './InvestmentMission';
import { TSPMission } from './TSPMission';
import { FinancialEducationMission } from './FinancialEducationMission';
import { BudgetMission } from './BudgetMission';
import { StocksFundamentalsMission } from './StocksFundamentalsMission';
import { BondsFixedIncomeMission } from './BondsFixedIncomeMission';
import { CommoditiesTradingMission } from './CommoditiesTradingMission';
import { AssetAllocationMission } from './AssetAllocationMission';
import { MarketAnalysisMission } from './MarketAnalysisMission';
import { GovernmentTradingTracker } from './GovernmentTradingTracker';
import BankingScreen from './BankingScreen';
import { ProfileScreen } from './ProfileScreen';
import { SettingsScreen } from './SettingsScreen';
import { HelpScreen } from './HelpScreen';
import { ProgressScreen } from './ProgressScreen';
import { MissionsScreen } from './MissionsScreen';
import { CareerMapScreen } from './CareerMapScreen';
import { AuthFlow } from './AuthFlow';
import { DemoInterstitial } from './DemoInterstitial';
import { DesktopLayoutTest } from './DesktopLayoutTest';

interface AppRouterProps {
  currentScreen: AppScreen;
  onNavigate: (screen: string) => void;
  onAuthenticated: (token: string) => void;
  onOnboardingComplete: (data: any) => void;
  onMissionSelect: (missionId: string) => void;
  onReturnToDashboard: () => void;
  onRetirementCalculate: (data: any) => void;
  onMissionComplete: (missionType: string, xpReward?: number) => void;
  onSetReminder: () => void;
  onUpdateProfile: (profileData: any) => void;
  onSignOut: () => void;
}

// Mission wrapper component to reduce duplication
function MissionWrapper({ 
  children, 
  onBack 
}: { 
  children: React.ReactNode; 
  onBack: () => void;
}) {
  return (
    <MissionErrorBoundary onBack={onBack}>
      {children}
    </MissionErrorBoundary>
  );
}

export function AppRouter({
  currentScreen,
  onNavigate,
  onAuthenticated,
  onOnboardingComplete,
  onMissionSelect,
  onReturnToDashboard,
  onRetirementCalculate,
  onMissionComplete,
  onSetReminder,
  onUpdateProfile,
  onSignOut,
}: AppRouterProps) {
  const { auth, userData, missions } = useAppContext();

  // Calculate level info for XP notification
  const levelInfo = missions.calculateLevelUp(
    userData.userData.xp - missions.currentXPReward,
    userData.userData.xp
  );

  // Common props for mission components
  const commonMissionProps = {
    onBack: onReturnToDashboard,
    userContext: userData.userData,
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'auth':
        return <AuthFlow onAuthenticated={onAuthenticated} onNavigate={onNavigate} />;
      
      case 'demo-interstitial':
        return <DemoInterstitial onContinue={() => onAuthenticated('demo-token-offline-mode')} />;
        
      case 'onboarding':
        // Only show onboarding for non-demo users
        if (auth.isDemo) {
          return (
            <Dashboard 
              userData={userData.userData} 
              onMissionSelect={onMissionSelect}
              isDemo={auth.isDemo}
            />
          );
        }
        return <OnboardingFlow onComplete={onOnboardingComplete} />;
      
      case 'dashboard':
        return (
          <Dashboard 
            userData={userData.userData} 
            onMissionSelect={onMissionSelect}
            isDemo={auth.isDemo}
          />
        );
      
      case 'retirement-planning':
        return (
          <RetirementPlanning
            onBack={onReturnToDashboard}
            onCalculate={onRetirementCalculate}
            initialData={{
              currentAge: userData.userData.currentAge,
              retirementAge: userData.userData.desiredRetirementAge
            }}
          />
        );
      
      case 'retirement-calculator':
        return (
          <RetirementCalculator
            onBack={() => onNavigate('retirement-planning')}
            onCompleteMission={() => onMissionComplete('Retirement Planning', 250)}
            retirementData={userData.retirementData}
          />
        );

      case 'emergency-fund':
        return (
          <MissionWrapper onBack={onReturnToDashboard}>
            <EmergencyFundMission
              {...commonMissionProps}
              onComplete={() => onMissionComplete('Emergency Fund', 150)}
            />
          </MissionWrapper>
        );

      case 'investment-basics':
        return (
          <MissionWrapper onBack={onReturnToDashboard}>
            <InvestmentMission
              {...commonMissionProps}
              onComplete={() => onMissionComplete('Investment Training', 200)}
            />
          </MissionWrapper>
        );

      case 'tsp-optimization':
        return (
          <MissionWrapper onBack={onReturnToDashboard}>
            <TSPMission
              {...commonMissionProps}
              onComplete={() => onMissionComplete('TSP Optimization', 300)}
            />
          </MissionWrapper>
        );

      case 'financial-education':
        return (
          <MissionWrapper onBack={onReturnToDashboard}>
            <FinancialEducationMission
              {...commonMissionProps}
              onComplete={() => onMissionComplete('Financial Education', 100)}
            />
          </MissionWrapper>
        );

      case 'budget-creation':
        return (
          <MissionWrapper onBack={onReturnToDashboard}>
            <BudgetMission
              {...commonMissionProps}
              onComplete={() => onMissionComplete('Create a Budget', 100)}
              isDemo={auth.isDemo}
            />
          </MissionWrapper>
        );

      case 'stocks-fundamentals':
        return (
          <MissionWrapper onBack={onReturnToDashboard}>
            <StocksFundamentalsMission
              {...commonMissionProps}
              onComplete={() => onMissionComplete('Stocks Fundamentals', 250)}
            />
          </MissionWrapper>
        );

      case 'bonds-fixed-income':
        return (
          <MissionWrapper onBack={onReturnToDashboard}>
            <BondsFixedIncomeMission
              {...commonMissionProps}
              onComplete={() => onMissionComplete('Bonds & Fixed Income', 250)}
            />
          </MissionWrapper>
        );

      case 'commodities-trading':
        return (
          <MissionWrapper onBack={onReturnToDashboard}>
            <CommoditiesTradingMission
              {...commonMissionProps}
              onComplete={() => onMissionComplete('Commodities Trading', 250)}
            />
          </MissionWrapper>
        );

      case 'asset-allocation':
        return (
          <MissionWrapper onBack={onReturnToDashboard}>
            <AssetAllocationMission
              {...commonMissionProps}
              onComplete={() => onMissionComplete('Asset Allocation', 300)}
            />
          </MissionWrapper>
        );

      case 'market-analysis':
        return (
          <MissionWrapper onBack={onReturnToDashboard}>
            <MarketAnalysisMission
              {...commonMissionProps}
              onComplete={() => onMissionComplete('Market Analysis', 300)}
            />
          </MissionWrapper>
        );

      case 'government-trading-tracker':
        return (
          <GovernmentTradingTracker
            onBack={onReturnToDashboard}
            userContext={userData.userData}
          />
        );

      case 'banking':
        return (
          <BankingScreen
            onBack={onReturnToDashboard}
            userContext={userData.userData}
            isDemo={auth.isDemo}
            onNavigate={onNavigate}
          />
        );

      case 'profile':
        return (
          <ProfileScreen
            userData={userData.userData}
            onUpdateProfile={onUpdateProfile}
            isDemo={auth.isDemo}
          />
        );

      case 'settings':
        return (
          <SettingsScreen
            accessToken={auth.accessToken}
            isDemo={auth.isDemo}
            onSignOut={onSignOut}
            onNavigate={onNavigate}
          />
        );

      case 'help':
        return <HelpScreen />;

      case 'progress':
        return (
          <ProgressScreen
            userData={userData.userData}
            isDemo={auth.isDemo}
          />
        );

      case 'missions':
        return (
          <MissionsScreen
            userData={userData.userData}
            onMissionSelect={onMissionSelect}
            onNavigate={onNavigate}
            isDemo={auth.isDemo}
          />
        );

      case 'career-map':
        return (
          <CareerMapScreen
            userData={userData.userData}
            onMissionSelect={onMissionSelect}
            onBack={() => onNavigate('missions')}
            isDemo={auth.isDemo}
          />
        );

      case 'xp-notification':
        // XP notifications now show as modal overlays, not as a screen
        // Redirect to dashboard if somehow accessed directly
        return (
          <Dashboard 
            userData={userData.userData} 
            onMissionSelect={onMissionSelect} 
            isDemo={auth.isDemo}
          />
        );

      case 'desktop-layout-test':
        // Only accessible in developer mode
        if (!checkDeveloperMode()) {
          return (
            <Dashboard 
              userData={userData.userData} 
              onMissionSelect={onMissionSelect} 
              isDemo={auth.isDemo}
            />
          );
        }
        return (
          <DesktopLayoutTest
            onNavigate={onNavigate}
          />
        );
      
      default:
        return (
          <Dashboard 
            userData={userData.userData} 
            onMissionSelect={onMissionSelect} 
            isDemo={auth.isDemo} 
          />
        );
    }
  };

  return (
    <>
      {renderScreen()}
    </>
  );
}