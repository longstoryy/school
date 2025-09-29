'use client';

import ComingSoon from '@/components/admin/ComingSoon';
import { useTheme } from '@/hooks/useTheme';

export default function CreateClassPage() {
  const { darkMode } = useTheme();

  return (
    <ComingSoon
      title="Create New Class"
      description="Intelligent class creation system with automated student allocation, teacher assignment, and resource planning."
      darkMode={darkMode}
      estimatedTime="2-3 weeks"
      features={[
        "Smart Class Builder",
        "Student Allocation System",
        "Teacher Assignment",
        "Room Allocation",
        "Capacity Management",
        "Subject Planning",
        "Resource Requirements",
        "Schedule Integration"
      ]}
    />
  );
}
