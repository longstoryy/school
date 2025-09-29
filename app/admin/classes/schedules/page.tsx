'use client';

import ComingSoon from '@/components/admin/ComingSoon';
import { useTheme } from '@/hooks/useTheme';

export default function ClassSchedulesPage() {
  const { darkMode } = useTheme();

  return (
    <ComingSoon
      title="Class Schedules"
      description="Advanced scheduling system with drag-and-drop interface, conflict detection, and automated optimization."
      darkMode={darkMode}
      estimatedTime="3-4 weeks"
      features={[
        "Drag & Drop Schedule Builder",
        "Conflict Detection & Resolution",
        "Teacher Availability Tracking",
        "Room Booking Integration",
        "Automated Optimization",
        "Schedule Templates",
        "Mobile-Friendly View",
        "Real-time Updates"
      ]}
    />
  );
}
