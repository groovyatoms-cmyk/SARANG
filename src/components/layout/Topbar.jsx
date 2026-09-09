import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Stack from '../common/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import MenuOutlined from '@mui/icons-material/MenuOutlined';
import ChevronLeftOutlined from '@mui/icons-material/ChevronLeftOutlined';
import TopbarSearch from './TopbarSearch';
import TopbarActions from './TopbarActions';
import MegaMenu from '../navigation/MegaMenu';
import { useSidebar } from '../../hooks/useSidebar';
import { useSettingsStore } from '../../store/useSettingsStore';

export default function Topbar() {
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  const { collapsed, toggleCollapsed, setMobileOpen } = useSidebar();
  const topbarMode = useSettingsStore((s) => s.topbarMode);

  return (
    <AppBar
      position={topbarMode === 'fixed' ? 'sticky' : 'static'}
      sx={{ top: 0, zIndex: (t) => t.zIndex.drawer + 1 }}
    >
      <Toolbar sx={{ px: { xs: 1.5, md: 3 }, gap: 1 }}>
        <IconButton
          onClick={() => (isMobile ? setMobileOpen(true) : toggleCollapsed())}
          aria-label="Toggle sidebar"
        >
          {isMobile ? <MenuOutlined fontSize="small" /> : (
            <ChevronLeftOutlined fontSize="small" sx={{ transform: collapsed ? 'rotate(180deg)' : 'none', transition: 'transform 200ms ease' }} />
          )}
        </IconButton>

        <MegaMenu />

        <Box sx={{ display: { xs: 'flex', sm: 'none' }, alignItems: 'center', flex: 1 }}>
          <Typography variant="subtitle1" fontWeight={800}>SARANG</Typography>
        </Box>

        <Box sx={{ flex: 1, display: { xs: 'none', sm: 'flex' }, justifyContent: 'flex-start', pl: 1 }}>
          <TopbarSearch />
        </Box>

        <Stack direction="row" alignItems="center" spacing={0.5}>
          <TopbarActions />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
