import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import CallSection from '@/components/public/CallSection'
import HeroSection from '@/components/public/HeroSection'
import InfoSection from '@/components/public/InfoSection'
import ResearcherSection from '@/components/public/ResearcherSection'
import { useInformation } from '@/hooks/useInformation'
import { useResearcher } from '@/hooks/useResearcher'
import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { FaArrowUp } from 'react-icons/fa6'
import { infoSections } from './static/InformationStatic'

export default function Home () {
  const { information: calls, loading: callsLoading, fetchInformation } = useInformation('convocatoria')
  const { researchers, loading: researchersLoading, fetchResearchers } = useResearcher()
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    fetchInformation(null)
    fetchResearchers(null)

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [fetchInformation, fetchResearchers])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <Helmet>
        <title>Integradoss UPC</title>
      </Helmet>
      <div className='min-h-screen flex flex-col font-[Raleway] max-w-[1920px] mx-auto'>
        <header>
          <Navbar />
        </header>
        <main className='flex-grow'>
          <HeroSection />
          <InfoSection sections={infoSections} />
          <ResearcherSection researchers={researchersLoading ? [] : researchers} />
          <CallSection calls={callsLoading ? [] : calls} />
        </main>
        <Footer />

        {showBackToTop && (
          <motion.button
            className='fixed bottom-6 right-6 bg-green-600 text-white p-3 rounded-full shadow-lg z-50 hover:bg-green-800 hover:cursor-pointer transition-colors'
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ y: -3 }}
          >
            <FaArrowUp size={24} />
          </motion.button>
        )}
      </div>
    </>
  )
}
