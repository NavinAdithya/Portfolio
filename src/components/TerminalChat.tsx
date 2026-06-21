import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Terminal as TerminalIcon } from 'lucide-react';
import { useChatStore } from '../store/useChatStore';

export default function TerminalChat() {
  const { isOpen, toggleChat, messages, addMessage, isTyping, setTyping } = useChatStore();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    addMessage({ sender: 'user', text: userText });
    setInput('');
    setTyping(true);

    // Simulate RAG AI delay
    setTimeout(() => {
      addMessage({
        sender: 'ai',
        text: `Query received: "${userText}". Processing via RAG vectors...\n\nNavin is highly skilled in this area based on his background in web engineering and security.`,
      });
      setTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#8B5CF6] text-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:scale-105 transition-transform"
        onClick={toggleChat}
        whileHover={{ rotate: 10 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? <X size={24} /> : <TerminalIcon size={24} />}
      </motion.button>

      {/* Terminal Window Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 50, scale: 0.9, filter: 'blur(10px)' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-24 right-6 w-[90vw] max-w-[400px] h-[500px] max-h-[70vh] z-50 flex flex-col rounded-xl overflow-hidden shadow-2xl border border-[rgba(255,255,255,0.1)]"
            style={{
              background: 'rgba(4,8,22,0.85)',
              backdropFilter: 'blur(24px) saturate(1.5)',
            }}
          >
            {/* Terminal Header */}
            <div className="h-12 bg-[rgba(255,255,255,0.03)] border-b border-[rgba(255,255,255,0.05)] flex items-center px-4 justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
              </div>
              <span className="text-xs text-[#A1A1AA] font-mono">navin@ai-terminal:~</span>
              <div className="w-10" />
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 font-mono text-sm scrollbar-thin scrollbar-thumb-[rgba(255,255,255,0.1)]">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, x: msg.sender === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex flex-col max-w-[85%] ${msg.sender === 'user' ? 'self-end' : 'self-start'}`}
                >
                  <span className={`text-[10px] mb-1 ${msg.sender === 'user' ? 'text-[#FF6B00] self-end' : 'text-[#8B5CF6]'}`}>
                    {msg.sender === 'user' ? 'GUEST' : 'SYS.AI'}
                  </span>
                  <div 
                    className={`p-3 rounded-lg whitespace-pre-wrap ${
                      msg.sender === 'user' 
                        ? 'bg-[rgba(255,107,0,0.1)] border border-[rgba(255,107,0,0.2)] text-[#E2E8F0]' 
                        : 'bg-[rgba(139,92,246,0.1)] border border-[rgba(139,92,246,0.2)] text-[#5BE7FF]'
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <div className="self-start text-[#A1A1AA] text-xs flex items-center gap-1 font-mono">
                  <span className="w-1.5 h-3 bg-[#8B5CF6] animate-pulse" /> Processing...
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form 
              onSubmit={handleSubmit}
              className="p-4 bg-[rgba(0,0,0,0.2)] border-t border-[rgba(255,255,255,0.05)] flex gap-2"
            >
              <div className="flex-1 relative flex items-center">
                <span className="absolute left-3 text-[#5BE7FF] font-mono text-sm">{'>'}</span>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about my resume..."
                  className="w-full bg-transparent border-none outline-none text-[#E2E8F0] font-mono text-sm pl-8 pr-4 py-2"
                />
              </div>
              <button 
                type="submit"
                disabled={!input.trim() || isTyping}
                className="w-10 h-10 flex items-center justify-center bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] rounded-md text-[#A1A1AA] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
