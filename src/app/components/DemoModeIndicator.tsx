import React from 'react';
import { Badge } from './ui/badge';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Card, CardContent } from './ui/card';
import { Info, User, Trophy, Target, Shield, TrendingUp, Sparkles } from 'lucide-react';
import { useDeveloperMode } from '../hooks/useDeveloperMode';
import { demoUserProfile } from '../utils/demoData';

interface DemoModeIndicatorProps {
  visible?: boolean;
  compact?: boolean;
  showSnapshot?: boolean;
}

export function DemoModeIndicator({ visible = true, compact = false, showSnapshot = false }: DemoModeIndicatorProps) {
  const { isDeveloperMode } = useDeveloperMode();
  
  // Only show in developer mode or when explicitly visible
  if (!visible || !isDeveloperMode) return null;

  if (compact) {
    return (
      <div className="fixed top-4 right-4 z-50">
        <Badge variant="outline" className="bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/30 shadow-lg">
          <User className="w-3 h-3 mr-1" />
          Demo: SSG Martinez
        </Badge>
      </div>
    );
  }

  if (showSnapshot) {
    return (
      <Card className="mb-6 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center flex-shrink-0">
              <User className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg">Demo Mode - SSG Marcus Martinez</h3>
                <Badge className="bg-gradient-primary text-xs">Live Demo</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                12-year financial journey • Army E-6 • Fort Bragg, NC
              </p>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            <div className="p-3 bg-background/60 rounded-lg border border-border/40">
              <div className="flex items-center gap-2 mb-1">
                <Trophy className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs text-muted-foreground">XP & Level</span>
              </div>
              <p className="text-sm font-semibold">850 XP · Level 2</p>
            </div>
            <div className="p-3 bg-background/60 rounded-lg border border-border/40">
              <div className="flex items-center gap-2 mb-1">
                <Target className="w-3.5 h-3.5 text-green-600" />
                <span className="text-xs text-muted-foreground">Missions</span>
              </div>
              <p className="text-sm font-semibold">4 Complete · 2 Active</p>
            </div>
            <div className="p-3 bg-background/60 rounded-lg border border-border/40">
              <div className="flex items-center gap-2 mb-1">
                <Shield className="w-3.5 h-3.5 text-blue-600" />
                <span className="text-xs text-muted-foreground">TSP Balance</span>
              </div>
              <p className="text-sm font-semibold">$128,450</p>
            </div>
            <div className="p-3 bg-background/60 rounded-lg border border-border/40">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-3.5 h-3.5 text-purple-600" />
                <span className="text-xs text-muted-foreground">Net Worth</span>
              </div>
              <p className="text-sm font-semibold">$61,400</p>
            </div>
          </div>

          {/* Journey Highlights */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <div className="flex items-start gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-primary mb-1">Martinez's Financial Journey</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Started in 2012 with -$2,000 in debt. Through discipline and smart decisions, built $18K emergency fund, 
                  grew TSP to $128K, started $45K investment portfolio, and became Unit Financial Champion mentoring 8+ soldiers. 
                  On track for 20-year retirement with $845K projected and 94% probability of success.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-border/50">
            <p className="text-xs text-muted-foreground text-center">
              <strong>Exploring Demo Mode:</strong> All data shown is from Staff Sergeant Martinez's real financial journey. 
              <span className="ml-1">Create your account to start your own path to financial success.</span>
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Alert className="mb-4 border-primary/30 bg-primary/5 shadow-md">
      <Info className="h-4 w-4 text-primary" />
      <AlertTitle className="text-primary">Demo Mode Active - SSG Marcus Martinez</AlertTitle>
      <AlertDescription className="text-foreground/90">
        You're viewing a realistic military financial journey. Martinez is an Army E-6 with 12 years of service,
        850 XP (Level 2), 4 completed missions, and $258K in total assets. 
        <span className="block mt-1 text-xs opacity-90">
          All calculators pre-filled with his data • Create account to track your own progress
        </span>
      </AlertDescription>
    </Alert>
  );
}
