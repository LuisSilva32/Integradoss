import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { motion, useInView } from 'motion/react'
import { useRef, useState } from 'react'

export default function InfoSection ({ sections = [] }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [dialog, setDialog] = useState({ open: false, title: '', content: '' })

  const handleOpenDialog = (title, content) => {
    setDialog({ open: true, title, content })
  }

  const handleCloseDialog = () => {
    setDialog({ ...dialog, open: false })
  }

  const renderContent = (content) => {
    const lines = content.split('\n').filter((line) => line.trim())
    return lines.map((line, index) => {
      if (line.trim().startsWith('▪')) {
        return (
          <li key={index} className='ml-4'>
            {line.replace('▪', '').trim()}
          </li>
        )
      }
      return (
        <p key={index} className='mb-2 text-justify'>
          {line.trim()}
        </p>
      )
    })
  }

  return (
    <section ref={ref} className='py-16 bg-white'>
      <div className='container mx-auto px-8 md:px-16'>
        <div className='flex flex-col md:grid md:grid-cols-3 gap-8 md:gap-0'>
          {sections.map((section, index) => (
            <div key={section.id} className='relative px-4 md:px-8'>
              {/* Section Title */}
              <motion.h2
                className='text-2xl font-light text-green-600 mb-6 text-center'
                initial={{ opacity: 0, y: -20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {section.title}
              </motion.h2>

              {/* Section Content */}
              <motion.div
                className='text-gray-500'
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                {section.shortContent.includes('▪')
                  ? (
                    <ul className='list-disc md:pl-5 mb-6  text-sm leading-relaxed line-clamp-6'>
                      {renderContent(section.shortContent)}
                    </ul>
                    )
                  : (
                    <p className='mb-6 text-sm leading-relaxed text-justify line-clamp-6'>
                      {section.shortContent}
                    </p>
                    )}

                {/* Button */}
                <div className='text-center'>
                  <Button
                    variant='outline'
                    className='w-full md:w-auto bg-green-600 hover:bg-green-700 text-white hover:text-white rounded-none px-6'
                    onClick={() => handleOpenDialog(section.title, section.fullContent)}
                    aria-label={`Ver más sobre ${section.title}`}
                  >
                    Ver más...
                  </Button>
                </div>
              </motion.div>

              {/* Separators */}
              {index < sections.length - 1 && (
                <>
                  {/* Vertical Separator for Desktop */}
                  <div className='absolute right-0 top-0 h-full hidden md:block'>
                    <Separator orientation='vertical' className='h-full bg-gray-300' />
                  </div>
                  {/* Horizontal Separator for Mobile */}
                  <Separator className='my-8 md:hidden bg-gray-300' />
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Dialog for Full Content */}
      <Dialog open={dialog.open} onOpenChange={handleCloseDialog}>
        <DialogContent className='max-w-3xl rounded-none md:rounded-sm shadow-xl max-h-[80vh] flex flex-col'>
          <DialogHeader className='mt-3'>
            <DialogTitle className='text-2xl text-green-600 font-light text-center'>
              {dialog.title}
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className='flex-1 overflow-auto px-2 pb-4'>
            <div className='mt-4 text-gray-600 text-sm leading-relaxed'>
              {renderContent(dialog.content)}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </section>
  )
}
