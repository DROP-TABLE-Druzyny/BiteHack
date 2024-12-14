import React from 'react';
import { InformationCircleIcon, UserIcon, MapIcon, UserGroupIcon, HeartIcon } from '@heroicons/react/24/outline';
import NavItem from './navitem';

const Navigation: React.FC = () => {
  return (
    <div className="relative flex justify-center items-center w-80 md:w-96 h-80 md:h-96">
      <NavItem href="/zdrowie" icon={HeartIcon} label="Zdrowie" position="top-4 left-4" />
      <NavItem href="/activity" icon={MapIcon} label="Wydarzenia" position="top-4 right-4" />
      <NavItem href="/pomocnik" icon={UserGroupIcon} label="Pomocnik" position="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" isMain={true} />
      <NavItem href="/profil" icon={UserIcon} label="Profil" position="bottom-4 left-4" />
      <NavItem href="/informacje" icon={InformationCircleIcon} label="Informacje" position="bottom-4 right-4" />
    </div>
  );
};

export default Navigation;