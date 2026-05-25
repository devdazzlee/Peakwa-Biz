"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const faqs = [
  {
    q: "What services does Peakwa offer?",
    a: "We offer four core service areas: Business Services (formation, LLC setup, e-commerce), Merchant Services (payment processing, POS systems), Marketing & Branding (SEO, social media, reputation management), and Sales & CRM (pipeline setup, lead tracking, performance dashboards).",
  },
  {
    q: "How much does it cost to get started?",
    a: "We offer a free initial consultation to understand your needs. Pricing varies based on the services you need, but we're committed to transparent pricing with no hidden fees. Most businesses start with a custom package tailored to their budget.",
  },
  {
    q: "How long does it take to set up my business?",
    a: "Most projects launch within 2-4 weeks depending on complexity. Simple LLC formations can be completed in days, while full-service packages including website, payments, and marketing may take 3-4 weeks.",
  },
  {
    q: "Do you work with startups or established businesses?",
    a: "Both! Whether you're launching your first venture or scaling an established company, we have solutions tailored to every stage of business growth.",
  },
  {
    q: "Can I choose only specific services?",
    a: "Absolutely. Our services are modular, so you pick exactly what you need. Many clients start with one service and add more as they grow. There's no requirement to bundle.",
  },
  {
    q: "What makes Peakwa different from other business consultants?",
    a: "We're a true one-stop shop. Most consultants specialize in one area, but we cover formation, payments, marketing, and sales under one roof. This means seamless integration, consistent strategy, and a single point of contact for all your business needs.",
  },
];

function FAQItem({ faq, index, isOpen, toggle }: { faq: typeof faqs[0]; index: number; isOpen: boolean; toggle: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="glass rounded-xl overflow-hidden"
    >
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-white/[0.02] transition-colors"
      >
        <span className="text-[#F9FAFB] font-medium pr-4">{faq.q}</span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[#3B82F6]"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="px-5 sm:px-6 pb-5 sm:pb-6 text-[#9CA3AF] leading-relaxed">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-padding relative">
      <div ref={ref} className="relative max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-[#10B981] font-medium mb-6">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            FAQ
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-[#9CA3AF] text-lg">
            Got questions? We&apos;ve got answers.
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              index={index}
              isOpen={openIndex === index}
              toggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
