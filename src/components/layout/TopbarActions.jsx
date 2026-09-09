import Stack from '../common/Stack';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import DarkModeOutlined from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlined from '@mui/icons-material/LightModeOutlined';
import FullscreenOutlined from '@mui/icons-material/FullscreenOutlined';
import FullscreenExitOutlined from '@mui/icons-material/FullscreenExitOutlined';
import SettingsSuggestOutlined from '@mui/icons-material/SettingsSuggestOutlined';
import AppLauncher from '../navigation/AppLauncher';
import LanguageMenu from '../navigation/LanguageMenu';
import NotificationCenter from '../navigation/NotificationCenter';
import UserMenu from '../navigation/UserMenu';
import { useTheme as useThemeMode } from '../../hooks/useTheme';
import { useFullscreen } from '../../hooks/useFullscreen';
import { useUiStore } from '../../store/useUiStore';

export default function TopbarActions() {
  const { mode, toggle } = useThemeMode();
  const { isFullscreen, toggle: toggleFullscreen } = useFullscreen();
  const setCustomizationOpen = useUiStore((s) => s.setCustomizationOpen);

  return (
    <Stack direction="row" alignItems="center" spacing={0.25}>
      <Tooltip title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
        <IconButton onClick={toggle} aria-label="Toggle theme">
          {mode === 'dark' ? <LightModeOutlined fontSize="small" /> : <DarkModeOutlined fontSize="small" />}
        </IconButton>
      </Tooltip>
      <AppLauncher />
      <NotificationCenter />
      <Tooltip title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}>
        <IconButton onClick={toggleFullscreen} aria-label="Toggle fullscreen" sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>
          {isFullscreen ? <FullscreenExitOutlined fontSize="small" /> : <FullscreenOutlined fontSize="small" />}
        </IconButton>
      </Tooltip>
      <Tooltip title="Customization">
        <IconButton onClick={() => setCustomizationOpen(true)} aria-label="Customization" sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>
          <SettingsSuggestOutlined fontSize="small" />
        </IconButton>
      </Tooltip>
      <LanguageMenu />
      <Divider orientation="vertical" flexItem sx={{ mx: 0.75, my: 1 }} />
      <UserMenu />
    </Stack>
  );
}
