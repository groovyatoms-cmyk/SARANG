import { mockRequest } from './api';
import { orders } from '../data/orders';

export const orderService = {
  list: () => mockRequest(orders),
  get: (id) => mockRequest(orders.find((o) => o.id === id) || null),
};
