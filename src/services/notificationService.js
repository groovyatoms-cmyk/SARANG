import { mockRequest } from './api';
import { initialNotifications } from '../data/notifications';

export const notificationService = {
  list: () => mockRequest(initialNotifications),
};
