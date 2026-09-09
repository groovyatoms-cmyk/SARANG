import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '../common/Stack';
import { Link } from 'react-router-dom';

export default function ErrorPageLayout({ code, title, message, icon, actionLabel = 'Return to Dashboard', actionTo = '/dashboard/ecommerce' }) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        p: 3,
        bgcolor: 'background.default',
      }}
    >
      {icon}
      {code && (
        <Typography
          sx={{
            fontSize: { xs: '4rem', sm: '6rem' },
            fontWeight: 800,
            lineHeight: 1,
            background: 'linear-gradient(135deg, #3368A0 0%, #66A3BF 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            mb: 1,
          }}
        >
          {code}
        </Typography>
      )}
      <Typography variant="h4" sx={{ mb: 1 }}>{title}</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 420, mb: 4 }}>{message}</Typography>
      <Stack direction="row" spacing={1.5}>
        <Button variant="contained" size="large" component={Link} to={actionTo}>{actionLabel}</Button>
      </Stack>
    </Box>
  );
}
