"use client";

import SearchResult from "@/app/ui/search/SearchItem";
import { Input } from "@/components/ui/input";
import { FetchDomains, SearchItem } from "@/services/Search";
import ArrowLeftIcon from "@heroicons/react/24/outline/ArrowLeftIcon";
import { HeartCrack, Search } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

export default function Page() {
  const [searchItems, setSearchItems] = useState<SearchItem[]>([]);
  const [favoriteLinks, setFavoriteLinks] = useState<SearchItem[]>([]);
  const [favoriteLinksSet, setFavoriteLinksSet] = useState<Set<string>>(new Set());
  const [charCount, setCharCount] = useState(0); // State to track the number of characters
  
  const getCookie = (name: string): string | null => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      try {
        return decodeURIComponent(parts.pop()?.split(";").shift() || ""); // Decode the cookie value
      } catch (error) {
        console.error(`Error decoding cookie: ${error}`);
        return null;
      }
    }
    return null;
  };
  

  useEffect(() => {
    // Fetch custom user items from cookies
    const savedLinks = getCookie('savedLinks');
    if (savedLinks) {
      try {
        const parsedLinks: SearchItem[] = JSON.parse(savedLinks);
        setFavoriteLinks(parsedLinks);
        setFavoriteLinksSet(new Set(parsedLinks.map((link) => link.url))); // Populate hash set
      } catch (error) {
        console.error('Failed to parse saved links from cookies:', error);
      }
    }
  }, []);

  // Update the cookies whenever favoriteLinks changes
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const serializedLinks = encodeURIComponent(JSON.stringify(favoriteLinks));
    document.cookie = `savedLinks=${serializedLinks}; path=/;`;
  }, [favoriteLinks]);

  const addFavorite = (item: SearchItem) => {
    setFavoriteLinks((prev) => {
      if (favoriteLinksSet.has(item.url)) return prev; // Skip duplicates
      const updatedFavorites = [...prev, item];
      setFavoriteLinksSet(new Set(updatedFavorites.map((link) => link.url))); // Update hash set
      return updatedFavorites;
    });
  };

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
          showResults ? "md:mt-8 mt-2" : "md:mt-[25%] mt-2"
        }`}
      >
        <div className="flex items-center justify-center md:mt-0 mt-4">
          <Link
            href="/"
            className="p-2 mb-8 mr-4 bg-amber-600 border-1 border-white rounded-full shadow-lg text-3xl text-white drop-shadow-md font-bold"
          >
            <ArrowLeftIcon className="md:w-14 md:h-14 w-12 h-12" />
          </Link>
          <h1 className="p-4 flex gap-2 items-center text-white md:text-4xl text-2xl mb-8 font-extrabold bg-amber-600 border-white rounded-full shadow-lg drop-shadow-md">
            Wyszukiwarka
            <Search className="md:w-8 md:h-8 w-6 h-6" />
          </h1>
        </div>

        <Input
          onInput={SearchItem}
          className="lg:2text-xl md:text-2xl sm:text-lg w-full h-14 px-3 md:py-2 border-amber-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full bg-amber-600 placeholder:text-white placeholder:opacity-80 text-white border-2"
          placeholder="Wpisz tutaj co chcesz znaleźć"
        />
      </div>
      {charCount > 0 &&
        (showResults ? (
          <div className="search-results mt-6">
            {searchItems.map((item, index) => (
              <SearchResult item={item} key={index} onFavorite={() => addFavorite(item)} favorites={favoriteLinksSet}/>
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
