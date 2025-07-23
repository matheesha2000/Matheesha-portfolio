"use client";

import Image from "next/image";
import { FaDotCircle } from "react-icons/fa";

// =========================
// SkillBar Component
// =========================
const SkillBar = ({ name, percent }: { name: string; percent: string }) => (
  <div className="mb-6">
    <div className="flex justify-between text-sm mb-1">
      <span>{name}</span>
      <span>{percent}</span>
    </div>
    <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
      <div
        className="h-2 bg-[#ff014f] rounded-full"
        style={{ width: percent }}
      ></div>
    </div>
  </div>
);

// =========================
// Personal Info Data
// =========================
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

// =========================
// Education Data
// =========================
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
    description:
      "Learned HTML, CSS, JS, C#, .NET, and OOP basics for web development.",
  },
];

// =========================
// About Component
// =========================
function About() {
  return (
    <main className="px-4 sm:px-6 lg:px-8 py-12 max-w-6xl mx-auto text-gray-800 dark:text-white">

      {/* === ABOUT SECTION === */}
      <section className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-[#ff014f] text-3xl sm:text-4xl font-extrabold">ABOUT ME</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-10 items-center">
          {/* === Text Content === */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-6">
              I catch bugs early using QA.
            </h1>
            <h3 className="text-lg font-semibold text-[#ff014f] mb-4">
              PERSONAL INFOS:
            </h3>
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
              href="#"
              className="inline-block mt-8 bg-[#ff014f] text-white px-6 py-3 rounded-md text-base font-semibold hover:opacity-90 transition"
            >
              Contact Me
            </a>
          </div>

          {/* === Image Content === */}
          <div className="relative w-full max-w-md mx-auto md:mx-0">
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
      <section className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-[#ff014f] text-3xl sm:text-4xl font-extrabold mb-4">
            EDUCATION
          </h2>
          <h1 className="text-xl sm:text-2xl font-bold">Resume of Education</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {educationData.map((item, index) => (
            <div
              key={index}
              className="relative group border border-gray-300 dark:border-gray-700 rounded-xl p-6 bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition duration-300 hover:-translate-y-1"
            >
              <div className="absolute top-4 right-4 bg-[#ff014f] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                {item.year}
              </div>
              <div className="pt-10">
                <h3 className="text-lg sm:text-xl font-semibold text-[#ff014f] mb-2 group-hover:underline underline-offset-4">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {item.subtitle}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* === SKILLS SECTION === */}
      <section className="mb-20">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-12">
          <div className="max-w-xl">
            <h2 className="text-[#ff014f] text-sm font-medium mb-2">SKILLS</h2>
            <h1 className="text-2xl sm:text-3xl font-bold">
              Skill of Best Masters Software Skills
            </h1>
          </div>
          <div className="max-w-lg text-sm text-gray-600 dark:text-gray-400">
            Promote your blog posts, case studies, and product announcements with
            branded videos. Keep customers coming back.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <SkillBar name="Node.js" percent="60%" />
            <SkillBar name="JavaScript" percent="75%" />
            <SkillBar name="Web Design" percent="90%" />
          </div>
          <div>
            <SkillBar name="HTML" percent="100%" />
            <SkillBar name="CSS" percent="90%" />
            <SkillBar name="React.js" percent="70%" />
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;
