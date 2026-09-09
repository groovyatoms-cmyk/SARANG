import Box from '@mui/material/Box';
import Stack from '../common/Stack';
import Typography from '@mui/material/Typography';
import Breadcrumbs from './Breadcrumbs';
import { useSettingsStore } from '../../store/useSettingsStore';

export default function PageHeader({ title, breadcrumbs, actions }) {
  const breadcrumbsVisible = useSettingsStore((s) => s.breadcrumbsVisible);

  return (
    <Box sx={{ mb: 3 }}>
      {breadcrumbsVisible && (
        <Box sx={{ mb: 1 }}>
          <Breadcrumbs items={breadcrumbs} />
        </Box>
      )}
      <Stack direction="row" alignItems="center" justifyContent="space-between" flexWrap="wrap" rowGap={1.5}>
        <Typography variant="h4">{title}</Typography>
        {actions && <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>{actions}</Box>}
      </Stack>
    </Box>
  );
}
