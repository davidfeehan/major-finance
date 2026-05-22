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
  PieChart,
  Target,
  AlertCircle,
  BarChart3,
  Shield,
  Clock
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';

interface InvestmentMissionProps {
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
    retirementGoal?: string;
    desiredRetirementAge?: string;
  };
}

export function InvestmentMission({ onBack, onComplete, userContext }: InvestmentMissionProps) {
  // Check if this mission has been completed
  const isCompleted = userContext?.completedMissionsList?.includes('investment-basics') || false;
  
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [riskTolerance, setRiskTolerance] = useState<string>('');
  const [investmentHorizon, setInvestmentHorizon] = useState<string>('');




  const modules = [
    {
      id: 'basics',
      title: 'Investment Basics',
      description: 'Understanding stocks, bonds, and mutual funds',
      duration: '5 min',
      difficulty: 'Beginner'
    },
    {
      id: 'tsp',
      title: 'TSP Deep Dive',
      description: 'Maximizing your Thrift Savings Plan',
      duration: '7 min',
      difficulty: 'Beginner'
    },
    {
      id: 'risk',
      title: 'Risk & Return',
      description: 'Understanding investment risk and portfolio allocation',
      duration: '6 min',
      difficulty: 'Intermediate'
    },
    {
      id: 'diversification',
      title: 'Diversification Strategy',
      description: 'Building a balanced investment portfolio',
      duration: '5 min',
      difficulty: 'Intermediate'
    },
    {
      id: 'taxes',
      title: 'Tax-Efficient Investing',
      description: 'Roth vs Traditional accounts for military',
      duration: '8 min',
      difficulty: 'Intermediate'
    },
    {
      id: 'advanced',
      title: 'Advanced Strategies',
      description: 'Asset allocation and rebalancing',
      duration: '10 min',
      difficulty: 'Advanced'
    }
  ];

  const portfolioExamples = [
    {
      name: 'Conservative (Age 50+)',
      stocks: 40,
      bonds: 50,
      international: 10,
      description: 'Lower risk, steady income focus'
    },
    {
      name: 'Moderate (Age 35-50)',
      stocks: 60,
      bonds: 30,
      international: 10,
      description: 'Balanced growth and stability'
    },
    {
      name: 'Aggressive (Age 20-35)',
      stocks: 70,
      bonds: 10,
      international: 20,
      description: 'Maximum growth potential'
    }
  ];

  const compoundGrowthData = [
    { year: 0, conservative: 10000, moderate: 10000, aggressive: 10000 },
    { year: 5, conservative: 12763, moderate: 13382, aggressive: 14026 },
    { year: 10, conservative: 16289, moderate: 17908, aggressive: 19672 },
    { year: 15, conservative: 20789, moderate: 23966, aggressive: 27590 },
    { year: 20, conservative: 26533, moderate: 32071, aggregate: 38697 },
    { year: 25, conservative: 33864, moderate: 42919, aggressive: 54274 },
    { year: 30, conservative: 43219, moderate: 57435, aggressive: 76123 }
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

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

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
            Back to Dashboard
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
                <h1>Investment Training Mission</h1>
                {isCompleted && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Completed
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground">
                Master the fundamentals of military-friendly investing
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
                  Complete all modules to earn 200 XP and unlock advanced strategies
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
                      <p className="font-bold">20 min</p>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <DollarSign className="w-6 h-6 mx-auto mb-1 text-primary" />
                      <p className="text-sm">XP Reward</p>
                      <p className="font-bold">200 XP</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="modules" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="modules">Training Modules</TabsTrigger>
                <TabsTrigger value="examples">Portfolio Examples</TabsTrigger>
                <TabsTrigger value="projections">Growth Projections</TabsTrigger>
              </TabsList>

              <TabsContent value="modules" className="space-y-4">
                {modules.map((module, index) => (
                  <Card key={module.id} className={`cursor-pointer transition-all ${
                    completedModules.includes(module.id) ? 'border-green-500 bg-green-50' : 'hover:shadow-md'
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

              <TabsContent value="examples" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="w-5 h-5" />
                      Military Portfolio Examples
                    </CardTitle>
                    <CardDescription>
                      Age-appropriate portfolio allocations for military investors
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {portfolioExamples.map((portfolio) => (
                        <div key={portfolio.name} className="space-y-4">
                          <div className="text-center">
                            <h3 className="font-medium mb-1">{portfolio.name}</h3>
                            <p className="text-sm text-muted-foreground">{portfolio.description}</p>
                          </div>
                          
                          <div className="h-32">
                            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                              <RechartsPieChart>
                                <Pie
                                  data={[
                                    { name: 'Stocks', value: portfolio.stocks },
                                    { name: 'Bonds', value: portfolio.bonds },
                                    { name: 'International', value: portfolio.international }
                                  ]}
                                  cx="50%"
                                  cy="50%"
                                  innerRadius={20}
                                  outerRadius={50}
                                  dataKey="value"
                                >
                                  {[{ name: 'Stocks' }, { name: 'Bonds' }, { name: 'International' }].map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                  ))}
                                </Pie>
                              </RechartsPieChart>
                            </ResponsiveContainer>
                          </div>
                          
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="flex items-center gap-1">
                                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                                Stocks
                              </span>
                              <span>{portfolio.stocks}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="flex items-center gap-1">
                                <div className="w-3 h-3 bg-green-500 rounded"></div>
                                Bonds
                              </span>
                              <span>{portfolio.bonds}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="flex items-center gap-1">
                                <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                                International
                              </span>
                              <span>{portfolio.international}%</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="projections" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Investment Growth Projections
                    </CardTitle>
                    <CardDescription>
                      How $10,000 grows over time with different portfolio strategies
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 mb-4">
                      <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                        <AreaChart data={compoundGrowthData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="year" />
                          <YAxis tickFormatter={(value) => `$${(value/1000).toFixed(0)}k`} />
                          <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
                          <Legend />
                          <Area 
                            type="monotone" 
                            dataKey="conservative" 
                            stackId="1" 
                            stroke="#8884d8" 
                            fill="#8884d8" 
                            name="Conservative (5%)"
                          />
                          <Area 
                            type="monotone" 
                            dataKey="moderate" 
                            stackId="2" 
                            stroke="#82ca9d" 
                            fill="#82ca9d" 
                            name="Moderate (7%)"
                          />
                          <Area 
                            type="monotone" 
                            dataKey="aggressive" 
                            stackId="3" 
                            stroke="#ffc658" 
                            fill="#ffc658" 
                            name="Aggressive (9%)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="flex items-start gap-2 p-4 bg-yellow-50 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium text-yellow-800">Important Note</p>
                        <p className="text-yellow-700">
                          Past performance doesn't guarantee future results. These are hypothetical projections for educational purposes.
                        </p>
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
                        You've already earned 200 XP for this mission. You can review the material anytime, but won't receive additional XP.
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
                    {isCompleted ? 'Review Mission' : 'Complete Mission & Earn 200 XP'}
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