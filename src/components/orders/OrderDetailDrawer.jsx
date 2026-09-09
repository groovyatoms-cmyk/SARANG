import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Stack from '../common/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CloseOutlined from '@mui/icons-material/CloseOutlined';
import EditOutlined from '@mui/icons-material/EditOutlined';
import PrintOutlined from '@mui/icons-material/PrintOutlined';
import FileDownloadOutlined from '@mui/icons-material/FileDownloadOutlined';
import ReplayOutlined from '@mui/icons-material/ReplayOutlined';
import CancelOutlined from '@mui/icons-material/CancelOutlined';
import CheckCircleOutlined from '@mui/icons-material/CheckCircleOutlined';
import LocalShippingOutlined from '@mui/icons-material/LocalShippingOutlined';
import StatusChip from '../common/StatusChip';
import { SARANG_LAYOUT } from '../../theme/dimensions';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';
import { toast } from '../../store/useToastStore';

function Field({ label, value }) {
  return (
    <Box>
      <Typography variant="caption" color="text.secondary">{label}</Typography>
      <Typography variant="body2" fontWeight={600}>{value}</Typography>
    </Box>
  );
}

const timelineSteps = [
  { label: 'Order Placed', icon: CheckCircleOutlined },
  { label: 'Payment Confirmed', icon: CheckCircleOutlined },
  { label: 'Shipped', icon: LocalShippingOutlined },
  { label: 'Delivered', icon: CheckCircleOutlined },
];

export default function OrderDetailDrawer({ order, open, onClose }) {
  if (!order) return null;

  const subtotal = order.items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = subtotal * 0.08;
  const shipping = subtotal > 500 ? 0 : 15;
  const discount = 0;
  const total = subtotal + tax + shipping - discount;

  const activeStep = order.status === 'Completed' ? 4 : order.status === 'Processing' ? 2 : order.status === 'Cancelled' ? 0 : 1;

  return (
    <Drawer anchor="right" open={open} onClose={onClose} slotProps={{ paper: { sx: { width: { xs: '100%', sm: SARANG_LAYOUT.drawerWidthMd } } } }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 2.5, py: 2 }}>
        <Box>
          <Typography variant="subtitle1">Order #{order.id}</Typography>
          <Typography variant="caption" color="text.secondary">{formatDate(order.date, 'dd MMM yyyy')}</Typography>
        </Box>
        <IconButton size="small" onClick={onClose} aria-label="Close"><CloseOutlined fontSize="small" /></IconButton>
      </Stack>
      <Divider />
      <Box sx={{ p: 2.5, overflowY: 'auto' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Field label="Customer" value={`${order.customer} · ${order.email}`} />
          <StatusChip status={order.status} />
        </Stack>

        {order.status !== 'Cancelled' && (
          <Stack direction="row" sx={{ mb: 3 }}>
            {timelineSteps.map((step, i) => {
              const done = i < activeStep;
              const StepIcon = step.icon;
              return (
                <Box key={step.label} sx={{ flex: 1, textAlign: 'center', position: 'relative' }}>
                  {i > 0 && (
                    <Box sx={{ position: 'absolute', top: 13, left: '-50%', width: '100%', height: 2, bgcolor: i <= activeStep ? 'primary.main' : 'divider', zIndex: 0 }} />
                  )}
                  <StepIcon
                    sx={{
                      fontSize: 26,
                      position: 'relative',
                      zIndex: 1,
                      color: done ? 'primary.main' : 'action.disabled',
                      bgcolor: 'background.paper',
                      borderRadius: '50%',
                    }}
                  />
                  <Typography variant="caption" sx={{ display: 'block', mt: 0.5 }} color={done ? 'text.primary' : 'text.secondary'}>
                    {step.label}
                  </Typography>
                </Box>
              );
            })}
          </Stack>
        )}

        <Typography variant="subtitle2" sx={{ mb: 1 }}>Items</Typography>
        <Table size="small" sx={{ mb: 2 }}>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="center">Qty</TableCell>
              <TableCell align="right">Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order.items.map((item) => (
              <TableRow key={item.name}>
                <TableCell>{item.name}</TableCell>
                <TableCell align="center">{item.qty}</TableCell>
                <TableCell align="right">{formatCurrency(item.price)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Stack spacing={0.75} sx={{ mb: 3 }}>
          <Stack direction="row" justifyContent="space-between"><Typography variant="body2" color="text.secondary">Subtotal</Typography><Typography variant="body2">{formatCurrency(subtotal)}</Typography></Stack>
          <Stack direction="row" justifyContent="space-between"><Typography variant="body2" color="text.secondary">Tax</Typography><Typography variant="body2">{formatCurrency(tax)}</Typography></Stack>
          <Stack direction="row" justifyContent="space-between"><Typography variant="body2" color="text.secondary">Shipping</Typography><Typography variant="body2">{shipping === 0 ? 'Free' : formatCurrency(shipping)}</Typography></Stack>
          <Stack direction="row" justifyContent="space-between"><Typography variant="body2" color="text.secondary">Discount</Typography><Typography variant="body2">-{formatCurrency(discount)}</Typography></Stack>
          <Divider sx={{ my: 0.5 }} />
          <Stack direction="row" justifyContent="space-between"><Typography variant="subtitle2">Total</Typography><Typography variant="subtitle2">{formatCurrency(total)}</Typography></Stack>
        </Stack>

        <Grid container spacing={2.5} sx={{ mb: 3 }}>
          <Grid size={6}><Field label="Payment Method" value={order.payment} /></Grid>
          <Grid size={6}><Field label="Payment Status" value={order.status === 'Cancelled' ? 'Refunded' : 'Paid'} /></Grid>
          <Grid size={12}><Field label="Shipping Address" value="4471 Maple Street, Austin, TX 78701" /></Grid>
          <Grid size={12}><Field label="Billing Address" value="Same as shipping address" /></Grid>
        </Grid>

        <Divider sx={{ mb: 2.5 }} />
        <Stack direction="row" spacing={1.5} flexWrap="wrap" rowGap={1}>
          <Button size="small" variant="contained" startIcon={<EditOutlined fontSize="small" />} onClick={() => toast.success('Order updated')}>Edit</Button>
          <Button size="small" variant="outlined" startIcon={<PrintOutlined fontSize="small" />} onClick={() => window.print()}>Print</Button>
          <Button size="small" variant="outlined" startIcon={<FileDownloadOutlined fontSize="small" />} onClick={() => toast.success('Export completed')}>Export</Button>
          <Button size="small" variant="outlined" color="warning" startIcon={<ReplayOutlined fontSize="small" />} onClick={() => toast.info('Refund initiated')}>Refund</Button>
          <Button size="small" variant="outlined" color="error" startIcon={<CancelOutlined fontSize="small" />} onClick={() => toast.warning('Order cancelled')}>Cancel</Button>
        </Stack>
      </Box>
    </Drawer>
  );
}
