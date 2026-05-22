import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Shield, TrendingUp, Calculator, FileText, ArrowRight, X, Zap } from 'lucide-react';
import { useTheme, MILITARY_THEMES } from './ThemeProvider';

interface AgentSwitcherProps {
  currentAgent: string;
  suggestedAgent: string;
  reason: string;
  onSwitch: (agent: string) => void;
  onDismiss: () => void;
  userContext?: {
    branch: string;
    completedMissions: number;
    xp: number;
  };
}

const AGENT_INFO = {
  'Shield AI': {
    icon: Shield,
    color: 'from-green-500 to-green-600',
    description: 'Emergency Fund & Protection Specialist',
    expertise: ['Emergency Planning', 'Risk Management', 'Financial Safety'],
    personality: 'Protective and methodical'
  },
  'Investment AI': {
    icon: TrendingUp,
    color: 'from-blue-500 to-blue-600',
    description: 'Investment & Wealth Building Expert',
    expertise: ['Portfolio Strategy', 'Market Analysis', 'Long-term Growth'],
    personality: 'Strategic and growth-focused'
  },
  'TSP Expert AI': {
    icon: Calculator,
    color: 'from-purple-500 to-purple-600',
    description: 'TSP Optimization Specialist',
    expertise: ['TSP Strategy', 'Retirement Planning', 'Contribution Optimization'],
    personality: 'Analytical and precise'
  },
  'Education AI': {
    icon: FileText,
    color: 'from-orange-500 to-orange-600',
    description: 'Financial Education Guide',
    expertise: ['Learning Paths', 'Concept Explanation', 'Skill Building'],
    personality: 'Patient and educational'
  }
};

export function AgentSwitcher({ 
  currentAgent, 
  suggestedAgent, 
  reason, 
  onSwitch, 
  onDismiss,
  userContext 
}: AgentSwitcherProps) {
  const { theme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);
  
  const currentInfo = AGENT_INFO[currentAgent];
  const suggestedInfo = AGENT_INFO[suggestedAgent];
  const CurrentIcon = currentInfo?.icon || Shield;
  const SuggestedIcon = suggestedInfo?.icon || TrendingUp;

  const handleSwitch = async () => {
    setIsAnimating(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    onSwitch(suggestedAgent);
  };

  const branchIcon = userContext?.branch ? 
    MILITARY_THEMES[userContext.branch]?.icon || MILITARY_THEMES[theme.branch]?.icon || '🎖️' : 
    MILITARY_THEMES[theme.branch]?.icon || '🎖️';

  return (
    <Card className={`border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10 ${isAnimating ? 'agent-switch' : ''}`}>
      <CardContent className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            <span className="font-medium text-primary">Agent Switch Suggested</span>
            <Badge variant="outline" className="text-xs">
              {branchIcon} Smart Assistant
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDismiss}
            className="h-6 w-6 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Reason */}
        <p className="text-sm text-muted-foreground">
          {reason}
        </p>

        {/* Agent Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          {/* Current Agent */}
          <div className="flex flex-col items-center p-3 rounded-lg bg-muted/50">
            <div className={`w-12 h-12 bg-gradient-to-br ${currentInfo?.color} rounded-lg flex items-center justify-center mb-2`}>
              <CurrentIcon className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-medium">{currentAgent}</span>
            <span className="text-xs text-muted-foreground text-center">
              {currentInfo?.personality}
            </span>
          </div>

          {/* Arrow */}
          <div className="flex justify-center">
            <ArrowRight className="w-6 h-6 text-primary" />
          </div>

          {/* Suggested Agent */}
          <div className="flex flex-col items-center p-3 rounded-lg bg-primary/10 border border-primary/20">
            <div className={`w-12 h-12 bg-gradient-to-br ${suggestedInfo?.color} rounded-lg flex items-center justify-center mb-2`}>
              <SuggestedIcon className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-medium">{suggestedAgent}</span>
            <span className="text-xs text-muted-foreground text-center">
              {suggestedInfo?.personality}
            </span>
          </div>
        </div>

        {/* Suggested Agent Details */}
        <div className="bg-card p-3 rounded-lg border">
          <h4 className="font-medium mb-2">{suggestedAgent} specializes in:</h4>
          <div className="flex flex-wrap gap-2">
            {suggestedInfo?.expertise.map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {suggestedInfo?.description}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button 
            onClick={handleSwitch}
            className="flex-1"
            disabled={isAnimating}
          >
            <SuggestedIcon className="w-4 h-4 mr-2" />
            Switch to {suggestedAgent}
          </Button>
          <Button 
            variant="outline" 
            onClick={onDismiss}
            className="px-4"
          >
            Continue with {currentAgent}
          </Button>
        </div>

        {/* XP Reward Notice */}
        {userContext && (
          <div className="text-xs text-center text-muted-foreground bg-muted/30 p-2 rounded">
            🏆 Earn +10 XP for trying new AI specialists! Current: {userContext.xp} XP
          </div>
        )}
      </CardContent>
    </Card>
  );
}