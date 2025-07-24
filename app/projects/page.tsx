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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-40">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold mb-2 text-[#ff014f]">PROJECTS</h1>
          <h2 className="text-2xl font-semibold ">Some of my latest featured and QA projects</h2>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center gap-6 flex-wrap">
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
                  className="group rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-900 cursor-pointer"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className="object-cover rounded-t-xl group-hover:scale-110 transition-transform duration-500"
                      priority={index < 3}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2 text-[#ff014f]">{project.name}</h3>
                    <p className="text-gray-700 dark:text-gray-300">{project.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
