import { Button } from '@/components/ui/button'
import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import { NavLink } from 'react-router-dom'

export default function CallSection ({ calls = [] }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  }

  return (
    <section ref={ref} className='py-16 bg-white'>
      <div className='container mx-auto px-8 md:px-16'>
        <motion.h2
          className='text-4xl font-light text-green-500 mb-2 text-center'
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          Convocatorias
        </motion.h2>
        <motion.p
          className='text-xl font-light text-gray-400 mb-16 text-center'
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Ultimas convocatorias disponibles.
        </motion.p>

        {calls.length === 0
          ? (
            <p className='text-center text-gray-400'>No hay convocatorias disponibles actualmente.</p>
            )
          : (
            <motion.div
              className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto'
              variants={containerVariants}
              initial='hidden'
              animate={isInView ? 'visible' : 'hidden'}
            >
              {calls.slice(0, 3).map((call, index) => (
                <motion.div key={call._id || index} className='p-2 overflow-hidden border border-gray-400' variants={itemVariants}>
                  <div className='h-56 overflow-hidden mb-4'>
                    {call.image
                      ? (
                        <img
                          src={call.image}
                          alt={call.title}
                          className='aspect-[16/9] h-full w-full object-contain'
                        />
                        )
                      : (
                        <div className='w-full h-full flex items-center justify-center text-gray-400 bg-gray-100'>
                          Sin imagen
                        </div>
                        )}
                  </div>
                  <h3 className='text-xl font-light text-green-600 mb-2'>{call.title || `Convocatoria ${index + 1}`}</h3>
                  <p className='text-gray-500 line-clamp-4 overflow-hidden text-ellipsis mb-6'>
                    {call.description || `Descripcion de la Convocatoria ${index + 1}`}
                  </p>
                </motion.div>
              ))}
            </motion.div>
            )}
        <div className='text-center mt-12'>
          <Button asChild variant='outline' className='w-full md:w-auto text-white hover:text-white shadow-none bg-green-600 border-none hover:bg-green-700 rounded-none px-6'>
            <NavLink to='/convocatorias'>Ver más convocatorias...</NavLink>
          </Button>
        </div>
      </div>
    </section>
  )
}
