"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SkillTag } from "./SkillTag";
import { Project } from "@/lib/types";

export function ProjectCard({ title, description, image, tags, href }: Project) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-xl border border-neutral-800 bg-surface transition-colors duration-300 hover:border-neutral-700"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={image}
          alt={`${title} 项目截图`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-col gap-3 p-5">
        <h3 className="text-lg font-semibold text-primary transition-colors duration-300 group-hover:text-accent">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-secondary">{description}</p>
        <div className="flex flex-wrap gap-2 pt-1">
          {tags.map((tag) => (
            <SkillTag key={tag} name={tag} />
          ))}
        </div>
      </div>
    </motion.a>
  );
}
