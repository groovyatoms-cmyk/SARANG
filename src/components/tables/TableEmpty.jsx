import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import EmptyState from '../common/EmptyState';

export default function TableEmpty({ colSpan, message = 'No records found' }) {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} sx={{ border: 'none' }}>
        <EmptyState title={message} />
      </TableCell>
    </TableRow>
  );
}
