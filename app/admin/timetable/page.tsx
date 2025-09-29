'use client';

import ComingSoon from '@/components/admin/ComingSoon';
import { useTheme } from '@/hooks/useTheme';

export default function TimetablePage() {
  const { darkMode } = useTheme();

  return (
    <ComingSoon
      title="Smart Timetable"
      description="AI-powered timetable generation with conflict resolution, resource optimization, and real-time updates."
      darkMode={darkMode}
      estimatedTime="2-3 weeks"
      features={[
        "Drag & Drop Timetable Builder",
        "Conflict Detection & Resolution",
        "Resource Optimization",
        "Teacher Availability Tracking",
        "Room Assignment Management",
        "Automated Schedule Generation",
        "Mobile-Friendly View",
        "Export & Print Options"
      ]}
    />
  );
}
