import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import PageHeader from '../../components/layout/PageHeader';
import DataTable from '../../components/tables/DataTable';
import StatusChip from '../../components/common/StatusChip';
import OrderDetailDrawer from '../../components/orders/OrderDetailDrawer';
import { orderService } from '../../services/orderService';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';
import { toast } from '../../store/useToastStore';

const breadcrumbs = [{ label: 'Ecommerce', path: '/ecommerce/products' }, { label: 'Orders' }];

const columns = [
  { key: 'id', label: 'Order', sortable: true, render: (row) => <Typography variant="body2" fontWeight={700} color="primary.main">#{row.id}</Typography> },
  { key: 'customer', label: 'Customer', sortable: true },
  { key: 'date', label: 'Date', sortable: true, render: (row) => formatDate(row.date) },
  { key: 'amount', label: 'Amount', sortable: true, align: 'right', render: (row) => formatCurrency(row.amount) },
  { key: 'payment', label: 'Payment', sortable: true },
  { key: 'status', label: 'Status', sortable: true, render: (row) => <StatusChip status={row.status} /> },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    orderService.list().then(setOrders);
  }, []);

  const selectedOrder = orders?.find((o) => o.id === id) || null;

  return (
    <>
      <PageHeader title="Orders" breadcrumbs={breadcrumbs} />

      <DataTable
        columns={columns}
        rows={orders || []}
        loading={!orders}
        searchKeys={['id', 'customer', 'email']}
        searchPlaceholder="Search orders…"
        filterConfig={[
          { field: 'status', label: 'Status', options: ['Completed', 'Pending', 'Processing', 'Cancelled'] },
          { field: 'payment', label: 'Payment', options: [...new Set((orders || []).map((o) => o.payment))] },
        ]}
        selectable
        bulkActions={(rows, clear) => [
          { label: 'Export', onClick: () => { toast.success(`${rows.length} orders exported`); clear(); } },
          { label: 'Mark Completed', onClick: () => { toast.success(`${rows.length} orders updated`); clear(); } },
          { label: 'Cancel', destructive: true, onClick: () => { toast.warning(`${rows.length} orders cancelled`); clear(); } },
        ]}
        onRowClick={(row) => navigate(`/ecommerce/orders/${row.id}`)}
        emptyMessage="No orders found"
        exportFilename="orders"
      />

      <OrderDetailDrawer order={selectedOrder} open={Boolean(selectedOrder)} onClose={() => navigate('/ecommerce/orders')} />
    </>
  );
}
