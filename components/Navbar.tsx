"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ICON_PATHS: Record<string, string> = {
  building:
    "M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21",
  rocket:
    "M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 8.41m5.96 5.96a14.93 14.93 0 01-5.84 2.58m-.12-8.54a6 6 0 00-7.38 5.84h4.8m2.58-5.84a14.93 14.93 0 00-2.58 5.84m2.7 2.7c-.1.02-.21.04-.31.06a15.09 15.09 0 01-2.45-2.45 14.9 14.9 0 01.06-.31m-2.24 2.39a4.49 4.49 0 00-1.76 4.31 4.49 4.49 0 004.31-1.76M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z",
  swap: "M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5",
  globe:
    "M12 21a9 9 0 008.72-6.75M12 21a9 9 0 01-8.72-6.75M12 21c2.49 0 4.5-4.03 4.5-9S14.49 3 12 3m0 18c-2.49 0-4.5-4.03-4.5-9S9.51 3 12 3m0 0a9 9 0 017.84 4.58M12 3a9 9 0 00-7.84 4.58m15.68 0A12 12 0 0112 10.5c-3 0-5.74-1.1-7.84-2.92m15.68 0A9 9 0 0121 12c0 .78-.1 1.53-.28 2.25M3.28 14.25A9 9 0 013 12c0-1.6.42-3.11 1.16-4.42",
  cart: "M2.25 3h1.39c.51 0 .96.34 1.09.84l.38 1.44M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.22c1.12-2.3 2.1-4.68 2.92-7.14a60.11 60.11 0 00-16.54-1.84M7.5 14.25L5.1 5.27M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z",
  bolt: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
  card: "M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z",
  device:
    "M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3",
  shieldCheck:
    "M9 12.75L11.25 15 15 9.75M21 12c0 1.27-.63 2.39-1.59 3.07a3.75 3.75 0 01-1.04 3.3 3.75 3.75 0 01-3.3 1.04A3.75 3.75 0 0112 21c-1.27 0-2.39-.63-3.07-1.59a3.75 3.75 0 01-3.3-1.04 3.75 3.75 0 01-1.04-3.3A3.75 3.75 0 013 12c0-1.27.63-2.39 1.59-3.07a3.75 3.75 0 011.04-3.3 3.75 3.75 0 013.3-1.04A3.75 3.75 0 0112 3c1.27 0 2.39.63 3.07 1.59a3.75 3.75 0 013.3 1.04 3.75 3.75 0 011.04 3.3A3.75 3.75 0 0121 12z",
  bank: "M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.38c.62 0 1.12.5 1.12 1.13V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.88c0-.62-.5-1.13-1.13-1.13H4.13C3.5 3.75 3 4.25 3 4.88V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z",
  shield:
    "M12 9v3.75m-9.3 3.38c-.87 1.5.22 3.37 1.95 3.37h14.71c1.73 0 2.81-1.87 1.95-3.37L13.95 3.38c-.87-1.5-3.03-1.5-3.9 0L2.7 16.13zM12 15.75h.01v.01H12v-.01z",
  dollar:
    "M12 6v12m-3-2.82l.88.66c1.17.88 3.07.88 4.24 0 1.17-.88 1.17-2.3 0-3.18C13.54 12.22 12.77 12 12 12c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4",
  pin: "M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.14-7.5 11.25-7.5 11.25S4.5 17.64 4.5 10.5a7.5 7.5 0 1115 0z",
  code: "M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z",
  share:
    "M7.22 10.91a2.25 2.25 0 100 2.19m0-2.19c.18.32.28.7.28 1.1s-.1.77-.28 1.09m0-2.19l9.57-5.31m-9.57 7.5l9.57 5.31m0 0a2.25 2.25 0 103.93 2.19 2.25 2.25 0 00-3.93-2.19zm0-12.81a2.25 2.25 0 103.93-2.19 2.25 2.25 0 00-3.93 2.19z",
  star: "M11.48 3.5a.56.56 0 011.04 0l2.13 5.11c.07.18.24.31.47.34l5.52.44c.5.04.7.66.32.99l-4.2 3.6a.56.56 0 00-.18.56l1.28 5.39a.56.56 0 01-.84.61l-4.72-2.89a.56.56 0 00-.59 0L6.98 20.54a.56.56 0 01-.84-.61l1.28-5.39a.56.56 0 00-.18-.56l-4.2-3.6a.56.56 0 01.32-.99l5.52-.44a.56.56 0 00.47-.34L11.48 3.5z",
  chat: "M2.25 12.76c0 1.6 1.12 2.99 2.71 3.23 1.07.16 2.15.28 3.24.36.47.04.89.28 1.15.67L12 21l2.65-3.98c.26-.39.69-.63 1.15-.67 1.09-.09 2.17-.21 3.24-.36 1.58-.23 2.71-1.63 2.71-3.23V6.74c0-1.6-1.12-2.99-2.71-3.23A48.4 48.4 0 0012 3c-2.39 0-4.74.18-7.04.51-1.58.24-2.71 1.63-2.71 3.23v6.02z",
  mail: "M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.24a2.25 2.25 0 01-1.07 1.92l-7.5 4.61a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.92V6.75",
  trendUp:
    "M2.25 18L9 11.25l4.31 4.31a11.95 11.95 0 015.81-5.52l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.94",
  target:
    "M15.04 21.67L13.68 16.6m0 0l-2.51 2.23.57-9.47 5.23 7.92-3.29-.68zm-7.52-.27A8.25 8.25 0 1120.55 16.5",
  users:
    "M15 19.13a9.38 9.38 0 002.63.37 9.34 9.34 0 004.12-.95 4.13 4.13 0 00-7.53-2.49M15 19.13v0c0-1.11-.29-2.16-.79-3.07M15 19.13v.11A12.32 12.32 0 018.62 21c-2.33 0-4.51-.65-6.37-1.77v-.11a6.38 6.38 0 0111.96-3.07M12 6.38a3.38 3.38 0 11-6.75 0 3.38 3.38 0 016.75 0zm8.25 2.25a2.63 2.63 0 11-5.25 0 2.63 2.63 0 015.25 0z",
  list: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.63 4.5h12.75a1.88 1.88 0 010 3.75H5.63a1.88 1.88 0 010-3.75z",
  chartBar:
    "M3 13.13C3 12.5 3.5 12 4.13 12h2.25c.62 0 1.13.5 1.13 1.13v6.75c0 .62-.5 1.13-1.13 1.13H4.13c-.62 0-1.13-.5-1.13-1.13v-6.75zM9.75 8.63c0-.62.5-1.13 1.13-1.13h2.25c.62 0 1.13.5 1.13 1.13v11.25c0 .62-.5 1.13-1.13 1.13h-2.25c-.62 0-1.13-.5-1.13-1.13V8.63zM16.5 4.13c0-.62.5-1.13 1.13-1.13h2.25c.62 0 1.13.5 1.13 1.13v15.75c0 .62-.5 1.13-1.13 1.13h-2.25c-.62 0-1.13-.5-1.13-1.13V4.13z",
  cap: "M4.26 10.15c-.27 2.1-.44 4.21-.49 6.35A48.62 48.62 0 0112 20.9a48.62 48.62 0 018.23-4.41 60.46 60.46 0 00-.49-6.35m-15.48 0a50.64 50.64 0 00-2.66-.81A59.9 59.9 0 0112 3.49a59.9 59.9 0 0110.4 5.84c-.9.25-1.78.52-2.66.81m-15.48 0A50.72 50.72 0 0112 13.49a50.7 50.7 0 017.74-3.34M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.68A55.38 55.38 0 0112 8.44m-7.01 11.55A5.98 5.98 0 006.75 15.75v-1.5",
};

const serviceDropdowns = [
  {
    label: "Services",
    href: "#services",
    color: "#3B82F6",
    items: [
      { name: "Business Formation", desc: "LLC, Corp & more", icon: "building" },
      { name: "Startup Systems Setup", desc: "Tools & workflows", icon: "rocket" },
      { name: "Business Brokerage", desc: "Buy & sell businesses", icon: "swap" },
      { name: "Website & Digital", desc: "Modern web presence", icon: "globe" },
      { name: "E-Commerce Setup", desc: "Online store launch", icon: "cart" },
      { name: "Tools & Automation", desc: "Streamline operations", icon: "bolt" },
    ],
  },
  {
    label: "Merchant Services",
    href: "#services",
    color: "#F59E0B",
    items: [
      { name: "Credit Card Processing", desc: "Low-rate terminals", icon: "card" },
      { name: "POS Systems", desc: "Retail & restaurant", icon: "device" },
      { name: "Payment Gateways", desc: "Online checkout", icon: "shieldCheck" },
      { name: "ACH / eCheck", desc: "Bank transfers", icon: "bank" },
      { name: "High Risk Accounts", desc: "Specialized processing", icon: "shield" },
      { name: "Zero Fee Programs", desc: "Pass fees to customers", icon: "dollar" },
    ],
  },
  {
    label: "Marketing",
    href: "#services",
    color: "#8B5CF6",
    items: [
      { name: "Local SEO", desc: "Rank in your area", icon: "pin" },
      { name: "Technical SEO", desc: "Site optimization", icon: "code" },
      { name: "Social Media", desc: "Grow your audience", icon: "share" },
      { name: "Google Business Profile", desc: "Maps & reviews", icon: "star" },
      { name: "Reputation Management", desc: "Protect your brand", icon: "chat" },
      { name: "Automated Campaigns", desc: "Email & SMS", icon: "mail" },
    ],
  },
  {
    label: "Sales & CRM",
    href: "#services",
    color: "#10B981",
    items: [
      { name: "Sales Optimization", desc: "Close more deals", icon: "trendUp" },
      { name: "Lead Tracking", desc: "Never lose a lead", icon: "target" },
      { name: "CRM Setup", desc: "HubSpot, Salesforce & more", icon: "users" },
      { name: "Pipeline Setup", desc: "Stage-by-stage flow", icon: "list" },
      { name: "Performance Dashboards", desc: "Real-time metrics", icon: "chartBar" },
      { name: "Sales Training", desc: "Team enablement", icon: "cap" },
    ],
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleMouseEnter = (label: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0A0F1C]/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <motion.a href="#" className="flex items-center gap-2.5 group" whileHover={{ scale: 1.02 }}>
              <div
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#3B82F6] flex items-center justify-center font-bold text-white text-base sm:text-lg shadow-lg shadow-blue-500/25"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                P
              </div>
              <span className="text-lg sm:text-xl font-bold text-[#F9FAFB]" style={{ fontFamily: "var(--font-syne)" }}>
                Peakwa <span className="text-[#3B82F6]">Biz</span>
              </span>
            </motion.a>

            {/* Desktop Nav with Dropdowns */}
            <div className="hidden lg:flex items-center gap-1">
              {serviceDropdowns.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <a
                    href={item.href}
                    className={`flex items-center gap-1 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ${
                      activeDropdown === item.label
                        ? "text-[#F9FAFB] bg-white/5"
                        : "text-[#9CA3AF] hover:text-[#F9FAFB]"
                    }`}
                  >
                    {item.label}
                    <svg
                      className={`w-3.5 h-3.5 transition-transform duration-300 ${
                        activeDropdown === item.label ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </a>

                  <AnimatePresence>
                    {activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[320px]"
                      >
                        <div className="rounded-2xl p-3 shadow-2xl shadow-black/60 border border-white/10 bg-[#0A0F1C]/98 backdrop-blur-2xl" style={{ backgroundColor: "rgba(10, 15, 28, 0.98)" }}>
                          <div className="px-3 py-2 mb-1">
                            <p className="text-xs font-bold uppercase tracking-wider" style={{ color: item.color, fontFamily: "var(--font-syne)" }}>
                              {item.label}
                            </p>
                          </div>
                          {item.items.map((sub, i) => (
                            <motion.a
                              key={sub.name}
                              href="#services"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.03 }}
                              className="flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-all duration-200 group/item"
                            >
                              <div
                                className="shrink-0 flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200 group-hover/item:scale-105"
                                style={{
                                  backgroundColor: `${item.color}1A`,
                                  color: item.color,
                                  boxShadow: `inset 0 0 0 1px ${item.color}33`,
                                }}
                              >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7">
                                  <path strokeLinecap="round" strokeLinejoin="round" d={ICON_PATHS[sub.icon]} />
                                </svg>
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-[#F9FAFB] group-hover/item:text-white">{sub.name}</p>
                                <p className="text-xs text-[#9CA3AF] mt-0.5">{sub.desc}</p>
                              </div>
                            </motion.a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <motion.a
                href="#smart-form"
                className="hidden lg:inline-flex items-center gap-2 px-7 py-2.5 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white text-sm font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                Start Free Today
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </motion.a>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden relative w-11 h-11 flex flex-col items-center justify-center gap-1.5 rounded-xl hover:bg-white/5 transition-colors border border-white/10"
                aria-label="Toggle menu"
              >
                <motion.span animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} className="w-5 h-0.5 bg-[#F9FAFB] block rounded-full" />
                <motion.span animate={mobileOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }} className="w-5 h-0.5 bg-[#F9FAFB] block rounded-full" />
                <motion.span animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} className="w-5 h-0.5 bg-[#F9FAFB] block rounded-full" />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-80 max-w-[90vw] bg-[#0A0F1C] border-l border-white/10 overflow-y-auto"
            >
              <div className="p-6 pt-24">
                {serviceDropdowns.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="mb-1"
                  >
                    <button
                      onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                      className="w-full flex items-center justify-between px-4 py-3.5 text-[#F9FAFB] text-lg font-medium rounded-xl hover:bg-white/5 transition-all"
                      style={{ fontFamily: "var(--font-syne)" }}
                    >
                      <span className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                        {item.label}
                      </span>
                      <motion.svg
                        animate={{ rotate: mobileExpanded === item.label ? 180 : 0 }}
                        className="w-4 h-4 text-[#9CA3AF]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </motion.svg>
                    </button>
                    <AnimatePresence>
                      {mobileExpanded === item.label && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-4 pr-2 pb-3 space-y-1">
                            {item.items.map((sub) => (
                              <a
                                key={sub.name}
                                href="#services"
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center gap-3 py-2 px-3 text-sm text-[#9CA3AF] hover:text-[#F9FAFB] rounded-lg hover:bg-white/5 transition-all"
                              >
                                <span
                                  className="shrink-0 flex items-center justify-center w-8 h-8 rounded-lg"
                                  style={{
                                    backgroundColor: `${item.color}1A`,
                                    color: item.color,
                                    boxShadow: `inset 0 0 0 1px ${item.color}33`,
                                  }}
                                >
                                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7">
                                    <path strokeLinecap="round" strokeLinejoin="round" d={ICON_PATHS[sub.icon]} />
                                  </svg>
                                </span>
                                {sub.name}
                              </a>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}

                <motion.a
                  href="#smart-form"
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-6 flex items-center justify-center gap-2 w-full px-6 py-4 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white font-semibold shadow-lg shadow-blue-500/25 text-base"
                >
                  Start Free Today
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
