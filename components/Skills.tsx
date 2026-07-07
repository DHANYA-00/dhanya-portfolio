"use client";

import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Languages",
    icon: (
      <svg className="w-5 h-5 text-slate-600 group-hover:text-emerald-600 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    skills: ["Python", "Java", "JavaScript", "C++"],
  },
  {
    title: "Frontend",
    icon: (
      <svg className="w-5 h-5 text-slate-600 group-hover:text-emerald-600 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    skills: ["React", "Next.js", "JavaScript", "HTML", "Socket.io", "Streamlit"],
  },
  {
    title: "Backend",
    icon: (
      <svg className="w-5 h-5 text-slate-600 group-hover:text-emerald-600 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
      </svg>
    ),
    skills: ["Node.js", "Express.js", "RESTful API", "JWT Auth", "Socket.io"],
  },
  {
    title: "Mobile",
    icon: (
      <svg className="w-5 h-5 text-slate-600 group-hover:text-emerald-600 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    skills: ["Flutter"],
  },
  {
    title: "Databases",
    icon: (
      <svg className="w-5 h-5 text-slate-600 group-hover:text-emerald-600 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.58 4 8 4s8-1.79 8-4M4 7c0-2.21 3.58-4 8-4s8 1.79 8 4m0 5c0 2.21-3.58 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
    skills: ["MySQL", "MongoDB", "Supabase", "Firebase"],
  },
  {
    title: "Tools & Platforms",
    icon: (
      <svg className="w-5 h-5 text-slate-600 group-hover:text-emerald-600 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    skills: ["Docker", "Git", "GitHub", "Postman", "Bruno", "Render", "Netlify", "Figma"],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 70,
      damping: 15,
    },
  },
};

export function Skills() {
  return (
    <section id="skills" className="px-4 py-14 sm:px-6 lg:px-8 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mx-auto max-w-6xl"
      >
        <div className="flex flex-col items-center text-center mb-16 space-y-3">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Technical Skills
          </h2>
          <div className="h-1.5 w-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full" />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {skillCategories.map((category) => (
            <motion.article
              key={category.title}
              variants={cardVariants}
              className="group p-6 rounded-[2rem] border border-slate-100 bg-white/60 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-emerald-200/80 hover:shadow-md hover:shadow-emerald-600/5"
            >
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 flex items-center justify-center rounded-xl bg-slate-50 text-slate-600 transition-all duration-300 group-hover:bg-emerald-50 group-hover:text-emerald-600">
                  {category.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors duration-300">
                  {category.title}
                </h3>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    whileHover={{ scale: 1.05, y: -2 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    className="cursor-default rounded-lg bg-slate-50 border border-slate-200/60 px-2.5 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-200/80 hover:shadow-sm"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Skills;