'use client';

import ComingSoon from '@/components/admin/ComingSoon';
import { useTheme } from '@/hooks/useTheme';

export default function AdmissionsPage() {
  const { darkMode } = useTheme();

  return (
    <ComingSoon
      title="Student Admissions"
      description="Advanced admissions management system with application tracking, interview scheduling, and enrollment automation."
      darkMode={darkMode}
      estimatedTime="4 weeks"
      features={[
        "Application Management",
        "Interview Scheduling",
        "Document Verification",
        "Entrance Test Management",
        "Merit List Generation",
        "Admission Notifications",
        "Fee Payment Integration",
        "Enrollment Automation"
      ]}
    />
  );
}
