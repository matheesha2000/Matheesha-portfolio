"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import FloatingCircles from "@/components/FloatingCircles";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaDotCircle, FaChevronLeft, FaChevronRight, FaArrowRight } from "react-icons/fa";
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

// === Project Types ===
type GitHubRepo = { label: string; url: string };
type ProjectType = {
  name: string;
  description: string;
  image: string;
  categories: string[];
  detailedDescription?: string;
  moreImages?: string[];
  techStack?: string[];
  github?: string | GitHubRepo[];
  liveDemo?: string;
};

const projects: ProjectType[] = [
  {
    name: "Greenie",
    description: "Eco-friendly lifestyle app for green living.",
    image: "/images/projects/greenie/greenie.jpg",
    categories: ["Featured", "Dev"],
    detailedDescription:
      "Greenie is a web-based platform that promotes sustainable living through gamification. It encourages users to adopt eco-friendly habits—such as recycling, reducing waste, and conserving resources—by turning them into fun, interactive challenges. Users earn points, unlock rewards, and climb leaderboards as they complete tasks, making sustainability engaging, rewarding, and easy to stick with.",
    moreImages: [
      "/images/projects/greenie/greenie2.png",
      "/images/projects/greenie/greenie3.png",
      "/images/projects/greenie/greenie4.png",
      "/images/projects/greenie/greenie5.png",
      "/images/projects/greenie/greenie6.png",
    ],
    techStack: ["React", "Springboot", "MongoDB", "Tailwind CSS", "AWS"],
    github: [
      { label: "Frontend", url: "https://github.com/dizzpy/Greenie-Web" },
      { label: "Backend", url: "https://github.com/mrakiyaaa/Greenie-Backend-V2" },
      { label: "Admin", url: "https://github.com/dizzpy/Greenie-Admin" },
    ],
    liveDemo: "https://test.greenie.dizzpy.dev/login",
  },
  {
    name: "ABC Cinema",
    description: "Movie booking platform with real-time seat availability.",
    image: "/images/projects/abcCinema/abcCinema.png",
    categories: ["Featured", "Dev"],
    detailedDescription:
      "ABC Cinema is a dynamic, web-based application designed to enhance the moviegoing experience. Users can easily browse the latest movies, view detailed information including trailers, cast, and showtimes, and book tickets directly through the platform. The application also features a personalized user dashboard where customers can manage their bookings, submit reviews, rate films, and see recommendations based on their preferences. With a user-friendly interface and real-time seat selection, ABC Cinema streamlines everything from discovering new releases to securing your favorite seats—making movie nights more convenient and engaging.",
    moreImages: [
      "/images/projects/abcCinema/HomePage.png",
      "/images/projects/abcCinema/MoviesPage.png",
      "/images/projects/abcCinema/MoviePreview.png",
      "/images/projects/abcCinema/paymentinfo.png",
    ],
    techStack: ["Java", "Servlets", "Tailwind CSS", "JavaScript", "MariaDB", "Firebase"],
    github: [
      { label: "Main", url: "https://github.com/dizzpy/ABC-Cinema-Main" },
      { label: "Admin", url: "https://github.com/dizzpy/ABC-Cinema-Admin" },
    ],
  },
  {
    name: "Swag Labs Automation Testing",
    description: "Automated UI tests for the Swag Labs e-commerce site.",
    image: "/images/projects/swaglabs/swaglabs.png",
    categories: ["Featured", "QA"],
    detailedDescription:
      "Developed automated UI tests using Selenium and TestNG to verify critical user flows on the Swag Labs e-commerce platform, including login, product selection, cart, and checkout. Added assertions to ensure UI accuracy and reported bugs for quick resolution.",
    moreImages: [
      "/videos/swaglabsrecording.mp4",
      "/images/projects/swaglabs/swaglabs1.png",
      "/images/projects/swaglabs/swaglabs2.png",
      "/images/projects/swaglabs/swaglabs3.png",
    ],
    techStack: ["Selenium", "TestNG", "Java"],
    github: "https://github.com/matheesha2000/SwagLabs-Automation-Testing",
  },
  {
    name: "ClearSky Testing",
    description: "QA solution for weather-based web services.",
    image: "/images/projects/clearsky/clearsky.png",
    categories: ["QA"],
    detailedDescription:
      "ClearSky offers manual testing and development for weather forecasting APIs and UI components. We validate API responses, data accuracy, and user interfaces through real-world scenario testing, catching issues automation may miss. By collaborating with developers, we ensure weather data, visualizations, and backend logic are accurate, reliable, and deployment-ready.",
    moreImages: [
      "/images/projects/clearsky/admin login.png",
      "/images/projects/clearsky/home page.png",
      "/images/projects/clearsky/data simulate.png",
    ],
    techStack: ["HTML", "CSS", "JavaScript", "Laravel", "MySQL", "Manual Testing"],
    github: [
      { label: "Dev", url: "https://github.com/dizzpy/ClearSky-Laravel" },
      { label: "Testing", url: "https://github.com/matheesha2000/ClearSky-Testing" },
    ],
  },
  {
    name: "Studee",
    description: "Student-focused productivity and collaboration platform.",
    image: "/images/projects/studee.jpg",
    categories: ["Dev"],
    detailedDescription:
      "Studee helps students collaborate, organize notes, and manage study schedules. It offers a central platform for sharing resources, tracking assignments, and setting reminders—making it easier to stay productive, organized, and connected with peers.",
    moreImages: ["/images/projects/studee.jpg"],
    techStack: ["C#", "ASP.NET", "Firebase", "Material UI"],
    github: "https://github.com/dizzpy/StudyPlanner-Studee2.0",
  },
  {
    name: "Grow Box",
    description: "Smart gardening system focused on efficient plant care and automation.",
    image: "/images/projects/growbox.jpg",
    categories: ["Dev"],
    detailedDescription:
      "This system helps users monitor and manage their gardens through features like automated watering schedules, environmental tracking, and plant care reminders. It's designed to simplify gardening, improve plant health, and support users with timely, intelligent guidance.",
    moreImages: ["/images/projects/growbox.jpg"],
    techStack: ["HTML", "CSS", "JavaScript", "MySQL", "PHP"],
    github: "https://github.com/wtgsoysa/growBox2.0",
  },
  {
    name: "Triploo",
    description: "Travel itinerary planner with smart suggestions.",
    image: "/images/projects/triploo.jpg",
    categories: ["Dev"],
    detailedDescription:
      "Triploo helps travelers create custom itineraries with suggestions based on interests, weather, and local events.",
    moreImages: ["/images/projects/triploo.jpg"],
    techStack: ["HTML", "CSS", "JavaScript", "MySQL", "PHP"],
    github: "https://github.com/dizzpy/Triploo-Redesign",
  },
];

const categories = ["Featured", "All", "Dev", "QA"];

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

// === EducationCard Component ===
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

// === ProjectDetails Component ===
function ProjectDetails({
  project,
  onClose,
}: {
  project: ProjectType;
  onClose: () => void;
}) {
  const images = project.moreImages ?? [];
  const techStack = project.techStack ?? [];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setCurrentImageIndex(0);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [project]);

  const prevImage = () => {
    setCurrentImageIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  };

  const nextImage = () => {
    setCurrentImageIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  };

  const currentImage = images[currentImageIndex];
  const isVideo = currentImage?.endsWith(".mp4");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-xl max-w-4xl w-full p-6 relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-900 dark:hover:text-white text-2xl font-bold"
          aria-label="Close modal"
        >
          &times;
        </button>

        {images.length > 0 && (
          <div className="relative mb-6">
            <div className="relative w-full rounded-lg overflow-hidden">
              {isVideo ? (
                <video
                  controls
                  width="100%"
                  className="w-full h-auto object-contain rounded"
                >
                  <source src={currentImage} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <Image
                  src={currentImage}
                  alt={`${project.name} image ${currentImageIndex + 1}`}
                  width={1000}
                  height={600}
                  className="w-full h-auto object-contain rounded"
                />
              )}
            </div>

            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute top-1/2 left-2 -translate-y-1/2 bg-[#ff014f] bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 text-white"
                  aria-label="Previous image"
                >
                  <FaChevronLeft size={20} />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute top-1/2 right-2 -translate-y-1/2 bg-[#ff014f] bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 text-white"
                  aria-label="Next image"
                >
                  <FaChevronRight size={20} />
                </button>
              </>
            )}
          </div>
        )}

        <h2 className="text-3xl font-bold mb-4 text-[#ff014f]">{project.name}</h2>

        <p className="mb-4 text-gray-700 dark:text-gray-300 whitespace-pre-line">
          {project.detailedDescription ?? project.description}
        </p>

        <div className="mb-4">
          <h3 className="font-semibold mb-2 text-lg">Tech Stack:</h3>
          {techStack.length > 0 ? (
            <ul className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <li
                  key={tech}
                  className="bg-[#ff014f] text-white rounded-full px-3 py-1 text-sm"
                >
                  {tech}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No tech stack info available.</p>
          )}
        </div>

        <div className="flex flex-wrap gap-4">
          {project.github && (
            Array.isArray(project.github) ? (
              project.github.map((repo, idx) => (
                <a
                  key={idx}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
                >
                  {repo.label}
                </a>
              ))
            ) : (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
              >
                GitHub
              </a>
            )
          )}
          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#ff014f] text-white rounded hover:bg-pink-600"
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Featured");
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);

  const { ref: skillsRef, inView: skillsInView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.categories.includes(selectedCategory));

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisited");

    if (!hasVisited) {
      setLoading(true);
      sessionStorage.setItem("hasVisited", "true");
      const timer = setTimeout(() => setLoading(false), 1000);
      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
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
        setIndex((prev) => (prev + 1) % titles.length);
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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

            {/* Hero Section */}
            <section className="container mx-auto px-2 py-16 sm:py-20 lg:mt-20 relative z-10">
              <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-10">
                <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md h-[320px] sm:h-[400px] mx-auto">
                  {images.map((src, i) => (
                    <Image
                      key={i}
                      src={src}
                      alt={`Profile ${i + 1}`}
                      fill
                      className={`absolute inset-0 object-cover rounded-3xl shadow-lg transition-opacity duration-1000 ease-in-out ${
                        i === imgIndex ? "opacity-100 scale-100" : "opacity-0 scale-95"
                      }`}
                      priority={i === imgIndex}
                    />
                  ))}
                </div>

                <div className="text-center lg:text-left max-w-3xl">
                  <span className="block text-[#ff014f] text-xl sm:text-2xl font-semibold italic mb-2">HELLO I'M</span>
                  <h1 className="text-4xl sm:text-5xl font-bold mb-3 text-[#212428] dark:text-white">
                    Matheesha Kalatuwawa.
                  </h1>
                  <h2 className="text-2xl sm:text-3xl text-gray-600 dark:text-gray-300 mb-4 min-h-[40px]">
                    {text}
                  </h2>
                  <p className="text-base sm:text-lg text-gray-700 dark:text-gray-400 mb-6">
                    I'm a third-year Software Engineering undergraduate at the University of Plymouth, focused on
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

            {/* About Section */}
            <section
              id="about"
              className="px-4 sm:px-6 lg:px-8 py-12 max-w-6xl mx-auto text-gray-800 dark:text-white relative z-10"
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

            {/* Education Section */}
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

            {/* Skills Section */}
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

            {/* Projects Section */}
            <section id="projects" className="px-4 sm:px-6 lg:px-8  max-w-7xl mx-auto">
              <div className="text-center mb-10">
                <h1 className="text-4xl font-extrabold mb-2 text-[#ff014f]">PROJECTS</h1>
                <h2 className="text-2xl font-semibold mb-20">
                  Some of my latest featured and QA projects
                </h2>
              </div>

              <div className="flex justify-center gap-6 flex-wrap mb-10">
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

              {filteredProjects.length === 0 ? (
                <p className="text-center text-gray-500 text-sm sm:text-base px-4 sm:px-0 ">
                  No projects found for "{selectedCategory}" category.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-20">
                  {filteredProjects.map((project, index) => (
                    <div
                      key={index}
                      data-aos="fade-up"
                      data-aos-delay={`${index * 100}`}
                      className="group rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-900 relative"
                    >
                      <div className="relative h-48 w-full overflow-hidden ">
                        <Image
                          src={project.image}
                          alt={project.name}
                          fill
                          className="object-cover rounded-t-xl group-hover:scale-110 transition-transform duration-500"
                          priority={index < 3}
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-lg mb-2 text-[#ff014f]">
                          {project.name}
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300">
                          {project.description}
                        </p>
                        <button
                          onClick={() => setSelectedProject(project)}
                          className="mt-4 text-[#ff014f] font-semibold flex items-center gap-2 hover:text-[#d60036] transition-all duration-300 group"
                        >
                          View More 
                          <FaArrowRight className="transform transition-transform duration-300 group-hover:translate-x-1" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {selectedProject && (
                <ProjectDetails
                  project={selectedProject}
                  onClose={() => setSelectedProject(null)}
                />
              )}
            </section>
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}