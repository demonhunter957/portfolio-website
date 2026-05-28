"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

interface SectionTitleProps {
  children: React.ReactNode;
}

export function SectionTitle({ children }: SectionTitleProps) {
  return (
    <motion.h2
      className="relative mb-12 text-center text-3xl font-bold tracking-tight text-primary md:text-4xl"
      {...fadeInUp}
    >
      {children}
      <span className="absolute -bottom-3 left-1/2 h-1 w-16 -translate-x-1/2 rounded-full bg-accent" />
    </motion.h2>
  );
}
