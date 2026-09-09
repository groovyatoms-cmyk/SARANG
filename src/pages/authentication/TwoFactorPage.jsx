import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Stack from '../../components/common/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import AuthLayout from '../../components/layout/AuthLayout';
import { useAuthStore } from '../../store/useAuthStore';
import { toast } from '../../store/useToastStore';

export default function TwoFactorPage() {
  const [code, setCode] = useState('');
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code.trim().length === 6) {
      login();
      toast.success('Verification successful');
      navigate('/dashboard/ecommerce');
    } else {
      toast.error('Enter the 6-digit code sent to your device');
    }
  };

  return (
    <AuthLayout title="Two-Factor Authentication" subtitle="Enter the 6-digit code from your authenticator app">
      <Stack component="form" spacing={2.5} onSubmit={handleSubmit}>
        <TextField
          label="Verification Code"
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
          fullWidth
          autoFocus
          slotProps={{ htmlInput: { maxLength: 6, style: { letterSpacing: 6, fontWeight: 700, textAlign: 'center' } } }}
        />
        <Button type="submit" variant="contained" size="large" fullWidth>Verify</Button>
        <Typography variant="body2" align="center" color="text.secondary">
          Didn't get a code? <Link component="button" type="button" onClick={() => toast.info('A new code has been sent')}>Resend</Link>
        </Typography>
      </Stack>
    </AuthLayout>
  );
}
