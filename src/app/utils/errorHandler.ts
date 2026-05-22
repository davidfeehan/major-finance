/**
 * Global error handler for uncaught fetch errors
 * This sets up as early as possible to catch all network errors
 */

// Set up the global error handler immediately when this module loads
if (typeof window !== 'undefined') {
  // Handle unhandled promise rejections (fetch errors, etc.)
  window.addEventListener('unhandledrejection', (event: PromiseRejectionEvent) => {
    // Silently handle fetch errors
    if (
      event.reason?.message?.includes('fetch') || 
      event.reason?.message?.includes('Failed to fetch') ||
      event.reason?.name?.includes('Fetch') ||
      event.reason?.message?.includes('network') ||
      event.reason?.message?.includes('NetworkError') ||
      event.reason?.code === 'NETWORK_ERROR'
    ) {
      // Silently suppress - network errors are expected and handled by demo mode
      event.preventDefault(); // Prevent the error from being thrown
      return;
    }

    // Also catch Supabase auth errors
    if (
      event.reason?.message?.includes('AuthRetryableFetchError') ||
      event.reason?.name === 'AuthRetryableFetchError' ||
      event.reason?.message?.includes('auth')
    ) {
      // Silently suppress - auth errors are expected and handled by demo mode
      event.preventDefault();
      return;
    }
  });

  // Handle general errors
  window.addEventListener('error', (event: ErrorEvent) => {
    // Silently handle fetch-related errors
    if (
      event.message?.includes('fetch') ||
      event.message?.includes('Failed to fetch') ||
      event.message?.includes('network')
    ) {
      // Silently suppress - network errors are expected and handled by demo mode
      event.preventDefault();
      return false;
    }
  });

  console.log('✅ Global error handlers initialized');
}

export const setupErrorHandlers = () => {
  // This function is called to ensure handlers are set up
  // The actual setup happens when the module loads
  return true;
};