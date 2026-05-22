import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';

import { 
  ArrowLeft, 
  Coins, 
  BookOpen, 
  CheckCircle,
  DollarSign,
  Target,
  AlertCircle,
  Clock,
  BarChart3,
  Flame
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface CommoditiesTradingMissionProps {
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

export function CommoditiesTradingMission({ onBack, onComplete, userContext }: CommoditiesTradingMissionProps) {
  const isCompleted = userContext?.completedMissionsList?.includes('commodities-trading') || false;
  
  const [completedModules, setCompletedModules] = useState<string[]>([]);

  const modules = [
    {
      id: 'commodities-intro',
      title: 'Introduction to Commodities',
      description: 'Understanding commodity markets and trading',
      duration: '7 min',
      difficulty: 'Beginner'
    },
    {
      id: 'commodity-types',
      title: 'Types of Commodities',
      description: 'Energy, metals, agriculture, and livestock',
      duration: '8 min',
      difficulty: 'Intermediate'
    },
    {
      id: 'gold-silver',
      title: 'Precious Metals Investing',
      description: 'Gold, silver, and portfolio hedging',
      duration: '7 min',
      difficulty: 'Intermediate'
    },
    {
      id: 'oil-energy',
      title: 'Energy Commodities',
      description: 'Oil, natural gas, and energy markets',
      duration: '8 min',
      difficulty: 'Intermediate'
    },
    {
      id: 'commodity-etfs',
      title: 'Commodity ETFs & Funds',
      description: 'Investing in commodities without futures',
      duration: '6 min',
      difficulty: 'Intermediate'
    },
    {
      id: 'risk-management',
      title: 'Risk Management in Commodities',
      description: 'Volatility, hedging, and position sizing',
      duration: '7 min',
      difficulty: 'Advanced'
    }
  ];

  const commodityPerformanceData = [
    { year: 2019, gold: 100, oil: 100, agriculture: 100 },
    { year: 2020, gold: 125, oil: 65, agriculture: 105 },
    { year: 2021, gold: 119, oil: 95, agriculture: 118 },
    { year: 2022, gold: 124, oil: 145, agriculture: 142 },
    { year: 2023, gold: 135, oil: 125, agriculture: 128 },
    { year: 2024, gold: 148, oil: 132, agriculture: 135 }
  ];

  const commodityAllocation = [
    { category: 'Gold & Precious Metals', conservative: 5, moderate: 7, aggressive: 10 },
    { category: 'Energy', conservative: 2, moderate: 4, aggressive: 6 },
    { category: 'Agriculture', conservative: 1, moderate: 3, aggressive: 5 },
    { category: 'Industrial Metals', conservative: 1, moderate: 2, aggressive: 4 }
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
                <Coins className="w-6 h-6 text-primary-foreground" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1>Commodities Trading</h1>
                {isCompleted && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Completed
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground">
                Learn commodity investing and diversification strategies
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
                  Complete all modules to earn 250 XP and master commodity investing
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
                      <p className="font-bold">43 min</p>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <DollarSign className="w-6 h-6 mx-auto mb-1 text-primary" />
                      <p className="text-sm">XP Reward</p>
                      <p className="font-bold">250 XP</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="modules" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="modules">Training Modules</TabsTrigger>
                <TabsTrigger value="performance">Performance Trends</TabsTrigger>
                <TabsTrigger value="allocation">Portfolio Allocation</TabsTrigger>
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

              <TabsContent value="performance" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Commodity Performance Trends
                    </CardTitle>
                    <CardDescription>
                      Historical performance across major commodity sectors (2019-2024)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 mb-4">
                      <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                        <AreaChart data={commodityPerformanceData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="year" />
                          <YAxis tickFormatter={(value) => `${value}%`} />
                          <Tooltip formatter={(value) => [`${value}%`, '']} />
                          <Legend />
                          <Area 
                            type="monotone" 
                            dataKey="gold" 
                            stackId="1"
                            stroke="#FFD700" 
                            fill="#FFD700"
                            fillOpacity={0.6}
                            name="Gold"
                          />
                          <Area 
                            type="monotone" 
                            dataKey="oil" 
                            stackId="2"
                            stroke="#000000" 
                            fill="#000000"
                            fillOpacity={0.6}
                            name="Oil"
                          />
                          <Area 
                            type="monotone" 
                            dataKey="agriculture" 
                            stackId="3"
                            stroke="#82ca9d" 
                            fill="#82ca9d"
                            fillOpacity={0.6}
                            name="Agriculture"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="flex items-start gap-2 p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                      <Flame className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium text-yellow-800 dark:text-yellow-100">Volatility Warning</p>
                        <p className="text-yellow-700 dark:text-yellow-200">
                          Commodities can be highly volatile. They work best as a small allocation (5-10%) within a diversified portfolio for inflation hedging and risk management.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="allocation" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Coins className="w-5 h-5" />
                      Recommended Commodity Allocation
                    </CardTitle>
                    <CardDescription>
                      Suggested portfolio allocation by risk tolerance
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {commodityAllocation.map((item) => (
                        <div key={item.category} className="p-4 bg-muted rounded-lg">
                          <p className="font-medium mb-3">{item.category}</p>
                          <div className="grid grid-cols-3 gap-4">
                            <div className="text-center">
                              <p className="text-sm text-muted-foreground mb-1">Conservative</p>
                              <p className="text-xl font-bold">{item.conservative}%</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-muted-foreground mb-1">Moderate</p>
                              <p className="text-xl font-bold">{item.moderate}%</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-muted-foreground mb-1">Aggressive</p>
                              <p className="text-xl font-bold">{item.aggressive}%</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div className="text-sm">
                          <p className="font-medium text-blue-800 dark:text-blue-100">Military Investor Tip</p>
                          <p className="text-blue-700 dark:text-blue-200">
                            For military members, consider commodity ETFs instead of futures contracts. They're easier to manage, especially during deployments, and provide similar diversification benefits.
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
                        You've already earned 250 XP for this mission. You can review the material anytime, but won't receive additional XP.
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
                    {isCompleted ? 'Review Mission' : 'Complete Mission & Earn 250 XP'}
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
