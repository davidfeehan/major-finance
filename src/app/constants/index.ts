// Application Configuration
export const APP_CONFIG = {
  name: 'Major Finance',
  version: '1.0.0',
  defaultTheme: 'joint',
  xpPerLevel: 500,
  welcomeBonusXP: 100,
} as const;

// Screen Types
export type AppScreen = 
  | 'welcome'
  | 'auth'
  | 'demo-interstitial'
  | 'onboarding' 
  | 'dashboard' 
  | 'retirement-planning' 
  | 'retirement-calculator'
  | 'emergency-fund'
  | 'investment-basics'
  | 'tsp-optimization'
  | 'financial-education'
  | 'budget-creation'
  | 'banking'
  | 'profile'
  | 'settings'
  | 'help'
  | 'progress'
  | 'missions'
  | 'xp-notification'
  | 'nav-test'
  | 'desktop-layout-test';

// Mission Configuration
export const MISSIONS = {
  'retirement-planning': {
    id: 'retirement-planning',
    title: 'Retirement Planning',
    description: 'Plan your financial future with comprehensive retirement calculations',
    xpReward: 250,
    difficulty: 'intermediate',
    estimatedTime: '15-20 minutes',
    category: 'planning',
  },
  'emergency-fund': {
    id: 'emergency-fund',
    title: 'Emergency Fund',
    description: 'Build financial resilience with a proper emergency fund strategy',
    xpReward: 150,
    difficulty: 'beginner',
    estimatedTime: '10-15 minutes',
    category: 'fundamentals',
  },
  'investment-basics': {
    id: 'investment-basics',
    title: 'Investment Training',
    description: 'Master the fundamentals of military-focused investing',
    xpReward: 200,
    difficulty: 'intermediate',
    estimatedTime: '20-25 minutes',
    category: 'investing',
  },
  'tsp-optimization': {
    id: 'tsp-optimization',
    title: 'TSP Optimization',
    description: 'Maximize your Thrift Savings Plan for optimal retirement growth',
    xpReward: 300,
    difficulty: 'advanced',
    estimatedTime: '25-30 minutes',
    category: 'advanced',
  },
  'financial-education': {
    id: 'financial-education',
    title: 'Financial Education',
    description: 'Essential financial literacy for military personnel',
    xpReward: 100,
    difficulty: 'beginner',
    estimatedTime: '5-10 minutes',
    category: 'fundamentals',
  },
  'budget-creation': {
    id: 'budget-creation',
    title: 'Create a Budget',
    description: 'Build a military-optimized budget using the 50/30/20 rule',
    xpReward: 100,
    difficulty: 'beginner',
    estimatedTime: '10-15 minutes',
    category: 'fundamentals',
  },
} as const;

// Military Branches with Enhanced Styling
export const MILITARY_BRANCHES = {
  joint: {
    name: 'Joint Forces',
    theme: 'theme-joint',
    color: '#1e40af',
    icon: '🇺🇸',
    gradient: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #1e3a8a 100%)',
    description: 'United States Armed Forces',
  },
  army: {
    name: 'Army',
    theme: 'theme-army',
    color: '#2d5016',
    icon: '🪖',
    gradient: 'linear-gradient(135deg, #2d5016 0%, #4a7c59 50%, #1c3d1b 100%)',
    description: 'This We\'ll Defend',
  },
  navy: {
    name: 'Navy',
    theme: 'theme-navy',
    color: '#1e3a8a',
    icon: '⚓',
    gradient: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #1e40af 100%)',
    description: 'Honor, Courage, Commitment',
  },
  'air-force': {
    name: 'Air Force',
    theme: 'theme-air-force',
    color: '#0ea5e9',
    icon: '✈️',
    gradient: 'linear-gradient(135deg, #0ea5e9 0%, #38bdf8 50%, #0284c7 100%)',
    description: 'Aim High, Fly-Fight-Win',
  },
  marines: {
    name: 'Marines',
    theme: 'theme-marines',
    color: '#c41e3a',
    icon: '🦅',
    gradient: 'linear-gradient(135deg, #c41e3a 0%, #ef4444 50%, #991b1b 100%)',
    description: 'Semper Fidelis',
  },
  'coast-guard': {
    name: 'Coast Guard',
    theme: 'theme-coast-guard',
    color: '#2563eb',
    icon: '🛟',
    gradient: 'linear-gradient(135deg, #2563eb 0%, #f97316 50%, #ea580c 100%)',
    description: 'Semper Paratus',
  },
  'space-force': {
    name: 'Space Force',
    theme: 'theme-space-force',
    color: '#4338ca',
    icon: '🚀',
    gradient: 'linear-gradient(135deg, #4338ca 0%, #8b5cf6 50%, #ec4899 100%)',
    description: 'Semper Supra',
  },
} as const;

// Level Configuration
export const LEVEL_CONFIG = {
  maxLevel: 50,
  xpPerLevel: 500,
  levelTitles: {
    1: 'Recruit',
    5: 'Private',
    10: 'Corporal',
    15: 'Sergeant',
    20: 'Staff Sergeant',
    25: 'Technical Sergeant',
    30: 'Master Sergeant',
    35: 'Senior Master Sergeant',
    40: 'Chief Master Sergeant',
    45: 'Command Chief',
    50: 'Financial Commander',
  } as Record<number, string>,
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  theme: 'major-finance-theme',
  userPreferences: 'major-finance-preferences',
  draftData: 'major-finance-draft',
  lastSession: 'major-finance-last-session',
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  profile: '/profile',
  progress: '/progress',
  retirementPlan: '/retirement-plan',
  reminders: '/reminders',
  missions: '/missions',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  networkError: 'Network connection failed. Please check your internet connection.',
  authError: 'Authentication failed. Please sign in again.',
  dataLoadError: 'Failed to load data. Please try again.',
  dataSaveError: 'Failed to save data. Please try again.',
  genericError: 'An unexpected error occurred. Please try again.',
  offlineMode: 'You are currently in offline mode. Some features may be limited.',
} as const;

// Feature Flags
export const FEATURES = {
  enablePWA: true,
  enableNotifications: true,
  enableOfflineMode: true,
  enableAnalytics: false,
  enableBetaFeatures: false,
} as const;

// Validation Rules
export const VALIDATION = {
  minAge: 18,
  maxAge: 99,
  minYearsOfService: 0,
  maxYearsOfService: 50,
  minRetirementAge: 50,
  maxRetirementAge: 75,
  minSavings: 0,
  maxSavings: 10000000,
  minContribution: 0,
  maxContribution: 100000,
} as const;

// Animation Durations (in milliseconds)
export const ANIMATIONS = {
  fast: 150,
  normal: 300,
  slow: 500,
  xpNotification: 2000,
  levelUp: 3000,
} as const;

// Breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// Mission Categories with Enhanced Styling
export const MISSION_CATEGORIES = {
  fundamentals: {
    name: 'Fundamentals',
    description: 'Essential financial knowledge for service members',
    color: '#10b981',
    icon: '🛡️',
    gradient: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
    bgClass: 'category-fundamentals',
  },
  planning: {
    name: 'Planning',
    description: 'Strategic financial planning and goal setting',
    color: '#3b82f6',
    icon: '🎯',
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)',
    bgClass: 'category-planning',
  },
  investing: {
    name: 'Investing',
    description: 'Investment strategies and portfolio management',
    color: '#8b5cf6',
    icon: '📈',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)',
    bgClass: 'category-investing',
  },
  advanced: {
    name: 'Advanced',
    description: 'Complex financial concepts and optimization',
    color: '#f59e0b',
    icon: '⭐',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
    bgClass: 'category-advanced',
  },
} as const;

// Enhanced Icon Mappings for UI Elements
export const UI_ICONS = {
  // Financial concepts
  savings: 'PiggyBank',
  investment: 'TrendingUp',
  retirement: 'CalendarDays',
  emergency: 'Shield',
  budget: 'Calculator',
  debt: 'CreditCard',
  
  // Military specific
  rank: 'Award',
  mission: 'Target',
  orders: 'FileText',
  deployment: 'Plane',
  benefits: 'Gift',
  
  // UI actions
  edit: 'Pencil',
  save: 'Check',
  cancel: 'X',
  add: 'Plus',
  remove: 'Minus',
  settings: 'Settings',
  help: 'HelpCircle',
  info: 'Info',
  warning: 'AlertTriangle',
  success: 'CheckCircle',
  error: 'XCircle',
  
  // Navigation
  home: 'Home',
  back: 'ArrowLeft',
  forward: 'ArrowRight',
  up: 'ArrowUp',
  down: 'ArrowDown',
  
  // Data visualization
  chart: 'BarChart3',
  pie: 'PieChart',
  graph: 'LineChart',
  table: 'Table',
  
  // Communication
  message: 'MessageCircle',
  phone: 'Phone',
  email: 'Mail',
  notification: 'Bell',
  
  // File operations
  upload: 'Upload',
  download: 'Download',
  file: 'File',
  folder: 'Folder',
  
  // Status indicators
  online: 'Wifi',
  offline: 'WifiOff',
  loading: 'Loader',
  complete: 'CheckCircle2',
} as const;

// Image Categories for Unsplash Integration
export const IMAGE_CATEGORIES = {
  military: {
    keywords: ['military uniform', 'armed forces', 'veterans', 'service members'],
    fallback: 'military professional',
  },
  finance: {
    keywords: ['financial planning', 'money management', 'investment', 'retirement planning'],
    fallback: 'financial documents',
  },
  success: {
    keywords: ['achievement', 'success', 'celebration', 'goal completion'],
    fallback: 'success celebration',
  },
  education: {
    keywords: ['learning', 'education', 'training', 'knowledge'],
    fallback: 'educational materials',
  },
  planning: {
    keywords: ['strategy', 'planning', 'organization', 'goals'],
    fallback: 'strategic planning',
  },
  technology: {
    keywords: ['modern technology', 'digital tools', 'apps', 'innovation'],
    fallback: 'modern technology',
  },
} as const;

export type MissionId = keyof typeof MISSIONS;
export type BranchId = keyof typeof MILITARY_BRANCHES;
export type MissionCategory = keyof typeof MISSION_CATEGORIES;

// Re-export operations system
export * from './operations';