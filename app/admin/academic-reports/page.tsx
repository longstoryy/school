'use client';

import ComingSoon from '@/components/admin/ComingSoon';
import { useTheme } from '@/hooks/useTheme';

export default function AcademicReportsPage() {
  const { darkMode } = useTheme();

  return (
    <ComingSoon
      title="Academic Reports"
      description="Advanced academic analytics with student performance tracking, grade analysis, and comprehensive reporting."
      darkMode={darkMode}
      estimatedTime="3-4 weeks"
      features={[
        "Student Performance Analytics",
        "Grade Distribution Reports",
        "Class Performance Comparison",
        "Subject-wise Analysis",
        "Progress Tracking",
        "Parent Report Cards",
        "Teacher Performance Metrics",
        "Curriculum Effectiveness"
      ]}
    />
  );
}
