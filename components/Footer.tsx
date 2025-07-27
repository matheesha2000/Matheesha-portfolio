"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram, FaArrowUp } from "react-icons/fa";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className="bg-[#1a1a1a] dark:bg-gray-900 text-white py-12 mt-5 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-[#ff014f] mb-4">Matheesha Kalatuwawa</h3>
            <p className="text-gray-400">
              Software Quality Assurance Engineer & Full Stack Developer passionate about creating bug-free, efficient applications.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-[#ff014f] mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition">
                  About Me
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-gray-400 hover:text-white transition">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/contacts" className="text-gray-400 hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-[#ff014f] mb-4">Contact Info</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Pothuhera, Sri Lanka</li>
              <li>matheeshakalatuwawa@gmail.com</li>
              <li>+94 76 475 3712</li>
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-[#ff014f] mb-4">Connect With Me</h3>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/matheesha2000" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#ff014f] transition text-2xl"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
              <a 
                href="https://www.linkedin.com/in/matheesha-kalatuwawa/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#ff014f] transition text-2xl"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
              <a 
                href="https://web.facebook.com/matheesha.kalatuwawa.9" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#ff014f] transition text-2xl"
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>
              <a 
                href="https://www.instagram.com/matheeesha.__/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#ff014f] transition text-2xl"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mb-8"></div>

        {/* Copyright and Back to Top */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-gray-400 mb-4 md:mb-0"
          >
            &copy; {new Date().getFullYear()} Matheesha Kalatuwawa. All rights reserved.
          </motion.p>

          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex items-center text-[#ff014f] hover:text-white transition"
            aria-label="Back to top"
          >
            <span className="mr-2">Back to Top</span>
            <FaArrowUp />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}