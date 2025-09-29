'use client';

import ComingSoon from '@/components/admin/ComingSoon';
import { useTheme } from '@/hooks/useTheme';

export default function FinancialReportsPage() {
  const { darkMode } = useTheme();

  return (
    <ComingSoon
      title="Financial Reports"
      description="Advanced financial analytics dashboard with comprehensive reporting, forecasting, and budget analysis."
      darkMode={darkMode}
      estimatedTime="3-4 weeks"
      features={[
        "Comprehensive Financial Dashboard",
        "Revenue & Expense Analysis",
        "Budget vs Actual Reports",
        "Cash Flow Forecasting",
        "Profit & Loss Statements",
        "Balance Sheet Reports",
        "Tax Compliance Reports",
        "Automated Financial Insights"
      ]}
    />
  );
}
