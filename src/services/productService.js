import { mockRequest } from './api';
import { products } from '../data/products';

export const productService = {
  list: () => mockRequest(products),
  get: (id) => mockRequest(products.find((p) => p.id === id) || null),
};
