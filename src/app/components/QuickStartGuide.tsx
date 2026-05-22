import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Target, 
  Shield, 
  Calculator,
  BookOpen,
  CheckCircle,
  ArrowRight,
  Zap
} from 'lucide-react';

interface QuickStartGuideProps {
  userData: {
    completedMissions: number;
    xp: number;
  };
  onActionClick: (action: string) => void;
}

export function QuickStartGuide({ userData, onActionClick }: QuickStartGuideProps) {
  const isNewUser = userData.completedMissions === 0 && userData.xp < 200;

  const quickActions = [
    {
      id: 'emergency-fund',
      title: 'Build Emergency Fund',
      description: 'Start with financial safety basics',
      icon: Shield,
      completed: userData.completedMissions >= 1,
      recommended: true,
      time: '10 min',
      xp: 150
    },
    {
      id: 'retirement-planning',
      title: 'Plan Retirement',
      description: 'Calculate your military retirement',
      icon: Calculator,
      completed: false,
      recommended: true,
      time: '15 min',
      xp: 250
    },
    {
      id: 'financial-education',
      title: 'Financial Basics',
      description: 'Learn military-specific finance',
      icon: BookOpen,
      completed: false,
      recommended: isNewUser,
      time: '30 min',
      xp: 100
    }
  ];

  if (!isNewUser && userData.completedMissions >= 3) {
    return null; // Hide for experienced users
  }

  return (
    <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-transparent to-primary/5">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                <Zap className="w-4 h-4 text-primary-foreground" />
              </div>
              <CardTitle>Quick Start Guide</CardTitle>
            </div>
            <CardDescription>
              {isNewUser 
                ? 'Welcome! Complete these missions to build your financial foundation'
                : `Great progress! ${userData.completedMissions} missions completed`
              }
            </CardDescription>
          </div>
          <Badge variant="secondary">
            {userData.xp} XP earned
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <div
                key={action.id}
                className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${
                  action.completed
                    ? 'bg-muted/50 border-border/50'
                    : 'bg-background border-border hover:border-primary/50 cursor-pointer'
                }`}
                onClick={() => !action.completed && onActionClick(action.id)}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                  action.completed
                    ? 'bg-success/10'
                    : 'bg-primary/10'
                }`}>
                  {action.completed ? (
                    <CheckCircle className="w-5 h-5 text-success" />
                  ) : (
                    <Icon className="w-5 h-5 text-primary" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className={`text-sm font-medium ${action.completed ? 'text-muted-foreground' : ''}`}>
                      {action.title}
                    </h4>
                    {action.recommended && !action.completed && (
                      <Badge variant="secondary" className="text-xs">
                        Recommended
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {action.description}
                  </p>
                </div>

                <div className="flex items-center gap-3 text-xs text-muted-foreground shrink-0">
                  <span>{action.time}</span>
                  {!action.completed && (
                    <>
                      <span>+{action.xp} XP</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                  {action.completed && (
                    <CheckCircle className="w-4 h-4 text-success" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {userData.completedMissions > 0 && (
          <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
            <div className="flex items-center gap-3">
              <Target className="w-5 h-5 text-primary" />
              <div className="flex-1">
                <p className="text-sm font-medium">
                  You're building momentum!
                </p>
                <p className="text-xs text-muted-foreground">
                  Complete {3 - userData.completedMissions} more missions to unlock advanced features
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default QuickStartGuide;
