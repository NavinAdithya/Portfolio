import { create } from 'zustand';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: number;
}

interface ChatState {
  isOpen: boolean;
  messages: ChatMessage[];
  isTyping: boolean;
  toggleChat: () => void;
  addMessage: (msg: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  setTyping: (status: boolean) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  isOpen: false,
  messages: [
    {
      id: 'init-1',
      sender: 'ai',
      text: 'SYSTEM_SECURE_BOOT... COMPLETE.\nWelcome to the Navin AI Terminal.\nAsk me anything about Navin\'s experience, projects, or technical skills.',
      timestamp: Date.now() - 1000,
    }
  ],
  isTyping: false,
  toggleChat: () => set((state) => ({ isOpen: !state.isOpen })),
  addMessage: (msg) => set((state) => ({
    messages: [...state.messages, { ...msg, id: Math.random().toString(36).substring(7), timestamp: Date.now() }]
  })),
  setTyping: (status) => set({ isTyping: status }),
}));
