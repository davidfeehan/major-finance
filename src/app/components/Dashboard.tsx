import React, { useState, useEffect, useMemo, memo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Target, 
  TrendingUp, 
  Shield, 
  PiggyBank, 
  BookOpen, 
  Award,
  Star,
  Clock,
  CreditCard,
  DollarSign,
  Building2,
  Calculator,
  Sparkles,
  ArrowRight,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  Lock
} from 'lucide-react';
import { BranchInfo, BranchMotivation, BRANCH_MESSAGES } from './BranchInfo';
import { useTheme, MILITARY_THEMES } from './ThemeProvider';
import { useBankingFeature } from '../hooks/useBankingFeature';
import { DemoModeIndicator } from './DemoModeIndicator';
import { SergeantMartinezTutorial } from './SergeantMartinezTutorial';
import { TutorialWalkthrough } from './TutorialWalkthrough';
import { CalculatorHub } from './CalculatorHub';
import { QuickStartGuide } from './QuickStartGuide';
import { MarketingBanner } from './MarketingBanner';

interface UserData {
  rank: string;
  yearsOfService: string;
  retirementGoal: string;
  currentAge: string;
  desiredRetirementAge: string;
  xp: number;
  completedMissions: number;
}

interface DashboardProps {
  userData: UserData;
  onMissionSelect: (mission: string) => void;
  isDemo?: boolean;
}

export function Dashboard({ userData, onMissionSelect, isDemo = false }: DashboardProps) {
  const { isBankingEnabled } = useBankingFeature();
  
  // Use Martinez's demo data if in demo mode
  const displayData = isDemo ? {
    checking: 8450,
    savings: 23200, // Emergency fund + goal fund
    tsp: 128450,
    investments: 45300,
    monthlyIncome: 6140,
    creditUtilization: 15.8,
    retirementEstYears: 8
  } : {
    checking: 8250,
    savings: 8500,
    tsp: 45230,
    investments: 0,
    monthlyIncome: 6485,
    creditUtilization: 42.5,
    retirementEstYears: 8
  };
  const [showTutorial, setShowTutorial] = useState(false);
  const [showWalkthrough, setShowWalkthrough] = useState(false);
  const [showCalculators, setShowCalculators] = useState(false);

  // Memoize tutorial check to prevent recalculation
  const shouldShowTutorial = useMemo(() => {
    const hasSeenTutorial = localStorage.getItem('major-finance-tutorial-completed');
    const isNewUser = userData.completedMissions === 0 && userData.xp < 200;
    return !hasSeenTutorial && isNewUser;
  }, [userData.completedMissions, userData.xp]);

  // Check if user should see walkthrough after story
  const shouldShowWalkthrough = useMemo(() => {
    const hasSeenWalkthrough = localStorage.getItem('major-finance-walkthrough-completed');
    const hasSeenTutorial = localStorage.getItem('major-finance-tutorial-completed');
    return hasSeenTutorial && !hasSeenWalkthrough;
  }, []);

  // Check if user should see tutorial - only on mount or when criteria changes
  useEffect(() => {
    if (shouldShowTutorial) {
      // Delay showing tutorial slightly for better UX
      const timer = setTimeout(() => {
        setShowTutorial(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (shouldShowWalkthrough) {
      // Show walkthrough after a brief delay if story is complete
      const timer = setTimeout(() => {
        setShowWalkthrough(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [shouldShowTutorial, shouldShowWalkthrough]);

  // Memoize missions array to prevent recreation on every render
  const missions = useMemo(() => [
    {
      id: 'retirement-planning',
      title: 'Retirement Planning',
      description: 'Plan your financial future with our advanced retirement calculator',
      icon: Target,
      status: 'available',
      xpReward: 250,
      difficulty: 'Intermediate',
      estimatedTime: '15 min',
      featured: true
    },
    {
      id: 'emergency-fund',
      title: 'Emergency Fund Mission',
      description: 'Build a solid financial foundation with emergency savings',
      icon: Shield,
      status: 'available',
      xpReward: 150,
      difficulty: 'Beginner',
      estimatedTime: '10 min',
      featured: false
    },
    {
      id: 'investment-basics',
      title: 'Investment Training',
      description: 'Learn the fundamentals of military-friendly investments',
      icon: TrendingUp,
      status: 'available', 
      xpReward: 200,
      difficulty: 'Intermediate',
      estimatedTime: '20 min',
      featured: false
    },
    {
      id: 'tsp-optimization',
      title: 'TSP Optimization',
      description: 'Maximize your Thrift Savings Plan contributions',
      icon: PiggyBank,
      status: userData.completedMissions >= 2 ? 'available' : 'locked',
      xpReward: 300,
      difficulty: 'Advanced',
      estimatedTime: '25 min',
      featured: false
    },
    {
      id: 'financial-education',
      title: 'Financial Education',
      description: 'Complete modules on military-specific financial topics',
      icon: BookOpen,
      status: 'available',
      xpReward: 100,
      difficulty: 'Beginner',
      estimatedTime: '30 min',
      featured: false
    }
  ], [userData.completedMissions]);

  // Memoize level calculations
  const levelInfo = useMemo(() => {
    const level = Math.floor(userData.xp / 500) + 1;
    const xpForNext = (level * 500) - userData.xp;
    const progress = ((userData.xp % 500) / 500) * 100;
    return { level, xpForNext, progress };
  }, [userData.xp]);

  const { level: userLevel, xpForNext: xpForNextLevel, progress: xpProgress } = levelInfo;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500';
      case 'Intermediate': return 'bg-yellow-500';
      case 'Advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const handleTutorialComplete = () => {
    setShowTutorial(false);
    // Show walkthrough after story completes
    setTimeout(() => {
      setShowWalkthrough(true);
    }, 500);
  };

  const handleTutorialSkip = () => {
    setShowTutorial(false);
    // Optionally show walkthrough even if story is skipped
    setTimeout(() => {
      setShowWalkthrough(true);
    }, 500);
  };

  const handleWalkthroughComplete = () => {
    setShowWalkthrough(false);
  };

  const handleWalkthroughSkip = () => {
    setShowWalkthrough(false);
  };

  return (
    <>
      {/* Sergeant Martinez Tutorial - Story/Inspiration (Shows First) */}
      {showTutorial && (
        <SergeantMartinezTutorial 
          onComplete={handleTutorialComplete}
          onSkip={handleTutorialSkip}
          userName={userData.rank}
          userRank={userData.rank}
        />
      )}

      {/* Interactive Walkthrough - UI Tour (Shows Second) */}
      {showWalkthrough && (
        <TutorialWalkthrough
          onComplete={handleWalkthroughComplete}
          onSkip={handleWalkthroughSkip}
        />
      )}

      {/* Demo Mode Indicator */}
      {isDemo && <DemoModeIndicator visible={isDemo} showSnapshot={true} />}
      
      <div className="min-h-full bg-background p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-10 md:space-y-12">
        
        {/* Mission Command - Unified Header */}
        <div className="animate-in fade-in duration-500">
          <div className="p-8 rounded-xl shadow-2xl border border-white/10 transition-all hover:shadow-3xl" style={{ background: 'var(--gradient-primary)' }}>
            {/* Mission Command Header */}
            <div className="space-y-6">
              {/* Identity Row */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                {/* Branch & User Info */}
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20 shadow-lg flex-shrink-0">
                    <span className="text-3xl">{(() => {
                      const { theme } = useTheme();
                      const branchInfo = MILITARY_THEMES[theme.branch];
                      return branchInfo.icon;
                    })()}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h1 className="text-white drop-shadow-lg tracking-tight">
                        {isDemo ? 'SSG Marcus Martinez - Mission Command' : 'Mission Command'}
                      </h1>
                      <Badge variant="secondary" className="text-xs bg-white/10 text-white/90 border-white/20">
                        {(() => {
                          const { theme } = useTheme();
                          return theme.mode === 'light' ? '☀️ Light' : '🌙 Dark';
                        })()}
                      </Badge>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-white/60" />
                        <span className="text-white/90 drop-shadow">{isDemo ? 'Staff Sergeant (E-6)' : userData.rank}</span>
                      </div>
                      <div className="hidden sm:block w-1 h-1 rounded-full bg-white/40"></div>
                      <div className="flex items-center gap-2">
                        <span className="text-white/80 drop-shadow">{(() => {
                          const { theme } = useTheme();
                          const branchInfo = MILITARY_THEMES[theme.branch];
                          return branchInfo.name;
                        })()}</span>
                      </div>
                      <div className="hidden sm:block w-1 h-1 rounded-full bg-white/40"></div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-white/60" />
                        <span className="text-white/80 drop-shadow">{userData.yearsOfService} years</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Compact Level Badge */}
                <div className="bg-white/10 backdrop-blur-md rounded-xl px-6 py-3 border border-white/20 shadow-xl flex items-center gap-4 lg:flex-shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center shadow-lg">
                      <Star className="w-5 h-5 text-yellow-900" />
                    </div>
                    <div>
                      <p className="text-xs text-white/60 uppercase tracking-wide">Level</p>
                      <p className="text-2xl text-white drop-shadow-md">{userLevel}</p>
                    </div>
                  </div>
                  <div className="w-px h-10 bg-white/20"></div>
                  <div>
                    <p className="text-xs text-white/60 uppercase tracking-wide">Total XP</p>
                    <p className="text-xl text-white drop-shadow-md">{userData.xp.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-white/70 uppercase tracking-wide">Progress to Level {userLevel + 1}</span>
                  <span className="text-xs text-white/80">{Math.round(xpProgress)}%  {xpForNextLevel} XP needed</span>
                </div>
                <div className="relative h-2.5 bg-white/15 rounded-full overflow-hidden backdrop-blur-sm border border-white/20">
                  <div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 rounded-full transition-all duration-500 shadow-lg"
                    style={{ width: `${xpProgress}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent"></div>
                  </div>
                </div>
              </div>

              {/* Motivation Quote */}
              <div className="border-t border-white/10 pt-4">
                <p className="text-sm text-white/90 drop-shadow italic text-center">
                  "{(() => {
                    const { theme } = useTheme();
                    const message = BRANCH_MESSAGES[theme.branch];
                    return message;
                  })()}"
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* FMA - Flexible Marketing Area */}
        <div className="animate-in fade-in duration-700 delay-100">
          <MarketingBanner 
            variant="premium"
            onAction={() => console.log('Premium upgrade clicked')}
            onDismiss={() => console.log('Banner dismissed')}
          />
        </div>

        {/* FINANCIAL OVERVIEW - Unified Section */}
        <div className="animate-in fade-in duration-700 delay-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2>Financial Overview</h2>
              <p className="text-sm text-muted-foreground mt-1">Your complete financial status and retirement planning</p>
            </div>
            {isBankingEnabled && (
              <Button 
                variant="outline" 
                onClick={() => onMissionSelect('banking')}
                className="gap-2"
              >
                Manage Accounts
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>

          {/* Current Financial Status */}
          <div className="space-y-5 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Total Balance Card */}
              {isBankingEnabled && (
                <Card className="card-elevated bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                          <DollarSign className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">Total Balance</CardTitle>
                          <CardDescription>Banking & Savings</CardDescription>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20">
                        Healthy
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-3xl text-green-600 dark:text-green-400">
                        ${(displayData.checking + displayData.savings).toLocaleString()}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div className="p-2.5 bg-background/50 rounded-lg border">
                          <div className="flex items-center gap-1.5 mb-1">
                            <Building2 className="w-3.5 h-3.5 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">Checking</span>
                          </div>
                          <p className="text-base">${displayData.checking.toLocaleString()}</p>
                        </div>
                        <div className="p-2.5 bg-background/50 rounded-lg border">
                          <div className="flex items-center gap-1.5 mb-1">
                            <PiggyBank className="w-3.5 h-3.5 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">Savings</span>
                          </div>
                          <p className="text-base">${displayData.savings.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* TSP & Retirement Card - NEW */}
              <Card className="card-elevated bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                        <Target className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Retirement Savings</CardTitle>
                        <CardDescription>TSP & Investments</CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20">
                      On Track
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-3xl text-blue-600 dark:text-blue-400">
                      ${(displayData.tsp + displayData.investments).toLocaleString()}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2.5 bg-background/50 rounded-lg border">
                        <div className="flex items-center gap-1.5 mb-1">
                          <TrendingUp className="w-3.5 h-3.5 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">TSP Balance</span>
                        </div>
                        <p className="text-base">${displayData.tsp.toLocaleString()}</p>
                      </div>
                      <div className="p-2.5 bg-background/50 rounded-lg border">
                        <div className="flex items-center gap-1.5 mb-1">
                          <Award className="w-3.5 h-3.5 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">Contribution</span>
                        </div>
                        <p className="text-base">{isDemo ? '15%' : '5%'} + 5%</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Secondary Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="card-elevated">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">Monthly Income</p>
                      <p className="text-xl">+${displayData.monthlyIncome.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Base + BAH + BAS</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-elevated">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">Credit Utilization</p>
                      <p className="text-xl">{displayData.creditUtilization}%</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{isDemo ? 'Excellent' : 'Good'} (under 50%)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-elevated">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">Retirement Est.</p>
                      <p className="text-xl">{displayData.retirementEstYears} years</p>
                      <p className="text-xs text-muted-foreground mt-0.5">At 20 years service</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* AI Insights - MOVED UP */}
          <div className="mb-8">
            <Card className="border-l-4 border-l-primary bg-primary/5">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 space-y-2">
                    {isDemo ? (
                      <>
                        <div>
                          <p className="text-sm">
                            <strong className="text-primary">AI Insight:</strong> Your emergency fund is at $18K (71% of 9-month goal). You're on track to reach $25.2K in 18 months.
                          </p>
                          <Button 
                            variant="link" 
                            className="h-auto p-0 text-primary text-sm mt-1"
                            onClick={() => onMissionSelect('emergency-fund')}
                          >
                            Review emergency fund progress →
                          </Button>
                        </div>
                        <div className="pt-2 border-t border-primary/20">
                          <p className="text-sm">
                            <strong className="text-primary">Retirement Planning:</strong> You're 65% complete with retirement planning. Finish to unlock your full 20-year transition strategy with $7,044/month projected income.
                          </p>
                          <Button 
                            variant="link" 
                            className="h-auto p-0 text-primary text-sm mt-1"
                            onClick={() => onMissionSelect('retirement-planning')}
                          >
                            Complete retirement plan →
                          </Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <p className="text-sm">
                            <strong className="text-primary">AI Insight:</strong> You could save $120/month by using the commissary more often for groceries.
                          </p>
                          <Button 
                            variant="link" 
                            className="h-auto p-0 text-primary text-sm mt-1"
                            onClick={() => onMissionSelect('budget-creation')}
                          >
                            Create a budget to track this →
                          </Button>
                        </div>
                        <div className="pt-2 border-t border-primary/20">
                          <p className="text-sm">
                            <strong className="text-primary">TSP Recommendation:</strong> Increase contribution to 10% to maximize retirement at 20 years. Projected balance: $89,450
                          </p>
                          <Button 
                            variant="link" 
                            className="h-auto p-0 text-primary text-sm mt-1"
                            onClick={() => onMissionSelect('tsp-optimization')}
                          >
                            Optimize my TSP →
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Financial Planning Tools - REORDERED BY PRIORITY */}
          <div className="border-t border-border/50 pt-8">
            <div className="mb-6">
              <h3 className="text-base mb-1">Planning & Tools</h3>
              <p className="text-sm text-muted-foreground">Calculate and optimize your financial future</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* 1. Retirement Calculator - PRIORITY 1 */}
              <Card className="card-elevated hover:border-primary/50 transition-all cursor-pointer group">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                      <Calculator className="w-5 h-5 text-white" />
                    </div>
                    <Badge variant="secondary" className="text-xs">Most Used</Badge>
                  </div>
                  <CardTitle className="text-base group-hover:text-primary transition-colors">
                    Retirement Calculator
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Project retirement at 20 years with pension + TSP
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-xs text-muted-foreground">
                    <span className="text-primary">Projected at 20 yrs:</span> {isDemo ? '$845K' : '$2.3M'}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    onClick={() => onMissionSelect('retirement-planning')}
                  >
                    {isDemo ? 'View Progress (65%)' : 'Calculate Now'}
                  </Button>
                </CardContent>
              </Card>

              {/* 2. TSP Optimizer - PRIORITY 2 */}
              <Card className="card-elevated hover:border-primary/50 transition-all cursor-pointer group">
                <CardHeader className="pb-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-2">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <CardTitle className="text-base group-hover:text-primary transition-colors">
                    TSP Optimizer
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Maximize your Thrift Savings Plan benefits & match
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-xs text-muted-foreground">
                    <span className="text-primary">Current rate:</span> {isDemo ? '15%' : '5%'} + 5% match
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    disabled={!isDemo && userData.completedMissions < 2}
                    onClick={() => onMissionSelect('tsp-optimization')}
                  >
                    {isDemo ? 'View Details ⭐⭐⭐⭐' : (userData.completedMissions < 2 ? 'Complete 2 Missions' : 'Optimize Now')}
                  </Button>
                </CardContent>
              </Card>

              {/* 3. Emergency Fund - PRIORITY 3 */}
              <Card className="card-elevated hover:border-primary/50 transition-all cursor-pointer group">
                <CardHeader className="pb-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-2">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <CardTitle className="text-base group-hover:text-primary transition-colors">
                    Emergency Fund
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Calculate your ideal emergency savings target
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-xs text-muted-foreground">
                    <span className="text-primary">{isDemo ? 'Current:' : 'Recommended:'}</span> {isDemo ? '$18K (71%)' : '6 months expenses'}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    onClick={() => onMissionSelect('emergency-fund')}
                  >
                    {isDemo ? 'View Details ⭐⭐⭐' : 'Calculate Target'}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Unlocked Tools - Shows when all 12 missions are complete */}
          {userData.completedMissions >= 12 && (
            <div className="border-t border-border/50 pt-8 mt-8">
              <div className="mb-6">
                <div className="flex items-center gap-2">
                  <h3 className="text-base mb-1">🔓 Unlocked Advanced Tools</h3>
                  <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    All Missions Complete
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">Exclusive tools unlocked by completing all investment missions</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Government Trading Tracker */}
                <Card className="card-elevated hover:border-primary/50 transition-all cursor-pointer group border-2 border-green-500/30 bg-green-500/5">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-white" />
                      </div>
                      <Badge className="text-xs bg-green-500 text-white">NEW</Badge>
                    </div>
                    <CardTitle className="text-base group-hover:text-primary transition-colors">
                      Government Trading Tracker
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Track Congress & Senate stock trades in real-time
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="text-xs text-muted-foreground">
                      <span className="text-green-600 dark:text-green-400">Track 500+ trades</span> from government officials
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full group-hover:bg-green-500 group-hover:text-white transition-colors border-green-500"
                      onClick={() => onMissionSelect('government-trading-tracker')}
                    >
                      Open Tracker →
                    </Button>
                  </CardContent>
                </Card>

                {/* Placeholder for future tool */}
                <Card className="card-elevated opacity-60">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                        <Lock className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <Badge variant="outline" className="text-xs">Coming Soon</Badge>
                    </div>
                    <CardTitle className="text-base text-muted-foreground">
                      More Tools Coming
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Additional advanced features will unlock here
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full"
                      disabled
                    >
                      Locked
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>

        {/* Quick Start Guide (for new/early users) */}
        {userData.completedMissions < 3 && (
          <div className="animate-in fade-in duration-700 delay-300">
            <QuickStartGuide 
              userData={userData}
              onActionClick={(actionId) => onMissionSelect(actionId)}
            />
          </div>
        )}

        {/* Missions - Unified Section */}
        <div className="animate-in fade-in duration-700 delay-300">
          <div className="flex items-center justify-between mb-8">
            <h2>Missions</h2>
            <Button
              variant="outline"
              onClick={() => onMissionSelect('missions')}
              className="gap-2"
            >
              View All Missions
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Featured Mission - Full Width */}
          <div className="mb-8">
            {missions
              .filter(mission => mission.featured)
              .map(mission => {
                const Icon = mission.icon;
                return (
                  <Card key={mission.id} className="border-2 border-primary bg-gradient-to-br from-primary/5 to-transparent">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                            <Icon className="w-6 h-6 text-primary-foreground" />
                          </div>
                          <div>
                            <CardTitle className="flex items-center gap-2">
                              {mission.title}
                              <Badge className="bg-gradient-primary">Featured</Badge>
                            </CardTitle>
                            <CardDescription className="mt-1">
                              {mission.description}
                            </CardDescription>
                          </div>
                        </div>
                        <div className="text-right text-sm text-muted-foreground">
                          <div className="flex items-center gap-1 mb-1">
                            <Award className="w-4 h-4" />
                            {mission.xpReward} XP
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {mission.estimatedTime}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${getDifficultyColor(mission.difficulty)}`} />
                          <span className="text-sm text-muted-foreground">{mission.difficulty}</span>
                        </div>
                        <Button 
                          onClick={() => onMissionSelect(mission.id)}
                          size="lg"
                          className="bg-gradient-primary"
                        >
                          Start Mission
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
          </div>

          {/* Available Missions - Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {missions
              .filter(mission => !mission.featured)
              .map(mission => {
                const Icon = mission.icon;
                const isLocked = mission.status === 'locked';
                
                return (
                  <Card 
                    key={mission.id} 
                    className={`card-elevated transition-all ${isLocked ? 'opacity-60' : 'hover:border-primary/50'}`}
                  >
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          isLocked ? 'bg-muted' : 'bg-gradient-primary'
                        }`}>
                          <Icon className={`w-5 h-5 ${
                            isLocked ? 'text-muted-foreground' : 'text-primary-foreground'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-base">{mission.title}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <div className={`w-2 h-2 rounded-full ${getDifficultyColor(mission.difficulty)}`} />
                            <span className="text-xs text-muted-foreground">{mission.difficulty}</span>
                          </div>
                        </div>
                      </div>
                      <CardDescription className="text-sm">
                        {mission.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Award className="w-4 h-4" />
                          {mission.xpReward} XP
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          {mission.estimatedTime}
                        </div>
                      </div>
                      <Button 
                        disabled={isLocked}
                        className="w-full"
                        variant={isLocked ? "secondary" : "default"}
                        onClick={() => !isLocked && onMissionSelect(mission.id)}
                      >
                        {isLocked ? 'Complete 2 missions to unlock' : 'Start Mission'}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
          </div>
        </div>





        {/* Tutorial CTA at bottom for users who skipped */}
        {userData.completedMissions === 0 && !showTutorial && (
          <div className="animate-in fade-in duration-700 delay-500">
            <Card className="bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-teal-500/10 border-2 border-primary/20 transition-all hover:border-primary/40 hover:shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="mb-1">New to Major Finance?</h3>
                      <p className="text-sm text-muted-foreground">
                        Take a 5-minute interactive tour to learn how to use all features
                      </p>
                    </div>
                  </div>
                  <Button 
                    onClick={() => setShowTutorial(true)}
                    className="bg-gradient-primary"
                  >
                    Start Tutorial
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        </div>
      </div>
    </>
  );
}

export default Dashboard;