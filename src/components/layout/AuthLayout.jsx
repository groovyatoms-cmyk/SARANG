import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { Link } from 'react-router-dom';

export default function AuthLayout({ title, subtitle, children, maxWidth = 420 }) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        bgcolor: 'background.default',
        backgroundImage: (t) =>
          t.palette.mode === 'dark'
            ? 'radial-gradient(circle at 20% 20%, rgba(51,104,160,0.14), transparent 45%), radial-gradient(circle at 80% 80%, rgba(102,163,191,0.10), transparent 45%)'
            : 'radial-gradient(circle at 20% 20%, rgba(51,104,160,0.08), transparent 45%), radial-gradient(circle at 80% 80%, rgba(102,163,191,0.08), transparent 45%)',
      }}
    >
      <Box sx={{ width: '100%', maxWidth }}>
        <Box component={Link} to="/dashboard/ecommerce" sx={{ display: 'flex', alignItems: 'center', gap: 1.25, justifyContent: 'center', mb: 3, textDecoration: 'none' }}>
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: '11px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              color: '#fff',
              background: 'linear-gradient(135deg, #3368A0 0%, #66A3BF 100%)',
            }}
          >
            S
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: 0.5, color: 'text.primary' }}>SARANG</Typography>
        </Box>
        <Card sx={{ p: { xs: 3, sm: 4 } }}>
          <Typography variant="h4" sx={{ mb: 0.5 }}>{title}</Typography>
          {subtitle && <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>{subtitle}</Typography>}
          {children}
        </Card>
      </Box>
    </Box>
  );
}
