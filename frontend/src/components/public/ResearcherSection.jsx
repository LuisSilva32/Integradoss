import { Button } from '@/components/ui/button'
import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import { NavLink } from 'react-router-dom'

export default function ResearcherSection ({ researchers = [] }) {
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
    <section ref={ref} className='py-16 bg-green-600'>
      <div className='container mx-auto px-8 md:px-16'>
        <motion.h2
          className='text-4xl font-light text-white mb-2 text-center'
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          Investigadores
        </motion.h2>
        <motion.p
          className='text-xl font-light text-white/80 mb-12 text-center'
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Algunos de nuestros Investigadores.
        </motion.p>

        {researchers.length === 0
          ? (
            <p className='text-center text-white/80'>No hay investigadores disponibles actualmente.</p>
            )
          : (
            <motion.div
              className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto'
              variants={containerVariants}
              initial='hidden'
              animate={isInView ? 'visible' : 'hidden'}
            >
              {researchers.slice(0, 4).map((researcher, index) => (
                <motion.div
                  key={researcher._id || index}
                  className='bg-transparent border border-white/60 rounded-none overflow-hidden flex flex-col items-center p-6'
                  variants={itemVariants}
                >
                  <div className='w-40 h-40 rounded-full overflow-hidden mb-6 border border-white/60'>
                    {researcher.image
                      ? (
                        <img
                          src={researcher.image}
                          alt={researcher.name}
                          className='aspect-[16/9] h-full w-full object-contain'
                        />
                        )
                      : (
                        <div className='w-full h-full flex items-center justify-center text-white/40 bg-white/10'>
                          Sin imagen
                        </div>
                        )}
                  </div>
                  <h3 className='text-sm font-medium text-white mb-2 text-center'>
                    {researcher.name || `Investigador ${index + 1}`}
                  </h3>
                  <p className='text-white/80 line-clamp-2 overflow-hidden text-ellipsis text-justify text-sm'>
                    {researcher.description || `Descripcion del Investigador ${index + 1}`}
                  </p>
                </motion.div>
              ))}
            </motion.div>
            )}

        <div className='text-center mt-12'>
          <Button asChild variant='outline' className='w-full md:w-auto text-white hover:text-white shadow-none bg-transparent border-none hover:bg-white/10 rounded-none px-6'>
            <NavLink to='/investigadores'>Ver investigadores</NavLink>
          </Button>
        </div>
      </div>
    </section>
  )
}
