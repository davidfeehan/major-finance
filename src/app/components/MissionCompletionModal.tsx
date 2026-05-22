import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Progress } from './ui/progress';
import { 
  Trophy, 
  Star, 
  TrendingUp, 
  Target, 
  Award,
  Sparkles,
  ChevronRight,
  CheckCircle,
  Zap,
  Gift,
  Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Achievement {
  title: string;
  description: string;
  icon?: string;
}

interface NextMission {
  id: string;
  title: string;
  description: string;
  xpReward: number;
}

interface MissionCompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  missionTitle: string;
  missionId: string;
  xpEarned: number;
  stars?: number;
  achievements?: Achievement[];
  userQuote?: string;
  currentLevel: number;
  totalXP: number;
  xpToNextLevel: number;
  nextMission?: NextMission;
  onViewProgress?: () => void;
  onStartNextMission?: (missionId: string) => void;
  onSetReminder?: () => void;
  onContinue?: () => void;
  accomplishments?: string[];
  isDemo?: boolean;
}

// Confetti particle component
const ConfettiParticle = ({ delay }: { delay: number }) => {
  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const randomX = Math.random() * 100 - 50;
  const randomRotation = Math.random() * 360;
  
  return (
    <motion.div
      className="absolute w-2 h-2 rounded-sm"
      style={{ 
        backgroundColor: randomColor,
        top: '50%',
        left: '50%'
      }}
      initial={{ 
        opacity: 1, 
        y: 0, 
        x: 0,
        rotate: 0,
        scale: 1
      }}
      animate={{ 
        opacity: 0,
        y: Math.random() * -200 - 100,
        x: randomX,
        rotate: randomRotation,
        scale: 0
      }}
      transition={{ 
        duration: 1.5,
        delay: delay,
        ease: "easeOut"
      }}
    />
  );
};

export function MissionCompletionModal({
  isOpen,
  onClose,
  missionTitle,
  missionId,
  xpEarned,
  stars = 5,
  achievements = [],
  userQuote,
  currentLevel,
  totalXP,
  xpToNextLevel,
  nextMission,
  onViewProgress,
  onStartNextMission,
  onSetReminder,
  onContinue,
  accomplishments,
  isDemo = false
}: MissionCompletionModalProps) {
  const [showContent, setShowContent] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [reminderSet, setReminderSet] = useState(false);
  const xpProgress = ((totalXP % 500) / 500) * 100;

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      setTimeout(() => setShowContent(true), 300);
      setTimeout(() => setShowConfetti(false), 2000);
    } else {
      setShowContent(false);
      setShowConfetti(false);
    }
  }, [isOpen]);

  const getMissionIcon = (id: string) => {
    const icons: Record<string, React.ElementType> = {
      'emergency-fund': CheckCircle,
      'tsp-optimization': Target,
      'investment-basics': TrendingUp,
      'financial-education': Award,
      'retirement-planning': Trophy,
      'budget-creation': Sparkles
    };
    return icons[id] || Trophy;
  };

  const Icon = getMissionIcon(missionId);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl p-0 bg-gradient-to-br from-background via-background to-primary/5 overflow-y-auto overflow-x-hidden">
        {/* Confetti Effect */}
        <AnimatePresence>
          {showConfetti && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
              {Array.from({ length: 50 }).map((_, i) => (
                <ConfettiParticle key={i} delay={i * 0.02} />
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="relative">
          {/* Header Section with Gradient - Sticky */}
          <div className="sticky top-0 z-40 p-8 text-center relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent opacity-50" />
            
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Success Icon */}
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-2xl">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <DialogHeader>
                <DialogTitle className="text-3xl mb-2">Mission Complete! 🎉</DialogTitle>
                <DialogDescription className="text-lg">
                  {missionTitle}
                </DialogDescription>
              </DialogHeader>
            </motion.div>

            {/* Star Rating - Only show if stars are provided */}
            {stars > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, type: "spring" }}
                className="flex items-center justify-center gap-2 mt-6"
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0, rotate: -180 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ delay: 0.7 + (i * 0.1), type: "spring" }}
                  >
                    <Star
                      className={`w-8 h-8 ${
                        i < stars
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-muted-foreground/30'
                      }`}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Content Section */}
          <AnimatePresence>
            {showContent && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="p-6 pb-8 space-y-6"
              >
                {/* XP Reward Card */}
                <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                          <Zap className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">XP Earned</p>
                          <p className="text-3xl font-bold text-primary">+{xpEarned}</p>
                        </div>
                      </div>
                      <Badge className="text-lg px-4 py-2" variant="secondary">
                        Level {currentLevel}
                      </Badge>
                    </div>

                    {/* Progress to Next Level */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progress to Level {currentLevel + 1}</span>
                        <span className="font-semibold">{xpToNextLevel} XP needed</span>
                      </div>
                      <Progress value={xpProgress} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                {/* Mission Accomplishments - Simple list */}
                {accomplishments && accomplishments.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <h3 className="text-lg font-semibold">What You Accomplished</h3>
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1.5 ml-6">
                      {accomplishments.map((item, index) => (
                        <motion.li 
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.8 + (index * 0.1) }}
                        >
                          • {item}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Achievements Unlocked */}
                {achievements && achievements.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Gift className="w-5 h-5 text-primary" />
                      <h3 className="text-lg font-semibold">Achievements Unlocked</h3>
                    </div>
                    <div className="space-y-2">
                      {achievements.map((achievement, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.8 + (index * 0.1) }}
                        >
                          <Card className="border-green-500/20 bg-green-500/5">
                            <CardContent className="p-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-2xl">
                                  {achievement.icon || '🏆'}
                                </div>
                                <div className="flex-1">
                                  <p className="font-semibold">{achievement.title}</p>
                                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                                </div>
                                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* User Quote (Demo Mode) */}
                {userQuote && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                  >
                    <Card className="border-primary/20 bg-muted/50">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm italic text-foreground/90 mb-2">
                              "{userQuote}"
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {isDemo ? '- SSG Marcus Martinez' : '- Your reflection'}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* Set Reminder */}
                {onSetReminder && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3 }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      <h3 className="text-lg font-semibold">Keep the Momentum Going</h3>
                    </div>
                    <Button
                      variant={reminderSet ? "secondary" : "outline"}
                      size="sm"
                      onClick={() => {
                        setReminderSet(true);
                        onSetReminder();
                      }}
                      disabled={reminderSet}
                      className="w-full"
                    >
                      <Calendar className="mr-2 w-4 h-4" />
                      {reminderSet ? "Reminder Set ✓" : "Set Monthly Check-in Reminder"}
                    </Button>
                    {reminderSet && (
                      <p className="text-xs text-muted-foreground text-center mt-2">
                        We'll remind you to review your progress in 30 days
                      </p>
                    )}
                  </motion.div>
                )}

                {/* Next Mission Recommendation */}
                {nextMission && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4 }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Target className="w-5 h-5 text-primary" />
                      <h3 className="text-lg font-semibold">Recommended Next Mission</h3>
                    </div>
                    <Card className="border-primary/30 hover:border-primary/50 transition-colors cursor-pointer group">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <p className="font-semibold mb-1 group-hover:text-primary transition-colors">
                              {nextMission.title}
                            </p>
                            <p className="text-sm text-muted-foreground mb-2">
                              {nextMission.description}
                            </p>
                            <Badge variant="secondary" className="text-xs">
                              <Trophy className="w-3 h-3 mr-1" />
                              {nextMission.xpReward} XP
                            </Badge>
                          </div>
                          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6 }}
                  className="flex flex-col sm:flex-row gap-3 pt-4"
                >
                  {/* Show View Progress or Stay Here button */}
                  {onViewProgress ? (
                    <Button
                      variant="outline"
                      onClick={() => {
                        onViewProgress();
                        onClose();
                      }}
                      className="flex-1"
                    >
                      <Trophy className="w-4 h-4 mr-2" />
                      View All Progress
                    </Button>
                  ) : onContinue && (
                    <Button
                      variant="outline"
                      onClick={onClose}
                      className="flex-1"
                    >
                      Stay Here
                    </Button>
                  )}
                  
                  {/* Primary action button */}
                  {nextMission && onStartNextMission ? (
                    <Button
                      onClick={() => {
                        onStartNextMission(nextMission.id);
                        onClose();
                      }}
                      className="flex-1 bg-gradient-primary"
                    >
                      Start Next Mission
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : onContinue ? (
                    <Button
                      onClick={() => {
                        onContinue();
                        onClose();
                      }}
                      className="flex-1 bg-gradient-primary"
                    >
                      Return to Dashboard
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      onClick={onClose}
                      className="flex-1 bg-gradient-primary"
                    >
                      Continue
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
