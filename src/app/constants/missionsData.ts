/**
 * Complete Missions Data - 100 Missions
 * Organized across 13 Operations
 * Designed by Content AI, Marketing, UX, and Dev agents
 * 
 * UNLOCK STRUCTURE:
 * - Start: 25 missions unlocked
 * - 5 missions: +10 more unlocked (35 total)
 * - 10 missions: +10 more unlocked (45 total)
 * - 15 missions: +10 more unlocked (55 total)
 * - 20 missions: +5 more unlocked (60 total)
 * - 25 missions: +10 more unlocked (70 total)
 * - 30 missions: +10 more unlocked (80 total)
 * - 40 missions: +5 more unlocked (85 total)
 * - 50 missions: +10 more unlocked (95 total)
 * - 60 missions: +5 final missions (100 total)
 */

import { 
  Target, 
  TrendingUp, 
  Shield, 
  PiggyBank, 
  BookOpen,
  Calculator,
  CreditCard,
  Building,
  GraduationCap,
  Heart,
  Briefcase,
  Brain,
  DollarSign,
  Home,
  BarChart3,
  PieChart,
  Coins,
  TrendingDown,
  FileText,
  Users,
  Wallet,
  Lock,
  Unlock,
  Key,
  Map,
  Trophy,
  Star,
  Zap,
  Sparkles,
  CheckCircle,
  ClipboardList,
  Award,
  Lightbulb,
  Rocket,
  Package,
  Globe,
  Smartphone,
  Car,
  Baby,
  GraduationCap as Grad,
  HeartHandshake,
  ShieldCheck,
  FileCheck,
  Landmark,
  Store,
  LineChart,
  TrendingUpDown,
  type LucideIcon
} from 'lucide-react';
import type { Mission } from './operations';

// ============================================================================
// ALL 100 MISSIONS
// ============================================================================

export const MISSIONS_DATA: Mission[] = [
  // ============================================================================
  // UNLOCKED AT START (25 missions)
  // ============================================================================
  
  // FINANCIAL READINESS OPERATION (4 missions - Standard) - ALL UNLOCKED
  
  {
    id: 'emergency-fund',
    title: 'Emergency Fund Mission',
    description: 'Build a solid financial foundation with emergency savings',
    icon: Shield,
    operationId: 'financial-readiness',
    xpReward: 200,
    difficulty: 'Standard',
    estimatedTime: '10 min',
    category: 'Safety Net',
    objectives: []
  },
  
  {
    id: 'budget-planning',
    title: 'Budget Planning Mission',
    description: 'Master military-optimized budgeting with the 50/30/20 rule',
    icon: Calculator,
    operationId: 'financial-readiness',
    xpReward: 250,
    difficulty: 'Standard',
    estimatedTime: '15 min',
    category: 'Planning',
    objectives: []
  },
  
  {
    id: 'financial-education',
    title: 'Financial Education Mission',
    description: 'Comprehensive financial literacy for military life',
    icon: BookOpen,
    operationId: 'financial-readiness',
    xpReward: 300,
    difficulty: 'Standard',
    estimatedTime: '45 min',
    featured: true,
    category: 'Education',
    objectives: []
  },
  
  {
    id: 'debt-management',
    title: 'Debt Management Mission',
    description: 'Strategic debt elimination using military-specific benefits',
    icon: CreditCard,
    operationId: 'financial-readiness',
    xpReward: 150,
    difficulty: 'Standard',
    estimatedTime: '20 min',
    category: 'Debt Strategy',
    objectives: []
  },

  // BUDGET MASTERY OPERATION (8 missions - Standard) - ALL UNLOCKED
  
  {
    id: 'budget-basics',
    title: 'Budgeting Fundamentals',
    description: 'Learn the core principles of effective budgeting',
    icon: Calculator,
    operationId: 'budget-mastery',
    xpReward: 150,
    difficulty: 'Standard',
    estimatedTime: '15 min',
    category: 'Basics'
  },
  
  {
    id: 'military-pay-breakdown',
    title: 'Military Pay Breakdown',
    description: 'Understand base pay, allowances, and special pays',
    icon: DollarSign,
    operationId: 'budget-mastery',
    xpReward: 175,
    difficulty: 'Standard',
    estimatedTime: '20 min',
    category: 'Income'
  },
  
  {
    id: 'allowances-optimization',
    title: 'Allowances Optimization',
    description: 'Maximize BAH, BAS, and other military allowances',
    icon: Wallet,
    operationId: 'budget-mastery',
    xpReward: 200,
    difficulty: 'Standard',
    estimatedTime: '25 min',
    category: 'Optimization'
  },
  
  {
    id: 'expense-tracking',
    title: 'Expense Tracking Mastery',
    description: 'Track and categorize your spending effectively',
    icon: ClipboardList,
    operationId: 'budget-mastery',
    xpReward: 175,
    difficulty: 'Standard',
    estimatedTime: '20 min',
    category: 'Tracking'
  },
  
  {
    id: 'savings-automation',
    title: 'Savings Automation',
    description: 'Set up automatic transfers to build wealth effortlessly',
    icon: Zap,
    operationId: 'budget-mastery',
    xpReward: 200,
    difficulty: 'Standard',
    estimatedTime: '15 min',
    category: 'Automation'
  },
  
  {
    id: 'budget-50-30-20',
    title: '50/30/20 Budget Method',
    description: 'Implement the popular 50/30/20 budgeting framework',
    icon: PieChart,
    operationId: 'budget-mastery',
    xpReward: 175,
    difficulty: 'Standard',
    estimatedTime: '20 min',
    category: 'Methods'
  },
  
  {
    id: 'zero-based-budget',
    title: 'Zero-Based Budgeting',
    description: 'Give every dollar a job with zero-based budgeting',
    icon: Target,
    operationId: 'budget-mastery',
    xpReward: 200,
    difficulty: 'Standard',
    estimatedTime: '25 min',
    category: 'Methods'
  },
  
  {
    id: 'budget-apps-tools',
    title: 'Budget Apps & Tools',
    description: 'Find the best budgeting apps for military families',
    icon: Smartphone,
    operationId: 'budget-mastery',
    xpReward: 125,
    difficulty: 'Standard',
    estimatedTime: '15 min',
    category: 'Tools'
  },

  // DEBT ELIMINATION OPERATION (6 missions - Standard) - ALL UNLOCKED
  
  {
    id: 'debt-assessment',
    title: 'Debt Assessment',
    description: 'Calculate your total debt and create a payoff plan',
    icon: ClipboardList,
    operationId: 'debt-elimination',
    xpReward: 175,
    difficulty: 'Standard',
    estimatedTime: '20 min',
    category: 'Assessment'
  },
  
  {
    id: 'scra-benefits',
    title: 'SCRA Benefits',
    description: 'Leverage Servicemembers Civil Relief Act for debt reduction',
    icon: Shield,
    operationId: 'debt-elimination',
    xpReward: 200,
    difficulty: 'Standard',
    estimatedTime: '25 min',
    featured: true,
    category: 'Military Benefits'
  },
  
  {
    id: 'debt-avalanche',
    title: 'Debt Avalanche Method',
    description: 'Pay off high-interest debt first to save money',
    icon: TrendingDown,
    operationId: 'debt-elimination',
    xpReward: 175,
    difficulty: 'Standard',
    estimatedTime: '20 min',
    category: 'Strategy'
  },
  
  {
    id: 'debt-snowball',
    title: 'Debt Snowball Method',
    description: 'Build momentum by paying off smallest debts first',
    icon: Sparkles,
    operationId: 'debt-elimination',
    xpReward: 175,
    difficulty: 'Standard',
    estimatedTime: '20 min',
    category: 'Strategy'
  },
  
  {
    id: 'credit-score-basics',
    title: 'Credit Score Fundamentals',
    description: 'Understand and improve your credit score',
    icon: TrendingUp,
    operationId: 'debt-elimination',
    xpReward: 200,
    difficulty: 'Standard',
    estimatedTime: '25 min',
    category: 'Credit'
  },
  
  {
    id: 'debt-consolidation',
    title: 'Debt Consolidation',
    description: 'Evaluate consolidation options and strategies',
    icon: Package,
    operationId: 'debt-elimination',
    xpReward: 125,
    difficulty: 'Standard',
    estimatedTime: '15 min',
    category: 'Strategy'
  },

  // INVESTMENT OPERATIONS (3 of 6 missions - Tactical) - STARTER MISSIONS UNLOCKED
  
  {
    id: 'investment-basics',
    title: 'Investment Training Mission',
    description: 'Learn the fundamentals of military-friendly investments',
    icon: TrendingUp,
    operationId: 'investment-operations',
    xpReward: 250,
    difficulty: 'Tactical',
    estimatedTime: '20 min',
    category: 'Investing'
  },
  
  {
    id: 'stocks-fundamentals',
    title: 'Stock Market Fundamentals',
    description: 'Master stock market basics and equity investing strategies',
    icon: BarChart3,
    operationId: 'investment-operations',
    xpReward: 300,
    difficulty: 'Tactical',
    estimatedTime: '25 min',
    category: 'Investing'
  },
  
  {
    id: 'bonds-fixed-income',
    title: 'Bonds & Fixed Income',
    description: 'Understand bonds, treasury securities, and stable income',
    icon: Building,
    operationId: 'investment-operations',
    xpReward: 300,
    difficulty: 'Tactical',
    estimatedTime: '25 min',
    category: 'Investing'
  },
  
  // REAL ESTATE & HOUSING OPERATION (2 of 12 missions) - STARTER MISSIONS UNLOCKED
  
  {
    id: 'va-loan-basics',
    title: 'VA Loan Fundamentals',
    description: 'Master VA home loan benefits and qualifications',
    icon: Home,
    operationId: 'real-estate-housing',
    xpReward: 250,
    difficulty: 'Tactical',
    estimatedTime: '25 min',
    featured: true,
    category: 'Military Benefits'
  },
  
  {
    id: 'bah-optimization',
    title: 'BAH Optimization',
    description: 'Maximize your Basic Allowance for Housing',
    icon: DollarSign,
    operationId: 'real-estate-housing',
    xpReward: 200,
    difficulty: 'Tactical',
    estimatedTime: '20 min',
    category: 'Military Benefits'
  },

  // TAX STRATEGY OPERATION (2 of 10 missions) - STARTER MISSIONS UNLOCKED
  
  {
    id: 'military-tax-basics',
    title: 'Military Tax Basics',
    description: 'Understand military-specific tax rules and benefits',
    icon: FileText,
    operationId: 'tax-strategy',
    xpReward: 200,
    difficulty: 'Tactical',
    estimatedTime: '25 min',
    featured: true,
    category: 'Basics'
  },
  
  {
    id: 'state-residency-tax',
    title: 'State Residency & Tax',
    description: 'Optimize state tax residency for maximum savings',
    icon: Map,
    operationId: 'tax-strategy',
    xpReward: 250,
    difficulty: 'Tactical',
    estimatedTime: '30 min',
    category: 'State Tax'
  },

  // ============================================================================
  // UNLOCK AT 5 MISSIONS (10 more missions - Total: 35)
  // ============================================================================
  
  // INVESTMENT OPERATIONS (3 more)
  
  {
    id: 'asset-allocation',
    title: 'Asset Allocation Strategy',
    description: 'Build a diversified portfolio tailored to military career',
    icon: PieChart,
    operationId: 'investment-operations',
    xpReward: 350,
    difficulty: 'Tactical',
    estimatedTime: '30 min',
    featured: true,
    category: 'Investing',
    unlockRequirement: {
      type: 'missions',
      value: 5
    }
  },
  
  {
    id: 'market-analysis',
    title: 'Market Analysis Techniques',
    description: 'Learn to analyze market trends and make informed decisions',
    icon: LineChart,
    operationId: 'investment-operations',
    xpReward: 400,
    difficulty: 'Tactical',
    estimatedTime: '35 min',
    category: 'Investing',
    unlockRequirement: {
      type: 'missions',
      value: 5
    }
  },
  
  {
    id: 'commodities-trading',
    title: 'Commodities Trading Basics',
    description: 'Introduction to commodities, gold, and alternative investments',
    icon: Coins,
    operationId: 'investment-operations',
    xpReward: 300,
    difficulty: 'Tactical',
    estimatedTime: '30 min',
    category: 'Investing',
    unlockRequirement: {
      type: 'missions',
      value: 5
    }
  },

  // REAL ESTATE & HOUSING (4 more)
  
  {
    id: 'rent-vs-buy',
    title: 'Rent vs Buy Analysis',
    description: 'Make informed housing decisions for your situation',
    icon: Calculator,
    operationId: 'real-estate-housing',
    xpReward: 225,
    difficulty: 'Tactical',
    estimatedTime: '25 min',
    category: 'Analysis',
    unlockRequirement: {
      type: 'missions',
      value: 5
    }
  },
  
  {
    id: 'pcs-housing-strategy',
    title: 'PCS Housing Strategy',
    description: 'Navigate housing during Permanent Change of Station',
    icon: Map,
    operationId: 'real-estate-housing',
    xpReward: 250,
    difficulty: 'Tactical',
    estimatedTime: '30 min',
    category: 'Military Life',
    unlockRequirement: {
      type: 'missions',
      value: 5
    }
  },
  
  {
    id: 'home-buying-process',
    title: 'Home Buying Process',
    description: 'Navigate the complete home purchase journey',
    icon: CheckCircle,
    operationId: 'real-estate-housing',
    xpReward: 225,
    difficulty: 'Tactical',
    estimatedTime: '30 min',
    category: 'Home Ownership',
    unlockRequirement: {
      type: 'missions',
      value: 5
    }
  },
  
  {
    id: 'mortgage-optimization',
    title: 'Mortgage Optimization',
    description: 'Refinance and optimize your mortgage terms',
    icon: TrendingDown,
    operationId: 'real-estate-housing',
    xpReward: 200,
    difficulty: 'Tactical',
    estimatedTime: '20 min',
    category: 'Home Ownership',
    unlockRequirement: {
      type: 'missions',
      value: 5
    }
  },

  // TAX STRATEGY (3 more)
  
  {
    id: 'combat-zone-exclusion',
    title: 'Combat Zone Tax Exclusion',
    description: 'Maximize tax-free combat zone income benefits',
    icon: Shield,
    operationId: 'tax-strategy',
    xpReward: 225,
    difficulty: 'Tactical',
    estimatedTime: '20 min',
    category: 'Military Benefits',
    unlockRequirement: {
      type: 'missions',
      value: 5
    }
  },
  
  {
    id: 'tax-advantaged-accounts',
    title: 'Tax-Advantaged Accounts',
    description: 'Utilize TSP, IRAs, and HSAs for tax efficiency',
    icon: PiggyBank,
    operationId: 'tax-strategy',
    xpReward: 275,
    difficulty: 'Tactical',
    estimatedTime: '30 min',
    category: 'Accounts',
    unlockRequirement: {
      type: 'missions',
      value: 5
    }
  },
  
  {
    id: 'deductions-credits',
    title: 'Deductions & Credits',
    description: 'Claim all military-specific deductions and credits',
    icon: Award,
    operationId: 'tax-strategy',
    xpReward: 250,
    difficulty: 'Tactical',
    estimatedTime: '30 min',
    category: 'Tax Savings',
    unlockRequirement: {
      type: 'missions',
      value: 5
    }
  },

  // ============================================================================
  // UNLOCK AT 10 MISSIONS (10 more missions - Total: 45)
  // ============================================================================
  
  // REAL ESTATE & HOUSING (3 more)
  
  {
    id: 'investment-property-basics',
    title: 'Investment Property Basics',
    description: 'Start your real estate investment journey',
    icon: Building,
    operationId: 'real-estate-housing',
    xpReward: 275,
    difficulty: 'Tactical',
    estimatedTime: '30 min',
    category: 'Real Estate Investing',
    unlockRequirement: {
      type: 'missions',
      value: 10
    }
  },
  
  {
    id: 'property-tax-strategies',
    title: 'Property Tax Strategies',
    description: 'Minimize property taxes and maximize deductions',
    icon: FileText,
    operationId: 'real-estate-housing',
    xpReward: 225,
    difficulty: 'Tactical',
    estimatedTime: '25 min',
    category: 'Tax Strategy',
    unlockRequirement: {
      type: 'missions',
      value: 10
    }
  },
  
  {
    id: 'home-equity-strategies',
    title: 'Home Equity Strategies',
    description: 'Leverage home equity for wealth building',
    icon: TrendingUp,
    operationId: 'real-estate-housing',
    xpReward: 250,
    difficulty: 'Tactical',
    estimatedTime: '25 min',
    category: 'Home Ownership',
    unlockRequirement: {
      type: 'missions',
      value: 10
    }
  },

  // TAX STRATEGY (4 more)
  
  {
    id: 'tax-software-guide',
    title: 'Tax Software Guide',
    description: 'Choose and use tax software effectively',
    icon: Smartphone,
    operationId: 'tax-strategy',
    xpReward: 150,
    difficulty: 'Tactical',
    estimatedTime: '15 min',
    category: 'Tools',
    unlockRequirement: {
      type: 'missions',
      value: 10
    }
  },
  
  {
    id: 'quarterly-estimated-taxes',
    title: 'Quarterly Estimated Taxes',
    description: 'Manage quarterly taxes for side income',
    icon: Calculator,
    operationId: 'tax-strategy',
    xpReward: 200,
    difficulty: 'Tactical',
    estimatedTime: '20 min',
    category: 'Tax Planning',
    unlockRequirement: {
      type: 'missions',
      value: 10
    }
  },
  
  {
    id: 'tax-loss-harvesting',
    title: 'Tax Loss Harvesting',
    description: 'Reduce taxes through strategic investment losses',
    icon: TrendingDown,
    operationId: 'tax-strategy',
    xpReward: 275,
    difficulty: 'Tactical',
    estimatedTime: '25 min',
    category: 'Investment Tax',
    unlockRequirement: {
      type: 'missions',
      value: 10
    }
  },
  
  {
    id: 'roth-conversion-strategy',
    title: 'Roth Conversion Strategy',
    description: 'Time Roth conversions for maximum tax benefit',
    icon: Zap,
    operationId: 'tax-strategy',
    xpReward: 250,
    difficulty: 'Tactical',
    estimatedTime: '25 min',
    category: 'Retirement Tax',
    unlockRequirement: {
      type: 'missions',
      value: 10
    }
  },

  // CAREER ADVANCEMENT OPERATION (3 of 8 missions)
  
  {
    id: 'promotion-financial-planning',
    title: 'Promotion Financial Planning',
    description: 'Plan finances around promotions and pay increases',
    icon: TrendingUp,
    operationId: 'career-advancement',
    xpReward: 200,
    difficulty: 'Tactical',
    estimatedTime: '20 min',
    category: 'Career',
    unlockRequirement: {
      type: 'missions',
      value: 10
    }
  },
  
  {
    id: 'skill-certification-roi',
    title: 'Skill Certification ROI',
    description: 'Calculate return on investment for certifications',
    icon: Award,
    operationId: 'career-advancement',
    xpReward: 225,
    difficulty: 'Tactical',
    estimatedTime: '25 min',
    category: 'Education',
    unlockRequirement: {
      type: 'missions',
      value: 10
    }
  },
  
  {
    id: 'education-benefits-strategy',
    title: 'Education Benefits Strategy',
    description: 'Maximize TA, GI Bill, and education benefits',
    icon: GraduationCap,
    operationId: 'career-advancement',
    xpReward: 250,
    difficulty: 'Tactical',
    estimatedTime: '30 min',
    featured: true,
    category: 'Education',
    unlockRequirement: {
      type: 'missions',
      value: 10
    }
  },

  // ============================================================================
  // UNLOCK AT 15 MISSIONS (10 more missions - Total: 55)
  // ============================================================================
  
  // REAL ESTATE & HOUSING (3 more)
  
  {
    id: 'rental-property-management',
    title: 'Rental Property Management',
    description: 'Manage rental properties during deployments',
    icon: Key,
    operationId: 'real-estate-housing',
    xpReward: 250,
    difficulty: 'Tactical',
    estimatedTime: '25 min',
    category: 'Real Estate Investing',
    unlockRequirement: {
      type: 'missions',
      value: 15
    }
  },
  
  {
    id: 'real-estate-market-analysis',
    title: 'Real Estate Market Analysis',
    description: 'Evaluate markets and find profitable opportunities',
    icon: BarChart3,
    operationId: 'real-estate-housing',
    xpReward: 300,
    difficulty: 'Tactical',
    estimatedTime: '35 min',
    category: 'Real Estate Investing',
    unlockRequirement: {
      type: 'missions',
      value: 15
    }
  },
  
  {
    id: 'real-estate-passive-income',
    title: 'Real Estate Passive Income',
    description: 'Build passive income through real estate',
    icon: DollarSign,
    operationId: 'real-estate-housing',
    xpReward: 275,
    difficulty: 'Tactical',
    estimatedTime: '30 min',
    category: 'Real Estate Investing',
    unlockRequirement: {
      type: 'missions',
      value: 15
    }
  },

  // TAX STRATEGY (1 more)
  
  {
    id: 'tax-efficient-investing',
    title: 'Tax-Efficient Investing',
    description: 'Structure investments to minimize tax liability',
    icon: LineChart,
    operationId: 'tax-strategy',
    xpReward: 225,
    difficulty: 'Tactical',
    estimatedTime: '25 min',
    category: 'Investment Tax',
    unlockRequirement: {
      type: 'missions',
      value: 15
    }
  },

  // CAREER ADVANCEMENT (3 more)
  
  {
    id: 'gi-bill-optimization',
    title: 'GI Bill Optimization',
    description: 'Get maximum value from Post-9/11 GI Bill',
    icon: BookOpen,
    operationId: 'career-advancement',
    xpReward: 275,
    difficulty: 'Tactical',
    estimatedTime: '30 min',
    category: 'Education',
    unlockRequirement: {
      type: 'missions',
      value: 15
    }
  },
  
  {
    id: 'resume-building',
    title: 'Resume Building',
    description: 'Translate military experience to civilian resumes',
    icon: FileText,
    operationId: 'career-advancement',
    xpReward: 175,
    difficulty: 'Tactical',
    estimatedTime: '25 min',
    category: 'Transition',
    unlockRequirement: {
      type: 'missions',
      value: 15
    }
  },
  
  {
    id: 'networking-strategy',
    title: 'Professional Networking',
    description: 'Build a professional network for career success',
    icon: Users,
    operationId: 'career-advancement',
    xpReward: 200,
    difficulty: 'Tactical',
    estimatedTime: '20 min',
    category: 'Career',
    unlockRequirement: {
      type: 'missions',
      value: 15
    }
  },

  // FAMILY SECURITY OPERATION (3 of 10 missions)
  
  {
    id: 'family-budget-planning',
    title: 'Family Budget Planning',
    description: 'Create a comprehensive budget for military families',
    icon: Users,
    operationId: 'family-security',
    xpReward: 200,
    difficulty: 'Tactical',
    estimatedTime: '25 min',
    category: 'Planning',
    unlockRequirement: {
      type: 'missions',
      value: 15
    }
  },
  
  {
    id: 'spouse-career-support',
    title: 'Military Spouse Career Support',
    description: 'Support spouse career development and income',
    icon: HeartHandshake,
    operationId: 'family-security',
    xpReward: 225,
    difficulty: 'Tactical',
    estimatedTime: '25 min',
    category: 'Family',
    unlockRequirement: {
      type: 'missions',
      value: 15
    }
  },
  
  {
    id: 'childcare-costs',
    title: 'Childcare Cost Management',
    description: 'Navigate military childcare options and costs',
    icon: Baby,
    operationId: 'family-security',
    xpReward: 200,
    difficulty: 'Tactical',
    estimatedTime: '20 min',
    category: 'Family',
    unlockRequirement: {
      type: 'missions',
      value: 15
    }
  },

  // ============================================================================
  // UNLOCK AT 20 MISSIONS (5 more missions - Total: 60)
  // ============================================================================
  
  // RETIREMENT OPERATIONS (3 missions - Strategic)
  
  {
    id: 'retirement-planning',
    title: 'Retirement Planning Mission',
    description: 'Plan your financial future with advanced retirement calculator',
    icon: Target,
    operationId: 'retirement-operations',
    xpReward: 300,
    difficulty: 'Strategic',
    estimatedTime: '30 min',
    featured: true,
    category: 'Planning',
    unlockRequirement: {
      type: 'missions',
      value: 20
    }
  },
  
  {
    id: 'tsp-optimization',
    title: 'TSP Optimization Mission',
    description: 'Maximize your Thrift Savings Plan contributions and growth',
    icon: PiggyBank,
    operationId: 'retirement-operations',
    xpReward: 350,
    difficulty: 'Strategic',
    estimatedTime: '35 min',
    category: 'Retirement',
    unlockRequirement: {
      type: 'missions',
      value: 20
    }
  },
  
  {
    id: 'va-benefits',
    title: 'VA Benefits Optimization',
    description: 'Maximize your veterans benefits and healthcare',
    icon: Heart,
    operationId: 'retirement-operations',
    xpReward: 250,
    difficulty: 'Strategic',
    estimatedTime: '25 min',
    category: 'Benefits',
    unlockRequirement: {
      type: 'missions',
      value: 20
    }
  },

  // CAREER ADVANCEMENT (2 more)
  
  {
    id: 'transition-planning',
    title: 'Military Transition Planning',
    description: 'Financial planning for military-to-civilian transition',
    icon: Rocket,
    operationId: 'career-advancement',
    xpReward: 300,
    difficulty: 'Tactical',
    estimatedTime: '35 min',
    category: 'Transition',
    unlockRequirement: {
      type: 'missions',
      value: 20
    }
  },
  
  {
    id: 'civilian-career-research',
    title: 'Civilian Career Research',
    description: 'Research and evaluate civilian career opportunities',
    icon: Briefcase,
    operationId: 'career-advancement',
    xpReward: 175,
    difficulty: 'Tactical',
    estimatedTime: '20 min',
    category: 'Transition',
    unlockRequirement: {
      type: 'missions',
      value: 20
    }
  },

  // ============================================================================
  // UNLOCK AT 25 MISSIONS (10 more missions - Total: 70)
  // ============================================================================
  
  // FAMILY SECURITY (4 more)
  
  {
    id: 'education-savings-529',
    title: '529 College Savings Plans',
    description: 'Save for children\'s education with 529 plans',
    icon: GraduationCap,
    operationId: 'family-security',
    xpReward: 250,
    difficulty: 'Tactical',
    estimatedTime: '30 min',
    category: 'Education',
    unlockRequirement: {
      type: 'missions',
      value: 25
    }
  },
  
  {
    id: 'family-emergency-fund',
    title: 'Family Emergency Fund',
    description: 'Build emergency savings for family needs',
    icon: Shield,
    operationId: 'family-security',
    xpReward: 225,
    difficulty: 'Tactical',
    estimatedTime: '20 min',
    category: 'Safety Net',
    unlockRequirement: {
      type: 'missions',
      value: 25
    }
  },
  
  {
    id: 'deployment-financial-prep',
    title: 'Deployment Financial Prep',
    description: 'Prepare finances before deployment',
    icon: Map,
    operationId: 'family-security',
    xpReward: 275,
    difficulty: 'Tactical',
    estimatedTime: '30 min',
    featured: true,
    category: 'Military Life',
    unlockRequirement: {
      type: 'missions',
      value: 25
    }
  },
  
  {
    id: 'survivor-benefits-plan',
    title: 'Survivor Benefits Plan',
    description: 'Understand and optimize SBP for family protection',
    icon: Heart,
    operationId: 'family-security',
    xpReward: 250,
    difficulty: 'Tactical',
    estimatedTime: '25 min',
    category: 'Protection',
    unlockRequirement: {
      type: 'missions',
      value: 25
    }
  },

  // INSURANCE & PROTECTION OPERATION (6 of 7 missions)
  
  {
    id: 'sgli-analysis',
    title: 'SGLI Coverage Analysis',
    description: 'Optimize Servicemembers Group Life Insurance',
    icon: Shield,
    operationId: 'insurance-protection',
    xpReward: 200,
    difficulty: 'Tactical',
    estimatedTime: '20 min',
    featured: true,
    category: 'Life Insurance',
    unlockRequirement: {
      type: 'missions',
      value: 25
    }
  },
  
  {
    id: 'life-insurance-needs',
    title: 'Life Insurance Needs Analysis',
    description: 'Calculate appropriate life insurance coverage',
    icon: Heart,
    operationId: 'insurance-protection',
    xpReward: 250,
    difficulty: 'Tactical',
    estimatedTime: '30 min',
    category: 'Life Insurance',
    unlockRequirement: {
      type: 'missions',
      value: 25
    }
  },
  
  {
    id: 'disability-insurance',
    title: 'Disability Insurance',
    description: 'Protect income with disability coverage',
    icon: ShieldCheck,
    operationId: 'insurance-protection',
    xpReward: 225,
    difficulty: 'Tactical',
    estimatedTime: '25 min',
    category: 'Protection',
    unlockRequirement: {
      type: 'missions',
      value: 25
    }
  },
  
  {
    id: 'auto-insurance-military',
    title: 'Auto Insurance for Military',
    description: 'Get best rates on military auto insurance',
    icon: Car,
    operationId: 'insurance-protection',
    xpReward: 175,
    difficulty: 'Tactical',
    estimatedTime: '20 min',
    category: 'Property Insurance',
    unlockRequirement: {
      type: 'missions',
      value: 25
    }
  },
  
  {
    id: 'renters-homeowners-insurance',
    title: 'Renters & Homeowners Insurance',
    description: 'Protect your property and belongings',
    icon: Home,
    operationId: 'insurance-protection',
    xpReward: 200,
    difficulty: 'Tactical',
    estimatedTime: '20 min',
    category: 'Property Insurance',
    unlockRequirement: {
      type: 'missions',
      value: 25
    }
  },
  
  {
    id: 'umbrella-policy-guide',
    title: 'Umbrella Policy Guide',
    description: 'Add extra liability protection with umbrella policies',
    icon: Shield,
    operationId: 'insurance-protection',
    xpReward: 225,
    difficulty: 'Tactical',
    estimatedTime: '25 min',
    category: 'Liability Insurance',
    unlockRequirement: {
      type: 'missions',
      value: 25
    }
  },

  // ============================================================================
  // UNLOCK AT 30 MISSIONS (10 more missions - Total: 80)
  // ============================================================================
  
  // FAMILY SECURITY (3 more)
  
  {
    id: 'family-insurance-needs',
    title: 'Family Insurance Needs',
    description: 'Comprehensive insurance planning for families',
    icon: ShieldCheck,
    operationId: 'family-security',
    xpReward: 225,
    difficulty: 'Tactical',
    estimatedTime: '25 min',
    category: 'Protection',
    unlockRequirement: {
      type: 'missions',
      value: 30
    }
  },
  
  {
    id: 'special-needs-planning',
    title: 'Special Needs Planning',
    description: 'Financial planning for special needs dependents',
    icon: Heart,
    operationId: 'family-security',
    xpReward: 300,
    difficulty: 'Tactical',
    estimatedTime: '35 min',
    category: 'Family',
    unlockRequirement: {
      type: 'missions',
      value: 30
    }
  },
  
  {
    id: 'multi-generational-support',
    title: 'Multi-Generational Support',
    description: 'Balance supporting parents and children financially',
    icon: Users,
    operationId: 'family-security',
    xpReward: 250,
    difficulty: 'Tactical',
    estimatedTime: '30 min',
    category: 'Family',
    unlockRequirement: {
      type: 'missions',
      value: 30
    }
  },

  // INSURANCE & PROTECTION (1 more)
  
  {
    id: 'identity-theft-protection',
    title: 'Identity Theft Protection',
    description: 'Protect yourself from identity theft and fraud',
    icon: Lock,
    operationId: 'insurance-protection',
    xpReward: 225,
    difficulty: 'Tactical',
    estimatedTime: '20 min',
    category: 'Security',
    unlockRequirement: {
      type: 'missions',
      value: 30
    }
  },

  // BUSINESS & SIDE HUSTLES OPERATION (6 of 11 missions)
  
  {
    id: 'side-hustle-ideas',
    title: 'Military-Friendly Side Hustles',
    description: 'Discover side income opportunities for military',
    icon: Lightbulb,
    operationId: 'business-side-hustles',
    xpReward: 225,
    difficulty: 'Strategic',
    estimatedTime: '25 min',
    category: 'Ideas',
    unlockRequirement: {
      type: 'missions',
      value: 30
    }
  },
  
  {
    id: 'business-entity-selection',
    title: 'Business Entity Selection',
    description: 'Choose the right business structure (LLC, Corp, etc)',
    icon: Building,
    operationId: 'business-side-hustles',
    xpReward: 300,
    difficulty: 'Strategic',
    estimatedTime: '35 min',
    category: 'Business Formation',
    unlockRequirement: {
      type: 'missions',
      value: 30
    }
  },
  
  {
    id: 'military-spouse-business',
    title: 'Military Spouse Business',
    description: 'Support spouse entrepreneurship and business',
    icon: HeartHandshake,
    operationId: 'business-side-hustles',
    xpReward: 250,
    difficulty: 'Strategic',
    estimatedTime: '30 min',
    featured: true,
    category: 'Spouse Business',
    unlockRequirement: {
      type: 'missions',
      value: 30
    }
  },
  
  {
    id: 'online-business-basics',
    title: 'Online Business Basics',
    description: 'Build a location-independent online business',
    icon: Globe,
    operationId: 'business-side-hustles',
    xpReward: 275,
    difficulty: 'Strategic',
    estimatedTime: '35 min',
    category: 'Online Business',
    unlockRequirement: {
      type: 'missions',
      value: 30
    }
  },
  
  {
    id: 'military-entrepreneurship',
    title: 'Military Entrepreneurship',
    description: 'Balance military service with entrepreneurship',
    icon: Rocket,
    operationId: 'business-side-hustles',
    xpReward: 275,
    difficulty: 'Strategic',
    estimatedTime: '30 min',
    category: 'Military Business',
    unlockRequirement: {
      type: 'missions',
      value: 30
    }
  },
  
  {
    id: 'business-tax-strategy',
    title: 'Business Tax Strategy',
    description: 'Optimize taxes for your business income',
    icon: Calculator,
    operationId: 'business-side-hustles',
    xpReward: 300,
    difficulty: 'Strategic',
    estimatedTime: '35 min',
    category: 'Business Tax',
    unlockRequirement: {
      type: 'missions',
      value: 30
    }
  },

  // ============================================================================
  // UNLOCK AT 40 MISSIONS (5 more missions - Total: 85)
  // ============================================================================
  
  // ESTATE PLANNING OPERATION (5 of 9 missions)
  
  {
    id: 'will-creation-basics',
    title: 'Will Creation Basics',
    description: 'Create a legally valid will for your estate',
    icon: FileCheck,
    operationId: 'estate-planning',
    xpReward: 250,
    difficulty: 'Strategic',
    estimatedTime: '30 min',
    featured: true,
    category: 'Legal Documents',
    unlockRequirement: {
      type: 'missions',
      value: 40
    }
  },
  
  {
    id: 'power-of-attorney',
    title: 'Power of Attorney',
    description: 'Establish financial and medical power of attorney',
    icon: FileText,
    operationId: 'estate-planning',
    xpReward: 250,
    difficulty: 'Strategic',
    estimatedTime: '25 min',
    category: 'Legal Documents',
    unlockRequirement: {
      type: 'missions',
      value: 40
    }
  },
  
  {
    id: 'healthcare-directives',
    title: 'Healthcare Directives',
    description: 'Create living will and healthcare directives',
    icon: Heart,
    operationId: 'estate-planning',
    xpReward: 225,
    difficulty: 'Strategic',
    estimatedTime: '20 min',
    category: 'Legal Documents',
    unlockRequirement: {
      type: 'missions',
      value: 40
    }
  },
  
  {
    id: 'beneficiary-designation',
    title: 'Beneficiary Designation',
    description: 'Properly designate beneficiaries on all accounts',
    icon: Users,
    operationId: 'estate-planning',
    xpReward: 200,
    difficulty: 'Strategic',
    estimatedTime: '20 min',
    category: 'Estate Strategy',
    unlockRequirement: {
      type: 'missions',
      value: 40
    }
  },
  
  {
    id: 'military-benefits-survivors',
    title: 'Military Survivor Benefits',
    description: 'Ensure survivors receive full military benefits',
    icon: Shield,
    operationId: 'estate-planning',
    xpReward: 275,
    difficulty: 'Strategic',
    estimatedTime: '30 min',
    category: 'Military Benefits',
    unlockRequirement: {
      type: 'missions',
      value: 40
    }
  },

  // ============================================================================
  // UNLOCK AT 50 MISSIONS (10 more missions - Total: 95)
  // ============================================================================
  
  // BUSINESS & SIDE HUSTLES (5 more)
  
  {
    id: 'passive-income-streams',
    title: 'Passive Income Streams',
    description: 'Create income that works while you serve',
    icon: DollarSign,
    operationId: 'business-side-hustles',
    xpReward: 300,
    difficulty: 'Strategic',
    estimatedTime: '35 min',
    category: 'Income',
    unlockRequirement: {
      type: 'missions',
      value: 50
    }
  },
  
  {
    id: 'franchise-opportunities',
    title: 'Franchise Opportunities',
    description: 'Evaluate franchise investments for veterans',
    icon: Store,
    operationId: 'business-side-hustles',
    xpReward: 275,
    difficulty: 'Strategic',
    estimatedTime: '30 min',
    category: 'Franchising',
    unlockRequirement: {
      type: 'missions',
      value: 50
    }
  },
  
  {
    id: 'scaling-your-business',
    title: 'Scaling Your Business',
    description: 'Grow your side hustle into a major income source',
    icon: TrendingUp,
    operationId: 'business-side-hustles',
    xpReward: 350,
    difficulty: 'Strategic',
    estimatedTime: '40 min',
    category: 'Growth',
    unlockRequirement: {
      type: 'missions',
      value: 50
    }
  },
  
  {
    id: 'business-financing',
    title: 'Business Financing',
    description: 'Fund your business with loans and investment',
    icon: DollarSign,
    operationId: 'business-side-hustles',
    xpReward: 300,
    difficulty: 'Strategic',
    estimatedTime: '35 min',
    category: 'Financing',
    unlockRequirement: {
      type: 'missions',
      value: 50
    }
  },
  
  {
    id: 'exit-strategy-planning',
    title: 'Business Exit Strategy',
    description: 'Plan for selling or transitioning your business',
    icon: Target,
    operationId: 'business-side-hustles',
    xpReward: 350,
    difficulty: 'Strategic',
    estimatedTime: '40 min',
    category: 'Exit Planning',
    unlockRequirement: {
      type: 'missions',
      value: 50
    }
  },

  // ESTATE PLANNING (4 more)
  
  {
    id: 'trust-fundamentals',
    title: 'Trust Fundamentals',
    description: 'Understand and establish trusts for estate planning',
    icon: Landmark,
    operationId: 'estate-planning',
    xpReward: 300,
    difficulty: 'Strategic',
    estimatedTime: '35 min',
    category: 'Trusts',
    unlockRequirement: {
      type: 'missions',
      value: 50
    }
  },
  
  {
    id: 'estate-tax-planning',
    title: 'Estate Tax Planning',
    description: 'Minimize estate taxes and maximize inheritance',
    icon: Calculator,
    operationId: 'estate-planning',
    xpReward: 350,
    difficulty: 'Strategic',
    estimatedTime: '40 min',
    category: 'Tax Strategy',
    unlockRequirement: {
      type: 'missions',
      value: 50
    }
  },
  
  {
    id: 'charitable-giving',
    title: 'Charitable Giving Strategy',
    description: 'Incorporate philanthropy into estate plan',
    icon: HeartHandshake,
    operationId: 'estate-planning',
    xpReward: 275,
    difficulty: 'Strategic',
    estimatedTime: '30 min',
    category: 'Giving',
    unlockRequirement: {
      type: 'missions',
      value: 50
    }
  },
  
  {
    id: 'digital-asset-planning',
    title: 'Digital Asset Planning',
    description: 'Plan for cryptocurrency and digital assets',
    icon: Smartphone,
    operationId: 'estate-planning',
    xpReward: 275,
    difficulty: 'Strategic',
    estimatedTime: '30 min',
    category: 'Modern Estate',
    unlockRequirement: {
      type: 'missions',
      value: 50
    }
  },

  // ADVANCED WEALTH BUILDING (1 mission)
  
  {
    id: 'cryptocurrency-strategy',
    title: 'Cryptocurrency Strategy',
    description: 'Navigate crypto investing safely and strategically',
    icon: Coins,
    operationId: 'advanced-wealth-building',
    xpReward: 350,
    difficulty: 'Strategic',
    estimatedTime: '35 min',
    category: 'Crypto',
    unlockRequirement: {
      type: 'missions',
      value: 50
    }
  },

  // ============================================================================
  // UNLOCK AT 60 MISSIONS (5 final missions - Total: 100)
  // ============================================================================
  
  // ADVANCED WEALTH BUILDING OPERATION (5 more - final tier)
  
  {
    id: 'alternative-investments',
    title: 'Alternative Investments',
    description: 'Explore hedge funds, private equity, and alternatives',
    icon: TrendingUpDown,
    operationId: 'advanced-wealth-building',
    xpReward: 400,
    difficulty: 'Strategic',
    estimatedTime: '45 min',
    category: 'Advanced Investing',
    unlockRequirement: {
      type: 'missions',
      value: 60
    }
  },
  
  {
    id: 'private-equity-basics',
    title: 'Private Equity Basics',
    description: 'Understand private equity and venture capital',
    icon: Briefcase,
    operationId: 'advanced-wealth-building',
    xpReward: 375,
    difficulty: 'Strategic',
    estimatedTime: '40 min',
    category: 'Advanced Investing',
    unlockRequirement: {
      type: 'missions',
      value: 60
    }
  },
  
  {
    id: 'international-investing',
    title: 'International Investing',
    description: 'Diversify globally with international investments',
    icon: Globe,
    operationId: 'advanced-wealth-building',
    xpReward: 350,
    difficulty: 'Strategic',
    estimatedTime: '35 min',
    category: 'Global Investing',
    unlockRequirement: {
      type: 'missions',
      value: 60
    }
  },
  
  {
    id: 'advanced-portfolio-management',
    title: 'Advanced Portfolio Management',
    description: 'Master sophisticated portfolio optimization',
    icon: PieChart,
    operationId: 'advanced-wealth-building',
    xpReward: 400,
    difficulty: 'Strategic',
    estimatedTime: '45 min',
    featured: true,
    category: 'Portfolio Management',
    unlockRequirement: {
      type: 'missions',
      value: 60
    }
  },
  
  {
    id: 'wealth-preservation',
    title: 'Wealth Preservation',
    description: 'Protect and preserve multi-generational wealth',
    icon: Shield,
    operationId: 'advanced-wealth-building',
    xpReward: 425,
    difficulty: 'Strategic',
    estimatedTime: '50 min',
    category: 'Wealth Protection',
    unlockRequirement: {
      type: 'missions',
      value: 60
    }
  }
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getMissionById(id: string): Mission | undefined {
  return MISSIONS_DATA.find(mission => mission.id === id);
}

export function getMissionsByOperation(operationId: string): Mission[] {
  return MISSIONS_DATA.filter(mission => mission.operationId === operationId);
}

export function getMissionStatus(
  missionId: string, 
  completedMissions: string[], 
  totalCompletedMissions: number
): 'completed' | 'in-progress' | 'available' | 'locked' {
  const mission = getMissionById(missionId);
  
  if (!mission) return 'locked';
  
  if (completedMissions.includes(missionId)) {
    return 'completed';
  }
  
  // Check unlock requirements
  if (mission.unlockRequirement) {
    if (mission.unlockRequirement.type === 'missions') {
      if (totalCompletedMissions < (mission.unlockRequirement.value as number)) {
        return 'locked';
      }
    }
    if (mission.unlockRequirement.type === 'xp') {
      // Would need XP from user data
      return 'locked';
    }
    if (mission.unlockRequirement.type === 'level') {
      // Would need level from user data
      return 'locked';
    }
  }
  
  return 'available';
}

export function getTotalXPAvailable(): number {
  return MISSIONS_DATA.reduce((total, mission) => total + mission.xpReward, 0);
}

export function getLockedMissionsCount(completedMissionsCount: number): number {
  return MISSIONS_DATA.filter(mission => {
    if (!mission.unlockRequirement) return false;
    if (mission.unlockRequirement.type === 'missions') {
      return completedMissionsCount < (mission.unlockRequirement.value as number);
    }
    return false;
  }).length;
}

export function getAvailableMissionsCount(completedMissionsCount: number): number {
  return MISSIONS_DATA.filter(mission => {
    if (!mission.unlockRequirement) return true;
    if (mission.unlockRequirement.type === 'missions') {
      return completedMissionsCount >= (mission.unlockRequirement.value as number);
    }
    return true;
  }).length;
}

export function getNextUnlockThreshold(completedMissionsCount: number): { threshold: number; count: number } | null {
  const thresholds = [5, 10, 15, 20, 25, 30, 40, 50, 60];
  
  for (const threshold of thresholds) {
    if (completedMissionsCount < threshold) {
      const missionsAtThreshold = MISSIONS_DATA.filter(mission => 
        mission.unlockRequirement?.type === 'missions' && 
        mission.unlockRequirement.value === threshold
      ).length;
      
      return { threshold, count: missionsAtThreshold };
    }
  }
  
  return null;
}
