import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Projects from "@/components/Projects";

function Separator() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
    </div>
  );
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground font-sans">
      <Navbar />
      <Hero />
      <Separator />
      <About />
      <Separator />
      <Skills />
      <Separator />
      <Projects />
      <Separator />
      <Contact />
    </main>
  );
}
