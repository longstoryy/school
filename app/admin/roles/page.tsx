'use client';

import ComingSoon from '@/components/admin/ComingSoon';
import { useTheme } from '@/hooks/useTheme';

export default function RolesPage() {
  const { darkMode } = useTheme();

  return (
    <ComingSoon
      title="User Roles & Permissions"
      description="Advanced role-based access control system with granular permissions and security management."
      darkMode={darkMode}
      estimatedTime="3-4 weeks"
      features={[
        "Role Creation & Management",
        "Granular Permission Control",
        "User Assignment",
        "Access Level Configuration",
        "Security Audit Logs",
        "Permission Templates",
        "Role Hierarchy",
        "Bulk User Management"
      ]}
    />
  );
}
