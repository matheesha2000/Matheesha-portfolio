"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (result.success) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("Failed to send message.");
      }
    } catch {
      setStatus("Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <main className="main__content_wrapper inner__page--content md:py-20 bg-black text-gray-900 dark:text-white">
      <Navbar />

      {/* Heading */}
      <section className="text-center py-16">
        <motion.h1
          className="text-4xl font-extrabold text-[#ff014f] mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          CONNECT ME
        </motion.h1>
        <motion.h2
          className="text-xl font-medium text-gray-600 dark:text-gray-300"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          CONTACT <span className="text-[#ff014f] font-bold">ME</span>
        </motion.h2>
      </section>

      {/* Contact Form & Info */}
      <section className="section--padding px-6 sm:px-12 lg:px-20">
        <div className="container mx-auto grid lg:grid-cols-2 gap-20 items-start">
          {/* Left Side – Form */}
          <motion.div
            className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-[#ff014f] mb-4">Get In Touch</h2>
            <p className="text-gray-600 text-lg dark:text-gray-300 mb-8">
              Feel free to reach out for collaborations, questions, or just to say hi—I&apos;m always up for a good conversation.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#ff014f]"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#ff014f]"
                />
              </div>
              <textarea
                name="message"
                rows={5}
                placeholder="Message"
                required
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#ff014f]"
              ></textarea>
              <button
                type="submit"
                disabled={loading}
                className="bg-[#ff014f] text-white px-6 py-3 rounded-md hover:opacity-90 transition font-semibold"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>

              {status && (
                <p className="text-sm mt-2 text-gray-600 dark:text-gray-300">{status}</p>
              )}
            </form>
          </motion.div>

          {/* Right Side – Contact Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {[
              {
                title: "Call Me",
                content: ["+880254615566", "+880254615567"],
                icon: "📞",
              },
              {
                title: "Email",
                content: ["info@example.com"],
                icon: "✉️",
              },
              {
                title: "Address",
                content: ["20, 25 Dhaka,0123", "Ratrba baraj,20"],
                icon: "📍",
              },
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <span className="text-2xl text-[#ff014f]">{item.icon}</span>
                <div>
                  <h3 className="text-2xl font-semibold">{item.title}</h3>
                  <div className="text-lg text-gray-600 dark:text-gray-300 space-y-1">
                    {item.content.map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Map */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <iframe
            className="w-full h-96 rounded-md border-0"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7887.465355142307!2d-0.13384360843222626!3d51.4876034467734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48760532743b90e1%3A0x790260718555a20c!2sU.S.%20Embassy%2C%20London!5e0!3m2!1sen!2sbd!4v1632035375945!5m2!1sen!2sbd"
            loading="lazy"
            allowFullScreen
            title="Location map"
          ></iframe>
        </motion.div>
      </section>
    </main>
  );
}
