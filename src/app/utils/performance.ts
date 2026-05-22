// Performance utilities and monitoring

// Debounce utility for expensive operations
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Throttle utility for frequent operations
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Lazy loading utility with retry logic
export function createLazyComponent<T extends React.ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  retries = 3
) {
  return React.lazy(async () => {
    for (let i = 0; i < retries; i++) {
      try {
        return await importFunc();
      } catch (error) {
        if (i === retries - 1) throw error;
        // Wait before retry with exponential backoff
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i)));
      }
    }
    throw new Error('Failed to load component after retries');
  });
}

// Performance monitoring utilities
export const perf = {
  mark: (name: string) => {
    if (typeof performance !== 'undefined') {
      performance.mark(name);
    }
  },
  
  measure: (name: string, startMark: string, endMark?: string) => {
    if (typeof performance !== 'undefined') {
      performance.measure(name, startMark, endMark);
      const measures = performance.getEntriesByName(name, 'measure');
      return measures[measures.length - 1]?.duration || 0;
    }
    return 0;
  },
  
  clearMarks: (name?: string) => {
    if (typeof performance !== 'undefined') {
      performance.clearMarks(name);
    }
  },
  
  clearMeasures: (name?: string) => {
    if (typeof performance !== 'undefined') {
      performance.clearMeasures(name);
    }
  }
};

// Memory usage monitoring (Chrome only)
export function getMemoryUsage() {
  if ('memory' in performance) {
    const memory = (performance as any).memory;
    return {
      used: Math.round(memory.usedJSHeapSize / 1024 / 1024),
      total: Math.round(memory.totalJSHeapSize / 1024 / 1024),
      limit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024)
    };
  }
  return null;
}

// Component render tracking
export function withRenderTracking<P extends object>(
  Component: React.ComponentType<P>,
  name: string
) {
  return React.memo((props: P) => {
    React.useEffect(() => {
      perf.mark(`${name}-render-start`);
      return () => {
        perf.mark(`${name}-render-end`);
        perf.measure(`${name}-render`, `${name}-render-start`, `${name}-render-end`);
      };
    });
    
    return <Component {...props} />;
  });
}