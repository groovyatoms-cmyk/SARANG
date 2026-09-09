import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Stack from '../../components/common/Stack';
import PageHeader from '../../components/layout/PageHeader';
import { toast } from '../../store/useToastStore';

const breadcrumbs = [{ label: 'Custom Pages' }, { label: 'Plugins' }];

const plugins = [
  { id: 'stripe', name: 'Stripe Payments', description: 'Accept credit card payments securely.', icon: '💳' },
  { id: 'mailchimp', name: 'Mailchimp Sync', description: 'Sync customers to your email marketing lists.', icon: '📧' },
  { id: 'slack', name: 'Slack Alerts', description: 'Send real-time order alerts to a Slack channel.', icon: '💬' },
  { id: 'zendesk', name: 'Zendesk Support', description: 'Connect support tickets to customer orders.', icon: '🎫' },
  { id: 'ga', name: 'Google Analytics', description: 'Track storefront traffic and conversions.', icon: '📊' },
  { id: 'twilio', name: 'Twilio SMS', description: 'Send order and shipping updates via SMS.', icon: '📱' },
];

export default function PluginsPage() {
  const [enabled, setEnabled] = useState({ stripe: true, ga: true });

  const toggle = (id, name) => {
    setEnabled((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      toast.success(`${name} ${next[id] ? 'enabled' : 'disabled'}`);
      return next;
    });
  };

  return (
    <>
      <PageHeader title="Plugins" breadcrumbs={breadcrumbs} />
      <Grid container spacing={2.5}>
        {plugins.map((plugin) => (
          <Grid key={plugin.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                  <Box sx={{ fontSize: '1.75rem' }}>{plugin.icon}</Box>
                  <Switch checked={Boolean(enabled[plugin.id])} onChange={() => toggle(plugin.id, plugin.name)} />
                </Stack>
                <Typography variant="subtitle1" sx={{ mt: 1.5 }}>{plugin.name}</Typography>
                <Typography variant="body2" color="text.secondary">{plugin.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
