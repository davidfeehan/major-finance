/**
 * Military Operations & Mission Hierarchy
 * 
 * 13 Operations with 100 Missions
 * Designed by Content AI, Marketing, UX, and Dev agents
 * 
 * Hierarchy:
 * OPERATION → MISSION → OBJECTIVE → TASK
 */

import { 
  Shield, 
  TrendingUp, 
  Target, 
  Rocket, 
  Home,
  BookOpen,
  PiggyBank,
  AlertCircle,
  GraduationCap,
  Briefcase,
  CreditCard,
  Calculator,
  FileText,
  Building2,
  HeartHandshake,
  Landmark,
  TrendingDown,
  DollarSign,
  BadgeDollarSign,
  Wallet,
  Building,
  ShieldCheck,
  type LucideIcon
} from 'lucide-react';

export interface Task {
  id: string;
  title: string;
  duration: string;
  description: string;
  xpReward?: number;
}

export interface Objective {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
  color: string;
  tasks: Task[];
  estimatedTime?: string;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  operationId: string;
  xpReward: number;
  difficulty: 'Standard' | 'Tactical' | 'Strategic' | 'Advanced';
  estimatedTime: string;
  featured?: boolean;
  category?: string;
  objectives?: Objective[];
  unlockRequirement?: {
    type: 'missions' | 'xp' | 'level' | 'operation';
    value: number | string;
  };
}

export interface Operation {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  gradient: string;
  missions: string[]; // mission IDs
  estimatedTotalTime: string;
  totalXP: number;
  difficulty: 'Standard' | 'Tactical' | 'Strategic' | 'Advanced';
  badge?: {
    title: string;
    description: string;
    icon: string;
  };
}

// ============================================================================
// OPERATIONS DEFINITIONS (13 Total)
// ============================================================================

export const OPERATIONS: Record<string, Operation> = {
  // ============================================================================
  // STANDARD DIFFICULTY OPERATIONS (Foundation - 18 missions)
  // ============================================================================
  
  'financial-readiness': {
    id: 'financial-readiness',
    title: 'Financial Readiness Operation',
    description: 'Build your financial foundation with essential skills every service member needs',
    icon: Shield,
    color: 'bg-blue-600',
    gradient: 'from-blue-600 to-blue-800',
    missions: [
      'emergency-fund',
      'budget-planning',
      'financial-education',
      'debt-management'
    ],
    estimatedTotalTime: '2-3 hours',
    totalXP: 900,
    difficulty: 'Standard',
    badge: {
      title: 'Financial Readiness Achievement',
      description: 'Completed all foundational financial missions',
      icon: '🛡️'
    }
  },
  
  'budget-mastery': {
    id: 'budget-mastery',
    title: 'Budget Mastery Operation',
    description: 'Master the art of budgeting with military pay and allowances',
    icon: Calculator,
    color: 'bg-green-600',
    gradient: 'from-green-600 to-green-800',
    missions: [
      'budget-basics',
      'military-pay-breakdown',
      'allowances-optimization',
      'expense-tracking',
      'savings-automation',
      'budget-50-30-20',
      'zero-based-budget',
      'budget-apps-tools'
    ],
    estimatedTotalTime: '3-4 hours',
    totalXP: 1400,
    difficulty: 'Standard',
    badge: {
      title: 'Budget Master',
      description: 'Mastered all budgeting techniques',
      icon: '💰'
    }
  },
  
  'debt-elimination': {
    id: 'debt-elimination',
    title: 'Debt Elimination Operation',
    description: 'Strategic debt payoff using military benefits and SCRA protections',
    icon: TrendingDown,
    color: 'bg-red-600',
    gradient: 'from-red-600 to-red-800',
    missions: [
      'debt-assessment',
      'scra-benefits',
      'debt-avalanche',
      'debt-snowball',
      'credit-score-basics',
      'debt-consolidation'
    ],
    estimatedTotalTime: '2.5 hours',
    totalXP: 1050,
    difficulty: 'Standard',
    badge: {
      title: 'Debt Destroyer',
      description: 'Completed comprehensive debt elimination training',
      icon: '⚡'
    }
  },
  
  // ============================================================================
  // TACTICAL DIFFICULTY OPERATIONS (Intermediate - 57 missions)
  // ============================================================================
  
  'investment-operations': {
    id: 'investment-operations',
    title: 'Investment Operations',
    description: 'Master investment strategies to build long-term wealth',
    icon: TrendingUp,
    color: 'bg-emerald-600',
    gradient: 'from-emerald-600 to-emerald-800',
    missions: [
      'investment-basics',
      'stocks-fundamentals',
      'asset-allocation',
      'bonds-fixed-income',
      'market-analysis',
      'commodities-trading'
    ],
    estimatedTotalTime: '4-5 hours',
    totalXP: 1900,
    difficulty: 'Tactical',
    badge: {
      title: 'Investment Specialist',
      description: 'Mastered investment strategies and market analysis',
      icon: '📈'
    }
  },
  
  'real-estate-housing': {
    id: 'real-estate-housing',
    title: 'Real Estate & Housing Operation',
    description: 'Navigate military housing, VA loans, and real estate investment',
    icon: Home,
    color: 'bg-orange-600',
    gradient: 'from-orange-600 to-orange-800',
    missions: [
      'va-loan-basics',
      'bah-optimization',
      'rent-vs-buy',
      'pcs-housing-strategy',
      'investment-property-basics',
      'rental-property-management',
      'real-estate-market-analysis',
      'home-buying-process',
      'mortgage-optimization',
      'property-tax-strategies',
      'home-equity-strategies',
      'real-estate-passive-income'
    ],
    estimatedTotalTime: '5-6 hours',
    totalXP: 2800,
    difficulty: 'Tactical',
    badge: {
      title: 'Real Estate Tactician',
      description: 'Mastered military housing and real estate investing',
      icon: '🏠'
    }
  },
  
  'tax-strategy': {
    id: 'tax-strategy',
    title: 'Tax Strategy Operation',
    description: 'Maximize tax benefits and military-specific deductions',
    icon: FileText,
    color: 'bg-indigo-600',
    gradient: 'from-indigo-600 to-indigo-800',
    missions: [
      'military-tax-basics',
      'state-residency-tax',
      'combat-zone-exclusion',
      'tax-advantaged-accounts',
      'deductions-credits',
      'tax-software-guide',
      'quarterly-estimated-taxes',
      'tax-loss-harvesting',
      'roth-conversion-strategy',
      'tax-efficient-investing'
    ],
    estimatedTotalTime: '4-5 hours',
    totalXP: 2300,
    difficulty: 'Tactical',
    badge: {
      title: 'Tax Strategist',
      description: 'Optimized military tax strategies',
      icon: '📋'
    }
  },
  
  'career-advancement': {
    id: 'career-advancement',
    title: 'Career Advancement Operation',
    description: 'Maximize your military career and prepare for transition',
    icon: Rocket,
    color: 'bg-purple-600',
    gradient: 'from-purple-600 to-purple-800',
    missions: [
      'promotion-financial-planning',
      'skill-certification-roi',
      'education-benefits-strategy',
      'gi-bill-optimization',
      'transition-planning',
      'resume-building',
      'networking-strategy',
      'civilian-career-research'
    ],
    estimatedTotalTime: '3.5 hours',
    totalXP: 1800,
    difficulty: 'Tactical',
    badge: {
      title: 'Career Strategist',
      description: 'Optimized career advancement and transition planning',
      icon: '🚀'
    }
  },
  
  'family-security': {
    id: 'family-security',
    title: 'Family Security Operation',
    description: 'Protect and provide for your military family\'s financial future',
    icon: HeartHandshake,
    color: 'bg-pink-600',
    gradient: 'from-pink-600 to-pink-800',
    missions: [
      'family-budget-planning',
      'spouse-career-support',
      'childcare-costs',
      'education-savings-529',
      'family-emergency-fund',
      'deployment-financial-prep',
      'survivor-benefits-plan',
      'family-insurance-needs',
      'special-needs-planning',
      'multi-generational-support'
    ],
    estimatedTotalTime: '4-5 hours',
    totalXP: 2200,
    difficulty: 'Tactical',
    badge: {
      title: 'Family Guardian',
      description: 'Secured your family\'s financial well-being',
      icon: '❤️'
    }
  },
  
  'insurance-protection': {
    id: 'insurance-protection',
    title: 'Insurance & Protection Operation',
    description: 'Comprehensive coverage strategy for service members',
    icon: ShieldCheck,
    color: 'bg-cyan-600',
    gradient: 'from-cyan-600 to-cyan-800',
    missions: [
      'sgli-analysis',
      'life-insurance-needs',
      'disability-insurance',
      'auto-insurance-military',
      'renters-homeowners-insurance',
      'umbrella-policy-guide',
      'identity-theft-protection'
    ],
    estimatedTotalTime: '3 hours',
    totalXP: 1500,
    difficulty: 'Tactical',
    badge: {
      title: 'Protection Specialist',
      description: 'Mastered comprehensive insurance strategy',
      icon: '🛡️'
    }
  },
  
  // ============================================================================
  // STRATEGIC DIFFICULTY OPERATIONS (Advanced - 25 missions)
  // ============================================================================
  
  'retirement-operations': {
    id: 'retirement-operations',
    title: 'Retirement Operations',
    description: 'Plan and optimize your military retirement and long-term security',
    icon: Target,
    color: 'bg-violet-600',
    gradient: 'from-violet-600 to-violet-800',
    missions: [
      'retirement-planning',
      'tsp-optimization',
      'va-benefits'
    ],
    estimatedTotalTime: '2-3 hours',
    totalXP: 900,
    difficulty: 'Strategic',
    badge: {
      title: 'Retirement Strategist',
      description: 'Completed comprehensive retirement planning',
      icon: '🎯'
    }
  },
  
  'estate-planning': {
    id: 'estate-planning',
    title: 'Estate Planning Operation',
    description: 'Legacy planning and wealth transfer for military families',
    icon: Landmark,
    color: 'bg-amber-600',
    gradient: 'from-amber-600 to-amber-800',
    missions: [
      'will-creation-basics',
      'trust-fundamentals',
      'power-of-attorney',
      'healthcare-directives',
      'beneficiary-designation',
      'estate-tax-planning',
      'charitable-giving',
      'digital-asset-planning',
      'military-benefits-survivors'
    ],
    estimatedTotalTime: '4-5 hours',
    totalXP: 2400,
    difficulty: 'Strategic',
    badge: {
      title: 'Estate Planner',
      description: 'Completed comprehensive estate planning',
      icon: '🏛️'
    }
  },
  
  'business-side-hustles': {
    id: 'business-side-hustles',
    title: 'Business & Side Hustle Operation',
    description: 'Build additional income streams and entrepreneurship',
    icon: Briefcase,
    color: 'bg-teal-600',
    gradient: 'from-teal-600 to-teal-800',
    missions: [
      'side-hustle-ideas',
      'business-entity-selection',
      'military-spouse-business',
      'online-business-basics',
      'passive-income-streams',
      'franchise-opportunities',
      'business-tax-strategy',
      'scaling-your-business',
      'military-entrepreneurship',
      'business-financing',
      'exit-strategy-planning'
    ],
    estimatedTotalTime: '5-6 hours',
    totalXP: 2900,
    difficulty: 'Strategic',
    badge: {
      title: 'Entrepreneur',
      description: 'Mastered business and side income strategies',
      icon: '💼'
    }
  },
  
  'advanced-wealth-building': {
    id: 'advanced-wealth-building',
    title: 'Advanced Wealth Building Operation',
    description: 'Elite strategies for building generational wealth',
    icon: BadgeDollarSign,
    color: 'bg-yellow-600',
    gradient: 'from-yellow-600 to-yellow-800',
    missions: [
      'alternative-investments',
      'private-equity-basics',
      'cryptocurrency-strategy',
      'international-investing',
      'advanced-portfolio-management',
      'wealth-preservation'
    ],
    estimatedTotalTime: '3-4 hours',
    totalXP: 2100,
    difficulty: 'Strategic',
    badge: {
      title: 'Wealth Master',
      description: 'Mastered advanced wealth building strategies',
      icon: '💎'
    }
  }
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getOperationProgress(operationId: string, completedMissions: string[]): number {
  const operation = OPERATIONS[operationId];
  if (!operation || operation.missions.length === 0) return 0;
  
  const completed = operation.missions.filter(missionId => 
    completedMissions.includes(missionId)
  ).length;
  
  return Math.round((completed / operation.missions.length) * 100);
}

export function getOperationEarnedXP(operationId: string, completedMissions: string[], missions: Mission[]): number {
  const operation = OPERATIONS[operationId];
  if (!operation) return 0;
  
  return operation.missions.reduce((total, missionId) => {
    if (completedMissions.includes(missionId)) {
      const mission = missions.find(m => m.id === missionId);
      return total + (mission?.xpReward || 0);
    }
    return total;
  }, 0);
}

export function isOperationComplete(operationId: string, completedMissions: string[]): boolean {
  const operation = OPERATIONS[operationId];
  if (!operation || operation.missions.length === 0) return false;
  
  return operation.missions.every(missionId => completedMissions.includes(missionId));
}

export function getActiveOperations(): Operation[] {
  return Object.values(OPERATIONS).filter(op => op.missions.length > 0);
}

export function getOperationForMission(missionId: string): Operation | undefined {
  return Object.values(OPERATIONS).find(op => 
    op.missions.includes(missionId)
  );
}

export function getMissionsByOperation(operationId: string): string[] {
  return OPERATIONS[operationId]?.missions || [];
}

export function getTotalMissionsCount(): number {
  return Object.values(OPERATIONS).reduce((total, op) => total + op.missions.length, 0);
}

export function getTotalPossibleXP(): number {
  return Object.values(OPERATIONS).reduce((total, op) => total + op.totalXP, 0);
}

// ============================================================================
// DIFFICULTY METADATA
// ============================================================================

export const DIFFICULTY_INFO = {
  'Standard': {
    label: 'Standard Ops',
    icon: '⚡',
    color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    description: 'Foundational operations for all service members'
  },
  'Tactical': {
    label: 'Tactical Ops',
    icon: '🎯',
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    description: 'Intermediate operations requiring financial knowledge'
  },
  'Strategic': {
    label: 'Strategic Ops',
    icon: '📊',
    color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    description: 'Advanced operations for long-term planning'
  },
  'Advanced': {
    label: 'Advanced Ops',
    icon: '🔥',
    color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    description: 'Expert-level operations for comprehensive mastery'
  }
};

// ============================================================================
// STATUS INDICATORS
// ============================================================================

export const STATUS_INFO = {
  completed: {
    label: 'Complete',
    icon: '✅',
    color: 'text-green-600 dark:text-green-400'
  },
  'in-progress': {
    label: 'In Progress',
    icon: '🔄',
    color: 'text-blue-600 dark:text-blue-400'
  },
  available: {
    label: 'Available',
    icon: '⭕',
    color: 'text-gray-600 dark:text-gray-400'
  },
  locked: {
    label: 'Locked',
    icon: '🔒',
    color: 'text-gray-400 dark:text-gray-600'
  },
  featured: {
    label: 'Featured',
    icon: '⭐',
    color: 'text-yellow-600 dark:text-yellow-400'
  }
};
