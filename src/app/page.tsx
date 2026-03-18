import { DashboardLayout } from '@/components/DashboardLayout'
import { AnimatedPageContent } from '@/components/AnimatedPageContent'
import { Footer } from '@/components/Footer'

export default function HomePage() {
  return (
    <DashboardLayout>
      <AnimatedPageContent />
      <Footer />
    </DashboardLayout>
  )
}
