"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

/* ─────────────────────────────────────────── DATA ─── */
interface Project {
  title: string;
  tag: string;
  year: string;
  desc: string;
  accentDark: string;
  accentLight: string;
  live: string;
  git: string;
}

const projects: Project[] = [
  {
    title: "Browser Automation Agent",
    tag: "AI & Automation",
    year: "2026",
    desc: "A browser automation agent built with Node.js and Playwright. It takes a task written in plain English, looks at the current webpage, decides what to click or type next, does it, and repeats — instead of running a fixed, pre-written script.",
    accentDark: "#a5d8ff",
    accentLight: "#2563eb",
    live: "#",
    git: "https://github.com/DHANYA-00/Automation",
  },
  {
    title: "Food Wars",
    tag: "Real-Time Game",
    year: "2025",
    desc: "A real-time multiplayer guessing game where players compete live to guess ingredients under a time limit.",
    accentDark: "#c8f5a0",
    accentLight: "#8b5cf6",
    live: "https://foodwars2vs2.netlify.app/",
    git: "https://github.com/DHANYA-00/Food-Wars",
  },
  {
    title: "Chef-GPT",
    tag: "AI/ML",
    year: "2025",
    desc: "An AI chef that can generate recipes, create meal plans, and even critique your cooking. Trained on a massive dataset of recipes and cooking techniques.",
    accentDark: "#FF8A5B",
    accentLight: "#FF8A5B",
    live: "https://chef-gpt-swart.vercel.app/",
    git: "https://github.com/DHANYA-00/chef-gpt.git",
  },
  {
    title: "SmartNews",
    tag: "AI News Tech",
    year: "2026",
    desc: "AI-powered news app with real-time categorizations, AI summaries, an interactive SmartBot, and student quizzes.",
    accentDark: "#ffd6a5",
    accentLight: "#a855f7",
    live: "#",
    git: "https://github.com/DHANYA-00/Smart-News.git",
  },
];

interface Skill {
  name: string;
  cat: string;
}

const skills: Skill[] = [
  { name: "Python", cat: "Languages" },
  { name: "Java", cat: "Languages" },
  { name: "JavaScript", cat: "Languages" },
  { name: "C++", cat: "Languages" },
  { name: "React", cat: "Frontend" },
  { name: "Next.js", cat: "Frontend" },
  { name: "HTML", cat: "Frontend" },
  { name: "Streamlit", cat: "Frontend" },
  { name: "Node.js", cat: "Backend" },
  { name: "Express.js", cat: "Backend" },
  { name: "RESTful API", cat: "Backend" },
  { name: "JWT Auth", cat: "Backend" },
  { name: "Socket.IO", cat: "Backend" },
  { name: "Flutter", cat: "Mobile" },
  { name: "MySQL", cat: "Database" },
  { name: "MongoDB", cat: "Database" },
  { name: "Supabase", cat: "Database" },
  { name: "Firebase", cat: "Database" },
  { name: "Docker", cat: "DevOps" },
  { name: "Git", cat: "DevOps" },
  { name: "GitHub", cat: "DevOps" },
  { name: "Postman", cat: "Tools" },
  { name: "Playwright", cat: "Tools" },
  { name: "Bruno", cat: "Tools" },
  { name: "Render", cat: "Tools" },
  { name: "Netlify", cat: "Tools" },
  { name: "Linux", cat: "Tools" },
  { name: "Figma", cat: "Design" },
];

const catColorsDark: Record<string, string> = {
  Languages: "#d0bfff",
  Frontend: "#c8f5a0",
  Backend: "#ffd6a5",
  Mobile: "#ffc9de",
  Database: "#a5d8ff",
  DevOps: "#ffe066",
  Tools: "#ffffff",
  Design: "#ffc9de",
};

const catColorsLight: Record<string, string> = {
  Languages: "#4A1620",
  Frontend: "#2F5D62",
  Backend: "#E3A857",
  Mobile: "#B7D3A8",
  Database: "#2F5D62",
  DevOps: "#E3A857",
  Tools: "#4A1620",
  Design: "#2F5D62",
};

interface Experience {
  role: string;
  company: string;
  period: string;
  desc: string;
  certificate?: string;
}

const experiences: Experience[] = [
  {
    role: "Software Engineer Intern",
    company: "KalviumLabs",
    period: "May'26 - June'26",
    desc: "Gained hands-on experience building responsive web interfaces, learning full-stack development workflows, and contributing to software product design.",
    certificate: "https://drive.google.com/file/d/1FlltT5tJOEA4ANCkbPVF5Sl8ll23jAvx/view?usp=sharing",
  },
  {
    role: "Hackathon Creator (Triplan)",
    company: "SRM's NXTGEN Hackathon",
    period: "Oct 2025",
    desc: "Collaborated to design and develop a mobile carbon-conscious travel planner using React Native. Engineered the AI itinerary mapping and transportation footprint logging in a 24-hour sprint.",
  },
  {
    role: "Active Member & Debugger",
    company: "VISTAS Coding Club",
    period: "2025",
    desc: "Participate in competitive programming and debugging sprints. Collaborate with peers to debug complex logic and build coding frameworks on campus.",
  }
];

interface Education {
  degree: string;
  school: string;
  period: string;
  details: string;
}

const education: Education[] = [
  {
    degree: "B.Tech in Computer Science (Software Product Engineering)",
    school: "VISTAS (Vels University) & Kalvium UG Program",
    period: "2024 - 2028",
    details: "Focusing on core data structures, backend engineering, mobile app architecture, and real-world system design. Chennai, India.",
  }
];

interface Certification {
  title: string;
  issuer: string;
  link: string;
}

const certifications: Certification[] = [
  {
    title: "Software Engineer Internship Completion Certificate",
    issuer: "KalviumLabs",
    link: "https://drive.google.com/file/d/1FlltT5tJOEA4ANCkbPVF5Sl8ll23jAvx/view?usp=sharing",
  },
  {
    title: "Full Stack Development Course Completion Certificate",
    issuer: "Kalvium / VISTAS",
    link: "https://drive.google.com/file/d/1DtUJxPxyMp9YCN_4-wMkTlEjsD1pEzWy/view?usp=sharing",
  }
];

/* ─── Build theme tokens ─── */
function makeTheme(isDark: boolean) {
  if (isDark) return {
    text: "#ffffff",
    textMuted: "rgba(255,255,255,0.35)",
    textFaint: "rgba(255,255,255,0.12)",
    border: "rgba(255,255,255,0.08)",
    borderHover: "rgba(255,255,255,0.28)",
    navBg: "rgba(10,10,10,0.7)",
    accent: "#c8f5a0",
    accentText: "#000000",
    badgeBg: "#c8f5a0",
    cardBg: "rgba(255,255,255,0.02)",
    statBg: "rgba(255,255,255,0.03)",
    bigText: "rgba(255,255,255,0.025)",
    pill: "rgba(255,255,255,0.03)",
    stripBg: "rgba(255,255,255,0.01)",
    marqueeColor: "rgba(255,255,255,0.22)",
    nameGrad: "linear-gradient(135deg, #34d399 0%, #c8f5a0 100%)",
  };
  return {
    text: "#4A1620",
    textMuted: "rgba(74, 22, 32, 0.82)",
    textFaint: "#2F5D62",
    border: "rgba(74, 22, 32, 0.22)",
    borderHover: "rgba(227, 168, 87, 0.85)",
    navBg: "rgba(242, 235, 217, 0.82)",
    accent: "#B7D3A8",
    accentText: "#4A1620",
    badgeBg: "#E3A857",
    cardBg: "rgba(47, 93, 98, 0.10)",
    statBg: "rgba(47, 93, 98, 0.12)",
    bigText: "rgba(74, 22, 32, 0.055)",
    pill: "rgba(47, 93, 98, 0.11)",
    stripBg: "rgba(47, 93, 98, 0.07)",
    marqueeColor: "rgba(74, 22, 32, 0.38)",
    nameGrad: "linear-gradient(135deg, #4A1620 0%, #2F5D62 100%)",
  };
}

function SkyBackground({ isDark }: { isDark: boolean }) {
  if (isDark) {
    return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(175deg, #0f172a 0%, #1e293b 25%, #334155 60%, #475569 100%)",
        }}
      />
    );
  }
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -10,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <div style={{ position: "absolute", inset: 0, background: "#F2EBD9" }} />
      <motion.div
        style={{
          position: "absolute", left: -220, bottom: "0%",
          width: 640, height: 640, borderRadius: 9999,
          background: "radial-gradient(circle, rgba(47,93,98,0.16) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{ scale: [1.08, 1, 1.08] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.06 }}>
        <defs>
          <pattern id="g-light" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#4A1620" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#g-light)" />
      </svg>
    </div>
  );
}

/* ─────────────── DARK BACKGROUND ─── */
const DarkBackground = () => (
  <div style={{ position: "fixed", inset: 0, zIndex: -10, overflow: "hidden", pointerEvents: "none" }}>
    <div style={{ position: "absolute", inset: 0, background: "#0a0a0a" }} />
    <motion.div
      style={{
        position: "absolute", right: -200, top: "5%",
        width: 700, height: 700, borderRadius: 9999,
        background: "radial-gradient(circle, rgba(16,185,129,0.055) 0%, transparent 70%)",
        filter: "blur(40px)",
      }}
      animate={{ scale: [1, 1.08, 1] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
    />
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.025 }}>
      <defs>
        <pattern id="g" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#g)" />
    </svg>
  </div>
);

/* ─────────────── THEME TOGGLE ─── */
interface ThemeToggleProps {
  isDark: boolean;
  toggle: () => void;
  t: ReturnType<typeof makeTheme>;
}

const ThemeToggle = ({ isDark, toggle, t }: ThemeToggleProps) => (
  <motion.button
    onClick={toggle}
    aria-label="Toggle theme"
    style={{
      position: "relative", width: 56, height: 28, borderRadius: 99,
      display: "flex", alignItems: "center", padding: "0 4px",
      background: isDark ? "rgba(255,255,255,0.08)" : "rgba(47,93,98,0.10)",
      border: `1px solid ${t.border}`,
      cursor: "pointer", outline: "none",
    }}
    whileTap={{ scale: 0.92 }}
  >
    <motion.div
      style={{
        width: 20, height: 20, borderRadius: 9999,
        background: t.accent,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 11,
      }}
      animate={{ x: isDark ? 0 : 26 }}
      transition={{ type: "spring", stiffness: 420, damping: 30 }}
    >
      {isDark ? "🌙" : "☀️"}
    </motion.div>
  </motion.button>
);

/* ─────────────── MARQUEE ─── */
const Marquee = ({ t }: { t: ReturnType<typeof makeTheme> }) => {
  const items = ["React", "Next.js", "Node.js", "MongoDB", "Docker", "Figma", "REST APIs", "Socket.IO", "Flutter", "Python", "JWT Auth"];
  return (
    <div style={{ overflow: "hidden", whiteSpace: "nowrap", borderTop: `1px solid ${t.border}`, borderBottom: `1px solid ${t.border}`, padding: "12px 0" }}>
      <motion.div
        style={{ display: "inline-flex", gap: 48, fontSize: 12, letterSpacing: "0.22em", textTransform: "uppercase", fontFamily: "monospace", color: t.marqueeColor }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items].map((item, i) => (
          <span key={i}>{item} <span style={{ opacity: 0.3, margin: "0 16px" }}>◆</span></span>
        ))}
      </motion.div>
    </div>
  );
};

/* ─────────────── SECTION LABEL ─── */
interface SectionLabelProps {
  children: React.ReactNode;
  index: number;
  t: ReturnType<typeof makeTheme>;
}

const SectionLabel = ({ children, index, t }: SectionLabelProps) => (
  <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
    <span style={{ fontFamily: "monospace", fontSize: 11, color: t.textMuted }}>{String(index).padStart(2, "0")}</span>
    <span style={{ flex: 1, height: 1, background: t.border }} />
    <span style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: t.textMuted }}>{children}</span>
  </div>
);

/* ═══════════════════════════════════ PAGE ═══ */
export default function Page() {
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = makeTheme(isDark);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();
  const heroScrollTransform = useTransform(scrollYProgress, [0, 0.3], [1, 0.9]);
  
  // Custom unique scroll progress bar at the top
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div style={{ color: t.text, overflowX: "hidden" }}>
      {isDark ? <DarkBackground /> : <SkyBackground isDark={isDark} />}

      {/* Unique Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] z-50 origin-left"
        style={{
          scaleX,
          background: isDark
            ? "linear-gradient(90deg, #10b981, #c8f5a0)"
            : "linear-gradient(90deg, #4A1620, #E3A857)"
        }}
      />

      {/* ═══ NAVBAR - Aligned to max-w-6xl grid ═══ */}
      <motion.header
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4 md:px-12 md:py-5"
        style={{
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          background: t.navBg,
          borderBottom: `1px solid ${t.border}`,
        }}
      >
        <div className="max-w-6xl mx-auto w-full flex justify-between items-center">
          <a href="#home" style={{ fontWeight: 900, fontSize: 14, letterSpacing: "0.2em", textTransform: "uppercase", color: t.text, textDecoration: "none" }}>DL</a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-9">
            {["Projects", "Skills", "Experience", "Education", "Contact"].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: t.textMuted, textDecoration: "none", position: "relative" }}
                whileHover={{ color: t.text }}
              >
                {item}
                <motion.span
                  className="absolute -bottom-0.5 left-0 h-[1px]"
                  style={{ background: t.accent }}
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <ThemeToggle isDark={isDark} toggle={() => setIsDark(d => !d)} t={t} />
            
            <motion.a
              href="#contact"
              className="hidden md:inline-flex"
              style={{
                fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase",
                fontWeight: 700, padding: "9px 20px", borderRadius: 99,
                background: t.accent, color: t.accentText, textDecoration: "none",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
            >
              Hire Me
            </motion.a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex flex-col gap-1.5 justify-center items-center w-8 h-8 rounded-full border"
              style={{ borderColor: t.border, background: t.cardBg, color: t.text }}
              aria-label="Toggle Navigation Menu"
            >
              <div className="w-4 h-0.5" style={{ background: t.text }} />
              <div className="w-4 h-0.5" style={{ background: t.text }} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-[68px] left-0 right-0 z-40 md:hidden flex flex-col p-6 gap-4 border-b"
          style={{
            background: t.navBg,
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderColor: t.border,
          }}
        >
          {["Projects", "Skills", "Experience", "Education", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ fontSize: 13, letterSpacing: "0.22em", textTransform: "uppercase", color: t.textMuted, textDecoration: "none", padding: "8px 0" }}
            >
              {item}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            style={{
              fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase",
              fontWeight: 700, padding: "12px", borderRadius: 99, textAlign: "center",
              background: t.accent, color: t.accentText, textDecoration: "none",
              marginTop: 10
            }}
          >
            Hire Me
          </a>
        </motion.div>
      )}

      {/* ═══ HERO ═══ */}
      <section
        id="home"
        ref={heroRef}
        className="min-h-screen flex flex-col justify-center px-6 pt-24 pb-16 md:px-12 relative overflow-hidden"
      >
        {/* Ambient glow */}
        <motion.div
          style={{
            position: "absolute", right: -180, top: "20%",
            width: 560, height: 560, borderRadius: 9999, pointerEvents: "none",
            background: isDark
              ? "radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)"
              : "none",
            filter: "blur(30px)",
          }}
          animate={{ scale: [1, 1.07, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Constrained layout matching other sections */}
        <div className="max-w-6xl mx-auto w-full z-10 relative flex flex-col justify-center">
          {/* Vertical line accent - Positioned relative to max-w-6xl container */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-[62%] top-0 bottom-0 width-[1px] hidden lg:block"
            style={{
              width: 1,
              background: isDark ? "rgba(255,255,255,0.04)" : "rgba(74,22,32,0.12)",
              transformOrigin: "top",
            }}
          />

          {/* Responsive Hero Grid */}
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center w-full"
            style={{ scale: heroScrollTransform }}
          >
            {/* Profile pic displays at top on mobile, on right side on desktop */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="lg:col-span-4 lg:order-last flex justify-center w-full"
            >
              <motion.div
                style={{
                  border: isDark ? `1px solid ${t.border}` : "none",
                  borderRadius: 999, // Unique Circle Layout for Profile
                  background: isDark ? t.cardBg : "transparent",
                  padding: 10,
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: "0 15px 35px -10px rgba(0,0,0,0.12)"
                }}
                whileHover={{ scale: 1.04, rotate: 3 }}
                animate={{ y: [0, -8, 0] }}
                transition={{ y: { repeat: Infinity, duration: 6, ease: "easeInOut" } }}
                className="w-[210px] h-[210px] sm:w-[250px] sm:h-[250px]"
              >
                <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: 999, overflow: "hidden" }}>
                  <Image
                    src="/images/dhaanyaaaaa.png"
                    alt="Dhanya Lakshmi profile image"
                    fill
                    priority
                    sizes="(max-width: 640px) 210px, 250px"
                    style={{ objectPosition: "38% 30%" }}
                    className="object-cover scale-105 hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </motion.div>
            </motion.div>

            <motion.div className="lg:col-span-8 lg:order-first flex flex-col justify-center text-center lg:text-left">
              {/* Status pill */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="flex items-center justify-center lg:justify-start gap-2.5 mb-8"
              >
                <motion.span
                  style={{ width: 8, height: 8, borderRadius: 99, background: t.accent, display: "inline-block" }}
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span style={{ fontFamily: "monospace", fontSize: 11, color: t.textMuted, letterSpacing: "0.24em", textTransform: "uppercase" }}>
                  Available for Internships & Collabs
                </span>
              </motion.div>

              {/* Name line 1 - Custom Unique Gradient Typography */}
              <div style={{ overflow: "hidden" }} className="h-auto">
                <motion.h1
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                  style={{
                    fontSize: "clamp(2.8rem,8.5vw,7.5rem)",
                    fontWeight: 900, lineHeight: 0.9,
                    letterSpacing: "-0.02em", textTransform: "uppercase",
                    margin: 0,
                    backgroundImage: t.nameGrad,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Dhanya
                </motion.h1>
              </div>

              {/* Name line 2 + badge - Aligned perfectly */}
              <div className="overflow-hidden flex items-center justify-center lg:justify-start gap-4 flex-wrap mt-1">
                <motion.h1
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
                  style={{
                    fontSize: "clamp(2.8rem,8.5vw,7.5rem)",
                    fontWeight: 900, lineHeight: 0.9,
                    letterSpacing: "-0.02em", textTransform: "uppercase",
                    color: t.textFaint, margin: 0,
                  }}
                >
                  Lakshmi
                </motion.h1>
                
                <motion.div
                  initial={{ opacity: 0, rotate: -8, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: -4, scale: 1 }}
                  transition={{ delay: 1.1, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                  style={{
                    padding: "6px 16px", borderRadius: 5,
                    background: t.badgeBg, color: t.accentText,
                    fontWeight: 800, fontSize: 12, letterSpacing: "0.02em",
                    boxShadow: isDark ? "3px 4px 0 rgba(0,0,0,0.5)" : "3px 4px 0 rgba(74,22,32,0.22)",
                    flexShrink: 0,
                  }}
                >
                  Full-Stack Dev
                </motion.div>
              </div>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="mt-6 mx-auto lg:mx-0 max-w-lg text-center lg:text-left"
                style={{ color: t.textMuted, fontSize: 14, lineHeight: 1.75, letterSpacing: "0.02em" }}
              >
                I engineer digital experiences that are fast, intentional, and alive. Building mobile and web solutions with real-time connectivity and customized AI logic.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.8 }}
                className="mt-8 flex gap-6 items-center justify-center lg:justify-start"
              >
                <motion.a
                  href="#projects"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    background: t.text, color: isDark ? "#000" : "#F2EBD9",
                    padding: "14px 30px", borderRadius: 99,
                    fontWeight: 700, fontSize: 13, letterSpacing: "0.05em", textDecoration: "none",
                  }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  View Work ↗
                </motion.a>
                
                <motion.a
                  href="https://github.com/DHANYA-00"
                  target="_blank"
                  style={{ color: t.textMuted, fontSize: 13, letterSpacing: "0.05em", textDecoration: "none" }}
                  whileHover={{ color: t.text }}
                >
                  GitHub ↗
                </motion.a>

                <motion.a
                  href="/images/Dhanya_Lakshmi.pdf?v=2"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: t.textMuted, fontSize: 13, letterSpacing: "0.05em", textDecoration: "none" }}
                  whileHover={{ color: t.text }}
                >
                  Resume ↗
                </motion.a>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          style={{ position: "absolute", bottom: 40, right: 48, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}
          className="hidden md:flex"
        >
          <span style={{ fontFamily: "monospace", fontSize: 9, color: t.textMuted, letterSpacing: "0.25em", textTransform: "uppercase", writingMode: "vertical-rl" }}>Scroll</span>
          <motion.div
            style={{ width: 1, height: 48, transformOrigin: "top", background: `linear-gradient(180deg, ${t.accent}, transparent)` }}
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </section>

      {/* ═══ MARQUEE ═══ */}
      <Marquee t={t} />

      {/* ═══ PROJECTS ═══ */}
      <section id="projects" className="px-6 py-20 md:px-12 max-w-6xl mx-auto">
        <SectionLabel index={1} t={t}>Selected Work</SectionLabel>
        <motion.h2
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontSize: "clamp(2rem,6vw,4.5rem)", fontWeight: 900, textTransform: "uppercase", lineHeight: 1.05, marginBottom: "3.5rem", color: t.text }}
        >
          Featured<br /><span style={{ color: t.textFaint }}>Projects</span>
        </motion.h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {projects.map((p, i) => <ProjectRow key={p.title} project={p} index={i} isDark={isDark} t={t} />)}
        </div>
      </section>

      {/* ═══ ABOUT ═══ */}
      <AboutStrip isDark={isDark} t={t} />

      {/* ═══ SKILLS ═══ */}
      <section id="skills" className="px-6 py-20 md:px-12 max-w-6xl mx-auto">
        <SectionLabel index={2} t={t}>Capabilities</SectionLabel>
        <motion.h2
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontSize: "clamp(2rem,6vw,4.5rem)", fontWeight: 900, textTransform: "uppercase", lineHeight: 1.05, marginBottom: "3rem", color: t.text }}
        >
          Tech<br /><span style={{ color: t.textFaint }}>Arsenal</span>
        </motion.h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          {skills.map((s, i) => <SkillPill key={s.name} skill={s} index={i} isDark={isDark} t={t} />)}
        </div>
      </section>

      {/* ═══ EXPERIENCE ═══ */}
      <section id="experience" className="px-6 py-20 md:px-12 max-w-6xl mx-auto">
        <SectionLabel index={3} t={t}>Activities & Involvement</SectionLabel>
        <motion.h2
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontSize: "clamp(2rem,6vw,4.5rem)", fontWeight: 900, textTransform: "uppercase", lineHeight: 1.05, marginBottom: "3.5rem", color: t.text }}
        >
          Experience &<br /><span style={{ color: t.textFaint }}>Involvement</span>
        </motion.h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {experiences.map((exp, i) => <ExperienceRow key={exp.role} exp={exp} index={i} isDark={isDark} t={t} />)}
        </div>
      </section>

      {/* ═══ EDUCATION & CERTIFICATIONS ═══ */}
      <section id="education" className="px-6 py-20 md:px-12 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Column: Education */}
          <div>
            <SectionLabel index={4} t={t}>Academics</SectionLabel>
            <motion.h2
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 900, textTransform: "uppercase", lineHeight: 1.1, marginBottom: "2.5rem", color: t.text }}
            >
              Academic<br /><span style={{ color: t.textFaint }}>Foundations</span>
            </motion.h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {education.map((edu, i) => <EducationCard key={edu.degree} edu={edu} isDark={isDark} t={t} />)}
            </div>
          </div>

          {/* Right Column: Certifications */}
          <div>
            <SectionLabel index={5} t={t}>Credentials</SectionLabel>
            <motion.h2
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 900, textTransform: "uppercase", lineHeight: 1.1, marginBottom: "2.5rem", color: t.text }}
            >
              Verified<br /><span style={{ color: t.textFaint }}>Certifications</span>
            </motion.h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {certifications.map((cert, i) => <CertificateCard key={cert.title} cert={cert} isDark={isDark} t={t} />)}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section id="contact" className="px-6 py-20 md:px-12 max-w-6xl mx-auto">
        <SectionLabel index={6} t={t}>Get in Touch</SectionLabel>
        <ContactSection isDark={isDark} t={t} />
      </section>

      {/* Footer - Constrained layout */}
      <footer className="px-6 py-8 md:px-12" style={{ borderTop: `1px solid ${t.border}` }}>
        <div className="max-w-6xl mx-auto w-full flex justify-between items-center">
          <span style={{ fontFamily: "monospace", fontSize: 11, color: t.textMuted }}>© 2026 Dhanya Lakshmi</span>
          <span style={{ fontFamily: "monospace", fontSize: 11, color: t.textMuted }}>Built with Next.js &amp; Framer Motion</span>
        </div>
      </footer>
    </div>
  );
}

/* ═══ PROJECT ROW ═══ */
interface ProjectRowProps {
  project: Project;
  index: number;
  isDark: boolean;
  t: ReturnType<typeof makeTheme>;
}

const ProjectRow = ({ project, index, isDark, t }: ProjectRowProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);
  const accent = isDark ? project.accentDark : project.accentLight;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        position: "relative", overflow: "hidden",
        border: `1px solid ${hovered ? accent + "50" : t.border}`,
        borderRadius: 20,
        background: hovered ? t.cardBg : "transparent",
        transition: "background 0.3s, border-color 0.3s",
      }}
    >
      <motion.div
        style={{ position: "absolute", inset: 0, background: accent, pointerEvents: "none" }}
        animate={{ opacity: hovered ? 0.055 : 0 }}
        transition={{ duration: 0.35 }}
      />
      <div className="flex flex-col md:flex-row md:items-center justify-between p-8 gap-6">
        <div style={{ display: "flex", alignItems: "flex-start", gap: 24 }}>
          <span style={{ fontFamily: "monospace", fontSize: 11, color: t.textMuted, paddingTop: 4 }}>{String(index + 1).padStart(2, "0")}</span>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 7 }}>
              <motion.span
                style={{ display: "inline-block", width: 6, height: 6, borderRadius: 99, background: accent }}
                animate={{ scale: hovered ? 1.6 : 1 }}
              />
              <span style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: t.textMuted }}>{project.tag}</span>
              <span style={{ fontFamily: "monospace", fontSize: 10, color: t.textFaint }}>{project.year}</span>
            </div>
            
            <motion.h3
              animate={{ x: hovered ? 6 : 0 }}
              transition={{ duration: 0.3 }}
              style={{ fontSize: "clamp(1.4rem,3vw,2.5rem)", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.01em", color: t.text, margin: 0 }}
            >
              {project.title}
            </motion.h3>
            <p style={{ color: t.textMuted, fontSize: 13, marginTop: 8, maxWidth: 440, lineHeight: 1.65 }}>{project.desc}</p>
          </div>
        </div>
        
        <div style={{ display: "flex", gap: 12, flexShrink: 0 }}>
          <motion.a
            href={project.git} target="_blank"
            style={{
              border: `1px solid ${t.border}`, padding: "10px 20px", borderRadius: 99,
              fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase",
              color: t.textMuted, textDecoration: "none",
            }}
            whileHover={{ scale: 1.05, borderColor: t.borderHover, color: t.text }}
            whileTap={{ scale: 0.96 }}
          >
            Code ↗
          </motion.a>
          
          {project.live !== "#" && (
            <motion.a
              href={project.live} target="_blank"
              style={{
                background: accent, color: isDark ? "#000" : "#F2EBD9",
                padding: "10px 20px", borderRadius: 99,
                fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase",
                fontWeight: 700, textDecoration: "none",
              }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
            >
              Live ↗
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

/* ═══ ABOUT STRIP ═══ */
const AboutStrip = ({ isDark, t }: { isDark: boolean; t: ReturnType<typeof makeTheme> }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    <div
      ref={ref}
      style={{
        padding: "6rem 0",
        borderTop: `1px solid ${t.border}`,
        borderBottom: `1px solid ${t.border}`,
        background: t.stripBg,
        overflow: "hidden",
      }}
    >
      <div className="px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <span style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.26em", textTransform: "uppercase", color: t.textMuted, display: "block", marginBottom: 16 }}>About</span>
          <h2 style={{ fontSize: "clamp(1.8rem,4vw,3.2rem)", fontWeight: 900, textTransform: "uppercase", lineHeight: 1.1, marginBottom: 20, color: t.text }}>
            I build<br /><span style={{ color: t.textFaint }}>with purpose</span>
          </h2>
          <p style={{ color: t.textMuted, lineHeight: 1.78, fontSize: 13, maxWidth: 400 }}>
            I am a Computer Science student specializing in full-stack engineering and cross-platform mobile architecture. I focus on turning experimental coding ideas into functional, beautiful products that people can actually use.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="grid grid-cols-2 gap-4"
        >
          {[
            { num: "3+", label: "Main Apps Shipped" },
            { num: "28+", label: "Tools & Skills" },
            { num: "1", label: "Work Experience" },
            { num: "2028", label: "Graduation Year" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              style={{ border: `1px solid ${t.border}`, borderRadius: 16, padding: "1.4rem", background: t.statBg }}
              whileHover={{ borderColor: t.accent + "55", scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <div style={{ fontSize: "2.2rem", fontWeight: 900, color: t.text, marginBottom: 5 }}>{stat.num}</div>
              <div style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: t.textMuted }}>{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Parallax scrolling text bar */}
      <div style={{ marginTop: 60, overflow: "hidden" }}>
        <motion.div style={{
          x,
          whiteSpace: "nowrap", fontSize: 90, fontWeight: 900,
          color: t.bigText, lineHeight: 1, textTransform: "uppercase", userSelect: "none",
        }}>
          React · Next.js · Node.js · Express.js · Flutter · Socket.IO · MongoDB · SQL · Docker · Git · Figma ·&nbsp;
        </motion.div>
      </div>
    </div>
  );
};

/* ═══ SKILL PILL ═══ */
interface SkillPillProps {
  skill: Skill;
  index: number;
  isDark: boolean;
  t: ReturnType<typeof makeTheme>;
}

const SkillPill = ({ skill, index, isDark, t }: SkillPillProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [hovered, setHovered] = useState(false);
  const color = isDark ? (catColorsDark[skill.cat] || "#fff") : (catColorsLight[skill.cat] || "#0c2340");

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.82, y: 14 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ delay: index * 0.025, duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -4 }}
      style={{
        border: `1px solid ${hovered ? color + "65" : t.border}`,
        borderRadius: 99, padding: "10px 20px",
        background: hovered ? color + "14" : t.pill,
        cursor: "default",
        transition: "border-color 0.2s, background 0.2s",
      }}
    >
      <span style={{
        fontFamily: "monospace", fontSize: 11,
        letterSpacing: "0.2em", textTransform: "uppercase",
        color: hovered ? color : t.textMuted,
        transition: "color 0.2s",
      }}>
        {skill.name}
      </span>
    </motion.div>
  );
};

/* ═══ EXPERIENCE ROW ═══ */
interface ExperienceRowProps {
  exp: Experience;
  index: number;
  isDark: boolean;
  t: ReturnType<typeof makeTheme>;
}

const ExperienceRow = ({ exp, index, isDark, t }: ExperienceRowProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);
  const accent = isDark ? "#c8f5a0" : "#E3A857";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        position: "relative", overflow: "hidden",
        border: `1px solid ${hovered ? accent + "50" : t.border}`,
        borderRadius: 20,
        background: hovered ? t.cardBg : "transparent",
        transition: "background 0.3s, border-color 0.3s",
      }}
    >
      <motion.div
        style={{ position: "absolute", inset: 0, background: accent, pointerEvents: "none" }}
        animate={{ opacity: hovered ? 0.055 : 0 }}
        transition={{ duration: 0.35 }}
      />
      <div className="flex flex-col md:flex-row md:items-center justify-between p-8 gap-6 text-left">
        <div style={{ display: "flex", alignItems: "flex-start", gap: 24 }}>
          <span style={{ fontFamily: "monospace", fontSize: 11, color: t.textMuted, paddingTop: 4 }}>{String(index + 1).padStart(2, "0")}</span>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 7 }}>
              <motion.span
                style={{ display: "inline-block", width: 6, height: 6, borderRadius: 99, background: accent }}
                animate={{ scale: hovered ? 1.6 : 1 }}
              />
              <span style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: t.textMuted }}>{exp.company}</span>
              <span style={{ fontFamily: "monospace", fontSize: 10, color: t.textFaint }}>{exp.period}</span>
            </div>
            
            <motion.h3
              animate={{ x: hovered ? 6 : 0 }}
              transition={{ duration: 0.3 }}
              style={{ fontSize: "clamp(1.2rem,2.5vw,2.2rem)", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.01em", color: t.text, margin: 0 }}
            >
              {exp.role}
            </motion.h3>
            <p style={{ color: t.textMuted, fontSize: 13, marginTop: 8, maxWidth: 520, lineHeight: 1.65 }}>{exp.desc}</p>
          </div>
        </div>

        {exp.certificate && (
          <div style={{ display: "flex", gap: 12, flexShrink: 0, paddingLeft: 48 }} className="md:pl-0">
            <motion.a
              href={exp.certificate}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                border: `1px solid ${t.border}`,
                padding: "10px 20px",
                borderRadius: 99,
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: t.textMuted,
                textDecoration: "none",
                display: "inline-block",
              }}
              whileHover={{ scale: 1.05, borderColor: t.borderHover, color: t.text }}
              whileTap={{ scale: 0.96 }}
            >
              Certificate ↗
            </motion.a>
          </div>
        )}
      </div>
    </motion.div>
  );
};

/* ═══ EDUCATION CARD ═══ */
interface EducationCardProps {
  edu: Education;
  isDark: boolean;
  t: ReturnType<typeof makeTheme>;
}

const EducationCard = ({ edu, isDark, t }: EducationCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [hovered, setHovered] = useState(false);
  const accent = isDark ? "#c8f5a0" : "#E3A857";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        border: `1px solid ${hovered ? accent + "55" : t.border}`,
        borderRadius: 20,
        padding: "1.8rem",
        background: t.statBg,
        transition: "border-color 0.3s, background 0.3s",
        position: "relative",
        overflow: "hidden"
      }}
      className="text-left"
    >
      <div style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: t.textMuted, marginBottom: 8 }}>{edu.period}</div>
      <h3 style={{ fontSize: "1.5rem", fontWeight: 900, color: t.text, marginBottom: 6, textTransform: "uppercase" }}>{edu.degree}</h3>
      <div style={{ fontSize: "1rem", fontWeight: 700, color: isDark ? accent : "#2F5D62", marginBottom: 12 }}>{edu.school}</div>
      <p style={{ color: t.textMuted, fontSize: 13, lineHeight: 1.65, margin: 0 }}>{edu.details}</p>
    </motion.div>
  );
};

/* ═══ CERTIFICATION CARD ═══ */
interface CertificateCardProps {
  cert: Certification;
  isDark: boolean;
  t: ReturnType<typeof makeTheme>;
}

const CertificateCard = ({ cert, isDark, t }: CertificateCardProps) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const isInView = useInView(ref, { once: true });
  const [hovered, setHovered] = useState(false);
  const accent = isDark ? "#ffd6a5" : "#E3A857";

  return (
    <motion.a
      href={cert.link}
      target="_blank"
      rel="noopener noreferrer"
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        display: "block",
        border: `1px solid ${hovered ? accent + "55" : t.border}`,
        borderRadius: 20,
        padding: "1.8rem",
        background: t.cardBg,
        textDecoration: "none",
        transition: "border-color 0.3s, background 0.3s",
        position: "relative",
        overflow: "hidden"
      }}
      whileHover={{ scale: 1.02 }}
      className="text-left"
    >
      <div style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: t.textMuted, marginBottom: 8 }}>{cert.issuer}</div>
      <h3 style={{ fontSize: "1.3rem", fontWeight: 900, color: t.text, marginBottom: 12, textTransform: "uppercase" }}>{cert.title}</h3>
      <span style={{ fontFamily: "monospace", fontSize: 11, color: isDark ? t.accent : "#2F5D62", fontWeight: isDark ? 400 : 700 }}>View Certificate ↗</span>
    </motion.a>
  );
};

/* ═══ CONTACT SECTION ─── */
interface ContactSectionProps {
  isDark: boolean;
  t: ReturnType<typeof makeTheme>;
}

const ContactSection = ({ isDark, t }: ContactSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start text-left">
      <motion.div
        initial={{ opacity: 0, y: 56 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 style={{ fontSize: "clamp(2rem,6vw,5rem)", fontWeight: 900, textTransform: "uppercase", lineHeight: 1.0, color: t.text, margin: 0 }}>
          Let&apos;s Build<br />
          <span style={{ color: t.textFaint }}>Something</span><br />
          Great.
        </h2>
        <p style={{ marginTop: 20, color: t.textMuted, fontSize: 13, lineHeight: 1.75, maxWidth: 360 }}>
          Open to internships, developer collaborations, and ambitious ideas that push the envelope of software engineering.
        </p>
        <motion.a
          href="mailto:dhanyalakshmi.s.s.06@gmail.com"
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.7 }}
          style={{
            marginTop: 32, display: "inline-flex", alignItems: "center", gap: 10,
            background: t.accent, color: t.accentText,
            fontWeight: 800, fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase",
            padding: "16px 32px", borderRadius: 99, textDecoration: "none",
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          Send an Email ↗
        </motion.a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 56 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{ display: "flex", flexDirection: "column", gap: 12 }}
        className="mt-6 md:mt-12"
      >
        {[
          { label: "Email", value: "dhanyalakshmi.s.s.06@gmail.com", href: "mailto:dhanyalakshmi.s.s.06@gmail.com" },
          { label: "GitHub", value: "github.com/DHANYA-00", href: "https://github.com/DHANYA-00" },
          { label: "LinkedIn", value: "linkedin.com/in/dhanya-lakshmi", href: "https://www.linkedin.com/in/dhanya-lakshmi-s-s-6114ab329/" },
        ].map((item, i) => (
          <motion.a
            key={i}
            href={item.href}
            target={item.href.startsWith("http") ? "_blank" : undefined}
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
            style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              border: `1px solid ${t.border}`, borderRadius: 16,
              padding: "1.1rem 1.4rem", textDecoration: "none", background: t.cardBg,
              transition: "border-color 0.2s",
            }}
            whileHover={{ x: 4, borderColor: t.borderHover }}
          >
            <div>
              <div style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: t.textMuted, marginBottom: 5 }}>{item.label}</div>
              <div style={{ fontSize: 13, color: t.textMuted }}>{item.value}</div>
            </div>
            <motion.span style={{ color: t.textMuted, fontSize: 18 }} whileHover={{ rotate: 45 }}>↗</motion.span>
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
};