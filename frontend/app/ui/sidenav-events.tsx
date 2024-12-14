import Link from 'next/link';
import NavLinks from '@/app/ui/nav-links';
import SomeLogo from '@/app/ui/some-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import SideNav from './sidenav';

export default function SideNavEvents({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
    <SideNav>
      {/* flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2 */}
      <div className="flex flex-col p-2 md:px-2 gap-4 h-full w-full">
        {children}
      </div>
    </SideNav>
  );
}
