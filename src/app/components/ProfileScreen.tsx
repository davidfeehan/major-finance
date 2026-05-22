import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { Avatar, AvatarFallback } from './ui/avatar';
import { 
  User, 
  Star, 
  Award, 
  Calendar, 
  MapPin, 
  Edit,
  Save,
  X,
  Trophy,
  Target,
  Shield,
  BookOpen,
  Mail,
  Phone,
  Home,
  Users,
  Briefcase,
  Heart
} from 'lucide-react';
import { demoUserProfile, demoMissions } from '../utils/demoData';
import { useTheme, MILITARY_THEMES } from './ThemeProvider';

interface UserData {
  rank: string;
  yearsOfService: string;
  retirementGoal: string;
  currentAge: string;
  desiredRetirementAge: string;
  xp: number;
  completedMissions: number;
}

interface ProfileScreenProps {
  userData: UserData;
  onUpdateProfile: (data: Partial<UserData>) => void;
  isDemo?: boolean;
}

export function ProfileScreen({ userData, onUpdateProfile, isDemo = false }: ProfileScreenProps) {
  const { theme } = useTheme();
  const branchInfo = MILITARY_THEMES[theme.branch];
  
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    rank: userData.rank,
    yearsOfService: userData.yearsOfService,
    retirementGoal: userData.retirementGoal,
    currentAge: userData.currentAge,
    desiredRetirementAge: userData.desiredRetirementAge
  });

  const currentLevel = Math.floor(userData.xp / 500) + 1;
  const xpForNextLevel = (currentLevel * 500) - userData.xp;
  const xpProgress = ((userData.xp % 500) / 500) * 100;

  // Generate user initials and display name
  const displayName = isDemo ? 'Marcus Martinez' : 'Service Member';
  const userInitials = isDemo ? 'MM' : 'SM';

  // Martinez's Real Achievements
  const martinezAchievements = [
    {
      id: 'onboarding',
      title: 'Financial Journey Started',
      description: 'Started Major Finance journey in 2012',
      icon: '🎖️',
      earned: true,
      date: '2012'
    },
    {
      id: 'emergency-fund',
      title: 'Emergency Fund Champion',
      description: 'Built and maintained $18,000 emergency fund for 8+ years',
      icon: '🛡️',
      earned: true,
      date: '2016'
    },
    {
      id: 'tsp-master',
      title: 'TSP Master',
      description: 'Maximized TSP match and grew balance to $128,450',
      icon: '📈',
      earned: true,
      date: '2021'
    },
    {
      id: 'investor',
      title: 'Savvy Investor',
      description: 'Built $45,300 investment portfolio with 11.2% returns',
      icon: '💰',
      earned: true,
      date: '2021'
    },
    {
      id: 'financial-mentor',
      title: 'Unit Financial Champion',
      description: 'Certified mentor helping 8+ soldiers achieve financial success',
      icon: '🏆',
      earned: true,
      date: '2024'
    },
    {
      id: 'level-2',
      title: 'Level 2 Achieved',
      description: 'Reached Level 2 with 850 XP',
      icon: '⭐',
      earned: true,
      date: '2024'
    },
    {
      id: 'four-missions',
      title: 'Mission Specialist',
      description: 'Completed 4 of 5 financial missions',
      icon: '🎯',
      earned: true,
      date: '2024'
    },
    {
      id: 'net-worth',
      title: 'Financial Transformation',
      description: 'Grew net worth from -$2,000 to +$61,400',
      icon: '💎',
      earned: true,
      date: 'In Progress'
    }
  ];

  const genericAchievements = [
    {
      id: 'welcome',
      title: 'Welcome Aboard',
      description: 'Completed onboarding',
      icon: '🎖️',
      earned: true,
      date: 'Recently'
    },
    {
      id: 'first-mission',
      title: 'First Mission',
      description: 'Completed your first financial mission',
      icon: '🎯',
      earned: userData.completedMissions > 0,
      date: userData.completedMissions > 0 ? 'Recently' : null
    },
    {
      id: 'level-up',
      title: 'Level Up',
      description: 'Reached Level 2',
      icon: '⭐',
      earned: currentLevel >= 2,
      date: currentLevel >= 2 ? 'Recently' : null
    },
    {
      id: 'mission-master',
      title: 'Mission Master',
      description: 'Completed 3 missions',
      icon: '🏆',
      earned: userData.completedMissions >= 3,
      date: userData.completedMissions >= 3 ? 'Recently' : null
    }
  ];

  const achievements = isDemo ? martinezAchievements : genericAchievements;

  const handleSave = () => {
    onUpdateProfile(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      rank: userData.rank,
      yearsOfService: userData.yearsOfService,
      retirementGoal: userData.retirementGoal,
      currentAge: userData.currentAge,
      desiredRetirementAge: userData.desiredRetirementAge
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-full bg-background p-4 md:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Enhanced Profile Header Card */}
        <Card className="border-2 border-primary/20 shadow-xl overflow-hidden">
          <div className="h-32 bg-gradient-to-br" style={{ background: 'var(--gradient-primary)' }}></div>
          <CardContent className="relative pt-0 pb-6">
            {/* Avatar positioned over gradient */}
            <div className="flex flex-col md:flex-row md:items-end gap-6 -mt-16 md:-mt-12">
              <div className="flex-shrink-0">
                <Avatar className="h-32 w-32 border-4 border-background shadow-2xl">
                  <AvatarFallback className="text-4xl font-bold" style={{ background: 'var(--gradient-primary)' }}>
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
              </div>
              
              <div className="flex-1 space-y-3 pb-2">
                {/* Name and Rank */}
                <div>
                  <div className="flex items-center gap-3 flex-wrap mb-2">
                    <h1 className="text-3xl">
                      {displayName}
                    </h1>
                    <Badge variant="secondary" className="text-sm">
                      Level {currentLevel}
                    </Badge>
                    {!isDemo && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditing(!isEditing)}
                      >
                        {isEditing ? <X className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
                        {isEditing ? 'Cancel' : 'Edit Profile'}
                      </Button>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4 flex-wrap text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      <span>{isDemo ? 'Staff Sergeant (E-6)' : userData.rank}</span>
                    </div>
                    <div className="hidden sm:block w-1 h-1 rounded-full bg-muted-foreground"></div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{branchInfo.icon}</span>
                      <span>{branchInfo.name}</span>
                    </div>
                    <div className="hidden sm:block w-1 h-1 rounded-full bg-muted-foreground"></div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{isDemo ? '12' : userData.yearsOfService} years of service</span>
                    </div>
                  </div>
                </div>

                {isDemo && (
                  <div className="flex items-start gap-2 p-3 bg-primary/5 border border-primary/20 rounded-lg">
                    <Trophy className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-primary">Unit Financial Champion</p>
                      <p className="text-xs text-muted-foreground">
                        Certified mentor helping 8+ soldiers achieve financial success
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* XP Progress Bar */}
            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-primary" />
                  <span className="font-medium">Progress to Level {currentLevel + 1}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {userData.xp} / {currentLevel * 500} XP
                </span>
              </div>
              <Progress value={xpProgress} className="h-3" />
              <p className="text-xs text-muted-foreground mt-2">
                {xpForNextLevel} XP needed for next level
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="text-center p-4 bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-lg">
                <div className="text-3xl font-bold text-blue-600">{userData.xp}</div>
                <div className="text-xs text-muted-foreground mt-1">Total XP</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20 rounded-lg">
                <div className="text-3xl font-bold text-purple-600">{currentLevel}</div>
                <div className="text-xs text-muted-foreground mt-1">Current Level</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/20 rounded-lg">
                <div className="text-3xl font-bold text-green-600">{userData.completedMissions}</div>
                <div className="text-xs text-muted-foreground mt-1">Missions Done</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 border border-yellow-500/20 rounded-lg">
                <div className="text-3xl font-bold text-yellow-600">
                  {achievements.filter(a => a.earned).length}
                </div>
                <div className="text-xs text-muted-foreground mt-1">Achievements</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Martinez's Personal Info (Demo Only) */}
        {isDemo && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Personal Information
              </CardTitle>
              <CardDescription>
                Marcus Martinez's profile details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Home className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">Fort Bragg, North Carolina</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Age</p>
                    <p className="font-medium">34 years old</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Heart className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Family</p>
                    <p className="font-medium">Married, 2 children</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">MOS</p>
                    <p className="font-medium">92Y - Unit Supply Specialist</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Unit</p>
                    <p className="font-medium">82nd Airborne Division</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Special Role</p>
                    <p className="font-medium">Unit Financial Champion</p>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-4 h-4 text-primary" />
                  <p className="font-medium">Retirement Goal</p>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed pl-6">
                  Retire at 20 years with financial security, continue serving through civilian career in logistics, 
                  and mentor the next generation of financially savvy soldiers.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Personal Information (Editable for non-demo) */}
        {!isDemo && (
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Your military and retirement details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isEditing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="rank">Military Rank</Label>
                    <Input
                      id="rank"
                      value={editData.rank}
                      onChange={(e) => setEditData(prev => ({ ...prev, rank: e.target.value }))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="yearsOfService">Years of Service</Label>
                    <Input
                      id="yearsOfService"
                      value={editData.yearsOfService}
                      onChange={(e) => setEditData(prev => ({ ...prev, yearsOfService: e.target.value }))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="currentAge">Current Age</Label>
                    <Input
                      id="currentAge"
                      type="number"
                      value={editData.currentAge}
                      onChange={(e) => setEditData(prev => ({ ...prev, currentAge: e.target.value }))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="desiredRetirementAge">Desired Retirement Age</Label>
                    <Input
                      id="desiredRetirementAge"
                      type="number"
                      value={editData.desiredRetirementAge}
                      onChange={(e) => setEditData(prev => ({ ...prev, desiredRetirementAge: e.target.value }))}
                    />
                  </div>
                  
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="retirementGoal">Retirement Goal</Label>
                    <Input
                      id="retirementGoal"
                      value={editData.retirementGoal}
                      onChange={(e) => setEditData(prev => ({ ...prev, retirementGoal: e.target.value }))}
                    />
                  </div>
                  
                  <div className="md:col-span-2 flex gap-2 pt-4">
                    <Button onClick={handleSave} className="flex-1">
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Military Rank</p>
                      <p className="text-sm text-muted-foreground">{userData.rank}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Years of Service</p>
                      <p className="text-sm text-muted-foreground">{userData.yearsOfService}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Current Age</p>
                      <p className="text-sm text-muted-foreground">{userData.currentAge}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Star className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Retirement Goal Age</p>
                      <p className="text-sm text-muted-foreground">{userData.desiredRetirementAge}</p>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2 flex items-center gap-3">
                    <Award className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Retirement Goal</p>
                      <p className="text-sm text-muted-foreground">{userData.retirementGoal}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              Achievements & Milestones
            </CardTitle>
            <CardDescription>
              {isDemo 
                ? "Martinez's financial journey accomplishments" 
                : "Your financial milestones and accomplishments"
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement) => (
                <div 
                  key={achievement.id}
                  className={`p-4 rounded-lg border transition-all ${ 
                    achievement.earned 
                      ? 'border-primary bg-gradient-to-br from-primary/5 to-primary/10 shadow-sm hover:shadow-md' 
                      : 'border-border bg-muted/30 opacity-60'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`text-3xl ${achievement.earned ? '' : 'grayscale opacity-40'}`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className={`font-semibold ${achievement.earned ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {achievement.title}
                        </h4>
                        {achievement.earned && (
                          <Badge variant="secondary" className="text-xs flex-shrink-0">
                            ✓ Earned
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {achievement.description}
                      </p>
                      {achievement.earned && achievement.date && (
                        <p className="text-xs text-primary font-medium mt-2">
                          {achievement.date}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Demo Mode Journey Summary */}
        {isDemo && (
          <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-primary" />
                The Martinez Story
              </CardTitle>
              <CardDescription>
                A 12-year journey from debt to financial success
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-background/60 rounded-lg border border-primary/20">
                  <p className="text-2xl font-bold text-primary">2012</p>
                  <p className="text-sm text-muted-foreground">Started with -$2,000 in debt</p>
                </div>
                <div className="p-4 bg-background/60 rounded-lg border border-primary/20">
                  <p className="text-2xl font-bold text-primary">2016-2024</p>
                  <p className="text-sm text-muted-foreground">Built wealth systematically</p>
                </div>
                <div className="p-4 bg-background/60 rounded-lg border border-primary/20">
                  <p className="text-2xl font-bold text-primary">$258,400</p>
                  <p className="text-sm text-muted-foreground">Total assets today</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">2012:</strong> Enlisted in the Army with credit card debt, started learning about personal finance
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">2016:</strong> Completed Emergency Fund mission, built $18,000 safety net
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">2019:</strong> Started investing outside TSP, built diversified portfolio
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">2021:</strong> Optimized TSP contributions to 15%, balance reached $128K
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">2024:</strong> Became Unit Financial Champion, mentoring 8+ soldiers, projecting $845K at retirement
                  </p>
                </div>
              </div>

              <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg mt-4">
                <p className="text-sm text-foreground font-medium mb-2">
                  "Financial discipline isn't about sacrifice—it's about securing your family's future. 
                  Every soldier deserves to serve with confidence, knowing their finances are mission-ready."
                </p>
                <p className="text-xs text-muted-foreground">— SSG Marcus Martinez, Unit Financial Champion</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
