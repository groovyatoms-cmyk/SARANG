import { useMemo, useState } from 'react';

export function usePagination(items, initialRowsPerPage = 10) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);

  const paginated = useMemo(() => {
    const start = page * rowsPerPage;
    return items.slice(start, start + rowsPerPage);
  }, [items, page, rowsPerPage]);

  const handleChangeRowsPerPage = (value) => {
    setRowsPerPage(value);
    setPage(0);
  };

  return {
    page,
    rowsPerPage,
    setPage,
    setRowsPerPage: handleChangeRowsPerPage,
    paginated,
    count: items.length,
  };
}
