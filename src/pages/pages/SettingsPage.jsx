import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '../../components/common/Stack';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import PageHeader from '../../components/layout/PageHeader';
import { toast } from '../../store/useToastStore';

const breadcrumbs = [{ label: 'Pages' }, { label: 'Settings' }];

function Row({ label, description, checked, onChange }) {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ py: 1.5 }}>
      <Box>
        <Typography variant="body2" fontWeight={600}>{label}</Typography>
        {description && <Typography variant="caption" color="text.secondary">{description}</Typography>}
      </Box>
      <Switch checked={checked} onChange={onChange} />
    </Stack>
  );
}

export default function SettingsPage() {
  const [prefs, setPrefs] = useState({
    emailNotifications: true,
    orderAlerts: true,
    weeklyDigest: false,
    twoFactor: false,
    marketingEmails: false,
  });

  const toggle = (key) => setPrefs((p) => ({ ...p, [key]: !p[key] }));

  return (
    <>
      <PageHeader title="Account Settings" breadcrumbs={breadcrumbs} />
      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 0.5 }}>Notifications</Typography>
              <Typography variant="caption" color="text.secondary">Choose what you want to be notified about</Typography>
              <Divider sx={{ my: 1.5 }} />
              <Row label="Email Notifications" description="Receive email updates about your account" checked={prefs.emailNotifications} onChange={() => toggle('emailNotifications')} />
              <Divider />
              <Row label="Order Alerts" description="Get notified when new orders are placed" checked={prefs.orderAlerts} onChange={() => toggle('orderAlerts')} />
              <Divider />
              <Row label="Weekly Digest" description="A weekly summary of your store performance" checked={prefs.weeklyDigest} onChange={() => toggle('weeklyDigest')} />
              <Divider />
              <Row label="Marketing Emails" description="Product updates and promotional offers" checked={prefs.marketingEmails} onChange={() => toggle('marketingEmails')} />
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 0.5 }}>Security</Typography>
              <Typography variant="caption" color="text.secondary">Protect your account with extra security</Typography>
              <Divider sx={{ my: 1.5 }} />
              <Row label="Two-Factor Authentication" description="Require a code at every sign-in" checked={prefs.twoFactor} onChange={() => toggle('twoFactor')} />
            </CardContent>
          </Card>
        </Grid>
        <Grid size={12}>
          <Stack direction="row" justifyContent="flex-end">
            <Button variant="contained" onClick={() => toast.success('Settings saved')}>Save Settings</Button>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
