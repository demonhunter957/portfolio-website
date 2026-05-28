"use client";

import { motion } from "framer-motion";
import { SectionTitle } from "@/app/components/SectionTitle";
import { ProjectCard } from "@/app/components/ProjectCard";
import { projects } from "@/lib/data";
import { staggerContainer, staggerItem } from "@/lib/animations";

export function Projects() {
  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 xl:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionTitle>项目展示</SectionTitle>

        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-100px" }}
        >
          {projects.map((project) => (
            <motion.div key={project.title} variants={staggerItem}>
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
