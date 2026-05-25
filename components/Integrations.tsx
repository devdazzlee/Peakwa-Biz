"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const integrationGroups = [
  {
    title: "Payments",
    color: "#F59E0B",
    tools: ["Stripe", "Square", "PayPal", "Authorize.Net", "Clover"],
  },
  {
    title: "CRM & Sales",
    color: "#10B981",
    tools: ["HubSpot", "Salesforce", "Pipedrive", "Zoho", "Monday"],
  },
  {
    title: "Marketing",
    color: "#8B5CF6",
    tools: ["Mailchimp", "Klaviyo", "Meta Ads", "Google Ads", "Zapier"],
  },
  {
    title: "Commerce",
    color: "#3B82F6",
    tools: ["Shopify", "WooCommerce", "BigCommerce", "Wix", "Webflow"],
  },
];

const allTools = integrationGroups.flatMap((g) => g.tools.map((t) => ({ name: t, color: g.color })));
const marqueeRow1 = [...allTools.slice(0, 10), ...allTools.slice(0, 10)];
const marqueeRow2 = [...allTools.slice(10), ...allTools.slice(10)];

export default function Integrations() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(59,130,246,0.05) 0%, transparent 70%)" }}
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
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
            Plays Nice With Your Stack
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-5" style={{ fontFamily: "var(--font-syne)", lineHeight: 1.2 }}>
            Connects With <span className="text-gradient">Everything You Use</span>
          </h2>
          <p className="text-[#9CA3AF] text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Integrate seamlessly with 50+ tools across payments, CRM, marketing, and e-commerce.
          </p>
        </motion.div>

        <div className="relative mb-10">
          <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none bg-gradient-to-r from-[#0A0F1C] to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none bg-gradient-to-l from-[#0A0F1C] to-transparent" />

          <div className="space-y-5 overflow-hidden">
            <motion.div
              className="flex gap-4"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            >
              {marqueeRow1.map((tool, i) => (
                <div
                  key={`r1-${i}`}
                  className="shrink-0 flex items-center gap-3 px-6 py-4 rounded-2xl glass group hover:bg-white/[0.06] transition-all duration-300"
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: `${tool.color}1A`,
                      color: tool.color,
                      boxShadow: `inset 0 0 0 1px ${tool.color}33`,
                      fontFamily: "var(--font-syne)",
                    }}
                  >
                    {tool.name.charAt(0)}
                  </div>
                  <span className="text-base font-semibold text-[#F9FAFB] whitespace-nowrap">{tool.name}</span>
                </div>
              ))}
            </motion.div>

            <motion.div
              className="flex gap-4"
              animate={{ x: ["-50%", "0%"] }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            >
              {marqueeRow2.map((tool, i) => (
                <div
                  key={`r2-${i}`}
                  className="shrink-0 flex items-center gap-3 px-6 py-4 rounded-2xl glass group hover:bg-white/[0.06] transition-all duration-300"
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: `${tool.color}1A`,
                      color: tool.color,
                      boxShadow: `inset 0 0 0 1px ${tool.color}33`,
                      fontFamily: "var(--font-syne)",
                    }}
                  >
                    {tool.name.charAt(0)}
                  </div>
                  <span className="text-base font-semibold text-[#F9FAFB] whitespace-nowrap">{tool.name}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {integrationGroups.map((group, i) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl p-6 transition-all duration-300 group/card"
              style={{
                background: `linear-gradient(135deg, ${group.color}08, rgba(17,24,39,0.6))`,
                border: `1px solid ${group.color}18`,
              }}
              onMouseEnter={(e) => { (e.currentTarget).style.borderColor = `${group.color}40`; (e.currentTarget).style.boxShadow = `0 12px 40px ${group.color}12`; }}
              onMouseLeave={(e) => { (e.currentTarget).style.borderColor = `${group.color}18`; (e.currentTarget).style.boxShadow = "none"; }}
            >
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: group.color, boxShadow: `0 0 8px ${group.color}60` }} />
                <p className="text-sm font-bold uppercase tracking-wider" style={{ color: group.color, fontFamily: "var(--font-syne)" }}>
                  {group.title}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg text-[#F9FAFB] transition-all duration-200"
                    style={{ background: `${group.color}12`, border: `1px solid ${group.color}20` }}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
