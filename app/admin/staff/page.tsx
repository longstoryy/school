'use client';

import ComingSoon from '@/components/admin/ComingSoon';
import { useTheme } from '@/hooks/useTheme';

export default function StaffPage() {
  const { darkMode } = useTheme();

  return (
    <ComingSoon
      title="Staff Management"
      description="Comprehensive staff management system with role assignments, performance tracking, and administrative tools."
      darkMode={darkMode}
      estimatedTime="2-3 weeks"
      features={[
        "Staff Directory & Profiles",
        "Role & Permission Management",
        "Attendance Tracking",
        "Performance Evaluations",
        "Payroll Integration",
        "Document Management",
        "Staff Scheduling",
        "Communication Tools"
      ]}
    />
  );
}
