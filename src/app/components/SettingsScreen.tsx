import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Settings, 
  Bell, 
  Moon, 
  Sun,
  Shield, 
  Database,
  Smartphone,
  Mail,
  LogOut,
  Trash2,
  Download,
  AlertTriangle,
  ExternalLink,
  Palette,
  Monitor,
  BookOpen,
  Video,
  Star,
  Code,
  Bug,
  Terminal,
  Rocket,
  CheckCircle2,
  XCircle,
  Clock,
  FileText,
  Apple,
  PlayCircle,
  Crown,
  CreditCard,
  Wallet
} from 'lucide-react';
import { supabase } from '../utils/supabase/client';
import { useTheme, MILITARY_THEMES, type MilitaryBranch } from './ThemeProvider';
import { useDeveloperMode } from '../hooks/useDeveloperMode';
import { useBankingFeature } from '../hooks/useBankingFeature';
import { useRole } from '../hooks/useRole';
import { exportUserData, downloadUserData, deleteUserAccount, exportDemoData, clearLocalUserData } from '../utils/dataManagement';
import { AdminSettingsTab } from './AdminSettingsTab';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';

interface SettingsScreenProps {
  accessToken: string;
  isDemo: boolean;
  onSignOut: () => void;
  onNavigate?: (screen: string) => void;
}

export function SettingsScreen({ accessToken, isDemo, onSignOut, onNavigate }: SettingsScreenProps) {
  const { theme, setTheme, toggleMode } = useTheme();
  const { isDeveloperMode, toggleDeveloperMode } = useDeveloperMode();
  const { isBankingEnabled, toggleBankingFeature } = useBankingFeature();
  const { role } = useRole();
  const [isExporting, setIsExporting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [settings, setSettings] = useState({
    notifications: {
      missionReminders: true,
      weeklyProgress: true,
      levelUp: true,
      emailUpdates: false
    },
    privacy: {
      dataCollection: true,
      analytics: true
    }
  });

  const toggleSetting = (category: string, key: string) => {
    setSettings(prev => {
      const categorySettings = prev[category as keyof typeof prev] as Record<string, boolean>;
      return {
        ...prev,
        [category]: {
          ...categorySettings,
          [key]: !categorySettings[key]
        }
      };
    });
  };

  const handleBranchChange = (branch: string) => {
    setTheme({
      ...theme,
      branch: branch as MilitaryBranch
    });
  };

  const handleSignOut = async () => {
    try {
      if (!isDemo) {
        await supabase.auth.signOut();
      }
      onSignOut();
    } catch (error) {
      console.error('Sign out error:', error);
      onSignOut(); // Sign out anyway
    }
  };

  const handleExportData = async () => {
    setIsExporting(true);
    
    try {
      if (isDemo) {
        // Export demo data
        const demoData = exportDemoData();
        downloadUserData(demoData);
        toast.success('Demo data exported successfully!');
      } else {
        // Export real user data
        const userData = await exportUserData(accessToken);
        downloadUserData(userData);
        toast.success('Your data has been exported successfully!');
      }
    } catch (error: any) {
      toast.error(error.message ||'Failed to export data');
    } finally {
      setIsExporting(false);
    }
  };

  const handleDeleteAccount = () => {
    setShowDeleteDialog(true);
  };

  const confirmDeleteAccount = async () => {
    if (deleteConfirmText !== 'DELETE') {
      toast.error('Please type DELETE to confirm');
      return;
    }

    setIsDeleting(true);
    
    try {
      if (isDemo) {
        // Just clear local data for demo
        clearLocalUserData();
        toast.success('Demo data cleared!');
        onSignOut();
      } else {
        // Delete real account
        const { data: { user } } = await supabase.auth.getUser(accessToken);
        if (user) {
          await deleteUserAccount(accessToken, user.id);
          toast.success('Account deleted successfully');
          onSignOut();
        }
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete account');
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
      setDeleteConfirmText('');
    }
  };

  return (
    <div className="min-h-full bg-background p-4 md:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-2">
          <Settings className="w-6 h-6" />
          <h1>Settings</h1>
          {isDemo && (
            <Badge variant="outline" className="ml-2">Demo Mode</Badge>
          )}
        </div>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
            </CardTitle>
            <CardDescription>
              Manage how you receive updates and reminders
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="mission-reminders" className="text-base">Mission Reminders</Label>
                <p className="text-sm text-muted-foreground">Get reminded about uncompleted missions</p>
              </div>
              <Switch
                id="mission-reminders"
                checked={settings.notifications.missionReminders}
                onCheckedChange={() => toggleSetting('notifications', 'missionReminders')}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="weekly-progress" className="text-base">Weekly Progress</Label>
                <p className="text-sm text-muted-foreground">Weekly summary of your financial progress</p>
              </div>
              <Switch
                id="weekly-progress"
                checked={settings.notifications.weeklyProgress}
                onCheckedChange={() => toggleSetting('notifications', 'weeklyProgress')}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="level-up" className="text-base">Level Up Notifications</Label>
                <p className="text-sm text-muted-foreground">Celebrate when you reach a new level</p>
              </div>
              <Switch
                id="level-up"
                checked={settings.notifications.levelUp}
                onCheckedChange={() => toggleSetting('notifications', 'levelUp')}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-updates" className="text-base">Email Updates</Label>
                <p className="text-sm text-muted-foreground">Receive financial tips and app updates via email</p>
              </div>
              <Switch
                id="email-updates"
                checked={settings.notifications.emailUpdates}
                onCheckedChange={() => toggleSetting('notifications', 'emailUpdates')}
              />
            </div>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Appearance
            </CardTitle>
            <CardDescription>
              Customize the look and feel of the app
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Theme Mode Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="theme-mode" className="text-base">Theme Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Switch between light and dark mode
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={toggleMode}
                className="flex items-center gap-2"
              >
                {theme.mode === 'light' ? (
                  <>
                    <Moon className="w-4 h-4" />
                    Dark
                  </>
                ) : (
                  <>
                    <Sun className="w-4 h-4" />
                    Light
                  </>
                )}
              </Button>
            </div>

            <Separator />

            {/* Military Branch Selection */}
            <div className="space-y-3">
              <div>
                <Label htmlFor="military-branch" className="text-base">Military Theme</Label>
                <p className="text-sm text-muted-foreground">
                  Choose your branch theme or use Joint Forces
                </p>
              </div>
              <Select value={theme.branch} onValueChange={handleBranchChange}>
                <SelectTrigger>
                  <SelectValue>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">
                        {MILITARY_THEMES[theme.branch].icon}
                      </span>
                      <span>{MILITARY_THEMES[theme.branch].name}</span>
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(MILITARY_THEMES).map(([key, themeInfo]) => (
                    <SelectItem key={key} value={key}>
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{themeInfo.icon}</span>
                        <div>
                          <div className="font-medium">{themeInfo.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {themeInfo.description}
                          </div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Current Theme Info */}
            <div className="p-3 bg-muted rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-4 h-4 bg-primary rounded-full"></div>
                <span className="font-medium">Current Theme</span>
              </div>
              <div className="text-sm text-muted-foreground">
                {MILITARY_THEMES[theme.branch].name} • {theme.mode === 'light' ? 'Light Mode' : 'Dark Mode'}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {MILITARY_THEMES[theme.branch].description}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Getting Started & Tutorial */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Getting Started
            </CardTitle>
            <CardDescription>
              Learn how to use Major Finance with Sergeant Martinez
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Martinez Story Tutorial */}
            <div className="p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border border-primary/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center shrink-0">
                  <Star className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold mb-1">Martinez's Story</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Learn from Sergeant Martinez's 12-year financial journey from -$2,000 to $258,400 in assets
                  </p>
                  <Button
                    onClick={() => {
                      // Clear tutorial completion flags
                      localStorage.removeItem('major-finance-tutorial-completed');
                      localStorage.removeItem('major-finance-tutorial-skipped');
                      localStorage.removeItem('major-finance-tutorial-completed-date');
                      localStorage.removeItem('major-finance-tutorial-step');
                      
                      // Navigate to dashboard where tutorial will auto-trigger
                      if (onNavigate) {
                        onNavigate('dashboard');
                      } else {
                        // Fallback to reload if no navigate handler
                        window.location.reload();
                      }
                    }}
                    className="bg-gradient-primary"
                  >
                    <Video className="w-4 h-4 mr-2" />
                    Replay Story
                  </Button>
                </div>
              </div>
            </div>

            {/* Interactive Walkthrough */}
            <div className="p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border border-primary/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center shrink-0">
                  <Monitor className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold mb-1">Interactive UI Tour</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Take an interactive walkthrough that highlights where everything is located in the app
                  </p>
                  <Button
                    onClick={() => {
                      // Clear walkthrough completion flags
                      localStorage.removeItem('major-finance-walkthrough-completed');
                      localStorage.removeItem('major-finance-walkthrough-skipped');
                      localStorage.removeItem('major-finance-walkthrough-completed-date');
                      
                      // Navigate to dashboard where walkthrough will auto-trigger
                      if (onNavigate) {
                        onNavigate('dashboard');
                      } else {
                        // Fallback to reload if no navigate handler
                        window.location.reload();
                      }
                    }}
                    variant="outline"
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Replay Tour
                  </Button>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Martinez's Story</span>
                <Badge variant="secondary">
                  {localStorage.getItem('major-finance-tutorial-completed') ? 'Completed' : 'Not Started'}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Interactive Tour</span>
                <Badge variant="secondary">
                  {localStorage.getItem('major-finance-walkthrough-completed') ? 'Completed' : 'Not Started'}
                </Badge>
              </div>
              {localStorage.getItem('major-finance-tutorial-completed-date') && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Story Completed On</span>
                  <span className="text-sm text-muted-foreground">
                    {new Date(localStorage.getItem('major-finance-tutorial-completed-date')!).toLocaleDateString()}
                  </span>
                </div>
              )}
              {localStorage.getItem('major-finance-walkthrough-completed-date') && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Tour Completed On</span>
                  <span className="text-sm text-muted-foreground">
                    {new Date(localStorage.getItem('major-finance-walkthrough-completed-date')!).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Privacy & Security
            </CardTitle>
            <CardDescription>
              Control your data and privacy settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="data-collection" className="text-base">Improve App Experience</Label>
                <p className="text-sm text-muted-foreground">Help us improve by sharing usage data</p>
              </div>
              <Switch
                id="data-collection"
                checked={settings.privacy.dataCollection}
                onCheckedChange={() => toggleSetting('privacy', 'dataCollection')}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="analytics" className="text-base">Analytics</Label>
                <p className="text-sm text-muted-foreground">Allow anonymous usage analytics</p>
              </div>
              <Switch
                id="analytics"
                checked={settings.privacy.analytics}
                onCheckedChange={() => toggleSetting('privacy', 'analytics')}
              />
            </div>
          </CardContent>
        </Card>

        {/* Developer Mode */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="w-5 h-5" />
              Developer Mode
            </CardTitle>
            <CardDescription>
              Show debugging tools and testing features
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="developer-mode" className="text-base">Enable Developer Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Show resolution selector, debug screens, and testing tools
                </p>
              </div>
              <Switch
                id="developer-mode"
                checked={isDeveloperMode}
                onCheckedChange={toggleDeveloperMode}
              />
            </div>

            {isDeveloperMode && (
              <>
                <Separator />
                
                <div className="p-3 bg-muted rounded-lg space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Terminal className="w-4 h-4" />
                    Developer Tools Active
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-1 ml-6">
                    <li>• Resolution selector in header</li>
                    <li>• Debug screens accessible</li>
                    <li>• Console logging enabled</li>
                    <li>• Demo mode indicator visible</li>
                  </ul>
                </div>

                <Separator />

                {/* Banking Features Toggle */}
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="banking-features" className="text-base flex items-center gap-2">
                      <Wallet className="w-4 h-4" />
                      Banking Features
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Show/hide all banking functionality in the app
                    </p>
                  </div>
                  <Switch
                    id="banking-features"
                    checked={isBankingEnabled}
                    onCheckedChange={toggleBankingFeature}
                  />
                </div>

                {/* Banking Feature Details */}
                <div className={`p-3 rounded-lg border transition-all ${
                  isBankingEnabled 
                    ? 'bg-green-500/10 border-green-500/20' 
                    : 'bg-orange-500/10 border-orange-500/20'
                }`}>
                  <div className="flex items-start gap-2">
                    <div className="shrink-0 mt-0.5">
                      {isBankingEnabled ? (
                        <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                      ) : (
                        <XCircle className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium mb-1">
                        {isBankingEnabled ? 'Banking Enabled' : 'Banking Disabled'}
                      </div>
                      <div className="text-xs text-muted-foreground space-y-1">
                        {isBankingEnabled ? (
                          <>
                            <div>✓ Banking screen accessible</div>
                            <div>✓ Banking tab visible in navigation</div>
                            <div>✓ Account balances shown on dashboard</div>
                            <div>✓ Banking AI assistant available</div>
                          </>
                        ) : (
                          <>
                            <div>✗ Banking screen hidden</div>
                            <div>✗ Banking tab removed from navigation</div>
                            <div>✗ Account information not displayed</div>
                            <div>✗ Banking AI assistant disabled</div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {onNavigate && (
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">Debug Screens</Label>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start" 
                      onClick={() => onNavigate('nav-test')}
                      size="sm"
                    >
                      <Bug className="w-4 h-4 mr-2" />
                      Navigation Test
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full justify-start" 
                      onClick={() => onNavigate('desktop-layout-test')}
                      size="sm"
                    >
                      <Monitor className="w-4 h-4 mr-2" />
                      Desktop Layout Test
                    </Button>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>

        {/* App Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="w-5 h-5" />
              App Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Version</span>
              <Badge variant="secondary">1.0.0</Badge>
            </div>
            
            <Separator />
            
            <div className="flex justify-between items-center">
              <span>Account Type</span>
              <Badge variant={isDemo ? "outline" : "default"}>
                {isDemo ? 'Demo' : 'Registered'}
              </Badge>
            </div>
            
            <Separator />
            
            <Button variant="outline" className="w-full justify-start" onClick={handleExportData}>
              <Download className="w-4 h-4 mr-2" />
              Export My Data
            </Button>
            
            {isDeveloperMode && onNavigate && (
              <>
                <Separator />
                <div className="text-xs text-muted-foreground mb-2">Legacy Debug Options</div>
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={() => onNavigate('nav-test')}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Navigation Test (Debug)
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={() => onNavigate('desktop-layout-test')}
                >
                  <Monitor className="w-4 h-4 mr-2" />
                  Desktop Layout Test (Debug)
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        {/* Release Notes & Launch Tips */}
        <Card className="border-primary/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Rocket className="w-5 h-5" />
              Release Notes & Launch Tips
            </CardTitle>
            <CardDescription>
              Version history and App Store preparation guide
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Current Version Info */}
            <div className="p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="default">v1.0.0</Badge>
                <Badge variant="outline">Pre-Production</Badge>
              </div>
              <h3 className="font-semibold mb-2">Current Version</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Mission-based gamification system</li>
                <li>• Military branch theming (7 branches)</li>
                <li>• Comprehensive retirement calculators</li>
                <li>• Supabase backend integration</li>
                <li>• Password security features</li>
                <li>• Demo mode with Sgt. Martinez story</li>
              </ul>
            </div>

            <Separator />

            {/* Production Readiness */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Apple className="w-4 h-4" />
                App Store Readiness Checklist
              </h3>
              
              <div className="space-y-3">
                {/* Critical Items */}
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-red-600 dark:text-red-400 mb-1">
                    🔴 CRITICAL - Must Complete
                  </div>
                  
                  <div className="flex items-start gap-2 p-2 bg-muted/50 rounded">
                    <XCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium">Privacy Policy & Terms of Service</div>
                      <div className="text-xs text-muted-foreground">Required by App Store. Must be publicly accessible URLs.</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 p-2 bg-muted/50 rounded">
                    <XCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium">Functional Data Export/Deletion</div>
                      <div className="text-xs text-muted-foreground">GDPR/CCPA compliance. Users must be able to export and delete their data.</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 p-2 bg-muted/50 rounded">
                    <XCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium">Security Audit</div>
                      <div className="text-xs text-muted-foreground">Penetration testing and Supabase RLS policy review required.</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 p-2 bg-muted/50 rounded">
                    <XCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium">Apple Developer Account</div>
                      <div className="text-xs text-muted-foreground">$99/year enrollment required to publish to App Store.</div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Important Items */}
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-yellow-600 dark:text-yellow-400 mb-1">
                    ⚠️ IMPORTANT - Strongly Recommended
                  </div>

                  <div className="flex items-start gap-2 p-2 bg-muted/50 rounded">
                    <Clock className="w-4 h-4 text-yellow-600 dark:text-yellow-400 shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium">Comprehensive Testing</div>
                      <div className="text-xs text-muted-foreground">Unit, integration, and end-to-end tests. Target 80%+ coverage.</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 p-2 bg-muted/50 rounded">
                    <Clock className="w-4 h-4 text-yellow-600 dark:text-yellow-400 shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium">WCAG 2.1 AA Accessibility</div>
                      <div className="text-xs text-muted-foreground">Screen reader testing, color contrast, keyboard navigation.</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 p-2 bg-muted/50 rounded">
                    <Clock className="w-4 h-4 text-yellow-600 dark:text-yellow-400 shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium">Performance Optimization</div>
                      <div className="text-xs text-muted-foreground">Bundle size reduction, lazy loading, caching strategy.</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 p-2 bg-muted/50 rounded">
                    <Clock className="w-4 h-4 text-yellow-600 dark:text-yellow-400 shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium">TestFlight Beta Testing</div>
                      <div className="text-xs text-muted-foreground">Minimum 2 weeks with 50-100 beta testers recommended.</div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Completed Items */}
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-green-600 dark:text-green-400 mb-1">
                    ✅ COMPLETED
                  </div>

                  <div className="flex items-start gap-2 p-2 bg-muted/50 rounded">
                    <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium">Core Features</div>
                      <div className="text-xs text-muted-foreground">Mission system, calculators, theming, authentication.</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 p-2 bg-muted/50 rounded">
                    <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium">Backend Integration</div>
                      <div className="text-xs text-muted-foreground">Supabase auth, data persistence, demo mode.</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 p-2 bg-muted/50 rounded">
                    <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium">User Experience</div>
                      <div className="text-xs text-muted-foreground">Tutorial system, password security, responsive design.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* App Store Assets Required */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Required App Store Assets
              </h3>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                  <span>App Icon (1024x1024)</span>
                  <Badge variant="outline">Needed</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                  <span>Screenshots (all device sizes)</span>
                  <Badge variant="outline">Needed</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                  <span>App Preview Video</span>
                  <Badge variant="secondary">Optional</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                  <span>App Description & Keywords</span>
                  <Badge variant="outline">Needed</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                  <span>Support URL</span>
                  <Badge variant="outline">Needed</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                  <span>Marketing Website</span>
                  <Badge variant="secondary">Recommended</Badge>
                </div>
              </div>
            </div>

            <Separator />

            {/* Timeline Estimate */}
            <div className="p-4 bg-gradient-to-r from-blue-500/10 to-blue-500/5 rounded-lg border border-blue-500/20">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold mb-2">Estimated Timeline to Production</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center justify-between">
                      <span>Critical Fixes (Legal, Security)</span>
                      <span className="font-medium">4-6 weeks</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Quality & Polish (Testing, A11y)</span>
                      <span className="font-medium">3-4 weeks</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Marketing & Beta Testing</span>
                      <span className="font-medium">2-3 weeks</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>App Store Review</span>
                      <span className="font-medium">1-2 weeks</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between font-semibold text-foreground">
                      <span>Total Estimated Time</span>
                      <span>10-15 weeks</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Launch Tips */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <PlayCircle className="w-4 h-4" />
                Launch Tips & Best Practices
              </h3>
              
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="font-medium mb-1">🎯 Soft Launch Strategy</div>
                  <div className="text-xs text-muted-foreground">
                    Consider releasing to select military bases first (e.g., Fort Bragg, Camp Pendleton) to gather feedback before national launch.
                  </div>
                </div>

                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="font-medium mb-1">🤝 Partner with Military Organizations</div>
                  <div className="text-xs text-muted-foreground">
                    Reach out to Military OneSource, USAA, Navy Federal for potential partnerships and credibility.
                  </div>
                </div>

                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="font-medium mb-1">📊 Set Up Analytics from Day 1</div>
                  <div className="text-xs text-muted-foreground">
                    Implement Mixpanel/Amplitude to track mission completion rates, user retention, and feature usage.
                  </div>
                </div>

                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="font-medium mb-1">🔒 Financial Data Disclaimer</div>
                  <div className="text-xs text-muted-foreground">
                    Clearly state that Major Finance is for planning purposes only and not professional financial advice. Consider requiring verification for military status.
                  </div>
                </div>

                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="font-medium mb-1">📱 App Store Optimization (ASO)</div>
                  <div className="text-xs text-muted-foreground">
                    Keywords: \"military retirement\", \"TSP calculator\", \"veteran finance\", \"military budget\". Target market: 1.3M active duty + 18M veterans.
                  </div>
                </div>

                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="font-medium mb-1">⚖️ Legal Consultation Required</div>
                  <div className="text-xs text-muted-foreground">
                    Consult with attorney specializing in financial apps for GLBA compliance, privacy policy, and terms of service.
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Full Review Link */}
            {isDeveloperMode && (
              <div className="p-4 bg-gradient-to-r from-purple-500/10 to-purple-500/5 rounded-lg border border-purple-500/20">
                <div className="flex items-start gap-3">
                  <Terminal className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold mb-1">Developer Mode Active</h3>
                    <p className="text-xs text-muted-foreground mb-2">
                      Full multi-agent review available with detailed recommendations from UX, Security, Performance, Business, Accessibility, and DevOps perspectives.
                    </p>
                    <div className="text-xs text-muted-foreground">
                      📄 See <code className="px-1 py-0.5 bg-muted rounded">/AI_AGENTS_REVIEW.md</code> for complete analysis
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Legal & Support */}
        <Card>
          <CardHeader>
            <CardTitle>Legal & Support</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="ghost" className="w-full justify-start">
              <ExternalLink className="w-4 h-4 mr-2" />
              Privacy Policy
            </Button>
            
            <Button variant="ghost" className="w-full justify-start">
              <ExternalLink className="w-4 h-4 mr-2" />
              Terms of Service
            </Button>
            
            <Button variant="ghost" className="w-full justify-start">
              <Mail className="w-4 h-4 mr-2" />
              Contact Support
            </Button>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              Account Actions
            </CardTitle>
            <CardDescription>
              Actions that affect your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={handleSignOut}
            >
              <LogOut className="w-4 h-4 mr-2" />
              {isDemo ? 'Exit Demo Mode' : 'Sign Out'}
            </Button>
            
            {!isDemo && (
              <Button 
                variant="destructive" 
                className="w-full justify-start"
                onClick={handleDeleteAccount}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Account
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Delete Account Confirmation Dialog */}
        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Account</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete your account? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setShowDeleteDialog(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmDeleteAccount}
                className="bg-red-500 hover:bg-red-600"
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </AlertDialogAction>
            </AlertDialogFooter>
            <div className="mt-4">
              <Label className="text-sm text-muted-foreground">Type "DELETE" to confirm:</Label>
              <input
                type="text"
                className="w-full px-2 py-1 border border-muted-foreground rounded"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value.toUpperCase())}
              />
            </div>
          </AlertDialogContent>
        </AlertDialog>

        {/* Admin Settings Tab */}
        {role === 'admin' && (
          <Tabs defaultValue="admin-settings">
            <TabsList>
              <TabsTrigger value="admin-settings">Admin Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="admin-settings">
              <AdminSettingsTab />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}