"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Projects() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const [selectedCategory, setSelectedCategory] = useState("Featured");

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

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.categories.includes(selectedCategory));

  return (
    <>
      <Navbar />
      <main className="main__content_wrapper inner__page--content mt-30">
        <div className="page__heading text-center py-7">
          <h1 className="page__heading--title text-4xl font-bold">MY PORTFOLIO</h1>
          <h2 className="page__heading--subtitle text-xl font-semibold text-[#ff014f]">
            <span className="text-[#ff014f]">PROJECTS</span>
          </h2>
        </div>

        {/* Category Filter */}
        <div className="text-center ">
          <div className="inline-flex gap-4 flex-wrap justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition duration-300 ${
                  selectedCategory === category
                    ? "bg-[#ff014f] text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-[#ff014f] hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Section */}
        <section className="portfolio__section section--padding">
          <div className="container mx-auto px-20">
            <div className="portfolio__section--inner">
              <div className="portfolio__grid grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
                {filteredProjects.map((project, index) => (
                  <div
                    key={index}
                    data-aos="fade-up"
                    data-aos-delay={`${index * 100}`}
                    className="element-item transition-transform duration-300 ease-in-out transform hover:scale-105"
                  >
                    <div className="portfolio__card relative group overflow-hidden rounded-md shadow-md w-[350px] h-[220px] mx-auto">
                      <a href="#" className="block w-full h-full">
                        <div className="portfolio__image--card relative w-full h-full transition-opacity duration-500 ease-in-out group-hover:opacity-70">
                          <Image
                            src={project.image}
                            alt={project.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="portfolio__content absolute inset-0 bg-opacity-40 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out flex flex-col justify-center items-center text-center p-3">
                          <span className="portfolio__zoom text-[#ff014f] mb-1 text-lg">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="32"
                              height="32"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="feather feather-maximize"
                            >
                              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                            </svg>
                          </span>
                          <h3 className="portfolio__title text-[#ff014f] text-lg font-semibold mb-1">
                            {project.name}
                          </h3>
                          <p className="portfolio__desc text-[#ff014f] text-xs">
                            {project.description}
                          </p>
                        </div>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
              {filteredProjects.length === 0 && (
                <div className="text-center text-gray-500 mt-10">
                  No projects found for "{selectedCategory}" category.
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
