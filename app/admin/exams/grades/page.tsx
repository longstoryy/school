'use client';

import ComingSoon from '@/components/admin/ComingSoon';
import { useTheme } from '@/hooks/useTheme';

export default function GradeReportsPage() {
  const { darkMode } = useTheme();

  return (
    <ComingSoon
      title="Grade Reports"
      description="Advanced grade reporting system with customizable report templates, automated calculations, and comprehensive academic insights."
      darkMode={darkMode}
      estimatedTime="2-3 weeks"
      features={[
        "Customizable Report Templates",
        "Automated Grade Calculations",
        "GPA & CGPA Tracking",
        "Subject-wise Performance",
        "Progress Tracking Charts",
        "Parent-Student Portals",
        "Transcript Generation",
        "Academic Achievement Badges"
      ]}
    />
  );
}
