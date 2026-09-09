import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Stack from '../../components/common/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AuthLayout from '../../components/layout/AuthLayout';
import { useAuthStore } from '../../store/useAuthStore';

export default function LockScreenPage() {
  const [password, setPassword] = useState('');
  const user = useAuthStore((s) => s.user);
  const unlock = useAuthStore((s) => s.unlock);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    unlock();
    navigate('/dashboard/ecommerce');
  };

  return (
    <AuthLayout title="Screen Locked" subtitle="Enter your password to continue">
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <Avatar sx={{ width: 64, height: 64, mx: 'auto', mb: 1.5, bgcolor: user.avatarColor, fontSize: '1.25rem', fontWeight: 700 }}>
          {user.avatarInitials}
        </Avatar>
        <Typography variant="subtitle1">{user.name}</Typography>
        <Typography variant="caption" color="text.secondary">{user.email}</Typography>
      </Box>
      <Stack component="form" spacing={2.5} onSubmit={handleSubmit}>
        <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth autoFocus />
        <Button type="submit" variant="contained" size="large" fullWidth>Unlock</Button>
      </Stack>
    </AuthLayout>
  );
}
