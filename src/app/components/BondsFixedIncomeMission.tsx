import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';

import { 
  ArrowLeft, 
  Shield, 
  BookOpen, 
  CheckCircle,
  DollarSign,
  Target,
  AlertCircle,
  Clock,
  TrendingDown,
  Percent
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface BondsFixedIncomeMissionProps {
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

export function BondsFixedIncomeMission({ onBack, onComplete, userContext }: BondsFixedIncomeMissionProps) {
  const isCompleted = userContext?.completedMissionsList?.includes('bonds-fixed-income') || false;
  
  const [completedModules, setCompletedModules] = useState<string[]>([]);

  const modules = [
    {
      id: 'bonds-basics',
      title: 'Bonds Fundamentals',
      description: 'Understanding fixed income securities',
      duration: '6 min',
      difficulty: 'Beginner'
    },
    {
      id: 'bond-types',
      title: 'Types of Bonds',
      description: 'Treasury, Municipal, Corporate, and I-Bonds',
      duration: '7 min',
      difficulty: 'Intermediate'
    },
    {
      id: 'interest-rates',
      title: 'Interest Rates & Bond Prices',
      description: 'How interest rates affect bond values',
      duration: '8 min',
      difficulty: 'Intermediate'
    },
    {
      id: 'bond-ladders',
      title: 'Bond Laddering Strategy',
      description: 'Building a diversified bond portfolio',
      duration: '7 min',
      difficulty: 'Intermediate'
    },
    {
      id: 'military-bonds',
      title: 'Savings Bonds for Military',
      description: 'I-Bonds, EE Bonds, and military benefits',
      duration: '6 min',
      difficulty: 'Intermediate'
    },
    {
      id: 'risk-assessment',
      title: 'Bond Risk Assessment',
      description: 'Credit risk, duration, and ratings',
      duration: '6 min',
      difficulty: 'Advanced'
    }
  ];

  const bondYieldData = [
    { maturity: '1Y', treasury: 4.2, corporate: 5.1, municipal: 3.5 },
    { maturity: '2Y', treasury: 4.1, corporate: 5.3, municipal: 3.6 },
    { maturity: '5Y', treasury: 4.0, corporate: 5.5, municipal: 3.8 },
    { maturity: '10Y', treasury: 4.2, corporate: 5.8, municipal: 4.0 },
    { maturity: '20Y', treasury: 4.5, corporate: 6.2, municipal: 4.3 },
    { maturity: '30Y', treasury: 4.6, corporate: 6.5, municipal: 4.5 }
  ];

  const bondAllocationData = [
    { age: '20-30', stocks: 80, bonds: 15, cash: 5 },
    { age: '30-40', stocks: 70, bonds: 25, cash: 5 },
    { age: '40-50', stocks: 60, bonds: 35, cash: 5 },
    { age: '50-60', stocks: 45, bonds: 50, cash: 5 },
    { age: '60+', stocks: 30, bonds: 65, cash: 5 }
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
                <Shield className="w-6 h-6 text-primary-foreground" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1>Bonds & Fixed Income</h1>
                {isCompleted && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Completed
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground">
                Master fixed income investing and bond strategies
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
                  Complete all modules to earn 250 XP and master bond investing
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
                      <p className="font-bold">40 min</p>
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
                <TabsTrigger value="yields">Bond Yields</TabsTrigger>
                <TabsTrigger value="allocation">Age-Based Allocation</TabsTrigger>
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

              <TabsContent value="yields" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Percent className="w-5 h-5" />
                      Current Bond Yields
                    </CardTitle>
                    <CardDescription>
                      Yield comparison across different bond types and maturities
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 mb-4">
                      <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                        <LineChart data={bondYieldData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="maturity" />
                          <YAxis tickFormatter={(value) => `${value}%`} />
                          <Tooltip formatter={(value) => [`${value}%`, '']} />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="treasury" 
                            stroke="#8884d8" 
                            strokeWidth={2}
                            name="Treasury Bonds"
                          />
                          <Line 
                            type="monotone" 
                            dataKey="corporate" 
                            stroke="#82ca9d" 
                            strokeWidth={2}
                            name="Corporate Bonds"
                          />
                          <Line 
                            type="monotone" 
                            dataKey="municipal" 
                            stroke="#ffc658" 
                            strokeWidth={2}
                            name="Municipal Bonds"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="flex items-start gap-2 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium text-blue-800 dark:text-blue-100">Military Advantage</p>
                        <p className="text-blue-700 dark:text-blue-200">
                          Series I Savings Bonds are excellent for military members with tax advantages and inflation protection. They're backed by the U.S. government and can be purchased through TreasuryDirect.gov.
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
                      <TrendingDown className="w-5 h-5" />
                      Age-Based Bond Allocation
                    </CardTitle>
                    <CardDescription>
                      Recommended asset allocation by age group
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 mb-4">
                      <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                        <BarChart data={bondAllocationData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="age" />
                          <YAxis tickFormatter={(value) => `${value}%`} />
                          <Tooltip formatter={(value) => [`${value}%`, '']} />
                          <Legend />
                          <Bar dataKey="stocks" fill="#8884d8" name="Stocks" stackId="a" />
                          <Bar dataKey="bonds" fill="#82ca9d" name="Bonds" stackId="a" />
                          <Bar dataKey="cash" fill="#ffc658" name="Cash" stackId="a" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="space-y-3">
                      {bondAllocationData.map((allocation) => (
                        <div key={allocation.age} className="p-3 bg-muted rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-medium">Age {allocation.age}</p>
                            <Badge variant="outline">{allocation.bonds}% Bonds</Badge>
                          </div>
                          <div className="grid grid-cols-3 gap-2 text-sm text-muted-foreground">
                            <div>Stocks: {allocation.stocks}%</div>
                            <div>Bonds: {allocation.bonds}%</div>
                            <div>Cash: {allocation.cash}%</div>
                          </div>
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
