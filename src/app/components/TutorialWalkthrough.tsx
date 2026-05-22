import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Target, 
  Calculator, 
  Shield, 
  TrendingUp,
  Award,
  X,
  ChevronRight,
  ChevronLeft,
  Check,
  Sparkles,
  MousePointer,
  Zap,
  Trophy,
  Star,
  BookOpen
} from 'lucide-react';

interface SpotlightPosition {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  width?: number;
  height?: number;
}

interface TutorialStep {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  action: string;
  highlight?: {
    selector: string;
    description: string;
    pulse?: boolean;
  };
  tip?: string;
  position?: 'center' | 'bottom' | 'top' | 'left' | 'right';
}

interface TutorialWalkthroughProps {
  onComplete: () => void;
  onSkip: () => void;
}

export function TutorialWalkthrough({ onComplete, onSkip }: TutorialWalkthroughProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [spotlightPosition, setSpotlightPosition] = useState<SpotlightPosition | null>(null);
  const [highlightedElement, setHighlightedElement] = useState<HTMLElement | null>(null);

  const steps: TutorialStep[] = [
    {
      id: 'welcome',
      title: 'Welcome to Major Finance!',
      description: 'Your mission-based financial planning platform. Let\'s take an interactive tour of the app and show you exactly where everything is.',
      icon: Award,
      action: 'Start Tour',
      position: 'center',
      tip: 'You can press Escape anytime to skip this tour, or replay it from Settings later.'
    },
    {
      id: 'header',
      title: 'Mission Command Center',
      description: 'This is your command center. See your rank, years of service, current level, and XP progress. Every mission you complete earns XP to level up!',
      icon: Star,
      action: 'Got It',
      highlight: {
        selector: '.military-header, [class*="military-header"], [style*="gradient-primary"]',
        description: 'Your personal stats and progress',
        pulse: true
      },
      position: 'bottom'
    },
    {
      id: 'missions-section',
      title: 'Your Financial Missions',
      description: 'This is where the magic happens. Each mission is a structured financial goal. Click any mission card to start - we recommend beginning with Emergency Fund!',
      icon: Target,
      action: 'Show Me More',
      highlight: {
        selector: '[class*="missions"], [class*="mission-card"], .card',
        description: 'Click any mission to begin',
        pulse: true
      },
      position: 'top',
      tip: 'Pro tip: Martinez started with Emergency Fund and earned 150 XP. It\'s the perfect starting point!'
    },
    {
      id: 'calculator-hub',
      title: 'Financial Intelligence Tools',
      description: 'Access military-specific calculators here. Retirement planning, emergency fund calculations, TSP optimization - all the tools Martinez used are here.',
      icon: Calculator,
      action: 'Nice!',
      highlight: {
        selector: '[class*="calculator"], button[class*="Calculator"]',
        description: 'Open Calculator Hub anytime',
        pulse: true
      },
      position: 'top',
      tip: 'These calculators understand military benefits like TSP, BRS, and pension calculations!'
    },
    {
      id: 'ai-assistant',
      title: 'AI Mission Control',
      description: 'Your 24/7 AI assistant is always ready to help. It adapts to your current screen and provides contextual guidance. Click the button to chat anytime!',
      icon: Sparkles,
      action: 'Awesome',
      highlight: {
        selector: '[class*="ai-chat"], [class*="chat-button"], button[class*="Bot"]',
        description: 'Click to chat with AI',
        pulse: true
      },
      position: 'left',
      tip: 'The AI knows where you are in the app and adjusts its help accordingly. Try asking about Martinez\'s journey!'
    },
    {
      id: 'navigation',
      title: 'Navigate Between Screens',
      description: 'Use the navigation to explore all sections: Dashboard, Missions, Progress tracking, Banking, and Settings. Everything is organized for easy access.',
      icon: BookOpen,
      action: 'Got It',
      highlight: {
        selector: 'nav, [class*="navigation"], [class*="sidebar"]',
        description: 'Switch between screens here',
        pulse: true
      },
      position: 'right',
      tip: 'On mobile? Navigation is at the bottom. On desktop? It\'s on the left sidebar.'
    },
    {
      id: 'ready',
      title: 'You\'re Ready to Start!',
      description: 'You now know where everything is. Time to begin your financial journey. Remember: Martinez started from -$2,000 and made it to $258,400. Your journey starts with one mission.',
      icon: Trophy,
      action: 'Let\'s Go!',
      position: 'center',
      tip: 'Recommended first steps: 1) Complete Emergency Fund mission, 2) Use the Retirement Calculator, 3) Chat with the AI if you have questions!'
    }
  ];

  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;
  const progress = ((currentStep + 1) / steps.length) * 100;

  // Update spotlight position when step changes
  useEffect(() => {
    if (!currentStepData.highlight) {
      setSpotlightPosition(null);
      setHighlightedElement(null);
      return;
    }

    const updateSpotlight = () => {
      const selector = currentStepData.highlight?.selector;
      if (!selector) return;

      // Try multiple selectors
      const selectors = selector.split(',').map(s => s.trim());
      let element: HTMLElement | null = null;

      for (const sel of selectors) {
        element = document.querySelector(sel) as HTMLElement;
        if (element) break;
      }

      if (element) {
        const rect = element.getBoundingClientRect();
        const padding = 16;
        
        setSpotlightPosition({
          top: rect.top - padding,
          left: rect.left - padding,
          width: rect.width + padding * 2,
          height: rect.height + padding * 2
        });
        setHighlightedElement(element);

        // Add highlight class
        element.classList.add('tutorial-highlight');
      } else {
        setSpotlightPosition(null);
        setHighlightedElement(null);
      }
    };

    // Update immediately and on resize
    updateSpotlight();
    window.addEventListener('resize', updateSpotlight);
    
    return () => {
      window.removeEventListener('resize', updateSpotlight);
      // Remove highlight class
      if (highlightedElement) {
        highlightedElement.classList.remove('tutorial-highlight');
      }
    };
  }, [currentStep, currentStepData.highlight]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleSkip();
      } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handleBack();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStep]);

  const handleNext = useCallback(() => {
    if (isLastStep) {
      handleComplete();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  }, [isLastStep]);

  const handleBack = useCallback(() => {
    if (!isFirstStep) {
      setCurrentStep(prev => prev - 1);
    }
  }, [isFirstStep]);

  const handleComplete = useCallback(() => {
    setIsVisible(false);
    localStorage.setItem('major-finance-walkthrough-completed', 'true');
    localStorage.setItem('major-finance-walkthrough-completed-date', new Date().toISOString());
    
    console.log('[Walkthrough] Completed successfully');
    
    setTimeout(() => onComplete(), 300);
  }, [onComplete]);

  const handleSkip = useCallback(() => {
    if (!window.confirm('Skip the interactive tour? You can replay it anytime from Settings.')) {
      return;
    }
    
    setIsVisible(false);
    localStorage.setItem('major-finance-walkthrough-completed', 'true');
    localStorage.setItem('major-finance-walkthrough-skipped', 'true');
    
    console.log('[Walkthrough] Skipped by user');
    
    setTimeout(() => onSkip(), 300);
  }, [onSkip]);

  if (!isVisible) return null;

  const Icon = currentStepData.icon;
  const isCenterPosition = !currentStepData.position || currentStepData.position === 'center';

  // Calculate tooltip position
  const getTooltipPosition = () => {
    if (!spotlightPosition || isCenterPosition) {
      return {
        position: 'fixed' as const,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      };
    }

    const pos = currentStepData.position;
    const style: React.CSSProperties = {
      position: 'fixed' as const
    };

    if (pos === 'bottom') {
      style.top = (spotlightPosition.top || 0) + (spotlightPosition.height || 0) + 24;
      style.left = (spotlightPosition.left || 0) + (spotlightPosition.width || 0) / 2;
      style.transform = 'translateX(-50%)';
    } else if (pos === 'top') {
      style.bottom = window.innerHeight - (spotlightPosition.top || 0) + 24;
      style.left = (spotlightPosition.left || 0) + (spotlightPosition.width || 0) / 2;
      style.transform = 'translateX(-50%)';
    } else if (pos === 'left') {
      style.right = window.innerWidth - (spotlightPosition.left || 0) + 24;
      style.top = (spotlightPosition.top || 0) + (spotlightPosition.height || 0) / 2;
      style.transform = 'translateY(-50%)';
    } else if (pos === 'right') {
      style.left = (spotlightPosition.left || 0) + (spotlightPosition.width || 0) + 24;
      style.top = (spotlightPosition.top || 0) + (spotlightPosition.height || 0) / 2;
      style.transform = 'translateY(-50%)';
    }

    return style;
  };

  return (
    <>
      {/* Dark Overlay with Spotlight */}
      <div 
        className="fixed inset-0 z-[110] transition-opacity duration-300"
        style={{
          background: spotlightPosition 
            ? `radial-gradient(circle at ${(spotlightPosition.left || 0) + (spotlightPosition.width || 0) / 2}px ${(spotlightPosition.top || 0) + (spotlightPosition.height || 0) / 2}px, transparent 0px, rgba(0,0,0,0.2) 100px, rgba(0,0,0,0.85) 300px)`
            : 'rgba(0, 0, 0, 0.85)'
        }}
      />

      {/* Spotlight Border Highlight */}
      {spotlightPosition && (
        <div
          className={`fixed z-[111] border-4 border-primary rounded-lg pointer-events-none transition-all duration-300 ${
            currentStepData.highlight?.pulse ? 'animate-pulse' : ''
          }`}
          style={{
            top: spotlightPosition.top,
            left: spotlightPosition.left,
            width: spotlightPosition.width,
            height: spotlightPosition.height,
            boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.3), 0 0 20px rgba(59, 130, 246, 0.5)'
          }}
        />
      )}

      {/* Pointer Animation */}
      {spotlightPosition && currentStepData.highlight?.pulse && (
        <div
          className="fixed z-[111] pointer-events-none animate-bounce"
          style={{
            top: (spotlightPosition.top || 0) + (spotlightPosition.height || 0) / 2 - 12,
            left: (spotlightPosition.left || 0) + (spotlightPosition.width || 0) / 2 - 12,
          }}
        >
          <MousePointer className="w-6 h-6 text-primary drop-shadow-lg" />
        </div>
      )}

      {/* Tutorial Card */}
      <div style={getTooltipPosition()} className="z-[112]">
        <Card className="w-full max-w-lg card-elevated animate-in fade-in slide-in-from-bottom-4 duration-300 shadow-2xl">
          <CardContent className="p-6">
            {/* Close Button */}
            <button
              onClick={handleSkip}
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors p-1 hover:bg-muted rounded-full"
              aria-label="Skip tour (Esc)"
              title="Skip tour (Esc)"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                <span>Interactive Tour</span>
                <span>{currentStep + 1} of {steps.length}</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-primary transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Icon and Title */}
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">{currentStepData.title}</h3>
                {currentStepData.highlight && (
                  <Badge variant="secondary" className="text-xs">
                    {currentStepData.highlight.description}
                  </Badge>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground mb-4">
              {currentStepData.description}
            </p>

            {/* Tip */}
            {currentStepData.tip && (
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 mb-4 flex items-start gap-2">
                <Zap className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <p className="text-xs text-foreground/80">{currentStepData.tip}</p>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between gap-2">
              <Button
                variant="ghost"
                onClick={handleBack}
                disabled={isFirstStep}
                className="gap-1"
                size="sm"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </Button>

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <kbd className="px-2 py-0.5 bg-muted rounded">←</kbd>
                <kbd className="px-2 py-0.5 bg-muted rounded">→</kbd>
                <kbd className="px-2 py-0.5 bg-muted rounded">Esc</kbd>
              </div>

              <Button
                onClick={handleNext}
                className="gap-1 bg-gradient-primary"
                size="sm"
              >
                {isLastStep ? (
                  <>
                    <Check className="w-4 h-4" />
                    {currentStepData.action}
                  </>
                ) : (
                  <>
                    {currentStepData.action}
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>

            {/* Skip Link */}
            {!isLastStep && (
              <div className="text-center mt-3">
                <button
                  onClick={handleSkip}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors underline"
                >
                  Skip tour
                </button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Add styles for tutorial highlight */}
      <style>{`
        .tutorial-highlight {
          position: relative;
          z-index: 111 !important;
        }
        
        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.3), 0 0 20px rgba(59, 130, 246, 0.5);
          }
          50% {
            box-shadow: 0 0 0 8px rgba(59, 130, 246, 0.2), 0 0 30px rgba(59, 130, 246, 0.7);
          }
        }
      `}</style>
    </>
  );
}

export default TutorialWalkthrough;
