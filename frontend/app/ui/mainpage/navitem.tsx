import React from 'react';
import { NavItemProps } from './navigation';


const NavItem: React.FC<NavItemProps> = ({ href, icon: Icon, label, radius, style, bgcolor}) => (
  <a
    href={href}
    style={{
      ...style,
      width: `${radius * 2}px`, // Double the radius for width and height
      height: `${radius * 2}px`,
    }}
    className={`${bgcolor} absolute flex flex-col items-center justify-center border-2 border-white rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105`}
  >
    <Icon className={`w-12 h-12  md:w-10 md:h-10 text-white`} />
    <div className="text-md md:text-lg mt-1 text-white font-bold drop-shadow-md text-center">{label}</div>
  </a>
);

export default NavItem;
