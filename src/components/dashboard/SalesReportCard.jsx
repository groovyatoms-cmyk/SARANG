import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '../common/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
} from 'recharts';
import ChartContainer from '../charts/ChartContainer';
import { ChartSkeleton } from '../common/Skeletons';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatNumber, formatPercent } from '../../utils/formatNumber';

const ranges = ['Today', 'Monthly', 'Annual'];

function Metric({ label, value, color }) {
  return (
    <Box>
      <Typography variant="caption" color="text.secondary">{label}</Typography>
      <Typography variant="h5" sx={{ color }}>{value}</Typography>
    </Box>
  );
}

export default function SalesReportCard({ range, onRangeChange, data, loading, ordersTotal }) {
  const muiTheme = useMuiTheme();

  if (loading || !data) return <ChartSkeleton height={360} />;

  const chartData = data.labels.map((label, i) => ({
    label,
    revenue: data.revenueSeries[i],
    orders: data.orderSeries[i],
  }));

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ sm: 'center' }} spacing={1.5}>
          <Box>
            <Typography variant="h6">Sales Report ({formatNumber(ordersTotal)} Orders)</Typography>
            <Typography variant="caption" color="text.secondary">Revenue and order volume trend</Typography>
          </Box>
          <Tabs value={range} onChange={(_, v) => onRangeChange(v)} sx={{ minHeight: 32 }}>
            {ranges.map((r) => (
              <Tab key={r} value={r} label={r} sx={{ minHeight: 32, py: 0.5 }} />
            ))}
          </Tabs>
        </Stack>

        <Grid container spacing={2} sx={{ mt: 0.5, mb: 1 }}>
          <Grid size={{ xs: 4 }}><Metric label="Revenue" value={formatCurrency(data.revenue)} color="text.primary" /></Grid>
          <Grid size={{ xs: 4 }}><Metric label="Orders" value={formatNumber(data.orders)} color="text.primary" /></Grid>
          <Grid size={{ xs: 4 }}><Metric label="Growth Rate" value={formatPercent(data.growthRate, { showSign: true })} color="success.main" /></Grid>
        </Grid>

        <ChartContainer height={260}>
          <ComposedChart data={chartData} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={muiTheme.palette.primary.main} stopOpacity={0.35} />
                <stop offset="100%" stopColor={muiTheme.palette.primary.main} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={muiTheme.palette.divider} vertical={false} />
            <XAxis dataKey="label" tick={{ fontSize: 11, fill: muiTheme.palette.text.secondary }} axisLine={false} tickLine={false} />
            <YAxis
              tick={{ fontSize: 11, fill: muiTheme.palette.text.secondary }}
              axisLine={false}
              tickLine={false}
              width={44}
              tickFormatter={(value) => formatNumber(value, { compact: true })}
            />
            <RechartsTooltip
              contentStyle={{
                background: muiTheme.palette.background.elevated,
                border: `1px solid ${muiTheme.palette.divider}`,
                borderRadius: 8,
                fontSize: 12,
              }}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Area
              type="monotone"
              dataKey="revenue"
              name="Total Revenue"
              stroke={muiTheme.palette.primary.main}
              strokeWidth={2.5}
              fill="url(#revenueFill)"
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="orders"
              name="Orders"
              stroke={muiTheme.palette.secondary.main}
              strokeWidth={2}
              strokeDasharray="6 4"
              dot={false}
              isAnimationActive={false}
            />
          </ComposedChart>
        </ChartContainer>

        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ sm: 'center' }} spacing={1.5} sx={{ mt: 2 }}>
          <Typography variant="body2">
            Today's Earnings: <Typography component="span" variant="body2" fontWeight={700}>{formatCurrency(data.todaysEarnings ?? 0)}</Typography>
          </Typography>
        </Stack>

        {data.propertyStatus && (
          <Alert severity="warning" variant="outlined" sx={{ mt: 2 }}>
            {data.propertyStatus.message}
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
