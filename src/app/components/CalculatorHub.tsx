import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Calculator, 
  DollarSign, 
  PiggyBank, 
  TrendingUp,
  Shield,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface CalculatorHubProps {
  onCalculatorSelect: (calculatorId: string) => void;
}

export function CalculatorHub({ onCalculatorSelect }: CalculatorHubProps) {
  const calculators = [
    {
      id: 'retirement-planning',
      title: 'Retirement Calculator',
      description: 'Plan your military retirement with TSP projections and pension estimates',
      icon: Calculator,
      gradient: 'from-blue-500 to-blue-600',
      featured: true,
      stats: {
        users: '2,500+',
        rating: '4.9/5',
        time: '5 min'
      }
    },
    {
      id: 'emergency-fund',
      title: 'Emergency Fund Calculator',
      description: 'Calculate your ideal emergency fund based on military-specific factors',
      icon: Shield,
      gradient: 'from-green-500 to-green-600',
      featured: false,
      stats: {
        users: '1,800+',
        rating: '4.8/5',
        time: '3 min'
      }
    },
    {
      id: 'tsp-optimization',
      title: 'TSP Contribution Optimizer',
      description: 'Maximize your Thrift Savings Plan contributions and matching benefits',
      icon: PiggyBank,
      gradient: 'from-purple-500 to-purple-600',
      featured: false,
      stats: {
        users: '3,200+',
        rating: '5.0/5',
        time: '4 min'
      }
    },
    {
      id: 'investment-basics',
      title: 'Investment Returns Calculator',
      description: 'Project investment growth with military-friendly investment strategies',
      icon: TrendingUp,
      gradient: 'from-orange-500 to-orange-600',
      featured: false,
      stats: {
        users: '1,500+',
        rating: '4.7/5',
        time: '6 min'
      }
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Calculator className="w-6 h-6 text-primary" />
            <h2>Financial Calculators</h2>
          </div>
          <p className="text-muted-foreground">
            Military-specific tools to plan your financial future
          </p>
        </div>
        <Badge variant="secondary" className="flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          AI-Powered
        </Badge>
      </div>

      {/* Featured Calculator */}
      <Card className="card-military border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div>
              <Badge className="mb-2 bg-gradient-primary">Featured</Badge>
              <CardTitle className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <Calculator className="w-5 h-5 text-white" />
                </div>
                {calculators[0].title}
              </CardTitle>
              <CardDescription className="mt-2 text-base">
                {calculators[0].description}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="text-sm">
              <span className="text-muted-foreground">Used by </span>
              <span className="font-medium">{calculators[0].stats.users}</span>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">Rating </span>
              <span className="font-medium">{calculators[0].stats.rating}</span>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">Est. </span>
              <span className="font-medium">{calculators[0].stats.time}</span>
            </div>
          </div>
          <Button 
            onClick={() => onCalculatorSelect(calculators[0].id)}
            className="w-full bg-gradient-primary group"
          >
            Start Planning
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </CardContent>
      </Card>

      {/* Calculator Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {calculators.slice(1).map((calc) => {
          const Icon = calc.icon;
          return (
            <Card 
              key={calc.id}
              className="card-elevated hover:border-primary/50 transition-all group"
            >
              <CardHeader className="pb-3">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${calc.gradient} flex items-center justify-center mb-3`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {calc.title}
                </CardTitle>
                <CardDescription className="text-sm">
                  {calc.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                  <span>{calc.stats.users} users</span>
                  <span>{calc.stats.time}</span>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  onClick={() => onCalculatorSelect(calc.id)}
                >
                  Calculate
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* CTA Banner */}
      <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="mb-1">Need personalized guidance?</h3>
              <p className="text-sm text-muted-foreground">
                Our AI Mission Control can help you understand your results and create an action plan
              </p>
            </div>
            <Button variant="outline" className="shrink-0">
              Ask AI Assistant
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default CalculatorHub;
