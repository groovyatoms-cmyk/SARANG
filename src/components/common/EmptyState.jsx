import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import InboxOutlined from '@mui/icons-material/InboxOutlined';

export default function EmptyState({ icon, title = 'Nothing here yet', message, actionLabel, onAction }) {
  const IconComponent = icon || InboxOutlined;
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        py: 6,
        px: 3,
        gap: 1,
      }}
    >
      <Box
        sx={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'action.hover',
          color: 'text.secondary',
          mb: 1,
        }}
      >
        <IconComponent fontSize="medium" />
      </Box>
      <Typography variant="subtitle1">{title}</Typography>
      {message && (
        <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 360 }}>
          {message}
        </Typography>
      )}
      {actionLabel && (
        <Button size="small" variant="outlined" onClick={onAction} sx={{ mt: 1.5 }}>
          {actionLabel}
        </Button>
      )}
    </Box>
  );
}
