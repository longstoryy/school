'use client';

import ComingSoon from '@/components/admin/ComingSoon';
import { useTheme } from '@/hooks/useTheme';

export default function SubjectsPage() {
  const { darkMode } = useTheme();

  return (
    <ComingSoon
      title="Subjects Management"
      description="Comprehensive subject management system with curriculum tracking, teacher assignments, and academic planning tools."
      darkMode={darkMode}
      estimatedTime="2-3 weeks"
      features={[
        "Subject Creation & Management",
        "Curriculum Planning",
        "Teacher Assignment",
        "Grade Level Organization",
        "Academic Standards Tracking",
        "Subject Performance Analytics"
      ]}
    />
  );
}
