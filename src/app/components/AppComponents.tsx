import React from 'react';

// Re-export all components with proper React.memo for performance
import { OnboardingFlow as OnboardingFlowBase } from './OnboardingFlow';
import { Dashboard as DashboardBase } from './Dashboard';
import { RetirementPlanning as RetirementPlanningBase } from './RetirementPlanning';
import { RetirementCalculator as RetirementCalculatorBase } from './RetirementCalculator';
import { EmergencyFundMission as EmergencyFundMissionBase } from './EmergencyFundMission';
import { InvestmentMission as InvestmentMissionBase } from './InvestmentMission';
import { TSPMission as TSPMissionBase } from './TSPMission';
import { FinancialEducationMission as FinancialEducationMissionBase } from './FinancialEducationMission';
import { ProfileScreen as ProfileScreenBase } from './ProfileScreen';
import { SettingsScreen as SettingsScreenBase } from './SettingsScreen';
import { HelpScreen as HelpScreenBase } from './HelpScreen';
import { ProgressScreen as ProgressScreenBase } from './ProgressScreen';
import { MissionsScreen as MissionsScreenBase } from './MissionsScreen';
import { BottomNavigation as BottomNavigationBase } from './BottomNavigation';
import { MissionCompletionModal as MissionCompletionModalBase } from './MissionCompletionModal';
import { AuthFlow as AuthFlowBase } from './AuthFlow';

// Memoized components for better performance
export const OnboardingFlow = React.memo(OnboardingFlowBase);
export const Dashboard = React.memo(DashboardBase);
export const RetirementPlanning = React.memo(RetirementPlanningBase);
export const RetirementCalculator = React.memo(RetirementCalculatorBase);
export const EmergencyFundMission = React.memo(EmergencyFundMissionBase);
export const InvestmentMission = React.memo(InvestmentMissionBase);
export const TSPMission = React.memo(TSPMissionBase);
export const FinancialEducationMission = React.memo(FinancialEducationMissionBase);
export const ProfileScreen = React.memo(ProfileScreenBase);
export const SettingsScreen = React.memo(SettingsScreenBase);
export const HelpScreen = React.memo(HelpScreenBase);
export const ProgressScreen = React.memo(ProgressScreenBase);
export const MissionsScreen = React.memo(MissionsScreenBase);
export const BottomNavigation = React.memo(BottomNavigationBase);
export const MissionCompletionModal = React.memo(MissionCompletionModalBase);
export const AuthFlow = React.memo(AuthFlowBase);