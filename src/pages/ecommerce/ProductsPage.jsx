import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '../../components/common/Stack';
import AddOutlined from '@mui/icons-material/AddOutlined';
import PageHeader from '../../components/layout/PageHeader';
import DataTable from '../../components/tables/DataTable';
import StatusChip from '../../components/common/StatusChip';
import ProductDetailDrawer from '../../components/products/ProductDetailDrawer';
import ImportDialog from '../../components/dialogs/ImportDialog';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import { productService } from '../../services/productService';
import { formatCurrency } from '../../utils/formatCurrency';
import { toast } from '../../store/useToastStore';

const breadcrumbs = [{ label: 'Ecommerce', path: '/ecommerce/products' }, { label: 'Products' }];

const columns = [
  {
    key: 'name',
    label: 'Product',
    sortable: true,
    render: (row) => (
      <Stack direction="row" spacing={1.5} alignItems="center">
        <Box sx={{ width: 36, height: 36, borderRadius: 1.5, bgcolor: 'action.hover', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>
          {row.image}
        </Box>
        <Box>
          <Typography variant="body2" fontWeight={600}>{row.name}</Typography>
          <Typography variant="caption" color="text.secondary">{row.sku}</Typography>
        </Box>
      </Stack>
    ),
  },
  { key: 'vendor', label: 'Vendor', sortable: true },
  { key: 'price', label: 'Price', sortable: true, align: 'right', render: (row) => formatCurrency(row.price) },
  { key: 'quantity', label: 'Qty', sortable: true, align: 'right' },
  { key: 'amount', label: 'Amount', sortable: true, align: 'right', render: (row) => formatCurrency(row.amount) },
  { key: 'status', label: 'Status', sortable: true, render: (row) => <StatusChip status={row.status} /> },
];

export default function ProductsPage() {
  const [products, setProducts] = useState(null);
  const [importOpen, setImportOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    productService.list().then(setProducts);
  }, []);

  const selectedProduct = products?.find((p) => p.id === id) || null;

  const handleDelete = () => {
    setProducts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
    setDeleteTarget(null);
    navigate('/ecommerce/products');
    toast.success('Product deleted');
  };

  return (
    <>
      <PageHeader
        title="Products"
        breadcrumbs={breadcrumbs}
        actions={
          <Button variant="contained" startIcon={<AddOutlined fontSize="small" />} onClick={() => toast.info('Product creation coming soon')}>
            Add Product
          </Button>
        }
      />

      <DataTable
        columns={columns}
        rows={products || []}
        loading={!products}
        searchKeys={['name', 'sku', 'vendor']}
        searchPlaceholder="Search products…"
        filterConfig={[
          { field: 'status', label: 'Status', options: ['In Stock', 'Low Stock', 'Out of Stock'] },
          { field: 'category', label: 'Category', options: [...new Set((products || []).map((p) => p.category))] },
        ]}
        selectable
        bulkActions={(rows, clear) => [
          { label: 'Export', onClick: () => { toast.success(`${rows.length} products exported`); clear(); } },
          { label: 'Archive', onClick: () => { toast.info(`${rows.length} products archived`); clear(); } },
          { label: 'Delete', destructive: true, onClick: () => { toast.success(`${rows.length} products deleted`); clear(); } },
        ]}
        onRowClick={(row) => navigate(`/ecommerce/products/${row.id}`)}
        emptyMessage="No products found"
        exportFilename="products"
        toolbarExtra={
          <Button size="small" variant="outlined" onClick={() => setImportOpen(true)}>Import</Button>
        }
      />

      <ProductDetailDrawer
        product={selectedProduct}
        open={Boolean(selectedProduct)}
        onClose={() => navigate('/ecommerce/products')}
        onDelete={setDeleteTarget}
      />

      <ImportDialog open={importOpen} onClose={() => setImportOpen(false)} />

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete product?"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        destructive
        onConfirm={handleDelete}
        onClose={() => setDeleteTarget(null)}
      />
    </>
  );
}
