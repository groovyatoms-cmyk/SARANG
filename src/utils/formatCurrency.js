export function formatCurrency(value, { compact = false, currency = 'USD' } = {}) {
  if (value === null || value === undefined || Number.isNaN(value)) return '—';
  if (compact) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      notation: 'compact',
      maximumFractionDigits: 2,
    }).format(value);
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}
