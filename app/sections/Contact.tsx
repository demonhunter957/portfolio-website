"use client";

import { motion } from "framer-motion";
import { CodeXml, Mail, AtSign } from "lucide-react";
import { SectionTitle } from "@/app/components/SectionTitle";
import { SocialLink } from "@/app/components/SocialLink";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

export function Contact() {
  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 xl:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionTitle>联系方式</SectionTitle>

        <motion.p
          className="mx-auto mb-12 max-w-2xl text-center text-lg text-secondary"
          {...fadeInUp}
        >
          如果你对我的工作感兴趣，或者有合作的想法，欢迎通过以下方式联系我。
        </motion.p>

        <motion.div
          className="mx-auto grid max-w-xl grid-cols-1 gap-4 sm:grid-cols-3"
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={staggerItem}>
            <SocialLink
              href="https://github.com"
              icon={<CodeXml size={20} />}
              label="GitHub"
            />
          </motion.div>
          <motion.div variants={staggerItem}>
            <SocialLink
              href="mailto:hello@example.com"
              icon={<Mail size={20} />}
              label="邮箱"
            />
          </motion.div>
          <motion.div variants={staggerItem}>
            <SocialLink
              href="https://twitter.com"
              icon={<AtSign size={20} />}
              label="Twitter"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
