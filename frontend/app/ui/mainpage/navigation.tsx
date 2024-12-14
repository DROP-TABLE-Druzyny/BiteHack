'use client'

import React, { useEffect, useState } from 'react';
import { InformationCircleIcon, UserIcon, MapIcon, UserGroupIcon, HeartIcon } from '@heroicons/react/24/outline';
import NavItem from './navitem';

export interface NavItemProps {
  href: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  label: string;
  radius: number;
  angle: number; // Angle in degrees
  style?: React.CSSProperties
}

const Navigation: React.FC = () => {
  const dist = 60;

  const [items, setItems] = useState<NavItemProps[]>([
    { href: '/zdrowie', icon: HeartIcon, label: 'Zdrowie', radius: 60, angle: 0 },
    { href: '/activity', icon: MapIcon, label: 'Wydarzenia', radius: 60, angle: 72 },
    { href: '/pomocnik', icon: UserGroupIcon, label: 'Pomocnik', radius: 60, angle: 144 },
    { href: '/profil', icon: UserIcon, label: 'Profil', radius: 60, angle: 216 },
    { href: '/informacje', icon: InformationCircleIcon, label: 'Informacje', radius: 60, angle: 288 },
  ]);

  const getPosition = (radius: number, angle: number) => {
    const rad = (Math.PI / 180) * angle;
    return {
      x: Math.cos(rad) * (radius + dist),
      y: Math.sin(rad) * (radius + dist),
    };
  };

  return (
    <div className="relative flex justify-center items-center w-80 md:w-96 h-80 md:h-96">
      {items.map((item) => {
        const { x, y } = getPosition(item.radius, item.angle);
        return (
          <NavItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={item.label}
            radius={item.radius}
            angle={item.angle}
            style={{
              position: 'absolute',
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        );
      })}
    </div>
  );
};

export default Navigation;
