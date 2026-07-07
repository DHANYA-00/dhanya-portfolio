"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const roles = [
  "Full-Stack Developer",
  "MERN Stack Specialist",
  "Flutter Mobile Developer",
  "AI Solution Creator",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 60,
      damping: 12,
    },
  },
};

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[75vh] flex items-center justify-center bg-gradient-to-b from-slate-50/50 via-white to-slate-50/20 px-4 py-14 sm:px-6 lg:px-8 overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 left-10 w-80 h-80 bg-emerald-100/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-100/10 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto w-full max-w-6xl z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & CTAs */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 order-2 lg:order-1"
          >
            
            {/* Status Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2.5 rounded-full border border-emerald-100/60 bg-emerald-50/60 px-4 py-2 text-xs font-semibold text-emerald-800 backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Available for New Projects
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]"
            >
              Hi, I&apos;m{" "}
              <span className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-800 bg-clip-text text-transparent">
                Dhanya Lakshmi
              </span>
            </motion.h1>

            {/* Rotating Subtitle Switcher */}
            <motion.div variants={itemVariants} className="h-10 sm:h-12 flex items-center justify-center lg:justify-start">
              <AnimatePresence mode="wait">
                <motion.p
                  key={roles[roleIndex]}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="text-2xl sm:text-3xl font-extrabold text-emerald-700 tracking-tight"
                >
                  {roles[roleIndex]}
                </motion.p>
              </AnimatePresence>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="max-w-2xl text-lg sm:text-xl leading-relaxed text-slate-600 font-medium"
            >
              I build responsive, high-performance web and mobile applications, blending real-time functionality (MERN + Socket.IO) and AI-driven solutions to solve everyday challenges.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2 w-full"
            >
              <a
                href="#projects"
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:shadow-lg hover:shadow-emerald-600/15 hover:brightness-110 hover:-translate-y-0.5"
              >
                View Projects
              </a>
              <a
                href="/images/Dhanya_Lakshmi.pdf"
                download
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-200 bg-white/70 px-6 py-3 text-sm font-bold text-slate-700 transition-all duration-200 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 hover:-translate-y-0.5"
              >
                Download Resume
              </a>
              <a
                href="#contact"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-200 bg-white/70 px-6 py-3 text-sm font-bold text-slate-700 transition-all duration-200 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 hover:-translate-y-0.5"
              >
                Contact Me
              </a>
            </motion.div>

          </motion.div>

          {/* Right Column: Premium Floating Profile Card */}
          <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                y: [0, -12, 0]
              }}
              transition={{ 
                opacity: { duration: 0.7, delay: 0.2 },
                scale: { duration: 0.7, delay: 0.2 },
                y: { repeat: Infinity, duration: 6, ease: "easeInOut" }
              }}
              className="relative group w-full max-w-xs sm:max-w-sm aspect-square overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white/60 p-4 shadow-xl shadow-slate-200/5 backdrop-blur-sm transition-all duration-500 hover:border-slate-200 hover:shadow-2xl hover:shadow-slate-200/10"
            >
              <div className="relative h-full w-full overflow-hidden rounded-[1.8rem] bg-slate-50">
                <Image
                  src="/images/dhaanyaaaaa.png"
                  alt="Dhanya Lakshmi portrait profile image"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;