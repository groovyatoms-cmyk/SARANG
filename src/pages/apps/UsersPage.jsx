import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Stack from '../../components/common/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import AddOutlined from '@mui/icons-material/AddOutlined';
import PageHeader from '../../components/layout/PageHeader';
import DataTable from '../../components/tables/DataTable';
import StatusChip from '../../components/common/StatusChip';
import UserDetailDrawer from '../../components/users/UserDetailDrawer';
import { userService } from '../../services/userService';
import { formatRelativeTime } from '../../utils/formatDate';
import { toast } from '../../store/useToastStore';

const breadcrumbs = [{ label: 'Users' }];

const columns = [
  {
    key: 'name',
    label: 'User',
    sortable: true,
    render: (row) => (
      <Stack direction="row" spacing={1.5} alignItems="center">
        <Avatar sx={{ width: 32, height: 32, fontSize: '0.75rem' }}>{row.name.split(' ').map((n) => n[0]).join('')}</Avatar>
        <Typography variant="body2" fontWeight={600}>{row.name}</Typography>
      </Stack>
    ),
  },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'role', label: 'Role', sortable: true, render: (row) => <Chip label={row.role} size="small" variant="outlined" /> },
  { key: 'status', label: 'Status', sortable: true, render: (row) => <StatusChip status={row.status} /> },
  { key: 'lastActive', label: 'Last Active', sortable: true, render: (row) => (row.lastActive ? formatRelativeTime(row.lastActive) : 'Never') },
];

export default function UsersPage() {
  const [users, setUsers] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    userService.list().then(setUsers);
  }, []);

  const selectedUser = users?.find((u) => u.id === id) || null;

  return (
    <>
      <PageHeader
        title="Users"
        breadcrumbs={breadcrumbs}
        actions={
          <Button variant="contained" startIcon={<AddOutlined fontSize="small" />} onClick={() => toast.info('User invitation coming soon')}>
            Invite User
          </Button>
        }
      />
      <DataTable
        columns={columns}
        rows={users || []}
        loading={!users}
        searchKeys={['name', 'email']}
        searchPlaceholder="Search users…"
        filterConfig={[
          { field: 'role', label: 'Role', options: ['Admin', 'Manager', 'Editor', 'Viewer'] },
          { field: 'status', label: 'Status', options: ['Active', 'Invited', 'Suspended'] },
        ]}
        selectable
        bulkActions={(rows, clear) => [
          { label: 'Export', onClick: () => { toast.success(`${rows.length} users exported`); clear(); } },
          { label: 'Suspend', destructive: true, onClick: () => { toast.warning(`${rows.length} users suspended`); clear(); } },
        ]}
        onRowClick={(row) => navigate(`/users/${row.id}`)}
        emptyMessage="No users found"
        exportFilename="users"
      />
      <UserDetailDrawer user={selectedUser} open={Boolean(selectedUser)} onClose={() => navigate('/users')} />
    </>
  );
}
