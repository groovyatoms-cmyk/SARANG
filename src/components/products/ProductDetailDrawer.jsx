import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Stack from '../common/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import CloseOutlined from '@mui/icons-material/CloseOutlined';
import EditOutlined from '@mui/icons-material/EditOutlined';
import ContentCopyOutlined from '@mui/icons-material/ContentCopyOutlined';
import ArchiveOutlined from '@mui/icons-material/ArchiveOutlined';
import DeleteOutlined from '@mui/icons-material/DeleteOutlined';
import StatusChip from '../common/StatusChip';
import { SARANG_LAYOUT } from '../../theme/dimensions';
import { formatCurrency } from '../../utils/formatCurrency';
import { toast } from '../../store/useToastStore';

function Field({ label, value }) {
  return (
    <Box>
      <Typography variant="caption" color="text.secondary">{label}</Typography>
      <Typography variant="body2" fontWeight={600}>{value}</Typography>
    </Box>
  );
}

export default function ProductDetailDrawer({ product, open, onClose, onDelete }) {
  if (!product) return null;

  return (
    <Drawer anchor="right" open={open} onClose={onClose} slotProps={{ paper: { sx: { width: { xs: '100%', sm: SARANG_LAYOUT.drawerWidthSm } } } }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 2.5, py: 2 }}>
        <Typography variant="subtitle1">Product Details</Typography>
        <IconButton size="small" onClick={onClose} aria-label="Close"><CloseOutlined fontSize="small" /></IconButton>
      </Stack>
      <Divider />
      <Box sx={{ p: 2.5, overflowY: 'auto' }}>
        <Stack alignItems="center" spacing={1.5} sx={{ mb: 3 }}>
          <Box sx={{ width: 88, height: 88, borderRadius: 3, bgcolor: 'action.hover', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem' }}>
            {product.image}
          </Box>
          <Typography variant="h6" align="center">{product.name}</Typography>
          <StatusChip status={product.status} />
        </Stack>

        <Grid container spacing={2.5}>
          <Grid size={6}><Field label="SKU" value={product.sku} /></Grid>
          <Grid size={6}><Field label="Vendor" value={product.vendor} /></Grid>
          <Grid size={6}><Field label="Category" value={product.category} /></Grid>
          <Grid size={6}><Field label="Price" value={formatCurrency(product.price)} /></Grid>
          <Grid size={6}><Field label="Stock" value={product.quantity} /></Grid>
          <Grid size={6}><Field label="Sales" value={product.sales} /></Grid>
          <Grid size={12}><Field label="Revenue" value={formatCurrency(product.amount)} /></Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Stack direction="row" spacing={1.5} flexWrap="wrap" rowGap={1}>
          <Button size="small" variant="contained" startIcon={<EditOutlined fontSize="small" />} onClick={() => toast.success('Product saved')}>
            Edit
          </Button>
          <Button size="small" variant="outlined" startIcon={<ContentCopyOutlined fontSize="small" />} onClick={() => toast.info('Product duplicated')}>
            Duplicate
          </Button>
          <Button size="small" variant="outlined" startIcon={<ArchiveOutlined fontSize="small" />} onClick={() => toast.info('Product archived')}>
            Archive
          </Button>
          <Button size="small" variant="outlined" color="error" startIcon={<DeleteOutlined fontSize="small" />} onClick={() => onDelete?.(product)}>
            Delete
          </Button>
        </Stack>
      </Box>
    </Drawer>
  );
}
