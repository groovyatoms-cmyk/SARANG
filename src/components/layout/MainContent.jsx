import Box from '@mui/material/Box';
import { SARANG_LAYOUT } from '../../theme/dimensions';
import { useSettingsStore } from '../../store/useSettingsStore';

export default function MainContent({ children }) {
  const contentWidth = useSettingsStore((s) => s.contentWidth);
  const layoutDensity = useSettingsStore((s) => s.layoutDensity);

  const padding = layoutDensity === 'compact' ? SARANG_LAYOUT.contentPadding * 0.7 : SARANG_LAYOUT.contentPadding;

  return (
    <Box
      component="main"
      sx={{
        flex: 1,
        minWidth: 0,
        px: { xs: SARANG_LAYOUT.contentPaddingMobile / 8, md: padding / 8 },
        pt: { xs: 2, md: 2.5 },
        maxWidth: contentWidth === 'contained' ? 1680 : '100%',
        width: '100%',
        mx: contentWidth === 'contained' ? 'auto' : 0,
      }}
    >
      {children}
    </Box>
  );
}
