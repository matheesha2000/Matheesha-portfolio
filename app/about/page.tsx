"use client";

import Image from "next/image";
import { FaDotCircle } from "react-icons/fa";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// =========================
// SkillBar Component with animation controlled by inView prop
// =========================
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
  // Detect when Skills section is in view
  const { ref: skillsRef, inView: skillsInView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <>
      <Navbar />

      <main className="px-4 sm:px-6 lg:px-8 py-12 max-w-6xl mx-auto text-gray-800 dark:text-white">
        {/* === ABOUT SECTION === */}
        <section className="mb-10 mt-20">
          <div className="text-center mb-18">
            <h2 className="text-[#ff014f] text-3xl sm:text-4xl font-extrabold">
              ABOUT ME
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-40 items-center">
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
        <motion.section
          ref={skillsRef}
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-12">
            <div className="w-full max-w-full">
              <h2 className="text-[#ff014f] text-4xl font-extrabold mb-6">
                SKILLS
              </h2>
              <h1 className="text-2xl sm:text-3xl font-bold whitespace-nowrap">
                My QA and Development Skillset Expertise
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* === Development Skills === */}
            <div>
              <h3 className="text-xl font-semibold text-[#ff014f] mb-4">
                Development Skills
              </h3>
              <SkillBar name="HTML/CSS" percent="100%" inView={skillsInView} />
              <SkillBar name="React.js" percent="90%" inView={skillsInView} />
              <SkillBar name="JavaScript" percent="75%" inView={skillsInView} />
              <SkillBar name="Java" percent="70%" inView={skillsInView} />
              <SkillBar name="MongoDB" percent="70%" inView={skillsInView} />
              <SkillBar name="Node.js" percent="60%" inView={skillsInView} />
              <SkillBar name="Next.js" percent="65%" inView={skillsInView} />
              <SkillBar name="Tailwind CSS" percent="80%" inView={skillsInView} />
            </div>

            {/* === QA Skills === */}
            <div>
              <h3 className="text-xl font-semibold text-[#ff014f] mb-4">
                QA Skills
              </h3>
              <SkillBar name="Manual Testing" percent="90%" inView={skillsInView} />
              <SkillBar name="Automation Testing" percent="70%" inView={skillsInView} />
              <SkillBar name="Selenium" percent="65%" inView={skillsInView} />
              <SkillBar name="Postman" percent="75%" inView={skillsInView} />
              <SkillBar name="JMeter" percent="60%" inView={skillsInView} />
              <SkillBar name="API Testing" percent="60%" inView={skillsInView} />
            </div>
          </div>
        </motion.section>
      </main>
    </>
  );
}

export default About;
