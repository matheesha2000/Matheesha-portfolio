"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { FaArrowRight } from "react-icons/fa";


// Types
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

// Type guard for GitHubRepo[]
function isGitHubRepoArray(github: string | GitHubRepo[] | undefined): github is GitHubRepo[] {
  return (
    Array.isArray(github) &&
    github.every(
      (link) =>
        typeof link === "object" &&
        "label" in link &&
        "url" in link &&
        typeof link.label === "string" &&
        typeof link.url === "string"
    )
  );
}

const projects: ProjectType[] = [
  {
    name: "Greenie",
    description: "Eco-friendly lifestyle app for green living.",
    image: "/images/projects/greenie.jpg",
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
    github:  [
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
    // liveDemo: "https://abccinema.example.com",
  },
  {
    name: "Swag Labs Automation Testing",
    description: "Automated UI tests for the Swag Labs e-commerce site.",
    image: "/images/projects/swaglabs.png",
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
    github: "https://github.com/yourusername/swaglabs-tests",
  },
  {
    name: "ClearSky Testing",
    description: "QA solution for weather-based web services.",
    image: "/images/projects/clearsky.png",
    categories: ["QA"],
    detailedDescription:
      "ClearSky offers manual testing and development for weather forecasting APIs and UI components. We validate API responses, data accuracy, and user interfaces through real-world scenario testing, catching issues automation may miss. By collaborating with developers, we ensure weather data, visualizations, and backend logic are accurate, reliable, and deployment-ready.",
    moreImages: ["/images/projects/clearsky/admin login.png",
      "/images/projects/clearsky/home page.png",
      "/images/projects/clearsky/data simulate.png",
    ],
    techStack: ["HTML", "CSS", "JavaScript", "Laravel", "MySQL", "Manual Testing"],
    github:[
      { label: "Dev", url: "https://github.com/dizzpy/ClearSky-Laravel" },
      { label: "Testing", url: "https://github.com/matheesha2000/ClearSky-Testing" },
    ],
    // liveDemo: "https://clearsky.dizzpy.dev/",
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
    // liveDemo: "https://studee.example.com",
  },
  {
    name: "Grow Box",
    description:"Smart gardening system focused on efficient plant care and automation.",
    image: "/images/projects/growbox.jpg",
    categories: ["Dev"],
    detailedDescription:
      "This system helps users monitor and manage their gardens through features like automated watering schedules, environmental tracking, and plant care reminders. It’s designed to simplify gardening, improve plant health, and support users with timely, intelligent guidance.",
    moreImages: [
      "/images/projects/growbox.jpg",
    ],
    techStack: ["HTML", "CSS", "JavaScript", "MySQL", "PHP"],
    github:"https://github.com/wtgsoysa/growBox2.0",
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
    // liveDemo: "https://triploo.example.com",
  },
];

// Modal component for project details
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

  function prevImage() {
    setCurrentImageIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  }

  function nextImage() {
    setCurrentImageIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  }

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
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-900 dark:hover:text-white text-2xl font-bold"
          aria-label="Close modal"
        >
          &times;
        </button>

        {/* Image or Video Preview */}
{images.length > 0 && (
  <div className="relative mb-6">
    <div className="relative w-full rounded-lg overflow-hidden">
      {images[currentImageIndex].endsWith(".mp4") ? (
        <video
          controls
          width="100%"
          className="w-full h-auto object-contain rounded"
        >
          <source src={images[currentImageIndex]} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <Image
          src={images[currentImageIndex]}
          alt={`${project.name} image ${currentImageIndex + 1}`}
          width={1000}
          height={600}
          className="w-full h-auto object-contain rounded"
        />
      )}
    </div>

    {/* Navigation Buttons */}
    {images.length > 1 && (
      <>
        <button
          onClick={prevImage}
          className="absolute top-1/2 left-2 -translate-y-1/2 bg-[#ff014f] bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 text-white"
          aria-label="Previous image"
        >
          <FaChevronLeft size={20} />
        </button>

        <button
          onClick={nextImage}
          className="absolute top-1/2 right-2 -translate-y-1/2 bg-[#ff014f] bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 text-white"
          aria-label="Next image"
        >
          <FaChevronRight size={20} />
        </button>
      </>
    )}
  </div>
)}


        {/* Project Title */}
        <h2 className="text-3xl font-bold mb-4 text-[#ff014f]">{project.name}</h2>

        {/* Project Description */}
        <p className="mb-4 text-gray-700 dark:text-gray-300 whitespace-pre-line">
          {project.detailedDescription ?? project.description}
        </p>

        {/* Tech Stack */}
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

        {/* Links */}
        <div className="flex flex-wrap gap-4">
          {project.github &&
            (isGitHubRepoArray(project.github) ? (
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
            ))}
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

export default function Projects() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const [selectedCategory, setSelectedCategory] = useState("Featured");
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);

  const categories = ["Featured", "All", "Dev", "QA"];

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.categories.includes(selectedCategory));

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setSelectedProject(null);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-40">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold mb-2 text-[#ff014f]">PROJECTS</h1>
          <h2 className="text-2xl font-semibold">
            Some of my latest featured and QA projects
          </h2>
        </div>

        {/* Category Tabs */}
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

        {/* Projects Grid */}
        <section>
          {filteredProjects.length === 0 ? (
            <p className="text-center text-gray-500">
              No projects found for &quot;{selectedCategory}&quot; category.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <div
                  key={index}
                  data-aos="fade-up"
                  data-aos-delay={`${index * 100}`}
                  className="group rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-900 relative"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className="object-cover rounded-t-xl group-hover:scale-110 transition-transform duration-500"
                      priority={index < 3} // priority only for first 3 images
                    />
                    {/* <span className="absolute top-2 left-2 bg-[#ff014f] text-white text-xs font-semibold px-2 py-1 rounded">
                      {project.categories[0]}
                    </span> */}
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
        </section>

        {/* Modal */}
        {selectedProject && (
          <ProjectDetails
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </main>
    </>
  );
}
