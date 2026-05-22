import React from 'react';
import { Skeleton } from './ui/skeleton';
import { Card } from './ui/card';
import { Shield, TrendingUp, Award, BookOpen } from 'lucide-react';

export const AppLoadingScreen: React.FC = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="text-center space-y-4">
      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Loading Major Finance</h2>
        <p className="text-muted-foreground">Preparing your financial command center...</p>
      </div>
    </div>
  </div>
);

export const DashboardSkeleton: React.FC = () => (
  <div className="min-h-screen bg-background p-4 space-y-6">
    {/* Header Skeleton */}
    <div className="space-y-2">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-6 w-64" />
    </div>

    {/* XP Progress Skeleton */}
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex justify-between">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-20" />
        </div>
        <Skeleton className="h-4 w-full" />
      </div>
    </Card>

    {/* Missions Grid Skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[...Array(4)].map((_, i) => (
        <Card key={i} className="p-6">
          <div className="flex items-start space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  </div>
);

export const MissionLoadingSkeleton: React.FC = () => (
  <div className="min-h-screen bg-background p-4 space-y-6">
    {/* Header */}
    <div className="flex items-center space-x-4">
      <Skeleton className="h-10 w-10" />
      <div className="space-y-2">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-4 w-56" />
      </div>
    </div>

    {/* Content */}
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <Card key={i} className="p-6">
          <div className="space-y-4">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-10 w-32" />
          </div>
        </Card>
      ))}
    </div>
  </div>
);

export const CalculatorLoadingSkeleton: React.FC = () => (
  <div className="min-h-screen bg-background p-4 space-y-6">
    {/* Header */}
    <div className="space-y-2">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-4 w-80" />
    </div>

    {/* Chart Area */}
    <Card className="p-6">
      <div className="space-y-4">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-64 w-full" />
      </div>
    </Card>

    {/* Results */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[...Array(3)].map((_, i) => (
        <Card key={i} className="p-4">
          <div className="space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-8 w-24" />
          </div>
        </Card>
      ))}
    </div>
  </div>
);

interface RetryableLoadingProps {
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
  children: React.ReactNode;
}

export const RetryableLoading: React.FC<RetryableLoadingProps> = ({
  isLoading,
  error,
  onRetry,
  children
}) => {
  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="p-6 max-w-md w-full text-center space-y-4">
          <div className="text-destructive">
            <Shield className="h-8 w-8 mx-auto mb-2" />
            <h3 className="font-semibold">Loading Failed</h3>
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
          <button
            onClick={onRetry}
            className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return <AppLoadingScreen />;
  }

  return <>{children}</>;
};

// Mission-specific loading states
export const MissionIcon: React.FC<{ type: string; className?: string }> = ({ type, className = "h-6 w-6" }) => {
  const icons = {
    'emergency-fund': Shield,
    'investment-basics': TrendingUp,
    'tsp-optimization': Award,
    'financial-education': BookOpen,
    'retirement-planning': TrendingUp,
  };

  const Icon = icons[type as keyof typeof icons] || Shield;
  return <Icon className={className} />;
};

export const MissionLoadingCard: React.FC<{ missionType: string }> = ({ missionType }) => (
  <Card className="p-6 animate-pulse">
    <div className="flex items-start space-x-4">
      <div className="p-3 rounded-full bg-primary/10">
        <MissionIcon type={missionType} />
      </div>
      <div className="flex-1 space-y-2">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <div className="flex space-x-2 mt-4">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-20" />
        </div>
      </div>
    </div>
  </Card>
);