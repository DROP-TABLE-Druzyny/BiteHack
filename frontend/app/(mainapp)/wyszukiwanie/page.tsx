"use client";

import SearchResult from "@/app/ui/search/SearchItem";
import { Input } from "@/components/ui/input";
import { FetchDomains, SearchItem } from "@/services/Search";
import ArrowLeftIcon from "@heroicons/react/24/outline/ArrowLeftIcon";
import { HeartCrack, Search } from "lucide-react";
import React, { useState } from "react";

export default function Page() {
  const [searchItems, setSearchItems] = useState<SearchItem[]>([]);
  const [charCount, setCharCount] = useState(0); // State to track the number of characters

  async function SearchItem(event: React.ChangeEvent<HTMLInputElement>) {
    const query = event.target.value.trim();
    setCharCount(query.length); // Update the character count

    if (query === "") {
      setSearchItems([]); // Clear results if the query is empty
      return;
    }

    try {
      const results = FetchDomains(query);
      setSearchItems(results);
    } catch (error) {
      console.error("Error fetching search items:", error);
      setSearchItems([]); // Handle error by clearing the results
    }
  }

  const showResults = searchItems.length > 0;

  return (
    <div className={`mx-[10%] flex flex-col justify-center`}>
      <div
        className={`w-full flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${
          showResults ? "mt-8" : "mt-[25%]"
        }`}
      >
        <div className="flex items-center justify-center">
          <a
            href="/"
            className="p-2 mb-8 mr-4 bg-amber-600 border-1 border-white rounded-full shadow-lg text-3xl text-white drop-shadow-md font-bold"
          >
            <ArrowLeftIcon className="w-14 h-14" />
          </a>
          <h1 className="p-4 flex gap-2 items-center text-white text-4xl mb-8 font-extrabold bg-amber-600 border-white rounded-full shadow-lg drop-shadow-md">
            Wyszukiwarka
            <Search size={32} />
          </h1>
        </div>

        <Input
          onInput={SearchItem}
          className="lg:2text-xl md:text-2xl sm:text-lg w-[700px] h-14 px-3 py-2 border-amber-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full bg-amber-600 placeholder:text-white placeholder:opacity-80 text-white border-2"
          placeholder="Wpisz tutaj co chcesz znaleźć"
        />
      </div>
      {charCount > 0 &&
        (showResults ? (
          <div className="search-results mt-6">
            {searchItems.map((item, index) => (
              <SearchResult item={item} key={index} />
            ))}
          </div>
        ) : (
          <div className="search-results mt-6 text-red-600 flex gap-2 items-center justify-center">
            <HeartCrack />
            Niestety, nie mamy tego czego szukasz
          </div>
        ))}
    </div>
  );
}
