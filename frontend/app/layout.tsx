import type { Metadata } from "next";
import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { AuthProvider } from "@/context/AuthContext";
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
    template: '%s | LiveActive',
    default: 'LiveActive',
  },
  description: 'Example site called LiveActive',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${inter.className} antialiased `}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
