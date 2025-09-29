'use client';

import ComingSoon from '@/components/admin/ComingSoon';
import { useTheme } from '@/hooks/useTheme';

export default function ExpensesPage() {
  const { darkMode } = useTheme();

  return (
    <ComingSoon
      title="Expense Management"
      description="Smart expense tracking and budget management system with automated categorization and reporting."
      darkMode={darkMode}
      estimatedTime="3-4 weeks"
      features={[
        "Expense Tracking & Categorization",
        "Budget Planning & Monitoring",
        "Receipt Management",
        "Approval Workflows",
        "Vendor Management",
        "Financial Reports",
        "Tax Compliance",
        "Mobile Expense Capture"
      ]}
    />
  );
}
