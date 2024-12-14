import React from 'react';

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  position: string;
  isMain?: boolean
}

const NavItem: React.FC<NavItemProps> = ({ href, icon: Icon, label, position, isMain = false }) => (
  <a href={href} className={`absolute flex flex-col items-center justify-center ${isMain ? "w-36 h-36 md:w-40 md:h-40" : "w-24 h-24 md:w-32 md:h-32"} bg-amber-600 border-2 border-white rounded-full shadow-lg hover:bg-amber-700 transition duration-300 ease-in-out transform hover:scale-105 ${position}`}>
    <Icon className={`w-6 h-6 md:w-10 md:h-10 text-white`} />
    <div className="text-xs md:text-sm mt-1 text-white font-bold drop-shadow-md">{label}</div>
  </a>
);

export default NavItem;