import { mockRequest } from './api';
import { users } from '../data/users';

export const userService = {
  list: () => mockRequest(users),
  get: (id) => mockRequest(users.find((u) => u.id === id) || null),
};
