import React from 'react';

interface ScreenLayoutProps {
  children: React.ReactNode;
  variant?: 'default' | 'full' | 'centered' | 'narrow';
  withPadding?: boolean;
  className?: string;
}

/**
 * ScreenLayout provides consistent layout and styling for all app screens
 * 
 * Variants:
 * - default: Max-width container with padding (good for most screens)
 * - full: Full-width, no max-width (good for dashboards, tables)
 * - centered: Centered content with narrow max-width (good for forms, auth)
 * - narrow: Narrow content width (good for reading content)
 */
export function ScreenLayout({ 
  children, 
  variant = 'default',
  withPadding = true,
  className = ''
}: ScreenLayoutProps) {
  const baseClasses = 'min-h-full';
  
  const variantClasses = {
    default: 'max-w-7xl mx-auto',
    full: 'w-full',
    centered: 'max-w-2xl mx-auto',
    narrow: 'max-w-4xl mx-auto'
  };
  
  const paddingClasses = withPadding 
    ? 'px-4 py-6 sm:px-6 lg:px-8 lg:py-8' 
    : '';
  
  return (
    <div className={`screen-layout ${baseClasses} ${variantClasses[variant]} ${paddingClasses} ${className}`}>
      {children}
    </div>
  );
}

/**
 * ScreenHeader provides consistent header styling across screens
 */
interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  backButton?: React.ReactNode;
}

export function ScreenHeader({ title, subtitle, action, backButton }: ScreenHeaderProps) {
  return (
    <div className="screen-header mb-6 lg:mb-8">
      {backButton && (
        <div className="mb-4">
          {backButton}
        </div>
      )}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl lg:text-3xl font-semibold text-foreground truncate">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>
        {action && (
          <div className="flex-shrink-0">
            {action}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * ScreenSection provides consistent section styling
 */
interface ScreenSectionProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

export function ScreenSection({ children, title, description, className = '' }: ScreenSectionProps) {
  return (
    <section className={`screen-section mb-6 lg:mb-8 ${className}`}>
      {(title || description) && (
        <div className="mb-4">
          {title && (
            <h2 className="text-lg lg:text-xl font-semibold text-foreground">
              {title}
            </h2>
          )}
          {description && (
            <p className="mt-1 text-sm text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
