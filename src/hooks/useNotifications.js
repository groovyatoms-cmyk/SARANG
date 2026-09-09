import { useNotificationStore } from '../store/useNotificationStore';

export function useNotifications() {
  const notifications = useNotificationStore((s) => s.notifications);
  const unreadCount = useNotificationStore((s) => s.unreadCount);
  const markRead = useNotificationStore((s) => s.markRead);
  const markAllRead = useNotificationStore((s) => s.markAllRead);
  const remove = useNotificationStore((s) => s.remove);

  return { notifications, unreadCount, markRead, markAllRead, remove };
}
