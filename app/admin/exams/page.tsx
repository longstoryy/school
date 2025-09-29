'use client';

import ComingSoon from '@/components/admin/ComingSoon';
import { useTheme } from '@/hooks/useTheme';

export default function ExamsPage() {
  const { darkMode } = useTheme();

  return (
    <ComingSoon
      title="Examination System"
      description="Advanced examination management with automated grading, result analytics, and comprehensive reporting."
      darkMode={darkMode}
      estimatedTime="3-4 weeks"
      features={[
        "Exam Creation & Scheduling",
        "Question Bank Management",
        "Automated Grading System",
        "Result Analytics Dashboard",
        "Grade Reports Generation",
        "Performance Tracking",
        "Exam Security Features",
        "Multi-format Question Types"
      ]}
    />
  );
}
