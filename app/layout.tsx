import type { Metadata } from "next";
import localFont from "next/font/local";
import { ClerkProvider, ClerkLoading, ClerkLoaded } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import "./globals.css";
import NavBar from "@/components/NavBar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Demo Quiz App",
  description: "For Upwrok demo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ClerkLoading>
            <div className="h-screen flex justify-center items-center">
              Loading...
            </div>
          </ClerkLoading>
          <ClerkLoaded>
            <main>
              <NavBar />
              {children}
            </main>
          </ClerkLoaded>
        </body>
      </html>
    </ClerkProvider>
  );
}
