import { LinkPreview } from '@/components/ui/link-preview'
import { SearchItem } from '@/services/Search'
import { Star } from 'lucide-react'
import React from 'react'

interface SearchItemsProps
{
    item: SearchItem
    onFavorite: () => void
    favorites: Set<string>
}
export default function SearchResult({ item, onFavorite, favorites }: SearchItemsProps) {
  function OnStar(event: React.MouseEvent)
  {
    event.stopPropagation();
    event.preventDefault();
    onFavorite();
  }
  return (
    <LinkPreview url={item.url}>
      <div className='p-4 border border-gray-300 rounded-lg mb-2 active:bg-amber-400 hover:bg-gray-200 transition-colors ease-in-out duration-1000'>
        <div className='flex justify-between'>
          <h3 className='text-lg font-bold'>{item.title}</h3>
          <div className='p-2 hover:bg-amber-400 rounded-full transition ease-in-out duration-500'>
            {!favorites.has(item.url) ? <Star onClick={OnStar} size={32}/> : <Star fill={'#000'} onClick={OnStar} size={32}/>}
          </div>
          
        </div>
        
        <p>{item.desc}</p>
      </div>
    </LinkPreview>
  )
}
