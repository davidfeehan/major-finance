import React, { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Monitor, Smartphone, Tablet } from 'lucide-react';
import { useDeveloperMode } from '../hooks/useDeveloperMode';

export interface ViewportPreset {
  id: string;
  name: string;
  width: number;
  height: number;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

interface ResolutionSelectorProps {
  isDemo: boolean;
  currentViewport?: string;
  onViewportChange?: (viewport: ViewportPreset) => void;
}

export const VIEWPORT_PRESETS: ViewportPreset[] = [
  {
    id: 'desktop',
    name: 'Desktop',
    width: 1920,
    height: 1080,
    icon: Monitor,
    description: '1920×1080 - Desktop'
  },
  {
    id: 'laptop',
    name: 'Laptop',
    width: 1366,
    height: 768,
    icon: Monitor,
    description: '1366×768 - Laptop'
  },
  {
    id: 'tablet',
    name: 'Tablet',
    width: 768,
    height: 1024,
    icon: Tablet,
    description: '768×1024 - Tablet'
  },
  {
    id: 'tablet-landscape',
    name: 'Tablet (Landscape)',
    width: 1024,
    height: 768,
    icon: Tablet,
    description: '1024×768 - Tablet Landscape'
  },
  {
    id: 'mobile',
    name: 'Mobile',
    width: 375,
    height: 667,
    icon: Smartphone,
    description: '375×667 - iPhone SE'
  },
  {
    id: 'mobile-large',
    name: 'Mobile (Large)',
    width: 414,
    height: 896,
    icon: Smartphone,
    description: '414×896 - iPhone 11'
  }
];

export function ResolutionSelector({ isDemo, currentViewport, onViewportChange }: ResolutionSelectorProps) {
  const { isDeveloperMode } = useDeveloperMode();
  const [selectedViewport, setSelectedViewport] = useState<string>('desktop');
  const [isResizing, setIsResizing] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Don't render if developer mode is off
  if (!isDeveloperMode) {
    return null;
  }

  // Detect current viewport based on window size
  useEffect(() => {
    const detectViewport = () => {
      const width = window.innerWidth;
      
      if (width >= 1920) return 'desktop';
      if (width >= 1366) return 'laptop';
      if (width >= 1024) return 'tablet-landscape';
      if (width >= 768) return 'tablet';
      if (width >= 414) return 'mobile-large';
      return 'mobile';
    };

    if (!isDemo) {
      setSelectedViewport(detectViewport());
    } else {
      // In demo mode, detect current viewport or default to desktop
      const current = detectViewport();
      setSelectedViewport(currentViewport || current);
    }
  }, [isDemo, currentViewport]);

  // Update when window is resized (only in non-demo mode)
  useEffect(() => {
    if (isDemo) return;

    const handleResize = () => {
      const width = window.innerWidth;
      
      if (width >= 1920) setSelectedViewport('desktop');
      else if (width >= 1366) setSelectedViewport('laptop');
      else if (width >= 1024) setSelectedViewport('tablet-landscape');
      else if (width >= 768) setSelectedViewport('tablet');
      else if (width >= 414) setSelectedViewport('mobile-large');
      else setSelectedViewport('mobile');
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isDemo]);

  const handleViewportChange = async (viewportId: string) => {
    const viewport = VIEWPORT_PRESETS.find(p => p.id === viewportId);
    if (!viewport) return;

    setSelectedViewport(viewportId);
    setIsResizing(true);
    setShowHint(true);

    // Resize the window in demo mode
    if (isDemo && window.resizeTo) {
      try {
        window.resizeTo(viewport.width, viewport.height);
        // Add small delay to allow layout to adjust
        setTimeout(() => {
          setIsResizing(false);
          setTimeout(() => setShowHint(false), 2000); // Hide hint after 2 seconds
        }, 300);
      } catch (error) {
        console.warn('Window resize not supported in this browser context');
        setIsResizing(false);
        setShowHint(false);
      }
    } else {
      setIsResizing(false);
      setShowHint(false);
    }

    // Call the callback if provided
    onViewportChange?.(viewport);
  };

  const currentPreset = VIEWPORT_PRESETS.find(p => p.id === selectedViewport);
  const Icon = currentPreset?.icon || Monitor;

  // In demo mode, show interactive selector
  if (isDemo) {
    return (
      <>
        <div className={`resolution-selector ${isDemo ? 'demo-active' : ''}`}>
          <Select value={selectedViewport} onValueChange={handleViewportChange}>
            <SelectTrigger className="select-trigger h-7 px-2 text-xs flex items-center gap-1.5">
              <Icon className={`resolution-icon w-3 h-3 ${isResizing ? 'changing' : ''}`} />
              <SelectValue />
              {isResizing && (
                <div className="viewport-loading" />
              )}
            </SelectTrigger>
            <SelectContent className="resolution-select-content">
              {VIEWPORT_PRESETS.map((preset) => {
                const PresetIcon = preset.icon;
                return (
                  <SelectItem 
                    key={preset.id} 
                    value={preset.id} 
                    className="resolution-select-item"
                  >
                    <div className="flex items-center gap-3">
                      <PresetIcon className="w-4 h-4 resolution-icon" />
                      <div className="flex flex-col">
                        <span className="font-medium">{preset.name}</span>
                        <span className="text-xs opacity-70">
                          {preset.description}
                        </span>
                      </div>
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        
        {/* Viewport change hint */}
        {showHint && (
          <div className="viewport-hint">
            🖥️ Viewport changed to {currentPreset?.name} ({currentPreset?.width}×{currentPreset?.height})
          </div>
        )}
      </>
    );
  }

  // In non-demo mode, show static badge with current viewport info
  return (
    <div className="flex items-center gap-1">
      <Badge variant="outline" className="text-xs flex items-center gap-1">
        <Icon className="w-3 h-3" />
        {currentPreset?.name || 'Desktop'}
      </Badge>
      {currentPreset && (
        <div className="viewport-size-display">
          {window.innerWidth}×{window.innerHeight}
        </div>
      )}
    </div>
  );
}

export default ResolutionSelector;