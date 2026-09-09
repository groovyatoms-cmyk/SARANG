import { useMemo, useState } from 'react';

export function useSort(items, initialKey = null, initialDirection = 'asc') {
  const [sortKey, setSortKey] = useState(initialKey);
  const [direction, setDirection] = useState(initialDirection);

  const toggleSort = (key) => {
    if (sortKey === key) {
      setDirection((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setDirection('asc');
    }
  };

  const sorted = useMemo(() => {
    if (!sortKey) return items;
    const copy = [...items];
    copy.sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (typeof av === 'number' && typeof bv === 'number') return direction === 'asc' ? av - bv : bv - av;
      return direction === 'asc'
        ? String(av).localeCompare(String(bv))
        : String(bv).localeCompare(String(av));
    });
    return copy;
  }, [items, sortKey, direction]);

  return { sorted, sortKey, direction, toggleSort };
}
