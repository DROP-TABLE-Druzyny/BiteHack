'use client'

import React, { useState } from 'react';
import { InformationCircleIcon, MapIcon, UserGroupIcon, HeartIcon } from '@heroicons/react/24/outline';
import NavItem from './navitem';
import { Search } from 'lucide-react';

export interface NavItemProps {
  href: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  label: string;
  radius: number;
  style?: React.CSSProperties
}

const Navigation: React.FC = () => {
  const dist_main = 90;
  //const dist_far = 120;

  const [items, ] = useState<NavItemProps[]>([
    { href: '/zdrowie', icon: HeartIcon, label: 'Zdrowie', radius: 90},
    { href: '/informacje', icon: InformationCircleIcon, label: 'Informacje', radius: 90 },
    { href: '/pomocnik', icon: UserGroupIcon, label: 'Pomocnik', radius: 90 },
    { href: '/wyszukiwanie', icon: Search, label: 'Wyszukiwarka', radius: 90},
    { href: '/aktywnosc', icon: MapIcon, label: 'Wydarzenia', radius: 90},
  ]);

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
    <div className="relative flex justify-center items-center w-80 md:w-96 h-80 md:h-96">
      <NavItems/>
    </div>
  );
};

export default Navigation;
