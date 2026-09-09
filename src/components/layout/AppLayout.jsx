import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import MainContent from './MainContent';
import Footer from './Footer';
import CommandPalette from '../navigation/CommandPalette';
import CustomizationDrawer from '../navigation/CustomizationDrawer';
import ToastHost from '../feedback/ToastHost';
import ErrorBoundary from '../common/ErrorBoundary';
import { useUiStore } from '../../store/useUiStore';
import { useSettingsStore } from '../../store/useSettingsStore';

export default function AppLayout() {
  const setCommandPaletteOpen = useUiStore((s) => s.setCommandPaletteOpen);
  const footerVisible = useSettingsStore((s) => s.footerVisible);

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(true);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [setCommandPaletteOpen]);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Sidebar />
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
        <Topbar />
        <MainContent>
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
          {footerVisible && <Footer />}
        </MainContent>
      </Box>
      <CommandPalette />
      <CustomizationDrawer />
      <ToastHost />
    </Box>
  );
}
