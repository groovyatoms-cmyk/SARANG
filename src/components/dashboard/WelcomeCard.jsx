import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '../common/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CalendarMonthOutlined from '@mui/icons-material/CalendarMonthOutlined';
import AccessTimeOutlined from '@mui/icons-material/AccessTimeOutlined';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';

export default function WelcomeCard() {
  const user = useAuthStore((s) => s.user);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Card
      sx={{
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        background: (t) =>
          t.palette.mode === 'dark'
            ? 'linear-gradient(135deg, #1E3A54 0%, #1A2027 65%)'
            : 'linear-gradient(135deg, #C8DFDB 0%, #FFFFFF 65%)',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          right: -40,
          top: -40,
          width: 180,
          height: 180,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(51,104,160,0.25) 0%, transparent 70%)',
        }}
      />
      <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}>
        <Box>
          <Typography variant="overline" color="text.secondary">Good Day,</Typography>
          <Typography variant="h3" sx={{ mt: 0.25 }}>{user.name}!</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, maxWidth: 320 }}>
            Here's what's happening with your store today. Your dashboard is refreshed and up to date.
          </Typography>
        </Box>
        <Stack direction="row" spacing={3} sx={{ mt: 3 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <CalendarMonthOutlined fontSize="small" color="primary" />
            <Typography variant="body2" fontWeight={600}>{format(now, 'MMM d, yyyy')}</Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <AccessTimeOutlined fontSize="small" color="secondary" />
            <Typography variant="body2" fontWeight={600} sx={{ fontVariantNumeric: 'tabular-nums' }}>
              {format(now, 'hh:mm:ss a')}
            </Typography>
          </Stack>
        </Stack>
        <Button variant="contained" size="small" sx={{ mt: 2.5, alignSelf: 'flex-start' }} component={Link} to="/ecommerce/orders">
          View Store Report
        </Button>
      </CardContent>
    </Card>
  );
}
