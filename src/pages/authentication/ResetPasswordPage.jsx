import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Stack from '../../components/common/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AuthLayout from '../../components/layout/AuthLayout';
import { validateForm, isRequired, minLength, matches } from '../../utils/validation';
import { toast } from '../../store/useToastStore';

export default function ResetPasswordPage() {
  const [values, setValues] = useState({ password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(values, {
      password: [isRequired, minLength(6)],
      confirmPassword: [isRequired, matches('password')],
    });
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      toast.success('Password reset successfully');
      navigate('/auth/login');
    }
  };

  return (
    <AuthLayout title="Reset your password" subtitle="Choose a new password for your account">
      <Stack component="form" spacing={2.5} onSubmit={handleSubmit}>
        <TextField label="New Password" type="password" value={values.password} onChange={(e) => setValues((v) => ({ ...v, password: e.target.value }))} error={Boolean(errors.password)} helperText={errors.password} fullWidth />
        <TextField label="Confirm Password" type="password" value={values.confirmPassword} onChange={(e) => setValues((v) => ({ ...v, confirmPassword: e.target.value }))} error={Boolean(errors.confirmPassword)} helperText={errors.confirmPassword} fullWidth />
        <Button type="submit" variant="contained" size="large" fullWidth>Reset Password</Button>
      </Stack>
    </AuthLayout>
  );
}
