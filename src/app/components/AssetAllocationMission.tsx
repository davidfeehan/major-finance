import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';

import { 
  ArrowLeft, 
  PieChart as PieChartIcon, 
  BookOpen, 
  CheckCircle,
  DollarSign,
  Target,
  AlertCircle,
  Clock,
  TrendingUp,
  Shuffle
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface AssetAllocationMissionProps {
  onBack: () => void;
  onComplete: () => void;
  userContext?: {
    rank: string;
    yearsOfService: string;
    currentAge: string;
    branch: string;
    completedMissions: number;
    completedMissionsList?: string[];
    xp: number;
  };
}

export function AssetAllocationMission({ onBack, onComplete, userContext }: AssetAllocationMissionProps) {
  const isCompleted = userContext?.completedMissionsList?.includes('asset-allocation') || false;
  
  const [completedModules, setCompletedModules] = useState<string[]>([]);

  const modules = [
    {
      id: 'allocation-basics',
      title: 'Asset Allocation Fundamentals',
      description: 'Understanding portfolio construction principles',
      duration: '7 min',
      difficulty: 'Intermediate'
    },
    {
      id: 'risk-return',
      title: 'Risk-Return Tradeoffs',
      description: 'Balancing risk tolerance and investment goals',
      duration: '8 min',
      difficulty: 'Intermediate'
    },
    {
      id: 'rebalancing',
      title: 'Portfolio Rebalancing',
      description: 'When and how to rebalance your portfolio',
      duration: '7 min',
      difficulty: 'Intermediate'
    },
    {
      id: 'lifecycle-investing',
      title: 'Lifecycle Investing',
      description: 'Age-based asset allocation strategies',
      duration: '8 min',
      difficulty: 'Intermediate'
    },
    {
      id: 'military-strategies',
      title: 'Military-Specific Strategies',
      description: 'Allocation strategies for military careers',
      duration: '8 min',
      difficulty: 'Advanced'
    },
    {
      id: 'tactical-allocation',
      title: 'Tactical Asset Allocation',
      description: 'Advanced portfolio management techniques',
      duration: '7 min',
      difficulty: 'Advanced'
    }
  ];

  const allocationByAge = [
    { 
      name: 'Age 25',
      stocks: 85,
      bonds: 10,
      alternatives: 5
    },
    { 
      name: 'Age 35',
      stocks: 75,
      bonds: 20,
      alternatives: 5
    },
    { 
      name: 'Age 45',
      stocks: 65,
      bonds: 30,
      alternatives: 5
    },
    { 
      name: 'Age 55',
      stocks: 50,
      bonds: 45,
      alternatives: 5
    },
    { 
      name: 'Age 65',
      stocks: 35,
      bonds: 60,
      alternatives: 5
    }
  ];

  const riskProfiles = [
    {
      name: 'Conservative',
      allocation: [
        { name: 'Bonds', value: 60, color: '#82ca9d' },
        { name: 'Stocks', value: 30, color: '#8884d8' },
        { name: 'Cash', value: 10, color: '#ffc658' }
      ],
      expectedReturn: '4-6%',
      volatility: 'Low'
    },
    {
      name: 'Moderate',
      allocation: [
        { name: 'Stocks', value: 60, color: '#8884d8' },
        { name: 'Bonds', value: 35, color: '#82ca9d' },
        { name: 'Alternatives', value: 5, color: '#ff8042' }
      ],
      expectedReturn: '6-8%',
      volatility: 'Medium'
    },
    {
      name: 'Aggressive',
      allocation: [
        { name: 'Stocks', value: 80, color: '#8884d8' },
        { name: 'Bonds', value: 10, color: '#82ca9d' },
        { name: 'Alternatives', value: 10, color: '#ff8042' }
      ],
      expectedReturn: '8-10%',
      volatility: 'High'
    }
  ];

  const toggleModule = (moduleId: string) => {
    setCompletedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const completionPercentage = (completedModules.length / modules.length) * 100;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500';
      case 'Intermediate': return 'bg-yellow-500';
      case 'Advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-full bg-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Missions
          </Button>
          
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-12 h-12 ${isCompleted ? 'bg-green-600' : 'bg-primary'} rounded-lg flex items-center justify-center`}>
              {isCompleted ? (
                <CheckCircle className="w-6 h-6 text-white" />
              ) : (
                <PieChartIcon className="w-6 h-6 text-primary-foreground" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1>Asset Allocation Mastery</h1>
                {isCompleted && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Completed
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground">
                Master portfolio construction and strategic asset allocation
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main Content */}
          <div className="space-y-6">
            {/* Progress Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Training Progress
                </CardTitle>
                <CardDescription>
                  Complete all modules to earn 300 XP and master asset allocation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Overall Progress</span>
                      <span>{completedModules.length}/{modules.length} modules</span>
                    </div>
                    <Progress value={completionPercentage} className="h-3" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <Target className="w-6 h-6 mx-auto mb-1 text-primary" />
                      <p className="text-sm">Completion</p>
                      <p className="font-bold">{completionPercentage.toFixed(0)}%</p>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <Clock className="w-6 h-6 mx-auto mb-1 text-primary" />
                      <p className="text-sm">Est. Time</p>
                      <p className="font-bold">45 min</p>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <DollarSign className="w-6 h-6 mx-auto mb-1 text-primary" />
                      <p className="text-sm">XP Reward</p>
                      <p className="font-bold">300 XP</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="modules" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="modules">Training Modules</TabsTrigger>
                <TabsTrigger value="risk-profiles">Risk Profiles</TabsTrigger>
                <TabsTrigger value="lifecycle">Lifecycle Strategy</TabsTrigger>
              </TabsList>

              <TabsContent value="modules" className="space-y-4">
                {modules.map((module, index) => (
                  <Card key={module.id} className={`cursor-pointer transition-all ${
                    completedModules.includes(module.id) ? 'border-green-500 bg-green-50 dark:bg-green-950' : 'hover:shadow-md'
                  }`}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            completedModules.includes(module.id) 
                              ? 'bg-green-500 text-white' 
                              : 'bg-muted text-muted-foreground'
                          }`}>
                            {completedModules.includes(module.id) ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : (
                              <span className="text-sm">{index + 1}</span>
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium">{module.title}</h3>
                            <p className="text-sm text-muted-foreground">{module.description}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {module.duration}
                              </Badge>
                              <div className="flex items-center gap-1">
                                <div className={`w-2 h-2 rounded-full ${getDifficultyColor(module.difficulty)}`} />
                                <span className="text-xs text-muted-foreground">{module.difficulty}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <Button 
                          onClick={() => toggleModule(module.id)}
                          variant={completedModules.includes(module.id) ? "default" : "outline"}
                        >
                          {completedModules.includes(module.id) ? 'Completed' : 'Start Module'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="risk-profiles" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {riskProfiles.map((profile) => (
                    <Card key={profile.name}>
                      <CardHeader>
                        <CardTitle className="text-center">{profile.name}</CardTitle>
                        <CardDescription className="text-center">
                          Expected Return: {profile.expectedReturn}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-48 mb-4">
                          <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                            <PieChart>
                              <Pie
                                data={profile.allocation}
                                cx="50%"
                                cy="50%"
                                innerRadius={30}
                                outerRadius={60}
                                dataKey="value"
                                label={(entry) => `${entry.value}%`}
                              >
                                {profile.allocation.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Pie>
                              <Tooltip />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                        
                        <div className="space-y-2">
                          {profile.allocation.map((item) => (
                            <div key={item.name} className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }}></div>
                                <span>{item.name}</span>
                              </div>
                              <span>{item.value}%</span>
                            </div>
                          ))}
                        </div>
                        
                        <div className="mt-4 pt-4 border-t">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Volatility:</span>
                            <Badge variant="outline">{profile.volatility}</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-blue-800 dark:text-blue-100">Choosing Your Profile</p>
                      <p className="text-blue-700 dark:text-blue-200">
                        Your risk profile should match your investment timeline and risk tolerance. Military members with stable income can often afford moderate to aggressive allocations early in their careers.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="lifecycle" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Lifecycle Asset Allocation
                    </CardTitle>
                    <CardDescription>
                      How your allocation should evolve with age
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 mb-4">
                      <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                        <BarChart data={allocationByAge}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis tickFormatter={(value) => `${value}%`} />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="stocks" fill="#8884d8" name="Stocks" stackId="a" />
                          <Bar dataKey="bonds" fill="#82ca9d" name="Bonds" stackId="a" />
                          <Bar dataKey="alternatives" fill="#ffc658" name="Alternatives" stackId="a" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="space-y-3">
                      {allocationByAge.map((item) => (
                        <div key={item.name} className="p-3 bg-muted rounded-lg">
                          <p className="font-medium mb-2">{item.name}</p>
                          <div className="grid grid-cols-3 gap-2 text-sm">
                            <div>Stocks: {item.stocks}%</div>
                            <div>Bonds: {item.bonds}%</div>
                            <div>Alts: {item.alternatives}%</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Shuffle className="w-5 h-5 text-green-600 mt-0.5" />
                        <div className="text-sm">
                          <p className="font-medium text-green-800 dark:text-green-100">Rebalancing Strategy</p>
                          <p className="text-green-700 dark:text-green-200">
                            Review and rebalance your portfolio annually or when allocations drift more than 5% from targets. Use TSP contribution changes to rebalance without tax consequences.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Complete Mission */}
            <Card className={isCompleted ? 'border-green-500/30 bg-green-500/5' : ''}>
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  {isCompleted && (
                    <div className="mb-4 p-4 bg-green-100 dark:bg-green-900/30 rounded-lg">
                      <div className="flex items-center justify-center gap-2 text-green-800 dark:text-green-100 mb-2">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-semibold">Mission Already Completed!</span>
                      </div>
                      <p className="text-sm text-green-700 dark:text-green-200">
                        You've already earned 300 XP for this mission. You can review the material anytime, but won't receive additional XP.
                      </p>
                    </div>
                  )}
                  <Button 
                    onClick={onComplete}
                    size="lg" 
                    className="px-8"
                    disabled={!isCompleted && completedModules.length < modules.length}
                    variant={isCompleted ? "outline" : "default"}
                  >
                    <CheckCircle className="mr-2 w-5 h-5" />
                    {isCompleted ? 'Review Mission' : 'Complete Mission & Earn 300 XP'}
                  </Button>
                  {!isCompleted && (
                    <p className="text-sm text-muted-foreground">
                      {completedModules.length < modules.length 
                        ? `Complete ${modules.length - completedModules.length} more modules to finish this mission`
                        : 'Congratulations! You\'ve completed all training modules.'
                      }
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
