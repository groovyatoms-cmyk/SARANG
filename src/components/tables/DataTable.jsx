import { useMemo, useState } from 'react';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import { useSearch } from '../../hooks/useSearch';
import { useSort } from '../../hooks/useSort';
import { useFilter } from '../../hooks/useFilter';
import { usePagination } from '../../hooks/usePagination';
import { exportCSV, exportJSON } from '../../utils/exportCSV';
import { toast } from '../../store/useToastStore';
import TableToolbar from './TableToolbar';
import SortableHeader from './SortableHeader';
import TableEmpty from './TableEmpty';
import { TableSkeleton } from '../common/Skeletons';

export default function DataTable({
  columns,
  rows,
  getRowId = (row) => row.id,
  searchKeys = [],
  searchPlaceholder = 'Search…',
  filterConfig,
  selectable = false,
  bulkActions,
  onRowClick,
  loading = false,
  emptyMessage = 'No records found',
  exportFilename = 'export',
  toolbarExtra,
  initialSortKey = null,
  rowsPerPageOptions = [5, 10, 25, 50],
  initialRowsPerPage = 10,
}) {
  const [selected, setSelected] = useState([]);

  const { filters, setFilter, clearFilters, filtered: filteredByFilters } = useFilter(rows);
  const { query, setQuery, filtered: filteredBySearch } = useSearch(filteredByFilters, searchKeys);
  const { sorted, sortKey, direction, toggleSort } = useSort(filteredBySearch, initialSortKey);
  const { page, rowsPerPage, setPage, setRowsPerPage, paginated, count } = usePagination(sorted, initialRowsPerPage);

  const allVisibleSelected = paginated.length > 0 && paginated.every((row) => selected.includes(getRowId(row)));

  const toggleAll = () => {
    if (allVisibleSelected) {
      setSelected((prev) => prev.filter((id) => !paginated.some((row) => getRowId(row) === id)));
    } else {
      setSelected((prev) => [...new Set([...prev, ...paginated.map(getRowId)])]);
    }
  };

  const toggleRow = (id) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const selectedRows = useMemo(() => rows.filter((r) => selected.includes(getRowId(r))), [rows, selected, getRowId]);

  const handleExport = (format) => {
    const exportColumns = columns.map((c) => ({ label: c.label, accessor: c.accessor || ((row) => row[c.key]) }));
    const target = selected.length > 0 ? selectedRows : sorted;
    if (format === 'csv') exportCSV(target, exportColumns, `${exportFilename}.csv`);
    else exportJSON(target, `${exportFilename}.json`);
    toast.success('Export completed');
  };

  if (loading) return <TableSkeleton rows={6} />;

  return (
    <Card>
      <Box sx={{ p: 2.5, pb: 0 }}>
        <TableToolbar
          search={query}
          onSearchChange={setQuery}
          searchPlaceholder={searchPlaceholder}
          filters={filterConfig}
          filterValues={filters}
          onFilterChange={setFilter}
          onClearFilters={clearFilters}
          selectedCount={selected.length}
          bulkActions={bulkActions?.(selectedRows, () => setSelected([]))}
          onExport={handleExport}
          extraActions={toolbarExtra}
        />
      </Box>
      <TableContainer sx={{ overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              {selectable && (
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={selected.length > 0 && !allVisibleSelected}
                    checked={allVisibleSelected}
                    onChange={toggleAll}
                  />
                </TableCell>
              )}
              {columns.map((col) => (
                <SortableHeader
                  key={col.key}
                  column={col}
                  sortKey={sortKey}
                  direction={direction}
                  onSort={toggleSort}
                  align={col.align}
                />
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginated.length === 0 && <TableEmpty colSpan={columns.length + (selectable ? 1 : 0)} message={emptyMessage} />}
            {paginated.map((row) => {
              const id = getRowId(row);
              return (
                <TableRow
                  key={id}
                  hover
                  selected={selected.includes(id)}
                  onClick={() => onRowClick?.(row)}
                  sx={{ cursor: onRowClick ? 'pointer' : 'default' }}
                >
                  {selectable && (
                    <TableCell padding="checkbox" onClick={(e) => e.stopPropagation()}>
                      <Checkbox checked={selected.includes(id)} onChange={() => toggleRow(id)} />
                    </TableCell>
                  )}
                  {columns.map((col) => (
                    <TableCell key={col.key} align={col.align}>
                      {col.render ? col.render(row) : row[col.key]}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={count}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => setRowsPerPage(Number(e.target.value))}
        rowsPerPageOptions={rowsPerPageOptions}
      />
    </Card>
  );
}
