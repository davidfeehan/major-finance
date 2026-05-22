import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Calculator, Target, DollarSign, TrendingUp, Shield, Clock, Info } from 'lucide-react';

interface QuickActionsProps {
  agentName: string;
  missionType: string;
  userContext?: {
    currentAge: string;
    yearsOfService: string;
    rank: string;
  };
  onResult: (result: any) => void;
  onClose: () => void;
}

interface CalculatorResult {
  type: string;
  value: number;
  details: Record<string, any>;
  recommendations: string[];
}

export function QuickActions({ agentName, missionType, userContext, onResult, onClose }: QuickActionsProps) {
  const [activeAction, setActiveAction] = useState<string>('');
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const getAvailableActions = () => {
    const baseActions = [
      {
        id: 'goal-setter',
        title: 'Set Financial Goal',
        icon: Target,
        description: 'Create a personalized financial target'
      }
    ];

    if (missionType.includes('Emergency')) {
      baseActions.push({
        id: 'emergency-calc',
        title: 'Emergency Fund Calculator',
        icon: Shield,
        description: 'Calculate your emergency fund target'
      });
    }

    if (missionType.includes('TSP')) {
      baseActions.push({
        id: 'tsp-calc',
        title: 'TSP Calculator',
        icon: Calculator,
        description: 'Optimize your TSP contributions'
      });
    }

    if (missionType.includes('Investment')) {
      baseActions.push({
        id: 'compound-calc',
        title: 'Compound Interest Calculator',
        icon: TrendingUp,
        description: 'See your money grow over time'
      });
    }

    return baseActions;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateEmergencyFund = () => {
    const monthlyExpenses = parseFloat(formData.monthlyExpenses) || 0;
    const dependents = parseInt(formData.dependents) || 0;
    const jobStability = formData.jobStability || 'stable';
    
    let multiplier = 3; // Base 3 months
    if (jobStability === 'unstable') multiplier = 6;
    if (dependents > 0) multiplier += 1;
    if (userContext?.rank?.includes('Officer')) multiplier += 0.5;
    
    const target = monthlyExpenses * multiplier;
    
    const result: CalculatorResult = {
      type: 'emergency-fund',
      value: target,
      details: {
        monthlyExpenses,
        dependents,
        jobStability,
        multiplier,
        militaryBonus: userContext?.rank?.includes('Officer') ? 0.5 : 0
      },
      recommendations: [
        `Target: $${target.toLocaleString()} (${multiplier} months of expenses)`,
        'Keep funds in high-yield savings account',
        'Consider military-specific emergency scenarios',
        userContext?.yearsOfService ? `With ${userContext.yearsOfService} years of service, prioritize PCS move reserves` : ''
      ].filter(Boolean)
    };
    
    setResult(result);
    onResult(result);
  };

  const calculateTSP = () => {
    const currentAge = parseInt(userContext?.currentAge || formData.currentAge) || 25;
    const currentBalance = parseFloat(formData.currentBalance) || 0;
    const monthlyContribution = parseFloat(formData.monthlyContribution) || 0;
    const retirementAge = parseInt(formData.retirementAge) || 65;
    const annualReturn = 0.07; // 7% average
    
    const years = retirementAge - currentAge;
    const monthlyReturn = annualReturn / 12;
    const totalMonths = years * 12;
    
    // Future value calculation
    const futureValueOfCurrent = currentBalance * Math.pow(1 + annualReturn, years);
    const futureValueOfContributions = monthlyContribution * 
      ((Math.pow(1 + monthlyReturn, totalMonths) - 1) / monthlyReturn);
    
    const totalValue = futureValueOfCurrent + futureValueOfContributions;
    
    const result: CalculatorResult = {
      type: 'tsp-projection',
      value: totalValue,
      details: {
        currentAge,
        currentBalance,
        monthlyContribution,
        retirementAge,
        years,
        annualReturn
      },
      recommendations: [
        `Projected TSP value at retirement: $${totalValue.toLocaleString()}`,
        'Maximize the 5% government match',
        'Consider Roth TSP for tax diversification',
        'Increase contributions with each promotion'
      ]
    };
    
    setResult(result);
    onResult(result);
  };

  const calculateCompoundInterest = () => {
    const principal = parseFloat(formData.principal) || 0;
    const monthlyContribution = parseFloat(formData.monthlyAddition) || 0;
    const annualRate = parseFloat(formData.interestRate) || 7;
    const years = parseInt(formData.years) || 10;
    
    const monthlyRate = annualRate / 100 / 12;
    const totalMonths = years * 12;
    
    // Compound interest with regular additions
    const futureValue = principal * Math.pow(1 + monthlyRate, totalMonths) +
      monthlyContribution * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
    
    const totalContributions = principal + (monthlyContribution * totalMonths);
    const totalInterest = futureValue - totalContributions;
    
    const result: CalculatorResult = {
      type: 'compound-interest',
      value: futureValue,
      details: {
        principal,
        monthlyContribution,
        annualRate,
        years,
        totalContributions,
        totalInterest
      },
      recommendations: [
        `Final amount: $${futureValue.toLocaleString()}`,
        `Total interest earned: $${totalInterest.toLocaleString()}`,
        'Start investing early to maximize compound growth',
        'Consider low-cost index funds for long-term growth'
      ]
    };
    
    setResult(result);
    onResult(result);
  };

  const setFinancialGoal = () => {
    const goalAmount = parseFloat(formData.goalAmount) || 0;
    const timeframe = parseInt(formData.timeframe) || 12;
    const currentSavings = parseFloat(formData.currentSavings) || 0;
    
    const remaining = goalAmount - currentSavings;
    const monthlyNeeded = remaining / timeframe;
    
    const result: CalculatorResult = {
      type: 'financial-goal',
      value: monthlyNeeded,
      details: {
        goalAmount,
        timeframe,
        currentSavings,
        remaining
      },
      recommendations: [
        `Monthly savings needed: $${monthlyNeeded.toLocaleString()}`,
        `Remaining amount: $${remaining.toLocaleString()}`,
        'Set up automatic transfers to reach your goal',
        'Track progress monthly and adjust as needed'
      ]
    };
    
    setResult(result);
    onResult(result);
  };

  const renderActionForm = () => {
    switch (activeAction) {
      case 'emergency-calc':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="monthlyExpenses">Monthly Essential Expenses</Label>
              <Input
                id="monthlyExpenses"
                type="number"
                placeholder="3000"
                value={formData.monthlyExpenses || ''}
                onChange={(e) => handleInputChange('monthlyExpenses', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="dependents">Number of Dependents</Label>
              <Input
                id="dependents"
                type="number"
                placeholder="0"
                value={formData.dependents || ''}
                onChange={(e) => handleInputChange('dependents', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="jobStability">Job Stability</Label>
              <select
                id="jobStability"
                className="w-full p-2 border rounded"
                value={formData.jobStability || 'stable'}
                onChange={(e) => handleInputChange('jobStability', e.target.value)}
              >
                <option value="stable">Stable (Active Duty)</option>
                <option value="unstable">Less Stable (Contract/Guard)</option>
              </select>
            </div>
            <Button onClick={calculateEmergencyFund} className="w-full">
              <Shield className="w-4 h-4 mr-2" />
              Calculate Emergency Fund
            </Button>
          </div>
        );

      case 'tsp-calc':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="currentBalance">Current TSP Balance</Label>
              <Input
                id="currentBalance"
                type="number"
                placeholder="50000"
                value={formData.currentBalance || ''}
                onChange={(e) => handleInputChange('currentBalance', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="monthlyContribution">Monthly Contribution</Label>
              <Input
                id="monthlyContribution"
                type="number"
                placeholder="500"
                value={formData.monthlyContribution || ''}
                onChange={(e) => handleInputChange('monthlyContribution', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="retirementAge">Target Retirement Age</Label>
              <Input
                id="retirementAge"
                type="number"
                placeholder="65"
                value={formData.retirementAge || ''}
                onChange={(e) => handleInputChange('retirementAge', e.target.value)}
              />
            </div>
            <Button onClick={calculateTSP} className="w-full">
              <Calculator className="w-4 h-4 mr-2" />
              Calculate TSP Projection
            </Button>
          </div>
        );

      case 'compound-calc':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="principal">Initial Investment</Label>
              <Input
                id="principal"
                type="number"
                placeholder="10000"
                value={formData.principal || ''}
                onChange={(e) => handleInputChange('principal', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="monthlyAddition">Monthly Addition</Label>
              <Input
                id="monthlyAddition"
                type="number"
                placeholder="500"
                value={formData.monthlyAddition || ''}
                onChange={(e) => handleInputChange('monthlyAddition', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="interestRate">Annual Interest Rate (%)</Label>
              <Input
                id="interestRate"
                type="number"
                placeholder="7"
                value={formData.interestRate || ''}
                onChange={(e) => handleInputChange('interestRate', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="years">Investment Period (Years)</Label>
              <Input
                id="years"
                type="number"
                placeholder="20"
                value={formData.years || ''}
                onChange={(e) => handleInputChange('years', e.target.value)}
              />
            </div>
            <Button onClick={calculateCompoundInterest} className="w-full">
              <TrendingUp className="w-4 h-4 mr-2" />
              Calculate Growth
            </Button>
          </div>
        );

      case 'goal-setter':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="goalAmount">Goal Amount</Label>
              <Input
                id="goalAmount"
                type="number"
                placeholder="10000"
                value={formData.goalAmount || ''}
                onChange={(e) => handleInputChange('goalAmount', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="timeframe">Timeframe (Months)</Label>
              <Input
                id="timeframe"
                type="number"
                placeholder="12"
                value={formData.timeframe || ''}
                onChange={(e) => handleInputChange('timeframe', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="currentSavings">Current Savings</Label>
              <Input
                id="currentSavings"
                type="number"
                placeholder="2000"
                value={formData.currentSavings || ''}
                onChange={(e) => handleInputChange('currentSavings', e.target.value)}
              />
            </div>
            <Button onClick={setFinancialGoal} className="w-full">
              <Target className="w-4 h-4 mr-2" />
              Calculate Monthly Target
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  if (result) {
    return (
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            Calculation Result
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center p-4 bg-primary/10 rounded-lg">
            <div className="text-2xl font-bold text-primary">
              ${result.value.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground capitalize">
              {result.type.replace('-', ' ')} Result
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium">Recommendations:</h4>
            {result.recommendations.map((rec, index) => (
              <div key={index} className="flex items-start gap-2 text-sm">
                <Badge variant="outline" className="mt-0.5 text-xs">{index + 1}</Badge>
                <span>{rec}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Button onClick={() => { setResult(null); setActiveAction(''); }} variant="outline" className="flex-1">
              New Calculation
            </Button>
            <Button onClick={onClose} className="flex-1">
              Continue Chat
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (activeAction) {
    return (
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="capitalize">{activeAction.replace('-', ' ')}</span>
            <Button variant="ghost" size="sm" onClick={() => setActiveAction('')}>
              Back
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {renderActionForm()}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5" />
          Quick Actions
          <Badge variant="outline">{agentName}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          {getAvailableActions().map((action) => {
            const Icon = action.icon;
            return (
              <Button
                key={action.id}
                variant="outline"
                className="h-auto p-4 flex items-start gap-3 text-left"
                onClick={() => setActiveAction(action.id)}
              >
                <Icon className="w-5 h-5 mt-0.5 text-primary" />
                <div className="flex-1">
                  <div className="font-medium">{action.title}</div>
                  <div className="text-sm text-muted-foreground">{action.description}</div>
                </div>
              </Button>
            );
          })}
        </div>
        <Button variant="ghost" onClick={onClose} className="w-full mt-4">
          Close
        </Button>
      </CardContent>
    </Card>
  );
}