import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Sparkles, 
  X,
  TrendingUp,
  Shield,
  Zap,
  Crown,
  ArrowRight
} from 'lucide-react';

interface MarketingBannerProps {
  variant?: 'premium' | 'tutorial' | 'feature';
  onDismiss?: () => void;
  onAction?: () => void;
}

export function MarketingBanner({ variant = 'premium', onDismiss, onAction }: MarketingBannerProps) {
  const [isDismissed, setIsDismissed] = useState(false);

  const handleDismiss = () => {
    setIsDismissed(true);
    if (onDismiss) {
      onDismiss();
    }
    // Store dismissal in localStorage with timestamp
    const dismissals = JSON.parse(localStorage.getItem('major-finance-banner-dismissals') || '{}');
    dismissals[variant] = Date.now();
    localStorage.setItem('major-finance-banner-dismissals', JSON.stringify(dismissals));
  };

  // Check if banner was recently dismissed (24 hours)
  React.useEffect(() => {
    const dismissals = JSON.parse(localStorage.getItem('major-finance-banner-dismissals') || '{}');
    const lastDismissed = dismissals[variant];
    if (lastDismissed && (Date.now() - lastDismissed) < 24 * 60 * 60 * 1000) {
      setIsDismissed(true);
    }
  }, [variant]);

  if (isDismissed) return null;

  const content = {
    premium: {
      gradient: 'from-purple-500/10 via-pink-500/10 to-orange-500/10',
      icon: Crown,
      iconColor: 'text-purple-500',
      title: 'Upgrade to Major Finance Pro',
      description: 'Get personalized financial coaching, advanced portfolio analysis, and priority AI support',
      badge: 'Limited Time Offer',
      badgeVariant: 'default' as const,
      features: [
        'Unlimited calculator usage',
        'Advanced investment strategies',
        'Priority AI assistant responses',
        '1-on-1 financial coaching sessions'
      ],
      cta: 'Upgrade Now',
      price: '$9.99/mo'
    },
    tutorial: {
      gradient: 'from-blue-500/10 via-cyan-500/10 to-teal-500/10',
      icon: Zap,
      iconColor: 'text-blue-500',
      title: 'Get Started with Interactive Tutorial',
      description: 'Learn how to use Major Finance effectively with our guided walkthrough',
      badge: 'New Feature',
      badgeVariant: 'secondary' as const,
      features: [
        '5-minute interactive tour',
        'Learn calculator features',
        'Discover AI assistant capabilities',
        'Best practices for military finance'
      ],
      cta: 'Start Tutorial',
      price: null
    },
    feature: {
      gradient: 'from-green-500/10 via-emerald-500/10 to-teal-500/10',
      icon: Sparkles,
      iconColor: 'text-green-500',
      title: 'New: AI-Powered Investment Advisor',
      description: 'Get real-time investment recommendations tailored to your military career timeline',
      badge: 'Just Launched',
      badgeVariant: 'secondary' as const,
      features: [
        'Personalized investment strategies',
        'Risk-adjusted recommendations',
        'TSP allocation optimization',
        'Market insights for military personnel'
      ],
      cta: 'Try Now',
      price: null
    }
  };

  const config = content[variant];
  const Icon = config.icon;

  return (
    <Card className={`relative overflow-hidden border-2 border-primary/20 bg-gradient-to-r ${config.gradient}`}>
      <CardContent className="p-6">
        {/* Dismiss Button */}
        {onDismiss && (
          <button
            onClick={handleDismiss}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        <div className="flex flex-col md:flex-row md:items-start gap-6">
          {/* Icon and Header */}
          <div className="flex-1">
            <div className="flex items-start gap-4 mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0`}>
                <Icon className={`w-6 h-6 ${config.iconColor}`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant={config.badgeVariant} className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    {config.badge}
                  </Badge>
                </div>
                <h3 className="mb-2">{config.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {config.description}
                </p>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
              {config.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="flex flex-col gap-3 md:min-w-[200px] md:items-end">
            {config.price && (
              <div className="text-center md:text-right">
                <div className="text-2xl font-bold">{config.price}</div>
                <div className="text-xs text-muted-foreground">Billed monthly</div>
              </div>
            )}
            <Button 
              onClick={onAction}
              className="w-full md:w-auto bg-gradient-primary group"
              size="lg"
            >
              {config.cta}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            {variant === 'premium' && (
              <p className="text-xs text-center md:text-right text-muted-foreground">
                30-day money-back guarantee
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default MarketingBanner;
