// Enhanced error tracking and reporting

export interface ErrorInfo {
  errorBoundary?: string;
  componentStack?: string;
  userId?: string;
  sessionId?: string;
  userAgent?: string;
  url?: string;
  timestamp?: string;
  buildVersion?: string;
}

export interface AppError extends Error {
  code?: string;
  severity?: 'low' | 'medium' | 'high' | 'critical';
  category?: 'network' | 'auth' | 'validation' | 'runtime' | 'mission' | 'data';
  metadata?: Record<string, any>;
}

class ErrorTracker {
  private sessionId: string;
  private userId?: string;
  private isInitialized = false;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.initialize();
  }

  private generateSessionId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private initialize() {
    if (this.isInitialized) return;

    // Set up global error handlers
    window.addEventListener('error', (event) => {
      this.captureError(new Error(event.message), {
        componentStack: event.filename + ':' + event.lineno,
      });
    });

    window.addEventListener('unhandledrejection', (event) => {
      this.captureError(
        new Error(event.reason?.message || 'Unhandled Promise Rejection'),
        { category: 'runtime' }
      );
    });

    this.isInitialized = true;
  }

  setUserId(userId: string) {
    this.userId = userId;
  }

  captureError(error: Error | AppError, additionalInfo?: Partial<ErrorInfo>) {
    const errorInfo: ErrorInfo = {
      userId: this.userId,
      sessionId: this.sessionId,
      userAgent: navigator.userAgent,
      url: window.location.href,
      timestamp: new Date().toISOString(),
      buildVersion: process.env.REACT_APP_VERSION || 'unknown',
      ...additionalInfo,
    };

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.group('🚨 Error Captured');
      console.error('Error:', error);
      console.log('Additional Info:', errorInfo);
      console.groupEnd();
    }

    // In production, you would send this to your error tracking service
    // e.g., Sentry, LogRocket, Bugsnag, etc.
    this.sendToErrorService(error, errorInfo);
  }

  private sendToErrorService(error: Error | AppError, info: ErrorInfo) {
    // Placeholder for error service integration
    // In a real app, you'd integrate with services like:
    // - Sentry: Sentry.captureException(error, { extra: info })
    // - LogRocket: LogRocket.captureException(error)
    // - Custom analytics: analytics.track('error', { error: error.message, ...info })
    
    if (process.env.NODE_ENV === 'production') {
      // Example: Send to analytics or logging service
      console.warn('Error tracked:', {
        message: error.message,
        stack: error.stack,
        ...info,
      });
    }
  }

  // Create a custom error with additional context
  createError(
    message: string,
    options: {
      code?: string;
      severity?: AppError['severity'];
      category?: AppError['category'];
      metadata?: Record<string, any>;
    } = {}
  ): AppError {
    const error = new Error(message) as AppError;
    error.code = options.code;
    error.severity = options.severity || 'medium';
    error.category = options.category || 'runtime';
    error.metadata = options.metadata;
    return error;
  }

  // Mission-specific error tracking
  captureMissionError(
    missionType: string,
    step: string,
    error: Error,
    userContext?: any
  ) {
    const missionError = this.createError(
      `Mission error in ${missionType} at step: ${step}`,
      {
        code: 'MISSION_ERROR',
        severity: 'high',
        category: 'mission',
        metadata: {
          missionType,
          step,
          userContext,
          originalError: error.message,
        },
      }
    );

    this.captureError(missionError, {
      componentStack: `Mission: ${missionType} > Step: ${step}`,
    });
  }

  // Network error tracking
  captureNetworkError(
    url: string,
    method: string,
    status?: number,
    response?: any
  ) {
    const networkError = this.createError(
      `Network error: ${method} ${url} ${status ? `(${status})` : ''}`,
      {
        code: 'NETWORK_ERROR',
        severity: status && status >= 500 ? 'high' : 'medium',
        category: 'network',
        metadata: {
          url,
          method,
          status,
          response,
        },
      }
    );

    this.captureError(networkError);
  }

  // Authentication error tracking
  captureAuthError(operation: string, error: Error) {
    const authError = this.createError(
      `Authentication error during ${operation}: ${error.message}`,
      {
        code: 'AUTH_ERROR',
        severity: 'high',
        category: 'auth',
        metadata: {
          operation,
          originalError: error.message,
        },
      }
    );

    this.captureError(authError);
  }

  // Performance issue tracking
  capturePerformanceIssue(
    operation: string,
    duration: number,
    threshold: number = 5000
  ) {
    if (duration > threshold) {
      const perfError = this.createError(
        `Performance issue: ${operation} took ${duration}ms (threshold: ${threshold}ms)`,
        {
          code: 'PERFORMANCE_ISSUE',
          severity: duration > threshold * 2 ? 'high' : 'medium',
          category: 'runtime',
          metadata: {
            operation,
            duration,
            threshold,
          },
        }
      );

      this.captureError(perfError);
    }
  }
}

// Export singleton instance
export const errorTracker = new ErrorTracker();

// React Error Boundary helper
export function withErrorTracking<P extends object>(
  Component: React.ComponentType<P>,
  componentName: string
) {
  return React.forwardRef<any, P>((props, ref) => {
    React.useEffect(() => {
      const handleError = (error: Error) => {
        errorTracker.captureError(error, {
          errorBoundary: componentName,
        });
      };

      // Track component mount
      console.debug(`Component mounted: ${componentName}`);

      return () => {
        console.debug(`Component unmounted: ${componentName}`);
      };
    }, []);

    return <Component {...props} ref={ref} />;
  });
}

// Hook for manual error reporting
export function useErrorTracking() {
  return {
    captureError: errorTracker.captureError.bind(errorTracker),
    captureMissionError: errorTracker.captureMissionError.bind(errorTracker),
    captureNetworkError: errorTracker.captureNetworkError.bind(errorTracker),
    captureAuthError: errorTracker.captureAuthError.bind(errorTracker),
    capturePerformanceIssue: errorTracker.capturePerformanceIssue.bind(errorTracker),
  };
}