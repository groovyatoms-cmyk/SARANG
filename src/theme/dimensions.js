// SARANG layout dimensions — single source of truth for structural sizing.
// Never hardcode these values inside components; import SARANG_LAYOUT instead.

export const SARANG_LAYOUT = {
  sidebarWidth: 264,
  sidebarCollapsedWidth: 76,
  topbarHeight: 68,
  topbarHeightMobile: 60,
  contentPadding: 24,
  contentPaddingMobile: 16,
  cardGap: 20,
  sectionGap: 20,
  cardRadius: 14,
  cardRadiusSm: 10,
  controlRadius: 8,
  chipRadius: 6,
  footerHeight: 52,
  chartHeight: 300,
  chartHeightSm: 220,
  drawerWidthSm: 420,
  drawerWidthMd: 520,
};

export const SARANG_SHADOWS = {
  card: '0 1px 2px rgba(0,0,0,0.24), 0 8px 24px -8px rgba(0,0,0,0.35)',
  cardLight: '0 1px 2px rgba(20,20,43,0.04), 0 8px 24px -8px rgba(20,20,43,0.10)',
  popover: '0 4px 8px rgba(0,0,0,0.3), 0 16px 40px -12px rgba(0,0,0,0.5)',
  popoverLight: '0 4px 8px rgba(20,20,43,0.06), 0 16px 40px -12px rgba(20,20,43,0.18)',
};
