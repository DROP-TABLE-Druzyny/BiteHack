'use client';
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const options: { [key: string]: string } = {
  "1": "Do 1 godziny",
  "2": "Do 2 godzin",
  "4": "Do 4 godzin",
  "24": "Do 1 dnia",
  "168": "Do 1 tygodnia"
};

export default function TimeDropdown({ onChange } :{onChange: (value: string) => void}) {
  const [selectedValue, setSelectedValue] = useState<keyof typeof options | null>(null);

  const handleItemClick = (value: string) => {
    setSelectedValue(value);
    onChange(value);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default" className="bg-amber-600 border-2 px-4 py-2 border-white rounded-full shadow-lg hover:bg-amber-700 transition duration-300 ease-in-out transform hover:scale-105 text-3xl p-8">
          {selectedValue ? `Wybrano: ${options[selectedValue]}` : 'Jak długo mogę czekać'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-96 p-2">
        {Object.entries(options).map(([value, label]) => (
          <DropdownMenuItem key={value} onClick={() => handleItemClick(value)} className='text-lg p-2'>
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
