import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "./globals.css";

import Navbar from "@/components/Navbar";
    
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "MatchFlow - Real-time Football",
  description: "Live scores, match results, standings, player stats and football news from top leagues around the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full antialiased`}
    >
      <body>
        <Navbar/>
        <main className="flex items-center justify-center flex-col">
          
          {children}
        </main>
      </body>
    </html>
  );
}