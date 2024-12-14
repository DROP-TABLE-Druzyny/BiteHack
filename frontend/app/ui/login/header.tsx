'use client'
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import React from 'react';

interface HeaderProps {
  backUrl: string;
  text: string;
}

export default function Header({ backUrl, text }: HeaderProps) {
  return (
    <div className="flex">
      <a href={backUrl} className="inline-block px-3 me-2 py-2 mt-12 mb-6 bg-amber-600 border-2 border-white rounded-full shadow-lg text-3xl text-white drop-shadow-md font-bold">
        <ArrowLeftIcon className='w-8 h-8'/>
      </a>
      <h1 className="inline-block px-6 py-2 mt-12 mb-6 bg-amber-600 border-2 border-white rounded-full shadow-lg text-3xl text-white drop-shadow-md font-bold">
        {text}
      </h1>
    </div>
  );
}