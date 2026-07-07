"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";

const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export function Projects() {
  return (
    <section id="projects" className="px-4 py-14 sm:px-6 lg:px-8 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mx-auto max-w-6xl"
      >
        <div className="flex flex-col items-center text-center mb-16 space-y-3">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Featured Projects
          </h2>
          <div className="h-1.5 w-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full" />
        </div>

        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-10 grid gap-8 md:grid-cols-2 max-w-4xl mx-auto"
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Projects;