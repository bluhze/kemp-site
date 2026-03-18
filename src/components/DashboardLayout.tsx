'use client'

import { Sidebar } from './Sidebar'

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-1 flex flex-col min-h-screen lg:ml-64 pt-14 lg:pt-0" style={{ boxShadow: 'rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px' }}>
        <div className="flex-1">{children}</div>
      </main>
    </div>
  )
}
