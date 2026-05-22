import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Target, 
  Shield, 
  Award,
  Clock,
  CheckCircle,
  Lock,
  Flame,
  ChevronRight,
  Trophy,
  ArrowLeft
} from 'lucide-react';
import { useTheme, MILITARY_THEMES } from './ThemeProvider';
import { OperationsOverview } from './OperationsOverview';
import { MISSIONS_DATA, getMissionsByOperation, getMissionStatus } from '../constants/missionsData';
import { OPERATIONS, getOperationProgress, DIFFICULTY_INFO } from '../constants/operations';

interface UserData {
  xp: number;
  completedMissions: number;
  completedMissionsList?: string[];
  rank?: string;
  yearsOfService?: string;
}

interface MissionsScreenProps {
  userData: UserData;
  onMissionSelect: (missionId: string) => void;
  isDemo?: boolean;
}

export function MissionsScreen({ userData, onMissionSelect, isDemo = false }: MissionsScreenProps) {
  const { theme } = useTheme();
  const branchInfo = MILITARY_THEMES[theme.branch];
  const [selectedOperation, setSelectedOperation] = useState<string | null>(null);
  const completedMissionsList = userData.completedMissionsList || [];
  
  // Calculate mission stats
  const totalMissions = MISSIONS_DATA.length;
  const completedCount = completedMissionsList.length;
  const availableMissions = MISSIONS_DATA.filter(m => 
    getMissionStatus(m.id, completedMissionsList, completedCount) === 'available'
  );
  const availableCount = availableMissions.length;
  const totalXP = MISSIONS_DATA.reduce((sum, m) => sum + m.xpReward, 0);
  const earnedXP = MISSIONS_DATA
    .filter(m => completedMissionsList.includes(m.id))
    .reduce((sum, m) => sum + m.xpReward, 0);
  const progressPercentage = totalMissions > 0 ? (completedCount / totalMissions) * 100 : 0;

  // If an operation is selected, show its missions
  if (selectedOperation) {
    const operation = OPERATIONS[selectedOperation];
    const operationMissions = getMissionsByOperation(selectedOperation);
    const operationProgress = getOperationProgress(selectedOperation, completedMissionsList);
    
    return (
      <div className="min-h-full bg-background p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            onClick={() => setSelectedOperation(null)}
            className="mb-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Operations
          </Button>

          {/* Operation Header */}
          <div 
            className={`p-8 rounded-xl shadow-2xl border border-white/10 bg-gradient-to-br ${operation.gradient}`}
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20 shadow-lg flex-shrink-0">
                <operation.icon className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    {operation.difficulty}
                  </Badge>
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    {operationMissions.length} Missions
                  </Badge>
                </div>
                <h1 className="text-white drop-shadow-lg mb-2">{operation.title}</h1>
                <p className="text-white/90">{operation.description}</p>
              </div>
            </div>

            {/* Operation Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-white/90">Operation Progress</span>
                <span className="text-white font-semibold">{operationProgress}%</span>
              </div>
              <Progress value={operationProgress} className="h-3 bg-white/20" />
            </div>
          </div>

          {/* Missions List */}
          <div className="grid gap-4">
            {operationMissions.map((mission) => {
              const Icon = mission.icon;
              const status = getMissionStatus(mission.id, completedMissionsList, completedCount);
              const isCompleted = status === 'completed';
              const isLocked = status === 'locked';
              const difficultyInfo = DIFFICULTY_INFO[mission.difficulty];

              return (
                <Card 
                  key={mission.id}
                  className={`overflow-hidden hover:shadow-lg transition-all ${
                    isLocked ? 'opacity-50' : 'cursor-pointer'
                  } ${mission.featured ? 'border-primary border-2' : ''}`}
                  onClick={() => !isLocked && onMissionSelect(mission.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      {/* Mission Icon */}
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        isCompleted ? 'bg-green-100 dark:bg-green-900' : 
                        isLocked ? 'bg-gray-100 dark:bg-gray-800' : 
                        'bg-primary/10'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                        ) : isLocked ? (
                          <Lock className="w-6 h-6 text-gray-400" />
                        ) : (
                          <Icon className="w-6 h-6 text-primary" />
                        )}
                      </div>

                      {/* Mission Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h3 className="mr-2">{mission.title}</h3>
                          
                          {mission.featured && (
                            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                              ⭐ Featured
                            </Badge>
                          )}
                          
                          <Badge variant="secondary" className={difficultyInfo.color}>
                            {difficultyInfo.icon} {mission.difficulty}
                          </Badge>

                          {isCompleted && (
                            <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                              ✅ Complete
                            </Badge>
                          )}

                          {isLocked && (
                            <Badge variant="secondary" className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                              🔒 Locked
                            </Badge>
                          )}
                        </div>

                        <p className="text-sm text-muted-foreground mb-3">
                          {mission.description}
                        </p>

                        <div className="flex flex-wrap gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span>{mission.estimatedTime}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Award className="w-4 h-4 text-primary" />
                            <span className="text-primary font-semibold">{mission.xpReward} XP</span>
                          </div>
                          {mission.category && (
                            <div className="flex items-center gap-1">
                              <Target className="w-4 h-4 text-muted-foreground" />
                              <span>{mission.category}</span>
                            </div>
                          )}
                        </div>

                        {/* Unlock requirement message */}
                        {isLocked && mission.unlockRequirement && (
                          <div className="mt-3 p-2 bg-muted rounded-lg">
                            <p className="text-xs text-muted-foreground">
                              🔒 Complete {mission.unlockRequirement.value} missions to unlock
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Action Button */}
                      {!isLocked && (
                        <Button 
                          variant={isCompleted ? "outline" : "default"}
                          size="sm"
                          className="flex-shrink-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            onMissionSelect(mission.id);
                          }}
                        >
                          {isCompleted ? 'Review' : 'Start'}
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Default view: Operations Overview
  return (
    <div className="min-h-full bg-background p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-10 md:space-y-12">
        
        {/* Mission Operations - Command Header */}
        <div className="animate-in fade-in duration-500">
          <div className="p-8 rounded-xl shadow-2xl border border-white/10 transition-all hover:shadow-3xl" style={{ background: 'var(--gradient-primary)' }}>
            <div className="space-y-6">
              {/* Identity Row */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                {/* Branch & Mission Info */}
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20 shadow-lg flex-shrink-0">
                    <Target className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h1 className="text-white drop-shadow-lg tracking-tight">
                        {isDemo ? 'SSG Martinez - Operations Command' : 'Operations Command'}
                      </h1>
                      <Badge variant="secondary" className="text-xs bg-white/10 text-white/90 border-white/20">
                        <Flame className="w-3 h-3 mr-1" />
                        {availableCount} Active
                      </Badge>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-white/60" />
                        <span className="text-white/90 drop-shadow">{isDemo ? 'Staff Sergeant (E-6)' : (userData.rank || 'Service Member')}</span>
                      </div>
                      <div className="hidden sm:block w-1 h-1 rounded-full bg-white/40"></div>
                      <div className="flex items-center gap-2">
                        <span className="text-white/80 drop-shadow">{branchInfo.name}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trophy Icon */}
                <div className="flex items-center justify-center w-14 h-14 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg flex-shrink-0">
                  <Trophy className="w-7 h-7 text-white" />
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <p className="text-white/80 text-sm mb-1">Completed</p>
                  <p className="text-2xl font-bold text-white">{completedCount}/{totalMissions}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <p className="text-white/80 text-sm mb-1">Available</p>
                  <p className="text-2xl font-bold text-white">{availableCount}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <p className="text-white/80 text-sm mb-1">XP Earned</p>
                  <p className="text-2xl font-bold text-white">{earnedXP}/{totalXP}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <p className="text-white/80 text-sm mb-1">Progress</p>
                  <p className="text-2xl font-bold text-white">{Math.round(progressPercentage)}%</p>
                </div>
              </div>

              {/* Overall Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/90">Overall Progress</span>
                  <span className="text-white font-semibold">{Math.round(progressPercentage)}%</span>
                </div>
                <Progress value={progressPercentage} className="h-3 bg-white/20" />
              </div>
            </div>
          </div>
        </div>

        {/* Operations Overview */}
        <OperationsOverview 
          completedMissions={completedMissionsList}
          onOperationSelect={setSelectedOperation}
          onMissionSelect={onMissionSelect}
        />
      </div>
    </div>
  );
}
