import type { Metadata } from "next";
import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';

import localFont from "next/font/local";
import SideNavEvents from "@/app/ui/sidenav-events";

import { MapProvider } from "@/context/MapContext";

export const metadata: Metadata = {
  title: {
    template: '%s | LiveActive',
    default: 'LiveActive',
  },
  description: 'Example site called LiveActive',
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {

  return  (
    <span lang='en' suppressHydrationWarning>
    <MapProvider>
      <div>
          {children}
      </div>
    </MapProvider>
    </span>
  );
}
