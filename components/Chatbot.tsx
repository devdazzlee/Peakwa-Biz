"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  from: "bot" | "user";
  text: string;
  buttons?: string[];
}

const initialMessages: Message[] = [
  {
    from: "bot",
    text: "Hey there! 👋 I'm the Peakwa assistant. How can I help you today?",
    buttons: ["Start a Business", "Accept Payments", "Marketing Help", "Sales & CRM", "Talk to a Human"],
  },
];

const botReplies: Record<string, Message> = {
  "Start a Business": {
    from: "bot",
    text: "Great! We can help with LLC formation, website setup, e-commerce, and more. What specifically are you looking for?",
    buttons: ["LLC Formation", "Website Design", "E-Commerce Setup", "Not sure yet"],
  },
  "Accept Payments": {
    from: "bot",
    text: "We offer credit card processing, POS systems, online gateways, and zero-fee programs. What do you need?",
    buttons: ["Credit Card Processing", "POS System", "Online Payments", "Reduce Fees"],
  },
  "Marketing Help": {
    from: "bot",
    text: "We specialize in local SEO, social media marketing, Google Business Profile optimization, and automated campaigns. What interests you?",
    buttons: ["Local SEO", "Social Media", "Google Business", "Email Marketing"],
  },
  "Sales & CRM": {
    from: "bot",
    text: "We can set up your CRM, build sales pipelines, create dashboards, and train your team. What's your priority?",
    buttons: ["CRM Setup", "Lead Tracking", "Sales Dashboard", "Sales Training"],
  },
  "Talk to a Human": {
    from: "bot",
    text: "Of course! Fill out our contact form above or call us at (888) 555-PEAK. We respond within 24 hours!",
  },
};

const defaultReply: Message = {
  from: "bot",
  text: "That's a great choice! Our experts can help you with that. Would you like to fill out our quick form above, or would you prefer to schedule a call?",
  buttons: ["Fill Out Form", "Schedule a Call", "Start Over"],
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSend = (text: string) => {
    const userMsg: Message = { from: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      if (text === "Start Over") {
        setMessages([...initialMessages]);
        return;
      }
      if (text === "Fill Out Form") {
        setIsOpen(false);
        document.getElementById("smart-form")?.scrollIntoView({ behavior: "smooth" });
        return;
      }
      const reply = botReplies[text] || defaultReply;
      setMessages((prev) => [...prev, reply]);
    }, 600);
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    handleSend(input.trim());
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#2563EB] text-white flex items-center justify-center shadow-2xl shadow-blue-500/40 hover:shadow-blue-500/60 transition-shadow"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ y: [0, -4, 0] }}
        transition={{ y: { repeat: Infinity, duration: 3, ease: "easeInOut" } }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.svg key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </motion.svg>
          ) : (
            <motion.svg key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Notification dot */}
      {!isOpen && (
        <span className="fixed bottom-[4.5rem] right-6 z-50 w-4 h-4 rounded-full bg-[#F59E0B] border-2 border-[#0A0F1C] animate-pulse pointer-events-none" />
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] rounded-2xl shadow-2xl shadow-black/60 border border-white/10 overflow-hidden flex flex-col"
            style={{ height: "520px", background: "#0D1321" }}
          >
            {/* Header */}
            <div className="px-5 py-4 bg-gradient-to-r from-[#3B82F6]/10 to-[#8B5CF6]/10 border-b border-white/5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#F59E0B] flex items-center justify-center text-white font-bold text-sm" style={{ fontFamily: "var(--font-syne)" }}>
                P
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-[#F9FAFB]" style={{ fontFamily: "var(--font-syne)" }}>Peakwa Assistant</p>
                <p className="text-xs text-[#10B981] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" /> Online
                </p>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1.5 rounded-lg hover:bg-white/5 text-[#9CA3AF] hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    msg.from === "user"
                      ? "bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white rounded-br-md"
                      : "bg-white/5 text-[#F9FAFB] border border-white/5 rounded-bl-md"
                  }`}>
                    {msg.text}
                    {msg.buttons && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {msg.buttons.map((btn) => (
                          <button
                            key={btn}
                            onClick={() => handleSend(btn)}
                            className="px-3 py-1.5 text-xs rounded-lg bg-white/10 hover:bg-[#3B82F6]/30 text-[#F9FAFB] transition-all border border-white/10 hover:border-[#3B82F6]/50"
                          >
                            {btn}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleInputSubmit} className="p-3 border-t border-white/5 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-[#F9FAFB] placeholder-[#9CA3AF]/50 text-sm focus:outline-none focus:border-[#3B82F6] transition-all"
              />
              <button
                type="submit"
                className="w-11 h-11 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white flex items-center justify-center shrink-0 hover:shadow-lg hover:shadow-blue-500/30 transition-all"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
