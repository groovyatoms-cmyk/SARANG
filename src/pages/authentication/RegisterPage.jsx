import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import Stack from '../../components/common/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import AuthLayout from '../../components/layout/AuthLayout';
import { useAuthStore } from '../../store/useAuthStore';
import { validateForm, isRequired, isEmail, minLength, matches } from '../../utils/validation';
import { toast } from '../../store/useToastStore';

export default function RegisterPage() {
  const [values, setValues] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(values, {
      name: [isRequired],
      email: [isRequired, isEmail],
      password: [isRequired, minLength(6)],
      confirmPassword: [isRequired, matches('password')],
    });
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      login(values.email);
      toast.success('Account created successfully');
      navigate('/dashboard/ecommerce');
    }
  };

  return (
    <AuthLayout title="Create your account" subtitle="Start managing your store with SARANG">
      <Stack component="form" spacing={2.5} onSubmit={handleSubmit}>
        <TextField label="Full Name" value={values.name} onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))} error={Boolean(errors.name)} helperText={errors.name} fullWidth />
        <TextField label="Email Address" type="email" value={values.email} onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))} error={Boolean(errors.email)} helperText={errors.email} fullWidth />
        <TextField label="Password" type="password" value={values.password} onChange={(e) => setValues((v) => ({ ...v, password: e.target.value }))} error={Boolean(errors.password)} helperText={errors.password} fullWidth />
        <TextField label="Confirm Password" type="password" value={values.confirmPassword} onChange={(e) => setValues((v) => ({ ...v, confirmPassword: e.target.value }))} error={Boolean(errors.confirmPassword)} helperText={errors.confirmPassword} fullWidth />
        <Button type="submit" variant="contained" size="large" fullWidth>Create Account</Button>
        <Typography variant="body2" align="center" color="text.secondary">
          Already have an account? <Link component={RouterLink} to="/auth/login">Sign in</Link>
        </Typography>
      </Stack>
    </AuthLayout>
  );
}
