'use client'

import React, { useEffect, useState } from 'react';
import { InformationCircleIcon, UserIcon, MapIcon, UserGroupIcon, HeartIcon } from '@heroicons/react/24/outline';
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
  const dist_main = 60;
  const dist_far = 120;

  const [items, setItems] = useState<NavItemProps[]>([
    { href: '/zdrowie', icon: HeartIcon, label: 'Zdrowie', radius: 70},
    { href: '/aktywnosc', icon: MapIcon, label: 'Wydarzenia', radius: 70},
    { href: '/pomocnik', icon: UserGroupIcon, label: 'Pomocnik', radius: 70 },
    { href: '/wyszukiwanie', icon: Search, label: 'Wyszukiwarka', radius: 70},
    { href: '/informacje', icon: InformationCircleIcon, label: 'Informacje', radius: 70 },
  ]);

  const getPosition = (radius: number, angle: number, dist: number) => {
    const rad = (Math.PI / 180) * angle;
    return {
      x: Math.cos(rad) * (radius + dist),
      y: Math.sin(rad) * (radius + dist),
    };
  };

  const NavItems = () => 
  {
    let navItems = []

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
