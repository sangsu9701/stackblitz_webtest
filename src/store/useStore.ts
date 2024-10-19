import create from 'zustand';

interface AppState {
  chatHistory: string[];
  addChatMessage: (message: string) => void;
  clearChatHistory: () => void;
}

const useStore = create<AppState>((set) => ({
  chatHistory: [],
  addChatMessage: (message) => set((state) => ({ chatHistory: [...state.chatHistory, message] })),
  clearChatHistory: () => set({ chatHistory: [] }),
}));

export default useStore;