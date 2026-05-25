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
      "Structured their LLC, launched online booking, set up payments, and ran targeted local campaigns — fueling expansion across 4 cities.",
    metrics: [
      { label: "Revenue growth", value: 340, suffix: "%" },
      { label: "Locations", value: 4, suffix: "" },
      { label: "Months", value: 8, suffix: "" },
    ],
    tags: ["Formation", "POS", "Local SEO"],
  },
  {
    company: "Vertex Apparel",
    industry: "E-Commerce",
    color: "#3B82F6",
    headline: "DTC brand hits $5M ARR in 18 months",
    summary:
      "Built a high-converting Shopify store, integrated zero-fee processing, and rolled out automated campaigns that 6x'd order volume.",
    metrics: [
      { label: "ARR", value: 5, suffix: "M+" },
      { label: "Conversion", value: 218, suffix: "%" },
      { label: "ROAS", value: 6.4, suffix: "x" },
    ],
    tags: ["E-Commerce", "Payments", "Campaigns"],
  },
  {
    company: "Northgate Realty",
    industry: "Real Estate",
    color: "#10B981",
    headline: "Brokerage triples close rate with custom CRM",
    summary:
      "A tailored CRM, pipeline automation, and lead-tracking dashboards cut follow-up time in half and tripled close rate.",
    metrics: [
      { label: "Close rate", value: 312, suffix: "%" },
      { label: "Hours saved", value: 22, suffix: "/wk" },
      { label: "Active leads", value: 1840, suffix: "" },
    ],
    tags: ["CRM", "Sales", "Dashboards"],
  },
];

function AnimatedNumber({ value, suffix, inView, delay = 0 }: { value: number; suffix: string; inView: boolean; delay?: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.4,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, value, delay]);

  const formatted = value % 1 !== 0 ? display.toFixed(1) : Math.floor(display).toLocaleString();
  return (
    <span className="tabular-nums">
      {formatted}
      {suffix}
    </span>
  );
}

export default function CaseStudies() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(16,185,129,0.04) 0%, transparent 70%)" }}
        />
      </div>

      <div ref={ref} className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs text-[#10B981] font-medium mb-5 tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
            Proven Results
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3" style={{ fontFamily: "var(--font-syne)", lineHeight: 1.25 }}>
            Real stories. <span className="text-gradient">Real growth.</span>
          </h2>
          <p className="text-[#9CA3AF] text-base max-w-xl mx-auto">
            A few of the businesses we&apos;ve helped scale.
          </p>
        </motion.div>

        <div className="space-y-4">
          {cases.map((c, i) => (
            <motion.div
              key={c.company}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -2 }}
              className="group relative rounded-2xl overflow-hidden transition-all duration-300"
              style={{
                background: "rgba(17, 24, 39, 0.4)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div
                className="absolute left-0 top-0 bottom-0 w-[3px] transition-all duration-300 group-hover:w-1"
                style={{ background: c.color }}
              />

              <div className="relative p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6 items-center">
                <div className="md:col-span-7">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="text-[10px] font-semibold uppercase tracking-[0.15em]"
                      style={{ color: c.color }}
                    >
                      {c.industry}
                    </span>
                    <span className="text-[#4B5563]">•</span>
                    <span className="text-sm font-semibold text-[#F9FAFB]" style={{ fontFamily: "var(--font-syne)" }}>
                      {c.company}
                    </span>
                  </div>

                  <h3
                    className="text-lg sm:text-xl font-semibold text-[#F9FAFB] mb-2"
                    style={{ fontFamily: "var(--font-syne)", lineHeight: 1.35 }}
                  >
                    {c.headline}
                  </h3>
                  <p className="text-[#9CA3AF] text-sm leading-relaxed mb-3">{c.summary}</p>

                  <div className="flex flex-wrap gap-1.5">
                    {c.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-[11px] font-medium rounded-md text-[#9CA3AF]"
                        style={{
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.05)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-5 grid grid-cols-3 gap-3">
                  {c.metrics.map((metric, j) => (
                    <div key={metric.label} className="text-center md:text-left">
                      <p
                        className="text-xl sm:text-2xl font-bold mb-0.5 tabular-nums"
                        style={{ color: c.color, fontFamily: "var(--font-syne)", lineHeight: 1.2 }}
                      >
                        <AnimatedNumber value={metric.value} suffix={metric.suffix} inView={inView} delay={i * 0.1 + 0.3 + j * 0.08} />
                      </p>
                      <p className="text-[10px] text-[#6B7280] font-medium uppercase tracking-wider">{metric.label}</p>
                    </div>
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
