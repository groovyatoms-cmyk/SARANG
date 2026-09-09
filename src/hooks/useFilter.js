import { useMemo, useState } from 'react';

// filters: { fieldName: value }. A falsy filter value means "no constraint".
export function useFilter(items) {
  const [filters, setFilters] = useState({});

  const setFilter = (field, value) => setFilters((prev) => ({ ...prev, [field]: value }));
  const clearFilters = () => setFilters({});

  const filtered = useMemo(() => {
    const active = Object.entries(filters).filter(([, v]) => v);
    if (active.length === 0) return items;
    return items.filter((item) => active.every(([field, value]) => item[field] === value));
  }, [items, filters]);

  return { filters, setFilter, clearFilters, filtered };
}
