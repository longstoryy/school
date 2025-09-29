'use client';

import ComingSoon from '@/components/admin/ComingSoon';
import { useTheme } from '@/hooks/useTheme';

export default function TeacherProfilesPage() {
  const { darkMode } = useTheme();

  return (
    <ComingSoon
      title="Teacher Profiles"
      description="Comprehensive teacher profile management with qualifications, performance tracking, and professional development."
      darkMode={darkMode}
      estimatedTime="3 weeks"
      features={[
        "Detailed Teacher Profiles",
        "Qualification Management",
        "Performance Evaluations",
        "Professional Development",
        "Class Assignments",
        "Subject Expertise",
        "Achievement Records",
        "Contact Information"
      ]}
    />
  );
}
