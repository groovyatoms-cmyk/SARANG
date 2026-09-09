// SARANG design tokens — color system
// Brand palette: deep blue (#3368A0) as primary, soft blue-teal (#66A3BF) as
// secondary/accent, mint (#C8DFDB) and cream (#F2EFE7) as light-theme surfaces.
// Dark mode is the default enterprise surface; light mode mirrors the same structure.

export const darkPalette = {
  mode: 'dark',
  background: {
    default: '#12161B',
    sidebar: '#161B21',
    topbar: '#151A20',
    paper: '#1A2027',
    elevated: '#1F262E',
    hover: 'rgba(255,255,255,0.04)',
    selected: 'rgba(255,255,255,0.06)',
  },
  border: {
    subtle: 'rgba(255,255,255,0.06)',
    default: 'rgba(255,255,255,0.09)',
    strong: 'rgba(255,255,255,0.14)',
  },
  text: {
    primary: '#F1F3F5',
    secondary: '#9AA7B0',
    disabled: '#576169',
  },
  primary: {
    main: '#4E86BE',
    light: '#66A3BF',
    dark: '#3368A0',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#66A3BF',
    light: '#8FC0D6',
    dark: '#4A87A3',
    contrastText: '#04202B',
  },
  success: {
    main: '#3ED598',
    light: '#63E0AC',
    dark: '#2AAE7C',
    contrastText: '#06231A',
  },
  warning: {
    main: '#F5A623',
    light: '#F7BB55',
    dark: '#C9840F',
    contrastText: '#241800',
  },
  error: {
    main: '#F0507C',
    light: '#F4779A',
    dark: '#C63A62',
    contrastText: '#FFFFFF',
  },
  info: {
    main: '#4DA3F7',
    light: '#78BAF8',
    dark: '#3480CE',
    contrastText: '#001830',
  },
  chart: ['#4E86BE', '#66A3BF', '#F5A623', '#F0507C', '#3ED598', '#8FC0D6', '#3368A0'],
};

export const lightPalette = {
  mode: 'light',
  background: {
    default: '#F2EFE7',
    sidebar: '#FFFFFF',
    topbar: '#FFFFFF',
    paper: '#FFFFFF',
    elevated: '#FFFFFF',
    hover: 'rgba(51,104,160,0.05)',
    selected: 'rgba(51,104,160,0.09)',
  },
  border: {
    subtle: 'rgba(15,23,31,0.07)',
    default: 'rgba(15,23,31,0.10)',
    strong: 'rgba(15,23,31,0.18)',
  },
  text: {
    primary: '#12181D',
    secondary: '#5B6870',
    disabled: '#9AA7AE',
  },
  primary: {
    main: '#3368A0',
    light: '#66A3BF',
    dark: '#254D78',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#4A87A3',
    light: '#66A3BF',
    dark: '#356178',
    contrastText: '#FFFFFF',
  },
  success: {
    main: '#28B076',
    light: '#3ED598',
    dark: '#1E8A5B',
    contrastText: '#FFFFFF',
  },
  warning: {
    main: '#E29010',
    light: '#F5A623',
    dark: '#B5720B',
    contrastText: '#FFFFFF',
  },
  error: {
    main: '#E13F68',
    light: '#F0507C',
    dark: '#B62E52',
    contrastText: '#FFFFFF',
  },
  info: {
    main: '#2E8FE8',
    light: '#4DA3F7',
    dark: '#1F6FBA',
    contrastText: '#FFFFFF',
  },
  chart: ['#3368A0', '#4A87A3', '#E29010', '#E13F68', '#28B076', '#66A3BF', '#254D78'],
  // Decorative surface tints unique to light mode, drawn from the brand palette.
  accent: {
    mint: '#C8DFDB',
    cream: '#F2EFE7',
  },
};
