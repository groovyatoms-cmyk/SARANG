import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import PersonOutlined from '@mui/icons-material/PersonOutlined';
import NotificationsOutlined from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlined from '@mui/icons-material/SettingsOutlined';
import SupportAgentOutlined from '@mui/icons-material/SupportAgentOutlined';
import LockClockOutlined from '@mui/icons-material/LockClockOutlined';
import LogoutOutlined from '@mui/icons-material/LogoutOutlined';
import { useAuthStore } from '../../store/useAuthStore';

export default function UserMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const user = useAuthStore((s) => s.user);
  const lock = useAuthStore((s) => s.lock);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const go = (path) => {
    setAnchorEl(null);
    navigate(path);
  };

  return (
    <>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} aria-label="Account menu" sx={{ ml: 0.5 }}>
        <Avatar sx={{ width: 32, height: 32, bgcolor: user.avatarColor, fontSize: '0.8125rem', fontWeight: 700 }}>
          {user.avatarInitials}
        </Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{ paper: { sx: { width: 260, mt: 1 } } }}
      >
        <Box sx={{ px: 2, py: 1.5 }}>
          <Typography variant="body2" fontWeight={700}>Welcome back 👋!</Typography>
          <Typography variant="caption" color="text.secondary">{user.name} · {user.role}</Typography>
        </Box>
        <Divider />
        <MenuItem onClick={() => go('/pages/profile')}>
          <ListItemIcon><PersonOutlined fontSize="small" /></ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={() => go('/pages/notifications')}>
          <ListItemIcon><NotificationsOutlined fontSize="small" /></ListItemIcon>
          Notifications
        </MenuItem>
        <MenuItem onClick={() => go('/pages/settings')}>
          <ListItemIcon><SettingsOutlined fontSize="small" /></ListItemIcon>
          Account Settings
        </MenuItem>
        <MenuItem onClick={() => go('/pages/support')}>
          <ListItemIcon><SupportAgentOutlined fontSize="small" /></ListItemIcon>
          Support Center
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => { setAnchorEl(null); lock(); navigate('/auth/lock-screen'); }}>
          <ListItemIcon><LockClockOutlined fontSize="small" /></ListItemIcon>
          Lock Screen
        </MenuItem>
        <MenuItem onClick={() => { setAnchorEl(null); logout(); navigate('/auth/login'); }} sx={{ color: 'error.main' }}>
          <ListItemIcon><LogoutOutlined fontSize="small" color="error" /></ListItemIcon>
          Log Out
        </MenuItem>
      </Menu>
    </>
  );
}
