'use client';

import ComingSoon from '@/components/admin/ComingSoon';
import { useTheme } from '@/hooks/useTheme';

export default function EventsPage() {
  const { darkMode } = useTheme();

  return (
    <ComingSoon
      title="Events Management"
      description="Comprehensive event planning and management system with calendar integration, RSVP tracking, and automated reminders."
      darkMode={darkMode}
      estimatedTime="2-3 weeks"
      features={[
        "Event Creation & Planning",
        "Calendar Integration",
        "RSVP Management",
        "Automated Reminders",
        "Venue Booking System",
        "Guest List Management",
        "Event Analytics",
        "Photo & Media Gallery"
      ]}
    />
  );
}
