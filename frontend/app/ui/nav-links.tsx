'use client';

import {
  UserGroupIcon,
  HeartIcon,
  InformationCircleIcon,
  LifebuoyIcon
  
} from '@heroicons/react/24/outline';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
const links = [
  { name: 'Aktywność', 
    href: '/aktywnosc', 
    icon: UserGroupIcon },
  { name: 'Zdrowie', 
    href: '/zdrowie', 
    icon: HeartIcon },
  {
    name: 'Pomocnik',
    href: '/pomocnik',
    icon: LifebuoyIcon,
  },
  { name: 'Informacje', 
    href: '/informacje', 
    icon: InformationCircleIcon },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'rounded-xl flex h-[66px] grow items-center justify-center gap-2 bg-gray-50 p-3 text-2xl font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )}
            >
            <LinkIcon className="w-12" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
