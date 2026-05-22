import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { 
  Shield, 
  Users, 
  BarChart3, 
  Settings, 
  Database,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Download,
  Eye,
  UserCog,
  Activity,
  Lock,
  FileText,
  TrendingUp,
  Search
} from 'lucide-react';
import { UserRole, getRoleDisplayName, getRoleBadgeColor, getRoleIcon } from '../constants/roles';
import { toast } from 'sonner';

interface AdminSettingsTabProps {
  role: UserRole;
  accessToken: string;
  onNavigate?: (screen: string) => void;
}

export function AdminSettingsTab({ role, accessToken, onNavigate }: AdminSettingsTabProps) {
  const [systemStatus, setSystemStatus] = useState<'healthy' | 'warning' | 'error'>('healthy');
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalMissions: 100,
    completionRate: 0,
    avgXP: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    setIsLoading(true);
    try {
      // In a real implementation, this would fetch from API
      // For now, using mock data
      setStats({
        totalUsers: 1247,
        activeUsers: 892,
        totalMissions: 100,
        completionRate: 34.2,
        avgXP: 2156
      });
      setSystemStatus('healthy');
    } catch (error) {
      console.error('Failed to load admin data:', error);
      toast.error('Failed to load admin data');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMaintenanceMode = () => {
    setMaintenanceMode(!maintenanceMode);
    toast.success(maintenanceMode ? 'Maintenance mode disabled' : 'Maintenance mode enabled');
  };

  const handleExportAllData = () => {
    toast.success('Exporting all user data... This may take a few minutes.');
    // In production, this would trigger a background job
  };

  const handleViewAuditLogs = () => {
    if (onNavigate) {
      onNavigate('admin-audit-logs');
    } else {
      toast.info('Audit logs viewer coming soon');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'text-green-600 dark:text-green-400';
      case 'warning':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'error':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle2 className="w-5 h-5" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5" />;
      case 'error':
        return <AlertTriangle className="w-5 h-5" />;
      default:
        return <Activity className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Admin Role Badge */}
      <Card className="border-primary/50 bg-gradient-to-r from-primary/5 to-primary/10">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-2xl">
              {getRoleIcon(role)}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold">Admin Panel</h3>
                <Badge className={getRoleBadgeColor(role)}>
                  {getRoleDisplayName(role)}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                You have administrative access to manage users, content, and system settings
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            System Status
          </CardTitle>
          <CardDescription>
            Real-time system health and performance metrics
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div className="flex items-center gap-3">
              <div className={getStatusColor(systemStatus)}>
                {getStatusIcon(systemStatus)}
              </div>
              <div>
                <div className="font-medium">System Health</div>
                <div className="text-sm text-muted-foreground capitalize">{systemStatus}</div>
              </div>
            </div>
            <Badge variant={systemStatus === 'healthy' ? 'default' : 'destructive'}>
              {systemStatus === 'healthy' ? 'All Systems Operational' : 'Issues Detected'}
            </Badge>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3 bg-muted rounded-lg text-center">
              <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Total Users</div>
            </div>
            <div className="p-3 bg-muted rounded-lg text-center">
              <div className="text-2xl font-bold">{stats.activeUsers.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Active (7d)</div>
            </div>
            <div className="p-3 bg-muted rounded-lg text-center">
              <div className="text-2xl font-bold">{stats.completionRate}%</div>
              <div className="text-xs text-muted-foreground">Completion</div>
            </div>
            <div className="p-3 bg-muted rounded-lg text-center">
              <div className="text-2xl font-bold">{stats.avgXP.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Avg XP</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Quick Actions
          </CardTitle>
          <CardDescription>
            Common administrative tasks and tools
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              className="justify-start h-auto py-3"
              onClick={() => onNavigate?.('admin-users')}
            >
              <Users className="w-4 h-4 mr-2" />
              <div className="text-left">
                <div className="font-medium">User Management</div>
                <div className="text-xs text-muted-foreground">View and manage all users</div>
              </div>
            </Button>

            <Button 
              variant="outline" 
              className="justify-start h-auto py-3"
              onClick={() => onNavigate?.('admin-analytics')}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              <div className="text-left">
                <div className="font-medium">Analytics Dashboard</div>
                <div className="text-xs text-muted-foreground">View detailed metrics</div>
              </div>
            </Button>

            <Button 
              variant="outline" 
              className="justify-start h-auto py-3"
              onClick={handleViewAuditLogs}
            >
              <FileText className="w-4 h-4 mr-2" />
              <div className="text-left">
                <div className="font-medium">Audit Logs</div>
                <div className="text-xs text-muted-foreground">View all system actions</div>
              </div>
            </Button>

            <Button 
              variant="outline" 
              className="justify-start h-auto py-3"
              onClick={() => onNavigate?.('admin-content')}
            >
              <Database className="w-4 h-4 mr-2" />
              <div className="text-left">
                <div className="font-medium">Content Management</div>
                <div className="text-xs text-muted-foreground">Manage missions & achievements</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* System Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            System Configuration
          </CardTitle>
          <CardDescription>
            Control system-wide settings and features
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {role === UserRole.SUPER_ADMIN && (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="maintenance-mode" className="text-base">Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Disable app access for non-admin users
                  </p>
                </div>
                <Switch
                  id="maintenance-mode"
                  checked={maintenanceMode}
                  onCheckedChange={toggleMaintenanceMode}
                />
              </div>

              <Separator />
            </>
          )}

          <div className="space-y-2">
            <Label className="text-base">Data Management</Label>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={handleExportAllData}
            >
              <Download className="w-4 h-4 mr-2" />
              Export All User Data (CSV)
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* User Management Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Recent Users
          </CardTitle>
          <CardDescription>
            Recently registered users (last 24 hours)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: 'John Martinez', email: 'john.m@army.mil', time: '2 hours ago', status: 'active' },
              { name: 'Sarah Johnson', email: 'sarah.j@navy.mil', time: '5 hours ago', status: 'active' },
              { name: 'Mike Wilson', email: 'mike.w@usaf.mil', time: '8 hours ago', status: 'active' }
            ].map((user, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-xs text-muted-foreground">{user.email}</div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="mb-1">Active</Badge>
                  <div className="text-xs text-muted-foreground">{user.time}</div>
                </div>
              </div>
            ))}
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => onNavigate?.('admin-users')}
            >
              <Users className="w-4 h-4 mr-2" />
              View All Users
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Security & Compliance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Security & Compliance
          </CardTitle>
          <CardDescription>
            Monitor security and ensure compliance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3 bg-muted rounded-lg text-center">
              <div className="text-lg font-bold text-green-600 dark:text-green-400">0</div>
              <div className="text-xs text-muted-foreground">Security Alerts</div>
            </div>
            <div className="p-3 bg-muted rounded-lg text-center">
              <div className="text-lg font-bold">24</div>
              <div className="text-xs text-muted-foreground">Failed Logins</div>
            </div>
            <div className="p-3 bg-muted rounded-lg text-center">
              <div className="text-lg font-bold">1,247</div>
              <div className="text-xs text-muted-foreground">Audit Events</div>
            </div>
          </div>

          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={handleViewAuditLogs}
          >
            <Eye className="w-4 h-4 mr-2" />
            View Audit Logs
          </Button>
        </CardContent>
      </Card>

      {/* Admin Info */}
      <Card className="border-yellow-200 dark:border-yellow-900 bg-yellow-50 dark:bg-yellow-950/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 shrink-0 mt-0.5" />
            <div className="space-y-2 text-sm">
              <p className="font-medium text-yellow-900 dark:text-yellow-100">
                Admin Access Guidelines
              </p>
              <ul className="text-yellow-800 dark:text-yellow-200 space-y-1 text-xs">
                <li>• All admin actions are logged and auditable</li>
                <li>• Use admin access responsibly and only when necessary</li>
                <li>• Never share admin credentials or impersonate users without valid reason</li>
                <li>• Report any suspicious activity immediately</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
