import type { Metadata } from "next";
import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';

import localFont from "next/font/local";
import SideNavMain from "@/app/ui/sidenav-main";
// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: {
    template: '%s | GoldenAge',
    default: 'GoldenAge',
  },
  description: 'Example site called GoldenAge',
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {

  return  (
    <span lang='en' suppressHydrationWarning>
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-72">
        <SideNavMain />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-10">{children}</div>
    </div>
    </span>
  );
}
