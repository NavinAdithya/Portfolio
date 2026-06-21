import { motion } from "motion/react";
import { Terminal, Shield, Lock, Code2, Cpu } from "lucide-react";

export default function IdentityCard() {
  return (
    <div className="relative w-[340px] h-[340px] lg:w-[500px] lg:h-[500px] mx-auto flex items-center justify-center">
      {/* Background Soft Glow matching the Peach accent */}
      <div 
        className="absolute inset-0 rounded-full blur-[100px] opacity-40 mix-blend-multiply pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255,130,60,0.6) 0%, rgba(255,163,102,0.2) 50%, transparent 70%)"
        }}
      />

      {/* Main Terminal Window (Center) */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-20 w-[280px] lg:w-[380px] rounded-xl overflow-hidden bg-[#1A1A1A] border border-[rgba(255,255,255,0.1)] shadow-[0_20px_50px_rgba(255,130,60,0.15)]"
      >
        {/* Terminal Header */}
        <div className="h-8 bg-[#222222] border-b border-[rgba(255,255,255,0.05)] flex items-center px-4 gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
        </div>
        {/* Terminal Body */}
        <div className="p-5 font-mono text-sm leading-relaxed">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="text-[#FF823C] mb-2"
          >
            navin@portfolio:~$ whoami
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-zinc-400 pl-4 border-l-2 border-[#FF823C]/30 mb-4"
          >
            <span className="text-white font-bold">Navin Adithya</span>
            <br />
            &gt; B.E. Cybersecurity Student @ SRM Easwari
            <br />
            &gt; Tech: React, TypeScript, Node.js, SIEM
            <br />
            <span className="text-emerald-400">&gt; Status: Available for hire.</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, repeat: Infinity, repeatType: "reverse", duration: 0.6 }}
            className="w-2 h-4 bg-zinc-300"
          />
        </div>
      </motion.div>

      {/* Floating Shield (Top Left) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
        animate={{ opacity: 1, scale: 1, rotate: 0, y: [0, -15, 0] }}
        transition={{ 
          opacity: { delay: 0.8 },
          scale: { delay: 0.8, type: "spring" },
          y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 } 
        }}
        className="absolute top-[10%] left-[0%] z-30 w-16 h-16 rounded-2xl bg-white border border-zinc-200 shadow-[0_15px_30px_rgba(0,0,0,0.08)] flex items-center justify-center backdrop-blur-md"
      >
        <Shield size={28} className="text-[#FF823C]" />
      </motion.div>

      {/* Floating Code Block (Bottom Right) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, rotate: 20 }}
        animate={{ opacity: 1, scale: 1, rotate: 0, y: [0, 15, 0] }}
        transition={{ 
          opacity: { delay: 1.1 },
          scale: { delay: 1.1, type: "spring" },
          y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 } 
        }}
        className="absolute bottom-[15%] right-[-5%] z-30 w-20 h-20 rounded-2xl bg-[#FF823C] border border-[#ff9559] shadow-[0_15px_30px_rgba(255,130,60,0.3)] flex items-center justify-center"
      >
        <Code2 size={32} className="text-white" />
      </motion.div>

      {/* Floating Cyber Lock (Bottom Left) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1, y: [0, 10, 0] }}
        transition={{ 
          opacity: { delay: 1.4 },
          scale: { delay: 1.4, type: "spring" },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 } 
        }}
        className="absolute bottom-[5%] left-[10%] z-10 w-12 h-12 rounded-xl bg-white border border-zinc-200 shadow-[0_10px_20px_rgba(0,0,0,0.05)] flex items-center justify-center backdrop-blur-md"
      >
        <Lock size={20} className="text-zinc-800" />
      </motion.div>

      {/* Floating Processor (Top Right) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1, y: [0, -12, 0] }}
        transition={{ 
          opacity: { delay: 1.7 },
          scale: { delay: 1.7, type: "spring" },
          y: { duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 } 
        }}
        className="absolute top-[25%] right-[-10%] z-10 w-14 h-14 rounded-xl bg-zinc-900 border border-zinc-800 shadow-[0_10px_20px_rgba(0,0,0,0.2)] flex items-center justify-center"
      >
        <Cpu size={24} className="text-[#5BE7FF]" />
      </motion.div>
    </div>
  );
}
