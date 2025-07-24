"use client";

import { useState } from "react";
import Link from "next/link";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-transparent">
      <div className="w-full bg-[#ffffff] dark:bg-[#1a1a1a] shadow-sm">
        <div className="container mx-auto px-4 py-5 flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <span className="flex items-center space-x-4 text-2xl font-bold text-gray-900 dark:text-[#ff014f] animate-pulse">
              MATHEESHA
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-10 font-bold text-lg">
            <Link href="/" className="text-[#212428] dark:text-[#ffffff] hover:text-[#ff014f]">Home</Link>
            <Link href="/about" className="text-[#212428] dark:text-[#ffffff] hover:text-[#ff014f]">About</Link>
            <Link href="/projects" className="text-[#212428] dark:text-[#ffffff] hover:text-[#ff014f]">Projects</Link>
            <Link href="#contact" className="text-[#212428] dark:text-[#ffffff] hover:text-[#ff014f]">Contact</Link>
            <a
              href="/documents/QA Intern CV - Matheesaha Kalatuwawa.pdf"
              download
              className="ml-6 inline-flex items-center px-4 py-2 border-2 border-[#ff014f] text-[#ff014f] dark:text-[#ffffff] hover:bg-[#ff014f] hover:text-white dark:border-[#ffffff] dark:hover:bg-[#ff014f] dark:hover:border-[#ff014f] dark:hover:text-black rounded-full transition"
            >
              <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4m7 0l3 3m0 0l3-3m-3 3V3" />
              </svg>
              Download CV
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button className="lg:hidden text-[#212428] dark:text-[#ffffff]" onClick={() => setMenuOpen(!menuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden px-4 pb-4 space-y-2 bg-[#ffffff] dark:bg-[#1a1a1a]">
            {["home", "about", "projects", "contact"].map((section) => (
              <Link
                key={section}
                href={section === "home" ? "/" : `/${section}`}
                className="block text-[#212428] dark:text-[#ffffff] hover:text-[#ff014f]"
                onClick={() => setMenuOpen(false)}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Link>
            ))}
            <a
              href="/documents/QA Intern CV - Matheesaha Kalatuwawa.pdf"
              download
              className="mt-2 inline-flex items-center px-4 py-2 border border-[#ff014f] text-[#ffffff] dark:text-[#ffffff] hover:bg-[#ff014f] hover:text-[#ff014f] dark:border-[#ffffff] dark:hover:bg-[#ff014f] dark:hover:border-[#ff014f] dark:hover:text-black rounded-full transition"
            >
              Download CV
            </a>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
