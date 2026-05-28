"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center px-4 pt-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-10 text-center md:flex-row md:text-left">
        <motion.div
          className="flex flex-col gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-4xl font-bold tracking-tight text-primary md:text-6xl lg:text-7xl">
            你好，我是{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              克里斯
            </span>
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-secondary md:text-xl">
            热爱构建优雅、高性能的应用。专注于工程化与用户体验设计。
          </p>
        </motion.div>

        <motion.div
          className="relative h-64 w-64 flex-shrink-0 overflow-hidden rounded-full border-2 border-neutral-800 md:h-80 md:w-80"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/avatar.jpg"
            alt="个人头像"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </div>

      <motion.a
        href="#about"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-secondary transition-colors hover:text-primary"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        aria-label="向下滚动"
      >
        <ChevronDown size={28} className="animate-bounce" />
      </motion.a>
    </section>
  );
}
