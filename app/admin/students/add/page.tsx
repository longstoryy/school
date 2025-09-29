'use client';

import ComingSoon from '@/components/admin/ComingSoon';
import { useTheme } from '@/hooks/useTheme';

export default function AddStudentPage() {
  const { darkMode } = useTheme();

  return (
    <ComingSoon
      title="Add New Student"
      description="Streamlined student registration system with smart form validation, document upload, and automated enrollment."
      darkMode={darkMode}
      estimatedTime="2 weeks"
      features={[
        "Smart Registration Forms",
        "Document Upload & Verification",
        "Photo Capture Integration",
        "Parent/Guardian Information",
        "Medical Records Management",
        "Class Assignment",
        "Fee Structure Setup",
        "Welcome Email Automation"
      ]}
    />
  );
}
