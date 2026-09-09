import { create } from 'zustand';
import { initialNotifications } from '../data/notifications';

export const useNotificationStore = create((set, get) => ({
  notifications: initialNotifications,
  unreadCount: initialNotifications.filter((n) => !n.read).length,
  markRead: (id) => {
    const notifications = get().notifications.map((n) => (n.id === id ? { ...n, read: true } : n));
    set({ notifications, unreadCount: notifications.filter((n) => !n.read).length });
  },
  markAllRead: () => {
    const notifications = get().notifications.map((n) => ({ ...n, read: true }));
    set({ notifications, unreadCount: 0 });
  },
  remove: (id) => {
    const notifications = get().notifications.filter((n) => n.id !== id);
    set({ notifications, unreadCount: notifications.filter((n) => !n.read).length });
  },
}));
