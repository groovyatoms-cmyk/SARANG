import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '../../components/common/Stack';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip } from 'recharts';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import PageHeader from '../../components/layout/PageHeader';
import KPISection from '../../components/dashboard/KPISection';
import ChartContainer from '../../components/charts/ChartContainer';
import { analyticsStats, analyticsTraffic, weeklyPerformance } from '../../data/dashboard';
import { formatNumber } from '../../utils/formatNumber';

const breadcrumbs = [{ label: 'Dashboard', path: '/dashboard/ecommerce' }, { label: 'Analytics' }];

export default function AnalyticsDashboard() {
  const muiTheme = useMuiTheme();
  const chartData = weeklyPerformance.map((d) => ({ day: d.day, visits: d.end * 24 }));

  return (
    <>
      <PageHeader title="Analytics" breadcrumbs={breadcrumbs} />
      <Grid container spacing={2.5}>
        <Grid size={12}>
          <KPISection stats={analyticsStats} />
        </Grid>

        <Grid size={{ xs: 12, lg: 7 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6">Weekly Visitor Traffic</Typography>
              <Typography variant="caption" color="text.secondary">Sessions recorded per weekday</Typography>
              <ChartContainer height={280}>
                <BarChart data={chartData} margin={{ top: 16, right: 8, left: -12, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={muiTheme.palette.divider} vertical={false} />
                  <XAxis dataKey="day" tick={{ fontSize: 11, fill: muiTheme.palette.text.secondary }} axisLine={false} tickLine={false} />
                  <YAxis
                    tick={{ fontSize: 11, fill: muiTheme.palette.text.secondary }}
                    axisLine={false}
                    tickLine={false}
                    width={44}
                    tickFormatter={(value) => formatNumber(value, { compact: true })}
                  />
                  <RechartsTooltip contentStyle={{ background: muiTheme.palette.background.elevated, border: `1px solid ${muiTheme.palette.divider}`, borderRadius: 8, fontSize: 12 }} />
                  <Bar dataKey="visits" name="Sessions" fill={muiTheme.palette.primary.main} radius={[6, 6, 0, 0]} isAnimationActive={false} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 5 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6">Traffic Sources</Typography>
              <Typography variant="caption" color="text.secondary">Breakdown by acquisition channel</Typography>
              <Stack spacing={2.25} sx={{ mt: 2.5 }}>
                {analyticsTraffic.map((t) => (
                  <Box key={t.source}>
                    <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.75 }}>
                      <Typography variant="body2" fontWeight={600}>{t.source}</Typography>
                      <Typography variant="body2" color="text.secondary">{formatNumber(t.sessions)}</Typography>
                    </Stack>
                    <LinearProgress variant="determinate" value={t.share} />
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
