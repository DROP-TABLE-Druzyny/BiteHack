import Link from 'next/link';
import NavLinks from '@/app/ui/nav-links';
import SomeLogo from '@/app/ui/some-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import SideNav from './sidenav';
//import { signOut } from '@/auth';

export default function SideNavMain() {
  return (
    <SideNav>
      <NavLinks></NavLinks>
    </SideNav>
  );
}
