/**
 * Demo Data Provider - Sergeant Martinez's Financial Journey
 * 
 * This file contains comprehensive demo data for Staff Sergeant Marcus Martinez,
 * showcasing a realistic military financial success story with completed missions,
 * in-progress goals, and pre-populated calculator data.
 */

export interface DemoMissionData {
  id: string;
  status: 'completed' | 'in-progress' | 'locked';
  completedDate?: string;
  startedDate?: string;
  progress?: number;
  xp: number;
  stars?: number;
  calculatorData: any;
  achievements: string[];
  impact: string;
  quote?: string;
}

export interface DemoUserProfile {
  // Personal Information
  name: string;
  rank: string;
  branch: string;
  yearsOfService: string;
  currentAge: string;
  
  // Progression
  xp: number;
  level: number;
  completedMissions: number;
  completedMissionsList?: string[];
  
  // Goals
  retirementGoal: string;
  desiredRetirementAge: string;
}

export interface DemoFinancialData {
  accounts: {
    checking: {
      institution: string;
      balance: number;
      monthlyIncome: number;
      monthlyExpenses: number;
    };
    savings: {
      institution: string;
      emergencyFund: number;
      goalFund: number;
      goalName: string;
    };
    tsp: {
      balance: number;
      monthlyContribution: number;
      governmentMatch: number;
      fundAllocation: {
        gFund: number;
        fFund: number;
        cFund: number;
        sFund: number;
        iFund: number;
      };
      projectedAt60: number;
    };
    investments: {
      institution: string;
      balance: number;
      monthlyContribution: number;
      assetAllocation: {
        stocks: number;
        bonds: number;
        cash: number;
      };
      ytdReturn: number;
    };
  };
  netWorth: {
    assets: number;
    liabilities: number;
    total: number;
  };
}

// ============================================================================
// SERGEANT MARTINEZ - USER PROFILE
// ============================================================================

export const demoUserProfile: DemoUserProfile = {
  name: 'Marcus Martinez',
  rank: 'Staff Sergeant (E-6)',
  branch: 'army',
  yearsOfService: '12',
  currentAge: '34',
  xp: 850,
  level: 2,
  completedMissions: 4,
  completedMissionsList: ['emergency-fund', 'investment-basics', 'tsp-optimization'],
  retirementGoal: 'Retire at 20 years with financial security, continue serving through civilian career in logistics, and mentor the next generation of financially savvy soldiers.',
  desiredRetirementAge: '42', // 20-year military retirement
};

// ============================================================================
// MISSION DATA
// ============================================================================

export const demoMissions: Record<string, DemoMissionData> = {
  'emergency-fund': {
    id: 'emergency-fund',
    status: 'completed',
    completedDate: '2016-03-15',
    xp: 150,
    stars: 3,
    achievements: [
      'Built 6-month emergency fund ($18,000)',
      'Maintained fund for 8+ years',
      'Zero emergency-related debt',
      'Used fund successfully during 2 deployments'
    ],
    impact: 'Having this fund gave me peace of mind during 2 deployments and a family emergency. Best financial decision I made early in my career.',
    quote: 'An emergency fund is like having backup in the field - you hope you never need it, but you\'ll be damn glad it\'s there when things go south.',
    calculatorData: {
      monthlyExpenses: 4200,
      targetMonths: 6,
      targetAmount: 25200,
      currentSavings: 18000,
      additionalGoal: 7200,
      monthlyContribution: 400,
      monthsToGoal: 18,
      percentComplete: 71.4,
      breakdown: {
        housingCosts: 1650,
        utilities: 320,
        groceries: 680,
        transportation: 420,
        insurance: 380,
        childcare: 450,
        other: 300
      }
    }
  },

  'investment-basics': {
    id: 'investment-basics',
    status: 'completed',
    completedDate: '2019-08-22',
    xp: 200,
    stars: 3,
    achievements: [
      'Opened brokerage account with Vanguard',
      'Learned asset allocation principles',
      'Set up automatic monthly investing ($300)',
      'Diversified portfolio with $45K+ balance',
      'Averaged 11.2% return since inception'
    ],
    impact: 'Started small with just $100/month. Five years later, this is a significant part of my retirement plan outside of TSP. Compound interest is real.',
    quote: 'Investing felt intimidating at first, but once I understood index funds and diversification, it became second nature. Set it and forget it.',
    calculatorData: {
      totalInvestments: 45300,
      assetAllocation: {
        stocks: 70,
        bonds: 25,
        cash: 5
      },
      holdings: [
        { name: 'Vanguard Total Stock Market', symbol: 'VTI', value: 18600, allocation: 41 },
        { name: 'Vanguard Total Bond Market', symbol: 'BND', value: 11325, allocation: 25 },
        { name: 'Vanguard Total Intl Stock', symbol: 'VXUS', value: 9030, allocation: 20 },
        { name: 'Vanguard S&P 500', symbol: 'VOO', value: 4080, allocation: 9 },
        { name: 'Cash/Money Market', value: 2265, allocation: 5 }
      ],
      performance: {
        ytdReturn: 8.4,
        oneYearReturn: 12.3,
        threeYearReturn: 9.7,
        sinceInception: 11.2
      },
      contributions: {
        monthlyContribution: 300,
        annualContribution: 3600,
        totalContributions: 38200,
        totalGains: 7100
      },
      riskProfile: {
        riskScore: 7,
        volatility: 'Medium-High',
        recommendation: 'Well-diversified for age and goals'
      }
    }
  },

  'tsp-optimization': {
    id: 'tsp-optimization',
    status: 'completed',
    completedDate: '2021-11-10',
    xp: 300,
    stars: 4,
    achievements: [
      'Maximizing 5% government match',
      'Increased contribution from 3% to 15%',
      'Optimized fund allocation (60/30/10 C/S/I)',
      'Implemented Roth conversion strategy',
      '$128K+ current balance',
      'On track for $845K at age 60'
    ],
    impact: 'Went from barely contributing to maxing the match and beyond. My retirement timeline moved up by 5 years. Absolute game changer for my family\'s future.',
    quote: 'The TSP match is free money. I was leaving thousands on the table every year by not contributing enough. Never again.',
    calculatorData: {
      basePay: 4200,
      currentContribution: 15,
      currentContributionAmount: 630,
      matchRate: 5,
      governmentMatch: 210,
      totalMonthlyContribution: 840,
      currentBalance: 128450,
      yearsToRetirement: 8,
      fundAllocation: {
        gFund: 0,
        fFund: 0,
        cFund: 60,
        sFund: 30,
        iFund: 10
      },
      projections: {
        expectedReturn: 8.2,
        projectedAt20Years: 256000,
        projectedAt60: 845000,
        monthlyIncomeAt60: 4225
      },
      rothContribution: 40,
      optimizationScore: 92,
      improvements: [
        'Consider increasing contribution to 20% if possible',
        'Review lifecycle fund for automatic rebalancing',
        'Continue current allocation - well balanced for timeline'
      ]
    }
  },

  'financial-education': {
    id: 'financial-education',
    status: 'completed',
    completedDate: '2023-09-05',
    xp: 200,
    stars: 5,
    achievements: [
      'Completed all 12 financial literacy modules',
      'Scored 95%+ on all module quizzes',
      'Created comprehensive personal financial plan',
      'Became certified Financial Literacy Mentor',
      'Currently mentoring 8 junior soldiers',
      'Leading monthly finance workshops in unit',
      'Named Unit Financial Champion 2024'
    ],
    impact: 'This knowledge changed my life and now I\'m changing lives in my unit. I\'ve helped 8 soldiers start their TSP, 3 buy their first homes, and countless others avoid predatory lending. Financial freedom is mission critical.',
    quote: 'They taught me how to lead soldiers in combat, but nobody taught me how to manage money. This program filled that gap. Now I teach both.',
    calculatorData: {
      modulesCompleted: 12,
      totalModules: 12,
      averageScore: 96.5,
      completionDate: '2023-09-05',
      certifications: [
        'Financial Literacy Mentor',
        'Unit Financial Champion 2024'
      ],
      mentorshipStats: {
        soldiersHelped: 8,
        workshopsLed: 12,
        avgImprovementScore: 78,
        testimonials: 15
      },
      modules: [
        { name: 'Budgeting Basics', score: 98, completed: true },
        { name: 'Emergency Funds', score: 100, completed: true },
        { name: 'Debt Management', score: 95, completed: true },
        { name: 'Credit Scores', score: 97, completed: true },
        { name: 'TSP & Retirement', score: 100, completed: true },
        { name: 'Investing 101', score: 94, completed: true },
        { name: 'Homeownership', score: 96, completed: true },
        { name: 'Insurance', score: 93, completed: true },
        { name: 'Tax Planning', score: 95, completed: true },
        { name: 'Estate Planning', score: 97, completed: true },
        { name: 'Military Benefits', score: 100, completed: true },
        { name: 'Transition Planning', score: 94, completed: true }
      ]
    }
  },

  'budget-creation': {
    id: 'budget-creation',
    status: 'in-progress',
    startedDate: '2025-01-05',
    progress: 45,
    xp: 100,
    achievements: [
      'Identified all income sources',
      'Categorized fixed expenses',
      'Started tracking variable expenses',
      'Set up spending categories'
    ],
    impact: 'Building a comprehensive budget to track every dollar and maximize savings toward retirement and family goals.',
    quote: 'You can\'t manage what you don\'t measure. Time to get granular with where my money goes.',
    calculatorData: {
      monthlyIncome: {
        basePay: 4200,
        bah: 1650,
        bas: 290,
        specialPay: 0,
        total: 6140
      },
      fixedExpenses: {
        housing: 1650,
        utilities: 320,
        insurance: 380,
        carPayment: 420,
        childcare: 450,
        total: 3220
      },
      variableExpenses: {
        groceries: 680,
        dining: 240,
        entertainment: 180,
        gasoline: 280,
        shopping: 200,
        miscellaneous: 150,
        total: 1730
      },
      savings: {
        tspContribution: 630,
        emergencyFund: 200,
        investmentAccount: 300,
        total: 1130
      },
      remaining: 60,
      savingsRate: 18.4,
      budgetStatus: 'in-progress',
      categoriesCompleted: 9,
      totalCategories: 15,
      nextSteps: [
        'Complete variable expense tracking for full month',
        'Review and adjust entertainment budget',
        'Add quarterly/annual expenses',
        'Set up automated transfers for savings goals'
      ]
    }
  },

  'retirement-planning': {
    id: 'retirement-planning',
    status: 'in-progress',
    startedDate: '2024-06-01',
    progress: 65,
    xp: 250,
    achievements: [
      'Completed personal information and goals',
      'Entered all current financial data',
      'Calculated military pension benefits',
      'Ran comprehensive retirement calculator',
      'Identified 94% probability of success'
    ],
    impact: 'Working towards a 20-year military retirement at 42, followed by a civilian career in logistics. The numbers show I\'m on track for financial independence.',
    quote: 'Planning for retirement while still serving might seem early, but it\'s never too early to prepare for the next mission.',
    calculatorData: {
      // Personal Information
      currentAge: 34,
      retirementAge: 42,
      lifeExpectancy: 85,
      
      // Current Finances
      currentSavings: 128450,
      monthlyContribution: 1152,
      expectedReturn: 7.5,
      
      // Military Benefits
      yearsOfService: 12,
      targetRetirementYears: 20,
      basePay: 4200,
      militaryPension: 2520,
      pensionCOLA: true,
      
      // Social Security
      socialSecurityAge: 67,
      estimatedSocialSecurity: 2100,
      
      // Additional Income
      disabilityRating: 30,
      vaDisability: 524,
      postRetirementIncome: 4500,
      
      // Expenses
      currentMonthlyExpenses: 4200,
      retirementMonthlyExpenses: 3800,
      inflationRate: 3.0,
      
      // Healthcare
      tricareCoverage: true,
      tricarePremium: 0,
      
      // Results
      projectedRetirementSavings: 845000,
      monthlyRetirementIncome: 7044,
      replacementRate: 145,
      probabilityOfSuccess: 94,
      
      // Next Steps
      nextSteps: [
        'Complete transition timeline planning',
        'Review Tricare for Life healthcare options',
        'Finalize civilian employment strategy',
        'Schedule meeting with financial advisor',
        'Update beneficiaries and estate plan'
      ],
      progress: {
        personalInfo: 100,
        currentFinances: 100,
        militaryBenefits: 100,
        retirementCalculator: 100,
        transitionTimeline: 50,
        healthcarePlanning: 30,
        finalReview: 0
      }
    }
  }
};

// ============================================================================
// FINANCIAL DATA
// ============================================================================

export const demoFinancialData: DemoFinancialData = {
  accounts: {
    checking: {
      institution: 'Navy Federal Credit Union',
      balance: 8450,
      monthlyIncome: 5680,
      monthlyExpenses: 4200
    },
    savings: {
      institution: 'USAA',
      emergencyFund: 18000,
      goalFund: 5200,
      goalName: 'Home Down Payment Fund'
    },
    tsp: {
      balance: 128450,
      monthlyContribution: 630,
      governmentMatch: 210,
      fundAllocation: {
        gFund: 0,
        fFund: 0,
        cFund: 60,
        sFund: 30,
        iFund: 10
      },
      projectedAt60: 845000
    },
    investments: {
      institution: 'Vanguard',
      balance: 45300,
      monthlyContribution: 300,
      assetAllocation: {
        stocks: 70,
        bonds: 25,
        cash: 5
      },
      ytdReturn: 8.4
    }
  },
  netWorth: {
    assets: 258400,
    liabilities: 197000,
    total: 61400
  }
};

// ============================================================================
// RETIREMENT DATA (Pre-populated for calculator)
// ============================================================================

export const demoRetirementData = {
  currentSavings: '128450',
  monthlyContribution: '1152',
  expectedReturn: '7.5',
  retirementAge: '42',
  currentAge: '34',
  militaryPension: '2520',
  socialSecurityAge: '67',
  estimatedSocialSecurity: '2100',
  vaDisability: '524',
  postRetirementIncome: '4500',
  currentMonthlyExpenses: '4200',
  retirementMonthlyExpenses: '3800'
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get demo data for a specific mission
 */
export function getDemoMissionData(missionId: string): DemoMissionData | null {
  return demoMissions[missionId] || null;
}

/**
 * Get all completed missions
 */
export function getCompletedMissions(): DemoMissionData[] {
  return Object.values(demoMissions).filter(m => m.status === 'completed');
}

/**
 * Get in-progress missions
 */
export function getInProgressMissions(): DemoMissionData[] {
  return Object.values(demoMissions).filter(m => m.status === 'in-progress');
}

/**
 * Get mission statistics
 */
export function getDemoMissionStats() {
  const missions = Object.values(demoMissions);
  const completed = missions.filter(m => m.status === 'completed').length;
  const inProgress = missions.filter(m => m.status === 'in-progress').length;
  const total = missions.length;
  const totalXP = missions
    .filter(m => m.status === 'completed')
    .reduce((sum, m) => sum + m.xp, 0);
  
  return {
    completed,
    inProgress,
    total,
    totalXP,
    completionRate: Math.round((completed / total) * 100)
  };
}

/**
 * Calculate level from XP
 */
export function calculateLevel(xp: number): { level: number; xpForNext: number; progress: number } {
  const level = Math.floor(xp / 500) + 1;
  const xpInCurrentLevel = xp % 500;
  const xpForNext = 500 - xpInCurrentLevel;
  const progress = (xpInCurrentLevel / 500) * 100;
  
  return { level, xpForNext, progress };
}

/**
 * Get demo data formatted for App initialization
 */
export function getFormattedDemoData() {
  return {
    userData: {
      ...demoUserProfile,
      rank: demoUserProfile.rank,
      yearsOfService: demoUserProfile.yearsOfService,
      retirementGoal: demoUserProfile.retirementGoal,
      currentAge: demoUserProfile.currentAge,
      desiredRetirementAge: demoUserProfile.desiredRetirementAge,
      xp: demoUserProfile.xp,
      completedMissions: demoUserProfile.completedMissions
    },
    retirementData: demoRetirementData
  };
}

/**
 * Export all demo data (useful for testing)
 */
export const allDemoData = {
  profile: demoUserProfile,
  missions: demoMissions,
  financial: demoFinancialData,
  retirement: demoRetirementData,
  stats: getDemoMissionStats()
};

export default {
  profile: demoUserProfile,
  missions: demoMissions,
  financial: demoFinancialData,
  retirement: demoRetirementData,
  getDemoMissionData,
  getCompletedMissions,
  getInProgressMissions,
  getDemoMissionStats,
  calculateLevel,
  getFormattedDemoData
};
