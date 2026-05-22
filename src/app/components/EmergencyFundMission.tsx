import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

import { 
  ArrowLeft, 
  Shield, 
  Calculator, 
  Target, 
  DollarSign, 
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Home,
  Car,
  Utensils,
  Heart
} from 'lucide-react';

interface EmergencyFundMissionProps {
  onBack: () => void;
  onComplete: () => void;
  onNavigate?: (screen: string) => void;
  isDemo?: boolean;
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

export function EmergencyFundMission({ onBack, onComplete, onNavigate, isDemo = false, userContext }: EmergencyFundMissionProps) {
  // Check if this mission has been completed
  const isCompleted = userContext?.completedMissionsList?.includes('emergency-fund') || false;
  
  const [monthlyExpenses, setMonthlyExpenses] = useState({
    housing: '',
    food: '',
    transportation: '',
    healthcare: '',
    utilities: '',
    other: ''
  });
  const [currentSavings, setCurrentSavings] = useState('');
  const [monthlyContribution, setMonthlyContribution] = useState('');
  const [targetMonths, setTargetMonths] = useState('6');




  const totalMonthlyExpenses = Object.values(monthlyExpenses).reduce((sum, expense) => {
    return sum + (parseFloat(expense) || 0);
  }, 0);

  const targetAmount = totalMonthlyExpenses * parseInt(targetMonths);
  const currentAmount = parseFloat(currentSavings) || 0;
  const monthlyAmount = parseFloat(monthlyContribution) || 0;
  const monthsToGoal = monthlyAmount > 0 ? Math.ceil((targetAmount - currentAmount) / monthlyAmount) : 0;
  const progressPercentage = targetAmount > 0 ? Math.min((currentAmount / targetAmount) * 100, 100) : 0;

  const handleExpenseChange = (category: keyof typeof monthlyExpenses, value: string) => {
    setMonthlyExpenses(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const expenseCategories = [
    { key: 'housing' as const, label: 'Housing (Rent/Mortgage)', icon: Home, color: 'bg-blue-500' },
    { key: 'food' as const, label: 'Food & Groceries', icon: Utensils, color: 'bg-green-500' },
    { key: 'transportation' as const, label: 'Transportation', icon: Car, color: 'bg-purple-500' },
    { key: 'healthcare' as const, label: 'Healthcare', icon: Heart, color: 'bg-red-500' },
    { key: 'utilities' as const, label: 'Utilities', icon: DollarSign, color: 'bg-yellow-500' },
    { key: 'other' as const, label: 'Other Essentials', icon: Target, color: 'bg-gray-500' }
  ];

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
                <Shield className="w-6 h-6 text-primary-foreground" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1>Emergency Fund Mission</h1>
                {isCompleted && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Completed
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground">
                Build your financial fortress with a solid emergency fund
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main Content */}
          <div className="space-y-6">
            {/* Mission Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Mission Overview
                </CardTitle>
                <CardDescription>
                  Your emergency fund is your first line of defense against financial emergencies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <Target className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <h3>Goal</h3>
                    <p className="text-sm text-muted-foreground">3-6 months expenses</p>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <TrendingUp className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <h3>Priority</h3>
                    <p className="text-sm text-muted-foreground">High (Foundation)</p>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <CheckCircle className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <h3>Reward</h3>
                    <p className="text-sm text-muted-foreground">150 XP</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="calculator" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="calculator">Calculator</TabsTrigger>
                <TabsTrigger value="strategy">Strategy</TabsTrigger>
                <TabsTrigger value="progress">Progress</TabsTrigger>
              </TabsList>

              <TabsContent value="calculator" className="space-y-6">
                {/* Expense Calculator */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calculator className="w-5 h-5" />
                      Emergency Fund Calculator
                    </CardTitle>
                    <CardDescription>
                      Calculate your essential monthly expenses to determine your target emergency fund
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {expenseCategories.map((category) => {
                        const Icon = category.icon;
                        return (
                          <div key={category.key} className="space-y-2">
                            <Label className="flex items-center gap-2">
                              <div className={`w-4 h-4 ${category.color} rounded`}></div>
                              {category.label}
                            </Label>
                            <Input
                              type="number"
                              placeholder="0"
                              value={monthlyExpenses[category.key]}
                              onChange={(e) => handleExpenseChange(category.key, e.target.value)}
                            />
                          </div>
                        );
                      })}
                    </div>

                    <div className="pt-4 border-t">
                      <div className="flex justify-between items-center text-lg">
                        <span>Total Monthly Expenses:</span>
                        <span className="font-bold">${totalMonthlyExpenses.toLocaleString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Target Calculation */}
                <Card>
                  <CardHeader>
                    <CardTitle>Emergency Fund Target</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="targetMonths">Target Coverage (Months)</Label>
                      <select 
                        className="w-full p-2 border rounded-lg"
                        value={targetMonths}
                        onChange={(e) => setTargetMonths(e.target.value)}
                      >
                        <option value="3">3 months (Minimum)</option>
                        <option value="6">6 months (Recommended)</option>
                        <option value="9">9 months (Conservative)</option>
                        <option value="12">12 months (Maximum Security)</option>
                      </select>
                    </div>

                    <div className="p-4 bg-primary/10 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span>Emergency Fund Target:</span>
                        <span className="text-2xl font-bold text-primary">
                          ${targetAmount.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="strategy" className="space-y-6">
                {/* Military-Specific Strategy */}
                <Card>
                  <CardHeader>
                    <CardTitle>Military Emergency Fund Strategy</CardTitle>
                    <CardDescription>
                      Tailored approach for military financial security
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Consider Military-Specific Factors</p>
                          <p className="text-sm text-muted-foreground">
                            Account for deployment schedules, PCS moves, and potential duty station changes
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Use High-Yield Military Banks</p>
                          <p className="text-sm text-muted-foreground">
                            Navy Federal, USAA, and Pentagon Federal offer competitive savings rates
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Automate During Deployment</p>
                          <p className="text-muted-foreground">
                            Use deployment pay and lower expenses to rapidly build your emergency fund
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Don't Rely Only on TSP</p>
                          <p className="text-sm text-muted-foreground">
                            Keep emergency funds separate and easily accessible, not in retirement accounts
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="progress" className="space-y-6">
                {/* Progress Tracking */}
                <Card>
                  <CardHeader>
                    <CardTitle>Track Your Progress</CardTitle>
                    <CardDescription>
                      Monitor your emergency fund building journey
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentSavings">Current Emergency Savings ($)</Label>
                        <Input
                          id="currentSavings"
                          type="number"
                          placeholder="0"
                          value={currentSavings}
                          onChange={(e) => setCurrentSavings(e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="monthlyContribution">Monthly Contribution ($)</Label>
                        <Input
                          id="monthlyContribution"
                          type="number"
                          placeholder="0"
                          value={monthlyContribution}
                          onChange={(e) => setMonthlyContribution(e.target.value)}
                        />
                      </div>
                    </div>

                    {targetAmount > 0 && (
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Progress to Goal</span>
                            <span>{progressPercentage.toFixed(1)}%</span>
                          </div>
                          <Progress value={progressPercentage} className="h-3" />
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div className="p-3 bg-muted rounded-lg">
                            <p className="text-2xl font-bold text-primary">
                              ${(targetAmount - currentAmount).toLocaleString()}
                            </p>
                            <p className="text-sm text-muted-foreground">Remaining</p>
                          </div>
                          <div className="p-3 bg-muted rounded-lg">
                            <p className="text-2xl font-bold text-primary">
                              {monthsToGoal || '--'}
                            </p>
                            <p className="text-sm text-muted-foreground">Months to Goal</p>
                          </div>
                        </div>
                      </div>
                    )}
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
                        You've already earned 150 XP for this mission. You can review the material anytime, but won't receive additional XP.
                      </p>
                    </div>
                  )}
                  <Button 
                    onClick={onComplete}
                    size="lg" 
                    className="px-8"
                    variant={isCompleted ? "outline" : "default"}
                  >
                    <CheckCircle className="mr-2 w-5 h-5" />
                    {isCompleted ? 'Review Mission' : 'Complete Mission & Earn 150 XP'}
                  </Button>
                  {!isCompleted && (
                    <p className="text-sm text-muted-foreground">
                      Complete this mission to unlock advanced financial strategies
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