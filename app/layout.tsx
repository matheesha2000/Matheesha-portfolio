import "@/app/globals.css";
import Navbar from "@/components/Navbar";
import type { ReactNode } from "react";
import { Poppins } from "next/font/google";

// Import and configure Google Font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins", // Tailwind will use this
});

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <html lang="en" className={`dark ${poppins.variable} font-sans`}>
      <body>
        <Navbar />    
        {children}
      </body>
    </html>
  );
}
