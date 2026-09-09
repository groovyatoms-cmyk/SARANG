import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';

export default function SortableHeader({ column, sortKey, direction, onSort, align = 'left' }) {
  if (!column.sortable) {
    return <TableCell align={align}>{column.label}</TableCell>;
  }
  return (
    <TableCell align={align} sortDirection={sortKey === column.key ? direction : false}>
      <TableSortLabel
        active={sortKey === column.key}
        direction={sortKey === column.key ? direction : 'asc'}
        onClick={() => onSort(column.key)}
      >
        {column.label}
      </TableSortLabel>
    </TableCell>
  );
}
