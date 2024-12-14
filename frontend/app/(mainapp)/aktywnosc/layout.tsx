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
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        <div className="w-full flex-none md:w-64">
          <SideNavEvents />
        </div>
        <div className="flex-grow p-6 md:overflow-y-auto md:p-10">
          {children}
        </div>
      </div>
    </MapProvider>
    </span>
  );
}
