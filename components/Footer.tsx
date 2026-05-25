"use client";

import { motion } from "framer-motion";

const footerLinks = [
  {
    title: "Services",
    links: [
      "Business Formation",
      "LLC Formation",
      "Website & Digital",
      "E-Commerce Setup",
      "Business Brokerage",
    ],
  },
  {
    title: "Merchant Services",
    links: [
      "Credit Card Processing",
      "POS Systems",
      "Payment Gateways",
      "ACH / eCheck",
      "Fraud Protection",
    ],
  },
  {
    title: "Marketing",
    links: [
      "Local SEO",
      "Technical SEO",
      "Social Media",
      "Google Business Profile",
      "Reputation Management",
    ],
  },
  {
    title: "Sales & CRM",
    links: [
      "Sales Optimization",
      "Lead Tracking",
      "CRM Setup",
      "Performance Dashboards",
      "Sales Training",
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1 mb-4 lg:mb-0">
            <motion.a
              href="#"
              className="flex items-center gap-3 mb-6"
              whileHover={{ scale: 1.02 }}
            >
              <div
                className="w-10 h-10 rounded-lg bg-[#3B82F6] flex items-center justify-center font-bold text-white text-lg shadow-lg shadow-blue-500/25"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                P
              </div>
              <span
                className="text-xl font-bold text-[#F9FAFB]"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Peakwa <span className="text-[#3B82F6]">Biz</span>
              </span>
            </motion.a>
            <p className="text-sm text-[#9CA3AF] leading-relaxed max-w-xs mb-6">
              Full-service business solutions from formation to scale. Your growth partner at every stage.
            </p>
            <div className="flex gap-3">
              {["twitter", "linkedin", "facebook"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-[#9CA3AF] hover:text-[#3B82F6] hover:bg-white/10 transition-all duration-300"
                >
                  {social === "twitter" && (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  )}
                  {social === "linkedin" && (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  )}
                  {social === "facebook" && (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4
                className="text-sm font-bold text-[#F9FAFB] mb-4 uppercase tracking-wider"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                {section.title}
              </h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-[#9CA3AF] hover:text-[#3B82F6] transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[#9CA3AF]">
            &copy; {new Date().getFullYear()} Peakwa Biz Solutions. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-[#9CA3AF]">
            <a href="#" className="hover:text-[#3B82F6] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#3B82F6] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[#3B82F6] transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
