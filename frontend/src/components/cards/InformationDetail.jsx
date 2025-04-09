import { ScrollArea } from '../ui/scroll-area'

export default function InformationDetail ({ information }) {
  if (!information) return null

  return (
    <div className='mt-4 space-y-4'>
      {information.image && (
        <div className='w-full h-64 border border-gray-400 overflow-hidden p-1.5'>
          <img
            src={information.image || '/placeholder.svg'}
            alt={information.title}
            className='w-full h-full object-contain'
          />
        </div>
      )}
      <h2 className='text-xl font-light text-gray-800 mb-2'>{information.title}</h2>
      <ScrollArea className='h-64 pr-4'>
        <div className='whitespace-pre-line text-justify text-gray-600'>{information.description}</div>
      </ScrollArea>
    </div>
  )
}
