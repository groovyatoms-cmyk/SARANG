import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '../common/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import EmojiEventsOutlined from '@mui/icons-material/EmojiEventsOutlined';
import { ChartSkeleton } from '../common/Skeletons';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatNumber } from '../../utils/formatNumber';

export default function RevenueLocationsCard({ data, loading }) {
  const [hovered, setHovered] = useState(null);

  if (loading || !data) return <ChartSkeleton height={260} />;

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6">Revenue By Locations</Typography>
        <Typography variant="caption" color="text.secondary">Top performing regions this month</Typography>

        <Stack spacing={2.25} sx={{ mt: 2.5 }}>
          {data.locations.map((loc) => (
            <Box
              key={loc.code}
              onMouseEnter={() => setHovered(loc.code)}
              onMouseLeave={() => setHovered(null)}
              sx={{
                p: 1,
                borderRadius: 2,
                transition: 'background-color 150ms ease',
                bgcolor: hovered === loc.code ? 'action.hover' : 'transparent',
              }}
            >
              <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.75 }}>
                <Typography variant="body2" fontWeight={600}>{loc.country}</Typography>
                <Typography variant="body2" fontWeight={700}>{formatCurrency(loc.revenue, { compact: true })}</Typography>
              </Stack>
              <LinearProgress variant="determinate" value={loc.share} sx={{ mb: 0.5 }} />
              <Typography variant="caption" color="text.secondary">{formatNumber(loc.orders)} orders · {loc.share}% of total</Typography>
            </Box>
          ))}
        </Stack>

        <Box
          sx={{
            mt: 2.5,
            p: 2,
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            background: (t) =>
              t.palette.mode === 'dark' ? 'linear-gradient(135deg, rgba(62,213,152,0.14), rgba(62,213,152,0.03))' : 'linear-gradient(135deg, rgba(40,176,118,0.12), rgba(40,176,118,0.02))',
            border: '1px solid',
            borderColor: (t) => `${t.palette.success.main}33`,
          }}
        >
          <EmojiEventsOutlined color="success" />
          <Box>
            <Typography variant="body2" fontWeight={700}>{data.record.headline}</Typography>
            <Typography variant="caption" color="text.secondary">
              {formatNumber(data.record.orders)} Orders
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
