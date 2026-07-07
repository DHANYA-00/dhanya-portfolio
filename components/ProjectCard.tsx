"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 60,
      damping: 15,
    },
  },
};

export function ProjectCard({
  name,
  description,
  techStack,
  githubUrl,
  demoUrl,
  image,
}: Project) {
  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -8 }}
      className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-slate-100 bg-white/60 backdrop-blur-sm transition-all duration-300 hover:border-emerald-200/80 hover:shadow-xl hover:shadow-emerald-600/5"
    >
      {/* Project Media Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-50 border-b border-slate-100">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/5 via-transparent to-transparent opacity-60 z-10" />
        
        {image.endsWith(".mp4") ? (
          <video
            src={image}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 space-y-4">
        <div className="flex-1 space-y-2.5">
          <h3 className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors duration-300">
            {name}
          </h3>
          <p className="text-sm leading-relaxed text-slate-500 font-medium line-clamp-3">
            {description}
          </p>
        </div>

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-lg bg-slate-50 border border-slate-200/40 px-2.5 py-1 text-xs font-semibold text-slate-600 transition-all hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-200/50"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-slate-100">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/70 px-4 py-2.5 text-xs font-bold text-slate-700 transition-all duration-200 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 .5C5.73.5.75 5.55.75 11.79c0 4.98 3.23 9.21 7.71 10.7.56.1.77-.25.77-.55v-1.97c-3.14.69-3.8-1.33-3.8-1.33-.52-1.34-1.27-1.7-1.27-1.7-1.04-.72.08-.71.08-.71 1.15.08 1.76 1.19 1.76 1.19 1.02 1.78 2.68 1.26 3.34.96.1-.76.4-1.27.73-1.56-2.5-.29-5.13-1.27-5.13-5.65 0-1.25.44-2.27 1.16-3.07-.12-.29-.5-1.47.11-3.06 0 0 .95-.31 3.11 1.17a10.76 10.76 0 0 1 5.66 0c2.16-1.48 3.11-1.17 3.11-1.17.61 1.59.23 2.77.11 3.06.72.8 1.16 1.82 1.16 3.07 0 4.39-2.64 5.35-5.15 5.63.41.36.78 1.08.78 2.18v3.23c0 .31.21.66.78.55 4.48-1.49 7.71-5.72 7.71-10.7C23.25 5.55 18.27.5 12 .5Z" />
            </svg>
            GitHub
          </a>
          
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 px-4 py-2.5 text-xs font-bold text-white transition-all duration-300 hover:shadow-md hover:shadow-emerald-600/10 hover:brightness-110"
          >
            Live Demo
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export default ProjectCard;