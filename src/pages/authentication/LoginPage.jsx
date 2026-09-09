import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import Stack from '../../components/common/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import AuthLayout from '../../components/layout/AuthLayout';
import { useAuthStore } from '../../store/useAuthStore';
import { validateForm, isRequired, isEmail } from '../../utils/validation';
import { toast } from '../../store/useToastStore';

export default function LoginPage() {
  const [values, setValues] = useState({ email: 'david.dev@sarang.app', password: '' });
  const [errors, setErrors] = useState({});
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(values, {
      email: [isRequired, isEmail],
      password: [isRequired],
    });
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      login(values.email);
      toast.success('Welcome back!');
      navigate('/dashboard/ecommerce');
    }
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to your SARANG admin account">
      <Stack component="form" spacing={2.5} onSubmit={handleSubmit}>
        <TextField
          label="Email Address"
          type="email"
          value={values.email}
          onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
          error={Boolean(errors.email)}
          helperText={errors.email}
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          value={values.password}
          onChange={(e) => setValues((v) => ({ ...v, password: e.target.value }))}
          error={Boolean(errors.password)}
          helperText={errors.password}
          fullWidth
        />
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <FormControlLabel control={<Checkbox size="small" defaultChecked />} label={<Typography variant="body2">Remember me</Typography>} />
          <Link component={RouterLink} to="/auth/forgot-password" variant="body2">Forgot password?</Link>
        </Stack>
        <Button type="submit" variant="contained" size="large" fullWidth>Sign In</Button>
        <Divider><Typography variant="caption" color="text.secondary">or</Typography></Divider>
        <Typography variant="body2" align="center" color="text.secondary">
          Don't have an account? <Link component={RouterLink} to="/auth/register">Create one</Link>
        </Typography>
      </Stack>
    </AuthLayout>
  );
}
