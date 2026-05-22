import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  ArrowLeft,
  Eye,
  EyeOff,
  Download,
  Settings,
  CreditCard,
  Lock,
  Calendar,
  TrendingUp,
  DollarSign,
  AlertCircle,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Smartphone,
  Mail,
  Bell
} from 'lucide-react';

interface AccountDetailsProps {
  onBack: () => void;
  onViewTransactions: () => void;
  accountType?: 'checking' | 'savings' | 'credit';
  isDemo?: boolean;
}

export function AccountDetails({ 
  onBack, 
  onViewTransactions,
  accountType = 'checking',
  isDemo = false 
}: AccountDetailsProps) {
  const [showAccountNumber, setShowAccountNumber] = useState(false);
  const [showRoutingNumber, setShowRoutingNumber] = useState(false);

  // Demo account data for SSG Martinez
  const accountData = {
    checking: {
      name: 'Flagship Checking®',
      accountNumber: '9876543210',
      routingNumber: '314074269',
      balance: 8452.30,
      availableBalance: 8452.30,
      openedDate: '2018-03-15',
      interestRate: 0.05,
      monthlyFee: 0,
      overdraftProtection: true,
      directDeposit: true,
      recentActivity: [
        { date: '2025-10-14', description: 'Direct Deposit', amount: 4250.00, type: 'credit' },
        { date: '2025-10-13', description: 'Mortgage Payment', amount: -1450.00, type: 'debit' },
        { date: '2025-10-12', description: 'TSP Contribution', amount: -425.00, type: 'debit' },
      ]
    },
    savings: {
      name: 'Military Savings Account',
      accountNumber: '9876543211',
      routingNumber: '314074269',
      balance: 15420.00,
      availableBalance: 15420.00,
      openedDate: '2018-03-15',
      interestRate: 2.50,
      monthlyFee: 0,
      minimumBalance: 0,
      compoundingFrequency: 'monthly',
      recentActivity: [
        { date: '2025-10-02', description: 'Transfer from Checking', amount: 500.00, type: 'credit' },
        { date: '2025-10-01', description: 'Interest Payment', amount: 32.13, type: 'credit' },
        { date: '2025-09-15', description: 'Transfer from Checking', amount: 500.00, type: 'credit' },
      ]
    },
    credit: {
      name: 'Cashback Rewards Plus®',
      accountNumber: '4111111111111111',
      balance: 892.45,
      availableCredit: 9107.55,
      creditLimit: 10000,
      openedDate: '2019-06-20',
      interestRate: 14.99,
      nextPaymentDue: '2025-11-01',
      minimumPayment: 35.00,
      rewards: {
        cashback: 142.30,
        pointsEarned: 14230
      },
      recentActivity: [
        { date: '2025-10-11', description: 'Commissary Purchase', amount: -187.42, type: 'debit' },
        { date: '2025-10-09', description: 'Amazon', amount: -94.99, type: 'debit' },
        { date: '2025-10-06', description: 'Chipotle', amount: -28.76, type: 'debit' },
      ]
    }
  };

  const account = accountData[accountType];
  const isCredit = accountType === 'credit';

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
            Back to Banking
          </Button>
          
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl mb-2">{account.name}</h1>
              <p className="text-muted-foreground">
                Account ending in {account.accountNumber.slice(-4)}
              </p>
            </div>
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Manage
            </Button>
          </div>

          {/* Balance Card */}
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {isCredit ? 'Current Balance' : 'Available Balance'}
                  </p>
                  <p className="text-4xl font-bold">
                    ${(isCredit ? account.balance : account.availableBalance).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </p>
                  {!isCredit && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Total Balance: ${account.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </p>
                  )}
                </div>

                {isCredit ? (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Available Credit</p>
                    <p className="text-4xl font-bold text-green-600">
                      ${account.availableCredit.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </p>
                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Credit Usage</span>
                        <span>{((account.balance / account.creditLimit) * 100).toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${(account.balance / account.creditLimit) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-2">
                      {account.overdraftProtection && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3" />
                          Overdraft Protection
                        </Badge>
                      )}
                      {account.directDeposit && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Direct Deposit
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      APY: {account.interestRate}% • No Monthly Fees
                    </p>
                  </div>
                )}
              </div>

              {isCredit && (
                <div className="mt-6 pt-6 border-t border-border/50">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground mb-1">Next Payment Due</p>
                      <p className="font-semibold">{new Date(account.nextPaymentDue).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Minimum Payment</p>
                      <p className="font-semibold">${account.minimumPayment.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="details" className="space-y-6">
          <TabsList>
            <TabsTrigger value="details">Account Details</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            {isCredit && <TabsTrigger value="rewards">Rewards</TabsTrigger>}
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          {/* Account Details Tab */}
          <TabsContent value="details" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>View and manage your account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label className="text-sm text-muted-foreground">Account Type</Label>
                    <p className="font-medium mt-1">
                      {account.name}
                    </p>
                  </div>

                  <div>
                    <Label className="text-sm text-muted-foreground">Account Opened</Label>
                    <p className="font-medium mt-1">
                      {new Date(account.openedDate).toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </div>

                  {!isCredit && (
                    <>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <Label className="text-sm text-muted-foreground">Account Number</Label>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowAccountNumber(!showAccountNumber)}
                          >
                            {showAccountNumber ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                        </div>
                        <p className="font-mono">
                          {showAccountNumber ? account.accountNumber : '••••••' + account.accountNumber.slice(-4)}
                        </p>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <Label className="text-sm text-muted-foreground">Routing Number</Label>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowRoutingNumber(!showRoutingNumber)}
                          >
                            {showRoutingNumber ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                        </div>
                        <p className="font-mono">
                          {showRoutingNumber ? account.routingNumber : '•••••••••'}
                        </p>
                      </div>
                    </>
                  )}

                  {isCredit ? (
                    <>
                      <div>
                        <Label className="text-sm text-muted-foreground">Card Number</Label>
                        <p className="font-mono">•••• •••• •••• {account.accountNumber.slice(-4)}</p>
                      </div>

                      <div>
                        <Label className="text-sm text-muted-foreground">Credit Limit</Label>
                        <p className="font-medium mt-1">
                          ${account.creditLimit.toLocaleString()}
                        </p>
                      </div>

                      <div>
                        <Label className="text-sm text-muted-foreground">APR</Label>
                        <p className="font-medium mt-1">
                          {account.interestRate}%
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <Label className="text-sm text-muted-foreground">Interest Rate (APY)</Label>
                        <p className="font-medium mt-1">
                          {account.interestRate}%
                        </p>
                      </div>

                      <div>
                        <Label className="text-sm text-muted-foreground">Monthly Fee</Label>
                        <p className="font-medium mt-1">
                          {account.monthlyFee === 0 ? 'No Fee' : `$${account.monthlyFee}`}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Account Features */}
            <Card>
              <CardHeader>
                <CardTitle>Account Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {!isCredit && account.overdraftProtection && (
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium">Overdraft Protection</p>
                        <p className="text-sm text-muted-foreground">Linked to savings account</p>
                      </div>
                    </div>
                  )}

                  {!isCredit && account.directDeposit && (
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium">Direct Deposit Active</p>
                        <p className="text-sm text-muted-foreground">Automatic monthly deposits</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <Smartphone className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Mobile Banking</p>
                      <p className="text-sm text-muted-foreground">Full access via mobile app</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Lock className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">FDIC Insured</p>
                      <p className="text-sm text-muted-foreground">Up to $250,000</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Alerts & Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Alerts & Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Low Balance Alert</p>
                    <p className="text-sm text-muted-foreground">Get notified when balance falls below $500</p>
                  </div>
                  <Badge variant="secondary">Active</Badge>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Large Transaction Alert</p>
                    <p className="text-sm text-muted-foreground">Notify for transactions over $500</p>
                  </div>
                  <Badge variant="secondary">Active</Badge>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Monthly Statement</p>
                    <p className="text-sm text-muted-foreground">Email statement on the 1st of each month</p>
                  </div>
                  <Badge variant="secondary">Active</Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Recent Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Last 5 transactions</CardDescription>
                  </div>
                  <Button onClick={onViewTransactions}>
                    View All Transactions
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {account.recentActivity.map((transaction, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transaction.type === 'credit' ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'
                        }`}>
                          <DollarSign className={`w-5 h-5 ${
                            transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                          }`} />
                        </div>
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(transaction.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <p className={`font-semibold ${
                        transaction.amount > 0 ? 'text-green-600' : 'text-foreground'
                      }`}>
                        {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Rewards Tab (Credit Cards Only) */}
          {isCredit && (
            <TabsContent value="rewards" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Rewards Summary</CardTitle>
                  <CardDescription>Your cashback rewards and points</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2 mb-6">
                    <Card className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-amber-500/20">
                      <CardContent className="pt-6">
                        <p className="text-sm text-muted-foreground mb-2">Available Cashback</p>
                        <p className="text-3xl font-bold text-amber-600">
                          ${account.rewards.cashback.toFixed(2)}
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
                      <CardContent className="pt-6">
                        <p className="text-sm text-muted-foreground mb-2">Points Earned</p>
                        <p className="text-3xl font-bold text-blue-600">
                          {account.rewards.pointsEarned.toLocaleString()}
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <Separator className="my-6" />

                  <div className="space-y-4">
                    <h4 className="font-semibold">Rewards Rate</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center justify-between">
                        <span>Gas & Grocery</span>
                        <Badge>3% Cashback</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Dining & Entertainment</span>
                        <Badge>2% Cashback</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>All Other Purchases</span>
                        <Badge>1% Cashback</Badge>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full mt-6">
                    Redeem Rewards
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Statements & Documents</CardTitle>
                <CardDescription>Download your account statements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {['October 2025', 'September 2025', 'August 2025', 'July 2025'].map((month) => (
                    <div key={month} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-muted-foreground" />
                        <span className="font-medium">{month} Statement</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tax Documents</CardTitle>
                <CardDescription>Year-end tax forms and statements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <Download className="w-5 h-5 text-muted-foreground" />
                      <span className="font-medium">2024 Form 1099-INT</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>;
}
