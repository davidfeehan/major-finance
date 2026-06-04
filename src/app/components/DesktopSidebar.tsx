import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { ResolutionSelector } from './ResolutionSelector';
import { useBankingFeature } from '../hooks/useBankingFeature';
import { 
  Home, 
  Target, 
  User, 
  Settings, 
  HelpCircle, 
  BarChart3,
  Trophy,
  Star,
  ChevronRight,
  ChevronLeft,
  CreditCard,
  Menu,
  X
} from 'lucide-react';
import { AppScreen } from '../constants';

interface UserData {
  rank: string;
  yearsOfService: string;
  xp: number;
  completedMissions: number;
  currentAge: string;
  desiredRetirementAge: string;
  avatar?: string;
}

interface NavigationItem {
  id: AppScreen;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  category?: string;
}

interface DesktopSidebarProps {
  currentScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
  userData: UserData;
  isDemo?: boolean;
}

function DesktopSidebar({ currentScreen, onNavigate, userData, isDemo = false }: DesktopSidebarProps) {
  const { isBankingEnabled } = useBankingFeature();
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('sidebar-collapsed') === 'true';
    }
    return false;
  });

  // Save collapse state
  useEffect(() => {
    localStorage.setItem('sidebar-collapsed', isCollapsed.toString());
  }, [isCollapsed]);

  // Calculate user level
  const level = Math.floor(userData.xp / 500) + 1;
  const xpToNextLevel = 500 - (userData.xp % 500);
  const levelProgress = ((userData.xp % 500) / 500) * 100;

  const allNavigationItems: NavigationItem[] = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      icon: Home,
      category: 'main'
    },
    {
      id: 'banking',
      name: 'Banking',
      icon: CreditCard,
      badge: 'NEW',
      category: 'main'
    },
    {
      id: 'missions',
      name: 'Missions',
      icon: Target,
      badge: '5',
      category: 'main'
    },
    {
      id: 'progress',
      name: 'Progress',
      icon: BarChart3,
      category: 'main'
    },
    {
      id: 'profile',
      name: 'Profile',
      icon: User,
      category: 'account'
    },
    {
      id: 'settings',
      name: 'Settings',
      icon: Settings,
      category: 'account'
    },
    {
      id: 'help',
      name: 'Help & Support',
      icon: HelpCircle,
      category: 'account'
    }
  ];

  // Filter out banking if disabled
  const navigationItems = allNavigationItems.filter(item => {
    if (item.id === 'banking') {
      return isBankingEnabled;
    }
    return true;
  });

  const mainItems = navigationItems.filter(item => item.category === 'main');
  const accountItems = navigationItems.filter(item => item.category === 'account');

  const isActive = (screenId: AppScreen) => {
    if (screenId === 'dashboard') {
      return currentScreen === 'dashboard';
    }
    if (screenId === 'missions') {
      return ['missions', 'career-map', 'emergency-fund', 'investment-basics', 'tsp-optimization', 'financial-education', 'retirement-planning', 'retirement-calculator'].includes(currentScreen);
    }
    if (screenId === 'banking') {
      return currentScreen === 'banking';
    }
    return currentScreen === screenId;
  };

  return (
    <div className={`hidden lg:flex flex-col h-full bg-sidebar border-r border-sidebar-border transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Logo & Branding */}
      <div className="p-6 border-b border-sidebar-border relative">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
            <Trophy className="w-6 h-6 text-primary-foreground" />
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-semibold text-sidebar-foreground">Major Finance</h1>
              <div className="flex items-center gap-2">
                <p className="text-sm text-sidebar-foreground/70 truncate">Military Financial Planning</p>
                <ResolutionSelector isDemo={isDemo} />
              </div>
            </div>
          )}
        </div>
        
        {/* Toggle Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-6 h-6 w-6 rounded-full border border-sidebar-border bg-sidebar shadow-sm hover:scale-110 transition-transform p-0"
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? (
            <ChevronRight className="w-3 h-3" />
          ) : (
            <ChevronLeft className="w-3 h-3" />
          )}
        </Button>
      </div>

      {/* User Profile Section */}
      {!isCollapsed && (
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="w-12 h-12 border-2 border-primary/20">
              <AvatarImage src={userData.avatar} />
              <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                {userData.rank?.[0] || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sidebar-foreground truncate">
                {userData.rank || 'Service Member'}
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  Level {level}
                </Badge>
                <span className="text-xs text-sidebar-foreground/70">
                  {userData.xp} XP
                </span>
              </div>
            </div>
          </div>

          {/* Level Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-sidebar-foreground/70">
              <span>Progress to Level {level + 1}</span>
              <span>{xpToNextLevel} XP needed</span>
            </div>
            <Progress value={levelProgress} className="h-2" />
          </div>
        </div>
      )}
      
      {/* Collapsed Profile */}
      {isCollapsed && (
        <div className="p-2 border-b border-sidebar-border flex justify-center">
          <Avatar className="w-10 h-10 border-2 border-primary/20">
            <AvatarImage src={userData.avatar} />
            <AvatarFallback className="bg-gradient-primary text-primary-foreground">
              {userData.rank?.[0] || 'U'}
            </AvatarFallback>
          </Avatar>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-6 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-sidebar [&::-webkit-scrollbar-thumb]:bg-sidebar-accent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-2 [&::-webkit-scrollbar-thumb]:border-sidebar hover:[&::-webkit-scrollbar-thumb]:bg-sidebar-accent/80">
        {/* Main Navigation */}
        <div>
          {!isCollapsed && (
            <h3 className="text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wider mb-3 px-2">
              Main
            </h3>
          )}
          <div className="space-y-1">
            {mainItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.id);
              
              return (
                <Button
                  key={item.id}
                  type="button"
                  variant={active ? "default" : "ghost"}
                  className={`w-full ${isCollapsed ? 'justify-center px-2' : 'justify-start px-3'} h-10 ${
                    active 
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground' 
                      : 'hover:bg-sidebar-accent text-sidebar-foreground hover:text-sidebar-accent-foreground'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('[DesktopSidebar Main] Clicked:', item.id);
                    onNavigate(item.id);
                  }}
                  title={isCollapsed ? item.name : undefined}
                >
                  <Icon className={`w-4 h-4 ${!isCollapsed ? 'mr-3' : ''}`} />
                  {!isCollapsed && (
                    <>
                      <span className="flex-1 text-left">{item.name}</span>
                      {item.badge && (
                        <Badge 
                          variant={active ? "secondary" : "outline"} 
                          className="text-xs"
                        >
                          {item.badge}
                        </Badge>
                      )}
                      {active && (
                        <ChevronRight className="w-4 h-4 ml-2" />
                      )}
                    </>
                  )}
                  {isCollapsed && item.badge && (
                    <div className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></div>
                  )}
                </Button>
              );
            })}
          </div>
        </div>

        <Separator />

        {/* Account Navigation */}
        <div>
          {!isCollapsed && (
            <h3 className="text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wider mb-3 px-2">
              Account
            </h3>
          )}
          <div className="space-y-1">
            {accountItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.id);
              
              return (
                <Button
                  key={item.id}
                  type="button"
                  variant={active ? "default" : "ghost"}
                  className={`w-full ${isCollapsed ? 'justify-center px-2' : 'justify-start px-3'} h-10 ${
                    active 
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground' 
                      : 'hover:bg-sidebar-accent text-sidebar-foreground hover:text-sidebar-accent-foreground'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('[DesktopSidebar Account] Clicked:', item.id);
                    onNavigate(item.id);
                  }}
                  title={isCollapsed ? item.name : undefined}
                >
                  <Icon className={`w-4 h-4 ${!isCollapsed ? 'mr-3' : ''}`} />
                  {!isCollapsed && <span>{item.name}</span>}
                </Button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Quick Stats */}
      <div className={isCollapsed ? "p-2 border-t border-sidebar-border" : "p-4 border-t border-sidebar-border"}>
        <Card 
          className="border-sidebar-border bg-sidebar-accent/50 cursor-pointer hover:bg-sidebar-accent/70 transition-colors"
          onClick={() => onNavigate('progress')}
        >
          <CardContent className={isCollapsed ? "p-2" : "p-4"}>
            {isCollapsed ? (
              <div className="flex justify-center">
                <div className="w-8 h-8 bg-gradient-to-br from-success to-success/80 rounded-full flex items-center justify-center">
                  <Trophy className="w-4 h-4 text-white" />
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-success to-success/80 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-sidebar-foreground">Quick Stats</p>
                    <p className="text-xs text-sidebar-foreground/70">Your progress</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div>
                    <p className="text-lg font-semibold text-sidebar-foreground">
                      {userData.completedMissions}
                    </p>
                    <p className="text-xs text-sidebar-foreground/70">Missions</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-sidebar-foreground">
                      {level}
                    </p>
                    <p className="text-xs text-sidebar-foreground/70">Level</p>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default DesktopSidebar;