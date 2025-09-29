'use client';

import ComingSoon from '@/components/admin/ComingSoon';
import { useTheme } from '@/hooks/useTheme';

export default function RoomManagementPage() {
  const { darkMode } = useTheme();

  return (
    <ComingSoon
      title="Room Management"
      description="Comprehensive room and facility management system with booking, maintenance tracking, and resource allocation."
      darkMode={darkMode}
      estimatedTime="2-3 weeks"
      features={[
        "Room Inventory Management",
        "Booking & Reservation System",
        "Capacity Tracking",
        "Equipment Management",
        "Maintenance Scheduling",
        "Availability Calendar",
        "Resource Allocation",
        "Usage Analytics"
      ]}
    />
  );
}
