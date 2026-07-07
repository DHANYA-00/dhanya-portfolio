"use client";

import { motion } from "framer-motion";

const contactLinks = [
  {
    label: "Email",
    value: "dhanyalakshmi.s.s.06@gmail.com",
    href: "mailto:dhanyalakshmi.s.s.06@gmail.com",
    title: "Email Dhanya",
    color: "group-hover:text-emerald-600",
    bgColor: "group-hover:bg-emerald-100/50",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    value: "github.com/DHANYA-00",
    href: "https://github.com/DHANYA-00/",
    title: "GitHub profile",
    color: "group-hover:text-emerald-600",
    bgColor: "group-hover:bg-emerald-100/50",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path d="M12 .5C5.73.5.75 5.55.75 11.79c0 4.98 3.23 9.21 7.71 10.7.56.1.77-.25.77-.55v-1.97c-3.14.69-3.8-1.33-3.8-1.33-.52-1.34-1.27-1.7-1.27-1.7-1.04-.72.08-.71.08-.71 1.15.08 1.76 1.19 1.76 1.19 1.02 1.78 2.68 1.26 3.34.96.1-.76.4-1.27.73-1.56-2.5-.29-5.13-1.27-5.13-5.65 0-1.25.44-2.27 1.16-3.07-.12-.29-.5-1.47.11-3.06 0 0 .95-.31 3.11 1.17a10.76 10.76 0 0 1 5.66 0c2.16-1.48 3.11-1.17 3.11-1.17.61 1.59.23 2.77.11 3.06.72.8 1.16 1.82 1.16 3.07 0 4.39-2.64 5.35-5.15 5.63.41.36.78 1.08.78 2.18v3.23c0 .31.21.66.78.55 4.48-1.49 7.71-5.72 7.71-10.7C23.25 5.55 18.27.5 12 .5Z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/dhanya",
    href: "https://www.linkedin.com/in/dhanya-lakshmi-s-s-6114ab329/",
    title: "LinkedIn profile",
    color: "group-hover:text-emerald-600",
    bgColor: "group-hover:bg-emerald-100/60",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3 8.75h3.95V21H3zM10.03 8.75h3.78v1.68h.05c.53-1 1.84-2.06 3.78-2.06 4.04 0 4.79 2.66 4.79 6.12V21h-3.95v-5.44c0-1.3-.03-2.97-1.81-2.97-1.82 0-2.1 1.42-2.1 2.88V21h-3.94z" />
      </svg>
    ),
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

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 80, damping: 15 },
  },
};

export function Contact() {
  return (
    <section id="contact" className="px-4 py-14 sm:px-6 lg:px-8 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mx-auto flex max-w-4xl flex-col items-center text-center"
      >
        <div className="flex flex-col items-center text-center mb-6 space-y-3">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Get In Touch
          </h2>
          <div className="h-1.5 w-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full" />
        </div>
        
        <p className="max-w-xl text-base sm:text-lg text-slate-500 font-medium">
          Feel free to reach out! I&apos;m always open to discussing new projects, internship roles, or creative opportunities.
        </p>

        {/* Contact Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-12 grid gap-5 sm:grid-cols-3 w-full"
        >
          {contactLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              variants={itemVariants}
              aria-label={link.title}
              target={link.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              className="group flex flex-col items-center p-6 rounded-3xl border border-slate-100 bg-white/60 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-200/80 hover:shadow-lg hover:shadow-emerald-600/5"
            >
              <div className={`h-12 w-12 flex items-center justify-center rounded-2xl bg-slate-50 text-slate-700 transition-all duration-300 ${link.color} ${link.bgColor}`}>
                {link.icon}
              </div>
              <h3 className="mt-4 text-sm font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors duration-300">
                {link.label}
              </h3>
              <p className="mt-1 text-xs text-slate-500 font-medium truncate max-w-full">
                {link.value}
              </p>
            </motion.a>
          ))}
        </motion.div>

        <footer className="mt-20 border-t border-slate-100 pt-8 w-full text-sm text-slate-400">
          © 2026 Dhanya Lakshmi. Built with Next.js &amp; Tailwind CSS.
        </footer>
      </motion.div>
    </section>
  );
}

export default Contact;