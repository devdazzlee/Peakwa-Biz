"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

interface SubService {
  name: string;
  desc: string;
}

interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  items: SubService[];
}

const services: Service[] = [
  {
    title: "Business Services",
    description: "Launch and structure your business with expert guidance from day one.",
    color: "#3B82F6",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
      </svg>
    ),
    items: [
      { name: "Business Formation", desc: "Complete setup and registration assistance" },
      { name: "LLC Formation", desc: "Fast LLC filing in all 50 states" },
      { name: "Startup Systems Setup", desc: "Tools, email, domains & workflows" },
      { name: "Business Brokerage", desc: "Buy or sell existing businesses" },
      { name: "Website & Digital", desc: "Modern responsive web design" },
      { name: "E-Commerce Setup", desc: "Shopify, WooCommerce & custom stores" },
      { name: "Tools & Automation", desc: "Zapier, CRM integrations & more" },
    ],
  },
  {
    title: "Merchant Services",
    description: "Accept payments everywhere with the most competitive rates in the industry.",
    color: "#F59E0B",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
      </svg>
    ),
    items: [
      { name: "Credit Card Processing", desc: "Visa, MC, Amex & Discover" },
      { name: "POS Systems", desc: "Retail, restaurant & mobile terminals" },
      { name: "Online Payment Gateways", desc: "Stripe, Authorize.net & custom" },
      { name: "ACH / eCheck", desc: "Low-cost bank-to-bank transfers" },
      { name: "High Risk Accounts", desc: "CBD, nutra, travel & more" },
      { name: "Zero Fee Programs", desc: "Cash discount & surcharge options" },
      { name: "Fraud Protection", desc: "PCI compliance & chargeback defense" },
    ],
  },
  {
    title: "Marketing & Branding",
    description: "Get found online, build authority, and grow your audience consistently.",
    color: "#8B5CF6",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" />
      </svg>
    ),
    items: [
      { name: "Local SEO", desc: "Dominate your local search results" },
      { name: "Technical SEO", desc: "Site speed, schema & crawlability" },
      { name: "Social Media Marketing", desc: "Content strategy & ad management" },
      { name: "Google Business Profile", desc: "Optimize for Maps & local pack" },
      { name: "Reputation Management", desc: "Review generation & monitoring" },
      { name: "Automated Campaigns", desc: "Email sequences & SMS marketing" },
    ],
  },
  {
    title: "Sales & CRM",
    description: "Optimize your pipeline, track every lead, and close more deals faster.",
    color: "#10B981",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    items: [
      { name: "Sales Optimization", desc: "Proven frameworks to boost revenue" },
      { name: "Lead Tracking", desc: "Score, nurture & convert leads" },
      { name: "CRM Setup & Integration", desc: "HubSpot, Salesforce, Zoho & more" },
      { name: "CRM Pipeline Setup", desc: "Custom stages for your workflow" },
      { name: "Performance Dashboards", desc: "Real-time revenue & KPI tracking" },
      { name: "Sales Training", desc: "Coaching & playbook development" },
    ],
  },
];

function ServiceCard({ service, index, inView }: { service: Service; index: number; inView: boolean }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      whileHover={{ y: -6 }}
      className="group glass rounded-2xl overflow-hidden glow-border transition-all duration-500"
      style={{ boxShadow: `0 0 0 0 ${service.color}00` }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 60px ${service.color}15`; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 0 ${service.color}00`; }}
    >
      <div className="p-7 sm:p-9">
        {/* Header */}
        <div className="flex items-start gap-4 mb-5">
          <motion.div
            whileHover={{ rotate: 5, scale: 1.1 }}
            className="p-3.5 rounded-2xl shrink-0"
            style={{ backgroundColor: `${service.color}12`, color: service.color }}
          >
            {service.icon}
          </motion.div>
          <div className="flex-1">
            <h3 className="text-xl sm:text-2xl font-bold text-[#F9FAFB] mb-1.5" style={{ fontFamily: "var(--font-syne)" }}>
              {service.title}
            </h3>
            <p className="text-[#9CA3AF] text-sm leading-relaxed">{service.description}</p>
          </div>
        </div>

        {/* Always visible items (first 3) */}
        <div className="space-y-2.5 mb-4">
          {service.items.slice(0, 3).map((item) => (
            <div key={item.name} className="flex items-start gap-3 group/item">
              <svg className="w-5 h-5 shrink-0 mt-0.5 transition-colors duration-300" style={{ color: service.color }} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-sm font-medium text-[#F9FAFB]">{item.name}</p>
                <p className="text-xs text-[#9CA3AF] mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Expandable items */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="space-y-2.5 mb-4">
                {service.items.slice(3).map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <svg className="w-5 h-5 shrink-0 mt-0.5" style={{ color: service.color }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-[#F9FAFB]">{item.name}</p>
                      <p className="text-xs text-[#9CA3AF] mt-0.5">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle Button */}
        {service.items.length > 3 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-2 text-sm font-medium transition-all duration-300 mt-2"
            style={{ color: service.color }}
          >
            {expanded ? "Show Less" : `View All ${service.items.length} Services`}
            <motion.svg
              animate={{ rotate: expanded ? 180 : 0 }}
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </motion.svg>
          </button>
        )}
      </div>

      {/* Bottom accent bar */}
      <div className="h-1 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(to right, ${service.color}, transparent)` }} />
    </motion.div>
  );
}

export default function ServicesGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="section-padding relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full" style={{ background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full" style={{ background: "radial-gradient(circle, rgba(245,158,11,0.05) 0%, transparent 70%)" }} />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] rounded-full" style={{ background: "radial-gradient(circle, rgba(139,92,246,0.04) 0%, transparent 70%)" }} />
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass text-sm text-[#3B82F6] font-medium mb-6">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
            Our Services
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-5" style={{ fontFamily: "var(--font-syne)" }}>
            Everything Your Business{" "}
            <span className="text-gradient">Needs to Grow</span>
          </h2>
          <p className="text-[#9CA3AF] text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Four powerful service areas designed to take your business from idea to industry leader.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
