"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const categories = [
  { id: "business", label: "Business Services", icon: "briefcase", color: "#3B82F6", desc: "Formation, LLC, websites & more", emoji: "🏢" },
  { id: "merchant", label: "Merchant Services", icon: "credit-card", color: "#F59E0B", desc: "Payments, POS & processing", emoji: "💳" },
  { id: "marketing", label: "Marketing & Branding", icon: "megaphone", color: "#8B5CF6", desc: "SEO, social media & ads", emoji: "📣" },
  { id: "sales", label: "Sales & CRM", icon: "chart", color: "#10B981", desc: "Pipeline, leads & dashboards", emoji: "📈" },
];

const quickGoals: Record<string, string[]> = {
  business: ["Start an LLC", "Build a website", "Set up e-commerce", "Automate my workflows"],
  merchant: ["Accept credit cards", "Set up POS system", "Online payment gateway", "Reduce processing fees"],
  marketing: ["Improve local SEO", "Run social media ads", "Build email campaigns", "Manage reviews"],
  sales: ["Set up CRM", "Track my leads", "Build sales pipeline", "Create dashboards"],
};

const iconMap: Record<string, React.ReactNode> = {
  briefcase: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
    </svg>
  ),
  "credit-card": (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
    </svg>
  ),
  megaphone: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" />
    </svg>
  ),
  chart: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  ),
};

interface ChatMessage {
  from: "bot" | "user";
  text: string;
  options?: string[];
}

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
};

export default function SmartForm() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [category, setCategory] = useState("");
  const [goal, setGoal] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { from: "bot", text: "Hi there! 👋 I'm your Peakwa assistant. What area of your business can I help with today?" },
  ]);
  const ref = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const goTo = (s: number) => {
    setDir(s > step ? 1 : -1);
    setStep(s);
  };

  const selectCategory = (catId: string) => {
    setCategory(catId);
    const cat = categories.find((c) => c.id === catId);
    setMessages((prev) => [
      ...prev,
      { from: "user", text: `${cat?.emoji} ${cat?.label}` },
      { from: "bot", text: `Great choice! What's your main goal with ${cat?.label}? Pick a quick option below or describe in the form →`, options: quickGoals[catId] || [] },
    ]);
    goTo(1);
  };

  const selectGoal = (g: string) => {
    setGoal(g);
    setMessages((prev) => [
      ...prev,
      { from: "user", text: g },
      { from: "bot", text: "Perfect! 🎯 Just need your contact info and our expert team will reach out within 24 hours." },
    ]);
    goTo(2);
  };

  const handleSubmit = () => {
    setMessages((prev) => [
      ...prev,
      { from: "user", text: `${name} | ${email}` },
      { from: "bot", text: `Thanks ${name}! ✅ Your request has been submitted. We'll contact you shortly. Looking forward to helping your business grow! 🚀` },
    ]);
    setSubmitted(true);
  };

  const progress = ((step + 1) / 3) * 100;
  const stepLabels = ["Select Service", "Your Goal", "Contact Info"];

  return (
    <section id="smart-form" className="section-padding relative">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] rounded-full animate-float" style={{ background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full animate-float-delayed" style={{ background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full animate-pulse-glow" style={{ background: "radial-gradient(circle, rgba(245,158,11,0.04) 0%, transparent 70%)" }} />
      </div>

      <div ref={ref} className="relative max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass text-sm text-[#3B82F6] font-medium mb-6">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
            </svg>
            Get Started
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-5" style={{ fontFamily: "var(--font-syne)" }}>
            How Can We <span className="text-gradient">Help You?</span>
          </h2>
          <p className="text-[#9CA3AF] text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Tell us about your business needs and we&apos;ll connect you with the right solution.
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-3xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(17,24,39,0.9), rgba(17,24,39,0.7))",
            border: "1px solid rgba(59,130,246,0.15)",
            boxShadow: "0 25px 80px rgba(0,0,0,0.5), 0 0 60px rgba(59,130,246,0.08)",
          }}
        >
          {/* Top gradient bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#F59E0B]" />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
            {/* Chat Panel (left) */}
            <div className="lg:col-span-2 p-6 sm:p-8 flex flex-col border-b lg:border-b-0 lg:border-r border-white/5 min-h-[620px]">
              {/* Chat header */}
              <div className="flex items-center gap-3 mb-5 pb-5 border-b border-white/5">
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] flex items-center justify-center shadow-lg shadow-blue-500/20">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                    </svg>
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#10B981] border-2 border-[#111827]" />
                </div>
                <div>
                  <p className="text-base font-bold text-[#F9FAFB]" style={{ fontFamily: "var(--font-syne)" }}>Peakwa Assistant</p>
                  <p className="text-xs text-[#10B981] font-medium">Online, replies instantly</p>
                </div>
              </div>

              {/* Messages */}
              <div ref={chatContainerRef} className="flex-1 overflow-y-auto space-y-4 pr-1" style={{ scrollbarWidth: "thin", scrollbarColor: "#1E293B transparent" }}>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"} items-end gap-2`}
                  >
                    {msg.from === "bot" && (
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] flex items-center justify-center shrink-0 shadow-md">
                        <span className="text-white text-xs font-bold" style={{ fontFamily: "var(--font-syne)" }}>P</span>
                      </div>
                    )}
                    <div
                      className={`max-w-[82%] px-4 py-3 text-sm leading-relaxed ${
                        msg.from === "user"
                          ? "bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white rounded-2xl rounded-br-sm shadow-lg shadow-blue-500/20"
                          : "bg-white/[0.06] text-[#F9FAFB] border border-white/[0.06] rounded-2xl rounded-bl-sm"
                      }`}
                    >
                      {msg.text}
                      {msg.options && msg.options.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {msg.options.map((opt) => (
                            <motion.button
                              key={opt}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => selectGoal(opt)}
                              className="px-3.5 py-2 text-xs rounded-xl font-medium text-[#F9FAFB] transition-all duration-200"
                              style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(139,92,246,0.15))", border: "1px solid rgba(59,130,246,0.2)" }}
                              onMouseEnter={(e) => { (e.target as HTMLElement).style.background = "linear-gradient(135deg, rgba(59,130,246,0.3), rgba(139,92,246,0.3))"; }}
                              onMouseLeave={(e) => { (e.target as HTMLElement).style.background = "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(139,92,246,0.15))"; }}
                            >
                              {opt}
                            </motion.button>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
                <div ref={chatEndRef} />
              </div>

              {/* Typing indicator */}
              <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2 text-xs text-[#9CA3AF]">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse" style={{ animationDelay: "0.15s" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse" style={{ animationDelay: "0.3s" }} />
                </div>
                Select an option or fill the form
              </div>
            </div>

            {/* Form Panel (right) */}
            <div className="lg:col-span-3 p-6 sm:p-8 lg:p-10 flex flex-col min-h-[620px]">
              {/* Progress steps */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  {stepLabels.map((label, i) => (
                    <div key={label} className="flex items-center gap-2.5">
                      <motion.div
                        animate={step >= i ? { scale: [1, 1.15, 1] } : {}}
                        transition={{ duration: 0.4 }}
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${
                          step >= i
                            ? "bg-gradient-to-br from-[#3B82F6] to-[#2563EB] text-white shadow-lg shadow-blue-500/30"
                            : "bg-white/5 text-[#9CA3AF] border border-white/10"
                        }`}
                      >
                        {step > i ? (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          i + 1
                        )}
                      </motion.div>
                      <span className="hidden sm:block text-sm text-[#9CA3AF] font-medium">{label}</span>
                    </div>
                  ))}
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: "linear-gradient(90deg, #3B82F6, #8B5CF6, #F59E0B)" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  />
                </div>
              </div>

              {/* Step Content */}
              <div className="flex-1 min-h-0 relative overflow-visible">
                {!submitted ? (
                  <AnimatePresence mode="wait" custom={dir}>
                    {step === 0 && (
                      <motion.div key="s0" custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                        <h3 className="text-2xl font-bold text-[#F9FAFB] mb-2" style={{ fontFamily: "var(--font-syne)", lineHeight: 1.7 }}>
                          What area do you need help with?
                        </h3>
                        <p className="text-sm text-[#9CA3AF] mb-7">Choose a service category to get started</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {categories.map((cat, i) => (
                            <motion.button
                              key={cat.id}
                              initial={{ opacity: 0, y: 15 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.08 }}
                              whileHover={{ scale: 1.03, y: -3 }}
                              whileTap={{ scale: 0.97 }}
                              onClick={() => selectCategory(cat.id)}
                              className="flex items-center gap-4 p-5 rounded-2xl border-2 transition-all duration-300 text-left group/cat"
                              style={{
                                borderColor: category === cat.id ? cat.color : "rgba(255,255,255,0.06)",
                                background: category === cat.id ? `${cat.color}10` : "rgba(255,255,255,0.02)",
                                boxShadow: category === cat.id ? `0 8px 30px ${cat.color}15` : "none",
                              }}
                              onMouseEnter={(e) => { if (category !== cat.id) { (e.currentTarget).style.borderColor = `${cat.color}40`; (e.currentTarget).style.background = `${cat.color}08`; } }}
                              onMouseLeave={(e) => { if (category !== cat.id) { (e.currentTarget).style.borderColor = "rgba(255,255,255,0.06)"; (e.currentTarget).style.background = "rgba(255,255,255,0.02)"; } }}
                            >
                              <div
                                className="p-3 rounded-xl transition-all duration-300 group-hover/cat:scale-110 group-hover/cat:shadow-lg"
                                style={{ backgroundColor: `${cat.color}15`, color: cat.color, boxShadow: `0 0 0 0 ${cat.color}00` }}
                              >
                                {iconMap[cat.icon]}
                              </div>
                              <div>
                                <p className="font-bold text-[#F9FAFB] text-base">{cat.label}</p>
                                <p className="text-xs text-[#9CA3AF] mt-1">{cat.desc}</p>
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {step === 1 && (
                      <motion.div key="s1" custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="flex flex-col h-full">
                        <h3 className="text-2xl font-bold text-[#F9FAFB] mb-2" style={{ fontFamily: "var(--font-syne)", lineHeight: 1.7 }}>
                          Describe your business goal
                        </h3>
                        <p className="text-sm text-[#9CA3AF] mb-6">Or pick a quick option from the chat panel</p>
                        <textarea
                          value={goal}
                          onChange={(e) => setGoal(e.target.value)}
                          placeholder="e.g., I want to set up an LLC and launch an online store with payment processing..."
                          className="flex-1 w-full p-6 rounded-2xl text-base leading-relaxed transition-all duration-300"
                          style={{
                            background: "rgba(255,255,255,0.03)",
                            border: "2px solid rgba(255,255,255,0.06)",
                            color: "#F9FAFB",
                            resize: "none",
                            outline: "none",
                          }}
                          onFocus={(e) => { e.target.style.borderColor = "rgba(59,130,246,0.4)"; e.target.style.boxShadow = "0 0 0 4px rgba(59,130,246,0.1)"; }}
                          onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.06)"; e.target.style.boxShadow = "none"; }}
                        />
                        <div className="flex gap-3 mt-6">
                          <button onClick={() => goTo(0)} className="btn-outline px-7 py-3.5">Back</button>
                          <button
                            onClick={() => selectGoal(goal)}
                            disabled={!goal.trim()}
                            className="btn-primary px-8 py-3.5 disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            <span className="relative z-10">Continue</span>
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div key="s2" custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="flex flex-col h-full">
                        <h3 className="text-2xl font-bold text-[#F9FAFB] mb-2" style={{ fontFamily: "var(--font-syne)", lineHeight: 1.7 }}>
                          How can we reach you?
                        </h3>
                        <p className="text-sm text-[#9CA3AF] mb-6">We&apos;ll get back to you within 24 hours</p>
                        <div className="space-y-5 flex-1">
                          {[
                            { label: "Full Name", value: name, set: setName, placeholder: "John Smith", type: "text", required: true },
                            { label: "Email Address", value: email, set: setEmail, placeholder: "john@company.com", type: "email", required: true },
                            { label: "Phone Number", value: phone, set: setPhone, placeholder: "(555) 123-4567", type: "tel", required: false },
                          ].map((field) => (
                            <div key={field.label}>
                              <label className="block text-sm text-[#9CA3AF] mb-2 font-medium">
                                {field.label} {field.required && <span className="text-[#3B82F6]">*</span>}
                              </label>
                              <input
                                type={field.type}
                                value={field.value}
                                onChange={(e) => field.set(e.target.value)}
                                placeholder={field.placeholder}
                                className="w-full p-4 rounded-xl text-[#F9FAFB] text-base transition-all duration-300"
                                style={{
                                  background: "rgba(255,255,255,0.03)",
                                  border: "2px solid rgba(255,255,255,0.06)",
                                  outline: "none",
                                }}
                                onFocus={(e) => { e.target.style.borderColor = "rgba(59,130,246,0.4)"; e.target.style.boxShadow = "0 0 0 4px rgba(59,130,246,0.1)"; }}
                                onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.06)"; e.target.style.boxShadow = "none"; }}
                              />
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-3 mt-6">
                          <button onClick={() => goTo(1)} className="btn-outline px-7 py-3.5">Back</button>
                          <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={handleSubmit}
                            disabled={!name.trim() || !email.trim()}
                            className="btn-primary px-10 py-3.5 text-base disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            <span className="relative z-10 flex items-center gap-2">
                              Submit Request
                              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                              </svg>
                            </span>
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                ) : (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="flex flex-col items-center justify-center h-full text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", damping: 10, stiffness: 200, delay: 0.2 }}
                      className="w-28 h-28 rounded-full flex items-center justify-center mb-8"
                      style={{ background: "linear-gradient(135deg, #3B82F6, #10B981)", boxShadow: "0 20px 60px rgba(59,130,246,0.3)" }}
                    >
                      <svg className="w-14 h-14 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </motion.div>
                    <h3 className="text-3xl font-bold text-[#F9FAFB] mb-4" style={{ fontFamily: "var(--font-syne)" }}>
                      Request Received!
                    </h3>
                    <p className="text-[#9CA3AF] text-lg max-w-md leading-relaxed">
                      Thanks, <span className="text-[#F9FAFB] font-semibold">{name}</span>! Our team will review your request and reach out within 24 hours.
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
