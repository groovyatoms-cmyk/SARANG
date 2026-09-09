import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import StatusChip from '../common/StatusChip';
import { ListSkeleton } from '../common/Skeletons';
import EmptyState from '../common/EmptyState';
import { formatCurrency } from '../../utils/formatCurrency';

export default function TopSellingProductsCard({ products, loading }) {
  const navigate = useNavigate();

  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader
        title={<Typography variant="h6">Top Selling Products</Typography>}
        action={<Button size="small" onClick={() => navigate('/ecommerce/products')}>View All</Button>}
        sx={{ pb: 0 }}
      />
      <CardContent sx={{ pt: 1.5 }}>
        {loading && <ListSkeleton rows={5} />}
        {!loading && products.length === 0 && <EmptyState title="No products found" />}
        {!loading && products.length > 0 && (
          <List disablePadding>
            {products.map((p) => (
              <ListItemButton
                key={p.id}
                onClick={() => navigate(`/ecommerce/products/${p.id}`)}
                sx={{ borderRadius: 2, px: 1, py: 1 }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    bgcolor: 'action.hover',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.25rem',
                    mr: 1.5,
                    flexShrink: 0,
                  }}
                >
                  {p.image}
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="body2" fontWeight={600} noWrap>{p.name}</Typography>
                  <Typography variant="caption" color="text.secondary">{p.vendor} · Qty {p.quantity}</Typography>
                </Box>
                <Box sx={{ textAlign: 'right', flexShrink: 0, ml: 1 }}>
                  <Typography variant="body2" fontWeight={700}>{formatCurrency(p.amount, { compact: true })}</Typography>
                  <StatusChip status={p.status} />
                </Box>
              </ListItemButton>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
}
