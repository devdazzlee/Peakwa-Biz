"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const logos = [
  "TechFlow", "ScaleUp", "VentureX", "CloudNine", "BluePeak", "NovaSync",
];

export default function TrustedBy() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="py-16 relative overflow-hidden">
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center text-sm text-[#9CA3AF] font-medium uppercase tracking-widest mb-10"
        >
          Trusted by industry leaders
        </motion.p>
        <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12">
          {logos.map((name, index) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 0.4, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ opacity: 1, scale: 1.05 }}
              className="text-xl sm:text-2xl font-bold text-[#9CA3AF] transition-all duration-300 cursor-default"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              {name}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
