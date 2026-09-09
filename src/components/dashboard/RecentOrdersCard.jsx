import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import StatusChip from '../common/StatusChip';
import { TableSkeleton } from '../common/Skeletons';
import EmptyState from '../common/EmptyState';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';

export default function RecentOrdersCard({ orders, loading }) {
  const navigate = useNavigate();

  if (loading) return <TableSkeleton rows={5} />;

  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader
        title={<Typography variant="h6">Recent Orders</Typography>}
        action={<Button size="small" onClick={() => navigate('/ecommerce/orders')}>View All</Button>}
        sx={{ pb: 0 }}
      />
      <CardContent sx={{ pt: 1 }}>
        {orders.length === 0 ? (
          <EmptyState title="No orders found" />
        ) : (
          <TableContainer sx={{ overflowX: 'auto' }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Order</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow
                    key={order.id}
                    hover
                    onClick={() => navigate(`/ecommerce/orders/${order.id}`)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell>
                      <Typography variant="body2" fontWeight={700} color="primary.main">#{order.id}</Typography>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2">{order.customer}</Typography>
                        <Typography variant="caption" color="text.secondary">{order.email}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">{formatDate(order.date)}</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" fontWeight={700}>{formatCurrency(order.amount)}</Typography>
                    </TableCell>
                    <TableCell><StatusChip status={order.status} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </CardContent>
    </Card>
  );
}
