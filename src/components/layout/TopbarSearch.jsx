import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import { useUiStore } from '../../store/useUiStore';

export default function TopbarSearch() {
  const setOpen = useUiStore((s) => s.setCommandPaletteOpen);

  return (
    <ButtonBase
      onClick={() => setOpen(true)}
      sx={{
        display: { xs: 'none', sm: 'flex' },
        alignItems: 'center',
        gap: 1,
        width: 260,
        px: 1.5,
        py: 0.875,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        bgcolor: 'action.hover',
        justifyContent: 'flex-start',
      }}
    >
      <SearchOutlined fontSize="small" sx={{ color: 'text.secondary' }} />
      <Typography variant="body2" color="text.secondary" sx={{ flex: 1, textAlign: 'left' }}>
        Quick Search
      </Typography>
      <Box sx={{ display: 'flex', gap: 0.5 }}>
        <Chip label="Ctrl" size="small" component="span" sx={{ height: 20, fontSize: '0.65rem' }} />
        <Chip label="K" size="small" component="span" sx={{ height: 20, fontSize: '0.65rem' }} />
      </Box>
    </ButtonBase>
  );
}
