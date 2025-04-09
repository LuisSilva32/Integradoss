import { ScrollArea } from '../ui/scroll-area'

export default function ResearcherDetail ({ researcher }) {
  if (!researcher) return null

  return (
    <div className='mt-4 space-y-4'>
      {researcher.image && (
        <div className='w-full h-64 border border-gray-400 overflow-hidden p-1.5'>
          <img
            src={researcher.image || '/placeholder.svg'}
            alt={researcher.name}
            className='w-full h-full object-contain'
          />
        </div>
      )}
      <h2 className='text-xl font-light text-gray-800 mb-2'>{researcher.name}</h2>
      <ScrollArea className='h-64 pr-4'>
        <div className='whitespace-pre-line text-justify text-gray-600'>{researcher.description}</div>
      </ScrollArea>
    </div>
  )
}
