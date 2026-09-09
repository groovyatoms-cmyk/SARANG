import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from './Stack';
import ErrorOutlineOutlined from '@mui/icons-material/ErrorOutlineOutlined';

export default function ErrorState({
  title = 'Unable to load dashboard data.',
  message,
  onRetry,
  onGoBack,
}) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', py: 6, px: 3 }}>
      <Box
        sx={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: (t) => `${t.palette.error.main}1A`,
          color: 'error.main',
          mb: 2,
        }}
      >
        <ErrorOutlineOutlined fontSize="medium" />
      </Box>
      <Typography variant="subtitle1" sx={{ mb: 0.5 }}>{title}</Typography>
      {message && (
        <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 360, mb: 2 }}>
          {message}
        </Typography>
      )}
      <Stack direction="row" spacing={1.5} sx={{ mt: 1 }}>
        {onRetry && <Button variant="contained" size="small" onClick={onRetry}>Retry</Button>}
        {onGoBack && <Button variant="outlined" size="small" onClick={onGoBack}>Go Back</Button>}
      </Stack>
    </Box>
  );
}
