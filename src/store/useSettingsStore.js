import { create } from 'zustand';
import { getItem, setItem } from '../utils/storage';

const defaults = {
  sidebarMode: 'expanded', // expanded | collapsed
  layoutDensity: 'comfortable', // compact | comfortable
  contentWidth: 'contained', // contained | full
  cardRadius: 'default', // sharp | default | round
  topbarMode: 'fixed', // fixed | static
  breadcrumbsVisible: true,
  footerVisible: true,
};

export const useSettingsStore = create((set, get) => ({
  ...defaults,
  ...getItem('layoutSettings', {}),
  update: (patch) => {
    const next = { ...get(), ...patch };
    const { update: _update, reset: _reset, ...persistable } = next;
    setItem('layoutSettings', persistable);
    set(patch);
  },
  reset: () => {
    setItem('layoutSettings', defaults);
    set(defaults);
  },
}));
