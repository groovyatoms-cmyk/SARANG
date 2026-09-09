import { create } from 'zustand';

// Transient overlay UI state — command palette, notification center, customization drawer.
export const useUiStore = create((set) => ({
  commandPaletteOpen: false,
  customizationOpen: false,
  setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
  setCustomizationOpen: (open) => set({ customizationOpen: open }),
}));
