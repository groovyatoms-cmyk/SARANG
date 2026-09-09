import { SARANG_LAYOUT, SARANG_SHADOWS } from './dimensions';

// Component overrides — makes MUI stop looking like stock MUI.
export function buildComponents(palette) {
  const isDark = palette.mode === 'dark';
  const shadow = isDark ? SARANG_SHADOWS.card : SARANG_SHADOWS.cardLight;
  const popoverShadow = isDark ? SARANG_SHADOWS.popover : SARANG_SHADOWS.popoverLight;

  return {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: palette.background.default,
          scrollbarColor: `${palette.border.strong} transparent`,
        },
        '*::-webkit-scrollbar': { width: 8, height: 8 },
        '*::-webkit-scrollbar-track': { background: 'transparent' },
        '*::-webkit-scrollbar-thumb': {
          background: palette.border.strong,
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: palette.background.paper,
          border: `1px solid ${palette.border.subtle}`,
        },
      },
    },
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          backgroundColor: palette.background.paper,
          border: `1px solid ${palette.border.subtle}`,
          borderRadius: SARANG_LAYOUT.cardRadius,
          boxShadow: shadow,
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: { padding: 20, '&:last-child': { paddingBottom: 20 } },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: SARANG_LAYOUT.controlRadius,
          padding: '7px 16px',
          fontWeight: 600,
        },
        sizeSmall: { padding: '5px 12px', fontSize: '0.75rem' },
        outlined: { borderColor: palette.border.default },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: SARANG_LAYOUT.controlRadius,
          transition: 'background-color 180ms ease, color 180ms ease',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: SARANG_LAYOUT.chipRadius,
          fontWeight: 600,
          fontSize: '0.71875rem',
        },
        sizeSmall: { height: 22 },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: palette.background.sidebar,
          backgroundImage: 'none',
          border: 'none',
          borderRight: `1px solid ${palette.border.subtle}`,
        },
      },
    },
    MuiAppBar: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          backgroundColor: palette.background.topbar,
          backgroundImage: 'none',
          borderBottom: `1px solid ${palette.border.subtle}`,
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: { minHeight: `${SARANG_LAYOUT.topbarHeight}px !important` },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: SARANG_LAYOUT.controlRadius,
          transition: 'background-color 180ms ease, color 180ms ease',
          '&.Mui-selected': {
            backgroundColor: isDark ? `${palette.primary.main}29` : `${palette.primary.main}19`,
            color: palette.primary.main,
            '&:hover': {
              backgroundColor: isDark ? `${palette.primary.main}38` : `${palette.primary.main}26`,
            },
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: { root: { minWidth: 34, color: 'inherit' } },
    },
    MuiTable: {
      styleOverrides: { root: { borderCollapse: 'separate', borderSpacing: 0 } },
    },
    MuiTableHead: {
      styleOverrides: {
        root: { backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(15,17,26,0.02)' },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: { borderBottom: `1px solid ${palette.border.subtle}`, padding: '12px 16px' },
        head: {
          fontSize: '0.71875rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: 0.4,
          color: palette.text.secondary,
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          transition: 'background-color 150ms ease',
          '&:hover': { backgroundColor: palette.background.hover },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: { minHeight: 36 },
        indicator: { borderRadius: 3, height: 3 },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          minHeight: 36,
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '0.8125rem',
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: palette.background.elevated,
          border: `1px solid ${palette.border.default}`,
          boxShadow: popoverShadow,
          borderRadius: SARANG_LAYOUT.cardRadiusSm,
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          backgroundColor: palette.background.elevated,
          border: `1px solid ${palette.border.default}`,
          boxShadow: popoverShadow,
          borderRadius: SARANG_LAYOUT.cardRadiusSm,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          margin: '2px 6px',
          fontSize: '0.8125rem',
          '&.Mui-selected': { backgroundColor: `${palette.primary.main}24` },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: palette.background.paper,
          backgroundImage: 'none',
          borderRadius: SARANG_LAYOUT.cardRadius,
          border: `1px solid ${palette.border.default}`,
        },
      },
    },
    MuiTextField: {
      defaultProps: { size: 'small' },
    },
    MuiInputBase: {
      styleOverrides: {
        root: { borderRadius: SARANG_LAYOUT.controlRadius, fontSize: '0.8125rem' },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: SARANG_LAYOUT.controlRadius,
          backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(15,17,26,0.015)',
          '& fieldset': { borderColor: palette.border.default },
          '&:hover fieldset': { borderColor: palette.border.strong },
        },
      },
    },
    MuiSelect: {
      defaultProps: { size: 'small' },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: isDark ? '#2B2C38' : '#26273A',
          color: '#fff',
          fontSize: '0.71875rem',
          fontWeight: 500,
          borderRadius: 6,
          padding: '6px 10px',
        },
      },
    },
    MuiPagination: {
      styleOverrides: { root: { fontSize: '0.8125rem' } },
    },
    MuiDivider: {
      styleOverrides: { root: { borderColor: palette.border.subtle } },
    },
    MuiSnackbar: {
      styleOverrides: { root: {} },
    },
    MuiAlert: {
      styleOverrides: {
        root: { borderRadius: SARANG_LAYOUT.controlRadius, fontSize: '0.8125rem' },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          backgroundColor: palette.background.elevated,
          border: `1px solid ${palette.border.default}`,
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: { borderRadius: 4, height: 6, backgroundColor: palette.background.hover },
      },
    },
    MuiBadge: {
      styleOverrides: {
        badge: { fontWeight: 700, fontSize: '0.625rem' },
      },
    },
  };
}
