import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Github, Linkedin, Phone, Globe, ArrowUpRight } from "lucide-react";
import { Reveal } from "../ui/Reveal";
import { SectionHeader } from "../ui/SectionHeader";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "fb6ef65b-486a-47f2-8445-440972692760",
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });
      const result = await response.json();
      if (result.success) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const socials = [
    { icon: Mail, label: "Email", value: "navinadithya394@gmail.com", url: "mailto:navinadithya394@gmail.com" },
    { icon: Github, label: "GitHub", value: "NavinAdithya", url: "https://github.com/NavinAdithya" },
    { icon: Linkedin, label: "LinkedIn", value: "navin-adithya", url: "https://www.linkedin.com/in/navin-adithya-540448348" },
    { icon: Phone, label: "WhatsApp", value: "+91 70945 43971", url: "https://wa.me/917094543971" },
    { icon: Globe, label: "TryHackMe", value: "NavinAdithya", url: "https://tryhackme.com/p/NavinAdithya" },
  ];

  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-[1200px] mx-auto">
        <Reveal>
          <SectionHeader label="Contact" title="Let's build something." />
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-[1000px] mx-auto">
          {/* Form */}
          <Reveal delay={0.1}>
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center border border-[rgba(255,255,255,0.06)] rounded-xl bg-[rgba(255,255,255,0.02)] h-full"
                >
                  <div className="w-10 h-10 rounded-lg bg-[rgba(255,130,60,0.1)] border border-[rgba(255,130,60,0.2)] flex items-center justify-center mb-4">
                    <Mail size={18} className="text-[#FF823C]" />
                  </div>
                  <h3 className="text-white text-lg font-semibold mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                    Message sent successfully!
                  </h3>
                  <p className="text-sm text-[#667085]" style={{ fontFamily: "'Inter', sans-serif" }}>
                    Thank you for reaching out. I'll get back to you shortly.
                  </p>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} className="space-y-4">
                  {[
                    { key: "name", label: "Name", type: "text", placeholder: "Your name" },
                    { key: "email", label: "Email", type: "email", placeholder: "you@company.com" },
                  ].map(({ key, label, type, placeholder }) => (
                    <div key={key}>
                      <label
                        className="block text-[11px] text-[#667085] mb-2 tracking-[0.1em] uppercase"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {label}
                      </label>
                      <input
                        type={type}
                        placeholder={placeholder}
                        value={form[key as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] text-white text-sm placeholder-[#667085]/50 focus:outline-none focus:border-[rgba(255,130,60,0.3)] transition-colors"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      />
                    </div>
                  ))}
                  <div>
                    <label
                      className="block text-[11px] text-[#667085] mb-2 tracking-[0.1em] uppercase"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      Message
                    </label>
                    <textarea
                      placeholder="What are you building?"
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] text-white text-sm placeholder-[#667085]/50 focus:outline-none focus:border-[rgba(255,130,60,0.3)] transition-colors resize-none"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-lg bg-[#FF823C] text-[#040816] text-sm font-semibold hover:bg-[#ff8533] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isSubmitting ? "Sending..." : "Send message"}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </Reveal>

          {/* Socials */}
          <Reveal delay={0.2} className="flex flex-col justify-center">
            <div className="space-y-3">
              {socials.map(({ icon: Icon, label, value, url }) => (
                <a
                  key={label}
                  href={url}
                  target={label !== "Email" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-4 rounded-lg transition-all duration-200 hover:bg-[rgba(255,255,255,0.02)]"
                >
                  <div className="w-8 h-8 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] flex items-center justify-center group-hover:border-[rgba(255,255,255,0.12)] transition-colors">
                    <Icon size={14} className="text-[#667085] group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] text-[#667085] tracking-wider uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {label}
                    </p>
                    <p className="text-sm text-[#B0B7C3] group-hover:text-white transition-colors truncate" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      {value}
                    </p>
                  </div>
                  <ArrowUpRight
                    size={14}
                    className="text-[#667085] opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
