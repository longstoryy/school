'use client';

import ComingSoon from '@/components/admin/ComingSoon';
import { useTheme } from '@/hooks/useTheme';

export default function AttendanceReportsPage() {
  const { darkMode } = useTheme();

  return (
    <ComingSoon
      title="Attendance Reports"
      description="Smart attendance tracking and reporting system with automated insights and parent notifications."
      darkMode={darkMode}
      estimatedTime="2-3 weeks"
      features={[
        "Real-time Attendance Tracking",
        "Absence Pattern Analysis",
        "Automated Parent Notifications",
        "Class-wise Attendance Reports",
        "Monthly/Weekly Summaries",
        "Tardiness Tracking",
        "Attendance Trends",
        "Export & Print Options"
      ]}
    />
  );
}
