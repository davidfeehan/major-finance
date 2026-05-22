import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { 
  Trophy, 
  Target, 
  Star, 
  Calendar,
  TrendingUp,
  Award,
  Shield,
  PiggyBank,
  BookOpen,
  CheckCircle,
  Clock,
  DollarSign,
  Zap,
  Flame
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { demoUserProfile, demoMissions } from '../utils/demoData';
import { useTheme, MILITARY_THEMES } from './ThemeProvider';

interface UserData {
  xp: number;
  completedMissions: number;
  rank?: string;
  yearsOfService?: string;
}

interface ProgressScreenProps {
  userData: UserData;
  isDemo?: boolean;
}

export function ProgressScreen({ userData, isDemo = false }: ProgressScreenProps) {
  const { theme } = useTheme();
  const branchInfo = MILITARY_THEMES[theme.branch];
  const currentLevel = Math.floor(userData.xp / 500) + 1;
  const xpForNextLevel = (currentLevel * 500) - userData.xp;
  const xpProgress = ((userData.xp % 500) / 500) * 100;

  // Martinez's real mission data
  const martinezMissions = [
    {
      id: 'emergency-fund',
      title: 'Emergency Fund Mission',
      icon: Shield,
      xp: 150,
      status: 'completed',
      completedDate: 'March 2016',
      stars: 3,
      details: 'Built $18,000 emergency fund'
    },
    {
      id: 'investment-basics',
      title: 'Investment Training',
      icon: TrendingUp,
      xp: 200,
      status: 'completed',
      completedDate: 'August 2019',
      stars: 3,
      details: '$45,300 portfolio with 11.2% returns'
    },
    {
      id: 'tsp-optimization',
      title: 'TSP Optimization',
      icon: PiggyBank,
      xp: 300,
      status: 'completed',
      completedDate: 'November 2021',
      stars: 4,
      details: '$128,450 balance, projecting $845K'
    },
    {
      id: 'financial-education',
      title: 'Financial Education',
      icon: BookOpen,
      xp: 200,
      status: 'completed',
      completedDate: 'September 2023',
      stars: 5,
      details: 'Certified mentor helping 8+ soldiers'
    },
    {
      id: 'budget-creation',
      title: 'Create a Budget',
      icon: DollarSign,
      xp: 100,
      status: 'in-progress',
      completedDate: 'Started January 2025',
      progress: 45,
      details: 'Building comprehensive monthly budget'
    },
    {
      id: 'retirement-planning',
      title: 'Retirement Planning',
      icon: Target,
      xp: 250,
      status: 'in-progress',
      completedDate: 'Started June 2024',
      progress: 65,
      details: '94% probability of success'
    }
  ];

  const genericMissions = [
    {
      id: 'emergency-fund',
      title: 'Emergency Fund Mission',
      icon: Shield,
      xp: 150,
      status: userData.completedMissions >= 1 ? 'completed' : 'available',
      completedDate: userData.completedMissions >= 1 ? 'Recently' : null
    },
    {
      id: 'investment-basics',
      title: 'Investment Training',
      icon: TrendingUp,
      xp: 200,
      status: userData.completedMissions >= 2 ? 'completed' : userData.completedMissions >= 1 ? 'available' : 'locked',
      completedDate: userData.completedMissions >= 2 ? 'Recently' : null
    },
    {
      id: 'retirement-planning',
      title: 'Retirement Planning',
      icon: Target,
      xp: 250,
      status: userData.completedMissions >= 3 ? 'completed' : userData.completedMissions >= 2 ? 'available' : 'locked',
      completedDate: userData.completedMissions >= 3 ? 'Recently' : null
    },
    {
      id: 'tsp-optimization',
      title: 'TSP Optimization',
      icon: PiggyBank,
      xp: 300,
      status: userData.completedMissions >= 4 ? 'completed' : userData.completedMissions >= 3 ? 'available' : 'locked',
      completedDate: userData.completedMissions >= 4 ? 'Recently' : null
    },
    {
      id: 'financial-education',
      title: 'Financial Education',
      icon: BookOpen,
      xp: 100,
      status: userData.completedMissions >= 5 ? 'completed' : userData.completedMissions >= 1 ? 'available' : 'locked',
      completedDate: userData.completedMissions >= 5 ? 'Recently' : null
    }
  ];

  const missions = isDemo ? martinezMissions : genericMissions;

  // Martinez's real achievements
  const martinezAchievements = [
    {
      title: 'Journey Started',
      description: 'Started with -$2,000 in 2012',
      earned: true,
      icon: '🎖️',
      date: '2012'
    },
    {
      title: 'Emergency Fund Champion',
      description: 'Built and maintained $18K for 8+ years',
      earned: true,
      icon: '🛡️',
      date: '2016'
    },
    {
      title: 'Level 2 Achieved',
      description: 'Reached Level 2 with 850 XP',
      earned: true,
      icon: '⭐',
      date: '2024'
    },
    {
      title: 'Mission Master',
      description: 'Completed 4 of 5 missions',
      earned: true,
      icon: '🏆',
      date: '2024'
    },
    {
      title: 'Unit Financial Champion',
      description: 'Certified mentor helping others',
      earned: true,
      icon: '📚',
      date: '2024'
    },
    {
      title: 'Net Worth Transformation',
      description: 'Grew from -$2K to +$61.4K',
      earned: true,
      icon: '💎',
      date: 'In Progress'
    }
  ];

  const genericAchievements = [
    {
      title: 'Getting Started',
      description: 'Completed onboarding',
      earned: true,
      icon: '🎖️'
    },
    {
      title: 'First Steps',
      description: 'Completed first mission',
      earned: userData.completedMissions >= 1,
      icon: '🎯'
    },
    {
      title: 'Level Up',
      description: 'Reached Level 2',
      earned: currentLevel >= 2,
      icon: '⭐'
    },
    {
      title: 'Mission Master',
      description: 'Completed 3 missions',
      earned: userData.completedMissions >= 3,
      icon: '🏆'
    },
    {
      title: 'Knowledge Seeker',
      description: 'Completed all education modules',
      earned: false,
      icon: '📚'
    },
    {
      title: 'Financial Expert',
      description: 'Reached Level 5',
      earned: currentLevel >= 5,
      icon: '💎'
    }
  ];

  const achievements = isDemo ? martinezAchievements : genericAchievements;

  // Martinez's real progress over 12 years
  const martinezProgressData = [
    { month: '2012', xp: 0, level: 1, netWorth: -2000 },
    { month: '2016', xp: 150, level: 1, netWorth: 18000 },
    { month: '2019', xp: 350, level: 1, netWorth: 45000 },
    { month: '2021', xp: 650, level: 2, netWorth: 95000 },
    { month: '2023', xp: 850, level: 2, netWorth: 185000 },
    { month: '2024', xp: 850, level: 2, netWorth: 258400 }
  ];

  const genericProgressData = [
    { month: 'Week 1', xp: 100, level: 1 },
    { month: 'Week 2', xp: 250, level: 1 },
    { month: 'Week 3', xp: 400, level: 1 },
    { month: 'Week 4', xp: 650, level: 2 },
    { month: 'Week 5', xp: userData.xp, level: currentLevel }
  ].slice(0, Math.min(5, Math.floor(userData.xp / 100) + 1));

  const progressData = isDemo ? martinezProgressData : genericProgressData;

  const missionData = missions.map((mission, index) => ({
    name: mission.title.replace(' Mission', '').replace(' Training', ''),
    id: `${mission.id}-${index}`, // Ensure unique identifier with index
    xp: mission.status === 'completed' ? mission.xp : mission.status === 'in-progress' ? mission.xp * 0.65 : 0,
    maxXp: mission.xp
  }));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'border-green-500/20';
      case 'in-progress': return 'border-blue-500/20';
      case 'available': return 'border-border/40';
      case 'locked': return 'border-border/30';
      default: return 'border-border/40';
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/5';
      case 'in-progress': return 'bg-blue-500/5';
      case 'available': return 'bg-muted/30';
      case 'locked': return 'bg-muted/15';
      default: return 'bg-muted/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'in-progress': return Clock;
      case 'available': return Target;
      case 'locked': return Clock;
      default: return Clock;
    }
  };

  return (
    <div className="min-h-full bg-background p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-10 md:space-y-12">
        
        {/* Achievement Center - Command Header */}
        <div className="animate-in fade-in duration-500">
          <div className="p-8 rounded-xl shadow-2xl border border-white/10 transition-all hover:shadow-3xl" style={{ background: 'var(--gradient-primary)' }}>
            <div className="space-y-6">
              {/* Identity Row */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                {/* Branch & Progress Info */}
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20 shadow-lg flex-shrink-0">
                    <Trophy className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h1 className="text-white drop-shadow-lg tracking-tight">
                        {isDemo ? "SSG Marcus Martinez - Achievement Center" : "Achievement Center"}
                      </h1>
                      {isDemo && (
                        <Badge variant="secondary" className="text-xs bg-white/10 text-white/90 border-white/20">
                          <Flame className="w-3 h-3 mr-1" />
                          12-Year Journey
                        </Badge>
                      )}
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
                      {userData.yearsOfService && (
                        <>
                          <div className="hidden sm:block w-1 h-1 rounded-full bg-white/40"></div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-white/60" />
                            <span className="text-white/80 drop-shadow">{userData.yearsOfService} years</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* XP & Level Stats */}
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="flex items-center justify-end gap-2 mb-1">
                      <Zap className="w-5 h-5 text-yellow-300" />
                      <span className="text-2xl font-bold text-white drop-shadow-lg">{userData.xp}</span>
                    </div>
                    <p className="text-xs text-white/70 drop-shadow">Total XP</p>
                  </div>
                  <div className="h-12 w-px bg-white/20"></div>
                  <div className="text-right">
                    <div className="flex items-center justify-end gap-2 mb-1">
                      <Trophy className="w-5 h-5 text-yellow-300" />
                      <span className="text-2xl font-bold text-white drop-shadow-lg">{currentLevel}</span>
                    </div>
                    <p className="text-xs text-white/70 drop-shadow">Level</p>
                  </div>
                </div>
              </div>

              {/* Progress Stats Row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle className="w-4 h-4 text-green-300" />
                    <span className="text-xs text-white/70">Missions</span>
                  </div>
                  <p className="text-xl font-bold text-white">{userData.completedMissions}</p>
                </div>
                <div className="p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                  <div className="flex items-center gap-2 mb-1">
                    <Award className="w-4 h-4 text-purple-300" />
                    <span className="text-xs text-white/70">Achievements</span>
                  </div>
                  <p className="text-xl font-bold text-white">{achievements.filter(a => a.earned).length}</p>
                </div>
                <div className="p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                  <div className="flex items-center gap-2 mb-1">
                    <Star className="w-4 h-4 text-yellow-300" />
                    <span className="text-xs text-white/70">Level Progress</span>
                  </div>
                  <p className="text-xl font-bold text-white">{Math.round(xpProgress)}%</p>
                </div>
                <div className="p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                  <div className="flex items-center gap-2 mb-1">
                    <Target className="w-4 h-4 text-blue-300" />
                    <span className="text-xs text-white/70">To Next Level</span>
                  </div>
                  <p className="text-xl font-bold text-white">{xpForNextLevel} XP</p>
                </div>
              </div>
              
              {isDemo && (
                <div className="p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                  <p className="text-sm text-white/90 leading-relaxed">
                    <strong>Journey Summary:</strong> Started in 2012 with -$2,000 in debt. Through consistent learning and discipline, 
                    reached Level 2 in 2024 and became a Unit Financial Champion mentoring 8+ soldiers. From debt to $258,400 in assets.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Level Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              Level {currentLevel}
            </CardTitle>
            <CardDescription>
              {isDemo 
                ? 'Martinez\'s financial education journey over 12 years'
                : 'Your financial education journey progress'
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-primary/10 rounded-lg">
                <div className="text-2xl font-bold text-primary">{userData.xp}</div>
                <div className="text-sm text-muted-foreground">Total XP</div>
              </div>
              <div className="text-center p-3 bg-green-100 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{currentLevel}</div>
                <div className="text-sm text-muted-foreground">Current Level</div>
              </div>
              <div className="text-center p-3 bg-blue-100 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{userData.completedMissions}</div>
                <div className="text-sm text-muted-foreground">Missions Done</div>
              </div>
              <div className="text-center p-3 bg-purple-100 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {achievements.filter(a => a.earned).length}
                </div>
                <div className="text-sm text-muted-foreground">Achievements</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress to Level {currentLevel + 1}</span>
                <span>{xpForNextLevel} XP needed</span>
              </div>
              <Progress value={xpProgress} className="h-3" />
            </div>

            {isDemo && (
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Martinez's Journey:</strong> Started in 2012 with zero knowledge. Through consistent learning and discipline, 
                  reached Level 2 in 2024 and became a Unit Financial Champion mentoring 8+ soldiers.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Progress Chart */}
        <Card>
          <CardHeader>
            <CardTitle>{isDemo ? 'XP Progress Over 12 Years' : 'XP Progress Over Time'}</CardTitle>
            <CardDescription>
              {isDemo ? 'Martinez\'s learning and achievement milestones' : 'Track your learning journey'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <LineChart data={progressData}>
                  <CartesianGrid key="grid-1" strokeDasharray="3 3" />
                  <XAxis key="x-axis-1" dataKey="month" />
                  <YAxis key="y-axis-1" />
                  <Tooltip key="tooltip-1" />
                  <Legend key="legend-1" />
                  <Line 
                    key="xp-line"
                    type="monotone" 
                    dataKey="xp" 
                    stroke="#8884d8" 
                    strokeWidth={2}
                    name="Experience Points"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Mission Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Mission Progress</CardTitle>
              <CardDescription>
                {isDemo ? 'Martinez\'s completion status' : 'Your completion status across all missions'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2.5">
              {missions.map((mission) => {
                const Icon = mission.icon;
                const StatusIcon = getStatusIcon(mission.status);
                
                // Calculate progress for all missions
                const missionProgress = mission.status === 'completed' 
                  ? 100 
                  : ('progress' in mission && mission.progress) 
                    ? mission.progress 
                    : 0;
                
                return (
                  <div 
                    key={mission.id}
                    className={`group relative p-4 rounded-lg border transition-all duration-200 ${getStatusBgColor(mission.status)} ${getStatusColor(mission.status)} hover:shadow-sm`}
                  >
                    {/* Top row: Icon, Title, Status, and XP Badge */}
                    <div className="flex items-start justify-between gap-4">
                      {/* Left side: Icon and Mission Info */}
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div className="flex-shrink-0 mt-0.5">
                          <div className="w-9 h-9 rounded-md bg-muted/60 border border-border/40 flex items-center justify-center transition-colors group-hover:bg-muted/80">
                            <Icon className="w-4.5 h-4.5 text-muted-foreground" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0 space-y-2">
                          <div>
                            <h4 className="font-semibold leading-tight mb-1.5 text-foreground">
                              {mission.title}
                            </h4>
                            <div className="flex items-center gap-2 flex-wrap">
                              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-muted/60 border border-border/40">
                                <StatusIcon className="w-3.5 h-3.5 text-muted-foreground" />
                                <span className="text-xs font-medium text-foreground capitalize">
                                  {mission.status.replace('-', ' ')}
                                </span>
                              </div>
                              {mission.completedDate && (
                                <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                                  <Calendar className="w-3 h-3" />
                                  <span>{mission.completedDate}</span>
                                </span>
                              )}
                            </div>
                          </div>
                          
                          {/* Details text - moved under title */}
                          {isDemo && 'details' in mission && mission.details && (
                            <p className="text-sm text-muted-foreground leading-relaxed pl-0.5">
                              {mission.details}
                            </p>
                          )}
                          
                          {/* Progress bar - always show with color coding */}
                          <div className="space-y-1.5 pt-1">
                            <div className="flex items-center justify-between">
                              <span className={`text-xs font-medium ${
                                mission.status === 'completed' 
                                  ? 'text-green-600' 
                                  : mission.status === 'in-progress'
                                    ? 'text-blue-600'
                                    : 'text-muted-foreground'
                              }`}>
                                {mission.status === 'completed' 
                                  ? 'Completed' 
                                  : mission.status === 'in-progress'
                                    ? 'In Progress'
                                    : mission.status === 'locked'
                                      ? 'Locked'
                                      : 'Available'}
                              </span>
                              <span className={`text-xs font-semibold ${
                                mission.status === 'completed' 
                                  ? 'text-green-600' 
                                  : mission.status === 'in-progress'
                                    ? 'text-blue-600'
                                    : 'text-muted-foreground'
                              }`}>
                                {missionProgress}%
                              </span>
                            </div>
                            <div className="relative w-full h-1.5 rounded-full overflow-hidden bg-muted/60">
                              <div 
                                className={`h-full rounded-full transition-all duration-500 ${
                                  mission.status === 'completed'
                                    ? 'bg-green-500'
                                    : mission.status === 'in-progress'
                                      ? 'bg-blue-500'
                                      : 'bg-muted-foreground/50'
                                }`}
                                style={{ width: `${missionProgress}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Right side: XP and Stars */}
                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <Badge 
                          variant="outline" 
                          className="font-semibold bg-muted/50 border-border/50 text-foreground"
                        >
                          <Trophy className="w-3 h-3 mr-1 text-muted-foreground" />
                          {mission.xp} XP
                        </Badge>
                        {isDemo && 'stars' in mission && mission.stars && (
                          <div className="flex gap-0.5 px-2 py-1 rounded-md bg-muted/50 border border-border/50">
                            {Array.from({ length: mission.stars }).map((_, i) => (
                              <Star 
                                key={i} 
                                className="w-3.5 h-3.5 fill-yellow-600 text-yellow-600" 
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
              <CardDescription>
                {isDemo ? 'Martinez\'s milestones unlocked' : 'Milestones you\'ve unlocked'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {achievements.map((achievement, index) => (
                <div 
                  key={index}
                  className={`group p-4 rounded-lg border transition-all duration-200 hover:shadow-sm ${
                    achievement.earned 
                      ? 'bg-green-500/5 border-green-500/20' 
                      : 'bg-muted/15 border-border/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-md bg-muted/60 border border-border/40 transition-colors ${
                      achievement.earned 
                        ? 'group-hover:bg-muted/80' 
                        : 'grayscale opacity-40'
                    }`}>
                      <span className="text-2xl">
                        {achievement.icon}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-semibold leading-tight mb-1 ${
                        achievement.earned 
                          ? 'text-foreground' 
                          : 'text-muted-foreground'
                      }`}>
                        {achievement.title}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {achievement.description}
                      </p>
                      {achievement.earned && 'date' in achievement && achievement.date && (
                        <div className="flex items-center gap-1.5 mt-1.5">
                          <Calendar className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {achievement.date}
                          </span>
                        </div>
                      )}
                    </div>
                    {achievement.earned && (
                      <Badge 
                        variant="outline" 
                        className="text-xs font-semibold bg-muted/50 border-border/50 text-foreground flex-shrink-0"
                      >
                        <CheckCircle className="w-3 h-3 mr-1 text-muted-foreground" />
                        Earned
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Mission XP Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Mission XP Breakdown</CardTitle>
            <CardDescription>
              Experience points earned from each mission
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <BarChart data={missionData}>
                  <CartesianGrid key="grid-2" strokeDasharray="3 3" />
                  <XAxis key="x-axis-2" dataKey="name" angle={-45} textAnchor="end" height={80} />
                  <YAxis key="y-axis-2" />
                  <Tooltip key="tooltip-2" />
                  <Legend key="legend-2" />
                  <Bar key="earned-xp" dataKey="xp" fill="#8884d8" name="Earned XP" />
                  <Bar key="max-xp" dataKey="maxXp" fill="#e0e0e0" name="Total Available XP" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}