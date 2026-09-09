import Grid from '@mui/material/Grid';
import StatCard from './StatCard';
import { KpiSkeleton } from '../common/Skeletons';

export default function KPISection({ stats, loading }) {
  if (loading) {
    return (
      <Grid container spacing={2.5}>
        {[0, 1, 2].map((i) => (
          <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}>
            <KpiSkeleton />
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Grid container spacing={2.5}>
      {stats.map((stat) => (
        <Grid key={stat.id} size={{ xs: 12, sm: 6, md: 4 }}>
          <StatCard stat={stat} />
        </Grid>
      ))}
    </Grid>
  );
}
