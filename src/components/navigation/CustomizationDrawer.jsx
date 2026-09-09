import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Stack from '../common/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import CloseOutlined from '@mui/icons-material/CloseOutlined';
import DarkModeOutlined from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlined from '@mui/icons-material/LightModeOutlined';
import SettingsSuggestOutlined from '@mui/icons-material/SettingsSuggestOutlined';
import { useUiStore } from '../../store/useUiStore';
import { useSettingsStore } from '../../store/useSettingsStore';
import { useTheme as useThemeMode } from '../../hooks/useTheme';
import { toast } from '../../store/useToastStore';

function SettingRow({ label, children }) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ py: 1 }}>
      <Typography variant="body2" fontWeight={600}>{label}</Typography>
      {children}
    </Stack>
  );
}

export default function CustomizationDrawer() {
  const open = useUiStore((s) => s.customizationOpen);
  const setOpen = useUiStore((s) => s.setCustomizationOpen);
  const { setting, setSetting } = useThemeMode();
  const settings = useSettingsStore();

  const handleSave = () => {
    toast.success('Settings saved');
    setOpen(false);
  };

  return (
    <Drawer anchor="right" open={open} onClose={() => setOpen(false)} slotProps={{ paper: { sx: { width: 340 } } }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 2.5, py: 2 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <SettingsSuggestOutlined fontSize="small" color="primary" />
          <Typography variant="subtitle1">Customization</Typography>
        </Stack>
        <IconButton size="small" onClick={() => setOpen(false)} aria-label="Close">
          <CloseOutlined fontSize="small" />
        </IconButton>
      </Stack>
      <Divider />
      <Box sx={{ px: 2.5, py: 2 }}>
        <Typography variant="overline" color="text.disabled">Theme</Typography>
        <ToggleButtonGroup
          fullWidth
          exclusive
          size="small"
          value={setting}
          onChange={(_, v) => v && setSetting(v)}
          sx={{ mt: 1, mb: 2 }}
        >
          <ToggleButton value="light"><LightModeOutlined fontSize="small" sx={{ mr: 0.75 }} />Light</ToggleButton>
          <ToggleButton value="dark"><DarkModeOutlined fontSize="small" sx={{ mr: 0.75 }} />Dark</ToggleButton>
          <ToggleButton value="system">System</ToggleButton>
        </ToggleButtonGroup>

        <Typography variant="overline" color="text.disabled">Sidebar</Typography>
        <ToggleButtonGroup
          fullWidth
          exclusive
          size="small"
          value={settings.sidebarMode}
          onChange={(_, v) => v && settings.update({ sidebarMode: v })}
          sx={{ mt: 1, mb: 2 }}
        >
          <ToggleButton value="expanded">Expanded</ToggleButton>
          <ToggleButton value="collapsed">Collapsed</ToggleButton>
        </ToggleButtonGroup>

        <Typography variant="overline" color="text.disabled">Layout</Typography>
        <ToggleButtonGroup
          fullWidth
          exclusive
          size="small"
          value={settings.layoutDensity}
          onChange={(_, v) => v && settings.update({ layoutDensity: v })}
          sx={{ mt: 1, mb: 2 }}
        >
          <ToggleButton value="compact">Compact</ToggleButton>
          <ToggleButton value="comfortable">Comfortable</ToggleButton>
        </ToggleButtonGroup>

        <Typography variant="overline" color="text.disabled">Content Width</Typography>
        <ToggleButtonGroup
          fullWidth
          exclusive
          size="small"
          value={settings.contentWidth}
          onChange={(_, v) => v && settings.update({ contentWidth: v })}
          sx={{ mt: 1, mb: 2 }}
        >
          <ToggleButton value="contained">Contained</ToggleButton>
          <ToggleButton value="full">Full Width</ToggleButton>
        </ToggleButtonGroup>

        <Typography variant="overline" color="text.disabled">Topbar</Typography>
        <ToggleButtonGroup
          fullWidth
          exclusive
          size="small"
          value={settings.topbarMode}
          onChange={(_, v) => v && settings.update({ topbarMode: v })}
          sx={{ mt: 1, mb: 1 }}
        >
          <ToggleButton value="fixed">Fixed</ToggleButton>
          <ToggleButton value="static">Static</ToggleButton>
        </ToggleButtonGroup>

        <Divider sx={{ my: 1.5 }} />

        <SettingRow label="Breadcrumbs">
          <Switch checked={settings.breadcrumbsVisible} onChange={(e) => settings.update({ breadcrumbsVisible: e.target.checked })} />
        </SettingRow>
        <SettingRow label="Footer">
          <Switch checked={settings.footerVisible} onChange={(e) => settings.update({ footerVisible: e.target.checked })} />
        </SettingRow>

        <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
          <Button fullWidth variant="outlined" onClick={settings.reset}>Reset</Button>
          <Button fullWidth variant="contained" onClick={handleSave}>Save</Button>
        </Stack>
      </Box>
    </Drawer>
  );
}
