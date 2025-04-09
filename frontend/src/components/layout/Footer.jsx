import { motion } from 'motion/react'
import { FaInstagram, FaXTwitter, FaYoutube } from 'react-icons/fa6'
import { SiGmail } from 'react-icons/si'

export default function Footer () {
  const currentYear = new Date().getFullYear()

  return (
    <footer className='bg-white py-8'>
      <div className='container mx-auto px-8 md:px-16'>
        {/* Top border line */}
        <div className='border-t border-gray-400 mb-6' />

        {/* Social icons aligned to the left */}
        <div className='flex space-x-6 mb-8 mx-auto justify-center md:justify-start text-green-600'>
          <motion.a href='https://www.instagram.com/se_integradoss?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==' whileHover={{ y: -3 }}>
            <FaInstagram size={25} />
            <span className='sr-only'>Instagram</span>
          </motion.a>
          <motion.a href='https://www.youtube.com/@integradoss' whileHover={{ y: -3 }}>
            <FaYoutube size={25} />
            <span className='sr-only'>YouTube</span>
          </motion.a>
          <motion.a href='https://x.com/Se_Integradoss' whileHover={{ y: -3 }}>
            <FaXTwitter size={25} />
            <span className='sr-only'>X.com</span>
          </motion.a>
          <motion.a href='mailto:Integradoss.info@gmal.com' whileHover={{ y: -3 }}>
            <SiGmail size={25} />
            <span className='sr-only'>Integradoss.info@gmal.com</span>
          </motion.a>
        </div>

        {/* Copyright text centered */}
        <div className='text-center text-sm text-gray-400'>
          <p>Copyright © {currentYear} Integradoss</p>
        </div>
      </div>
    </footer>
  )
}
