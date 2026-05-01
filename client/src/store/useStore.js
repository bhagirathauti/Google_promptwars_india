import { create } from 'zustand';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const useStore = create((set, get) => ({
  // State
  currentStep: 0,
  sessionId: Math.random().toString(36).substring(7),
  userData: {
    voterId: '',
    name: '',
    boothId: null,
    selectedCandidate: null,
  },
  config: null,
  insight: '',
  aiExplanation: '',
  isLoading: false,

  // Actions
  explainError: async (stepTitle, errorText) => {
    set({ aiExplanation: '', isLoading: true });
    try {
      const res = await axios.post(`${API_URL}/explain-error`, { step: stepTitle, error: errorText });
      set({ aiExplanation: res.data.explanation, isLoading: false });
    } catch (err) {
      set({ aiExplanation: "Unable to load explanation.", isLoading: false });
    }
  },

  fetchConfig: async () => {
    try {
      const res = await axios.get(`${API_URL}/config`);
      set({ config: res.data });
    } catch (err) {
      console.error("Failed to fetch config", err);
    }
  },

  fetchInsight: async (stepId) => {
    set({ insight: '', isLoading: true });
    try {
      const res = await axios.get(`${API_URL}/insight/${stepId}`);
      set({ insight: res.data.insight, isLoading: false });
    } catch (err) {
      set({ insight: "Error loading educational insight.", isLoading: false });
    }
  },

  nextStep: async () => {
    const { currentStep, sessionId, userData } = get();
    const next = currentStep + 1;
    set({ currentStep: next });
    
    // Save progress to backend
    try {
      await axios.post(`${API_URL}/progress`, {
        sessionId,
        stepIndex: next,
        data: userData
      });
    } catch (err) {
      console.warn("Failed to save progress", err);
    }
  },

  prevStep: () => set((state) => ({ currentStep: state.currentStep - 1 })),
  
  resetSimulation: () => set({ 
    currentStep: 0, 
    userData: { voterId: '', name: '', boothId: null, selectedCandidate: null },
    insight: ''
  }),

  updateUserData: (data) => set((state) => ({ 
    userData: { ...state.userData, ...data } 
  })),
}));

export default useStore;
