"use client";

import { motion, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const cases = [
  {
    company: "Bloom & Co. Salon",
    industry: "Beauty & Wellness",
    color: "#F59E0B",
    headline: "From local salon to multi-location empire",
    summary:
      "We helped Bloom & Co. structure their LLC, launch online booking, set up payments and run targeted local campaigns, fueling expansion across 4 cities.",
    metrics: [
      { label: "Revenue growth", value: 340, suffix: "%" },
      { label: "Locations opened", value: 4, suffix: "" },
      { label: "Months to scale", value: 8, suffix: "" },
    ],
    tags: ["Business Formation", "POS Systems", "Local SEO"],
  },
  {
    company: "Vertex Apparel",
    industry: "E-Commerce",
    color: "#3B82F6",
    headline: "Direct-to-consumer brand hits $5M ARR",
    summary:
      "Built a high-converting Shopify storefront, integrated zero-fee payment processing, and rolled out automated email + ad campaigns that 6x'd their order volume.",
    metrics: [
      { label: "Annual revenue", value: 5, suffix: "M+" },
      { label: "Conversion lift", value: 218, suffix: "%" },
      { label: "Avg ROAS", value: 6.4, suffix: "x" },
    ],
    tags: ["E-Commerce Setup", "Payment Gateways", "Automated Campaigns"],
  },
  {
    company: "Northgate Realty",
    industry: "Real Estate",
    color: "#10B981",
    headline: "Boutique brokerage closes 3x more deals",
    summary:
      "A custom CRM, pipeline automation, and lead-tracking dashboards transformed how the team works, cutting follow-up time in half and tripling close rate.",
    metrics: [
      { label: "Close rate", value: 312, suffix: "%" },
      { label: "Time saved/week", value: 22, suffix: "h" },
      { label: "Active leads", value: 1840, suffix: "" },
    ],
    tags: ["CRM Setup", "Sales Optimization", "Performance Dashboards"],
  },
];

function AnimatedNumber({ value, suffix, inView, delay = 0 }: { value: number; suffix: string; inView: boolean; delay?: number }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.6,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, value, delay]);

  const formatted = value % 1 !== 0 ? display.toFixed(1) : Math.floor(display).toLocaleString();
  return (
    <span ref={ref} className="tabular-nums">
      {formatted}
      {suffix}
    </span>
  );
}

export default function CaseStudies() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full animate-float-slow"
          style={{ background: "radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] rounded-full animate-float"
          style={{ background: "radial-gradient(circle, rgba(245,158,11,0.05) 0%, transparent 70%)" }}
        />
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass text-sm text-[#10B981] font-medium mb-6">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Proven Results
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-5" style={{ fontFamily: "var(--font-syne)", lineHeight: 1.2 }}>
            Real Stories. <span className="text-gradient">Real Growth.</span>
          </h2>
          <p className="text-[#9CA3AF] text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Numbers don&apos;t lie. Here&apos;s what happens when businesses partner with Peakwa.
          </p>
        </motion.div>

        <div className="space-y-6 lg:space-y-8">
          {cases.map((c, i) => (
            <motion.div
              key={c.company}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ y: -4 }}
              className="group relative rounded-3xl overflow-hidden glass-strong transition-all duration-500"
              style={{
                boxShadow: `0 20px 60px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.05)`,
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-1 transition-all duration-500"
                style={{ background: `linear-gradient(90deg, ${c.color}, transparent)` }}
              />
              <div
                className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl"
                style={{ background: `radial-gradient(circle, ${c.color}25 0%, transparent 70%)` }}
              />

              <div className="relative p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-xl shrink-0"
                      style={{
                        background: `linear-gradient(135deg, ${c.color}, ${c.color}99)`,
                        color: "#0A0F1C",
                        fontFamily: "var(--font-syne)",
                        boxShadow: `0 8px 30px ${c.color}40`,
                      }}
                    >
                      {c.company.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: c.color }}>
                        {c.industry}
                      </p>
                      <h3 className="text-lg sm:text-xl font-bold text-[#F9FAFB]" style={{ fontFamily: "var(--font-syne)" }}>
                        {c.company}
                      </h3>
                    </div>
                  </div>

                  <h4
                    className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F9FAFB] mb-4"
                    style={{ fontFamily: "var(--font-syne)", lineHeight: 1.2 }}
                  >
                    {c.headline}
                  </h4>
                  <p className="text-[#9CA3AF] text-base leading-relaxed mb-5">{c.summary}</p>

                  <div className="flex flex-wrap gap-2">
                    {c.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 text-xs font-medium rounded-full"
                        style={{
                          backgroundColor: `${c.color}12`,
                          color: c.color,
                          boxShadow: `inset 0 0 0 1px ${c.color}33`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-5 grid grid-cols-3 gap-4">
                  {c.metrics.map((metric, j) => (
                    <motion.div
                      key={metric.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.5, delay: i * 0.15 + 0.3 + j * 0.1 }}
                      className="rounded-2xl p-4 sm:p-5 text-center"
                      style={{
                        background: `linear-gradient(180deg, ${c.color}0F, transparent)`,
                        boxShadow: `inset 0 0 0 1px ${c.color}25`,
                      }}
                    >
                      <p
                        className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1"
                        style={{ color: c.color, fontFamily: "var(--font-syne)", lineHeight: 1.2 }}
                      >
                        <AnimatedNumber value={metric.value} suffix={metric.suffix} inView={inView} delay={i * 0.15 + 0.4 + j * 0.1} />
                      </p>
                      <p className="text-[10px] sm:text-xs text-[#9CA3AF] font-medium uppercase tracking-wider">{metric.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
