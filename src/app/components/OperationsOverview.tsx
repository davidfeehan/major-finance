import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  ChevronRight, 
  Trophy, 
  Lock,
  CheckCircle,
  Clock
} from 'lucide-react';
import { OPERATIONS, getOperationProgress, getOperationEarnedXP, isOperationComplete, getActiveOperations } from '../constants/operations';
import { MISSIONS_DATA } from '../constants/missionsData';

interface OperationsOverviewProps {
  completedMissions: string[];
  onOperationSelect: (operationId: string) => void;
  onMissionSelect: (missionId: string) => void;
}

export function OperationsOverview({ 
  completedMissions, 
  onOperationSelect,
  onMissionSelect 
}: OperationsOverviewProps) {
  const activeOperations = getActiveOperations();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="mb-1">Operations Command</h2>
          <p className="text-muted-foreground">
            Strategic missions grouped by financial objectives
          </p>
        </div>
        <Trophy className="w-8 h-8 text-primary" />
      </div>

      {/* Operations Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {activeOperations.map((operation) => {
          const progress = getOperationProgress(operation.id, completedMissions);
          const earnedXP = getOperationEarnedXP(operation.id, completedMissions, MISSIONS_DATA);
          const isComplete = isOperationComplete(operation.id, completedMissions);
          const Icon = operation.icon;
          
          const totalMissions = operation.missions.length;
          const completedMissionsCount = operation.missions.filter(missionId => 
            completedMissions.includes(missionId)
          ).length;

          return (
            <Card 
              key={operation.id}
              className="overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
              onClick={() => onOperationSelect(operation.id)}
            >
              {/* Operation Header with Gradient */}
              <div className={`bg-gradient-to-br ${operation.gradient} p-6 text-white relative`}>
                <div className="absolute top-4 right-4">
                  {isComplete ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <Icon className="w-6 h-6 opacity-80" />
                  )}
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      {operation.difficulty}
                    </Badge>
                    {isComplete && (
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                        Complete
                      </Badge>
                    )}
                  </div>
                  <h3 className="mb-2">{operation.title}</h3>
                  <p className="text-white/90 text-sm">
                    {operation.description}
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/90">Progress</span>
                    <span className="font-semibold">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2 bg-white/20" />
                </div>
              </div>

              {/* Operation Details */}
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Missions</p>
                    <p className="font-semibold">
                      {completedMissionsCount}/{totalMissions}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">XP Earned</p>
                    <p className="font-semibold text-primary">
                      {earnedXP}/{operation.totalXP}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Duration</p>
                    <p className="text-sm flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {operation.estimatedTotalTime}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Badge</p>
                    <p className="text-sm">{operation.badge?.icon}</p>
                  </div>
                </div>

                {/* Achievement Badge Info */}
                {isComplete && operation.badge && (
                  <div className="p-3 bg-primary/10 rounded-lg mb-4 border border-primary/20">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">{operation.badge.icon}</div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm mb-1">
                          {operation.badge.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {operation.badge.description}
                        </p>
                      </div>
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                  </div>
                )}

                {/* CTA Button */}
                <Button 
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  variant={isComplete ? "outline" : "default"}
                  onClick={(e) => {
                    e.stopPropagation();
                    onOperationSelect(operation.id);
                  }}
                >
                  {isComplete ? 'Review Missions' : 'View Missions'}
                  <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          );
        })}

        {/* Coming Soon Operations */}
        {Object.values(OPERATIONS).filter(op => op.missions.length === 0).map((operation) => {
          const Icon = operation.icon;
          
          return (
            <Card 
              key={operation.id}
              className="overflow-hidden opacity-60 relative"
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex items-center justify-center">
                <div className="text-center">
                  <Lock className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
                  <p className="font-semibold">Coming Soon</p>
                </div>
              </div>

              {/* Operation Header with Gradient */}
              <div className={`bg-gradient-to-br ${operation.gradient} p-6 text-white relative`}>
                <div className="absolute top-4 right-4">
                  <Icon className="w-6 h-6 opacity-80" />
                </div>
                
                <div className="mb-4">
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30 mb-2">
                    {operation.difficulty}
                  </Badge>
                  <h3 className="mb-2">{operation.title}</h3>
                  <p className="text-white/90 text-sm">
                    {operation.description}
                  </p>
                </div>
              </div>

              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Status</p>
                    <p className="text-sm">In Development</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Available</p>
                    <p className="text-sm">Coming Soon</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
