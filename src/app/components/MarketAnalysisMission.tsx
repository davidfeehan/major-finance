import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';

import { 
  ArrowLeft, 
  BarChart3, 
  BookOpen, 
  CheckCircle,
  DollarSign,
  Target,
  AlertCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  Activity
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface MarketAnalysisMissionProps {
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

export function MarketAnalysisMission({ onBack, onComplete, userContext }: MarketAnalysisMissionProps) {
  const isCompleted = userContext?.completedMissionsList?.includes('market-analysis') || false;
  
  const [completedModules, setCompletedModules] = useState<string[]>([]);

  const modules = [
    {
      id: 'market-basics',
      title: 'Market Analysis Fundamentals',
      description: 'Understanding market trends and indicators',
      duration: '8 min',
      difficulty: 'Intermediate'
    },
    {
      id: 'technical-analysis',
      title: 'Technical Analysis Basics',
      description: 'Charts, patterns, and price movements',
      duration: '9 min',
      difficulty: 'Advanced'
    },
    {
      id: 'fundamental-analysis',
      title: 'Fundamental Analysis',
      description: 'Evaluating company financials and value',
      duration: '10 min',
      difficulty: 'Advanced'
    },
    {
      id: 'market-indicators',
      title: 'Economic Indicators',
      description: 'GDP, inflation, employment, and market impact',
      duration: '8 min',
      difficulty: 'Intermediate'
    },
    {
      id: 'sentiment-analysis',
      title: 'Market Sentiment Analysis',
      description: 'Understanding investor psychology and behavior',
      duration: '7 min',
      difficulty: 'Intermediate'
    },
    {
      id: 'market-cycles',
      title: 'Market Cycles & Timing',
      description: 'Bull markets, bear markets, and corrections',
      duration: '8 min',
      difficulty: 'Advanced'
    }
  ];

  const marketCycleData = [
    { quarter: 'Q1 2020', market: 100, indicator: 95 },
    { quarter: 'Q2 2020', market: 85, indicator: 80 },
    { quarter: 'Q3 2020', market: 105, indicator: 100 },
    { quarter: 'Q4 2020', market: 118, indicator: 110 },
    { quarter: 'Q1 2021', market: 125, indicator: 115 },
    { quarter: 'Q2 2021', market: 135, indicator: 125 },
    { quarter: 'Q3 2021', market: 142, indicator: 130 },
    { quarter: 'Q4 2021', market: 155, indicator: 140 },
    { quarter: 'Q1 2022', market: 140, indicator: 135 },
    { quarter: 'Q2 2022', market: 125, indicator: 120 },
    { quarter: 'Q3 2022', market: 130, indicator: 125 },
    { quarter: 'Q4 2022', market: 138, indicator: 135 },
    { quarter: 'Q1 2023', market: 148, indicator: 145 },
    { quarter: 'Q2 2023', market: 160, indicator: 155 },
    { quarter: 'Q3 2023', market: 155, indicator: 150 },
    { quarter: 'Q4 2023', market: 172, indicator: 165 }
  ];

  const economicIndicators = [
    { name: 'GDP Growth', current: '2.8%', trend: 'up', impact: 'Positive' },
    { name: 'Unemployment', current: '3.7%', trend: 'down', impact: 'Positive' },
    { name: 'Inflation Rate', current: '3.2%', trend: 'down', impact: 'Positive' },
    { name: 'Interest Rates', current: '5.25%', trend: 'stable', impact: 'Neutral' },
    { name: 'Consumer Confidence', current: '102.5', trend: 'up', impact: 'Positive' },
    { name: 'Manufacturing Index', current: '48.7', trend: 'down', impact: 'Negative' }
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

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'Positive': return 'text-green-600 bg-green-50 dark:bg-green-950';
      case 'Negative': return 'text-red-600 bg-red-50 dark:bg-red-950';
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-950';
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
                <BarChart3 className="w-6 h-6 text-primary-foreground" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1>Market Analysis & Strategy</h1>
                {isCompleted && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Completed
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground">
                Master market analysis techniques and investment strategies
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
                  Complete all modules to earn 300 XP and master market analysis
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
                      <p className="font-bold">50 min</p>
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
                <TabsTrigger value="cycles">Market Cycles</TabsTrigger>
                <TabsTrigger value="indicators">Economic Indicators</TabsTrigger>
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

              <TabsContent value="cycles" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="w-5 h-5" />
                      Market Cycles Analysis (2020-2023)
                    </CardTitle>
                    <CardDescription>
                      Understanding bull and bear market patterns
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 mb-4">
                      <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                        <AreaChart data={marketCycleData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="quarter" angle={-45} textAnchor="end" height={80} />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Area 
                            type="monotone" 
                            dataKey="market" 
                            stroke="#8884d8" 
                            fill="#8884d8"
                            fillOpacity={0.6}
                            name="Market Index"
                          />
                          <Area 
                            type="monotone" 
                            dataKey="indicator" 
                            stroke="#82ca9d" 
                            fill="#82ca9d"
                            fillOpacity={0.4}
                            name="Leading Indicator"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="w-5 h-5 text-green-600" />
                          <p className="font-medium text-green-800 dark:text-green-100">Bull Market</p>
                        </div>
                        <p className="text-sm text-green-700 dark:text-green-200">
                          Sustained upward trend with investor optimism. Stay invested and continue regular contributions.
                        </p>
                      </div>
                      <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingDown className="w-5 h-5 text-red-600" />
                          <p className="font-medium text-red-800 dark:text-red-100">Bear Market</p>
                        </div>
                        <p className="text-sm text-red-700 dark:text-red-200">
                          Market decline of 20%+. Opportunity to buy quality assets at lower prices. Don't panic sell.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="indicators" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Key Economic Indicators
                    </CardTitle>
                    <CardDescription>
                      Current economic data and market impact
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {economicIndicators.map((indicator) => (
                        <div key={indicator.name} className="p-4 bg-muted rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              {getTrendIcon(indicator.trend)}
                              <p className="font-medium">{indicator.name}</p>
                            </div>
                            <Badge className={getImpactColor(indicator.impact)}>
                              {indicator.impact}
                            </Badge>
                          </div>
                          <p className="text-2xl font-bold">{indicator.current}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div className="text-sm">
                          <p className="font-medium text-blue-800 dark:text-blue-100">Military Investor Advantage</p>
                          <p className="text-blue-700 dark:text-blue-200">
                            Your steady military income provides stability during market volatility. Use market downturns as opportunities to increase TSP contributions and dollar-cost average into quality investments.
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
