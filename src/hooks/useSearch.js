import { useMemo, useState } from 'react';
import { useDebounce } from './useDebounce';

export function useSearch(items, keys) {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 250);

  const filtered = useMemo(() => {
    if (!debouncedQuery.trim()) return items;
    const q = debouncedQuery.toLowerCase();
    return items.filter((item) => keys.some((key) => String(item[key] ?? '').toLowerCase().includes(q)));
  }, [items, keys, debouncedQuery]);

  return { query, setQuery, filtered };
}
