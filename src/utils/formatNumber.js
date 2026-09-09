export function formatNumber(value, { compact = false } = {}) {
  if (value === null || value === undefined || Number.isNaN(value)) return '—';
  return new Intl.NumberFormat('en-US', {
    notation: compact ? 'compact' : 'standard',
    maximumFractionDigits: compact ? 2 : 0,
  }).format(value);
}

export function formatPercent(value, { showSign = false } = {}) {
  if (value === null || value === undefined || Number.isNaN(value)) return '—';
  const sign = showSign && value > 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
}
