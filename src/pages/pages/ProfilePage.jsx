import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Stack from '../../components/common/Stack';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import PageHeader from '../../components/layout/PageHeader';
import { useAuthStore } from '../../store/useAuthStore';
import { toast } from '../../store/useToastStore';

const breadcrumbs = [{ label: 'Pages' }, { label: 'Profile' }];

export default function ProfilePage() {
  const user = useAuthStore((s) => s.user);
  const [tab, setTab] = useState('overview');
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  return (
    <>
      <PageHeader title="Profile" breadcrumbs={breadcrumbs} />
      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <Avatar sx={{ width: 88, height: 88, mx: 'auto', mb: 2, bgcolor: user.avatarColor, fontSize: '1.75rem', fontWeight: 700 }}>
                {user.avatarInitials}
              </Avatar>
              <Typography variant="h6">{user.name}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>{user.role}</Typography>
              <Chip label="Admin Head" size="small" color="primary" variant="outlined" />
              <Divider sx={{ my: 3 }} />
              <Stack spacing={1.5} sx={{ textAlign: 'left' }}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="caption" color="text.secondary">Email</Typography>
                  <Typography variant="caption" fontWeight={600}>{user.email}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="caption" color="text.secondary">Member Since</Typography>
                  <Typography variant="caption" fontWeight={600}>Jan 2023</Typography>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card>
            <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ px: 2.5, pt: 1.5 }}>
              <Tab value="overview" label="Overview" />
              <Tab value="security" label="Security" />
            </Tabs>
            <Divider />
            <CardContent>
              {tab === 'overview' && (
                <Stack spacing={2.5} sx={{ maxWidth: 440 }}>
                  <TextField label="Full Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
                  <TextField label="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
                  <TextField label="Role" value={user.role} fullWidth disabled />
                  <Button variant="contained" sx={{ alignSelf: 'flex-start' }} onClick={() => toast.success('Profile updated')}>
                    Save Changes
                  </Button>
                </Stack>
              )}
              {tab === 'security' && (
                <Stack spacing={2.5} sx={{ maxWidth: 440 }}>
                  <TextField label="Current Password" type="password" fullWidth />
                  <TextField label="New Password" type="password" fullWidth />
                  <TextField label="Confirm New Password" type="password" fullWidth />
                  <Button variant="contained" sx={{ alignSelf: 'flex-start' }} onClick={() => toast.success('Password updated')}>
                    Update Password
                  </Button>
                </Stack>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
