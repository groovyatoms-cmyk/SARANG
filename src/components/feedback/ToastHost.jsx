import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useToastStore } from '../../store/useToastStore';

export default function ToastHost() {
  const toasts = useToastStore((s) => s.toasts);
  const dismiss = useToastStore((s) => s.dismiss);

  return (
    <>
      {toasts.map((t, index) => (
        <Snackbar
          key={t.id}
          open
          autoHideDuration={3500}
          onClose={() => dismiss(t.id)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          sx={{ bottom: { xs: 16 + index * 60, sm: 24 + index * 60 } }}
        >
          <Alert severity={t.severity} variant="filled" onClose={() => dismiss(t.id)} sx={{ minWidth: 280 }}>
            {t.message}
          </Alert>
        </Snackbar>
      ))}
    </>
  );
}
