import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';

import { 
  ArrowLeft, 
  DollarSign, 
  Calculator, 
  Target, 
  TrendingUp,
  TrendingDown,
  CheckCircle,
  AlertTriangle,
  PiggyBank,
  ShoppingCart,
  Home,
  Car,
  Utensils,
  Heart,
  Zap,
  Plane,
  Shield,
  Info,
  Award,
  Sparkles,
  ChevronRight,
  Lightbulb
} from 'lucide-react';

interface BudgetMissionProps {
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
  isDemo?: boolean;
}

interface BudgetCategory {
  key: string;
  label: string;
  icon: any;
  color: string;
  recommended?: number;
}

export function BudgetMission({ onBack, onComplete, userContext, isDemo = false }: BudgetMissionProps) {
  // Check if this mission has been completed
  const isCompleted = userContext?.completedMissionsList?.includes('budget-creation') || false;
  
  // Income State
  const [income, setIncome] = useState({
    basePay: isDemo ? '5200' : '',
    bah: isDemo ? '1800' : '',
    bas: isDemo ? '406' : '',
    specialPay: isDemo ? '0' : '',
    otherIncome: isDemo ? '0' : ''
  });

  // Expense State - Needs (50%)
  const [needs, setNeeds] = useState({
    housing: isDemo ? '1600' : '',
    utilities: isDemo ? '180' : '',
    groceries: isDemo ? '600' : '',
    transportation: isDemo ? '350' : '',
    insurance: isDemo ? '200' : '',
    healthcare: isDemo ? '80' : '',
    childcare: isDemo ? '0' : '',
    debtPayments: isDemo ? '0' : ''
  });

  // Expense State - Wants (30%)
  const [wants, setWants] = useState({
    dining: isDemo ? '250' : '',
    entertainment: isDemo ? '150' : '',
    shopping: isDemo ? '200' : '',
    hobbies: isDemo ? '100' : '',
    subscriptions: isDemo ? '80' : '',
    travel: isDemo ? '120' : '',
    other: isDemo ? '0' : ''
  });

  // Expense State - Savings (20%)
  const [savings, setSavings] = useState({
    emergencyFund: isDemo ? '300' : '',
    tsp: isDemo ? '780' : '',
    ira: isDemo ? '200' : '',
    investments: isDemo ? '200' : '',
    debtPayoff: isDemo ? '0' : '',
    goals: isDemo ? '200' : ''
  });

  // Calculate totals
  const totalIncome = Object.values(income).reduce((sum, val) => sum + (parseFloat(val) || 0), 0);
  const totalNeeds = Object.values(needs).reduce((sum, val) => sum + (parseFloat(val) || 0), 0);
  const totalWants = Object.values(wants).reduce((sum, val) => sum + (parseFloat(val) || 0), 0);
  const totalSavings = Object.values(savings).reduce((sum, val) => sum + (parseFloat(val) || 0), 0);
  const totalExpenses = totalNeeds + totalWants + totalSavings;
  const surplus = totalIncome - totalExpenses;

  // Calculate percentages
  const needsPercent = totalIncome > 0 ? (totalNeeds / totalIncome) * 100 : 0;
  const wantsPercent = totalIncome > 0 ? (totalWants / totalIncome) * 100 : 0;
  const savingsPercent = totalIncome > 0 ? (totalSavings / totalIncome) * 100 : 0;

  // Budget health score
  const calculateBudgetScore = () => {
    let score = 0;
    
    // Income entered
    if (totalIncome > 0) score += 20;
    
    // 50/30/20 rule adherence
    if (needsPercent <= 50) score += 20;
    if (wantsPercent <= 30) score += 20;
    if (savingsPercent >= 20) score += 20;
    
    // Positive or zero surplus
    if (surplus >= 0) score += 20;
    
    return score;
  };

  const budgetScore = calculateBudgetScore();

  const incomeCategories: BudgetCategory[] = [
    { key: 'basePay', label: 'Base Pay', icon: DollarSign, color: 'bg-blue-500' },
    { key: 'bah', label: 'BAH (Housing Allowance)', icon: Home, color: 'bg-green-500' },
    { key: 'bas', label: 'BAS (Subsistence)', icon: Utensils, color: 'bg-orange-500' },
    { key: 'specialPay', label: 'Special Pay', icon: Award, color: 'bg-purple-500' },
    { key: 'otherIncome', label: 'Other Income', icon: TrendingUp, color: 'bg-cyan-500' }
  ];

  const needsCategories: BudgetCategory[] = [
    { key: 'housing', label: 'Housing/Rent', icon: Home, color: 'bg-blue-500' },
    { key: 'utilities', label: 'Utilities', icon: Zap, color: 'bg-yellow-500' },
    { key: 'groceries', label: 'Groceries', icon: ShoppingCart, color: 'bg-green-500' },
    { key: 'transportation', label: 'Transportation', icon: Car, color: 'bg-purple-500' },
    { key: 'insurance', label: 'Insurance', icon: Shield, color: 'bg-red-500' },
    { key: 'healthcare', label: 'Healthcare', icon: Heart, color: 'bg-pink-500' },
    { key: 'childcare', label: 'Childcare', icon: Heart, color: 'bg-rose-500' },
    { key: 'debtPayments', label: 'Minimum Debt Payments', icon: TrendingDown, color: 'bg-orange-500' }
  ];

  const wantsCategories: BudgetCategory[] = [
    { key: 'dining', label: 'Dining Out', icon: Utensils, color: 'bg-orange-500' },
    { key: 'entertainment', label: 'Entertainment', icon: Sparkles, color: 'bg-purple-500' },
    { key: 'shopping', label: 'Shopping', icon: ShoppingCart, color: 'bg-pink-500' },
    { key: 'hobbies', label: 'Hobbies', icon: Target, color: 'bg-blue-500' },
    { key: 'subscriptions', label: 'Subscriptions', icon: TrendingUp, color: 'bg-cyan-500' },
    { key: 'travel', label: 'Travel & Vacation', icon: Plane, color: 'bg-green-500' },
    { key: 'other', label: 'Other Wants', icon: DollarSign, color: 'bg-gray-500' }
  ];

  const savingsCategories: BudgetCategory[] = [
    { key: 'emergencyFund', label: 'Emergency Fund', icon: Shield, color: 'bg-red-500' },
    { key: 'tsp', label: 'TSP Contributions', icon: TrendingUp, color: 'bg-blue-500' },
    { key: 'ira', label: 'IRA/Roth IRA', icon: PiggyBank, color: 'bg-green-500' },
    { key: 'investments', label: 'Other Investments', icon: TrendingUp, color: 'bg-purple-500' },
    { key: 'debtPayoff', label: 'Extra Debt Payoff', icon: Target, color: 'bg-orange-500' },
    { key: 'goals', label: 'Specific Goals', icon: Award, color: 'bg-cyan-500' }
  ];

  const handleIncomeChange = (key: string, value: string) => {
    setIncome(prev => ({ ...prev, [key]: value }));
  };

  const handleNeedsChange = (key: string, value: string) => {
    setNeeds(prev => ({ ...prev, [key]: value }));
  };

  const handleWantsChange = (key: string, value: string) => {
    setWants(prev => ({ ...prev, [key]: value }));
  };

  const handleSavingsChange = (key: string, value: string) => {
    setSavings(prev => ({ ...prev, [key]: value }));
  };

  const getBudgetHealthColor = () => {
    if (budgetScore >= 80) return 'text-green-600 dark:text-green-400';
    if (budgetScore >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getBudgetHealthLabel = () => {
    if (budgetScore >= 80) return 'Excellent';
    if (budgetScore >= 60) return 'Good';
    if (budgetScore >= 40) return 'Fair';
    return 'Needs Work';
  };

  const getRecommendations = () => {
    const recs: { icon: any; text: string; type: 'success' | 'warning' | 'error' }[] = [];
    
    if (totalIncome === 0) {
      recs.push({ 
        icon: TrendingUp, 
        text: 'Start by entering your monthly income to get personalized recommendations', 
        type: 'warning' 
      });
    } else {
      if (needsPercent > 50) {
        recs.push({ 
          icon: Home, 
          text: 'Your essential needs exceed 50% of income. Consider using the commissary for groceries or finding ways to reduce housing costs.', 
          type: 'error' 
        });
      }
      if (wantsPercent > 30) {
        recs.push({ 
          icon: ShoppingCart, 
          text: 'Discretionary spending is above 30%. Review subscriptions and dining out to free up more for savings.', 
          type: 'warning' 
        });
      }
      if (savingsPercent < 20) {
        recs.push({ 
          icon: PiggyBank, 
          text: 'Aim for at least 20% savings rate. Start with TSP matching (5%), then build emergency fund.', 
          type: 'error' 
        });
      }
      if (surplus < 0) {
        recs.push({ 
          icon: AlertTriangle, 
          text: `Budget deficit of ${Math.abs(surplus).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}. Reduce wants or increase income to balance.`, 
          type: 'error' 
        });
      }
      if (budgetScore === 100) {
        recs.push({ 
          icon: CheckCircle, 
          text: 'Perfect budget! You\'re following the 50/30/20 rule and on track for financial success!', 
          type: 'success' 
        });
      }
    }
    
    return recs;
  };

  return (
    <div className="min-h-full bg-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Dashboard
          </Button>
          
          {/* Hero Section - Clear value prop */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="flex items-center gap-3 flex-1">
              <div className={`w-12 h-12 ${isCompleted ? 'bg-green-600' : 'bg-primary'} rounded-lg flex items-center justify-center`}>
                {isCompleted ? (
                  <CheckCircle className="w-6 h-6 text-white" />
                ) : (
                  <DollarSign className="w-6 h-6 text-primary-foreground" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h1>Create Your Military Budget</h1>
                  {isCompleted && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Completed
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground">
                  Master the 50/30/20 rule for financial success
                </p>
              </div>
            </div>
            {!isCompleted && (
              <Badge variant="outline" className="w-fit">
                <Award className="w-4 h-4 mr-1" />
                +100 XP Reward
              </Badge>
            )}
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {/* Dashboard - Always visible when there's data */}
            {totalIncome > 0 && (
              <Card className="border-2 shadow-lg">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Calculator className="w-5 h-5" />
                      Budget Dashboard
                    </CardTitle>
                    <Badge className={budgetScore >= 80 ? 'bg-green-500' : budgetScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'}>
                      {budgetScore}/100
                    </Badge>
                  </div>
                  <CardDescription>Live view of your budget health</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Budget Health Visualization */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <DollarSign className="w-5 h-5 mx-auto mb-1 text-green-600 dark:text-green-400" />
                      <div className="text-sm text-muted-foreground">Income</div>
                      <div>{totalIncome.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <Shield className="w-5 h-5 mx-auto mb-1 text-blue-600 dark:text-blue-400" />
                      <div className="text-sm text-muted-foreground">Needs</div>
                      <div className={needsPercent <= 50 ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'}>
                        {needsPercent.toFixed(0)}%
                      </div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <Sparkles className="w-5 h-5 mx-auto mb-1 text-purple-600 dark:text-purple-400" />
                      <div className="text-sm text-muted-foreground">Wants</div>
                      <div className={wantsPercent <= 30 ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'}>
                        {wantsPercent.toFixed(0)}%
                      </div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <PiggyBank className="w-5 h-5 mx-auto mb-1 text-green-600 dark:text-green-400" />
                      <div className="text-sm text-muted-foreground">Savings</div>
                      <div className={savingsPercent >= 20 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                        {savingsPercent.toFixed(0)}%
                      </div>
                    </div>
                  </div>

                  {/* 50/30/20 Visual Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Budget Allocation</span>
                      <span className={getBudgetHealthColor()}>
                        {getBudgetHealthLabel()}
                      </span>
                    </div>
                    <div className="flex h-8 rounded-lg overflow-hidden border-2">
                      <div 
                        className="bg-blue-500 flex items-center justify-center text-white text-xs transition-all"
                        style={{ width: `${Math.min(needsPercent, 100)}%` }}
                      >
                        {needsPercent >= 10 && `${needsPercent.toFixed(0)}%`}
                      </div>
                      <div 
                        className="bg-purple-500 flex items-center justify-center text-white text-xs transition-all"
                        style={{ width: `${Math.min(wantsPercent, 100)}%` }}
                      >
                        {wantsPercent >= 10 && `${wantsPercent.toFixed(0)}%`}
                      </div>
                      <div 
                        className="bg-green-500 flex items-center justify-center text-white text-xs transition-all"
                        style={{ width: `${Math.min(savingsPercent, 100)}%` }}
                      >
                        {savingsPercent >= 10 && `${savingsPercent.toFixed(0)}%`}
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Needs (Target 50%)</span>
                      <span>Wants (Target 30%)</span>
                      <span>Savings (Target 20%)</span>
                    </div>
                  </div>

                  {/* Surplus/Deficit */}
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span>Monthly Balance:</span>
                    <span className={`text-xl ${surplus >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {surplus >= 0 ? '+' : ''}{surplus.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                    </span>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Smart Recommendations */}
            {getRecommendations().length > 0 && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="w-5 h-5" />
                    Smart Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {getRecommendations().map((rec, idx) => {
                    const Icon = rec.icon;
                    const bgColor = rec.type === 'success' ? 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800/50' :
                                   rec.type === 'error' ? 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800/50' :
                                   'bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-800/50';
                    const textColor = rec.type === 'success' ? 'text-green-900 dark:text-green-100' :
                                     rec.type === 'error' ? 'text-red-900 dark:text-red-100' :
                                     'text-yellow-900 dark:text-yellow-100';
                    const iconColor = rec.type === 'success' ? 'text-green-600 dark:text-green-400' :
                                     rec.type === 'error' ? 'text-red-600 dark:text-red-400' :
                                     'text-yellow-600 dark:text-yellow-400';
                    
                    return (
                      <div key={idx} className={`p-3 border rounded-lg flex gap-3 ${bgColor}`}>
                        <Icon className={`w-5 h-5 flex-shrink-0 ${iconColor}`} />
                        <p className={`text-sm ${textColor}`}>{rec.text}</p>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            )}

            {/* Input Tabs - Streamlined */}
            <Card>
              <CardHeader>
                <CardTitle>Build Your Budget</CardTitle>
                <CardDescription>
                  Enter your income and expenses across these four categories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="income" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="income" className="relative">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      Income
                    </TabsTrigger>
                    <TabsTrigger value="needs" className="relative">
                      <Shield className="w-4 h-4 mr-1" />
                      Needs
                      {totalIncome > 0 && (
                        <Badge variant="outline" className="ml-1 text-xs">
                          {needsPercent.toFixed(0)}%
                        </Badge>
                      )}
                    </TabsTrigger>
                    <TabsTrigger value="wants" className="relative">
                      <Sparkles className="w-4 h-4 mr-1" />
                      Wants
                      {totalIncome > 0 && (
                        <Badge variant="outline" className="ml-1 text-xs">
                          {wantsPercent.toFixed(0)}%
                        </Badge>
                      )}
                    </TabsTrigger>
                    <TabsTrigger value="savings" className="relative">
                      <PiggyBank className="w-4 h-4 mr-1" />
                      Savings
                      {totalIncome > 0 && (
                        <Badge variant="outline" className="ml-1 text-xs">
                          {savingsPercent.toFixed(0)}%
                        </Badge>
                      )}
                    </TabsTrigger>
                  </TabsList>

                  {/* INCOME TAB */}
                  <TabsContent value="income" className="space-y-4 mt-4">
                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertDescription>
                        Include all military pay: base pay, BAH, BAS, special pay, and any part-time income.
                      </AlertDescription>
                    </Alert>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {incomeCategories.map((category) => {
                        const Icon = category.icon;
                        return (
                          <div key={category.key} className="space-y-2">
                            <Label className="flex items-center gap-2">
                              <div className={`w-3 h-3 ${category.color} rounded`}></div>
                              {category.label}
                            </Label>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                              <Input
                                type="number"
                                placeholder="0"
                                className="pl-7"
                                value={income[category.key as keyof typeof income]}
                                onChange={(e) => handleIncomeChange(category.key, e.target.value)}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <Separator />

                    <div className="flex justify-between items-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                      <span>Total Monthly Income:</span>
                      <span className="text-2xl text-green-600 dark:text-green-400">
                        {totalIncome.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                      </span>
                    </div>

                    {totalIncome > 0 && (
                      <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/50 rounded-lg space-y-2">
                        <div className="flex items-center gap-2 mb-2">
                          <Target className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          <span className="text-sm text-blue-900 dark:text-blue-100">Recommended 50/30/20 Targets</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-sm">
                          <div className="text-center p-2 bg-white dark:bg-blue-900/30 rounded">
                            <div className="text-xs text-muted-foreground">Needs (50%)</div>
                            <div className="text-blue-900 dark:text-blue-100">{(totalIncome * 0.5).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>
                          </div>
                          <div className="text-center p-2 bg-white dark:bg-blue-900/30 rounded">
                            <div className="text-xs text-muted-foreground">Wants (30%)</div>
                            <div className="text-blue-900 dark:text-blue-100">{(totalIncome * 0.3).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>
                          </div>
                          <div className="text-center p-2 bg-white dark:bg-blue-900/30 rounded">
                            <div className="text-xs text-muted-foreground">Savings (20%)</div>
                            <div className="text-blue-900 dark:text-blue-100">{(totalIncome * 0.2).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  {/* NEEDS TAB */}
                  <TabsContent value="needs" className="space-y-4 mt-4">
                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertDescription>
                        Essential expenses you can't avoid: housing, utilities, basic groceries, transportation, and insurance. Target: ≤50% of income.
                      </AlertDescription>
                    </Alert>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {needsCategories.map((category) => {
                        const Icon = category.icon;
                        return (
                          <div key={category.key} className="space-y-2">
                            <Label className="flex items-center gap-2">
                              <div className={`w-3 h-3 ${category.color} rounded`}></div>
                              {category.label}
                            </Label>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                              <Input
                                type="number"
                                placeholder="0"
                                className="pl-7"
                                value={needs[category.key as keyof typeof needs]}
                                onChange={(e) => handleNeedsChange(category.key, e.target.value)}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>Total Needs:</span>
                        <span className="text-xl">
                          {totalNeeds.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                        </span>
                      </div>
                      {totalIncome > 0 && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Percentage of Income:</span>
                            <span className={needsPercent <= 50 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                              {needsPercent.toFixed(1)}% {needsPercent <= 50 ? '✓' : '⚠️'}
                            </span>
                          </div>
                          <Progress value={Math.min(needsPercent, 100)} className="h-2" />
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  {/* WANTS TAB */}
                  <TabsContent value="wants" className="space-y-4 mt-4">
                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertDescription>
                        Discretionary spending that improves quality of life: dining out, entertainment, hobbies, shopping. Target: ≤30% of income.
                      </AlertDescription>
                    </Alert>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {wantsCategories.map((category) => {
                        const Icon = category.icon;
                        return (
                          <div key={category.key} className="space-y-2">
                            <Label className="flex items-center gap-2">
                              <div className={`w-3 h-3 ${category.color} rounded`}></div>
                              {category.label}
                            </Label>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                              <Input
                                type="number"
                                placeholder="0"
                                className="pl-7"
                                value={wants[category.key as keyof typeof wants]}
                                onChange={(e) => handleWantsChange(category.key, e.target.value)}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>Total Wants:</span>
                        <span className="text-xl">
                          {totalWants.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                        </span>
                      </div>
                      {totalIncome > 0 && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Percentage of Income:</span>
                            <span className={wantsPercent <= 30 ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'}>
                              {wantsPercent.toFixed(1)}% {wantsPercent <= 30 ? '✓' : '⚠️'}
                            </span>
                          </div>
                          <Progress value={Math.min(wantsPercent, 100)} className="h-2" />
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  {/* SAVINGS TAB */}
                  <TabsContent value="savings" className="space-y-4 mt-4">
                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertDescription>
                        Emergency fund, TSP, IRA, and investment contributions. Target: ≥20% of income. Military tip: Max TSP matching first!
                      </AlertDescription>
                    </Alert>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {savingsCategories.map((category) => {
                        const Icon = category.icon;
                        return (
                          <div key={category.key} className="space-y-2">
                            <Label className="flex items-center gap-2">
                              <div className={`w-3 h-3 ${category.color} rounded`}></div>
                              {category.label}
                            </Label>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                              <Input
                                type="number"
                                placeholder="0"
                                className="pl-7"
                                value={savings[category.key as keyof typeof savings]}
                                onChange={(e) => handleSavingsChange(category.key, e.target.value)}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>Total Savings:</span>
                        <span className="text-xl text-green-600 dark:text-green-400">
                          {totalSavings.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                        </span>
                      </div>
                      {totalIncome > 0 && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Percentage of Income:</span>
                            <span className={savingsPercent >= 20 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                              {savingsPercent.toFixed(1)}% {savingsPercent >= 20 ? '✓' : '⚠️'}
                            </span>
                          </div>
                          <Progress value={Math.min(savingsPercent, 100)} className="h-2" />
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Military Pro Tips - Collapsible */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  Military Money-Saving Tips
                </CardTitle>
                <CardDescription>Maximize your military benefits</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/50 rounded-lg">
                  <div className="flex gap-2">
                    <ShoppingCart className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm text-blue-800 dark:text-blue-200">Use the Commissary</div>
                      <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">Save 30% on groceries vs civilian stores</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800/50 rounded-lg">
                  <div className="flex gap-2">
                    <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm text-green-800 dark:text-green-200">Max TSP Match</div>
                      <p className="text-xs text-green-700 dark:text-green-300 mt-1">Always contribute 5% for free government money</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/50 rounded-lg">
                  <div className="flex gap-2">
                    <Home className="w-4 h-4 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm text-purple-800 dark:text-purple-200">BAH Strategy</div>
                      <p className="text-xs text-purple-700 dark:text-purple-300 mt-1">If housing costs less than BAH, save the tax-free difference</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800/50 rounded-lg">
                  <div className="flex gap-2">
                    <Target className="w-4 h-4 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm text-orange-800 dark:text-orange-200">Deployment Savings</div>
                      <p className="text-xs text-orange-700 dark:text-orange-300 mt-1">Use deployments for supercharged savings with tax advantages</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            {totalIncome > 0 && (
              <Card className="border-2">
                <CardContent className="pt-6">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-muted-foreground">Mission Completion</div>
                        <div className={`text-xl ${getBudgetHealthColor()}`}>
                          {getBudgetHealthLabel()} - {budgetScore}% Complete
                        </div>
                      </div>
                      <Badge variant={budgetScore >= 60 ? "default" : "outline"}>
                        {budgetScore >= 60 ? 'Ready to Complete' : 'Needs Improvement'}
                      </Badge>
                    </div>
                    
                    <Progress value={budgetScore} className="h-2" />
                    
                    {isCompleted && (
                      <div className="mb-4 p-4 bg-green-100 dark:bg-green-900/30 rounded-lg">
                        <div className="flex items-center justify-center gap-2 text-green-800 dark:text-green-100 mb-2">
                          <CheckCircle className="w-5 h-5" />
                          <span className="font-semibold">Mission Already Completed!</span>
                        </div>
                        <p className="text-sm text-green-700 dark:text-green-200">
                          You've already earned 100 XP for this mission. You can review the material anytime, but won't receive additional XP.
                        </p>
                      </div>
                    )}
                    
                    <div className="flex gap-3 pt-2">
                      <Button 
                        onClick={onComplete} 
                        className="flex-1" 
                        disabled={!isCompleted && budgetScore < 60}
                        variant={isCompleted ? "outline" : "default"}
                        size="lg"
                      >
                        <CheckCircle className="mr-2 w-4 h-4" />
                        {isCompleted ? 'Review Mission' : 'Complete Mission & Earn 100 XP'}
                      </Button>
                    </div>
                    
                    {!isCompleted && budgetScore < 60 && (
                      <p className="text-xs text-center text-muted-foreground">
                        Achieve a budget score of at least 60% to complete this mission
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
