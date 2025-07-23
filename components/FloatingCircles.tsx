"use client";

import { motion } from "framer-motion";

const FloatingCircles = () => {
  const circles = [
    { size: 60, top: "10%", left: "15%", delay: 0, opacity: 0.2 },
    { size: 100, top: "30%", left: "80%", delay: 2, opacity: 0.15 },
    { size: 50, top: "65%", left: "20%", delay: 4, opacity: 0.18 },
    { size: 80, top: "75%", left: "70%", delay: 1, opacity: 0.2 },
    { size: 40, top: "50%", left: "50%", delay: 3, opacity: 0.1 },
    { size: 120, top: "15%", left: "60%", delay: 2.5, opacity: 0.12 },
    { size: 90, top: "80%", left: "10%", delay: 1.5, opacity: 0.18 },
    { size: 70, top: "35%", left: "25%", delay: 0.7, opacity: 0.2 },
    { size: 100, top: "55%", left: "85%", delay: 3.2, opacity: 0.15 },
    { size: 60, top: "25%", left: "40%", delay: 1.2, opacity: 0.17 },
  ];

  return (
    <>
      {circles.map(({ size, top, left, delay, opacity }, i) => (
        <motion.div
          key={i}
          initial={{ y: 0 }}
          animate={{ y: [0, -20, 0] }}
          transition={{
            duration: 6 + Math.random() * 2,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 1,
            delay,
          }}
          style={{
            position: "absolute",
            top,
            left,
            width: size,
            height: size,
            borderRadius: "50%",
            backgroundColor: `rgba(255, 1, 79, ${opacity})`,
            filter: "blur(12px)",
            zIndex: 0,
          }}
        />
      ))}
    </>
  );
};

export default FloatingCircles;
