import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import PageHeader from '../../components/layout/PageHeader';
import DataTable from '../../components/tables/DataTable';
import StatusChip from '../../components/common/StatusChip';
import { productService } from '../../services/productService';

const breadcrumbs = [{ label: 'Ecommerce', path: '/ecommerce/products' }, { label: 'Inventory' }];
const MAX_STOCK = 100;

const columns = [
  { key: 'name', label: 'Product', sortable: true, render: (row) => <Typography variant="body2" fontWeight={600}>{row.name}</Typography> },
  { key: 'sku', label: 'SKU', sortable: true },
  {
    key: 'quantity',
    label: 'Stock Level',
    sortable: true,
    render: (row) => (
      <Box sx={{ minWidth: 140 }}>
        <LinearProgress
          variant="determinate"
          value={Math.min((row.quantity / MAX_STOCK) * 100, 100)}
          color={row.quantity === 0 ? 'error' : row.quantity < 20 ? 'warning' : 'success'}
          sx={{ mb: 0.5 }}
        />
        <Typography variant="caption" color="text.secondary">{row.quantity} units</Typography>
      </Box>
    ),
  },
  { key: 'status', label: 'Status', sortable: true, render: (row) => <StatusChip status={row.status} /> },
];

export default function InventoryPage() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    productService.list().then(setProducts);
  }, []);

  return (
    <>
      <PageHeader title="Inventory" breadcrumbs={breadcrumbs} />
      <DataTable
        columns={columns}
        rows={products || []}
        loading={!products}
        searchKeys={['name', 'sku']}
        searchPlaceholder="Search inventory…"
        filterConfig={[{ field: 'status', label: 'Status', options: ['In Stock', 'Low Stock', 'Out of Stock'] }]}
        emptyMessage="No inventory records found"
        exportFilename="inventory"
      />
    </>
  );
}
