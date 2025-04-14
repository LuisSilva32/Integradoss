import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { motion } from 'motion/react'
import { useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { NavLink } from 'react-router-dom'

export default function Navbar ({ className }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleClose = () => setIsOpen(false)

  const navItems = [
    { path: '/convocatorias', label: 'Convocatorias' },
    { path: '/proyectos', label: 'Proyectos' },
    { path: '/publicaciones', label: 'Publicaciones' },
    { path: '/investigadores', label: 'Investigadores' }
  ]

  return (
    <motion.nav
      className={`absolute top-0 left-0 right-0 z-50 py-4 px-8 md:px-16 ${className}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className='container mx-auto flex items-center justify-between'>
        <NavLink to='/'>
          <img src='https://res.cloudinary.com/integradoss/image/upload/v1744656520/logo_aprkhx.png' alt='Logo' className='h-8 w-auto' />
        </NavLink>

        <ul className='hidden md:flex items-center gap-6'>
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `text-gray-300 hover:text-gray-100 transition-colors ${
                    isActive ? 'font-medium text-white' : ''
                  }`}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Navbar Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen} side='right'>
          <SheetTrigger asChild>
            <Button
              variant='ghost'
              size='icon'
              className='md:hidden text-gray-300 hover:bg-transparent hover:text-gray-100'
              onClick={() => setIsOpen(true)}
            >
              <AiOutlineMenu size={24} />
            </Button>
          </SheetTrigger>

          {/* Contenido del menu mobile */}
          <SheetContent side='right' className='w-64 bg-green-600 text-white p-6'>
            <NavLink to='/'>
              <p className='text-lg font-light tracking-[0.2em]'>INTEGRADOSS</p>
            </NavLink>
            <ul className='flex flex-col gap-4'>
              {navItems.map((item, index) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `text-lg text-gray-200 hover:text-white transition-colors ${
                        isActive ? 'font-medium text-white' : ''
                      }`}
                    onClick={handleClose}
                  >
                    {item.label}
                    {index < navItems.length - 1 && (
                      <div className='border-t border-gray-200 w-full mt-4' />
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </SheetContent>
        </Sheet>
      </div>
    </motion.nav>
  )
}
