'use client';

import ComingSoon from '@/components/admin/ComingSoon';
import { useTheme } from '@/hooks/useTheme';

export default function MessagesPage() {
  const { darkMode } = useTheme();

  return (
    <ComingSoon
      title="Communication Hub"
      description="Unified messaging system connecting administrators, teachers, students, and parents with real-time notifications."
      darkMode={darkMode}
      estimatedTime="3-4 weeks"
      features={[
        "Real-time Messaging",
        "Group Conversations",
        "File & Media Sharing",
        "Push Notifications",
        "Message Templates",
        "Broadcast Messaging",
        "Read Receipts",
        "Message Scheduling"
      ]}
    />
  );
}
