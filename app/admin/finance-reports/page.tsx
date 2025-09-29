'use client';

import ComingSoon from '@/components/admin/ComingSoon';
import { useTheme } from '@/hooks/useTheme';

export default function FinanceReportsPage() {
  const { darkMode } = useTheme();

  return (
    <ComingSoon
      title="Financial Reports"
      description="Comprehensive financial reporting dashboard with real-time analytics, charts, and automated insights."
      darkMode={darkMode}
      estimatedTime="2-3 weeks"
      features={[
        "Revenue & Expense Analytics",
        "Cash Flow Reports",
        "Budget vs Actual Analysis",
        "Interactive Charts & Graphs",
        "Automated Report Generation",
        "Export to Excel/PDF",
        "Trend Analysis",
        "Financial Forecasting"
      ]}
    />
  );
}
