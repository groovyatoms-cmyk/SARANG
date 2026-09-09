import { mockRequest } from './api';
import { customers } from '../data/customers';

export const customerService = {
  list: () => mockRequest(customers),
  get: (id) => mockRequest(customers.find((c) => c.id === id) || null),
};
