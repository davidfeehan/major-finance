import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Target, 
  Trophy, 
  TrendingUp, 
  Shield, 
  CheckCircle, 
  ArrowRight,
  Rocket,
  DollarSign,
  GraduationCap,
  Users,
  Star,
  Award,
  BookOpen,
  Zap
} from 'lucide-react';
import { motion } from 'motion/react';

interface DemoInterstitialProps {
  onContinue: () => void;
}

export function DemoInterstitial({ onContinue }: DemoInterstitialProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: Target,
      title: 'Mission-Based Learning',
      description: 'Complete financial missions to unlock knowledge and earn XP',
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'from-blue-500/10 to-blue-500/5'
    },
    {
      icon: Trophy,
      title: 'Achievements & Ranks',
      description: 'Level up your financial rank as you master military benefits',
      color: 'text-amber-600 dark:text-amber-400',
      bgColor: 'from-amber-500/10 to-amber-500/5'
    },
    {
      icon: DollarSign,
      title: 'TSP & Retirement Planning',
      description: 'Optimize your Thrift Savings Plan and maximize VA benefits',
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'from-green-500/10 to-green-500/5'
    },
    {
      icon: GraduationCap,
      title: 'Financial Education',
      description: 'Learn investing, budgeting, and wealth-building strategies',
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'from-purple-500/10 to-purple-500/5'
    }
  ];

  const objectives = [
    {
      icon: CheckCircle,
      text: 'Build an emergency fund with 3-6 months of expenses'
    },
    {
      icon: CheckCircle,
      text: 'Maximize your TSP contributions and allocation strategy'
    },
    {
      icon: CheckCircle,
      text: 'Learn investment fundamentals: stocks, bonds, and asset allocation'
    },
    {
      icon: CheckCircle,
      text: 'Plan for military retirement and understand your pension'
    },
    {
      icon: CheckCircle,
      text: 'Optimize VA benefits and post-service financial planning'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 overflow-y-auto">
      <div className="min-h-screen flex items-center justify-center p-4 py-8">
        <div className="w-full max-w-5xl space-y-6 md:space-y-8">
          
          {/* Hero Section */}
          <motion.div 
            className="text-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative inline-block">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 blur-3xl opacity-50 animate-pulse" />
              <div className="relative flex flex-col items-center gap-3">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-2xl">
                  <Rocket className="w-9 h-9 md:w-11 md:h-11 text-primary-foreground" />
                </div>
                <div>
                  <Badge className="mb-3 bg-gradient-primary text-sm px-3 py-1">
                    Demo Mode - SSG Marcus Martinez
                  </Badge>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-2">
                    Welcome to Major Finance
                  </h1>
                  <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                    A gamified military retirement planning app designed to help service members 
                    achieve financial success
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Mission Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-2 border-primary/30">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl md:text-2xl font-bold mb-3">
                      Your Mission: Financial Independence
                    </h2>
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                      Major Finance transforms military financial planning into an engaging journey. 
                      Through tactical missions, you'll learn to optimize your TSP, maximize VA benefits, 
                      build emergency funds, and create a personalized retirement strategy—all while earning 
                      XP, unlocking achievements, and advancing through military financial ranks.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Core Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
              Operations & Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                >
                  <Card className="bg-background/80 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all group h-full">
                    <CardContent className="p-5 md:p-6">
                      <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <feature.icon className={`w-6 h-6 md:w-7 md:h-7 ${feature.color}`} />
                      </div>
                      <h3 className="font-bold text-lg md:text-xl mb-2">{feature.title}</h3>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Learning Objectives */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="bg-background/80 backdrop-blur-sm">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500/20 to-green-500/10 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold">
                    What You'll Learn & Achieve
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  {objectives.map((objective, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.08 }}
                    >
                      <objective.icon className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm md:text-base text-muted-foreground">
                        {objective.text}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Demo Character Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-background border-2 border-amber-500/30">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="text-xl md:text-2xl font-bold">
                        Meet Staff Sergeant Marcus Martinez
                      </h3>
                      <Badge variant="outline" className="border-amber-500/50 text-amber-600 dark:text-amber-400">
                        E-6, 12 Years Service
                      </Badge>
                    </div>
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
                      You're about to experience the app through the eyes of Marcus Martinez, an Army E-6 
                      with 12 years of service. Follow his realistic financial journey as he optimizes his 
                      TSP, builds his emergency fund, and plans for retirement. All data, missions, and 
                      achievements reflect a real military financial planning scenario.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30">
                        <Star className="w-3 h-3 mr-1" />
                        Real Financial Data
                      </Badge>
                      <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/30">
                        <Zap className="w-3 h-3 mr-1" />
                        Active Missions
                      </Badge>
                      <Badge className="bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30">
                        <Award className="w-3 h-3 mr-1" />
                        Achievement System
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            className="flex justify-center pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Button 
              size="lg" 
              className="bg-gradient-primary text-lg md:text-xl px-10 py-7 md:py-8 h-auto group shadow-xl hover:shadow-2xl transition-all relative overflow-hidden"
              onClick={onContinue}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
              <Rocket className="w-6 h-6 mr-2" />
              <span className="font-semibold">Enter Demo Experience</span>
              <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          {/* Footer Note */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <p className="text-xs md:text-sm text-muted-foreground">
              Create your own account to start tracking your real financial journey
            </p>
          </motion.div>

        </div>
      </div>
    </div>
  );
}