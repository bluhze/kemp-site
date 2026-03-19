'use client'

import { Sidebar } from './Sidebar'

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex overflow-x-hidden">
      <Sidebar />
      <main id="main-content" className="flex-1 flex flex-col min-h-screen lg:ml-64 pt-14 lg:pt-0 min-w-0 overflow-x-hidden" style={{ boxShadow: 'rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px' }}>
        <div className="flex-1 min-w-0 overflow-x-hidden">{children}</div>
      </main>
    </div>
  )
}
