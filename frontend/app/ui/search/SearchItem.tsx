import { SearchItem } from '@/services/Search'
import React from 'react'

interface SearchItemsProps
{
    item: SearchItem
}
export default function SearchResult({ item }: SearchItemsProps) {
  return (
    <a 
    href={item.url} target='_blank'
    rel='noopener noreferrer'>
    <div className='p-4 border border-gray-300 rounded-lg mb-2 active:bg-amber-400 hover:bg-amber-500 transition-colors ease-in-out duration-1000'>
    
      <h3 className='text-lg font-bold'>{item.title}</h3>
      <p>{item.desc}</p>
    </div>
    </a>
  )
}
