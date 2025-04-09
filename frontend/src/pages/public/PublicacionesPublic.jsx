import InformationCard from '@/components/cards/InformationCard'
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useInformation } from '@/hooks/useInformation'
import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'

export default function PublicacionesPublic () {
  const { information, loading, error, fetchInformation } = useInformation('publicacion')
  const [selectedPublication, setSelectedPublication] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)

  useEffect(() => {
    fetchInformation(null)
  }, [fetchInformation])

  const handleViewDetails = (publication) => {
    setSelectedPublication(publication)
    setOpenDialog(true)
  }

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  return (
    <>
      <Helmet>
        <title>Publicaciones - Integradoss</title>
      </Helmet>
      <div className='min-h-screen flex flex-col'>
        <Navbar className='bg-green-600' />
        <main className='flex-grow pt-24 container mx-auto px-12 md:px-16'>
          <div>
            <motion.div
              className='text-center mb-12'
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className='text-2xl md:text-4xl font-light text-gray-800 mb-4'>Publicaciones - Integradoss</h1>
              <p className='text-sm text-gray-600 text-justify md:text-center md:text-md max-w-2xl mx-auto'>
                Explora las publicaciones académicas realizadas por el semillero Integradoss.
              </p>
            </motion.div>

            {information.length === 0
              ? (
                <div className='text-center text-gray-600 py-12'>
                  <p>No hay publicaciones disponibles actualmente.</p>
                </div>
                )
              : loading
                ? (
                  <div className='flex justify-center py-12'>
                    <p>Cargando publicaciones...</p>
                  </div>
                  )
                : error
                  ? (
                    <div className='text-center text-red-500 py-12'>
                      <p>{error}</p>
                    </div>
                    )
                  : (
                    <motion.div
                      variants={containerVariants}
                      initial='initial'
                      animate='animate'
                    >
                      <Carousel>
                        <CarouselContent className='-ml-1 md:-ml-2'>
                          {information.map((publication) => (
                            <CarouselItem
                              key={publication._id}
                              className='pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 gap-2 '
                            >
                              <div className='-ml-1'>
                                <InformationCard
                                  information={publication}
                                  onView={handleViewDetails}
                                />
                              </div>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious className='absolute -left-10 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100' />
                        <CarouselNext className='absolute -right-10 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100' />
                      </Carousel>
                    </motion.div>
                    )}
          </div>
        </main>
        <Footer />

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className='max-w-2xl'>
            <DialogHeader>
              <DialogTitle className='ml-2'>{selectedPublication?.title}</DialogTitle>
            </DialogHeader>
            {selectedPublication && (
              <div className='mt-4 space-y-4'>
                {selectedPublication.image && (
                  <div className='w-full h-48 border border-gray-400 overflow-hidden p-1.5'>
                    <img
                      src={selectedPublication.image || '/placeholder.svg'}
                      alt={selectedPublication.title}
                      className='w-full h-full object-contain'
                    />
                  </div>
                )}
                <ScrollArea className='h-64 pr-4'>
                  <div className='whitespace-pre-line text-justify text-gray-600'>{selectedPublication.description}</div>
                </ScrollArea>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}
