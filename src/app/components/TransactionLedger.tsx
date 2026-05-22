import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { 
  ArrowLeft,
  ArrowUpRight,
  ArrowDownLeft,
  Search,
  Filter,
  Download,
  Calendar,
  DollarSign,
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  Home,
  Car,
  Utensils,
  Film,
  Heart,
  Zap,
  CreditCard,
  Wallet
} from 'lucide-react';

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'debit' | 'credit';
  category: string;
  status: 'completed' | 'pending';
  merchant?: string;
}

interface TransactionLedgerProps {
  onBack: () => void;
  accountName?: string;
  accountNumber?: string;
  isDemo?: boolean;
}

export function TransactionLedger({ 
  onBack, 
  accountName = 'Checking Account',
  accountNumber = '****1234',
  isDemo = false 
}: TransactionLedgerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterType, setFilterType] = useState<'all' | 'debit' | 'credit'>('all');
  const [dateRange, setDateRange] = useState('30');

  // Demo transactions for SSG Martinez
  const demoTransactions: Transaction[] = [
    {
      id: '1',
      date: '2025-10-14',
      description: 'Direct Deposit - Army Pay',
      amount: 4250.00,
      type: 'credit',
      category: 'Income',
      status: 'completed',
      merchant: 'DFAS'
    },
    {
      id: '2',
      date: '2025-10-13',
      description: 'Mortgage Payment',
      amount: 1450.00,
      type: 'debit',
      category: 'Housing',
      status: 'completed',
      merchant: 'Navy Federal Mortgage'
    },
    {
      id: '3',
      date: '2025-10-12',
      description: 'TSP Contribution',
      amount: 425.00,
      type: 'debit',
      category: 'Savings',
      status: 'completed',
      merchant: 'TSP'
    },
    {
      id: '4',
      date: '2025-10-11',
      description: 'Commissary',
      amount: 187.42,
      type: 'debit',
      category: 'Groceries',
      status: 'completed',
      merchant: 'Fort Hood Commissary'
    },
    {
      id: '5',
      date: '2025-10-10',
      description: 'Gas - On Base',
      amount: 52.30,
      type: 'debit',
      category: 'Transportation',
      status: 'completed',
      merchant: 'AAFES Gas Station'
    },
    {
      id: '6',
      date: '2025-10-09',
      description: 'Amazon Purchase',
      amount: 94.99,
      type: 'debit',
      category: 'Shopping',
      status: 'completed',
      merchant: 'Amazon'
    },
    {
      id: '7',
      date: '2025-10-08',
      description: 'Electric Bill',
      amount: 128.45,
      type: 'debit',
      category: 'Utilities',
      status: 'completed',
      merchant: 'City Power & Light'
    },
    {
      id: '8',
      date: '2025-10-07',
      description: 'Car Insurance',
      amount: 145.00,
      type: 'debit',
      category: 'Insurance',
      status: 'completed',
      merchant: 'USAA Insurance'
    },
    {
      id: '9',
      date: '2025-10-06',
      description: 'Dining - Chipotle',
      amount: 28.76,
      type: 'debit',
      category: 'Dining',
      status: 'completed',
      merchant: 'Chipotle Mexican Grill'
    },
    {
      id: '10',
      date: '2025-10-05',
      description: 'ATM Withdrawal',
      amount: 100.00,
      type: 'debit',
      category: 'Cash',
      status: 'completed',
      merchant: 'USAA ATM'
    },
    {
      id: '11',
      date: '2025-10-04',
      description: 'Netflix Subscription',
      amount: 15.49,
      type: 'debit',
      category: 'Entertainment',
      status: 'completed',
      merchant: 'Netflix'
    },
    {
      id: '12',
      date: '2025-10-03',
      description: 'Pharmacy - CVS',
      amount: 23.50,
      type: 'debit',
      category: 'Healthcare',
      status: 'completed',
      merchant: 'CVS Pharmacy'
    },
    {
      id: '13',
      date: '2025-10-02',
      description: 'Transfer to Savings',
      amount: 500.00,
      type: 'debit',
      category: 'Transfer',
      status: 'completed',
      merchant: 'Internal Transfer'
    },
    {
      id: '14',
      date: '2025-10-01',
      description: 'BAS Payment',
      amount: 452.56,
      type: 'credit',
      category: 'Income',
      status: 'completed',
      merchant: 'DFAS'
    },
    {
      id: '15',
      date: '2025-09-30',
      description: 'Direct Deposit - Army Pay',
      amount: 4250.00,
      type: 'credit',
      category: 'Income',
      status: 'completed',
      merchant: 'DFAS'
    },
  ];

  const transactions = isDemo ? demoTransactions : [];

  // Category icon mapping
  const getCategoryIcon = (category: string) => {
    const icons: Record<string, any> = {
      'Income': DollarSign,
      'Housing': Home,
      'Transportation': Car,
      'Groceries': ShoppingCart,
      'Dining': Utensils,
      'Shopping': ShoppingCart,
      'Entertainment': Film,
      'Healthcare': Heart,
      'Utilities': Zap,
      'Insurance': CreditCard,
      'Savings': Wallet,
      'Transfer': ArrowUpRight,
      'Cash': DollarSign,
    };
    return icons[category] || DollarSign;
  };

  // Filter transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter(transaction => {
      const matchesSearch = transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           transaction.merchant?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = filterCategory === 'all' || transaction.category === filterCategory;
      const matchesType = filterType === 'all' || transaction.type === filterType;
      
      return matchesSearch && matchesCategory && matchesType;
    });
  }, [transactions, searchQuery, filterCategory, filterType]);

  // Calculate summary stats
  const summary = useMemo(() => {
    const totalIncome = filteredTransactions
      .filter(t => t.type === 'credit')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const totalExpenses = filteredTransactions
      .filter(t => t.type === 'debit')
      .reduce((sum, t) => sum + t.amount, 0);

    const categoryTotals = filteredTransactions
      .filter(t => t.type === 'debit')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {} as Record<string, number>);

    const topCategories = Object.entries(categoryTotals)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    return {
      totalIncome,
      totalExpenses,
      netCashFlow: totalIncome - totalExpenses,
      topCategories
    };
  }, [filteredTransactions]);

  const categories = Array.from(new Set(transactions.map(t => t.category))).sort();

  return (
    <div className="min-h-full bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Banking
          </Button>
          
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl mb-2">Transaction History</h1>
              <p className="text-muted-foreground">
                {accountName} {accountNumber}
              </p>
            </div>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                Total Income
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                ${summary.totalIncome.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Last {dateRange} days
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-red-600" />
                Total Expenses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                ${summary.totalExpenses.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Last {dateRange} days
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Net Cash Flow</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${summary.netCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {summary.netCashFlow >= 0 ? '+' : ''}${summary.netCashFlow.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Last {dateRange} days
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="transactions" className="space-y-6">
          <TabsList>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="transactions" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="pt-6">
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search transactions..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>

                  <Select value={filterType} onValueChange={(value: any) => setFilterType(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="credit">Income</SelectItem>
                      <SelectItem value="debit">Expenses</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Date Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">Last 7 days</SelectItem>
                      <SelectItem value="30">Last 30 days</SelectItem>
                      <SelectItem value="90">Last 90 days</SelectItem>
                      <SelectItem value="365">Last year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Transactions List */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>
                  Showing {filteredTransactions.length} transactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {filteredTransactions.map((transaction) => {
                    const Icon = getCategoryIcon(transaction.category);
                    return (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            transaction.type === 'credit' ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'
                          }`}>
                            <Icon className={`w-5 h-5 ${
                              transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                            }`} />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium">{transaction.description}</span>
                              {transaction.status === 'pending' && (
                                <Badge variant="outline" className="text-xs">Pending</Badge>
                              )}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {transaction.merchant} • {new Date(transaction.date).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className={`font-semibold ${
                            transaction.type === 'credit' ? 'text-green-600' : 'text-foreground'
                          }`}>
                            {transaction.type === 'credit' ? '+' : '-'}${transaction.amount.toFixed(2)}
                          </div>
                          <Badge variant="secondary" className="text-xs mt-1">
                            {transaction.category}
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {filteredTransactions.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No transactions found</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Spending Categories</CardTitle>
                <CardDescription>Where your money is going</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {summary.topCategories.map(([category, amount], index) => {
                    const percentage = (amount / summary.totalExpenses) * 100;
                    const Icon = getCategoryIcon(category);
                    
                    return (
                      <div key={category}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Icon className="w-4 h-4" />
                            <span className="font-medium">{category}</span>
                          </div>
                          <div className="text-right">
                            <span className="font-semibold">${amount.toFixed(2)}</span>
                            <span className="text-xs text-muted-foreground ml-2">
                              {percentage.toFixed(1)}%
                            </span>
                          </div>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Spending Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <p>
                    • Your largest expense category is <strong>{summary.topCategories[0]?.[0]}</strong> at ${summary.topCategories[0]?.[1].toFixed(2)}
                  </p>
                  <p>
                    • You've made <strong>{filteredTransactions.filter(t => t.type === 'debit').length}</strong> purchases in the last {dateRange} days
                  </p>
                  <p>
                    • Average transaction size: <strong>${(summary.totalExpenses / filteredTransactions.filter(t => t.type === 'debit').length || 0).toFixed(2)}</strong>
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Savings Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-6">
                    <div className="text-4xl font-bold text-primary mb-2">
                      {((summary.netCashFlow / summary.totalIncome) * 100).toFixed(1)}%
                    </div>
                    <p className="text-sm text-muted-foreground">
                      of income saved/invested
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
