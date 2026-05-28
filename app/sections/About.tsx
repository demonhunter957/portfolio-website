"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SectionTitle } from "@/app/components/SectionTitle";
import { SkillTag } from "@/app/components/SkillTag";
import { skills } from "@/lib/data";
import { fadeInUpSmall, staggerContainer, staggerItemSmall } from "@/lib/animations";

export function About() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 xl:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionTitle>关于我</SectionTitle>

        <div className="flex flex-col gap-16 lg:flex-row lg:items-start">
          <motion.div
            className="flex flex-col gap-6 lg:w-1/2"
            {...fadeInUpSmall}
          >
            <p className="text-lg leading-relaxed text-secondary">
              我是一名充满热情的后端开发者，拥有多年开发经验。我热衷于将复杂的问题转化为简洁优雅的解决方案，并始终关注最新的技术趋势。
            </p>
            <p className="text-lg leading-relaxed text-secondary">
              工作之余，我喜欢探索新技术、参与开源项目，以及陪伴我的布偶猫，她的名字叫双喜。我相信持续学习和分享是技术成长的最佳途径。
            </p>
          </motion.div>

          <motion.div
            className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-neutral-800 lg:w-1/2"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="/pet.jpg"
              alt="我的宠物"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
        </div>

        <div className="mt-16">
          <motion.h3
            className="mb-6 text-xl font-semibold text-primary"
            {...fadeInUpSmall}
          >
            技术栈
          </motion.h3>
          <motion.div
            className="flex flex-wrap gap-3"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-100px" }}
          >
            {skills.map((skill) => (
              <motion.div key={skill.name} variants={staggerItemSmall}>
                <SkillTag name={skill.name} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
