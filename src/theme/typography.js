// SARANG typography scale

export const fontFamily = [
  '"Inter"',
  '"Public Sans"',
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Roboto',
  'Helvetica',
  'Arial',
  'sans-serif',
].join(',');

export const typography = {
  fontFamily,
  fontSize: 13,
  h1: { fontFamily, fontWeight: 700, fontSize: '2.25rem', lineHeight: 1.2, letterSpacing: -0.5 },
  h2: { fontFamily, fontWeight: 700, fontSize: '1.875rem', lineHeight: 1.25, letterSpacing: -0.4 },
  h3: { fontFamily, fontWeight: 700, fontSize: '1.5rem', lineHeight: 1.3, letterSpacing: -0.3 },
  h4: { fontFamily, fontWeight: 600, fontSize: '1.25rem', lineHeight: 1.35, letterSpacing: -0.2 },
  h5: { fontFamily, fontWeight: 600, fontSize: '1.0625rem', lineHeight: 1.4 },
  h6: { fontFamily, fontWeight: 600, fontSize: '0.9375rem', lineHeight: 1.4 },
  subtitle1: { fontFamily, fontWeight: 600, fontSize: '0.875rem', lineHeight: 1.5 },
  subtitle2: { fontFamily, fontWeight: 600, fontSize: '0.8125rem', lineHeight: 1.5 },
  body1: { fontFamily, fontWeight: 400, fontSize: '0.875rem', lineHeight: 1.6 },
  body2: { fontFamily, fontWeight: 400, fontSize: '0.8125rem', lineHeight: 1.6 },
  button: { fontFamily, fontWeight: 600, fontSize: '0.8125rem', textTransform: 'none', letterSpacing: 0.1 },
  caption: { fontFamily, fontWeight: 500, fontSize: '0.71875rem', lineHeight: 1.5 },
  overline: {
    fontFamily,
    fontWeight: 700,
    fontSize: '0.6875rem',
    lineHeight: 1.6,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
};
