import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Shield, 
  Target, 
  TrendingUp, 
  CheckCircle,
  ArrowRight,
  Sparkles,
  Star,
  Compass,
  Award
} from 'lucide-react';

interface WelcomeScreenProps {
  onGetStarted: () => void;
  onTryDemo: () => void;
}

export function WelcomeScreen({ onGetStarted, onTryDemo }: WelcomeScreenProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger animations after mount
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const benefits = [
    {
      icon: Shield,
      title: 'Military-Tailored',
      description: 'TSP, pension, and VA benefits planning',
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'from-blue-500/10 to-blue-500/5'
    },
    {
      icon: Target,
      title: 'Mission-Based',
      description: 'Complete objectives, earn XP, level up',
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'from-green-500/10 to-green-500/5'
    },
    {
      icon: TrendingUp,
      title: 'Smart Planning',
      description: 'Personalized retirement & investment strategy',
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'from-purple-500/10 to-purple-500/5'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 overflow-y-auto">
      <div className="min-h-screen flex items-center justify-center p-4 py-8 md:py-16">
        <div className="w-full max-w-4xl space-y-8 md:space-y-12">
          
          {/* Hero Section */}
          <div className={`text-center space-y-4 md:space-y-6 transition-all duration-1000 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            {/* Logo/Title */}
            <div className="relative inline-block">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 blur-3xl opacity-50 animate-pulse" />
              <div className="relative flex flex-col items-center gap-4 md:gap-5">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-2xl">
                  <Star className="w-9 h-9 md:w-11 md:h-11 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-3 md:mb-4">
                    Major Finance
                  </h1>
                  <p className="text-lg md:text-2xl text-muted-foreground max-w-xl mx-auto px-4">
                    Retirement planning built for service members
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons - Primary Focus */}
          <div className={`flex flex-col gap-3 md:gap-4 justify-center items-stretch max-w-md mx-auto px-4 transition-all duration-1000 delay-200 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <Button 
              size="lg" 
              className="bg-gradient-primary text-lg md:text-xl px-8 py-7 md:py-8 h-auto group shadow-xl hover:shadow-2xl transition-all relative overflow-hidden"
              onClick={onGetStarted}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
              <Compass className="w-6 h-6 mr-2" />
              <span className="font-semibold">Get Started</span>
              <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg md:text-xl px-8 py-7 md:py-8 h-auto border-2 hover:bg-muted/50"
              onClick={onTryDemo}
            >
              <Sparkles className="w-6 h-6 mr-2" />
              <span className="font-semibold">View Demo</span>
            </Button>
            
            <p className="text-xs md:text-sm text-center text-muted-foreground mt-2">
              No credit card required • Free to use
            </p>
          </div>

          {/* Benefits - Simplified */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 px-4 transition-all duration-1000 delay-400 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            {benefits.map((benefit, index) => (
              <Card 
                key={index} 
                className="bg-background/80 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all group"
              >
                <CardContent className="p-5 md:p-6 text-center">
                  <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br ${benefit.bgColor} flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform`}>
                    <benefit.icon className={`w-6 h-6 md:w-7 md:h-7 ${benefit.color}`} />
                  </div>
                  <h3 className="font-bold text-base md:text-lg mb-2">{benefit.title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Social Proof - Minimal */}
          <div className={`text-center space-y-3 pt-6 transition-all duration-1000 delay-600 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <div className="flex items-center justify-center gap-2 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-sm md:text-base text-muted-foreground px-4">
              Trusted by service members across all branches
            </p>
            <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground pt-2">
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-primary" />
                <span>Secure</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-primary" />
                <span>Military-Built</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>Free</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
