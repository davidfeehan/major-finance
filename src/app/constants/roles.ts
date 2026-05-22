/**
 * Role-Based Access Control (RBAC) System
 * Defines user roles, permissions, and access control logic
 */

export enum UserRole {
  USER = 'user',
  MODERATOR = 'moderator',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin'
}

export interface Permission {
  resource: string;
  actions: string[];
}

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  [UserRole.USER]: [
    { resource: 'profile', actions: ['read', 'write'] },
    { resource: 'missions', actions: ['read', 'complete'] },
    { resource: 'achievements', actions: ['read'] },
    { resource: 'settings', actions: ['read', 'write'] },
    { resource: 'retirement-planning', actions: ['read', 'write'] },
    { resource: 'calculators', actions: ['read', 'use'] },
    { resource: 'progress', actions: ['read'] }
  ],
  
  [UserRole.MODERATOR]: [
    // All user permissions plus:
    { resource: 'profile', actions: ['read', 'write'] },
    { resource: 'missions', actions: ['read', 'complete'] },
    { resource: 'achievements', actions: ['read'] },
    { resource: 'settings', actions: ['read', 'write'] },
    { resource: 'retirement-planning', actions: ['read', 'write'] },
    { resource: 'calculators', actions: ['read', 'use'] },
    { resource: 'progress', actions: ['read'] },
    // Moderator-specific:
    { resource: 'users', actions: ['read'] },
    { resource: 'analytics', actions: ['read'] },
    { resource: 'content', actions: ['read', 'moderate'] },
    { resource: 'feedback', actions: ['read', 'respond'] }
  ],
  
  [UserRole.ADMIN]: [
    // All moderator permissions plus:
    { resource: 'profile', actions: ['read', 'write'] },
    { resource: 'missions', actions: ['read', 'complete'] },
    { resource: 'achievements', actions: ['read'] },
    { resource: 'settings', actions: ['read', 'write'] },
    { resource: 'retirement-planning', actions: ['read', 'write'] },
    { resource: 'calculators', actions: ['read', 'use'] },
    { resource: 'progress', actions: ['read'] },
    { resource: 'users', actions: ['read', 'write', 'suspend', 'delete'] },
    { resource: 'analytics', actions: ['read', 'export'] },
    { resource: 'content', actions: ['read', 'write', 'publish'] },
    { resource: 'feedback', actions: ['read', 'respond', 'resolve'] },
    // Admin-specific:
    { resource: 'system', actions: ['read', 'configure'] },
    { resource: 'audit-logs', actions: ['read'] },
    { resource: 'support', actions: ['impersonate', 'adjust-xp', 'reset'] },
    { resource: 'security', actions: ['read', 'investigate'] }
  ],
  
  [UserRole.SUPER_ADMIN]: [
    // All admin permissions plus:
    { resource: 'profile', actions: ['read', 'write'] },
    { resource: 'missions', actions: ['read', 'complete', 'create', 'delete'] },
    { resource: 'achievements', actions: ['read', 'create', 'delete'] },
    { resource: 'settings', actions: ['read', 'write'] },
    { resource: 'retirement-planning', actions: ['read', 'write'] },
    { resource: 'calculators', actions: ['read', 'use'] },
    { resource: 'progress', actions: ['read'] },
    { resource: 'users', actions: ['read', 'write', 'suspend', 'delete'] },
    { resource: 'analytics', actions: ['read', 'export'] },
    { resource: 'content', actions: ['read', 'write', 'publish', 'delete'] },
    { resource: 'feedback', actions: ['read', 'respond', 'resolve'] },
    { resource: 'system', actions: ['read', 'configure', 'deploy', 'maintenance'] },
    { resource: 'audit-logs', actions: ['read', 'export'] },
    { resource: 'support', actions: ['impersonate', 'adjust-xp', 'reset'] },
    { resource: 'security', actions: ['read', 'investigate', 'respond'] },
    // Super Admin-specific:
    { resource: 'admins', actions: ['read', 'write', 'delete'] },
    { resource: 'roles', actions: ['read', 'write', 'assign', 'revoke'] },
    { resource: 'database', actions: ['backup', 'restore'] }
  ]
};

/**
 * Check if a role has permission for a specific action on a resource
 */
export function hasPermission(
  role: UserRole,
  resource: string,
  action: string
): boolean {
  const permissions = ROLE_PERMISSIONS[role];
  return permissions.some(
    p => p.resource === resource && p.actions.includes(action)
  );
}

/**
 * Check if a role is admin or higher
 */
export function isAdmin(role: UserRole): boolean {
  return role === UserRole.ADMIN || role === UserRole.SUPER_ADMIN;
}

/**
 * Check if a role is super admin
 */
export function isSuperAdmin(role: UserRole): boolean {
  return role === UserRole.SUPER_ADMIN;
}

/**
 * Get role display name
 */
export function getRoleDisplayName(role: UserRole): string {
  const names: Record<UserRole, string> = {
    [UserRole.USER]: 'User',
    [UserRole.MODERATOR]: 'Moderator',
    [UserRole.ADMIN]: 'Admin',
    [UserRole.SUPER_ADMIN]: 'Super Admin'
  };
  return names[role];
}

/**
 * Get role badge color
 */
export function getRoleBadgeColor(role: UserRole): string {
  const colors: Record<UserRole, string> = {
    [UserRole.USER]: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
    [UserRole.MODERATOR]: 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300',
    [UserRole.ADMIN]: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300',
    [UserRole.SUPER_ADMIN]: 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300'
  };
  return colors[role];
}

/**
 * Get role icon emoji
 */
export function getRoleIcon(role: UserRole): string {
  const icons: Record<UserRole, string> = {
    [UserRole.USER]: '👤',
    [UserRole.MODERATOR]: '🛡️',
    [UserRole.ADMIN]: '⚙️',
    [UserRole.SUPER_ADMIN]: '👑'
  };
  return icons[role];
}

/**
 * Get role hierarchy level (higher number = more permissions)
 */
export function getRoleLevel(role: UserRole): number {
  const levels: Record<UserRole, number> = {
    [UserRole.USER]: 1,
    [UserRole.MODERATOR]: 2,
    [UserRole.ADMIN]: 3,
    [UserRole.SUPER_ADMIN]: 4
  };
  return levels[role];
}

/**
 * Check if roleA can manage roleB
 * (can only manage users with lower role level)
 */
export function canManageRole(roleA: UserRole, roleB: UserRole): boolean {
  return getRoleLevel(roleA) > getRoleLevel(roleB);
}

/**
 * Get all available roles for assignment
 * (user can only assign roles lower than their own)
 */
export function getAssignableRoles(currentRole: UserRole): UserRole[] {
  const currentLevel = getRoleLevel(currentRole);
  return Object.values(UserRole).filter(
    role => getRoleLevel(role) < currentLevel
  );
}
