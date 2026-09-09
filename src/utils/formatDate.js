import { format, formatDistanceToNow, isValid } from 'date-fns';

export function formatDate(date, pattern = 'dd MMM yyyy') {
  const d = date instanceof Date ? date : new Date(date);
  if (!isValid(d)) return '—';
  return format(d, pattern);
}

export function formatTime(date, pattern = 'hh:mm a') {
  const d = date instanceof Date ? date : new Date(date);
  if (!isValid(d)) return '—';
  return format(d, pattern);
}

export function formatRelativeTime(date) {
  const d = date instanceof Date ? date : new Date(date);
  if (!isValid(d)) return '—';
  return formatDistanceToNow(d, { addSuffix: true });
}
