// Screen configuration for better maintainability
export const SCREEN_CONFIG = {
  welcome: {
    requiresAuth: false,
    showNavigation: false,
    layout: 'fullscreen'
  },
  auth: {
    requiresAuth: false,
    showNavigation: false,
    layout: 'fullscreen'
  },
  'demo-interstitial': {
    requiresAuth: false,
    showNavigation: false,
    layout: 'fullscreen'
  },
  onboarding: {
    requiresAuth: true,
    showNavigation: false,
    layout: 'fullscreen'
  },
  dashboard: {
    requiresAuth: true,
    showNavigation: true,
    layout: 'default'
  },
  'retirement-planning': {
    requiresAuth: true,
    showNavigation: true,
    layout: 'default'
  },
  'retirement-calculator': {
    requiresAuth: true,
    showNavigation: true,
    layout: 'default'
  },
  'emergency-fund': {
    requiresAuth: true,
    showNavigation: true,
    layout: 'mission'
  },
  'investment-basics': {
    requiresAuth: true,
    showNavigation: true,
    layout: 'mission'
  },
  'tsp-optimization': {
    requiresAuth: true,
    showNavigation: true,
    layout: 'mission'
  },
  'financial-education': {
    requiresAuth: true,
    showNavigation: true,
    layout: 'mission'
  },
  'stocks-fundamentals': {
    requiresAuth: true,
    showNavigation: true,
    layout: 'mission'
  },
  'bonds-fixed-income': {
    requiresAuth: true,
    showNavigation: true,
    layout: 'mission'
  },
  'commodities-trading': {
    requiresAuth: true,
    showNavigation: true,
    layout: 'mission'
  },
  'asset-allocation': {
    requiresAuth: true,
    showNavigation: true,
    layout: 'mission'
  },
  'market-analysis': {
    requiresAuth: true,
    showNavigation: true,
    layout: 'mission'
  },
  'government-trading-tracker': {
    requiresAuth: true,
    showNavigation: true,
    layout: 'default'
  },
  banking: {
    requiresAuth: true,
    showNavigation: true,
    layout: 'default'
  },
  profile: {
    requiresAuth: true,
    showNavigation: true,
    layout: 'default'
  },
  settings: {
    requiresAuth: true,
    showNavigation: true,
    layout: 'default'
  },
  help: {
    requiresAuth: false,
    showNavigation: true,
    layout: 'default'
  },
  progress: {
    requiresAuth: true,
    showNavigation: true,
    layout: 'default'
  },
  missions: {
    requiresAuth: true,
    showNavigation: true,
    layout: 'default'
  },
  'xp-notification': {
    requiresAuth: true,
    showNavigation: false,
    layout: 'fullscreen'
  },
  'nav-test': {
    requiresAuth: false,
    showNavigation: true,
    layout: 'default'
  },
  'desktop-layout-test': {
    requiresAuth: false,
    showNavigation: true,
    layout: 'default'
  }
} as const;

export type ScreenId = keyof typeof SCREEN_CONFIG;