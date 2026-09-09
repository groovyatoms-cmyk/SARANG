import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Stack from '../../components/common/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import ArrowBackOutlined from '@mui/icons-material/ArrowBackOutlined';
import AuthLayout from '../../components/layout/AuthLayout';
import { validateForm, isRequired, isEmail } from '../../utils/validation';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm({ email }, { email: [isRequired, isEmail] });
    setError(errors.email || '');
    if (!errors.email) setSent(true);
  };

  return (
    <AuthLayout title="Forgot password?" subtitle="Enter your email and we'll send you a reset link">
      {sent ? (
        <Alert severity="success">A password reset link has been sent to {email}.</Alert>
      ) : (
        <Stack component="form" spacing={2.5} onSubmit={handleSubmit}>
          <TextField label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={Boolean(error)} helperText={error} fullWidth />
          <Button type="submit" variant="contained" size="large" fullWidth>Send Reset Link</Button>
        </Stack>
      )}
      <Typography variant="body2" sx={{ mt: 3 }} align="center">
        <Link component={RouterLink} to="/auth/login" sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}>
          <ArrowBackOutlined sx={{ fontSize: 16 }} /> Back to Sign In
        </Link>
      </Typography>
    </AuthLayout>
  );
}
