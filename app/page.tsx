"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import FloatingCircles from "@/components/FloatingCircles";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaDotCircle } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import AOS from "aos";
import "aos/dist/aos.css";

// === Constants ===
const titles = ["Software Quality Assurance Engineer", "Full Stack Web Developer"];
const images = ["/images/hero/profile1.jpg", "/images/hero/profile2.jpg"];

const personalInfos = [
  { label: "First Name", value: "Matheesha" },
  { label: "Last Name", value: "Kalatuwawa" },
  { label: "Address", value: "Pothuhera" },
  { label: "Phone", value: "+764753712" },
  { label: "Age", value: "25 Years" },
  { label: "Email", value: "matheeshakalatuwawa@gmail.com" },
  { label: "Nationality", value: "Sri Lankan" },
  { label: "Languages", value: "Sinhala, English" },
];

const educationData = [
  {
    title: "BSc (Hons) Software Engineering",
    subtitle: "Plymouth University (UK)",
    year: "2023–PRESENT",
    description:
      "Pursuing BSc (Hons) in Software Engineering via NSBM Green University. Expected graduation: 2026.",
  },
  {
    title: "SQA Professional Programme",
    subtitle: "SLIIT Campus",
    year: "2024–2025",
    description:
      "Completed QA training covering Agile, API, performance, mobile, and security testing. Tools: Selenium, TestNG, Postman, JMeter.",
  },
  {
    title: "Certificate in Software Engineering",
    subtitle: "NIBM Campus",
    year: "2022–2023",
    description: "Learned HTML, CSS, JS, C#, .NET, and OOP basics for web development.",
  },
];

// === SkillBar Component ===
const SkillBar = ({
  name,
  percent,
  inView,
}: {
  name: string;
  percent: string;
  inView: boolean;
}) => (
  <div className="mb-6">
    <div className="flex justify-between text-sm mb-1">
      <span>{name}</span>
      <span>{percent}</span>
    </div>
    <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
      <motion.div
        className="h-2 bg-[#ff014f] rounded-full"
        initial={{ width: 0 }}
        animate={{ width: inView ? percent : 0 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />
    </div>
  </div>
);

// === Projects Data ===
const projects = [
  {
    name: "Greenie",
    description: "Eco-friendly lifestyle app for green living.",
    image: "/images/projects/greenie.jpg",
    categories: ["Featured", "Dev"],
  },
  {
    name: "ABC Cinema",
    description: "Movie booking platform with real-time seat availability.",
    image: "/images/projects/abcCinema.png",
    categories: ["Featured", "Dev"],
  },
  {
    name: "Swag Labs Automation Testing",
    description: "Automated UI tests for the Swag Labs e-commerce site.",
    image: "/images/projects/swaglabs.png",
    categories: ["Featured", "QA"],
  },
  {
    name: "ClearSky Testing",
    description: "QA solution for weather-based web services.",
    image: "/images/projects/clearsky.png",
    categories: ["QA"],
  },
  {
    name: "Studee",
    description: "Student-focused productivity and collaboration platform.",
    image: "/images/projects/studee.jpg",
    categories: ["Dev"],
  },
  {
    name: "Grow Box",
    description: "Smart gardening system with IoT integration.",
    image: "/images/projects/growbox.jpg",
    categories: ["Dev"],
  },
  {
    name: "Triploo",
    description: "Travel itinerary planner with smart suggestions.",
    image: "/images/projects/triploo.jpg",
    categories: ["Dev"],
  },
];

const categories = ["Featured", "All", "Dev", "QA"];

// === New EducationCard component ===
function EducationCard({
  item,
  index,
}: {
  item: typeof educationData[0];
  index: number;
}) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative group border border-none dark:border-gray-700 rounded-xl p-6 bg-white dark:bg-gray-900 shadow-md hover:shadow-xl transition duration-300 hover:-translate-y-1"
    >
      <div className="absolute top-4 right-4 bg-[#ff014f] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
        {item.year}
      </div>
      <div className="pt-10">
        <h3 className="text-lg sm:text-xl font-semibold text-[#ff014f] mb-2">{item.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{item.subtitle}</p>
        <p className="text-sm text-gray-700 dark:text-gray-300">{item.description}</p>
      </div>
    </motion.div>
  );
}

export default function Home() {
  // State and hooks
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Featured");

  const { ref: skillsRef, inView: skillsInView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.categories.includes(selectedCategory));

  // Loader effect
  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisited");

    if (!hasVisited) {
      // First time entering the website
      setLoading(true);
      sessionStorage.setItem("hasVisited", "true");

      const timer = setTimeout(() => setLoading(false), 1000); // Adjust timing if needed
      return () => clearTimeout(timer);
    } else {
      // Subsequent page views in the same session
      setLoading(false);
    }
  }, []);

  // Initialize AOS for animations
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  // Typing effect for hero titles
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
        setIndex((prev) => (prev + 1) % titles.length);
      }
    }, speed);
    return () => clearTimeout(timeout);
  }, [text, isDeleting, index, loading]);

  // Image switching effect
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
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center h-screen bg-white dark:bg-[#1a1a1a]"
          >
            <div className="w-16 h-16 border-4 border-t-[#ff014f] border-[#ddd] rounded-full animate-spin"></div>
          </motion.div>
        ) : (
          <motion.main
            key="content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="relative bg-cover bg-center bg-no-repeat dark:bg-[url('/assets/img/hero/hero-bg-img-dark.png')] font-poppins overflow-hidden"
          >
            <FloatingCircles />

            {/* === HERO SECTION === */}
            <section className="container mx-auto px-2 py-16 sm:py-20 lg:mt-20 relative z-10">
              <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-10">
                <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md h-[320px] sm:h-[400px] mx-auto">
                  {images.map((src, i) => (
                    <Image
                      key={i}
                      src={src}
                      alt={`Profile ${i + 1}`}
                      fill
                      className={`absolute inset-0 object-cover rounded-3xl  shadow-lg transition-opacity duration-1000 ease-in-out ${
                        i === imgIndex ? "opacity-100 scale-100" : "opacity-0 scale-95"
                      }`}
                      priority={i === imgIndex}
                    />
                  ))}
                </div>

                <div className="text-center lg:text-left max-w-3xl">
                  <span className="block text-[#ff014f] text-xl sm:text-2xl font-semibold italic mb-2">HELLO I’M</span>
                  <h1 className="text-4xl sm:text-5xl font-bold mb-3 text-[#212428] dark:text-white">
                    Matheesha Kalatuwawa.
                  </h1>
                  <h2 className="text-2xl sm:text-3xl text-gray-600 dark:text-gray-300 mb-4 min-h-[40px]">
                    {text}
                  </h2>
                  <p className="text-base sm:text-lg text-gray-700 dark:text-gray-400 mb-6">
                    I’m a third-year Software Engineering undergraduate at the University of Plymouth, focused on
                    Software Quality Assurance, Testing, and Web Development.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-12">
                    <a
                      href="/about"
                      className="px-6 py-3 text-lg bg-[#ff014f] text-white rounded-full hover:bg-[#e60043] transition"
                    >
                      About Me
                    </a>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-lg font-bold text-gray-800 dark:text-white">Follow Me:</span>
                      <a
                        href="https://www.linkedin.com/in/matheesha-kalatuwawa/"
                        target="_blank"
                        rel="noreferrer"
                        className="w-10 h-10 flex items-center justify-center text-gray-800 border-2 rounded-full dark:text-white hover:text-[#ff014f]"
                      >
                        <i className="ri-linkedin-fill" />
                      </a>
                      <a
                        href="https://github.com/matheesha2000"
                        target="_blank"
                        rel="noreferrer"
                        className="w-10 h-10 flex items-center justify-center text-gray-800 border-2 rounded-full dark:text-white hover:text-[#ff014f]"
                      >
                        <i className="ri-github-fill" />
                      </a>
                      <a
                        href="https://web.facebook.com/matheesha.kalatuwawa.9"
                        target="_blank"
                        rel="noreferrer"
                        className="w-10 h-10 flex items-center justify-center text-gray-800 border-2 rounded-full dark:text-white hover:text-[#ff014f]"
                      >
                        <i className="ri-facebook-fill" />
                      </a>
                      <a
                        href="https://www.instagram.com/matheeesha.__/"
                        target="_blank"
                        rel="noreferrer"
                        className="w-10 h-10 flex items-center justify-center text-gray-800 border-2 rounded-full dark:text-white hover:text-[#ff014f]"
                      >
                        <i className="ri-instagram-fill" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* === ABOUT SECTION === */}
            <section
              id="about"
              className="px-4 sm:px-6 lg:px-8 py-12  max-w-6xl mx-auto text-gray-800 dark:text-white relative z-10"
            >
              <div className="text-center mb-14">
                <h2 className="text-[#ff014f] text-3xl sm:text-4xl font-extrabold">ABOUT ME</h2>
              </div>

              <div className="flex flex-col-reverse md:grid md:grid-cols-2 gap-y-12 gap-x-20 items-center">
                {/* Text Content */}
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold mb-6 leading-snug">
                    I catch bugs early using QA.
                  </h1>
                  <h3 className="text-base sm:text-lg font-semibold text-[#ff014f] mb-4">PERSONAL INFOS:</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-base">
                    {personalInfos.map((item, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <FaDotCircle className="text-[#ff014f] text-sm flex-shrink-0" />
                        <span>
                          {item.label}: {item.value}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    className="inline-block mt-8 bg-[#ff014f] text-white px-6 py-3 rounded-md text-base font-semibold hover:opacity-90 transition"
                  >
                    Contact Me
                  </a>
                </div>

                {/* Image */}
                <div className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto">
                  <Image
                    src="/images/about/about1.jpg"
                    alt="About"
                    width={500}
                    height={500}
                    className="rounded-lg transition duration-500 hover:scale-105 object-cover w-full h-auto"
                  />
                </div>
              </div>
            </section>

            {/* === EDUCATION SECTION === */}
            <section className="px-4 sm:px-6 lg:px-8 py-12 max-w-6xl mx-auto text-gray-800 dark:text-white">
              <div className="text-center mb-12">
                <h2 className="text-[#ff014f] text-4xl sm:text-4xl font-extrabold mb-4">EDUCATION</h2>
                <h1 className="text-2xl sm:text-2xl font-bold">Resume of Education</h1>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {educationData.map((item, index) => (
                  <EducationCard key={index} item={item} index={index} />
                ))}
              </div>
            </section>

            {/* === SKILLS SECTION === */}
            <motion.section
              ref={skillsRef}
              className="mb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-gray-800 dark:text-white"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-12">
                <div className="w-full max-w-full text-center md:text-left">
                  <h2 className="text-[#ff014f] text-4xl text-center font-extrabold mb-6">SKILLS</h2>
                  <h1 className="text-2xl sm:text-3xl font-bold whitespace-normal sm:whitespace-nowrap">
                    My QA and Development Skillset Expertise
                  </h1>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Development Skills */}
                <div>
                  <h3 className="text-xl font-semibold text-[#ff014f] mb-4">Development Skills</h3>
                  <SkillBar name="HTML/CSS" percent="100%" inView={skillsInView} />
                  <SkillBar name="React.js" percent="90%" inView={skillsInView} />
                  <SkillBar name="JavaScript" percent="75%" inView={skillsInView} />
                  <SkillBar name="Java" percent="70%" inView={skillsInView} />
                  <SkillBar name="MongoDB" percent="70%" inView={skillsInView} />
                  <SkillBar name="Node.js" percent="60%" inView={skillsInView} />
                  <SkillBar name="Next.js" percent="65%" inView={skillsInView} />
                  <SkillBar name="Tailwind CSS" percent="80%" inView={skillsInView} />
                </div>

                {/* QA Skills */}
                <div>
                  <h3 className="text-xl font-semibold text-[#ff014f] mb-4">QA Skills</h3>
                  <SkillBar name="Manual Testing" percent="90%" inView={skillsInView} />
                  <SkillBar name="Automation Testing" percent="70%" inView={skillsInView} />
                  <SkillBar name="Selenium" percent="65%" inView={skillsInView} />
                  <SkillBar name="Postman" percent="75%" inView={skillsInView} />
                  <SkillBar name="JMeter" percent="60%" inView={skillsInView} />
                  <SkillBar name="API Testing" percent="60%" inView={skillsInView} />
                </div>
              </div>
            </motion.section>

            {/* === PROJECTS SECTION  === */}
            <section id="projects" className="portfolio__section section--padding pb-20 ">
              <div className="text-center py-10">
                <h2 className="text-[#ff014f] text-4xl font-extrabold mb-3">PROJECTS</h2>
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
                  Some of my latest featured and QA projects
                </h3>
              </div>

              {/* Category Tabs */}
              <div className="flex sm:px-6 lg:px-8 justify-center gap-6 mb-12">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-6 py-2 rounded-full border-2 font-semibold transition ${
                      selectedCategory === cat
                        ? "border-[#ff014f] bg-[#ff014f] text-white"
                        : "border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-300 hover:border-[#ff014f]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {filteredProjects.map((project, i) => (
                  <motion.div
                    key={i}
                    data-aos="fade-up"
                    className="group rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-900 cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        className="object-cover rounded-t-xl group-hover:scale-110 transition-transform duration-500"
                        priority={i < 3}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-2 text-[#ff014f]">{project.name}</h3>
                      <p className="text-gray-700 dark:text-gray-300">{project.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}
