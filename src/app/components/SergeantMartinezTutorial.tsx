import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Target, 
  Calculator, 
  Shield, 
  TrendingUp,
  Award,
  X,
  ChevronRight,
  CheckCircle,
  Sparkles,
  Star,
  Trophy,
  Zap,
  Clock,
  BookOpen,
  DollarSign,
  PiggyBank,
  TrendingDown
} from 'lucide-react';
import { demoUserProfile, demoMissions, demoFinancialData } from '../utils/demoData';

interface TutorialStep {
  id: string;
  title: string;
  sergeantQuote: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  highlights?: string[];
  realData?: {
    label: string;
    value: string;
    subtext?: string;
  }[];
  tip?: string;
  action: string;
}

interface SergeantMartinezTutorialProps {
  onComplete: () => void;
  onSkip: () => void;
  userName?: string;
  userRank?: string;
}

// Memoized step content to prevent re-renders
const StepContent = memo(({ 
  step, 
  showAnimation 
}: { 
  step: TutorialStep; 
  showAnimation: boolean;
}) => {
  const Icon = step.icon;
  
  return (
    <div 
      className={`space-y-4 transition-all duration-500 ${
        showAnimation ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
      }`}
      style={{ willChange: 'opacity, transform' }}
    >
      {/* Icon and Title */}
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center shrink-0">
          <Icon className="w-6 h-6 text-primary-foreground" />
        </div>
        <div className="flex-1">
          <h2 className="text-xl mb-1">{step.title}</h2>
          <Badge variant="secondary" className="text-xs">
            Martinez's Story - Step {step.id}
          </Badge>
        </div>
      </div>

      {/* Sergeant's Quote */}
      <div className="bg-muted/50 border-l-4 border-primary p-4 rounded-r-lg">
        <p className="text-sm italic text-foreground/90">
          "{step.sergeantQuote}"
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          - SSG Marcus Martinez, 12 years service
        </p>
      </div>

      {/* Description */}
      <p className="text-muted-foreground">
        {step.description}
      </p>

      {/* Real Data from Martinez's Journey */}
      {step.realData && (
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-primary" />
            <p className="text-sm font-semibold text-primary">Martinez's Numbers</p>
          </div>
          {step.realData.map((data, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-sm text-foreground/80">{data.label}</span>
              <div className="text-right">
                <span className="font-semibold">{data.value}</span>
                {data.subtext && (
                  <p className="text-xs text-muted-foreground">{data.subtext}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Highlights */}
      {step.highlights && (
        <div className="space-y-2">
          {step.highlights.map((highlight, index) => (
            <div key={index} className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-success mt-0.5 shrink-0" />
              <span className="text-sm text-foreground/80">{highlight}</span>
            </div>
          ))}
        </div>
      )}

      {/* Tip */}
      {step.tip && (
        <div className="bg-warning/5 border border-warning/20 rounded-lg p-3 flex items-start gap-3">
          <Zap className="w-4 h-4 text-warning mt-0.5 shrink-0" />
          <div>
            <p className="text-xs font-medium text-warning mb-1">Martinez's Advice</p>
            <p className="text-sm text-foreground/80">{step.tip}</p>
          </div>
        </div>
      )}
    </div>
  );
});

StepContent.displayName = 'StepContent';

export function SergeantMartinezTutorial({ 
  onComplete, 
  onSkip,
  userName = 'Service Member',
  userRank = 'Service Member'
}: SergeantMartinezTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [showSergeant, setShowSergeant] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Load saved progress on mount
  useEffect(() => {
    const savedStep = localStorage.getItem('major-finance-tutorial-step');
    if (savedStep) {
      const stepNum = parseInt(savedStep, 10);
      if (stepNum >= 0 && stepNum < 7) {
        setCurrentStep(stepNum);
      }
    }
  }, []);

  // Animate sergeant entrance with smoother timing
  useEffect(() => {
    setShowSergeant(false);
    const timer = setTimeout(() => setShowSergeant(true), 150);
    return () => clearTimeout(timer);
  }, [currentStep]);

  // Save progress on step change
  useEffect(() => {
    localStorage.setItem('major-finance-tutorial-step', currentStep.toString());
  }, [currentStep]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleSkip();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handleBack();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStep]); // eslint-disable-line react-hooks/exhaustive-deps

  // Memoize steps with real Martinez data
  const steps: TutorialStep[] = useMemo(() => [
    {
      id: '1',
      title: 'Meet Staff Sergeant Martinez',
      sergeantQuote: `12 years ago, I was living paycheck to paycheck with no plan for the future. Today? I'm on track to retire at 42 with financial security. This is my story.`,
      description: `Marcus Martinez joined the Army at 22 with $2,000 in debt and zero financial knowledge. Through discipline, education, and the right tools, he transformed his financial future. Let me show you how.`,
      icon: Award,
      realData: [
        { label: 'Starting Point (2012)', value: '-$2,000', subtext: 'Credit card debt' },
        { label: 'Today (2024)', value: '+$258,400', subtext: 'Total assets' },
        { label: 'Net Worth Growth', value: '+$260,400', subtext: 'Over 12 years' }
      ],
      highlights: [
        'Started with negative net worth',
        'No financial education or planning',
        'Lived paycheck to paycheck first 2 years',
        'Now mentoring 8 soldiers in his unit'
      ],
      tip: 'Your starting point doesn\'t determine your ending point. I started in the red - you can start from anywhere.',
      action: 'Show Me How'
    },
    {
      id: '2',
      title: 'Mission 1: Emergency Fund (2016)',
      sergeantQuote: 'Building my emergency fund was the hardest and most important thing I ever did. It gave me options when life threw curveballs.',
      description: `Martinez's first mission was building a 6-month emergency fund. It took 18 months of discipline, but it paid off during two deployments and a family emergency. This foundation changed everything.`,
      icon: Shield,
      realData: [
        { label: 'Target Amount', value: '$18,000', subtext: '6 months expenses' },
        { label: 'Monthly Contribution', value: '$400' },
        { label: 'Time to Goal', value: '18 months' },
        { label: 'Times Used', value: '2', subtext: 'Deployments & emergency' }
      ],
      highlights: [
        'Started with just $50/month, grew to $400',
        'Kept fund intact for 8+ years',
        'Avoided $15,000+ in credit card debt',
        'Peace of mind during deployments'
      ],
      tip: 'Start small. I began with $50/month. Consistency beats perfection. Even $25/month is better than zero.',
      action: 'Continue'
    },
    {
      id: '3',
      title: 'Mission 2: TSP Optimization (2019)',
      sergeantQuote: 'I was leaving $2,520 a year on the table by not maxing the 5% match. That was a $100K+ mistake I almost made.',
      description: `After securing his emergency fund, Martinez turned to TSP optimization. He increased his contribution from 3% to 15%, learned about fund allocation, and implemented a Roth conversion strategy. Game changer.`,
      icon: TrendingUp,
      realData: [
        { label: 'Started Contributing', value: '3% ($126/month)' },
        { label: 'Increased To', value: '15% ($630/month)' },
        { label: 'Current Balance', value: '$128,450' },
        { label: 'Projected at 60', value: '$845,000' }
      ],
      highlights: [
        'Maximizing 5% government match = free $210/month',
        'Optimized 60/30/10 fund allocation (C/S/I)',
        'On track for $845K retirement portfolio',
        'Earned 300 XP for completing mission'
      ],
      tip: 'The 5% match is literally free money. If you do nothing else, contribute at least 5%. I increased 1% every 6 months until I hit 15%.',
      action: 'Next Mission'
    },
    {
      id: '4',
      title: 'Mission 3: Investment Basics (2021)',
      sergeantQuote: 'Index funds and compound interest felt like magic. Small monthly investments became a six-figure portfolio.',
      description: `With TSP optimized, Martinez expanded to civilian investments. Started with $100/month in index funds. Five years later: $45,300 balance with 11.2% average returns. Diversification beyond TSP secured his future.`,
      icon: PiggyBank,
      realData: [
        { label: 'Started With', value: '$100/month' },
        { label: 'Current Balance', value: '$45,300' },
        { label: 'Total Contributions', value: '$38,200' },
        { label: 'Investment Gains', value: '$7,100', subtext: '11.2% avg return' }
      ],
      highlights: [
        'Opened Vanguard account - simple setup',
        'Diversified: 70% stocks, 25% bonds, 5% cash',
        'Set and forget with automatic investing',
        'Never touched it during market downturns'
      ],
      tip: 'I was terrified to start investing. Turns out, index funds are simple: buy the whole market, hold long-term, ignore the noise. Time in the market beats timing the market.',
      action: 'Keep Going'
    },
    {
      id: '5',
      title: 'Mission 4: Financial Education (2023)',
      sergeantQuote: 'Knowledge is power. Once I understood the game, I couldn\'t stop learning. Now I teach it to my soldiers.',
      description: `Martinez completed all 12 financial literacy modules, scored 95%+ on every quiz, and became a certified mentor. Now he leads monthly workshops and has helped 8 soldiers start their financial journeys. Knowledge multiplied.`,
      icon: BookOpen,
      realData: [
        { label: 'Modules Completed', value: '12 of 12' },
        { label: 'Average Score', value: '96.5%' },
        { label: 'Soldiers Mentored', value: '8+' },
        { label: 'Workshops Led', value: '12' }
      ],
      highlights: [
        'Became Unit Financial Champion 2024',
        'Certified Financial Literacy Mentor',
        'Helped 3 soldiers buy their first homes',
        'Saved soldiers from predatory lending',
        'Earned 200 XP + mentor badge'
      ],
      tip: 'Financial literacy should be taught in Basic Training. Since it\'s not, we teach each other. Your knowledge can change someone\'s life.',
      action: 'Final Mission'
    },
    {
      id: '6',
      title: 'Mission 5: Retirement Planning (In Progress)',
      sergeantQuote: 'I\'m 34 and planning to retire at 42 with a military pension, TSP, investments, and VA disability. The math works.',
      description: `Martinez is now building his 20-year retirement plan. With his military pension ($2,520/month), TSP projections ($845K), civilian investments ($45K+), and VA disability (30% rating), he's on track for $7,044/month in retirement income at 42.`,
      icon: Target,
      realData: [
        { label: 'Target Age', value: '42 (20 years)' },
        { label: 'Monthly Income', value: '$7,044' },
        { label: 'Pension', value: '$2,520/month' },
        { label: 'Success Probability', value: '94%' }
      ],
      highlights: [
        'Retiring 18 years earlier than most Americans',
        'Multiple income streams = security',
        'Planning civilian logistics career post-retirement',
        'Will continue serving through civilian work',
        '65% complete with planning mission'
      ],
      tip: '20 years seems far away until you realize it\'s closer than you think. I have 8 years left. The time will pass anyway - might as well have a plan.',
      action: 'Almost There'
    },
    {
      id: '7',
      title: 'Your Mission Starts Now',
      sergeantQuote: `You just saw my 12-year journey in 7 steps. Your journey starts today, ${userRank}. Every mission you complete brings you closer to financial freedom. I believe in you.`,
      description: 'Martinez went from -$2,000 to $258,400 in assets. From zero knowledge to Unit Financial Champion. From paycheck-to-paycheck to retirement planning at 34. This app contains the same tools, calculators, and knowledge that changed his life.',
      icon: Trophy,
      highlights: [
        'Start with Emergency Fund Mission (150 XP)',
        'Use the AI assistant anytime you need help',
        'Every mission builds on the last',
        'Track progress with XP and levels',
        'Join a community of financially savvy service members'
      ],
      realData: [
        { label: 'Martinez\'s Total XP', value: '850 XP', subtext: 'Level 2' },
        { label: 'Missions Completed', value: '4 of 5' },
        { label: 'Net Worth', value: '$61,400' },
        { label: 'Years to Freedom', value: '8 years' }
      ],
      tip: 'Your mission: Complete one mission this week. Just one. Small victories lead to big wins. Martinez started with $50/month 12 years ago. What will your first step be?',
      action: 'Start My Journey'
    }
  ], [userRank]);

  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;
  const progress = ((currentStep + 1) / steps.length) * 100;

  // Memoized handlers to prevent recreation
  const handleNext = useCallback(() => {
    if (isTransitioning) return;
    
    if (isLastStep) {
      handleComplete();
    } else {
      setIsTransitioning(true);
      setShowSergeant(false);
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        setIsTransitioning(false);
      }, 200);
    }
  }, [isLastStep, isTransitioning]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleBack = useCallback(() => {
    if (isTransitioning || isFirstStep) return;
    
    setIsTransitioning(true);
    setShowSergeant(false);
    setTimeout(() => {
      setCurrentStep(prev => prev - 1);
      setIsTransitioning(false);
    }, 200);
  }, [isFirstStep, isTransitioning]);

  const handleComplete = useCallback(() => {
    setIsVisible(false);
    localStorage.setItem('major-finance-tutorial-completed', 'true');
    localStorage.setItem('major-finance-tutorial-completed-date', new Date().toISOString());
    localStorage.removeItem('major-finance-tutorial-step');
    
    // Track completion
    console.log('[Tutorial] Martinez Story completed successfully');
    
    setTimeout(() => onComplete(), 300);
  }, [onComplete]);

  const handleSkip = useCallback(() => {
    // Confirmation for skip
    if (!window.confirm('Skip Martinez\'s story? You can replay it anytime from Settings.')) {
      return;
    }
    
    setIsVisible(false);
    localStorage.setItem('major-finance-tutorial-completed', 'true');
    localStorage.setItem('major-finance-tutorial-skipped', 'true');
    localStorage.removeItem('major-finance-tutorial-step');
    
    // Track skip
    console.log('[Tutorial] Martinez Story skipped by user');
    
    setTimeout(() => onSkip(), 300);
  }, [onSkip]);

  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tutorial-title"
      aria-describedby="tutorial-description"
    >
      <Card className="w-full max-w-4xl card-elevated animate-in fade-in slide-in-from-bottom-6 duration-500 max-h-[90vh] overflow-hidden flex flex-col">
        <CardContent className="p-0 flex flex-col h-full overflow-hidden">
          {/* Close Button */}
          <button
            onClick={handleSkip}
            className="absolute top-4 right-4 z-10 text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-muted rounded-full"
            aria-label="Skip Martinez's story (Esc)"
            title="Skip Martinez's story (Esc)"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
            {/* Sergeant Martinez Avatar Section */}
            <div 
              className={`md:w-2/5 bg-gradient-primary p-8 flex flex-col items-center justify-center text-center transition-all duration-500 ${
                showSergeant ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ willChange: 'opacity, transform' }}
            >
              <div className="relative mb-4">
                {/* Avatar Circle with Badge */}
                <div className="w-32 h-32 rounded-full bg-primary-foreground/20 border-4 border-primary-foreground/30 flex items-center justify-center backdrop-blur-sm">
                  <div className="w-24 h-24 rounded-full bg-primary-foreground/30 flex items-center justify-center">
                    <Star className="w-12 h-12 text-primary-foreground" />
                  </div>
                </div>
                {/* Rank Badge */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-primary-foreground text-primary px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                  <Award className="w-3 h-3 inline mr-1" />
                  SSG Martinez
                </div>
              </div>

              <div className="text-primary-foreground space-y-2">
                <h3 className="font-semibold text-lg">Marcus Martinez</h3>
                <p className="text-sm opacity-90">
                  Financial Success Story
                </p>
                <div className="flex items-center gap-2 justify-center pt-2">
                  <Badge variant="secondary" className="text-xs">
                    <Trophy className="w-3 h-3 mr-1" />
                    12 Years Service
                  </Badge>
                </div>
              </div>

              {/* Journey Stats */}
              <div className="mt-6 pt-6 border-t border-primary-foreground/30 w-full space-y-3">
                <div className="text-primary-foreground/90">
                  <div className="text-2xl font-bold text-primary-foreground">$61,400</div>
                  <div className="text-xs">Net Worth Today</div>
                </div>
                <div className="flex justify-between text-primary-foreground/90 text-sm">
                  <span>Started With:</span>
                  <span className="font-semibold text-red-300">-$2,000</span>
                </div>
                <div className="flex justify-between text-primary-foreground/90 text-sm">
                  <span>Missions Completed:</span>
                  <span className="font-semibold">4 of 5</span>
                </div>
                <div className="flex justify-between text-primary-foreground/90 text-sm">
                  <span>Soldiers Mentored:</span>
                  <span className="font-semibold">8+</span>
                </div>
              </div>
            </div>

            {/* Content Section - Scrollable */}
            <div className="md:w-3/5 p-8 overflow-y-auto flex flex-col">
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                  <span id="tutorial-title">Martinez's Journey</span>
                  <span>{currentStep + 1} of {steps.length}</span>
                </div>
                <Progress value={progress} className="h-2" />
                {/* Keyboard Shortcuts Hint */}
                <div className="flex items-center justify-center gap-4 mt-2 text-xs text-muted-foreground">
                  <span>← → Navigate</span>
                  <span>Esc Skip</span>
                </div>
              </div>

              {/* Main Content - Using memoized component */}
              <div className="flex-1 overflow-y-auto">
                <StepContent step={currentStepData} showAnimation={showSergeant} />
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-6 pt-6 border-t">
                <Button
                  variant="ghost"
                  onClick={handleBack}
                  disabled={isFirstStep || isTransitioning}
                  className="gap-2"
                  size="lg"
                  aria-label="Previous step"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                  Back
                </Button>

                <Button
                  onClick={handleNext}
                  disabled={isTransitioning}
                  className="gap-2 bg-gradient-primary px-6"
                  size="lg"
                  aria-label={isLastStep ? 'Start your journey' : 'Next step'}
                >
                  {currentStepData.action}
                  {!isLastStep && <ChevronRight className="w-4 h-4" />}
                  {isLastStep && <Trophy className="w-4 h-4" />}
                </Button>
              </div>

              {/* Skip Option */}
              {!isLastStep && (
                <div className="text-center mt-4">
                  <button
                    onClick={handleSkip}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors underline"
                  >
                    Skip story (you can replay anytime)
                  </button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default SergeantMartinezTutorial;
