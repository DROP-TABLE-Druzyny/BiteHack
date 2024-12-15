'use client'

import React, { useEffect, useState } from 'react';
import { InformationCircleIcon, MapIcon, UserGroupIcon, HeartIcon } from '@heroicons/react/24/outline';
import NavItem from './navitem';
import { Search } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { SearchItem } from '@/services/Search';

export interface NavItemProps {
  href: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  label: string;
  radius: number;
  style?: React.CSSProperties
  bgcolor?: string
}

const Navigation: React.FC = () => {
  const dist_main = 70;
  const dist_far = 250;

  const [items, ] = useState<NavItemProps[]>([
    { href: '/zdrowie', icon: HeartIcon, label: 'Zdrowie', radius: 90},
    { href: '/informacje', icon: InformationCircleIcon, label: 'Informacje', radius: 90 },
    { href: '/pomocnik', icon: UserGroupIcon, label: 'Pomocnik', radius: 90 },
    { href: '/wyszukiwanie', icon: Search, label: 'Wyszukiwarka', radius: 90},
    { href: '/aktywnosc', icon: MapIcon, label: 'Wydarzenia', radius: 90},
  ]);

  const [userItems, setUserItems] = useState<NavItemProps[]>([]);

  // Function to parse cookies
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
        // Map SearchItem objects to NavItemProps
        const transformedLinks: NavItemProps[] = parsedLinks.map((link) => ({
          href: link.url,
          icon: UserGroupIcon, // Default icon, can customize based on categories
          label: link.title,
          radius: 50, 
        }));
        setUserItems(transformedLinks);
      } catch (error) {
        console.error('Failed to parse saved links from cookies:', error);
      }
    }
  }, []);

  const getPosition = (radius: number, angle: number, dist: number) => {
    const rad = (Math.PI / 180) * angle;
    return {
      x: Math.cos(rad) * (radius + dist),
      y: Math.sin(rad) * (radius + dist)+80,  // OFFSET
    };
  };

  const NavItems = () => 
  {
    const navItems = []

    const n = items.length;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const { x, y } = getPosition(item.radius, (360/n)*i, dist_main);
      
      navItems.push(
        <NavItem
          key={item.href}
          href={item.href}
          icon={item.icon}
          label={item.label}
          radius={item.radius}
          bgcolor={'bg-amber-600  hover:bg-amber-700'}
          style={{
            position: 'absolute',
            left: `calc(50% + ${x}px)`,
            top: `calc(50% + ${y}px)`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      );
    }

    for (let i = 0; i < userItems.length; i++) {
      const item = userItems[i];
      const { x, y } = getPosition(item.radius, (360/userItems.length)*i, dist_far);
      
      navItems.push(
        <NavItem
          key={item.href}
          href={item.href}
          icon={item.icon}
          label={item.label}
          radius={item.radius}
          bgcolor='bg-cyan-500'
          style={{
            position: 'absolute',
            left: `calc(50% + ${x}px)`,
            top: `calc(50% + ${y}px)`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      );
    }

    return navItems;
  }

  return (
    <div>
      <div className="relative hidden md:flex justify-center items-center w-80 md:w-96 h-80 md:h-96">
        <NavItems/>
      </div>
      <div className='mt-12 flex flex-col md:hidden'>
      {items.map((item) => (
        <a href={item.href}>
          <div className='p-4 flex gap-2 items-center text-white text-4xl mb-8 font-extrabold bg-amber-600 border-white rounded-full shadow-lg drop-shadow-md'>
            <item.icon className={`w-6 h-6 text-white`} />
            {item.label}
          </div>
        </a>
        ))}
        {userItems.map((item) => (
          <a href={item.href}>
          <div className='p-4 flex gap-2 items-center text-white text-4xl mb-8 font-extrabold bg-cyan-500 border-white rounded-full shadow-lg drop-shadow-md'>
            <item.icon className={`w-6 h-6 text-white`} />
            {item.label}
          </div>
        </a>
        ))}
      </div>
    </div>
    
  );
};

export default Navigation;
