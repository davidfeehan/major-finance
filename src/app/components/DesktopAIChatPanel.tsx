import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { AIChatbot } from './AIChatbot';
import { Bot, X, ChevronRight, ChevronLeft, MessageCircle } from 'lucide-react';
import { useTheme, MILITARY_THEMES } from './ThemeProvider';

interface UserContext {
  rank: string;
  yearsOfService: string;
  currentAge: string;
  branch: string;
  completedMissions: number;
  xp: number;
  retirementGoal?: string;
  desiredRetirementAge?: string;
}

interface AgentConfig {
  name: string;
  description: string;
  suggestions: string[];
  responses: Record<string, string>;
  missionType: string;
}

const SCREEN_AGENTS: Record<string, AgentConfig> = {
  'dashboard': {
    name: 'Command AI',
    description: 'Your strategic financial command center assistant',
    suggestions: [
      'Show me my financial progress',
      'What mission should I tackle next?',
      'How can I increase my XP?',
      'Explain my retirement readiness'
    ],
    responses: {
      'progress': 'Great question! Let me review your current financial progress.',
      'mission': 'Based on your profile, I recommend focusing on missions that align with your goals.',
      'xp': 'You can earn XP by completing missions and achieving financial milestones!'
    },
    missionType: 'Strategic Command'
  },
  'retirement-planning': {
    name: 'Retirement AI',
    description: 'Your dedicated retirement planning specialist',
    suggestions: [
      'Optimize my TSP strategy',
      'When can I retire?',
      'Calculate my pension',
      'Review my retirement goals'
    ],
    responses: {
      'optimize': 'Let me help you optimize your TSP contribution strategy for maximum returns.',
      'retire': 'Based on your profile, let me calculate your potential retirement timeline.',
      'pension': 'Your military pension is a key part of your retirement income. Let me break it down.'
    },
    missionType: 'Retirement Planning'
  },
  'retirement-calculator': {
    name: 'Calculator AI',
    description: 'Your retirement calculation specialist',
    suggestions: [
      'Explain my results',
      'What if I save more?',
      'How does inflation affect me?',
      'Adjust my strategy'
    ],
    responses: {
      'results': 'Let me explain your retirement calculation results in detail.',
      'save': 'Increasing your savings rate can significantly impact your retirement timeline.'
    },
    missionType: 'Financial Analysis'
  },
  'banking': {
    name: 'Banking AI',
    description: 'Your military banking and account specialist',
    suggestions: [
      'Best military banks?',
      'Account recommendations',
      'Savings strategies',
      'Credit card options'
    ],
    responses: {
      'banks': 'Military-friendly banks like Navy Federal and USAA offer excellent benefits.',
      'accounts': 'Let me recommend account types based on your financial goals.'
    },
    missionType: 'Banking Services'
  },
  'emergency-fund': {
    name: 'Shield AI',
    description: 'Your emergency fund protection specialist',
    suggestions: [
      'How much should I save?',
      'Where to keep emergency funds?',
      'Build my fund faster?',
      'Emergency fund calculator'
    ],
    responses: {
      'save': 'Aim for 3-6 months of expenses in your emergency fund for optimal protection.',
      'keep': 'Keep emergency funds in a high-yield savings account for easy access.'
    },
    missionType: 'Financial Protection'
  },
  'investment-basics': {
    name: 'Investment AI',
    description: 'Your investment education specialist',
    suggestions: [
      'Investment basics',
      'Asset allocation',
      'Risk tolerance',
      'Portfolio strategy'
    ],
    responses: {
      'basics': 'Let me explain the fundamentals of investing for long-term wealth building.',
      'allocation': 'Asset allocation depends on your age, goals, and risk tolerance.'
    },
    missionType: 'Investment Education'
  },
  'tsp-optimization': {
    name: 'TSP Expert AI',
    description: 'Your TSP optimization specialist',
    suggestions: [
      'Maximize TSP matching',
      'Fund allocation strategy',
      'Roth vs Traditional',
      'Contribution limits'
    ],
    responses: {
      'matching': 'Always contribute at least 5% to get full employer matching in TSP.',
      'allocation': 'Your TSP fund allocation should align with your retirement timeline and risk tolerance.'
    },
    missionType: 'TSP Optimization'
  },
  'financial-education': {
    name: 'Education AI',
    description: 'Your financial education specialist',
    suggestions: [
      'Financial literacy basics',
      'Budgeting tips',
      'Debt management',
      'Credit score help'
    ],
    responses: {
      'literacy': 'Financial literacy is the foundation of long-term financial success.',
      'budgeting': 'The 50/30/20 rule is a great budgeting framework to start with.'
    },
    missionType: 'Financial Education'
  },
  'missions': {
    name: 'Mission AI',
    description: 'Your mission command specialist',
    suggestions: [
      'Recommend missions for me',
      'Mission difficulty',
      'Best order for missions',
      'Mission rewards'
    ],
    responses: {
      'recommend': 'Based on your profile, here are the missions that will provide the most value.',
      'difficulty': 'Let me assess mission difficulty based on your experience level.'
    },
    missionType: 'Mission Command'
  },
  'progress': {
    name: 'Progress AI',
    description: 'Your achievement tracking specialist',
    suggestions: [
      'Analyze my progress',
      'Achievement strategies',
      'Earn more XP',
      'Set new goals'
    ],
    responses: {
      'analyze': 'Let me provide detailed analysis of your financial progress and achievements.',
      'xp': 'You can boost your XP through mission completion and consistent financial habits.'
    },
    missionType: 'Progress Tracking'
  },
  'profile': {
    name: 'Profile AI',
    description: 'Your profile management assistant',
    suggestions: [
      'Update my information',
      'Career progression',
      'Financial goals',
      'Service history'
    ],
    responses: {
      'update': 'Keep your profile current to receive personalized financial guidance.',
      'goals': 'Setting clear financial goals helps track progress and stay motivated.'
    },
    missionType: 'Profile Management'
  },
  'settings': {
    name: 'Settings AI',
    description: 'Your app configuration assistant',
    suggestions: [
      'Customize my experience',
      'Notification preferences',
      'Theme selection',
      'Privacy settings'
    ],
    responses: {
      'customize': 'Let me help you configure the app for the best user experience.',
      'theme': 'Your branch theme enhances your personalized experience.'
    },
    missionType: 'App Configuration'
  },
  'help': {
    name: 'Support AI',
    description: 'Your dedicated support specialist',
    suggestions: [
      'How to use this app?',
      'Troubleshooting issues',
      'Feature explanations',
      'Getting started guide'
    ],
    responses: {
      'use': 'Let me provide a comprehensive guide to using Major Finance effectively.',
      'troubleshooting': 'I can help resolve common issues and technical problems.'
    },
    missionType: 'Support Center'
  }
};

const DEFAULT_AGENT: AgentConfig = {
  name: 'Major Finance AI',
  description: 'Your personal military financial assistant',
  suggestions: [
    'Help me get started',
    'Explain military finances',
    'What should I focus on?',
    'How does this app work?'
  ],
  responses: {},
  missionType: 'General Guidance'
};

interface DesktopAIChatPanelProps {
  currentScreen: string;
  userContext?: UserContext;
}

export function DesktopAIChatPanel({ currentScreen, userContext }: DesktopAIChatPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const { currentTheme, theme } = useTheme();
  
  // Get agent configuration
  const agentConfig = SCREEN_AGENTS[currentScreen] || DEFAULT_AGENT;
  const themeInfo = MILITARY_THEMES[currentTheme as keyof typeof MILITARY_THEMES] || MILITARY_THEMES.joint;

  // Load saved state
  useEffect(() => {
    const savedOpen = localStorage.getItem('desktop-ai-panel-open');
    const savedCollapsed = localStorage.getItem('desktop-ai-panel-collapsed');
    if (savedOpen === 'true') setIsOpen(true);
    if (savedCollapsed === 'true') setIsCollapsed(true);
  }, []);

  // Save state
  const handleToggleOpen = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    localStorage.setItem('desktop-ai-panel-open', String(newState));
    if (newState) {
      setIsCollapsed(false);
      localStorage.setItem('desktop-ai-panel-collapsed', 'false');
    }
  };

  const handleToggleCollapsed = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem('desktop-ai-panel-collapsed', String(newState));
  };

  // Hide on certain screens
  const hiddenScreens = ['auth', 'onboarding', 'xp-notification'];
  if (hiddenScreens.includes(currentScreen)) {
    return null;
  }

  // Collapsed state - just a tab on the right edge
  if (!isOpen) {
    return (
      <Button
        onClick={handleToggleOpen}
        className={`fixed right-0 top-1/2 -translate-y-1/2 rounded-r-none rounded-l-lg shadow-lg z-40 ${themeInfo.gradient} text-white h-32 w-12 flex flex-col items-center justify-center gap-2 hover:w-14 transition-all duration-200`}
        title="Open AI Assistant"
      >
        <MessageCircle className="w-5 h-5" />
        <div className="writing-mode-vertical text-xs font-semibold">AI Chat</div>
        <div className="w-2 h-2 bg-green-500 rounded-full border border-white animate-pulse"></div>
      </Button>
    );
  }

  return (
    <div 
      className={`fixed right-0 top-0 h-screen bg-sidebar border-l border-sidebar-border shadow-2xl z-40 transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-16' : 'w-96'
      }`}
    >
      {isCollapsed ? (
        // Collapsed sidebar view
        <div className="h-full flex flex-col items-center py-4 gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleToggleCollapsed}
            className="w-10 h-10 p-0"
            title="Expand AI Panel"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${themeInfo.gradient} relative`}>
            <Bot className="w-5 h-5 text-white" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-sidebar animate-pulse"></div>
          </div>
          
          <div className="flex-1"></div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleToggleOpen}
            className="w-10 h-10 p-0 text-destructive hover:bg-destructive/10"
            title="Close AI Panel"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        // Expanded panel view
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="border-b border-sidebar-border bg-gradient-to-r from-primary/5 to-transparent p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm ${themeInfo.gradient} relative`}>
                  <Bot className="w-5 h-5 text-white" />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-sidebar animate-pulse"></div>
                </div>
                <div>
                  <div className="font-semibold text-sidebar-foreground flex items-center gap-2">
                    {agentConfig.name}
                  </div>
                  <div className="text-xs text-sidebar-foreground/70">
                    {agentConfig.description}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleToggleCollapsed}
                  className="h-8 w-8 p-0"
                  title="Collapse Panel"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleToggleOpen}
                  className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10"
                  title="Close Panel"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <Badge variant="secondary" className="text-xs">
              {agentConfig.missionType}
            </Badge>
          </div>

          {/* Chat Content */}
          <div className="flex-1 overflow-hidden">
            <AIChatbot
              missionType={agentConfig.missionType}
              agentName={agentConfig.name}
              agentDescription={agentConfig.description}
              quickSuggestions={agentConfig.suggestions}
              responses={agentConfig.responses}
              userContext={userContext || {
                rank: '',
                yearsOfService: '',
                currentAge: '',
                branch: theme.branch,
                completedMissions: 0,
                xp: 0
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default DesktopAIChatPanel;
