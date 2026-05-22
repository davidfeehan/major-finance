import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown,
  Search,
  Filter,
  Download,
  AlertCircle,
  User,
  Building2,
  Calendar,
  DollarSign,
  BarChart3
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface GovernmentTradingTrackerProps {
  onBack: () => void;
  userContext?: {
    rank: string;
    branch: string;
    completedMissions: number;
    completedMissionsList?: string[];
  };
}

// Mock data for government trades
const congressTrades = [
  {
    id: 1,
    name: 'Nancy Pelosi',
    chamber: 'House',
    party: 'Democrat',
    state: 'CA',
    ticker: 'NVDA',
    company: 'NVIDIA Corp',
    type: 'Purchase',
    amount: '$1M - $5M',
    date: '2024-10-15',
    performance: '+15.2%'
  },
  {
    id: 2,
    name: 'Tommy Tuberville',
    chamber: 'Senate',
    party: 'Republican',
    state: 'AL',
    ticker: 'AAPL',
    company: 'Apple Inc',
    type: 'Sale',
    amount: '$100K - $500K',
    date: '2024-10-12',
    performance: '+8.5%'
  },
  {
    id: 3,
    name: 'Josh Gottheimer',
    chamber: 'House',
    party: 'Democrat',
    state: 'NJ',
    ticker: 'MSFT',
    company: 'Microsoft Corp',
    type: 'Purchase',
    amount: '$500K - $1M',
    date: '2024-10-10',
    performance: '+12.3%'
  },
  {
    id: 4,
    name: 'Dan Crenshaw',
    chamber: 'House',
    party: 'Republican',
    state: 'TX',
    ticker: 'RTX',
    company: 'Raytheon Technologies',
    type: 'Purchase',
    amount: '$50K - $100K',
    date: '2024-10-08',
    performance: '+5.7%'
  },
  {
    id: 5,
    name: 'Mark Kelly',
    chamber: 'Senate',
    party: 'Democrat',
    state: 'AZ',
    ticker: 'LMT',
    company: 'Lockheed Martin',
    type: 'Purchase',
    amount: '$250K - $500K',
    date: '2024-10-05',
    performance: '+7.9%'
  },
  {
    id: 6,
    name: 'Austin Scott',
    chamber: 'House',
    party: 'Republican',
    state: 'GA',
    ticker: 'BA',
    company: 'Boeing Co',
    type: 'Sale',
    amount: '$100K - $250K',
    date: '2024-10-03',
    performance: '-3.2%'
  },
  {
    id: 7,
    name: 'Ro Khanna',
    chamber: 'House',
    party: 'Democrat',
    state: 'CA',
    ticker: 'TSLA',
    company: 'Tesla Inc',
    type: 'Purchase',
    amount: '$500K - $1M',
    date: '2024-09-28',
    performance: '+22.1%'
  },
  {
    id: 8,
    name: 'Pat Toomey',
    chamber: 'Senate',
    party: 'Republican',
    state: 'PA',
    ticker: 'JPM',
    company: 'JPMorgan Chase',
    type: 'Purchase',
    amount: '$250K - $500K',
    date: '2024-09-25',
    performance: '+9.4%'
  }
];

const topStocks = [
  { ticker: 'NVDA', trades: 15, value: '$25M+', avgReturn: '+18.2%' },
  { ticker: 'AAPL', trades: 22, value: '$18M+', avgReturn: '+12.5%' },
  { ticker: 'MSFT', trades: 18, value: '$22M+', avgReturn: '+14.3%' },
  { ticker: 'TSLA', trades: 12, value: '$15M+', avgReturn: '+20.1%' },
  { ticker: 'GOOGL', trades: 10, value: '$12M+', avgReturn: '+11.8%' }
];

const sectorDistribution = [
  { name: 'Technology', value: 35, color: '#8884d8' },
  { name: 'Defense', value: 18, color: '#82ca9d' },
  { name: 'Finance', value: 15, color: '#ffc658' },
  { name: 'Healthcare', value: 12, color: '#ff8042' },
  { name: 'Energy', value: 10, color: '#00C49F' },
  { name: 'Other', value: 10, color: '#FFBB28' }
];

const performanceData = [
  { month: 'Apr', congress: 12.5, sp500: 8.2 },
  { month: 'May', congress: 15.3, sp500: 9.1 },
  { month: 'Jun', congress: 11.8, sp500: 7.5 },
  { month: 'Jul', congress: 18.2, sp500: 10.3 },
  { month: 'Aug', congress: 14.7, sp500: 8.8 },
  { month: 'Sep', congress: 16.9, sp500: 9.5 },
  { month: 'Oct', congress: 19.4, sp500: 11.2 }
];

export function GovernmentTradingTracker({ onBack, userContext }: GovernmentTradingTrackerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterChamber, setFilterChamber] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');

  const filteredTrades = congressTrades.filter(trade => {
    const matchesSearch = 
      trade.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trade.ticker.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trade.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesChamber = filterChamber === 'all' || trade.chamber.toLowerCase() === filterChamber.toLowerCase();
    const matchesType = filterType === 'all' || trade.type.toLowerCase() === filterType.toLowerCase();
    
    return matchesSearch && matchesChamber && matchesType;
  });

  const getPerformanceColor = (performance: string) => {
    return performance.startsWith('+') ? 'text-green-600' : 'text-red-600';
  };

  const getPerformanceBg = (performance: string) => {
    return performance.startsWith('+') ? 'bg-green-50 dark:bg-green-950' : 'bg-red-50 dark:bg-red-950';
  };

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
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Dashboard
          </Button>
          
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="mb-2">Government Trading Tracker</h1>
              <p className="text-muted-foreground">
                Track stock trades by members of Congress and Senate
              </p>
            </div>
            <Badge variant="secondary" className="text-sm">
              🔓 Unlocked
            </Badge>
          </div>

          <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-blue-800 dark:text-blue-100 mb-1">For Educational Purposes Only</p>
                <p className="text-blue-700 dark:text-blue-200">
                  This tracker shows publicly disclosed trades by government officials. This information is for educational purposes and should not be considered investment advice. Always conduct your own research before making investment decisions.
                </p>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="trades" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="trades">Recent Trades</TabsTrigger>
            <TabsTrigger value="top-stocks">Top Stocks</TabsTrigger>
            <TabsTrigger value="sectors">Sector Analysis</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="trades" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filter Trades
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by name, ticker, or company..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div>
                    <select
                      value={filterChamber}
                      onChange={(e) => setFilterChamber(e.target.value)}
                      className="w-full h-10 px-3 rounded-md border border-input bg-background"
                    >
                      <option value="all">All Chambers</option>
                      <option value="house">House</option>
                      <option value="senate">Senate</option>
                    </select>
                  </div>
                  <div>
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="w-full h-10 px-3 rounded-md border border-input bg-background"
                    >
                      <option value="all">All Types</option>
                      <option value="purchase">Purchases</option>
                      <option value="sale">Sales</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trades List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredTrades.length} trades
                </p>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </Button>
              </div>

              {filteredTrades.map((trade) => (
                <Card key={trade.id} className="hover:shadow-md transition-all">
                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      <div className="md:col-span-2">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <User className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{trade.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {trade.chamber}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {trade.party}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{trade.state}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Building2 className="w-4 h-4 text-muted-foreground" />
                          <p className="font-medium">{trade.ticker}</p>
                        </div>
                        <p className="text-sm text-muted-foreground">{trade.company}</p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          {trade.type === 'Purchase' ? (
                            <TrendingUp className="w-4 h-4 text-green-600" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-red-600" />
                          )}
                          <Badge variant={trade.type === 'Purchase' ? 'default' : 'secondary'}>
                            {trade.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{trade.amount}</p>
                      </div>

                      <div className="text-right">
                        <div className="flex items-center justify-end gap-2 mb-1">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <p className="text-sm">{trade.date}</p>
                        </div>
                        <div className={`inline-block px-2 py-1 rounded ${getPerformanceBg(trade.performance)}`}>
                          <p className={`text-sm font-medium ${getPerformanceColor(trade.performance)}`}>
                            {trade.performance}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="top-stocks" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Most Traded Stocks</CardTitle>
                <CardDescription>
                  Stocks with the highest trading volume by Congress members
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topStocks.map((stock, index) => (
                    <div key={stock.ticker} className="p-4 bg-muted rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                            <span className="text-sm font-bold text-primary-foreground">{index + 1}</span>
                          </div>
                          <div>
                            <p className="font-bold text-lg">{stock.ticker}</p>
                            <p className="text-sm text-muted-foreground">{stock.trades} trades</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{stock.value}</p>
                          <p className={`text-sm ${getPerformanceColor(stock.avgReturn)}`}>
                            {stock.avgReturn} avg
                          </p>
                        </div>
                      </div>
                      <Progress value={(stock.trades / 25) * 100} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sectors" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Sector Distribution</CardTitle>
                <CardDescription>
                  Congressional trading activity by industry sector
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                      <PieChart>
                        <Pie
                          data={sectorDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={80}
                          dataKey="value"
                          label={(entry) => `${entry.name} ${entry.value}%`}
                        >
                          {sectorDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="space-y-3">
                    {sectorDistribution.map((sector) => (
                      <div key={sector.name} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded" style={{ backgroundColor: sector.color }}></div>
                          <span>{sector.name}</span>
                        </div>
                        <span className="font-medium">{sector.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Performance Comparison
                </CardTitle>
                <CardDescription>
                  Congressional portfolio vs S&P 500 (Last 7 months)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 mb-4">
                  <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                    <BarChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={(value) => `${value}%`} />
                      <Tooltip formatter={(value) => [`${value}%`, '']} />
                      <Legend />
                      <Bar dataKey="congress" fill="#8884d8" name="Congress Trades" />
                      <Bar dataKey="sp500" fill="#82ca9d" name="S&P 500" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-1">Avg Monthly Return</p>
                    <p className="text-2xl font-bold text-green-600">+15.5%</p>
                    <p className="text-xs text-muted-foreground">Congress Trades</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-1">Avg Monthly Return</p>
                    <p className="text-2xl font-bold">+9.2%</p>
                    <p className="text-xs text-muted-foreground">S&P 500</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-1">Outperformance</p>
                    <p className="text-2xl font-bold text-blue-600">+6.3%</p>
                    <p className="text-xs text-muted-foreground">Difference</p>
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

// Import Progress component
import { Progress } from './ui/progress';
