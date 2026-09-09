import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Stack from '../common/Stack';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { ChartSkeleton } from '../common/Skeletons';

const MAX_VALUE = 100;

function WeeklyRangeRow({ day, start, end }) {
  const startPct = (start / MAX_VALUE) * 100;
  const endPct = (end / MAX_VALUE) * 100;

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Typography variant="caption" color="text.secondary" sx={{ width: 32, flexShrink: 0 }}>{day}</Typography>
      <Box sx={{ position: 'relative', flex: 1, height: 20 }}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            height: 4,
            borderRadius: 2,
            bgcolor: 'action.hover',
            transform: 'translateY(-50%)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: `${startPct}%`,
            width: `${Math.max(endPct - startPct, 0)}%`,
            height: 4,
            borderRadius: 2,
            background: 'linear-gradient(90deg, #3368A0 0%, #66A3BF 100%)',
            transform: 'translateY(-50%)',
          }}
        />
        <Tooltip title={`Start: ${start}`}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: `${startPct}%`,
              width: 10,
              height: 10,
              borderRadius: '50%',
              bgcolor: 'primary.main',
              border: '2px solid',
              borderColor: 'background.paper',
              transform: 'translate(-50%, -50%)',
            }}
          />
        </Tooltip>
        <Tooltip title={`End: ${end}`}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: `${endPct}%`,
              width: 10,
              height: 10,
              borderRadius: '50%',
              bgcolor: 'secondary.main',
              border: '2px solid',
              borderColor: 'background.paper',
              transform: 'translate(-50%, -50%)',
            }}
          />
        </Tooltip>
      </Box>
      <Typography variant="caption" fontWeight={700} sx={{ width: 34, textAlign: 'right', flexShrink: 0 }}>{end}</Typography>
    </Stack>
  );
}

export default function WeeklyPerformanceCard({ data, loading }) {
  if (loading || !data) return <ChartSkeleton height={260} />;

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6">Weekly Performance Insights</Typography>
        <Typography variant="caption" color="text.secondary">Order volume range per weekday</Typography>

        <Stack spacing={2} sx={{ mt: 3 }}>
          {data.map((row) => (
            <WeeklyRangeRow key={row.day} {...row} />
          ))}
        </Stack>

        <Stack direction="row" spacing={2.5} justifyContent="center" sx={{ mt: 3 }}>
          <Stack direction="row" spacing={0.75} alignItems="center">
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'primary.main' }} />
            <Typography variant="caption" color="text.secondary">Start</Typography>
          </Stack>
          <Stack direction="row" spacing={0.75} alignItems="center">
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'secondary.main' }} />
            <Typography variant="caption" color="text.secondary">End</Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
