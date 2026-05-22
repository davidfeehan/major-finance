import React from 'react';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { useTheme, MILITARY_THEMES } from './ThemeProvider';

interface BranchInfoProps {
  showThemeDetails?: boolean;
  compact?: boolean;
}

export function BranchInfo({ showThemeDetails = false, compact = false }: BranchInfoProps) {
  const { theme } = useTheme();
  const branchInfo = MILITARY_THEMES[theme.branch];

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-lg">{branchInfo.icon}</span>
        <span className="font-medium">{branchInfo.name}</span>
        <Badge variant="outline" className="text-xs">
          {theme.mode === 'light' ? '☀️' : '🌙'}
        </Badge>
      </div>
    );
  }

  return (
    <Card className="military-card">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
            <span className="text-2xl">{branchInfo.icon}</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold">{branchInfo.name}</h3>
              <Badge variant={theme.mode === 'light' ? 'default' : 'secondary'} className="text-xs">
                {theme.mode === 'light' ? '☀️ Light' : '🌙 Dark'}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {branchInfo.description}
            </p>
            {showThemeDetails && (
              <div className="flex gap-2 mt-3">
                <div className="w-4 h-4 bg-primary rounded-full" title="Primary Color" />
                <div className="w-4 h-4 bg-secondary rounded-full" title="Secondary Color" />
                <div className="w-4 h-4 bg-accent rounded-full" title="Accent Color" />
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Branch-specific motivational messages
export const BRANCH_MESSAGES = {
  joint: "United we serve, united we prosper",
  army: "This We'll Defend - Your Financial Future",
  navy: "Honor, Courage, Commitment to Financial Success", 
  'air-force': "Aim High in Life and Finances",
  marines: "Semper Fi to Smart Financial Planning",
  'coast-guard': "Semper Paratus for Financial Security",
  'space-force': "Semper Supra - Always Above Financial Worry"
} as const;

export function BranchMotivation() {
  const { theme } = useTheme();
  const message = BRANCH_MESSAGES[theme.branch];
  
  return (
    <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/20">
      <p className="text-sm font-medium text-primary">
        {message}
      </p>
    </div>
  );
}