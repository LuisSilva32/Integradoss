import { Button } from '@/components/ui/button'

export default function InfoSection ({ title, content, onSeeMore }) {
  return (
    <div className='p-6 h-full'>
      <h2 className='text-xl font-medium text-blue-600 mb-4'>{title}</h2>
      <div className='text-sm text-gray-700 whitespace-pre-line line-clamp-[10] mb-4'>{content}</div>
      <Button variant='outline' className='text-blue-600 border-blue-600 hover:bg-blue-50' onClick={onSeeMore}>
        Ver más...
      </Button>
    </div>
  )
}
