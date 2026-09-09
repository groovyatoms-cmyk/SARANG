import { useState } from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Stack from '../../components/common/Stack';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CheckCircleOutlined from '@mui/icons-material/CheckCircleOutlined';
import WarningAmberOutlined from '@mui/icons-material/WarningAmberOutlined';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import ErrorOutlineOutlined from '@mui/icons-material/ErrorOutlineOutlined';
import CloseOutlined from '@mui/icons-material/CloseOutlined';
import PageHeader from '../../components/layout/PageHeader';
import EmptyState from '../../components/common/EmptyState';
import { useNotifications } from '../../hooks/useNotifications';
import { formatRelativeTime } from '../../utils/formatDate';

const breadcrumbs = [{ label: 'Pages' }, { label: 'Notifications' }];

const typeIcon = {
  success: { Icon: CheckCircleOutlined, color: 'success.main' },
  warning: { Icon: WarningAmberOutlined, color: 'warning.main' },
  error: { Icon: ErrorOutlineOutlined, color: 'error.main' },
  info: { Icon: InfoOutlined, color: 'info.main' },
};

export default function NotificationsPage() {
  const [tab, setTab] = useState('all');
  const { notifications, unreadCount, markRead, markAllRead, remove } = useNotifications();

  const filtered = tab === 'all' ? notifications : notifications.filter((n) => n.type === tab);

  return (
    <>
      <PageHeader
        title="Notifications"
        breadcrumbs={breadcrumbs}
        actions={<Button variant="outlined" onClick={markAllRead} disabled={unreadCount === 0}>Mark all as read</Button>}
      />
      <Card>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ px: 2.5, pt: 1 }}>
          <Tab value="all" label={`All (${notifications.length})`} />
          <Tab value="success" label="Success" />
          <Tab value="warning" label="Warning" />
          <Tab value="error" label="Error" />
          <Tab value="info" label="Info" />
        </Tabs>
        <Box sx={{ p: 1 }}>
          {filtered.length === 0 && <EmptyState title="No notifications" message="You're all caught up." />}
          {filtered.map((n) => {
            const { Icon, color } = typeIcon[n.type] || typeIcon.info;
            return (
              <Stack
                key={n.id}
                direction="row"
                spacing={2}
                onClick={() => markRead(n.id)}
                sx={{ p: 2, borderRadius: 2, cursor: 'pointer', bgcolor: n.read ? 'transparent' : 'action.hover', '&:hover': { bgcolor: 'action.selected' } }}
              >
                <Icon sx={{ color }} />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" fontWeight={600}>{n.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{n.message}</Typography>
                  <Typography variant="caption" color="text.disabled">{formatRelativeTime(n.timestamp)}</Typography>
                </Box>
                <IconButton size="small" onClick={(e) => { e.stopPropagation(); remove(n.id); }} aria-label="Dismiss">
                  <CloseOutlined fontSize="small" />
                </IconButton>
              </Stack>
            );
          })}
        </Box>
      </Card>
    </>
  );
}
