import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import Stack from '../common/Stack';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import NotificationsOutlined from '@mui/icons-material/NotificationsOutlined';
import CheckCircleOutlined from '@mui/icons-material/CheckCircleOutlined';
import WarningAmberOutlined from '@mui/icons-material/WarningAmberOutlined';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import ErrorOutlineOutlined from '@mui/icons-material/ErrorOutlineOutlined';
import CloseOutlined from '@mui/icons-material/CloseOutlined';
import { useNotifications } from '../../hooks/useNotifications';
import { formatRelativeTime } from '../../utils/formatDate';
import EmptyState from '../common/EmptyState';

const typeIcon = {
  success: { Icon: CheckCircleOutlined, color: 'success.main' },
  warning: { Icon: WarningAmberOutlined, color: 'warning.main' },
  error: { Icon: ErrorOutlineOutlined, color: 'error.main' },
  info: { Icon: InfoOutlined, color: 'info.main' },
};

export default function NotificationCenter() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [tab, setTab] = useState('all');
  const { notifications, unreadCount, markRead, markAllRead, remove } = useNotifications();
  const navigate = useNavigate();

  const open = Boolean(anchorEl);
  const filtered = tab === 'unread' ? notifications.filter((n) => !n.read) : notifications;

  const handleOpen = (item) => {
    markRead(item.id);
    if (item.action) {
      navigate(item.action);
      setAnchorEl(null);
    }
  };

  return (
    <>
      <Tooltip title="Notifications">
        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} aria-label="Notifications">
          <Badge badgeContent={unreadCount} color="error">
            <NotificationsOutlined fontSize="small" />
          </Badge>
        </IconButton>
      </Tooltip>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{ paper: { sx: { width: 380, mt: 1 } } }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 2, pt: 2 }}>
          <Typography variant="subtitle1">Notifications</Typography>
          <Button size="small" onClick={markAllRead} disabled={unreadCount === 0}>Mark all read</Button>
        </Stack>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ px: 2, mt: 0.5 }}>
          <Tab value="all" label="All" />
          <Tab value="unread" label={`Unread (${unreadCount})`} />
        </Tabs>
        <Box sx={{ maxHeight: 360, overflowY: 'auto', py: 1 }}>
          {filtered.length === 0 && <EmptyState title="No notifications" message="You're all caught up." />}
          {filtered.map((n) => {
            const { Icon, color } = typeIcon[n.type] || typeIcon.info;
            return (
              <Stack
                key={n.id}
                direction="row"
                spacing={1.5}
                onClick={() => handleOpen(n)}
                sx={{
                  px: 2,
                  py: 1.25,
                  cursor: 'pointer',
                  bgcolor: n.read ? 'transparent' : 'action.hover',
                  '&:hover': { bgcolor: 'action.selected' },
                }}
              >
                <Icon sx={{ color, mt: 0.25 }} fontSize="small" />
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="body2" fontWeight={600} noWrap>{n.title}</Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>{n.message}</Typography>
                  <Typography variant="caption" color="text.disabled">{formatRelativeTime(n.timestamp)}</Typography>
                </Box>
                <IconButton size="small" onClick={(e) => { e.stopPropagation(); remove(n.id); }} aria-label="Dismiss">
                  <CloseOutlined sx={{ fontSize: 14 }} />
                </IconButton>
              </Stack>
            );
          })}
        </Box>
      </Popover>
    </>
  );
}
