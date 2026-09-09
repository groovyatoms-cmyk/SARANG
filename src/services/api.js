// Simulated network latency so loading/skeleton states are exercised honestly.
// Swap the resolve() calls in the *Service modules for real fetch/GraphQL calls later —
// components consume services, never mock data directly.
export function mockRequest(data, { delay = 400, failRate = 0 } = {}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (failRate > 0 && Math.random() < failRate) {
        reject(new Error('Request failed'));
        return;
      }
      resolve(data);
    }, delay);
  });
}
