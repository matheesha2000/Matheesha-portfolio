"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const titles = ["Quality Assurance Engineer", "Web Developer"];
const images = ["/images/hero/profile1.jpg", "/images/hero/profile2.jpg"];

export default function Home() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading) return;

    const currentTitle = titles[index];
    const speed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      setText((prev) =>
        isDeleting
          ? currentTitle.substring(0, prev.length - 1)
          : currentTitle.substring(0, prev.length + 1)
      );

      if (!isDeleting && text === currentTitle) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setIndex((prevIndex) => (prevIndex + 1) % titles.length);
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, index, loading]);

  useEffect(() => {
    if (loading) return;
    const interval = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [loading]);

  return (
    <>
      <Navbar />

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="flex items-center justify-center h-screen bg-white dark:bg-[#1a1a1a]"
          >
            <div className="w-16 h-16 border-4 border-t-[#ff014f] border-[#ddd] rounded-full animate-spin"></div>
          </motion.div>
        ) : (
          <motion.main
            key="content"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="relative bg-cover bg-center bg-no-repeat dark:bg-[url('/assets/img/hero/hero-bg-img-dark.png')] font-poppins"
          >
            <div className="container mx-auto px-4 py-16 sm:py-20 lg:mt-20">
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
                {/* Hero Image */}
                <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-sm h-96 sm:h-120 md:h-[400px] lg:h-120 mx-auto mt-6 lg:mt-0 mb-8 lg:mb-0 lg:mr-12">
                  {images.map((src, i) => (
                    <Image
                      key={i}
                      src={src}
                      alt={`Profile ${i + 1}`}
                      width={500}
                      height={500}
                      className={`absolute top-0 left-0 w-full h-full object-cover transition-all duration-1000 ease-in-out rounded-3xl shadow-lg ${
                        i === imgIndex ? "opacity-100 scale-100" : "opacity-0 scale-95"
                      }`}
                      priority={i === imgIndex}
                    />
                  ))}
                </div>

                {/* Hero Content */}
                <div className="text-center lg:text-left max-w-2xl lg:mt-30">
                  <span className="block text-[#ff014f] text-xl sm:text-2xl font-bold italic mb-2 sm:mb-3">
                    HELLO I&apos;M
                  </span>
                  <h1 className="text-4xl sm:text-5xl font-bold mb-3 text-[#212428] dark:text-white">
                    Matheesha Kalatuwawa.
                  </h1>
                  <h2 className="text-2xl sm:text-3xl text-gray-600 dark:text-gray-300 mb-4 min-h-[40px]">
                    {text}
                    <span className="animate-pulse ml-1">|</span>
                  </h2>

                  <p className="text-base sm:text-lg text-gray-700 dark:text-gray-400 mb-6">
                    I’m a third-year Software Engineering undergraduate at the University of Plymouth, focused on
                    Software Quality Assurance, Testing, and Web Development.
                  </p>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-8 sm:gap-20">
                    <Link
                      href="#about"
                      className="px-6 py-3 text-lg sm:text-xl bg-[#ff014f] text-white rounded-full hover:bg-[#e60043] transition"
                    >
                      About Me
                    </Link>

                    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
                      <span className="text-lg font-bold text-gray-800 dark:text-white">Follow Me:</span>
                      <div className="flex gap-3 text-xl">
                        <a
                          href="https://www.linkedin.com/in/matheesha-kalatuwawa/"
                          aria-label="Linkedin"
                          className="w-10 h-10 flex items-center justify-center text-gray-800 border-2 rounded-full dark:text-white hover:text-[#ff014f]"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="ri-linkedin-fill"></i>
                        </a>
                        <a
                          href="https://github.com/matheesha2000"
                          aria-label="Github"
                          className="w-10 h-10 flex items-center justify-center text-gray-800 border-2 rounded-full dark:text-white hover:text-[#ff014f]"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="ri-github-fill"></i>
                        </a>
                        <a
                          href="https://web.facebook.com/matheesha.kalatuwawa.9"
                          aria-label="Facebook"
                          className="w-10 h-10 flex items-center justify-center text-gray-800 border-2 rounded-full dark:text-white hover:text-[#ff014f]"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="ri-facebook-fill"></i>
                        </a>
                        <a
                          href="https://www.instagram.com/matheeesha.__/"
                          aria-label="Instagram"
                          className="w-10 h-10 flex items-center justify-center text-gray-800 border-2 rounded-full dark:text-white hover:text-[#ff014f]"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="ri-instagram-fill"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}
