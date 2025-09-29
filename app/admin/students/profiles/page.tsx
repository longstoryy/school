'use client';

import ComingSoon from '@/components/admin/ComingSoon';
import { useTheme } from '@/hooks/useTheme';

export default function StudentProfilesPage() {
  const { darkMode } = useTheme();

  return (
    <ComingSoon
      title="Student Profiles"
      description="Comprehensive student profile management with academic history, achievements, and detailed analytics."
      darkMode={darkMode}
      estimatedTime="3 weeks"
      features={[
        "Detailed Student Profiles",
        "Academic Performance History",
        "Achievement Tracking",
        "Behavioral Records",
        "Medical Information",
        "Parent Communication Log",
        "Photo Gallery",
        "Progress Reports"
      ]}
    />
  );
}
