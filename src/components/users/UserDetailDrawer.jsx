import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Stack from '../common/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import CloseOutlined from '@mui/icons-material/CloseOutlined';
import CheckCircleOutlined from '@mui/icons-material/CheckCircleOutlined';
import CancelOutlined from '@mui/icons-material/CancelOutlined';
import StatusChip from '../common/StatusChip';
import { SARANG_LAYOUT } from '../../theme/dimensions';
import { permissionsMatrix } from '../../data/users';
import { formatRelativeTime } from '../../utils/formatDate';

const allPermissions = ['view', 'create', 'edit', 'delete', 'export', 'import'];

export default function UserDetailDrawer({ user, open, onClose }) {
  if (!user) return null;
  const granted = permissionsMatrix[user.role] || [];

  return (
    <Drawer anchor="right" open={open} onClose={onClose} slotProps={{ paper: { sx: { width: { xs: '100%', sm: SARANG_LAYOUT.drawerWidthSm } } } }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 2.5, py: 2 }}>
        <Typography variant="subtitle1">User Details</Typography>
        <IconButton size="small" onClick={onClose} aria-label="Close"><CloseOutlined fontSize="small" /></IconButton>
      </Stack>
      <Divider />
      <Box sx={{ p: 2.5 }}>
        <Stack alignItems="center" spacing={1.5} sx={{ mb: 3 }}>
          <Avatar sx={{ width: 72, height: 72, fontSize: '1.5rem', fontWeight: 700 }}>
            {user.name.split(' ').map((n) => n[0]).join('')}
          </Avatar>
          <Typography variant="h6">{user.name}</Typography>
          <Typography variant="body2" color="text.secondary">{user.email}</Typography>
          <Stack direction="row" spacing={1}>
            <Chip label={user.role} size="small" color="primary" variant="outlined" />
            <StatusChip status={user.status} />
          </Stack>
        </Stack>

        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
          Last active {user.lastActive ? formatRelativeTime(user.lastActive) : 'Never'}
        </Typography>

        <Divider sx={{ mb: 2 }} />
        <Typography variant="subtitle2" sx={{ mb: 1.5 }}>Permissions</Typography>
        <Stack spacing={1}>
          {allPermissions.map((perm) => {
            const has = granted.includes(perm);
            return (
              <Stack key={perm} direction="row" alignItems="center" spacing={1}>
                {has ? <CheckCircleOutlined fontSize="small" color="success" /> : <CancelOutlined fontSize="small" color="disabled" />}
                <Typography variant="body2" sx={{ textTransform: 'capitalize' }} color={has ? 'text.primary' : 'text.disabled'}>
                  {perm}
                </Typography>
              </Stack>
            );
          })}
        </Stack>
      </Box>
    </Drawer>
  );
}
