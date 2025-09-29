'use client';

import ComingSoon from '@/components/admin/ComingSoon';
import { useTheme } from '@/hooks/useTheme';

export default function SecurityPage() {
  const { darkMode } = useTheme();

  return (
    <ComingSoon
      title="Backup & Security"
      description="Comprehensive security management and automated backup system with threat monitoring and data protection."
      darkMode={darkMode}
      estimatedTime="4-5 weeks"
      features={[
        "Automated Data Backup",
        "Security Threat Monitoring",
        "Two-Factor Authentication",
        "Access Log Analysis",
        "Data Encryption Management",
        "Disaster Recovery Planning",
        "Security Compliance Reports",
        "Vulnerability Scanning"
      ]}
    />
  );
}
