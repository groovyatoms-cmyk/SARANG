import { create } from 'zustand';
import { getItem, setItem } from '../utils/storage';

export const useSidebarStore = create((set, get) => ({
  collapsed: getItem('sidebarCollapsed', false),
  mobileOpen: false,
  expandedIds: getItem('sidebarExpanded', ['dashboard']),
  toggleCollapsed: () => {
    const collapsed = !get().collapsed;
    setItem('sidebarCollapsed', collapsed);
    set({ collapsed });
  },
  setMobileOpen: (open) => set({ mobileOpen: open }),
  toggleExpanded: (id) => {
    const current = get().expandedIds;
    const next = current.includes(id) ? current.filter((x) => x !== id) : [...current, id];
    setItem('sidebarExpanded', next);
    set({ expandedIds: next });
  },
}));
