import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { 
  ArrowLeft, 
  CreditCard, 
  TrendingDown, 
  DollarSign,
  Calendar,
  Target,
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
  Calculator
} from 'lucide-react';

interface DebtManagementMissionProps {
  onBack: () => void;
  onComplete: () => void;
  isDemo?: boolean;
  userContext?: {
    rank: string;
    yearsOfService: string;
    currentAge: string;
    branch: string;
  };
}

interface Debt {
  id: string;
  name: string;
  balance: number;
  interestRate: number;
  minimumPayment: number;
  type: 'credit-card' | 'auto-loan' | 'personal-loan' | 'other';
}

export function DebtManagementMission({ onBack, onComplete, isDemo = false, userContext }: DebtManagementMissionProps) {
  // Check if this mission has been completed
  const isCompleted = userContext?.completedMissionsList?.includes('debt-management') || false;
  
  const [debts, setDebts] = useState<Debt[]>([]);
  const [newDebt, setNewDebt] = useState({
    name: '',
    balance: '',
    interestRate: '',
    minimumPayment: '',
    type: 'credit-card' as const
  });
  const [monthlyPaymentBudget, setMonthlyPaymentBudget] = useState('');
  const [selectedStrategy, setSelectedStrategy] = useState<'avalanche' | 'snowball'>('avalanche');

  const addDebt = () => {
    if (newDebt.name && newDebt.balance && newDebt.interestRate && newDebt.minimumPayment) {
      const debt: Debt = {
        id: Date.now().toString(),
        name: newDebt.name,
        balance: parseFloat(newDebt.balance),
        interestRate: parseFloat(newDebt.interestRate),
        minimumPayment: parseFloat(newDebt.minimumPayment),
        type: newDebt.type
      };
      setDebts([...debts, debt]);
      setNewDebt({
        name: '',
        balance: '',
        interestRate: '',
        minimumPayment: '',
        type: 'credit-card'
      });
    }
  };

  const removeDebt = (id: string) => {
    setDebts(debts.filter(d => d.id !== id));
  };

  const totalDebt = debts.reduce((sum, debt) => sum + debt.balance, 0);
  const totalMinimumPayment = debts.reduce((sum, debt) => sum + debt.minimumPayment, 0);
  const averageInterestRate = debts.length > 0
    ? debts.reduce((sum, debt) => sum + debt.interestRate, 0) / debts.length
    : 0;

  // Debt payoff calculation
  const calculatePayoffPlan = () => {
    const budget = parseFloat(monthlyPaymentBudget) || totalMinimumPayment;
    if (debts.length === 0 || budget < totalMinimumPayment) return null;

    const extraPayment = budget - totalMinimumPayment;
    const sortedDebts = selectedStrategy === 'avalanche'
      ? [...debts].sort((a, b) => b.interestRate - a.interestRate)
      : [...debts].sort((a, b) => a.balance - b.balance);

    let totalMonths = 0;
    let totalInterest = 0;
    
    // Simplified calculation
    sortedDebts.forEach(debt => {
      const monthlyRate = debt.interestRate / 100 / 12;
      let balance = debt.balance;
      let months = 0;
      
      while (balance > 0 && months < 600) { // max 50 years
        const interest = balance * monthlyRate;
        const payment = debt.minimumPayment + (months === 0 ? extraPayment : 0);
        balance = balance + interest - payment;
        totalInterest += interest;
        months++;
      }
      
      totalMonths = Math.max(totalMonths, months);
    });

    return {
      months: totalMonths,
      totalInterest: totalInterest,
      totalPaid: totalDebt + totalInterest
    };
  };

  const payoffPlan = calculatePayoffPlan();

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
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Missions
          </Button>
          
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3 flex-1">
              <div className={`w-12 h-12 ${isCompleted ? 'bg-green-600' : 'bg-primary'} rounded-lg flex items-center justify-center flex-shrink-0`}>
                {isCompleted ? (
                  <CheckCircle2 className="w-6 h-6 text-white" />
                ) : (
                  <CreditCard className="w-6 h-6 text-primary-foreground" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl mb-2">Debt Management Mission</h1>
                  {isCompleted && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Completed
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground">
                  Take control of your debt and create a payoff strategy
                </p>
              </div>
            </div>
            {!isCompleted && (
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Target className="w-4 h-4 mr-2" />
                250 XP
              </Badge>
            )}
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="debts">Your Debts</TabsTrigger>
            <TabsTrigger value="strategy">Payoff Strategy</TabsTrigger>
            <TabsTrigger value="education">Learn</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Total Debt</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-destructive">
                    ${totalDebt.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {debts.length} {debts.length === 1 ? 'account' : 'accounts'}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Monthly Minimum</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ${totalMinimumPayment.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Required payment
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Avg Interest Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-amber-600">
                    {averageInterestRate.toFixed(2)}%
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Across all debts
                  </p>
                </CardContent>
              </Card>
            </div>

            {debts.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Debt Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {debts.map(debt => {
                    const debtPercentage = (debt.balance / totalDebt) * 100;
                    return (
                      <div key={debt.id}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <CreditCard className="w-4 h-4" />
                            <span className="font-medium">{debt.name}</span>
                            <Badge variant="outline" className="text-xs">
                              {debt.interestRate}% APR
                            </Badge>
                          </div>
                          <span className="font-semibold">
                            ${debt.balance.toLocaleString()}
                          </span>
                        </div>
                        <Progress value={debtPercentage} className="h-2" />
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            )}

            {debts.length === 0 && (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <CreditCard className="w-12 h-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-center mb-4">
                    No debts added yet. Start by adding your debts in the "Your Debts" tab.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Debts Tab */}
          <TabsContent value="debts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add a Debt</CardTitle>
                <CardDescription>
                  Track all your debts to create an effective payoff plan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="debtName">Debt Name</Label>
                    <Input
                      id="debtName"
                      placeholder="e.g., Chase Credit Card"
                      value={newDebt.name}
                      onChange={(e) => setNewDebt({ ...newDebt, name: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="debtType">Type</Label>
                    <select
                      id="debtType"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={newDebt.type}
                      onChange={(e) => setNewDebt({ ...newDebt, type: e.target.value as any })}
                    >
                      <option value="credit-card">Credit Card</option>
                      <option value="auto-loan">Auto Loan</option>
                      <option value="personal-loan">Personal Loan</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="balance">Current Balance ($)</Label>
                    <Input
                      id="balance"
                      type="number"
                      placeholder="5000"
                      value={newDebt.balance}
                      onChange={(e) => setNewDebt({ ...newDebt, balance: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="interestRate">Interest Rate (%)</Label>
                    <Input
                      id="interestRate"
                      type="number"
                      step="0.1"
                      placeholder="18.99"
                      value={newDebt.interestRate}
                      onChange={(e) => setNewDebt({ ...newDebt, interestRate: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="minimumPayment">Minimum Payment ($)</Label>
                    <Input
                      id="minimumPayment"
                      type="number"
                      placeholder="125"
                      value={newDebt.minimumPayment}
                      onChange={(e) => setNewDebt({ ...newDebt, minimumPayment: e.target.value })}
                    />
                  </div>
                </div>

                <Button onClick={addDebt} className="mt-4">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Add Debt
                </Button>
              </CardContent>
            </Card>

            {debts.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Your Debts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {debts.map(debt => (
                      <div
                        key={debt.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{debt.name}</span>
                            <Badge variant="outline" className="text-xs">
                              {debt.type.replace('-', ' ')}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground space-y-1">
                            <div>Balance: ${debt.balance.toLocaleString()}</div>
                            <div>APR: {debt.interestRate}% | Min Payment: ${debt.minimumPayment}</div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeDebt(debt.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Strategy Tab */}
          <TabsContent value="strategy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payoff Strategy</CardTitle>
                <CardDescription>
                  Choose your approach and see how quickly you can become debt-free
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="monthlyBudget">Monthly Payment Budget ($)</Label>
                  <Input
                    id="monthlyBudget"
                    type="number"
                    placeholder={totalMinimumPayment.toString()}
                    value={monthlyPaymentBudget}
                    onChange={(e) => setMonthlyPaymentBudget(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Minimum required: ${totalMinimumPayment.toLocaleString()}
                  </p>
                </div>

                <div className="space-y-4">
                  <Label>Repayment Method</Label>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Card
                      className={`cursor-pointer transition-all ${
                        selectedStrategy === 'avalanche'
                          ? 'border-primary shadow-md'
                          : 'hover:border-muted-foreground'
                      }`}
                      onClick={() => setSelectedStrategy('avalanche')}
                    >
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          <TrendingDown className="w-5 h-5" />
                          Debt Avalanche
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-2">
                          Pay off highest interest rate first
                        </p>
                        <Badge variant="secondary" className="text-xs">
                          Saves Most Money
                        </Badge>
                      </CardContent>
                    </Card>

                    <Card
                      className={`cursor-pointer transition-all ${
                        selectedStrategy === 'snowball'
                          ? 'border-primary shadow-md'
                          : 'hover:border-muted-foreground'
                      }`}
                      onClick={() => setSelectedStrategy('snowball')}
                    >
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          <Target className="w-5 h-5" />
                          Debt Snowball
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-2">
                          Pay off smallest balance first
                        </p>
                        <Badge variant="secondary" className="text-xs">
                          Quick Wins
                        </Badge>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {payoffPlan && debts.length > 0 && (
                  <Card className="bg-primary/5 border-primary/20">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Calculator className="w-5 h-5" />
                        Your Payoff Plan
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-3">
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Time to Payoff</div>
                          <div className="text-2xl font-bold">
                            {Math.floor(payoffPlan.months / 12)}y {payoffPlan.months % 12}m
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Total Interest</div>
                          <div className="text-2xl font-bold text-amber-600">
                            ${payoffPlan.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Total Paid</div>
                          <div className="text-2xl font-bold">
                            ${payoffPlan.totalPaid.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-background rounded-lg">
                        <p className="text-sm mb-2">
                          <strong>Recommended Strategy:</strong> {selectedStrategy === 'avalanche' ? 'Debt Avalanche' : 'Debt Snowball'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {selectedStrategy === 'avalanche'
                            ? 'Focus extra payments on debts with the highest interest rates to minimize total interest paid.'
                            : 'Focus on paying off your smallest debts first for quick psychological wins and motivation.'}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Education Tab */}
          <TabsContent value="education" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  Debt Management Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Always pay more than the minimum</p>
                      <p className="text-sm text-muted-foreground">
                        Even small extra payments can significantly reduce your payoff time and total interest.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Consider balance transfers</p>
                      <p className="text-sm text-muted-foreground">
                        Look for 0% APR balance transfer offers to reduce interest on credit card debt.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Avoid new debt</p>
                      <p className="text-sm text-muted-foreground">
                        Stop using credit cards while paying down debt to prevent the balance from growing.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Automate payments</p>
                      <p className="text-sm text-muted-foreground">
                        Set up automatic payments to never miss a due date and avoid late fees.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-amber-500/50 bg-amber-500/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-500">
                  <AlertTriangle className="w-5 h-5" />
                  Military-Specific Resources
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p>
                  <strong>SCRA Benefits:</strong> The Servicemembers Civil Relief Act can cap interest rates at 6% on debts incurred before active duty.
                </p>
                <p>
                  <strong>Military OneSource:</strong> Free financial counseling available 24/7 for debt management guidance.
                </p>
                <p>
                  <strong>Army Emergency Relief:</strong> Interest-free loans available for eligible soldiers facing financial hardship.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Complete Mission Button */}
        <Card className={`mt-8 ${isCompleted ? 'border-green-500/30 bg-green-500/5' : ''}`}>
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              {isCompleted && (
                <div className="mb-4 p-4 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <div className="flex items-center justify-center gap-2 text-green-800 dark:text-green-100 mb-2">
                    <CheckCircle2 className="w-5 h-5" />
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
                disabled={!isCompleted && debts.length === 0}
                variant={isCompleted ? "outline" : "default"}
              >
                <CheckCircle2 className="w-5 h-5 mr-2" />
                {isCompleted ? 'Review Mission' : 'Complete Mission & Earn 250 XP'}
              </Button>
              {!isCompleted && debts.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  Add at least one debt to complete this mission
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
