import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '../../components/common/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import AvatarGroup from '@mui/material/AvatarGroup';
import Avatar from '@mui/material/Avatar';
import PageHeader from '../../components/layout/PageHeader';
import KPISection from '../../components/dashboard/KPISection';
import StatusChip from '../../components/common/StatusChip';
import { projectsStats, projectsList } from '../../data/dashboard';
import { formatDate } from '../../utils/formatDate';

const breadcrumbs = [{ label: 'Dashboard', path: '/dashboard/ecommerce' }, { label: 'Projects' }];

export default function ProjectsDashboard() {
  return (
    <>
      <PageHeader title="Projects" breadcrumbs={breadcrumbs} />
      <Grid container spacing={2.5}>
        <Grid size={12}>
          <KPISection stats={projectsStats} />
        </Grid>

        <Grid size={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">Active Projects</Typography>
              <Typography variant="caption" color="text.secondary">Current progress across your team's workload</Typography>
              <Stack spacing={2.5} sx={{ mt: 2.5 }}>
                {projectsList.map((p) => (
                  <Box key={p.id} sx={{ p: 2, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" rowGap={1}>
                      <Box>
                        <Typography variant="body2" fontWeight={700}>{p.name}</Typography>
                        <Typography variant="caption" color="text.secondary">Due {formatDate(p.dueDate)}</Typography>
                      </Box>
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { width: 26, height: 26, fontSize: '0.65rem' } }}>
                          {Array.from({ length: p.team }).map((_, i) => (
                            <Avatar key={i}>{String.fromCharCode(65 + i)}</Avatar>
                          ))}
                        </AvatarGroup>
                        <StatusChip status={p.status} />
                      </Stack>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mt: 1.5 }}>
                      <LinearProgress variant="determinate" value={p.progress} sx={{ flex: 1 }} />
                      <Typography variant="caption" fontWeight={700}>{p.progress}%</Typography>
                    </Stack>
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
