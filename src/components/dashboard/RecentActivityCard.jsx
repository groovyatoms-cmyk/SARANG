import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '../common/Stack';
import Icon from '../common/Icon';
import { ListSkeleton } from '../common/Skeletons';
import EmptyState from '../common/EmptyState';
import { formatRelativeTime } from '../../utils/formatDate';

export default function RecentActivityCard({ activities, loading }) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6">Recent Activity</Typography>
        <Typography variant="caption" color="text.secondary">Latest actions across your store</Typography>

        <Box sx={{ mt: 2.5 }}>
          {loading && <ListSkeleton rows={4} />}
          {!loading && activities.length === 0 && <EmptyState title="No activity yet" />}
          {!loading && activities.length > 0 && (
            <Stack sx={{ position: 'relative' }}>
              {activities.map((a, index) => (
                <Stack key={a.id} direction="row" spacing={1.75} sx={{ position: 'relative', pb: index === activities.length - 1 ? 0 : 3 }}>
                  {index !== activities.length - 1 && (
                    <Box
                      sx={{
                        position: 'absolute',
                        left: 15,
                        top: 34,
                        bottom: 0,
                        width: '1px',
                        bgcolor: 'divider',
                      }}
                    />
                  )}
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: (t) => `${t.palette[a.color].main}1F`,
                      color: `${a.color}.main`,
                      flexShrink: 0,
                      zIndex: 1,
                    }}
                  >
                    <Icon name={a.icon} sx={{ fontSize: 16 }} />
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="body2" fontWeight={600}>{a.title}</Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                      {a.description}
                    </Typography>
                    <Typography variant="caption" color="text.disabled">
                      By {a.user} · {formatRelativeTime(a.timestamp)}
                    </Typography>
                  </Box>
                </Stack>
              ))}
            </Stack>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
