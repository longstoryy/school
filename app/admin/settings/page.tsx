'use client';

import ComingSoon from '@/components/admin/ComingSoon';
import { useTheme } from '@/hooks/useTheme';

export default function SettingsPage() {
  const { darkMode } = useTheme();

  return (
    <ComingSoon
      title="System Settings"
      description="Comprehensive system configuration and customization panel with advanced administrative controls."
      darkMode={darkMode}
      estimatedTime="2-3 weeks"
      features={[
        "General System Configuration",
        "School Profile Management",
        "Academic Year Settings",
        "Notification Preferences",
        "Theme Customization",
        "Security Settings",
        "Backup Configuration",
        "Integration Management"
      ]}
    />
  );
}
