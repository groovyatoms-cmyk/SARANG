import { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '../../components/common/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PageHeader from '../../components/layout/PageHeader';
import DataTable from '../../components/tables/DataTable';
import StatusChip from '../../components/common/StatusChip';
import { customerService } from '../../services/customerService';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';

const breadcrumbs = [{ label: 'Ecommerce', path: '/ecommerce/products' }, { label: 'Customers' }];

const columns = [
  {
    key: 'name',
    label: 'Customer',
    sortable: true,
    render: (row) => (
      <Stack direction="row" spacing={1.5} alignItems="center">
        <Avatar sx={{ width: 32, height: 32, fontSize: '0.75rem' }}>{row.name.split(' ').map((n) => n[0]).join('')}</Avatar>
        <Box>
          <Typography variant="body2" fontWeight={600}>{row.name}</Typography>
          <Typography variant="caption" color="text.secondary">{row.email}</Typography>
        </Box>
      </Stack>
    ),
  },
  { key: 'phone', label: 'Phone', sortable: false },
  { key: 'orders', label: 'Orders', sortable: true, align: 'right' },
  { key: 'totalSpent', label: 'Total Spent', sortable: true, align: 'right', render: (row) => formatCurrency(row.totalSpent) },
  { key: 'joined', label: 'Joined', sortable: true, render: (row) => formatDate(row.joined) },
  { key: 'status', label: 'Status', sortable: true, render: (row) => <StatusChip status={row.status} /> },
];

export default function CustomersPage() {
  const [customers, setCustomers] = useState(null);

  useEffect(() => {
    customerService.list().then(setCustomers);
  }, []);

  return (
    <>
      <PageHeader title="Customers" breadcrumbs={breadcrumbs} />
      <DataTable
        columns={columns}
        rows={customers || []}
        loading={!customers}
        searchKeys={['name', 'email']}
        searchPlaceholder="Search customers…"
        filterConfig={[{ field: 'status', label: 'Status', options: ['Active', 'VIP', 'Inactive'] }]}
        selectable
        bulkActions={(rows, clear) => [{ label: 'Export', onClick: clear }]}
        emptyMessage="No customers found"
        exportFilename="customers"
      />
    </>
  );
}
