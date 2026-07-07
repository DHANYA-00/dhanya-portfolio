"use client";

import { motion } from "framer-motion";

const pillars = [
  {
    title: "Real-Time Dev",
    desc: "Hands-on MERN stack developer experienced in WebSockets (Socket.IO) and multi-client state syncing.",
    icon: (
      <svg className="w-5 h-5 text-slate-600 transition-colors duration-300 group-hover:text-emerald-600 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: "AI Integration",
    desc: "Building context-aware utilities, summarizers, and assistants powered by Groq, Gemini, and OpenAI APIs.",
    icon: (
      <svg className="w-5 h-5 text-slate-600 transition-colors duration-300 group-hover:text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: "Mobile Architecture",
    desc: "Structuring cross-platform client applications using Flutter, Firebase, and state-management patterns.",
    icon: (
      <svg className="w-5 h-5 text-slate-600 transition-colors duration-300 group-hover:text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const pillarVariants = {
  hidden: { opacity: 0, y: 35, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 80,
      damping: 14,
    },
  },
};

export function About() {
  return (
    <section id="about" className="px-4 py-14 sm:px-6 lg:px-8 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mx-auto max-w-5xl"
      >
        <div className="flex flex-col items-center text-center mb-14 space-y-3">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            About Me
          </h2>
          <div className="h-1.5 w-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full" />
        </div>

        <div className="space-y-16">
          {/* Centered Biography */}
          <div className="max-w-3xl mx-auto text-center space-y-6 text-lg leading-relaxed text-slate-600 sm:text-xl font-medium">
            <p>
              I started out experimenting with random side projects just to understand how things work — but over time, that curiosity turned into purpose. Today, I&apos;m a Computer Science student specializing in the MERN stack, with hands-on experience building real-time applications like a multiplayer game using React and Socket.IO.
            </p>
            <p>
              I enjoy the process of turning an idea into something people can actually use, and I&apos;m currently focused on building AI-powered tools that make everyday tasks simpler. Whether it&apos;s a web app, mobile app, or an AI-driven feature, I care about crafting something unique and genuinely valuable — not just functional.
            </p>
          </div>

          {/* 3-Column Specialties / Pillars Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid gap-6 sm:grid-cols-3"
          >
            {pillars.map((pillar) => (
              <motion.div
                key={pillar.title}
                variants={pillarVariants}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group flex flex-col items-start p-6 rounded-3xl border border-slate-100 bg-white/60 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-emerald-200/80 hover:shadow-lg hover:shadow-emerald-600/5"
              >
                <div className="flex-shrink-0 h-11 w-11 flex items-center justify-center rounded-xl bg-slate-50 mb-5 transition-all duration-300 group-hover:bg-emerald-50">
                  {pillar.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors duration-300">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-500 font-medium">
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default About;