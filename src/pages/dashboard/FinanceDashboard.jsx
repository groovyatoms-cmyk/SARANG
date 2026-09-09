import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import PageHeader from '../../components/layout/PageHeader';
import KPISection from '../../components/dashboard/KPISection';
import ChartContainer from '../../components/charts/ChartContainer';
import { financeStats, financeCashflow } from '../../data/dashboard';
import { formatNumber } from '../../utils/formatNumber';

const breadcrumbs = [{ label: 'Dashboard', path: '/dashboard/ecommerce' }, { label: 'Finance' }];

export default function FinanceDashboard() {
  const muiTheme = useMuiTheme();

  return (
    <>
      <PageHeader title="Finance" breadcrumbs={breadcrumbs} />
      <Grid container spacing={2.5}>
        <Grid size={12}>
          <KPISection stats={financeStats} />
        </Grid>

        <Grid size={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">Income vs Expenses</Typography>
              <Typography variant="caption" color="text.secondary">Monthly cash flow for the current fiscal year</Typography>
              <ChartContainer height={320}>
                <AreaChart data={financeCashflow} margin={{ top: 16, right: 8, left: -12, bottom: 0 }}>
                  <defs>
                    <linearGradient id="incomeFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={muiTheme.palette.success.main} stopOpacity={0.3} />
                      <stop offset="100%" stopColor={muiTheme.palette.success.main} stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="expensesFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={muiTheme.palette.error.main} stopOpacity={0.25} />
                      <stop offset="100%" stopColor={muiTheme.palette.error.main} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={muiTheme.palette.divider} vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: muiTheme.palette.text.secondary }} axisLine={false} tickLine={false} />
                  <YAxis
                    tick={{ fontSize: 11, fill: muiTheme.palette.text.secondary }}
                    axisLine={false}
                    tickLine={false}
                    width={48}
                    tickFormatter={(value) => formatNumber(value, { compact: true })}
                  />
                  <RechartsTooltip contentStyle={{ background: muiTheme.palette.background.elevated, border: `1px solid ${muiTheme.palette.divider}`, borderRadius: 8, fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Area type="monotone" dataKey="income" name="Income" stroke={muiTheme.palette.success.main} strokeWidth={2.5} fill="url(#incomeFill)" isAnimationActive={false} />
                  <Area type="monotone" dataKey="expenses" name="Expenses" stroke={muiTheme.palette.error.main} strokeWidth={2.5} fill="url(#expensesFill)" isAnimationActive={false} />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
