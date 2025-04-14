// components/public/HeroSection.jsx
import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'

export default function HeroSection () {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  })

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1])

  return (
    <section
      ref={ref}
      className='relative text-white h-[40vh] md:h-[80vh] flex items-center justify-center overflow-hidden'
    >
      <motion.div
        className='absolute inset-0 bg-cover bg-center z-0 blur-xs '
        style={{
          backgroundImage: "url('https://res.cloudinary.com/integradoss/image/upload/v1744656520/hero_ytxkqa.jpg')",
          backgroundPosition: '50% 20%',
          scale,
          opacity
        }}
      />
      <div className='absolute inset-0 z-5 bg-gradient-to-b from-gray-900 to-transparent' />
      <div className='container relative z-10 mx-auto px-4 text-center'>
        <motion.div
          className='flex flex-col items-center md:block'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className='text-2xl md:text-5xl font-light tracking-[0.2em] mb-2 md:mb-6'
          >
            I N T E G R A D O S S
          </motion.h1>
          <motion.p
            className='text-xs md:text-xl font-light text-gray-200 mb-4 md:mb-8 max-w-2xl mx-auto'
          >
            Semillero de Investigación de la Universidad Popular del Cesar
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
