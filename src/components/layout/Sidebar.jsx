import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import SidebarHeader from './SidebarHeader';
import SidebarMenu from './SidebarMenu';
import { SARANG_LAYOUT } from '../../theme/dimensions';
import { useSidebar } from '../../hooks/useSidebar';

export default function Sidebar() {
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  const { collapsed, mobileOpen, setMobileOpen } = useSidebar();

  const width = collapsed ? SARANG_LAYOUT.sidebarCollapsedWidth : SARANG_LAYOUT.sidebarWidth;

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        bgcolor: 'background.sidebar',
        borderRight: '1px solid',
        borderColor: 'divider',
      }}
    >
      <SidebarHeader />
      <SidebarMenu />
    </Box>
  );

  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{ '& .MuiDrawer-paper': { width: SARANG_LAYOUT.sidebarWidth, border: 'none' } }}
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width,
        flexShrink: 0,
        transition: 'width 220ms ease',
        '& .MuiDrawer-paper': {
          width,
          boxSizing: 'border-box',
          border: 'none',
          transition: 'width 220ms ease',
          overflowX: 'hidden',
        },
      }}
    >
      {content}
    </Drawer>
  );
}
