import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PageHeader from '../../components/layout/PageHeader';
import KPISection from '../../components/dashboard/KPISection';
import { crmStats, crmPipeline } from '../../data/dashboard';
import { formatCurrency } from '../../utils/formatCurrency';

const breadcrumbs = [{ label: 'Dashboard', path: '/dashboard/ecommerce' }, { label: 'CRM' }];
const maxDeals = Math.max(...crmPipeline.map((s) => s.deals));

export default function CrmDashboard() {
  return (
    <>
      <PageHeader title="CRM" breadcrumbs={breadcrumbs} />
      <Grid container spacing={2.5}>
        <Grid size={12}>
          <KPISection stats={crmStats} />
        </Grid>

        <Grid size={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">Sales Pipeline</Typography>
              <Typography variant="caption" color="text.secondary">Deals by stage</Typography>
              <Grid container spacing={2} sx={{ mt: 1.5 }}>
                {crmPipeline.map((stage) => (
                  <Grid key={stage.stage} size={{ xs: 12, sm: 6, md: 3 }}>
                    <Box sx={{ p: 2, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                      <Typography variant="body2" color="text.secondary">{stage.stage}</Typography>
                      <Typography variant="h4" sx={{ mt: 0.5 }}>{stage.deals}</Typography>
                      <Typography variant="caption" color="text.secondary">{formatCurrency(stage.value, { compact: true })}</Typography>
                      <Box sx={{ mt: 1.5, height: 6, borderRadius: 3, bgcolor: 'action.hover', overflow: 'hidden' }}>
                        <Box sx={{ height: '100%', width: `${(stage.deals / maxDeals) * 100}%`, bgcolor: 'primary.main', borderRadius: 3 }} />
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
