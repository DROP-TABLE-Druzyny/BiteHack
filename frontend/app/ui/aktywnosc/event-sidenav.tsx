'use client';

import {
  MapPinIcon,
} from '@heroicons/react/24/outline';

import Link from 'next/link';
import clsx from 'clsx';
import { Button } from '@/components/ui/button';


export default function EventSidenav() {

  const link = { name: 'Contact', 
    href: '/contact'};
    const LinkIcon = MapPinIcon;

  return (
      <Button variant={'outline'} className='w-full h-24 mb-2'>event-sidenav</Button>
    );
}
