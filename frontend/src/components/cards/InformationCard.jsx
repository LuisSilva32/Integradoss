import { Button } from '@/components/ui/button'
import { motion } from 'motion/react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '../ui/card'

export default function InformationCard ({ information, onView, onEdit, onDelete }) {
  const itemVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  }

  return (
    <motion.div variants={itemVariants}>
      <Card className='border-gray-400 shadow-none rounded-none overflow-hidden py-0 h-full'>
        <CardHeader className='rounded-sm p-0'>
          <div>
            {information.image
              ? (
                <img
                  src={information.image}
                  alt={information.title}
                  className='aspect-[16/9] h-full w-full object-contain p-2'
                />
                )
              : (
                <span>imagen</span>
                )}
          </div>
        </CardHeader>

        <CardContent className='p-4'>
          <h3
            className='text-lg font-light mb-2 line-clamp-1 overflow-hidden text-ellipsis'
          >
            {information.title}
          </h3>
          <p className='text-sm text-gray-500 leading-relaxed line-clamp-2 overflow-hidden text-ellipsis text-justify'>
            {information.description}
          </p>
        </CardContent>

        <CardFooter className='p-4 pt-0 flex justify-end gap-1 text-xs border-t-0'>
          <Button
            variant='link'
            className='p-0 h-auto text-gray-500 hover:text-gray-600 hover:cursor-pointer font-normal'
            onClick={() => onView && onView(information)}
          >
            Ver más
          </Button>
          {onEdit && (
            <>
              <span className='text-gray-300'>|</span>
              <Button
                variant='link'
                className='p-0 h-auto text-gray-500 hover:text-gray-600 hover:cursor-pointer font-normal'
                onClick={() => onEdit(information)}
              >
                Editar
              </Button>
            </>
          )}
          {onDelete && (
            <>
              <span className='text-gray-300'>|</span>
              <Button
                variant='link'
                className='p-0 h-auto text-gray-500 hover:text-gray-600 hover:cursor-pointer font-normal'
                onClick={() => onDelete(information)}
              >
                Eliminar
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  )
}
