import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from './Stack';

export function KpiSkeleton() {
  return (
    <Card>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Box sx={{ width: '100%' }}>
            <Skeleton variant="text" width={80} height={18} />
            <Skeleton variant="text" width={110} height={36} />
            <Skeleton variant="text" width={140} height={16} />
          </Box>
          <Skeleton variant="circular" width={44} height={44} />
        </Stack>
      </CardContent>
    </Card>
  );
}

export function ChartSkeleton({ height = 300 }) {
  return (
    <Card>
      <CardContent>
        <Skeleton variant="text" width={180} height={26} sx={{ mb: 2 }} />
        <Skeleton variant="rounded" width="100%" height={height} />
      </CardContent>
    </Card>
  );
}

export function TableSkeleton({ rows = 5 }) {
  return (
    <Card>
      <CardContent>
        <Skeleton variant="text" width={160} height={26} sx={{ mb: 2 }} />
        <Stack spacing={1.5}>
          {Array.from({ length: rows }).map((_, i) => (
            <Skeleton key={i} variant="rounded" width="100%" height={44} />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}

export function ListSkeleton({ rows = 4 }) {
  return (
    <Stack spacing={2}>
      {Array.from({ length: rows }).map((_, i) => (
        <Stack key={i} direction="row" spacing={1.5} alignItems="center">
          <Skeleton variant="circular" width={36} height={36} />
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="text" width="60%" height={18} />
            <Skeleton variant="text" width="40%" height={16} />
          </Box>
        </Stack>
      ))}
    </Stack>
  );
}
