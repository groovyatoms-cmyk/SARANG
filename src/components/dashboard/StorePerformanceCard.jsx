import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '../common/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip } from 'recharts';
import RefreshOutlined from '@mui/icons-material/RefreshOutlined';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import ChartContainer from '../charts/ChartContainer';
import { ChartSkeleton } from '../common/Skeletons';

export default function StorePerformanceCard({ data, loading, onRefresh }) {
  const muiTheme = useMuiTheme();
  const [spinning, setSpinning] = useState(false);

  if (loading || !data) return <ChartSkeleton height={260} />;

  const chartData = data.segments.map((s) => ({ name: s.label, value: s.value, color: muiTheme.palette[s.color].main }));

  const handleRefresh = () => {
    setSpinning(true);
    onRefresh?.();
    setTimeout(() => setSpinning(false), 600);
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography variant="h6">Store Performance Analytics</Typography>
            <Typography variant="caption" color="text.secondary">Breakdown by acquisition channel</Typography>
          </Box>
          <Tooltip title="Refresh">
            <IconButton size="small" onClick={handleRefresh}>
              <RefreshOutlined fontSize="small" sx={{ animation: spinning ? 'spin 0.6s linear' : 'none', '@keyframes spin': { to: { transform: 'rotate(360deg)' } } }} />
            </IconButton>
          </Tooltip>
        </Stack>

        <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
          <ChartContainer height={200}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius={62}
                outerRadius={88}
                paddingAngle={3}
                stroke="none"
                isAnimationActive={false}
              >
                {chartData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <RechartsTooltip
                contentStyle={{
                  background: muiTheme.palette.background.elevated,
                  border: `1px solid ${muiTheme.palette.divider}`,
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
            </PieChart>
          </ChartContainer>
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
            <Typography variant="h3">{data.total}</Typography>
            <Typography variant="caption" color="text.secondary">Total</Typography>
          </Box>
        </Box>

        <Stack direction="row" justifyContent="center" sx={{ mb: 1.5 }}>
          <Chip
            icon={<StarRoundedIcon sx={{ fontSize: '14px !important' }} />}
            label={data.status}
            size="small"
            color="warning"
            sx={{ bgcolor: (t) => `${t.palette.warning.main}1F`, color: 'warning.main' }}
          />
        </Stack>

        <Stack spacing={1}>
          {data.segments.map((s) => (
            <Stack key={s.label} direction="row" alignItems="center" justifyContent="space-between">
              <Stack direction="row" alignItems="center" spacing={1}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: `${s.color}.main` }} />
                <Typography variant="body2" color="text.secondary">{s.label}</Typography>
              </Stack>
              <Typography variant="body2" fontWeight={700}>{s.value}%</Typography>
            </Stack>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
