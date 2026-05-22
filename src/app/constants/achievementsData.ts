/**
 * Achievements & XP System
 * Designed by Content AI, Marketing, UX, and Dev agents
 * 
 * Philosophy: Military-themed progression that rewards consistent engagement,
 * completion milestones, and financial literacy development
 */

import {
  Star,
  Award,
  Trophy,
  Medal,
  Target,
  Shield,
  Zap,
  TrendingUp,
  BookOpen,
  Calendar,
  Flame,
  Crown,
  Rocket,
  Diamond,
  Sparkles,
  CheckCircle,
  Lock,
  Unlock,
  GraduationCap,
  DollarSign,
  type LucideIcon
} from 'lucide-react';

// ============================================================================
// XP LEVEL SYSTEM (Designed by UX & Marketing Agents)
// ============================================================================

export interface XPLevel {
  level: number;
  minXP: number;
  maxXP: number;
  rank: string;
  militaryPayGrade: string;
  icon: LucideIcon;
  color: string;
  perks: string[];
}

/**
 * XP Levels inspired by military pay grades
 * Designed to feel achievable yet challenging
 * Average user reaches E-5 in 2-3 months of consistent use
 */
export const XP_LEVELS: XPLevel[] = [
  {
    level: 1,
    minXP: 0,
    maxXP: 99,
    rank: 'Recruit',
    militaryPayGrade: 'E-1',
    icon: Star,
    color: 'text-gray-600',
    perks: ['Access to basic missions', 'Tutorial system']
  },
  {
    level: 2,
    minXP: 100,
    maxXP: 249,
    rank: 'Private',
    militaryPayGrade: 'E-2',
    icon: Shield,
    color: 'text-gray-700',
    perks: ['Unlocked all core missions', 'Basic calculators']
  },
  {
    level: 3,
    minXP: 250,
    maxXP: 499,
    rank: 'Private First Class',
    militaryPayGrade: 'E-3',
    icon: Award,
    color: 'text-blue-600',
    perks: ['Investment missions unlocked', 'Progress tracking']
  },
  {
    level: 4,
    minXP: 500,
    maxXP: 799,
    rank: 'Specialist',
    militaryPayGrade: 'E-4',
    icon: Target,
    color: 'text-blue-700',
    perks: ['Advanced calculators', 'AI advisor features']
  },
  {
    level: 5,
    minXP: 800,
    maxXP: 1199,
    rank: 'Sergeant',
    militaryPayGrade: 'E-5',
    icon: Medal,
    color: 'text-green-600',
    perks: ['All missions unlocked', 'Custom goals', 'Priority support']
  },
  {
    level: 6,
    minXP: 1200,
    maxXP: 1699,
    rank: 'Staff Sergeant',
    militaryPayGrade: 'E-6',
    icon: TrendingUp,
    color: 'text-green-700',
    perks: ['Advanced analytics', 'Export reports', 'Beta features']
  },
  {
    level: 7,
    minXP: 1700,
    maxXP: 2299,
    rank: 'Sergeant First Class',
    militaryPayGrade: 'E-7',
    icon: Trophy,
    color: 'text-purple-600',
    perks: ['Portfolio analysis', 'Tax optimization tools', 'Community badge']
  },
  {
    level: 8,
    minXP: 2300,
    maxXP: 2999,
    rank: 'Master Sergeant',
    militaryPayGrade: 'E-8',
    icon: Crown,
    color: 'text-purple-700',
    perks: ['Estate planning tools', '1-on-1 advisor session', 'VIP support']
  },
  {
    level: 9,
    minXP: 3000,
    maxXP: 3799,
    rank: 'Sergeant Major',
    militaryPayGrade: 'E-9',
    icon: Rocket,
    color: 'text-orange-600',
    perks: ['Full feature access', 'Mentorship program', 'Special recognition']
  },
  {
    level: 10,
    minXP: 3800,
    maxXP: 999999,
    rank: 'Command Sergeant Major',
    militaryPayGrade: 'E-9S',
    icon: Diamond,
    color: 'text-gold-600',
    perks: ['Lifetime achievement', 'Hall of Fame', 'Exclusive events', 'All future features']
  }
];

// ============================================================================
// ACHIEVEMENTS SYSTEM (Designed by Content & Marketing Agents)
// ============================================================================

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  category: 'missions' | 'streaks' | 'milestones' | 'mastery' | 'social' | 'special';
  tier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  xpReward: number;
  requirement: {
    type: 'missions_completed' | 'xp_earned' | 'streak_days' | 'specific_mission' | 'calculator_use' | 'level_reached' | 'missions_in_operation' | 'perfect_week';
    value: number | string;
    details?: string;
  };
  hidden?: boolean; // Secret achievements
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
}

/**
 * Complete Achievements List
 * Organized by category for discoverability
 * Balanced XP rewards and progression pacing
 */
export const ACHIEVEMENTS: Achievement[] = [
  // ============================================================================
  // MISSION COMPLETION ACHIEVEMENTS
  // ============================================================================
  {
    id: 'first-mission',
    title: 'First Step',
    description: 'Complete your first mission',
    icon: CheckCircle,
    category: 'missions',
    tier: 'bronze',
    xpReward: 50,
    requirement: {
      type: 'missions_completed',
      value: 1,
      details: 'Complete any mission to earn this achievement'
    },
    rarity: 'common'
  },
  {
    id: 'mission-5',
    title: 'Getting Started',
    description: 'Complete 5 missions',
    icon: Target,
    category: 'missions',
    tier: 'bronze',
    xpReward: 100,
    requirement: {
      type: 'missions_completed',
      value: 5
    },
    rarity: 'common'
  },
  {
    id: 'mission-10',
    title: 'Mission Veteran',
    description: 'Complete 10 missions',
    icon: Shield,
    category: 'missions',
    tier: 'silver',
    xpReward: 200,
    requirement: {
      type: 'missions_completed',
      value: 10
    },
    rarity: 'uncommon'
  },
  {
    id: 'mission-25',
    title: 'Mission Expert',
    description: 'Complete 25 missions',
    icon: Award,
    category: 'missions',
    tier: 'gold',
    xpReward: 500,
    requirement: {
      type: 'missions_completed',
      value: 25
    },
    rarity: 'rare'
  },
  {
    id: 'mission-50',
    title: 'Mission Master',
    description: 'Complete 50 missions - True dedication!',
    icon: Trophy,
    category: 'missions',
    tier: 'platinum',
    xpReward: 1000,
    requirement: {
      type: 'missions_completed',
      value: 50
    },
    rarity: 'epic'
  },
  {
    id: 'mission-75',
    title: 'Mission Elite',
    description: 'Complete 75 missions - Elite achievement!',
    icon: Crown,
    category: 'missions',
    tier: 'diamond',
    xpReward: 1500,
    requirement: {
      type: 'missions_completed',
      value: 75
    },
    rarity: 'epic'
  },
  {
    id: 'mission-100',
    title: 'Century Club',
    description: 'Complete 100 missions - Legendary achievement!',
    icon: Diamond,
    category: 'missions',
    tier: 'diamond',
    xpReward: 3000,
    requirement: {
      type: 'missions_completed',
      value: 100
    },
    rarity: 'legendary'
  },

  // ============================================================================
  // STREAK ACHIEVEMENTS (Engagement Focused)
  // ============================================================================
  {
    id: 'streak-3',
    title: 'On a Roll',
    description: 'Complete missions 3 days in a row',
    icon: Flame,
    category: 'streaks',
    tier: 'bronze',
    xpReward: 75,
    requirement: {
      type: 'streak_days',
      value: 3
    },
    rarity: 'common'
  },
  {
    id: 'streak-7',
    title: 'Week Warrior',
    description: 'Complete missions 7 days in a row',
    icon: Calendar,
    category: 'streaks',
    tier: 'silver',
    xpReward: 150,
    requirement: {
      type: 'streak_days',
      value: 7
    },
    rarity: 'uncommon'
  },
  {
    id: 'streak-30',
    title: 'Monthly Dedication',
    description: 'Complete missions 30 days in a row',
    icon: Medal,
    category: 'streaks',
    tier: 'gold',
    xpReward: 500,
    requirement: {
      type: 'streak_days',
      value: 30
    },
    rarity: 'rare'
  },
  {
    id: 'streak-100',
    title: 'Century Streak',
    description: 'Complete missions 100 days in a row - Unstoppable!',
    icon: Rocket,
    category: 'streaks',
    tier: 'platinum',
    xpReward: 2000,
    requirement: {
      type: 'streak_days',
      value: 100
    },
    rarity: 'epic'
  },
  {
    id: 'perfect-week',
    title: 'Perfect Week',
    description: 'Complete at least 1 mission every day for a week',
    icon: Sparkles,
    category: 'streaks',
    tier: 'silver',
    xpReward: 200,
    requirement: {
      type: 'perfect_week',
      value: 1
    },
    rarity: 'uncommon'
  },

  // ============================================================================
  // XP MILESTONE ACHIEVEMENTS
  // ============================================================================
  {
    id: 'xp-500',
    title: 'Rising Star',
    description: 'Earn 500 total XP',
    icon: Star,
    category: 'milestones',
    tier: 'bronze',
    xpReward: 100,
    requirement: {
      type: 'xp_earned',
      value: 500
    },
    rarity: 'common'
  },
  {
    id: 'xp-1000',
    title: 'XP Collector',
    description: 'Earn 1,000 total XP',
    icon: Zap,
    category: 'milestones',
    tier: 'silver',
    xpReward: 200,
    requirement: {
      type: 'xp_earned',
      value: 1000
    },
    rarity: 'uncommon'
  },
  {
    id: 'xp-2500',
    title: 'Power User',
    description: 'Earn 2,500 total XP',
    icon: TrendingUp,
    category: 'milestones',
    tier: 'gold',
    xpReward: 500,
    requirement: {
      type: 'xp_earned',
      value: 2500
    },
    rarity: 'rare'
  },
  {
    id: 'xp-5000',
    title: 'XP Legend',
    description: 'Earn 5,000 total XP - Elite status!',
    icon: Crown,
    category: 'milestones',
    tier: 'platinum',
    xpReward: 1000,
    requirement: {
      type: 'xp_earned',
      value: 5000
    },
    rarity: 'epic'
  },

  // ============================================================================
  // OPERATION MASTERY ACHIEVEMENTS
  // ============================================================================
  {
    id: 'financial-readiness-master',
    title: 'Financial Foundation',
    description: 'Complete all Financial Readiness missions',
    icon: Shield,
    category: 'mastery',
    tier: 'gold',
    xpReward: 400,
    requirement: {
      type: 'missions_in_operation',
      value: 'financial-readiness',
      details: 'Complete: Emergency Fund, Budget Planning, Financial Education, Debt Management'
    },
    rarity: 'rare'
  },
  {
    id: 'investment-master',
    title: 'Investment Savvy',
    description: 'Complete all Investment Operations missions',
    icon: TrendingUp,
    category: 'mastery',
    tier: 'gold',
    xpReward: 600,
    requirement: {
      type: 'missions_in_operation',
      value: 'investment-operations',
      details: 'Complete all 6 investment missions'
    },
    rarity: 'rare'
  },
  {
    id: 'retirement-master',
    title: 'Retirement Ready',
    description: 'Complete all Retirement Operations missions',
    icon: Target,
    category: 'mastery',
    tier: 'gold',
    xpReward: 500,
    requirement: {
      type: 'missions_in_operation',
      value: 'retirement-operations',
      details: 'Complete: Retirement Planning, TSP Optimization, VA Benefits'
    },
    rarity: 'rare'
  },
  {
    id: 'complete-all-operations',
    title: 'Operations Commander',
    description: 'Complete ALL missions across all operations',
    icon: Diamond,
    category: 'mastery',
    tier: 'diamond',
    xpReward: 2000,
    requirement: {
      type: 'missions_completed',
      value: 13,
      details: 'Complete every single mission in the app'
    },
    rarity: 'legendary'
  },

  // ============================================================================
  // SPECIFIC MISSION ACHIEVEMENTS
  // ============================================================================
  {
    id: 'emergency-fund-complete',
    title: 'Safety Net Secured',
    description: 'Complete the Emergency Fund Mission',
    icon: Shield,
    category: 'missions',
    tier: 'bronze',
    xpReward: 50,
    requirement: {
      type: 'specific_mission',
      value: 'emergency-fund'
    },
    rarity: 'common'
  },
  {
    id: 'tsp-complete',
    title: 'TSP Optimizer',
    description: 'Complete the TSP Optimization Mission',
    icon: DollarSign,
    category: 'missions',
    tier: 'silver',
    xpReward: 100,
    requirement: {
      type: 'specific_mission',
      value: 'tsp-optimization'
    },
    rarity: 'uncommon'
  },
  {
    id: 'financial-education-complete',
    title: 'Educated Investor',
    description: 'Complete the Financial Education Mission',
    icon: GraduationCap,
    category: 'missions',
    tier: 'silver',
    xpReward: 100,
    requirement: {
      type: 'specific_mission',
      value: 'financial-education'
    },
    rarity: 'uncommon'
  },

  // ============================================================================
  // LEVEL ACHIEVEMENTS
  // ============================================================================
  {
    id: 'level-5',
    title: 'Sergeant Status',
    description: 'Reach Level 5 (Sergeant)',
    icon: Medal,
    category: 'milestones',
    tier: 'silver',
    xpReward: 250,
    requirement: {
      type: 'level_reached',
      value: 5
    },
    rarity: 'uncommon'
  },
  {
    id: 'level-10',
    title: 'Command Achievement',
    description: 'Reach Level 10 (Command Sergeant Major)',
    icon: Crown,
    category: 'milestones',
    tier: 'diamond',
    xpReward: 1500,
    requirement: {
      type: 'level_reached',
      value: 10
    },
    rarity: 'legendary'
  },

  // ============================================================================
  // CALCULATOR USAGE ACHIEVEMENTS
  // ============================================================================
  {
    id: 'calculator-user',
    title: 'Number Cruncher',
    description: 'Use any calculator 10 times',
    icon: Target,
    category: 'milestones',
    tier: 'bronze',
    xpReward: 75,
    requirement: {
      type: 'calculator_use',
      value: 10
    },
    rarity: 'common'
  },
  {
    id: 'calculator-expert',
    title: 'Calculator Expert',
    description: 'Use any calculator 50 times',
    icon: Award,
    category: 'milestones',
    tier: 'silver',
    xpReward: 200,
    requirement: {
      type: 'calculator_use',
      value: 50
    },
    rarity: 'uncommon'
  },

  // ============================================================================
  // HIDDEN/SECRET ACHIEVEMENTS
  // ============================================================================
  {
    id: 'early-bird',
    title: 'Early Bird',
    description: 'Complete a mission before 6 AM',
    icon: Sparkles,
    category: 'special',
    tier: 'gold',
    xpReward: 150,
    requirement: {
      type: 'specific_mission',
      value: 'any',
      details: 'Complete any mission between 5:00-6:00 AM'
    },
    hidden: true,
    rarity: 'rare'
  },
  {
    id: 'night-owl',
    title: 'Night Owl',
    description: 'Complete a mission after midnight',
    icon: Star,
    category: 'special',
    tier: 'gold',
    xpReward: 150,
    requirement: {
      type: 'specific_mission',
      value: 'any',
      details: 'Complete any mission between 12:00-2:00 AM'
    },
    hidden: true,
    rarity: 'rare'
  },
  {
    id: 'weekend-warrior',
    title: 'Weekend Warrior',
    description: 'Complete 5 missions on weekends',
    icon: Medal,
    category: 'special',
    tier: 'silver',
    xpReward: 200,
    requirement: {
      type: 'missions_completed',
      value: 5,
      details: 'Complete missions on Saturday or Sunday'
    },
    hidden: true,
    rarity: 'uncommon'
  },
  {
    id: 'speedrunner',
    title: 'Speedrunner',
    description: 'Complete 3 missions in one day',
    icon: Rocket,
    category: 'special',
    tier: 'gold',
    xpReward: 300,
    requirement: {
      type: 'missions_completed',
      value: 3,
      details: 'Complete 3 missions within 24 hours'
    },
    hidden: true,
    rarity: 'rare'
  },
  {
    id: 'demo-explorer',
    title: 'Martinez Scholar',
    description: 'Complete the full tutorial story',
    icon: BookOpen,
    category: 'special',
    tier: 'bronze',
    xpReward: 100,
    requirement: {
      type: 'specific_mission',
      value: 'tutorial',
      details: 'Watch Sergeant Martinez\'s complete financial journey'
    },
    rarity: 'common'
  }
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get current level based on XP
 */
export function getLevelFromXP(xp: number): XPLevel {
  for (let i = XP_LEVELS.length - 1; i >= 0; i--) {
    if (xp >= XP_LEVELS[i].minXP) {
      return XP_LEVELS[i];
    }
  }
  return XP_LEVELS[0];
}

/**
 * Get next level information
 */
export function getNextLevel(currentXP: number): XPLevel | null {
  const currentLevel = getLevelFromXP(currentXP);
  const nextLevelIndex = currentLevel.level;
  
  if (nextLevelIndex >= XP_LEVELS.length) {
    return null; // Max level reached
  }
  
  return XP_LEVELS[nextLevelIndex];
}

/**
 * Calculate progress to next level
 */
export function getProgressToNextLevel(currentXP: number): {
  currentLevel: XPLevel;
  nextLevel: XPLevel | null;
  progress: number;
  xpNeeded: number;
  xpInCurrentLevel: number;
} {
  const currentLevel = getLevelFromXP(currentXP);
  const nextLevel = getNextLevel(currentXP);
  
  if (!nextLevel) {
    return {
      currentLevel,
      nextLevel: null,
      progress: 100,
      xpNeeded: 0,
      xpInCurrentLevel: currentXP - currentLevel.minXP
    };
  }
  
  const xpInCurrentLevel = currentXP - currentLevel.minXP;
  const xpNeededForNextLevel = nextLevel.minXP - currentLevel.minXP;
  const progress = (xpInCurrentLevel / xpNeededForNextLevel) * 100;
  
  return {
    currentLevel,
    nextLevel,
    progress: Math.min(progress, 100),
    xpNeeded: nextLevel.minXP - currentXP,
    xpInCurrentLevel
  };
}

/**
 * Get achievement by ID
 */
export function getAchievementById(id: string): Achievement | undefined {
  return ACHIEVEMENTS.find(a => a.id === id);
}

/**
 * Get achievements by category
 */
export function getAchievementsByCategory(category: Achievement['category']): Achievement[] {
  return ACHIEVEMENTS.filter(a => a.category === category);
}

/**
 * Get tier color for styling
 */
export function getTierColor(tier: Achievement['tier']): string {
  const colors = {
    bronze: 'text-orange-700 bg-orange-100 border-orange-300',
    silver: 'text-gray-700 bg-gray-200 border-gray-400',
    gold: 'text-yellow-700 bg-yellow-100 border-yellow-400',
    platinum: 'text-blue-700 bg-blue-100 border-blue-300',
    diamond: 'text-purple-700 bg-purple-100 border-purple-300'
  };
  return colors[tier];
}

/**
 * Get rarity color for styling
 */
export function getRarityColor(rarity: Achievement['rarity']): string {
  const colors = {
    common: 'text-gray-600',
    uncommon: 'text-green-600',
    rare: 'text-blue-600',
    epic: 'text-purple-600',
    legendary: 'text-orange-600'
  };
  return colors[rarity];
}