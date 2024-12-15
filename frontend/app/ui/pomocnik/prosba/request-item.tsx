import React from 'react'
import { ClockIcon, MapPinIcon, UserIcon } from '@heroicons/react/24/outline'

interface RequestItemProps {
  category: string
  categoryIcon: React.FC<React.SVGProps<SVGSVGElement>>
  timeLeft: string
  location: string
  status: 'active' | 'pending' | 'completed'
}

const RequestItem: React.FC<RequestItemProps> = ({
  category,
  categoryIcon: CategoryIcon,
  timeLeft,
  location,
  status
}) => {
  const statusColors = {
    active: 'bg-green-500',
    pending: 'bg-yellow-500',
    completed: 'bg-blue-500'
  }

  return (
    <div className="w-full max-w-md mx-auto mb-4">
        <div className="bg-amber-600 text-white rounded-3xl p-4 flex items-center space-x-4 border-2 border-white shadow-lg">
          <div className="flex-shrink-0">
            <CategoryIcon className="h-8 w-8 drop-shadow-md" />
          </div>
          <div className="flex-grow min-w-0">
            <p className="text-md font-bold truncate drop-shadow-md">
              Kategoria: {category}
            </p>
            <div className="flex items-center text-md space-x-2">
              <ClockIcon className="h-4 w-4 drop-shadow-md" />
              <span className='drop-shadow-md'>{timeLeft}</span>
            </div>
            {/* <div className="flex items-center text-md space-x-2">
              <MapPinIcon className="h-4 w-4 drop-shadow-md" />
              <span className="truncate drop-shadow-md">{location}</span>
            </div> */}
            <div className="flex items-center text-md space-x-2">
              <UserIcon className="h-4 w-4 drop-shadow-md" />
              <span className="truncate drop-shadow-md">Oczekuje na przyjęcie</span>
            </div>
          </div>
          <div className={`w-3 h-3 shadow-md rounded-full ${statusColors[status]}`} />
        </div>
    </div>
  )
}

export default RequestItem

