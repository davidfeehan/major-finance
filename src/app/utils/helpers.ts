import { LEVEL_CONFIG, STORAGE_KEYS, VALIDATION } from '../constants';

// Level and XP Calculations
export const calculateLevel = (xp: number): number => {
  return Math.floor(xp / LEVEL_CONFIG.xpPerLevel) + 1;
};

export const calculateLevelProgress = (xp: number): { 
  currentLevel: number;
  xpInCurrentLevel: number;
  xpForNextLevel: number;
  progressPercentage: number;
} => {
  const currentLevel = calculateLevel(xp);
  const xpInCurrentLevel = xp % LEVEL_CONFIG.xpPerLevel;
  const xpForNextLevel = LEVEL_CONFIG.xpPerLevel;
  const progressPercentage = (xpInCurrentLevel / xpForNextLevel) * 100;
  
  return {
    currentLevel,
    xpInCurrentLevel,
    xpForNextLevel,
    progressPercentage,
  };
};

export const getLevelTitle = (level: number): string => {
  // Find the highest level title that applies
  const levelTitleKeys = Object.keys(LEVEL_CONFIG.levelTitles)
    .map(Number)
    .sort((a, b) => b - a);
  
  for (const titleLevel of levelTitleKeys) {
    if (level >= titleLevel) {
      return LEVEL_CONFIG.levelTitles[titleLevel];
    }
  }
  
  return 'Recruit';
};

// Format Currency
export const formatCurrency = (
  amount: number | string,
  options: {
    showCents?: boolean;
    compact?: boolean;
  } = {}
): string => {
  const { showCents = false, compact = false } = options;
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) || 0 : amount;
  
  if (compact && numericAmount >= 1000000) {
    return `$${(numericAmount / 1000000).toFixed(1)}M`;
  }
  
  if (compact && numericAmount >= 1000) {
    return `$${(numericAmount / 1000).toFixed(1)}K`;
  }
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: showCents ? 2 : 0,
    maximumFractionDigits: showCents ? 2 : 0,
  }).format(numericAmount);
};

// Format Percentage
export const formatPercentage = (value: number | string, decimals = 1): string => {
  const numericValue = typeof value === 'string' ? parseFloat(value) || 0 : value;
  return `${numericValue.toFixed(decimals)}%`;
};

// Local Storage Helpers
export const storage = {
  get: <T>(key: string, defaultValue: T): T => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },
  
  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn('Failed to save to localStorage:', error);
    }
  },
  
  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn('Failed to remove from localStorage:', error);
    }
  },
  
  clear: (): void => {
    try {
      localStorage.clear();
    } catch (error) {
      console.warn('Failed to clear localStorage:', error);
    }
  },
};

// Validation Helpers
export const validateAge = (age: string | number): boolean => {
  const numericAge = typeof age === 'string' ? parseInt(age) || 0 : age;
  return numericAge >= VALIDATION.minAge && numericAge <= VALIDATION.maxAge;
};

export const validateYearsOfService = (years: string | number): boolean => {
  const numericYears = typeof years === 'string' ? parseInt(years) || 0 : years;
  return numericYears >= VALIDATION.minYearsOfService && numericYears <= VALIDATION.maxYearsOfService;
};

export const validateSavings = (amount: string | number): boolean => {
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) || 0 : amount;
  return numericAmount >= VALIDATION.minSavings && numericAmount <= VALIDATION.maxSavings;
};

export const validateRetirementAge = (age: string | number): boolean => {
  const numericAge = typeof age === 'string' ? parseInt(age) || 0 : age;
  return numericAge >= VALIDATION.minRetirementAge && numericAge <= VALIDATION.maxRetirementAge;
};

// Date Helpers
export const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatDateShort = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const getTimeUntilRetirement = (currentAge: number, retirementAge: number): {
  years: number;
  months: number;
  totalMonths: number;
} => {
  const years = retirementAge - currentAge;
  const months = years * 12;
  
  return {
    years,
    months: 0, // This would need more complex calculation for current date
    totalMonths: months,
  };
};

// Debounce Function
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(null, args), wait);
  };
};

// Throttle Function
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func.apply(null, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// URL Helpers
export const createSearchParams = (params: Record<string, string | number | boolean>): string => {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, String(value));
    }
  });
  
  return searchParams.toString();
};

// Array Helpers
export const groupBy = <T, K extends keyof T>(
  array: T[],
  key: K
): Record<string, T[]> => {
  return array.reduce((groups, item) => {
    const group = String(item[key]);
    if (!groups[group]) {
      groups[group] = [];
    }
    groups[group].push(item);
    return groups;
  }, {} as Record<string, T[]>);
};

export const sortBy = <T>(
  array: T[],
  key: keyof T,
  direction: 'asc' | 'desc' = 'asc'
): T[] => {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    
    if (aVal < bVal) return direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return direction === 'asc' ? 1 : -1;
    return 0;
  });
};

// Device Detection
export const isMobile = (): boolean => {
  return window.innerWidth < 768;
};

export const isTablet = (): boolean => {
  return window.innerWidth >= 768 && window.innerWidth < 1024;
};

export const isDesktop = (): boolean => {
  return window.innerWidth >= 1024;
};

// Error Handling
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  
  if (typeof error === 'string') {
    return error;
  }
  
  return 'An unexpected error occurred';
};

// Retry Logic
export const retry = async <T>(
  fn: () => Promise<T>,
  attempts: number = 3,
  delay: number = 1000
): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    if (attempts <= 1) {
      throw error;
    }
    
    await new Promise(resolve => setTimeout(resolve, delay));
    return retry(fn, attempts - 1, delay);
  }
};

// Generate Unique ID
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

// Calculate Compound Interest
export const calculateCompoundInterest = (
  principal: number,
  rate: number,
  time: number,
  compoundsPerYear: number = 12
): number => {
  const rateDecimal = rate / 100;
  return principal * Math.pow(1 + rateDecimal / compoundsPerYear, compoundsPerYear * time);
};

// Format Large Numbers
export const formatLargeNumber = (num: number): string => {
  if (num >= 1e9) {
    return (num / 1e9).toFixed(1) + 'B';
  }
  if (num >= 1e6) {
    return (num / 1e6).toFixed(1) + 'M';
  }
  if (num >= 1e3) {
    return (num / 1e3).toFixed(1) + 'K';
  }
  return num.toString();
};