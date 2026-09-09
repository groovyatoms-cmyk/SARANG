import { useSidebarStore } from '../store/useSidebarStore';

export function useSidebar() {
  const collapsed = useSidebarStore((s) => s.collapsed);
  const mobileOpen = useSidebarStore((s) => s.mobileOpen);
  const expandedIds = useSidebarStore((s) => s.expandedIds);
  const toggleCollapsed = useSidebarStore((s) => s.toggleCollapsed);
  const setMobileOpen = useSidebarStore((s) => s.setMobileOpen);
  const toggleExpanded = useSidebarStore((s) => s.toggleExpanded);

  return { collapsed, mobileOpen, expandedIds, toggleCollapsed, setMobileOpen, toggleExpanded };
}
