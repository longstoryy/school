'use client';

import ComingSoon from '@/components/admin/ComingSoon';
import { useTheme } from '@/hooks/useTheme';

export default function TeacherAssignmentsPage() {
  const { darkMode } = useTheme();

  return (
    <ComingSoon
      title="Teacher Assignments"
      description="Smart teacher assignment system with workload balancing, subject matching, and schedule optimization."
      darkMode={darkMode}
      estimatedTime="3-4 weeks"
      features={[
        "Class Assignment Management",
        "Subject Allocation",
        "Workload Balancing",
        "Schedule Optimization",
        "Substitute Teacher System",
        "Performance Tracking",
        "Assignment History",
        "Conflict Resolution"
      ]}
    />
  );
}
