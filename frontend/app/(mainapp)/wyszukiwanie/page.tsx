'use client'

import SearchResult from '@/app/ui/search/SearchItem';
import { Input } from '@/components/ui/input';
import { FetchDomains, SearchItem } from '@/services/Search';
import React, { useState } from 'react';

export default function Page() {
  const [searchItems, setSearchItems] = useState<SearchItem[]>([]); // Initialize with an empty array

  async function SearchItem(event: React.ChangeEvent<HTMLInputElement>) {
    const query = event.target.value.trim();
    if (query === '') {
      setSearchItems([]); // Clear results if the query is empty
      return;
    }

    try {
      const results = FetchDomains(query);
      console.log("Fetching...")
      setSearchItems(results);
    } catch (error) {
      console.error("Error fetching search items:", error);
      setSearchItems([]); // Handle error by clearing the results
    }
  }

  const showResults = searchItems.length > 0

  return (
    <div 
      className={`mx-[10%] flex flex-col justify-center`}
    >
      <div className={`w-full flex flex-col transition-all duration-500 ease-in-out ${
        showResults ? 'mt-8' : 'mt-[25%]'
      }`}>
        <span className='text-center justify-center text-4xl mb-8 font-extrabold'>Wyszukaj</span>
        <Input 
            onInput={SearchItem} 
            className='lg:2text-xl md:text-2xl sm:text-lg w-full h-12 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>
      {showResults &&
        <div className='search-results mt-6'>
          {searchItems.map((item, index) => (
            <SearchResult item={item} key={index}/>
          ))}
        </div>
      }
    </div>
  );
}
