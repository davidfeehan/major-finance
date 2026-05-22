import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { AIChatbot } from './AIChatbot';
import { 
  ArrowLeft, 
  PiggyBank, 
  Calculator, 
  CheckCircle,
  DollarSign,
  TrendingUp,
  Target,
  AlertCircle,
  BarChart3,
  Bot,
  X
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Cell } from 'recharts';

interface TSPMissionProps {
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

export function TSPMission({ onBack, onComplete, userContext }: TSPMissionProps) {
  // Check if this mission has been completed
  const isCompleted = userContext?.completedMissionsList?.includes('tsp-optimization') || false;
  
  const [annualSalary, setAnnualSalary] = useState('');
  const [currentContribution, setCurrentContribution] = useState('');
  const [currentBalance, setCurrentBalance] = useState('');
  const [yearsToRetirement, setYearsToRetirement] = useState('');
  const [allocation, setAllocation] = useState({
    g: '10',
    f: '10', 
    c: '60',
    s: '10',
    i: '10'
  });
  const [showFloatingChatbot, setShowFloatingChatbot] = useState(false);
  const [isPinnedChatbot, setIsPinnedChatbot] = useState(false);

  const chatbotResponses = {
    'match': 'The military provides up to 5% matching in TSP! You get 1% automatic, plus up to 4% matching. This is free money - always contribute at least 5% to get the full match.',
    'funds': 'TSP has 5 core funds: G (government bonds), F (fixed income), C (S&P 500), S (small cap), I (international). The L funds are lifecycle funds that automatically adjust over time.',
    'roth traditional': 'Roth TSP vs Traditional depends on your tax situation. Early career military often benefit from Roth since you\'re in lower tax brackets. Traditional may be better for higher ranks.',
    'allocation': 'A common allocation for young military: 60% C fund, 20% S fund, 10% I fund, 10% F fund. Adjust based on age and risk tolerance. L funds do this automatically.',
    'contribution limits': '2024 TSP contribution limit is $23,000 ($30,500 if 50+). Military can also contribute combat pay and catch-up contributions. Maximize if possible!',
    'withdrawal': 'TSP withdrawals before 59.5 usually have penalties, except for hardship withdrawals. Plan for retirement access. You can roll TSP to IRA when you leave military.',
    'combat pay': 'Combat pay can be contributed to Roth TSP even though it\'s tax-free! This is an incredible opportunity - tax-free money growing tax-free forever.',
    'lifecycle': 'L funds automatically adjust your allocation as you age, becoming more conservative over time. They\'re a "set it and forget it" option that works well for many military members.',
    'fees': 'TSP has incredibly low fees - around 0.04%! This saves you thousands compared to typical 401k plans. It\'s one of the best retirement deals available.'
  };

  const salary = parseFloat(annualSalary) || 0;
  const contribution = parseFloat(currentContribution) || 0;
  const contributionAmount = salary * (contribution / 100);
  const matchAmount = Math.min(contributionAmount, salary * 0.05);
  const maxContribution = Math.min(23000, salary);

  const funds = [
    {
      symbol: 'G',
      name: 'Government Securities',
      description: 'Low risk, guaranteed returns',
      risk: 'Very Low',
      return: '~2-3%',
      color: '#8884d8'
    },
    {
      symbol: 'F',
      name: 'Fixed Income Index',
      description: 'Bond market index',
      risk: 'Low',
      return: '~3-5%',
      color: '#82ca9d'
    },
    {
      symbol: 'C',
      name: 'Common Stock Index',
      description: 'S&P 500 index',
      risk: 'Moderate',
      return: '~7-10%',
      color: '#ffc658'
    },
    {
      symbol: 'S',
      name: 'Small Capitalization',
      description: 'Small company stocks',
      risk: 'High',
      return: '~8-12%',
      color: '#ff7300'
    },
    {
      symbol: 'I',
      name: 'International Stock',
      description: 'International developed markets',
      risk: 'High',
      return: '~6-9%',
      color: '#00ff00'
    }
  ];

  const projectionData = [
    { years: 5, conservative: 75000, moderate: 85000, aggressive: 95000 },
    { years: 10, conservative: 165000, moderate: 195000, aggressive: 235000 },
    { years: 15, conservative: 275000, moderate: 340000, aggressive: 425000 },
    { years: 20, conservative: 405000, moderate: 530000, aggressive: 685000 },
    { years: 25, conservative: 560000, moderate: 770000, aggressive: 1050000 },
    { years: 30, conservative: 740000, moderate: 1075000, aggressive: 1500000 }
  ];

  const allocationData = Object.entries(allocation).map(([fund, percentage]) => {
    const fundInfo = funds.find(f => f.symbol.toLowerCase() === fund);
    return {
      name: fundInfo?.symbol || fund.toUpperCase(),
      value: parseFloat(percentage),
      color: fundInfo?.color || '#888'
    };
  });

  const handleAllocationChange = (fund: string, value: string) => {
    setAllocation(prev => ({
      ...prev,
      [fund]: value
    }));
  };

  const totalAllocation = Object.values(allocation).reduce((sum, val) => sum + parseFloat(val), 0);

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
                <PiggyBank className="w-6 h-6 text-primary-foreground" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1>TSP Optimization Mission</h1>
                {isCompleted && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Completed
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground">
                Maximize your Thrift Savings Plan for military retirement success
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
                  <Target className="w-5 h-5" />
                  TSP Optimization Overview
                </CardTitle>
                <CardDescription>
                  Maximize one of the military's best retirement benefits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <DollarSign className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <h3>5% Match</h3>
                    <p className="text-sm text-muted-foreground">Free money from military</p>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <TrendingUp className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <h3>Low Fees</h3>
                    <p className="text-sm text-muted-foreground">~0.04% expense ratio</p>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <CheckCircle className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <h3>Tax Benefits</h3>
                    <p className="text-sm text-muted-foreground">Traditional & Roth options</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="calculator" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="calculator">TSP Calculator</TabsTrigger>
                <TabsTrigger value="allocation">Fund Allocation</TabsTrigger>
                <TabsTrigger value="projections">Growth Projections</TabsTrigger>
              </TabsList>

              <TabsContent value="calculator" className="space-y-6">
                {/* TSP Calculator */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calculator className="w-5 h-5" />
                      TSP Contribution Calculator
                    </CardTitle>
                    <CardDescription>
                      Calculate your optimal TSP contribution and matching
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="salary">Annual Military Salary ($)</Label>
                        <Input
                          id="salary"
                          type="number"
                          placeholder="50000"
                          value={annualSalary}
                          onChange={(e) => setAnnualSalary(e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="contribution">Current Contribution (%)</Label>
                        <Input
                          id="contribution"
                          type="number"
                          placeholder="5"
                          value={currentContribution}
                          onChange={(e) => setCurrentContribution(e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="balance">Current TSP Balance ($)</Label>
                        <Input
                          id="balance"
                          type="number"
                          placeholder="25000"
                          value={currentBalance}
                          onChange={(e) => setCurrentBalance(e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="years">Years to Retirement</Label>
                        <Input
                          id="years"
                          type="number"
                          placeholder="20"
                          value={yearsToRetirement}
                          onChange={(e) => setYearsToRetirement(e.target.value)}
                        />
                      </div>
                    </div>

                    {salary > 0 && (
                      <div className="pt-4 border-t space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="p-4 bg-primary/10 rounded-lg text-center">
                            <p className="text-sm text-muted-foreground">Your Annual Contribution</p>
                            <p className="text-2xl font-bold text-primary">
                              ${contributionAmount.toLocaleString()}
                            </p>
                          </div>
                          
                          <div className="p-4 bg-green-50 rounded-lg text-center">
                            <p className="text-sm text-muted-foreground">Military Match</p>
                            <p className="text-2xl font-bold text-green-600">
                              ${matchAmount.toLocaleString()}
                            </p>
                          </div>
                          
                          <div className="p-4 bg-blue-50 rounded-lg text-center">
                            <p className="text-sm text-muted-foreground">Total Annual</p>
                            <p className="text-2xl font-bold text-blue-600">
                              ${(contributionAmount + matchAmount).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        
                        {contribution < 5 && (
                          <div className="flex items-start gap-2 p-4 bg-yellow-50 rounded-lg">
                            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                            <div className="text-sm">
                              <p className="font-medium text-yellow-800">Optimization Opportunity</p>
                              <p className="text-yellow-700">
                                You're missing ${((salary * 0.05) - matchAmount).toLocaleString()} in free matching funds! 
                                Consider increasing to at least 5%.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="allocation" className="space-y-6">
                {/* Fund Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>TSP Fund Overview</CardTitle>
                    <CardDescription>
                      Understanding your TSP investment options
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {funds.map((fund) => (
                        <div key={fund.symbol} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center`} style={{backgroundColor: fund.color}}>
                                <span className="text-white font-bold text-sm">{fund.symbol}</span>
                              </div>
                              <div>
                                <h4 className="font-medium">{fund.name}</h4>
                                <p className="text-sm text-muted-foreground">{fund.description}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge variant="outline">{fund.risk}</Badge>
                              <p className="text-sm text-muted-foreground mt-1">{fund.return}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Allocation Tool */}
                <Card>
                  <CardHeader>
                    <CardTitle>Portfolio Allocation Tool</CardTitle>
                    <CardDescription>
                      Customize your TSP fund allocation
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-5 gap-4">
                      {Object.entries(allocation).map(([fund, value]) => {
                        const fundInfo = funds.find(f => f.symbol.toLowerCase() === fund);
                        return (
                          <div key={fund} className="space-y-2">
                            <Label htmlFor={fund}>{fundInfo?.symbol} Fund</Label>
                            <Input
                              id={fund}
                              type="number"
                              min="0"
                              max="100"
                              value={value}
                              onChange={(e) => handleAllocationChange(fund, e.target.value)}
                            />
                          </div>
                        );
                      })}
                    </div>
                    
                    <div className="flex justify-between items-center pt-2 border-t">
                      <span>Total Allocation:</span>
                      <span className={`font-bold ${totalAllocation === 100 ? 'text-green-600' : 'text-red-600'}`}>
                        {totalAllocation}%
                      </span>
                    </div>
                    
                    {totalAllocation !== 100 && (
                      <p className="text-sm text-red-600">
                        Total allocation must equal 100%
                      </p>
                    )}

                    <div className="h-48 mt-4">
                      <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                        <PieChart>
                          <PieChart
                            data={allocationData}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            dataKey="value"
                          >
                            {allocationData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </PieChart>
                          <Tooltip formatter={(value) => `${value}%`} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="projections" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      TSP Growth Projections
                    </CardTitle>
                    <CardDescription>
                      How your TSP could grow with different strategies
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 mb-4">
                      <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                        <BarChart data={projectionData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="years" />
                          <YAxis tickFormatter={(value) => `$${(value/1000).toFixed(0)}k`} />
                          <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
                          <Legend />
                          <Bar dataKey="conservative" fill="#8884d8" name="Conservative (60% G/F, 40% C)" />
                          <Bar dataKey="moderate" fill="#82ca9d" name="Moderate (30% G/F, 70% C/S/I)" />
                          <Bar dataKey="aggressive" fill="#ffc658" name="Aggressive (10% G/F, 90% C/S/I)" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-medium text-blue-800 mb-2">Key Assumptions</h4>
                        <ul className="text-sm text-blue-700 space-y-1">
                          <li>• $1,000 monthly contribution</li>
                          <li>• 5% military matching</li>
                          <li>• Historical average returns by fund</li>
                          <li>• No account fees (TSP advantage!)</li>
                        </ul>
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
                    variant={isCompleted ? "outline" : "default"}
                  >
                    <CheckCircle className="mr-2 w-5 h-5" />
                    {isCompleted ? 'Review Mission' : 'Complete Mission & Earn 300 XP'}
                  </Button>
                  {!isCompleted && (
                    <p className="text-sm text-muted-foreground">
                      Complete this mission to unlock advanced retirement strategies
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

        </div>

        {/* Floating AI Chatbot Toggle */}
        {!showFloatingChatbot && (
          <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-50">
            <Button
              onClick={() => setShowFloatingChatbot(true)}
              size="lg"
              className="h-16 w-16 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary border-2 border-primary-foreground/20"
            >
              <Bot className="w-8 h-8 text-primary-foreground" />
            </Button>
          </div>
        )}

        {/* Floating AI Chatbot Modal */}
        {showFloatingChatbot && (
          <div className={`fixed z-50 ${isPinnedChatbot ? 'inset-x-4 bottom-20 top-auto h-[450px] md:inset-x-6 md:bottom-6' : 'inset-0 bg-black/50'}`}>
            <div className={`${isPinnedChatbot ? 'h-full' : 'fixed inset-4 top-8 bottom-20 md:inset-6 md:top-12 md:bottom-6'} bg-background rounded-lg shadow-2xl overflow-hidden`}>
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <PiggyBank className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium">TSP Expert AI</h3>
                    <p className="text-sm text-muted-foreground">TSP Optimization Specialist</p>
                  </div>
                </div>
                <Button
                  onClick={() => setShowFloatingChatbot(false)}
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="overflow-y-auto h-full p-4 space-y-4">
                <AIChatbot
                  missionType="TSP Optimization Mission"
                  agentName="TSP Expert AI"
                  agentDescription="I specialize in Thrift Savings Plan optimization for military personnel."
                  quickSuggestions={[
                    "How does military matching work?",
                    "Which TSP funds should I choose?",
                    "Roth vs Traditional TSP?",
                    "What's the contribution limit?",
                    "How to allocate by age?",
                    "Combat pay contributions?"
                  ]}
                  responses={chatbotResponses}
                  isPinned={isPinnedChatbot}
                  onPinToggle={setIsPinnedChatbot}
                  userContext={userContext}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}