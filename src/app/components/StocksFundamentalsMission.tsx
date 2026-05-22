import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';

import { 
  ArrowLeft, 
  TrendingUp, 
  BookOpen, 
  CheckCircle,
  DollarSign,
  BarChart3,
  Target,
  AlertCircle,
  Clock,
  LineChart,
  Building2
} from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface StocksFundamentalsMissionProps {
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

export function StocksFundamentalsMission({ onBack, onComplete, userContext }: StocksFundamentalsMissionProps) {
  const isCompleted = userContext?.completedMissionsList?.includes('stocks-fundamentals') || false;
  
  const [completedModules, setCompletedModules] = useState<string[]>([]);

  const modules = [
    {
      id: 'what-are-stocks',
      title: 'What Are Stocks?',
      description: 'Understanding ownership, shares, and equity',
      duration: '5 min',
      difficulty: 'Beginner'
    },
    {
      id: 'stock-types',
      title: 'Types of Stocks',
      description: 'Common vs Preferred, Growth vs Value',
      duration: '6 min',
      difficulty: 'Intermediate'
    },
    {
      id: 'stock-valuation',
      title: 'Stock Valuation Basics',
      description: 'P/E ratios, market cap, and key metrics',
      duration: '8 min',
      difficulty: 'Intermediate'
    },
    {
      id: 'dividends',
      title: 'Dividends & Returns',
      description: 'Understanding dividend income and total returns',
      duration: '6 min',
      difficulty: 'Intermediate'
    },
    {
      id: 'market-orders',
      title: 'Market Orders & Trading',
      description: 'How to buy and sell stocks effectively',
      duration: '7 min',
      difficulty: 'Intermediate'
    },
    {
      id: 'military-stocks',
      title: 'Military-Friendly Stock Investing',
      description: 'Best practices for active-duty investors',
      duration: '6 min',
      difficulty: 'Intermediate'
    }
  ];

  const stockPerformanceData = [
    { year: 2018, sp500: 100, military: 100 },
    { year: 2019, sp500: 131, military: 128 },
    { year: 2020, sp500: 118, military: 122 },
    { year: 2021, sp500: 157, military: 151 },
    { year: 2022, sp500: 129, military: 135 },
    { year: 2023, sp500: 163, military: 158 },
    { year: 2024, sp500: 181, military: 175 }
  ];

  const sectorData = [
    { name: 'Technology', return: 24.5, allocation: 25 },
    { name: 'Healthcare', return: 18.2, allocation: 15 },
    { name: 'Financials', return: 15.8, allocation: 15 },
    { name: 'Consumer', return: 12.3, allocation: 12 },
    { name: 'Industrials', return: 11.7, allocation: 10 },
    { name: 'Energy', return: 8.9, allocation: 8 },
    { name: 'Real Estate', return: 7.2, allocation: 8 },
    { name: 'Materials', return: 6.5, allocation: 7 }
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
                <TrendingUp className="w-6 h-6 text-primary-foreground" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1>Stocks Fundamentals</h1>
                {isCompleted && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Completed
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground">
                Master stock market fundamentals and equity investing
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
                  Complete all modules to earn 250 XP and unlock advanced stock strategies
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
                      <p className="font-bold">38 min</p>
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
                <TabsTrigger value="performance">Market Performance</TabsTrigger>
                <TabsTrigger value="sectors">Sector Analysis</TabsTrigger>
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
                      <LineChart className="w-5 h-5" />
                      Historical Stock Market Performance
                    </CardTitle>
                    <CardDescription>
                      S&P 500 vs Military-Focused Portfolio (2018-2024)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 mb-4">
                      <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                        <RechartsLineChart data={stockPerformanceData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="year" />
                          <YAxis tickFormatter={(value) => `${value}%`} />
                          <Tooltip formatter={(value) => [`${value}%`, '']} />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="sp500" 
                            stroke="#8884d8" 
                            strokeWidth={2}
                            name="S&P 500"
                          />
                          <Line 
                            type="monotone" 
                            dataKey="military" 
                            stroke="#82ca9d" 
                            strokeWidth={2}
                            name="Military Portfolio"
                          />
                        </RechartsLineChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="flex items-start gap-2 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium text-blue-800 dark:text-blue-100">Investment Tip</p>
                        <p className="text-blue-700 dark:text-blue-200">
                          Historical performance shows stocks generally outperform other asset classes over long periods. As a military member, your steady income and benefits position you well for long-term stock investing.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="sectors" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="w-5 h-5" />
                      Stock Market Sectors
                    </CardTitle>
                    <CardDescription>
                      Average annual returns and recommended allocation by sector
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 mb-4">
                      <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                        <BarChart data={sectorData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="return" fill="#8884d8" name="Avg Return (%)" />
                          <Bar dataKey="allocation" fill="#82ca9d" name="Suggested Allocation (%)" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="space-y-3">
                      {sectorData.map((sector) => (
                        <div key={sector.name} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <div className="flex-1">
                            <p className="font-medium">{sector.name}</p>
                            <p className="text-sm text-muted-foreground">Avg Return: {sector.return}%</p>
                          </div>
                          <Badge variant="outline">
                            {sector.allocation}% allocation
                          </Badge>
                        </div>
                      ))}
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
