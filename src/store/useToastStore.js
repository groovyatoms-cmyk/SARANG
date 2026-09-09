import { create } from 'zustand';

let nextId = 1;

export const useToastStore = create((set, get) => ({
  toasts: [],
  show: (message, severity = 'success') => {
    const id = nextId++;
    set({ toasts: [...get().toasts, { id, message, severity }] });
    return id;
  },
  dismiss: (id) => set({ toasts: get().toasts.filter((t) => t.id !== id) }),
}));

export const toast = {
  success: (message) => useToastStore.getState().show(message, 'success'),
  error: (message) => useToastStore.getState().show(message, 'error'),
  info: (message) => useToastStore.getState().show(message, 'info'),
  warning: (message) => useToastStore.getState().show(message, 'warning'),
};
