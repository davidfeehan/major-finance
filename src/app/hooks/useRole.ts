import { useState, useEffect, useCallback } from 'react';
import { UserRole, hasPermission, isAdmin, isSuperAdmin } from '../constants/roles';
import { supabase } from '../utils/supabase/client';

interface UseRoleReturn {
  role: UserRole;
  isLoading: boolean;
  error: string | null;
  hasPermission: (resource: string, action: string) => boolean;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  canAccessAdminPanel: boolean;
  refreshRole: () => Promise<void>;
}

/**
 * Hook for managing user roles and permissions
 * Fetches role from user_roles table via Supabase
 */
export function useRole(accessToken?: string | null, isDemo: boolean = false): UseRoleReturn {
  const [role, setRole] = useState<UserRole>(UserRole.USER);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadRole = useCallback(async () => {
    // If explicitly demo, or if passed a specific demo token
    if (isDemo || accessToken === 'demo-token-offline-mode') {
      setRole(UserRole.USER);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Get current user from Supabase auth
      // We use getUser() to ensure we have the latest user state
      const { data, error: userError } = await supabase.auth.getUser();
      const user = data?.user;
      
      if (userError || !user) {
        // Not authenticated
        setRole(UserRole.USER);
        setIsLoading(false);
        return;
      }

      // Query the user_roles table directly
      // RLS policies will ensure users can only see their own role (or admins see all)
      const { data: roleData, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching role from user_roles table:', error);
        // Default to USER on error
        setRole(UserRole.USER);
      } else if (roleData) {
        // Cast the string role to UserRole enum
        // Ensure the role exists in our enum, otherwise fallback to USER
        const roleValue = roleData.role as UserRole;
        if (Object.values(UserRole).includes(roleValue)) {
          setRole(roleValue);
        } else {
          console.warn(`Unknown role found: ${roleData.role}, defaulting to USER`);
          setRole(UserRole.USER);
        }
      } else {
        // No role entry found for this user, default to USER
        setRole(UserRole.USER);
      }
    } catch (err: any) {
      // Downgrade network errors to warnings
      if (err?.message === 'Failed to fetch' || err?.message?.includes('Network')) {
        console.warn('Failed to load user role (connection issue):', err.message);
      } else {
        console.error('Failed to load user role:', err);
      }
      setError('Failed to load permissions');
      setRole(UserRole.USER);
    } finally {
      setIsLoading(false);
    }
  }, [accessToken, isDemo]);

  useEffect(() => {
    loadRole();
  }, [loadRole]);

  const checkPermission = useCallback(
    (resource: string, action: string): boolean => {
      return hasPermission(role, resource, action);
    },
    [role]
  );

  return {
    role,
    isLoading,
    error,
    hasPermission: checkPermission,
    isAdmin: isAdmin(role),
    isSuperAdmin: isSuperAdmin(role),
    canAccessAdminPanel: isAdmin(role) || isSuperAdmin(role),
    refreshRole: loadRole
  };
}
