import React, { useEffect, useState } from 'react';
import { 
  Home, 
  User, 
  Settings, 
  HelpCircle, 
  Target,
  Trophy,
  CreditCard
} from 'lucide-react';
import { useBankingFeature } from '../hooks/useBankingFeature';

interface BottomNavigationProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
  userData?: {
    xp: number;
    completedMissions: number;
  };
}

function BottomNavigation({ currentScreen, onNavigate, userData }: BottomNavigationProps) {
  const { isBankingEnabled } = useBankingFeature();

  const allNavItems = [
    {
      id: 'dashboard',
      label: 'Home',
      icon: Home,
      badge: null
    },
    {
      id: 'banking',
      label: 'Banking',
      icon: CreditCard,
      badge: null
    },
    {
      id: 'missions',
      label: 'Missions',
      icon: Target,
      badge: null
    },
    {
      id: 'progress',
      label: 'Progress', 
      icon: Trophy,
      badge: userData?.completedMissions || null
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      badge: null
    }
  ];

  // Filter out banking if disabled
  const navItems = allNavItems.filter(item => {
    if (item.id === 'banking') {
      return isBankingEnabled;
    }
    return true;
  });

  const isActive = (screenId: string) => {
    // Special cases for nested screens
    if (screenId === 'dashboard') {
      return currentScreen === 'dashboard';
    }
    if (screenId === 'missions') {
      return ['missions', 'emergency-fund', 'investment-basics', 'tsp-optimization', 'financial-education', 'retirement-planning', 'retirement-calculator'].includes(currentScreen);
    }
    if (screenId === 'banking') {
      return currentScreen === 'banking';
    }
    return currentScreen === screenId;
  };

  return (
    <>
      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50 md:hidden">
        <div className="flex items-center justify-around py-2 px-4 safe-area-pb">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.id);
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-colors relative ${
                  active 
                    ? 'text-primary bg-primary/10' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <div className="relative">
                  <Icon className="w-5 h-5 mb-1" />
                  {item.badge && item.badge > 0 && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                      {item.badge > 99 ? '99+' : item.badge}
                    </div>
                  )}
                </div>
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:fixed md:left-0 md:top-0 md:bottom-0 md:w-64 md:bg-background md:border-r md:border-border md:flex-col md:z-40">
        <div className="p-6 border-b border-border">
          <h2 className="font-semibold text-lg">Major Finance</h2>
          {userData && (
            <div className="mt-2 text-sm text-muted-foreground">
              <p>Level {Math.floor(userData.xp / 500) + 1}</p>
              <p>{userData.xp} XP</p>
            </div>
          )}
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.id);
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left ${
                  active 
                    ? 'text-primary bg-primary/10' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <div className="relative">
                  <Icon className="w-5 h-5" />
                  {item.badge && item.badge > 0 && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                      {item.badge > 99 ? '99+' : item.badge}
                    </div>
                  )}
                </div>
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <button
            onClick={() => onNavigate('help')}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left text-muted-foreground hover:text-foreground hover:bg-muted"
          >
            <HelpCircle className="w-5 h-5" />
            <span className="font-medium">Help & Support</span>
          </button>
        </div>
      </div>

      {/* Mobile bottom spacing */}
      <div className="h-16 md:hidden" />
      
      {/* Desktop left spacing */}
      <div className="hidden md:block md:w-64" />
    </>
  );
}

export default BottomNavigation;