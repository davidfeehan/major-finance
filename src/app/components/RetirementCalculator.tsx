import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { Separator } from './ui/separator';
import { 
  ArrowLeft, 
  TrendingUp, 
  DollarSign, 
  Calculator,
  Target,
  Award,
  AlertCircle
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Legend } from 'recharts';

interface RetirementData {
  currentSavings: string;
  monthlyContribution: string;
  expectedReturn: string;
  retirementAge: string;
  currentAge: string;
  militaryPension: string;
  socialSecurityAge: string;
}

interface RetirementCalculatorProps {
  onBack: () => void;
  onCompleteMission: () => void;
  retirementData: RetirementData;
}

interface ProjectionData {
  age: number;
  totalSavings: number;
  monthlyIncome: number;
  cumulativeContributions: number;
  investmentGrowth: number;
}

export function RetirementCalculator({ onBack, onCompleteMission, retirementData }: RetirementCalculatorProps) {
  const [monthlyContribution, setMonthlyContribution] = useState(parseInt(retirementData.monthlyContribution) || 500);
  const [displayContribution, setDisplayContribution] = useState(parseInt(retirementData.monthlyContribution) || 500);
  const [projectionData, setProjectionData] = useState<ProjectionData[]>([]);
  const [finalProjection, setFinalProjection] = useState<ProjectionData | null>(null);
  const [isCalculating, setIsCalculating] = useState(true);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const calculateProjection = (contribution: number) => {
    const currentAge = parseInt(retirementData.currentAge);
    const retirementAge = parseInt(retirementData.retirementAge);
    const currentSavings = parseFloat(retirementData.currentSavings) || 0;
    const annualReturn = parseFloat(retirementData.expectedReturn) / 100;
    const monthlyReturn = annualReturn / 12;
    const yearsToRetirement = retirementAge - currentAge;
    const militaryPension = parseFloat(retirementData.militaryPension) || 0;
    const socialSecurityAge = parseInt(retirementData.socialSecurityAge);

    const data: ProjectionData[] = [];
    let savings = currentSavings;
    let totalContributions = 0;

    // TSP annual contribution limit (2024: $23,000, catch-up at 50: $7,500)
    const tspAnnualLimit = 23000;
    const catchUpLimit = 7500;

    for (let year = 0; year <= yearsToRetirement; year++) {
      const age = currentAge + year;
      
      if (year > 0) {
        // Calculate annual contribution with TSP limits
        let annualContribution = contribution * 12;
        const maxContribution = age >= 50 ? tspAnnualLimit + catchUpLimit : tspAnnualLimit;
        annualContribution = Math.min(annualContribution, maxContribution);
        
        // Add monthly contributions for the year with compound growth
        for (let month = 0; month < 12; month++) {
          const monthlyAmount = annualContribution / 12;
          savings += monthlyAmount;
          savings *= (1 + monthlyReturn);
          totalContributions += monthlyAmount;
        }
        
        // Add TSP employer matching (5% of base pay, simplified)
        if (annualContribution > 0) {
          const employerMatch = Math.min(annualContribution * 0.05, 1500); // Rough estimate
          savings += employerMatch;
          savings *= (1 + monthlyReturn);
        }
      }

      // Calculate monthly retirement income
      let monthlyIncome = 0;
      if (age >= retirementAge) {
        // 4% withdrawal rule for savings (safe withdrawal rate)
        monthlyIncome = (savings * 0.04) / 12;
        
        // Add military pension (inflation-adjusted if applicable)
        const pensionWithInflation = militaryPension * Math.pow(1.025, age - retirementAge);
        monthlyIncome += pensionWithInflation;
        
        // Add Social Security with more accurate calculation
        if (age >= socialSecurityAge) {
          let socialSecurity = 2100; // Updated average for 2024
          // Delayed retirement credits (8% per year after full retirement age)
          if (socialSecurityAge > 67) {
            const delayYears = socialSecurityAge - 67;
            socialSecurity *= (1 + (delayYears * 0.08));
          }
          // Early retirement reduction
          if (socialSecurityAge < 67) {
            const earlyYears = 67 - socialSecurityAge;
            socialSecurity *= (1 - (earlyYears * 0.067)); // ~6.7% per year
          }
          monthlyIncome += socialSecurity;
        }
      }

      data.push({
        age,
        totalSavings: Math.round(savings),
        monthlyIncome: Math.round(monthlyIncome),
        cumulativeContributions: Math.round(totalContributions),
        investmentGrowth: Math.round(savings - totalContributions)
      });
    }

    setProjectionData(data);
    setFinalProjection(data[data.length - 1]);
  };

  // Initial calculation only
  useEffect(() => {
    const performCalculation = async () => {
      setIsCalculating(true);
      // Add a small delay to show calculation is happening on first load
      await new Promise(resolve => setTimeout(resolve, 1000));
      calculateProjection(monthlyContribution);
      setIsCalculating(false);
    };
    
    performCalculation();
  }, [retirementData]);

  // Recalculate when monthlyContribution changes (but not on initial load)
  useEffect(() => {
    if (!isCalculating) {
      calculateProjection(monthlyContribution);
    }
  }, [monthlyContribution]);

  const handleContributionChange = (value: number[]) => {
    const newValue = value[0];
    // Update display immediately for smooth slider
    setDisplayContribution(newValue);
    
    // Debounce the actual calculation
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    
    debounceTimerRef.current = setTimeout(() => {
      setMonthlyContribution(newValue);
    }, 300); // Wait 300ms after user stops dragging
  };

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getRetirementScore = () => {
    if (!finalProjection) return { score: 0, status: 'Poor', color: 'text-red-500' };
    
    const monthlyIncome = finalProjection.monthlyIncome;
    const currentAge = parseInt(retirementData.currentAge);
    const yearsToRetirement = parseInt(retirementData.retirementAge) - currentAge;
    
    // Base score on income replacement ratio (assuming $4000-6000 target)
    let score = 0;
    if (monthlyIncome >= 7000) score = 95;
    else if (monthlyIncome >= 5500) score = 85;
    else if (monthlyIncome >= 4000) score = 75;
    else if (monthlyIncome >= 3000) score = 65;
    else if (monthlyIncome >= 2000) score = 50;
    else score = 30;
    
    // Bonus for diversification (multiple income sources)
    const hasPension = parseFloat(retirementData.militaryPension) > 0;
    const hasSavings = finalProjection.totalSavings > 100000;
    const hasSocialSecurity = parseInt(retirementData.socialSecurityAge) <= 70;
    
    const diversificationBonus = [hasPension, hasSavings, hasSocialSecurity].filter(Boolean).length * 3;
    score += diversificationBonus;
    
    // Penalty for starting late
    if (yearsToRetirement < 10) score -= 10;
    else if (yearsToRetirement < 20) score -= 5;
    
    score = Math.max(0, Math.min(100, score));
    
    let status, color;
    if (score >= 85) { status = 'Excellent'; color = 'text-green-600'; }
    else if (score >= 75) { status = 'Very Good'; color = 'text-green-500'; }
    else if (score >= 65) { status = 'Good'; color = 'text-blue-500'; }
    else if (score >= 50) { status = 'Fair'; color = 'text-yellow-500'; }
    else { status = 'Needs Improvement'; color = 'text-red-500'; }
    
    return { score, status, color };
  };

  const retirementScore = getRetirementScore();

  if (isCalculating) {
    return (
      <div className="min-h-full bg-background p-6 flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <div className="space-y-2">
            <h2>Calculating Your Retirement Projection</h2>
            <p className="text-muted-foreground">
              Processing {parseInt(retirementData.retirementAge) - parseInt(retirementData.currentAge)} years of growth projections...
            </p>
          </div>
          <div className="flex justify-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-chart-1 rounded-full"></div>
              <span>TSP Growth</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-chart-2 rounded-full"></div>
              <span>Pension Benefits</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-chart-3 rounded-full"></div>
              <span>Social Security</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            Back to Planning
          </Button>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Calculator className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1>Retirement Calculator</h1>
              <p className="text-muted-foreground">
                Your personalized retirement projection and optimization tools
              </p>
            </div>
          </div>
        </div>

        {/* Calculation Summary */}
        <Card className="mb-8 border-primary bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-6 h-6 text-primary" />
              Retirement Projection Complete
            </CardTitle>
            <CardDescription>
              Based on your inputs, here's your personalized retirement financial outlook
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary mb-1">
                  {finalProjection ? formatCurrency(finalProjection.monthlyIncome) : '$0'}
                </p>
                <p className="text-sm text-muted-foreground">Monthly Retirement Income</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary mb-1">
                  {finalProjection ? formatCurrency(finalProjection.totalSavings) : '$0'}
                </p>
                <p className="text-sm text-muted-foreground">Total Retirement Fund</p>
              </div>
              <div className="text-center">
                <p className={`text-3xl font-bold mb-1 ${retirementScore.color}`}>
                  {retirementScore.score}/100
                </p>
                <p className="text-sm text-muted-foreground">Retirement Readiness Score</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Adjust Your Plan</CardTitle>
              <CardDescription>
                See how changes affect your retirement outcome
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Monthly Contribution: {formatCurrency(displayContribution)}</Label>
                <Slider
                  value={[displayContribution]}
                  onValueChange={handleContributionChange}
                  max={2000}
                  min={100}
                  step={50}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>$100</span>
                  <span>$2,000</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <h4>Current Settings</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Current Age:</span>
                    <span>{retirementData.currentAge}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Retirement Age:</span>
                    <span>{retirementData.retirementAge}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Current Savings:</span>
                    <span>{formatCurrency(parseFloat(retirementData.currentSavings) || 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Expected Return:</span>
                    <span>{retirementData.expectedReturn}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Military Pension:</span>
                    <span>{formatCurrency(parseFloat(retirementData.militaryPension) || 0)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-5 h-5 text-primary" />
                    <span className="text-sm text-muted-foreground">Total at Retirement</span>
                  </div>
                  <p className="text-2xl font-bold">
                    {finalProjection ? formatCurrency(finalProjection.totalSavings) : '$0'}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <span className="text-sm text-muted-foreground">Monthly Income</span>
                  </div>
                  <p className="text-2xl font-bold">
                    {finalProjection ? formatCurrency(finalProjection.monthlyIncome) : '$0'}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-5 h-5 text-primary" />
                    <span className="text-sm text-muted-foreground">Retirement Score</span>
                  </div>
                  <p className={`text-2xl font-bold ${retirementScore.color}`}>
                    {retirementScore.score}/100
                  </p>
                  <p className="text-xs text-muted-foreground">{retirementScore.status}</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Calculator className="w-5 h-5 text-primary" />
                    <span className="text-sm text-muted-foreground">Investment Growth</span>
                  </div>
                  <p className="text-2xl font-bold">
                    {finalProjection ? formatCurrency(finalProjection.investmentGrowth) : '$0'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {finalProjection && finalProjection.cumulativeContributions > 0
                      ? `${(((finalProjection.investmentGrowth / finalProjection.cumulativeContributions) * 100)).toFixed(0)}% growth`
                      : 'Growth over contributions'
                    }
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Savings Growth Projection</CardTitle>
                <CardDescription>
                  See how contributions and investment growth build your retirement fund
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                    <AreaChart data={projectionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="age" 
                        label={{ value: 'Age', position: 'insideBottom', offset: -5 }}
                      />
                      <YAxis 
                        tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                        label={{ value: 'Amount ($)', angle: -90, position: 'insideLeft' }}
                      />
                      <Tooltip 
                        formatter={(value: number, name: string) => {
                          const labels = {
                            cumulativeContributions: 'Total Contributions',
                            investmentGrowth: 'Investment Growth',
                            totalSavings: 'Total Savings'
                          };
                          return [formatCurrency(value), labels[name as keyof typeof labels] || name];
                        }}
                        labelFormatter={(age) => `Age: ${age}`}
                      />
                      <Legend />
                      <Area
                        key="contributions"
                        type="monotone"
                        dataKey="cumulativeContributions"
                        stackId="1"
                        stroke="hsl(var(--chart-1))"
                        fill="hsl(var(--chart-1))"
                        name="Total Contributions"
                      />
                      <Area
                        key="growth"
                        type="monotone"
                        dataKey="investmentGrowth"
                        stackId="1"
                        stroke="hsl(var(--chart-2))"
                        fill="hsl(var(--chart-2))"
                        name="Investment Growth"
                      />

                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Income Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Retirement Income Breakdown</CardTitle>
                <CardDescription>
                  Your monthly income sources at retirement
                </CardDescription>
              </CardHeader>
              <CardContent>
                {finalProjection && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="h-20 w-20 mx-auto bg-chart-1 rounded-full flex items-center justify-center mb-2">
                          <DollarSign className="w-8 h-8 text-white" />
                        </div>
                        <p className="font-semibold">{formatCurrency((finalProjection.totalSavings * 0.04) / 12)}</p>
                        <p className="text-xs text-muted-foreground">Investment Withdrawals (4%)</p>
                      </div>
                      <div className="text-center">
                        <div className="h-20 w-20 mx-auto bg-chart-2 rounded-full flex items-center justify-center mb-2">
                          <Award className="w-8 h-8 text-white" />
                        </div>
                        <p className="font-semibold">{formatCurrency(parseFloat(retirementData.militaryPension) || 0)}</p>
                        <p className="text-xs text-muted-foreground">Military Pension</p>
                      </div>
                      <div className="text-center">
                        <div className="h-20 w-20 mx-auto bg-chart-3 rounded-full flex items-center justify-center mb-2">
                          <TrendingUp className="w-8 h-8 text-white" />
                        </div>
                        <p className="font-semibold">{formatCurrency(2100)}</p>
                        <p className="text-xs text-muted-foreground">Social Security (est.)</p>
                      </div>
                    </div>
                    <div className="pt-4 border-t">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Total Monthly Income:</span>
                        <span className="text-xl font-bold text-primary">
                          {formatCurrency(finalProjection.monthlyIncome)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {retirementScore.score < 60 && (
                    <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50 rounded-lg">
                      <p className="text-sm text-red-900 dark:text-red-100">
                        <strong className="text-red-800 dark:text-red-200">Critical Action Needed:</strong> Your current plan may not provide sufficient retirement income. Consider increasing contributions or extending your working years.
                      </p>
                    </div>
                  )}
                  
                  {retirementScore.score >= 60 && retirementScore.score < 80 && (
                    <div className="p-3 bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800/50 rounded-lg">
                      <p className="text-sm text-yellow-900 dark:text-yellow-100">
                        <strong className="text-yellow-800 dark:text-yellow-200">Room for Improvement:</strong> Increase your TSP contributions to the annual limit ({parseInt(retirementData.currentAge) >= 50 ? '$30,500' : '$23,000'}) for better retirement security.
                      </p>
                    </div>
                  )}
                  
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/50 rounded-lg">
                    <p className="text-sm text-blue-900 dark:text-blue-100">
                      <strong className="text-blue-800 dark:text-blue-200">TSP Strategy:</strong> Maximize your 5% TSP matching and consider the Roth TSP for tax-free growth. If over 50, use catch-up contributions.
                    </p>
                  </div>
                  
                  <div className="p-3 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800/50 rounded-lg">
                    <p className="text-sm text-green-900 dark:text-green-100">
                      <strong className="text-green-800 dark:text-green-200">Military Advantages:</strong> Your pension provides guaranteed income for life. Consider healthcare savings with TRICARE for Life and VA disability benefits.
                    </p>
                  </div>
                  
                  {parseFloat(retirementData.militaryPension) > 0 && (
                    <div className="p-3 bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/50 rounded-lg">
                      <p className="text-sm text-purple-900 dark:text-purple-100">
                        <strong className="text-purple-800 dark:text-purple-200">Second Career:</strong> With military pension as a foundation, consider a second career to bridge the gap until Social Security begins.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Complete Mission */}
            <Card className="border-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  Mission Complete
                </CardTitle>
                <CardDescription>
                  You've successfully analyzed your retirement plan. Complete this mission to earn XP!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={onCompleteMission} size="lg" className="w-full">
                  Complete Retirement Planning Mission (+250 XP)
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}