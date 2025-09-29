'use client';

import ComingSoon from '@/components/admin/ComingSoon';
import { useTheme } from '@/hooks/useTheme';

export default function CreateExamPage() {
  const { darkMode } = useTheme();

  return (
    <ComingSoon
      title="Create Exam"
      description="Intuitive exam creation interface with drag-and-drop question builder, scheduling tools, and advanced configuration options."
      darkMode={darkMode}
      estimatedTime="2-3 weeks"
      features={[
        "Visual Question Builder",
        "Multiple Question Types",
        "Exam Scheduling System",
        "Time Limit Configuration",
        "Auto-save Functionality",
        "Question Bank Integration",
        "Preview & Testing Mode",
        "Bulk Question Import"
      ]}
    />
  );
}
