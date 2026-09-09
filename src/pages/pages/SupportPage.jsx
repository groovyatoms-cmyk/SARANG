import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Stack from '../../components/common/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ExpandMoreOutlined from '@mui/icons-material/ExpandMoreOutlined';
import PageHeader from '../../components/layout/PageHeader';
import { toast } from '../../store/useToastStore';

const breadcrumbs = [{ label: 'Pages' }, { label: 'Support' }];

const faqs = [
  { q: 'How do I reset my password?', a: 'Go to Account Settings → Security, or use the "Forgot password" link on the sign-in page.' },
  { q: 'How do I export order data?', a: 'Open the Orders table, select rows (or leave unselected to export all), then use the Export button in the toolbar.' },
  { q: 'Can I customize the dashboard layout?', a: 'Yes — open the Customization panel from the topbar to change theme, sidebar mode, density, and content width.' },
  { q: 'How do I invite a new team member?', a: 'Go to Users and click "Invite User". They will appear with an Invited status until they accept.' },
];

export default function SupportPage() {
  const [form, setForm] = useState({ subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Your message has been sent to our support team');
    setForm({ subject: '', message: '' });
  };

  return (
    <>
      <PageHeader title="Support Center" breadcrumbs={breadcrumbs} />
      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Frequently Asked Questions</Typography>
              {faqs.map((faq) => (
                <Accordion key={faq.q} disableGutters elevation={0} sx={{ '&:before': { display: 'none' }, border: '1px solid', borderColor: 'divider', borderRadius: 2, mb: 1, overflow: 'hidden' }}>
                  <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
                    <Typography variant="body2" fontWeight={600}>{faq.q}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2" color="text.secondary">{faq.a}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <Card>
            <CardContent component="form" onSubmit={handleSubmit}>
              <Typography variant="h6" sx={{ mb: 2 }}>Contact Support</Typography>
              <Stack spacing={2.5}>
                <TextField label="Subject" value={form.subject} onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))} fullWidth required />
                <TextField label="Message" value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} fullWidth multiline rows={5} required />
                <Button type="submit" variant="contained">Send Message</Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
