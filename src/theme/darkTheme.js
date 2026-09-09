import { createTheme } from '@mui/material/styles';
import { darkPalette } from './colors';
import { typography } from './typography';
import { buildComponents } from './components';
import { SARANG_LAYOUT } from './dimensions';

export const darkTheme = createTheme({
  cssVariables: false,
  palette: darkPalette,
  typography,
  shape: { borderRadius: SARANG_LAYOUT.controlRadius },
  breakpoints: {
    values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
  },
  components: buildComponents(darkPalette),
});
