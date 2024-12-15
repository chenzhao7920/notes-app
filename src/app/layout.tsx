import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Notes App",
  description: "A simple notes application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className='light'>
      <body>
        <Providers>
          <div className="container flex flex-col h-screen">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
