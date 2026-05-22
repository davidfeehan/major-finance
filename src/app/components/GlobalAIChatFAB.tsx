import React, { useState, useEffect, useCallback } from 'react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Badge } from './ui/badge';
import { AIChatbot } from './AIChatbot';
import { Bot, MessageCircle, X, ChevronDown, ChevronUp } from 'lucide-react';
import { useTheme, MILITARY_THEMES } from './ThemeProvider';
import { useMediaQuery } from '../hooks/useMediaQuery';

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

// Preset heights for quick sizing
const PRESET_HEIGHTS = {
  compact: 300,
  medium: 500,
  large: 0.75 // 75% of viewport height
};

interface GlobalAIChatFABProps {
  currentScreen: string;
  userContext?: UserContext;
}

export function GlobalAIChatFAB({ currentScreen, userContext }: GlobalAIChatFABProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [heightMode, setHeightMode] = useState<'compact' | 'medium' | 'large'>('medium');
  
  const { currentTheme, theme } = useTheme();
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  
  // Get agent configuration with safety
  const agentConfig = SCREEN_AGENTS[currentScreen] || DEFAULT_AGENT;
  const themeInfo = MILITARY_THEMES[currentTheme as keyof typeof MILITARY_THEMES] || MILITARY_THEMES.joint;

  // Calculate actual height based on mode
  const getHeight = useCallback(() => {
    const height = PRESET_HEIGHTS[heightMode];
    if (typeof height === 'number' && height < 1) {
      return window.innerHeight * height;
    }
    return height as number;
  }, [heightMode]);

  // Save height preference
  useEffect(() => {
    const saved = localStorage.getItem('ai-chat-height');
    if (saved && ['compact', 'medium', 'large'].includes(saved)) {
      setHeightMode(saved as 'compact' | 'medium' | 'large');
    }
  }, []);

  const handleHeightChange = (mode: 'compact' | 'medium' | 'large') => {
    setHeightMode(mode);
    localStorage.setItem('ai-chat-height', mode);
  };

  // Hide FAB on certain screens
  const hiddenScreens = ['auth', 'onboarding', 'xp-notification'];
  if (hiddenScreens.includes(currentScreen)) {
    return null;
  }

  // Desktop: Side panel (rendered in App.tsx layout, not here)
  // This component only handles mobile/tablet sheet mode
  if (isDesktop) {
    return null; // Desktop uses integrated side panel
  }

  // Mobile/Tablet: Bottom sheet with FAB
  return (
    <div className="scroll-hint-trigger">
      <div className="GlobalAIChatFAB">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              size="lg"
              className={`w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group relative ${
                isOpen 
                  ? 'scale-110 bg-gradient-to-br from-red-500 to-red-600' 
                  : 'hover:scale-105 bg-gradient-to-br from-primary to-primary/80'
              } border-2 border-primary/20`}
              title={isOpen ? 'Close AI Assistant' : 'Open AI Assistant'}
            >
              {isOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <div className="relative">
                  <MessageCircle className="w-6 h-6 text-white" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                </div>
              )}
            </Button>
          </SheetTrigger>
          
          <SheetContent 
            side="bottom" 
            hideCloseButton={true}
            className="p-0 border-t-4 border-t-primary ai-chat-sheet slide-up-from-nav no-overlay-blocking"
            style={{ height: `${getHeight()}px` }}
            onInteractOutside={(e) => e.preventDefault()}
            onEscapeKeyDown={(e) => e.preventDefault()}
          >
            <SheetHeader className="pt-4 pb-3 px-4 border-b bg-gradient-to-r from-primary/5 to-transparent">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm ${themeInfo.gradient}`}>
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <SheetTitle className="flex items-center gap-2 flex-wrap">
                      {agentConfig.name}
                      <Badge variant="secondary" className="text-xs">
                        {agentConfig.missionType}
                      </Badge>
                    </SheetTitle>
                    <SheetDescription className="text-sm">
                      {agentConfig.description}
                    </SheetDescription>
                  </div>
                </div>
                
                <div className="flex items-center gap-1">
                  {/* Quick height buttons */}
                  <div className="flex items-center gap-0.5 mr-2 bg-muted/50 rounded-md p-0.5">
                    <Button
                      variant={heightMode === 'compact' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => handleHeightChange('compact')}
                      className="h-7 w-7 p-0 text-xs"
                      title="Compact view"
                    >
                      <ChevronDown className="w-3 h-3" />
                    </Button>
                    <Button
                      variant={heightMode === 'medium' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => handleHeightChange('medium')}
                      className="h-7 w-7 p-0 text-xs"
                      title="Medium view"
                    >
                      ━
                    </Button>
                    <Button
                      variant={heightMode === 'large' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => handleHeightChange('large')}
                      className="h-7 w-7 p-0 text-xs"
                      title="Large view"
                    >
                      <ChevronUp className="w-3 h-3" />
                    </Button>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10"
                    title="Close"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </SheetHeader>

            {/* Chat Content */}
            <div className="overflow-hidden" style={{ height: `calc(${getHeight()}px - 80px)` }}>
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
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

export default GlobalAIChatFAB;
