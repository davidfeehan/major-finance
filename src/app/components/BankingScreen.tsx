import React, { useState, useCallback } from 'react';
import { ArrowLeft, Plus, TrendingUp, TrendingDown, DollarSign, AlertCircle, CheckCircle, CreditCard, Building2, Zap, Target, Calendar, MoreHorizontal, Eye, EyeOff, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { Alert, AlertDescription } from './ui/alert';
import { Avatar, AvatarFallback } from './ui/avatar';
import { AddAccountFlow } from './AddAccountFlow';

interface Account {
  id: string;
  name: string;
  type: 'checking' | 'savings' | 'credit' | 'military_savings';
  institution: string;
  balance: number;
  lastFour: string;
  status: 'active' | 'pending' | 'error';
}

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  account: string;
  type: 'debit' | 'credit';
}

interface BankingScreenProps {
  onBack: () => void;
  userContext: any;
  isDemo?: boolean;
  onNavigate?: (screen: string) => void;
}

export default function BankingScreen({ onBack, userContext, isDemo = false, onNavigate }: BankingScreenProps) {
  const [showBalances, setShowBalances] = useState(true);
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  const [showAddAccountFlow, setShowAddAccountFlow] = useState(false);
  
  // Martinez's real accounts in demo mode
  const martinezAccounts: Account[] = [
    {
      id: '1',
      name: 'Checking Account',
      type: 'checking',
      institution: 'Navy Federal Credit Union',
      balance: 8450.00,
      lastFour: '7834',
      status: 'active'
    },
    {
      id: '2',
      name: 'Emergency Fund',
      type: 'savings',
      institution: 'USAA',
      balance: 18000.00,
      lastFour: '2156',
      status: 'active'
    },
    {
      id: '3',
      name: 'Home Down Payment Fund',
      type: 'savings',
      institution: 'USAA',
      balance: 5200.00,
      lastFour: '2157',
      status: 'active'
    },
    {
      id: '4',
      name: 'TSP Account',
      type: 'military_savings',
      institution: 'Thrift Savings Plan',
      balance: 128450.00,
      lastFour: '9021',
      status: 'active'
    },
    {
      id: '5',
      name: 'Investment Account',
      type: 'savings',
      institution: 'Vanguard',
      balance: 45300.00,
      lastFour: '3344',
      status: 'active'
    }
  ];

  const defaultAccounts: Account[] = [
    {
      id: '1',
      name: 'Military Checking',
      type: 'checking',
      institution: 'Navy Federal Credit Union',
      balance: 4250.75,
      lastFour: '4321',
      status: 'active'
    },
    {
      id: '2',
      name: 'Emergency Savings',
      type: 'savings',
      institution: 'USAA',
      balance: 12500.00,
      lastFour: '8765',
      status: 'active'
    },
    {
      id: '3',
      name: 'Military Star Card',
      type: 'credit',
      institution: 'Military Star',
      balance: -850.25,
      lastFour: '9876',
      status: 'active'
    },
    {
      id: '4',
      name: 'TSP Account Link',
      type: 'military_savings',
      institution: 'Thrift Savings Plan',
      balance: 45000.00,
      lastFour: '0123',
      status: 'pending'
    }
  ];

  const [accounts, setAccounts] = useState<Account[]>(isDemo ? martinezAccounts : defaultAccounts);

  const [recentTransactions] = useState<Transaction[]>([
    {
      id: '1',
      date: '2024-01-15',
      description: 'Military Pay Deposit',
      amount: 3245.67,
      category: 'Income',
      account: 'Military Checking',
      type: 'credit'
    },
    {
      id: '2',
      date: '2024-01-14',
      description: 'Commissary Purchase',
      amount: -89.43,
      category: 'Groceries',
      account: 'Military Checking',
      type: 'debit'
    },
    {
      id: '3',
      date: '2024-01-13',
      description: 'Auto Insurance',
      amount: -125.00,
      category: 'Insurance',
      account: 'Military Checking',
      type: 'debit'
    },
    {
      id: '4',
      date: '2024-01-12',
      description: 'Emergency Fund Transfer',
      amount: -500.00,
      category: 'Savings',
      account: 'Military Checking',
      type: 'debit'
    },
    {
      id: '5',
      date: '2024-01-10',
      description: 'Gas Station',
      amount: -45.67,
      category: 'Transportation',
      account: 'Military Star Card',
      type: 'debit'
    }
  ]);

  const totalBalance = accounts.reduce((sum, account) => {
    return sum + (account.type === 'credit' ? 0 : account.balance);
  }, 0);

  const creditUtilization = Math.abs(accounts.find(a => a.type === 'credit')?.balance || 0) / 2000 * 100;

  // Calculate monthly spending from recent transactions
  const monthSpending = recentTransactions
    .filter(t => t.type === 'credit')
    .reduce((sum, t) => sum + t.amount, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(Math.abs(amount));
  };

  const getAccountIcon = (type: string) => {
    switch (type) {
      case 'checking':
        return <Building2 className="h-5 w-5" />;
      case 'savings':
        return <Target className="h-5 w-5" />;
      case 'credit':
        return <CreditCard className="h-5 w-5" />;
      case 'military_savings':
        return <DollarSign className="h-5 w-5" />;
      default:
        return <Building2 className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-success text-success-foreground';
      case 'pending':
        return 'bg-warning text-warning-foreground';
      case 'error':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const handleAddAccount = useCallback(() => {
    setShowAddAccountFlow(true);
  }, []);

  const handleAccountAdded = useCallback((newAccount: Account) => {
    setAccounts(prev => [...prev, newAccount]);
    setShowAddAccountFlow(false);
  }, []);

  const handleBackFromAddFlow = useCallback(() => {
    setShowAddAccountFlow(false);
  }, []);

  // Show Add Account Flow if active
  if (showAddAccountFlow) {
    return (
      <AddAccountFlow 
        onBack={handleBackFromAddFlow}
        onAccountAdded={handleAccountAdded}
      />
    );
  }

  return (
    <div className="min-h-full bg-background">
      {/* Masthead */}
      <div className="bg-gradient-to-br from-primary/10 via-background to-primary/5 border-b border-border">
        <div className="p-6 pb-8">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={onBack} className="hover:bg-primary/10">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
                  <Building2 className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">
                    Banking & Accounts
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    {isDemo ? "SSG Marcus Martinez's Financial Command Center" : "Your Financial Command Center"}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowBalances(!showBalances)}
                className="hidden sm:flex"
              >
                {showBalances ? (
                  <>
                    <EyeOff className="h-4 w-4 mr-2" />
                    Hide Balances
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4 mr-2" />
                    Show Balances
                  </>
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowBalances(!showBalances)}
                className="sm:hidden"
              >
                {showBalances ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
              <Button onClick={handleAddAccount} className="bg-gradient-primary">
                <Plus className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Add Account</span>
                <span className="sm:hidden">Add</span>
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-background/60 backdrop-blur-sm rounded-lg p-4 border border-border/50">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-md bg-success/10 flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-success" />
                </div>
                <span className="text-xs text-muted-foreground">Net Worth</span>
              </div>
              <p className="text-xl font-bold text-success">
                {showBalances ? formatCurrency(totalBalance) : '••••••'}
              </p>
            </div>

            <div className="bg-background/60 backdrop-blur-sm rounded-lg p-4 border border-border/50">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-primary" />
                </div>
                <span className="text-xs text-muted-foreground">Accounts</span>
              </div>
              <p className="text-xl font-bold">
                {accounts.length}
              </p>
            </div>

            <div className="bg-background/60 backdrop-blur-sm rounded-lg p-4 border border-border/50">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-md bg-warning/10 flex items-center justify-center">
                  <CreditCard className="w-4 h-4 text-warning" />
                </div>
                <span className="text-xs text-muted-foreground">Credit Usage</span>
              </div>
              <p className="text-xl font-bold text-warning">
                {creditUtilization.toFixed(0)}%
              </p>
            </div>

            <div className="bg-background/60 backdrop-blur-sm rounded-lg p-4 border border-border/50">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-primary" />
                </div>
                <span className="text-xs text-muted-foreground">This Month</span>
              </div>
              <p className="text-xl font-bold text-success">
                {showBalances ? formatCurrency(monthSpending) : '••••'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-6">

      {/* Active Mission - Create a Budget (Demo Mode Only) */}
      {isDemo && (
        <Card className="border-blue-500/20 bg-blue-500/5">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-base mb-1">Create a Budget</CardTitle>
                  <CardDescription>Active Mission - 45% Complete</CardDescription>
                </div>
              </div>
              <Badge variant="outline" className="bg-blue-500/10 border-blue-500/30 text-blue-700">
                <Clock className="w-3 h-3 mr-1" />
                In Progress
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Track your monthly income and expenses to build a comprehensive budget
            </p>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground font-medium">Progress</span>
                <span className="font-semibold text-blue-600">45%</span>
              </div>
              <Progress value={45} className="h-2 bg-muted/60" />
            </div>
            <div className="flex items-center justify-between pt-2 border-t">
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Target className="w-4 h-4" />
                <span>Reward: <strong className="text-foreground">100 XP</strong></span>
              </div>
              <Button size="sm" variant="outline" className="text-xs">
                Continue Mission
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI Insights */}
      <Alert className="border-l-4 border-l-primary bg-primary/5">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>AI Insight:</strong> Your spending on dining out increased by 23% this month. 
          Consider using the commissary more often to save ~$120/month. Would you like me to help 
          set up a dining budget?
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Accounts List */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Connected Accounts
            </CardTitle>
            <CardDescription>
              Your military banking and credit accounts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {accounts.map((account) => (
              <div
                key={account.id}
                className={`p-4 border rounded-lg transition-all cursor-pointer hover:shadow-md ${
                  selectedAccount === account.id ? 'border-primary bg-primary/5' : ''
                }`}
                onClick={() => setSelectedAccount(account.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="icon-bg-primary">
                      {getAccountIcon(account.type)}
                    </div>
                    <div>
                      <h4 className="font-medium">{account.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {account.institution} •••• {account.lastFour}
                      </p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(account.status)}>
                    {account.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`font-semibold ${
                    account.balance < 0 ? 'text-destructive' : 'text-success'
                  }`}>
                    {showBalances ? (
                      `${account.balance < 0 ? '-' : ''}${formatCurrency(account.balance)}`
                    ) : (
                      '••••••'
                    )}
                  </span>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Transactions & Quick Actions */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-auto p-4 flex-col gap-2">
                <Calendar className="h-5 w-5" />
                <span className="text-sm">Set Up Auto-Pay</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto p-4 flex-col gap-2"
                onClick={() => onNavigate?.('budget-creation')}
              >
                <Target className="h-5 w-5" />
                <span className="text-sm">Create Budget</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex-col gap-2">
                <TrendingUp className="h-5 w-5" />
                <span className="text-sm">Analyze Spending</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex-col gap-2">
                <AlertCircle className="h-5 w-5" />
                <span className="text-sm">Set Alerts</span>
              </Button>
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>
                Your latest financial activity
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentTransactions.slice(0, 5).map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className={
                        transaction.type === 'credit' ? 'bg-success/20 text-success' : 'bg-muted'
                      }>
                        {transaction.type === 'credit' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{transaction.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {transaction.account} • {new Date(transaction.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${
                      transaction.type === 'credit' ? 'text-success' : 'text-foreground'
                    }`}>
                      {transaction.type === 'credit' ? '+' : '-'}{formatCurrency(transaction.amount)}
                    </p>
                    <Badge variant="outline" className="text-xs">
                      {transaction.category}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Military-Specific Features */}
      <Card className="card-military bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/20">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-primary">
            <CheckCircle className="h-5 w-5" />
            Military Finance Benefits
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 rounded-lg bg-background/60 border border-primary/10">
            <h4 className="font-semibold mb-3 text-foreground">TSP Matching</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Maximize your 5% government match
            </p>
          </div>
          <div className="text-center p-4 rounded-lg bg-background/60 border border-primary/10">
            <h4 className="font-semibold mb-3 text-foreground">SDP Program</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              10% guaranteed return while deployed
            </p>
          </div>
          <div className="text-center p-4 rounded-lg bg-background/60 border border-primary/10">
            <h4 className="font-semibold mb-3 text-foreground">No Fee Banking</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Military-friendly institutions
            </p>
          </div>
        </CardContent>
      </Card>
      </div>
      {/* End Main Content */}
    </div>
  );
}