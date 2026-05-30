import { Navbar } from "@/app/components/Navbar";
import { Hero } from "@/app/sections/Hero";
import { About } from "@/app/sections/About";
import { Projects } from "@/app/sections/Projects";
import { Contact } from "@/app/sections/Contact";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Contact />
      <footer className="border-t border-neutral-800 py-8 text-center text-sm text-secondary">
        <p>© {new Date().getFullYear()} 克里斯作品集. All rights reserved.</p>
      </footer>
    </main>
  );
}
