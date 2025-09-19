import { Toaster } from "@/components/ui/toaster"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      {children}
      <Toaster />
    </div>
  )
}
